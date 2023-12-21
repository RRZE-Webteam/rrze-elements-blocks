import { test, expect } from '../test-utils/index';
let createdPageId: number;

// We have multiple tests in this file, all requiring us to be authenticated.
// Compare this to the front-end.spec.ts.
test.use({ storageState: process.env.WP_AUTH_STORAGE });

test.beforeAll(async ({ requestUtils }) => {
    const createdPage = await requestUtils.createPage({
        title: 'Playwright was testing',
        content: 'post content',
        status: 'publish'
    });
    createdPageId = createdPage.id; // Store the created page ID
});

test.describe(() => {
    test('Notice Block is present in the block inserter', async ({ page, admin, editor }) => {
        await admin.visitAdminPage('/');
        await page.goto('/wp-admin/post.php?post=' + createdPageId + '&action=edit');

        await editor.insertBlock({
            name: 'rrze-elements/notice'
        })

        const blockDiv = page.locator('div.wp-block-rrze-elements-notice');

        // Assert that the block div is visible on the page
        await expect(blockDiv).toBeVisible();
    });

    test('Notice Block has a Placeholder with 13 options', async ({ page, admin, editor }) => {
        await page.goto('/wp-admin/post.php?post=' + createdPageId + '&action=edit');

        await editor.insertBlock({
            name: 'rrze-elements/notice'
        })

        const blockDiv = page.locator('div.wp-block-rrze-elements-notice');
        await expect(blockDiv).toBeVisible();

        const noticeOptions = [
            "Warning", "Hint", "Maintenance", "Question", "Negative",
            "Positive", "Idea", "Download", "FAUbox", "Audio", "Video",
            "Thumbs up", "Thumbs down"
        ];

        for (const noticeOption of noticeOptions) {
            const spanLocator = blockDiv.locator(`span.block-editor-block-variation-picker__variation-label`, { hasText: noticeOption });

            await expect(spanLocator).toBeVisible();
            await expect(spanLocator).toHaveText(noticeOption);
        }
    });
});