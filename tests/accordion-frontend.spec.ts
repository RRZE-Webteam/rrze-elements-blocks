import { test, expect } from '../test-utils/index';
let createdPageId: number;

// We have multiple tests in this file, all requiring us to be authenticated.
// Compare this to the front-end.spec.ts.
test.use({ storageState: process.env.WP_AUTH_STORAGE });

test.beforeEach(async ({ page, admin, editor }) => {
    await admin.visitAdminPage('/');
    await page.goto(process.env.WP_PLAYWRIGHT_BASE_URL + '/wp-admin/post-new.php?post_type=page');
    const pageId = await page.$('#post_ID');

    const closeButton = await page.waitForSelector('.components-modal__content button.components-button');
    await closeButton.click();

    const buttonBlockInserter = await page.waitForSelector('button.components-button.editor-document-tools__inserter-toggle');
    await buttonBlockInserter.click();

    const patternsViewButton = await page.waitForSelector('button#tabs-1-patterns');
    await patternsViewButton.click();

    // Click button with aria-label aria-label="DEVELOPMENT"
    const patternCategoryDev = await page.waitForSelector('button.block-editor-inserter__patterns-category[aria-label="DEVELOPMENT"]');
    await patternCategoryDev.click();

    // Click div with aria-label="DEV: Accordion"
    const patternAccordionSelector = 'div[id="rrze-elements-blocks/dev-accordion"]';

    await page.waitForFunction(
        selector => !!document.querySelector(selector),
        patternAccordionSelector,
        { timeout: 5000 }
    );

    // Retry mechanism to handle detached element
    let patternAccordion = await page.$(patternAccordionSelector);
    const maxRetries = 5;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            await patternAccordion.click();
            break;
        } catch (error) {
            if (attempt === maxRetries - 1) {
                throw error;
            }
            // Wait before retrying
            await page.waitForTimeout(1000);
            patternAccordion = await page.$(patternAccordionSelector);
        }
    }

    // Click button with class editor-post-publish-button__button    
    const buttonPublish = await page.waitForSelector('button.editor-post-publish-button__button');
    await buttonPublish.click();

    //wait 2 seconds
    await page.waitForTimeout(2000);

    const buttonPublishNow = await page.waitForSelector('button.editor-post-publish-button');
    await buttonPublishNow.click();

    await page.waitForTimeout(3000);

    // Click a with text "Seite ansehen" or "View Page"
    const buttonViewPage = await page.waitForSelector('a.components-button.is-primary', { timeout: 5000 });
    await buttonViewPage.click();
});

test.describe(() => {
    test('Accordion Block is present in the block inserter', async ({ page, admin, editor }) => {
        await page.waitForTimeout(2000); // Increased timeout

        try {
            await page.waitForTimeout(3000);
            // Check if <button class="accordion-toggle active" data-toggle="collapse" data-name="panel_2" href="#panel_2">Accordion Tab 1</button> is visible
            const accordionTab1 = await page.waitForSelector('button.accordion-toggle[data-name="panel_2"]');

            // Ensure the element exists before checking visibility
            expect(accordionTab1).not.toBeNull();

            // Use isVisible to check visibility
            const isVisible = await accordionTab1.isVisible();
            expect(isVisible).toBe(true);
        }
        catch (error) {
            console.log('Error:', error);
            throw error;
        }
    });

    test('Accordion automated JumpLink is working as expected', async ({ page }) => {
        test.setTimeout(60000);

        const currentUrl = await page.url();

        const newUrl = currentUrl.replace(/\/+$/, '') + '/#panel_0';

        await page.goto(newUrl);

        await page.waitForTimeout(2000);

        // Check if div with id panel_0 does not have display: none
        try {
            const panel0 = await page.waitForSelector('div#panel_0', { timeout: 10000 });
            expect(panel0).not.toBeNull();

            const style = await panel0.getAttribute('style');
            expect(style).not.toContain('display: none');

            const panel1 = await page.waitForSelector('div#panel_1', { timeout: 10000 });
            expect(panel1).not.toBeNull();

            const style1 = await panel1.getAttribute('style');
            expect(style1).toContain('display: none');
        } catch (error) {
            console.error('Error locating or verifying the style of div#panel_0:', error);
            throw error; // Rethrow the error to ensure the test fails
        }
    });

    test('Accordion automated named JumpLink is working as expected', async ({ page }) => {
        test.setTimeout(60000);

        const currentUrl = await page.url();

        const newUrl = currentUrl.replace(/\/+$/, '') + '/#sprungmarke-1';

        await page.goto(newUrl);

        await page.waitForTimeout(2000);

        try {
            const panel0 = await page.waitForSelector('div#sprungmarke-1', { timeout: 10000 });
            expect(panel0).not.toBeNull();

            // Retrieve the style attribute of the element
            const style = await panel0.getAttribute('style');
            expect(style).not.toContain('display: none');
        } catch (error) {
            console.error('Error locating or verifying the style of div#sprungmarke-1:', error);
            throw error; // Rethrow the error to ensure the test fails
        }
    });

});



test.afterEach(async ({ page, admin, editor }) => {
    await page.waitForTimeout(2000);
    const editPage = await page.waitForSelector('.ab-item[role="menuitem"][href*="action=edit"]', { state: 'visible' });
    await editPage.click();

    const editPost = await page.waitForSelector('[aria-controls="edit-post:document"]');
    await editPost.click();

    const trash = await page.waitForSelector('button.editor-post-trash');
    await trash.click();

    await page.waitForTimeout(3000);
    const okButton2 = await page.waitForSelector('button.is-primary:has-text("OK")');
    await okButton2.click();
});