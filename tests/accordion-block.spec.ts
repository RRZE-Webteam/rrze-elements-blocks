import { test, expect } from '../test-utils/index';
import fs from 'fs';
import path from 'path';

test.use({ storageState: process.env.WP_AUTH_STORAGE });

// Read once at module scope
const accordionContent = fs.readFileSync(
  path.resolve(__dirname, 'accordion.txt'),
  'utf-8'
);
test.beforeEach(async ({ page, admin, editor }) => {
  await admin.visitAdminPage('/');
  await page.goto(process.env.WP_PLAYWRIGHT_TESTPAGE);

  await editor.setContent(accordionContent);
  // await editor.openPreviewPage();
});

test.describe('Syntax in the BlockEditor', () => {
  test('Should render collapsibles > collapse > accordion hierarchy', async ({ page, editor }) => {
    // 1) Load and log blocks (useful for debugging the structure/content)
    const blocks = await editor.getBlocks();
    // If you want to see them in the test output:
    console.log('Blocks:', JSON.stringify(blocks, null, 2));

    await page.waitForTimeout(1000);
    const canvas = page.frameLocator('iframe[name="editor-canvas"]');
    // 2) Basic presence checks
    const collapsibles = canvas.locator('.wp-block-rrze-elements-collapsibles');
    await expect(collapsibles).toHaveCount(2);

    const allCollapse = canvas.locator('.wp-block-rrze-elements-collapse');
    await expect(allCollapse).toHaveCount(16); // update if your content changes

    // 3) Ensure *every* collapse is an inner block of collapsibles
    const nestedCollapse = canvas.locator(
      '.wp-block-rrze-elements-collapsibles .wp-block-rrze-elements-collapse'
    );

    // If there are any collapse blocks *not* inside collapsibles,
    // these two counts would differ.
    await expect(nestedCollapse).toHaveCount(await allCollapse.count());

    // 4) Ensure accordions only exist inside a collapse
    const allAccordions = canvas.locator('.wp-block-rrze-elements-accordion');
    const nestedAccordions = canvas.locator(
      '.wp-block-rrze-elements-collapse .wp-block-rrze-elements-accordion'
    );

    // There should be no stray accordions outside a collapse
    await expect(nestedAccordions).toHaveCount(await allAccordions.count());

    await expect(
      canvas.locator('.wp-block-rrze-elements-collapsibles .wp-block-rrze-elements-accordion')
    ).toHaveCount(3);
  });
  test('Akkordeonreiter 1 is present', async({page}) => {
    const akkordeonreiter1 = page.getByText("Akkordeonreiter 1")
    expect(akkordeonreiter1).toBeTruthy();
  })
});


