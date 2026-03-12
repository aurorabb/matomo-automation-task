import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';

test.beforeEach(async({page}) => {
    await page.goto('');
});

test.describe('Navigate to different sections', () => {
    
    test('Navigate to Product Features', async({page}) => {
        const homePage = new HomePage(page);
        await homePage.NavigateToProductFeaturesPage();
        await expect(page).toHaveTitle(/Product Features/);
    });

    test('Navigate to Complete Analytics', async({page}) => {
        const homePage = new HomePage(page);
        await homePage.NavigateToCompleteAnalyticsPage();
        await expect(page).toHaveTitle(/Complete Web Analytics/);
    });

    test('Navigate to Matomo Cloud', async({page}) => {
        const homePage = new HomePage(page);
        await homePage.NavigateToMatomoCloudPage();
        await expect(page).toHaveTitle(/Cloud-Hosted/);
    });

    test('Navigate to Demo Site', async({page}) => {
        test.setTimeout(60000); // Test could exceed the default 30s, setting the timeout for this test to 60s
        const homePage = new HomePage(page);
        const demoPage = await homePage.NavigateToDemoPage();
        await expect(demoPage).toHaveTitle(/Demo Site/);
    });
})

test.describe('Resource integrity', () => {

    test('Check broken links', async({page}) => {
        test.setTimeout(120000); // Test could exceed the default 30s, setting the timeout for this test to 120s
        const homePage = new HomePage(page);
        await homePage.checkBrokenLinks();
    })

    test('Check broken images', async({page}) => {
        const homePage = new HomePage(page);
        await homePage.checkBrokenLinkedImages();
    })
})