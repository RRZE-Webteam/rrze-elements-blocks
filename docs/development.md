# Getting started for Block development in RRZE Elements Blocks


## Installation of required NPM packages
Use Node.js 24.15 or newer within the 24.x LTS line, matching CI. The supported Node.js ranges are recorded in `package.json` (`^22.22.2 || ^24.15.0 || >=26.0.0`) and follow the requirements of `@wordpress/scripts` and jsdom.

1. Install the locked dependencies with `npm ci`. Use `npm install` when intentionally changing dependencies, and commit both `package.json` and `package-lock.json`.
2. Sass is installed locally by `npm ci`; a global installation is not needed.

### Dependency security updates

Run `npm audit` and `composer audit --locked` when updating dependencies. The version-scoped `overrides` in `package.json` replace vulnerable transitive versions whose parent packages still require older ranges:

| Package | Parent dependency | Fixed version floor |
| --- | --- | --- |
| `js-yaml` 5.x | `markdownlint-cli` | [5.4.1](https://github.com/advisories/GHSA-r3ph-w7gj-g6xm) |
| `smol-toml` | `markdownlint-cli` | [1.8.1](https://github.com/advisories/GHSA-r4xh-jqrq-34v2) |
| `katex` | `micromark-extension-math` via `markdownlint` | [0.18.2](https://github.com/advisories/GHSA-238p-pmpm-9mq7) |
| `postcss-selector-parser` | `cssnano` 6 and its plugins | [7.1.6](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) |
| `serialize-javascript` | `copy-webpack-plugin` 10 | [7.0.5](https://github.com/advisories/GHSA-qj8w-gfj5-8c6v), also fixes [RCE](https://github.com/advisories/GHSA-5c6j-r48x-rmvq) |
| `uuid` | `@wordpress/components` 30 and `sockjs` | [11.1.1](https://github.com/advisories/GHSA-w5hq-g745-h8pq) |

The UUID override keeps CommonJS support for these consumers and leaves existing UUID 14 dependencies unchanged. The YAML override leaves the unaffected 4.x branch unchanged. Remove an override once the parent dependency accepts a fixed version, then regenerate the lockfile and run the checks and production build below. Avoid `npm audit fix --force`: its proposed WordPress downgrades do not preserve the dependency compatibility described below.

As of 2026-10-09, the remaining npm finding is [GHSA-vfj7-8cjw-p6xm in `braces` 3.0.3](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), for which no patched release is available. It is pulled in by the build and lint dependency chains; npm also reports affected parent packages for this same advisory. Keep the finding visible and reassess it when upstream releases a fix.

## JavaScript and TypeScript checks

- `npm run lint` checks source files, unminified frontend scripts, Node configuration/scripts, and type declarations. The `tests/` and `legacy-tests/` directories are excluded.
- `npm run lint:fix` applies available ESLint fixes. Review the changes before committing.
- `npm run typecheck` checks the TypeScript project without generating build files.
- `npm run test:js` runs the frontend and editor component regression tests.
- `npm run format` handles formatting separately from linting.

`eslint.config.js` uses the native WordPress recommended flat configuration, including React, Hooks, accessibility, internationalization, and TypeScript rules. The text domain is `rrze-elements-blocks`. Browser globals apply to browser files; Node globals apply to root configuration files and scripts. Build output, dependencies, minified scripts, test directories, and test reports are ignored.

Experimental WordPress APIs remain supported: `@wordpress/no-unsafe-wp-apis` reports warnings instead of errors. Historical save and migration files allow versioned identifiers such as `saveV1_0_19`; other naming checks remain active. TypeScript documentation describes a destructured props object with one `@param` tag and documents its fields in the type, avoiding dotted parameter names that TSDoc rejects.

The TypeScript lint rules do not require type information, so ESLint does not load a TypeScript project. Type checking runs separately. Keep TypeScript pinned to `5.9.3`: the current typescript-eslint release supports TypeScript `<6.1.0`, and TypeScript 7 does not expose the compiler API required by these tools. See the [typescript-eslint compatibility range](https://typescript-eslint.io/users/dependency-versions/) and [TypeScript 7 migration notes](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/). `typescript-eslint` keeps the parser and plugin versions aligned. ESLint stays on major version 9 for the React lint dependencies, while Babel stays on major version 7 for the WordPress build pipeline. React and React DOM stay together on version 18.3.1.

Keep the direct `@wordpress/blocks` dependency on major 15 and `@wordpress/components` on major 30 while using `@types/wordpress__block-editor@15.0.6`. Updating these two packages to majors 16 and 41 creates conflicting React peer dependencies inside the older declaration package. Upgrading them requires revisiting the block-editor type dependencies; do not bypass the conflict with `--force` or `--legacy-peer-deps`.

Run lint, typecheck, and the JavaScript regression tests before opening a pull request. Lint errors fail CI; warnings remain visible without blocking it. Keep historical save output unchanged when fixing lint findings, because existing blocks rely on it for validation.

## Pull request checks

`.github/workflows/lint.yml` runs for every pull request, pushes to `main` and `dev`, and manual runs. It cancels superseded runs for the same branch or pull request.

- On Node.js 24: install locked dependencies, typecheck, lint, run the JavaScript regression tests, and build production assets. The job also checks that `build/` and `assets/css/` match the committed output, including newly generated files. Run `npm run build` and commit its output when changing source files that affect these assets.
- On PHP 8.0 and 8.5: install locked Composer dependencies and run `composer test`. These unit tests use WordPress stubs and do not require a database or a running WordPress site. PHPStan also runs on PHP 8.5.
- The final `PR checks` job succeeds only when all of these jobs succeed. Configure it as a **required status check** in the GitHub rulesets or branch protection settings for `main` and `dev` after its first run. The workflow alone does not prevent merging a failing pull request; see [GitHub's required status checks documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging).

Playwright and `legacy-tests/` are intentionally excluded until the browser tests are replaced. The existing Psalm workflow remains separate. This workflow validates pull requests; it does not deploy the plugin.

The PR workflow runs untrusted code on GitHub-hosted runners with read-only repository access, no configured secrets, and no persisted checkout credentials. The final `PR checks` job has no token permissions. Actions are pinned to full commit SHAs; when updating them, verify the commit in the upstream repository and update the version comment too. These pins cover the action code, not every tool downloaded at runtime. See [GitHub's workflow security guidance](https://docs.github.com/en/actions/reference/security/secure-use).

In GitHub settings, require review before merging and review workflow, dependency, and lockfile changes carefully: a pull request can change the checks it runs. Require approval for workflows from outside contributors, and keep write tokens and secrets disabled for fork pull requests. These repository settings are managed separately from the workflow files.

`.github/workflows/psalm.yml` runs a separate security scan for pull requests and pushes to `main` and `dev`, weekly, and on manual dispatch. It downloads the [Psalm 6.19.0 release](https://github.com/vimeo/psalm/releases/tag/6.19.0) and verifies a committed SHA-256 checksum before executing it on PHP 8.5. When updating Psalm, verify the release asset's digest and update both the version and checksum in the workflow. No mutable scanner container is used.

`psalm.xml` covers production PHP in `includes/`, `config/`, and the plugin entry point, targeting PHP 8.0 and using the WordPress stubs from the Composer lockfile. The scan installs dependencies with Composer plugins and scripts disabled, has only read access, and does not persist checkout credentials or share a dependency cache. Tests, browser tests, and generated assets are outside this scan.

Before scanning, `php scripts/prepare-psalm-stubs.php` creates an ignored copy of the locked WordPress stubs in `_tmp/psalm/`. It normalizes two `WP_Ability` callable annotations that crash Psalm 6.19.0, preserving their parameter and return types. The original vendor file used by PHPStan stays unchanged. Run this preparation command when running Psalm locally too; reassess the workaround when updating Psalm or the WordPress stubs.

The SARIF report is retained for seven days, including when Psalm reports findings; a failed scan remains failed. A separate job downloads only that run's report by artifact ID and uploads it to GitHub code scanning. Only this job has `security-events: write`; it does not check out the repository, install dependencies, or execute project code. All actions use full commit SHAs. The normal `pull_request` event supports code-scanning uploads for fork and Dependabot pull requests without exposing a privileged `pull_request_target` workflow. GitHub code scanning must be available and enabled for the repository; the report also remains available as a workflow artifact.

Require the `php-security` status check in branch protection as well if Psalm findings should block merging; the separate `PR checks` job does not aggregate this workflow.

For PHP development, run `composer install`, `composer test`, and `composer phpstan`. Commit `composer.lock` alongside dependency changes so local development and CI use the same versions. Composer resolves dependencies against PHP 8.0, the plugin's minimum version, even when updating them on newer PHP installations. `npm test` remains the existing PHPStan alias; use `npm run test:js` for JavaScript tests.

## Start the development process
### Build a release archive
Run `npm run update-version` after changing the version in `package.json`, and commit all generated changes in `build/` and `assets/css/`. Run `npm run plugin-zip` to create `rrze-elements-blocks.zip` from the production files listed in `package.json`.

The archive must include `config/`, `assets/`, `webfonts/`, and `src/_shared/icons/` as well as the PHP code, translations, and compiled blocks. The icon sources are also read by PHP at runtime. The default `wp-scripts plugin-zip` file discovery omits these directories, so preserve the explicit `files` list. Composer dependencies are for development; the plugin uses its fallback class loader when `vendor/` is absent.

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
