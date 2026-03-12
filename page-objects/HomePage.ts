import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    async NavigateToProductFeaturesPage(){
        await this.menuNavigation('Why Matomo','Product Features');
    }

    async NavigateToCompleteAnalyticsPage(){
        await this.menuNavigation('Use Cases','Complete Analytics');
    }

    async NavigateToMatomoCloudPage(){
        await this.menuNavigation('Cloud');
    }

    async NavigateToDemoPage(){
        await this.NavigateToProductFeaturesPage();
        await this.page.getByRole('link', { name: 'Learn more' }).click();

        const demoPage = await this.clickLinkAndSwitch("Live Demo");
        return demoPage;
    }

    /**
     * Navigates through the application’s menu by clicking on a main menu item and then a corresponding sub-menu item.
     * @param mainMenu The visible text of the main menu option to click.
     * @param subMenu (Optional) The visible text of the sub-menu option to click.
     */
    async menuNavigation(mainMenu: string, subMenu?: string){
        await this.page.getByText(mainMenu).first().click();

        if(subMenu){
            await this.page.getByText(subMenu).click();
        }
    }

    async checkBrokenLinks(){
        // Find all 'a' tags with 'href'
        const allLinks = await this.page.locator('a').all();
        console.log(`Checking ${allLinks.length} links...`);

        for (const link of allLinks){
            const href = await link.getAttribute('href');

            // Filter out internal anchors, mailto, and empty links
            if (href && !href.startsWith('#') && !href.startsWith('mailto:')){
                // Resolve relative URLs to absolute URLs
                const fullUrl = new URL(href, this.page.url()).href;

                // Use page.request (API) to check the status code
                const response = await this.page.request.get(fullUrl);
                expect.soft(response.status(), `Link is broken: ${fullUrl}`).toBeLessThan(400);
            }
        }        
    }

    async checkBrokenLinkedImages(){
        // Find all 'img' tags
        const allImages = await this.page.locator('img').all();
        console.log(`Checking ${allImages.length} images...`);

        for (const img of allImages){
            const src = await img.getAttribute('src');

            // Filter out inline data images
            if (src && !src.startsWith('data:')){
                // Resolve relative URLs to absolute URLs
                const fullUrl = new URL(src, this.page.url()).href;

                // Use page.request (API) to check the status code
                const response = await this.page.request.get(fullUrl);
                expect.soft(response.status(), `Image is broken: ${fullUrl}`).toBeLessThan(400);
            }
        }        
    }
}