import { Page } from "@playwright/test";

export class BasePage{

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    /**
    * Clicks a link by visible text. If the link opens a new tab,
    * returns the new Page object for further interactions.
    *
    * @param linkText - The visible text of the link to click.
    * @returns Page - The new page if a tab opens, otherwise the same page.
    */
    async clickLinkAndSwitch(linkText: string): Promise<Page> {
        await this.page.getByText(linkText).click();

        try {
            const newPage = await this.page.context().waitForEvent("page", { timeout: 5000 });
            await newPage.waitForLoadState("domcontentloaded");
            return newPage;
        } catch {
            // No new tab opened, just wait for current page navigation
            await this.page.waitForLoadState("domcontentloaded");
            return this.page;
        }
    }
}