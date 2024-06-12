import { test, expect } from '../test-utils/index';
let createdPageId: number;

// We have multiple tests in this file, all requiring us to be authenticated.
// Compare this to the front-end.spec.ts.
test.use({ storageState: process.env.WP_AUTH_STORAGE });

// test.beforeAll(async ({ requestUtils }) => {

//     // const createdPage = await requestUtils.createPage({
//     //     title: 'Playwright was testing',
//     //     content: 'post content',
//     //     status: 'publish'
//     // });
//     // createdPageId = createdPage.id; // Store the created page ID
// });

test.describe(() => {
    test('Columns Block is present in the block inserter', async ({ page, admin, editor }) => {
        await admin.visitAdminPage('/');
        await page.goto(process.env.WP_PLAYWRIGHT_TESTPAGE);
        
        await editor.insertBlock({
            name: 'rrze-elements/columns'
        })

        await page.waitForTimeout(1000);
        const blockDiv = page.locator('div.wp-block-rrze-elements-columns');

        // Assert that the block div is visible on the page
        await expect((blockDiv).first()).toBeVisible();
    });
});