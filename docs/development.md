# Getting started for Block development in RRZE Elements Blocks


## Installation of required NPM packages
1. Install the locked dependencies with `npm ci`. Use `npm install` when intentionally changing dependencies, and commit both `package.json` and `package-lock.json`.
2. Make sure, you have SASS Language Processor installed `npm install -g sass`

## JavaScript and TypeScript checks

- `npm run lint` checks source files, unminified frontend scripts, Node configuration/scripts, type declarations, and current and legacy tests.
- `npm run lint:fix` applies available ESLint fixes. Review the changes before committing.
- `npm run typecheck` checks the TypeScript project without generating build files.
- `npm run format` handles formatting separately from linting.

`eslint.config.js` uses the native WordPress recommended flat configuration, including React, Hooks, accessibility, internationalization, and TypeScript rules. The text domain is `rrze-elements-blocks`. Browser globals apply to browser files; Node globals apply to configuration files and tests. Playwright rules apply only to its spec files. Build output, dependencies, minified scripts, and test reports are ignored.

The TypeScript lint rules do not require type information, so ESLint does not load a TypeScript project. Type checking runs separately. Keep TypeScript pinned to `5.9.3`: the current typescript-eslint release supports TypeScript `<6.1.0`, and TypeScript 7 does not expose the compiler API required by these tools. See the [typescript-eslint compatibility range](https://typescript-eslint.io/users/dependency-versions/) and [TypeScript 7 migration notes](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/). `typescript-eslint` keeps the parser and plugin versions aligned. ESLint stays on major version 9 and Babel on major version 7 to satisfy the WordPress lint dependencies.

Run lint and typecheck before opening a pull request. The GitHub Actions workflow in `.github/workflows/lint.yml` also runs these checks after `npm ci`. Existing code can produce additional findings now that the WordPress rules and broader file coverage are enabled; these are code findings, not parser failures. Lint errors fail CI and must be addressed before the check can pass.

## Start the development process
Based on which part you're currently working on, you can follow these simple steps.
### Development for existing blocks via src/blocks via Webpack
If you want to extend blocks in the src folder, follow these simple steps:
1. Run `npm run start` to start the development process
2. ⚠️ If you modify any `save.js` or `save.ts` files, make sure to make use of the WordPress [Deprecation API inside the Block Editor Handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/). Without use of the Depcreation API, users will see an error message, that something is wrong with their previously used block. The update to the revised block might break and remove their old content.
3. ⚠️ (Follow this step if 2 applies) Test the update to the new block version inside your test environment by refreshing a saved page with the old block. Check, if the Deprecation API worked.
4. (optional) If you setup E2E-Tests via your local development environment, run `npx playwright test`.
5. Once you are finished with the progress, update the Version-number inside package.json
6. Save your files and run `npm run update-version` to update the version number of all block.json files and the main plugin.php file at once. This automatically runs `npm run build` after the version number update.
7. Run `npm run build` (JS/TS only) or `npm run build all`(JS/TS + SASS + Tests) to bundle your changes.
8. publish your changes via a feature branch as pull-request to the dev-branch on GitHub

### Development of the global Stylesheet for the Frontend
1. Use Sass via the terminal to start the watch and build process
2. Publish your changes via a feature branch as pull-request to the dev-branch on GitHub

### Translation
1. Update the pot file `wp i18n make-pot . languages/rrze-elements-blocks.pot --slug=rrze-elements-blocks --domain=rrze-elements-blocks --exclude=node_modules,src` via WPcli. If you run into memory exhaustion, up your PHP memory limit or use the following command `php -d memory_limit=512M $(which wp) i18n make-pot . languages/rrze-elements-blocks.pot --slug=rrze-elements-blocks --domain=rrze-elements-blocks --exclude=node_modules,src`
2. Transalte the missing strings for example via LocoTranslate or poEdit
3. Bundle the translation strings and map them to the json files: `wp i18n make-json languages/ --no-purge`
4. Push your Changes to the GitHub Repository as feature branch and Start a PullRequest into the dev branch
5. Sometimes needed if you run into Memory Limits on Device: ` php -d memory_limit=512M -d max_execution_time=300 -d error_reporting=22527 $(which wp) \
    i18n make-pot . languages/rrze-elements-blocks.pot \
    --slug=rrze-elements-blocks --domain=rrze-elements-blocks --exclude=node_modules,src`

### Adding a new block?
1. Start by duplicating the blueprint folder in `src/block-blueprint`
2. Change the `block.json` file and the folder name
3. Register your new block by adding the block name inside the array on `rrze-elements-blocks.php Line 18`
4. Add your block path in the `update-version.js` file. This file automatically updates all version numbers by looking at the package.json version number.
5. Follow traditional development with `npm run start` and later `npm run build`, use the SASS watcher, if you need to compile the frontend CSS new (s. Development of the global frontend Stylesheet.)
6. Update the version number by running `npm run update-version`
7. Push your new Block as Feature Branch to the GitHub repository and create a Pull Request for the dev branch

### Test Environment?
You can use the E2E Testing framework following these guidelines:
1. Create a  `.env`-File inside the plugins base root containing these parameters:
WP_BASE_URL=http://subdomain.your-testsite.local
WP_USERNAME=EnterYourWordpressUserNameHere
WP_PASSWORD=YourPasswordForWPLogin
WP_AUTH_STORAGE=./tests/playwright/authStorage.json
WP_PLAYWRIGHT_TESTPAGE=http://subdomain.your-testsite.local/wp-admin/post.php?post=2319&action=edit (The Edit-URL to your desired test page)
2. What happens after running `npx playwright test`? WordPress E2E Testing framework is used to open your defined WordPress Development Site and Login via /wp-admin. It visits your Playwright-Testpage and follows the defined protocoll. You can extend on the playwrigt tests if needed.

## What are the next steps?
1. Your pull request gets double checked for Deprecation Issues
2. Once accepted the dev branch get's placed on the Beta Server for another Week of user testing
3. The Plugin get's pushed to the main branch
4. The New Plugin version get's bundled and installed on the main CMS
