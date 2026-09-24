# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



### Bug Fixes
* **release:** fix git-cliff commit rendering (5900f5a)







### Code Refactoring
* **release:** implement git-cliff for automated versioning and changelog generation. Hope this works better than UNconventional commits as changelogs MUST log EVERY change. So done (4883171)












### Chores
* **release:** 5.0.1 [skip ci] (b74727e)


### Code Refactoring
* **release:** update release rules for semantic versioning as commits were getting filtered for NO reason (c064210)





### Breaking Changes
* **release:** 5.0.0 [skip ci] (cf61f70)








### Chores
* **deps:** update dependencies and switch to verbatimModuleSyntax (fccb4a9)


### Code Refactoring
* refactor!(subscription): replace Subscription class with plain object type

- remove `Subscription` class in favor of a `Subscription` object type in `src/@types/index.ts`
- add `ContextAwareEventHandler` interface implemented by `ContextEventHandler`
- add `isSubscription` runtime type guard used by `unsubscribe`
- use `SetMultiMap#add`/`#hasValue` instead of `#set`/`Set#has` for subscriber storage
- reorder `setErrorHandler` method for readability

BREAKING CHANGE: `Subscription` is no longer a class instance; `unsubscribe`/`isSubscribed` now accept a plain `{ eventName, contextEventHandler }` object instead of a `Subscription` instance (b625507)


### Tests
* update tests for Subscription object refactor (277270f)






### Bug Fixes
* **subscriptions:** stabilize unsubscribe during dispatch (13ad542)




### Documentation
* document development environment (26f8a77)



### Chores
* **types:** enable isolated declarations (da670c4)

### Chores
* **deps:** update package tooling (6802f7b)

### Chores
* **release:** 4.2.8 [skip ci] (c1d88f2)



### Tests
* **subscribr:** strengthen subscription behavior coverage (a088e17)






### Bug Fixes
* **exports:** move exports to subscribr.ts for better organization (bf041f5)

### Bug Fixes
* **package:** update node engine requirement to >=24.11.0 (a8d4c63)






### Chores
* **release:** 4.2.7 [skip ci] (71f1e15)








### Bug Fixes
* **ci:** update node version matrix to remove deprecated version 22 (8ad87f2)






### Chores
* **release:** 4.2.6 [skip ci] (9146e0e)








### Bug Fixes
* **release:** remove silent flag from build command in release configuration (da2fb7a)






### Chores
* **deps:** update dependencies (cb8410d)

### Chores
* **release:** 4.2.5 [skip ci] (85757aa)








### Bug Fixes
* **release:** restore correct asset name for GitHub release (5fb04dc)






### Chores
* **release:** 4.2.4 [skip ci] (7f6ea52)








### Bug Fixes
* **deps:** upgrade @d1g1tal/collections to v3 and dev tooling (4d37568)

### Bug Fixes
* **release:** restore angular preset so changelog headings render (1bbd184)




### Documentation
* condense copilot agent instructions (9a2bf5f)



### Chores
* **build:** drop --force flag from minify script (7cc402c)

### Chores
* **release:** 4.2.3 [skip ci] (fd4a5b6)


### Code Refactoring
* **lint:** use typescript-eslint bundled parser and plugin (c265ad3)


### Tests
* cover Subscribr.destroy() behavior (2449009)



### Continuous Integration
* remove release-age override and bump codecov node version (711b7f4)




### Bug Fixes
* merge issues (256a82f)






### Chores
* **config:** add ESLint configuration file with recommended settings (3705e81)

### Chores
* update pnpm workspace configuration and tsconfig schema (0f024ea)

### Chores
* **release:** 4.2.2 [skip ci] (071665e)


### Code Refactoring
* replace private fields with class fields in ContextEventHandler, Subscribr, and Subscription (96de969)












### Chores
* **deps-dev:** update development dependencies (365819d)

### Chores
* chore!(deps): Updates dependencies and requires Node.js >= 22

Drops support for Node.js 20, establishing Node.js 22 as the minimum required version.
Updates CI workflows, documentation, and the complete dependency tree to align with the new runtime constraints.
Improves security and stability through dependency upgrades. (085d399)

### Chores
* **release:** 4.2.1 [skip ci] (e1d159c)


### Code Refactoring
* Migrates to native ES private fields (8d7bbd7)






### Features
* **build:** iife versions of the modules are built alongside the ESM modules (c68b3f2)







### Chores
* **deps:** update @d1g1tal/collections to the latest version (b6693ad)

### Chores
* **test:** remove commented out vitest configuration (89e6c15)

### Chores
* **release:** 4.2.0 [skip ci] (c499653)




### Build System
* **deps:** update dependencies (5c7ce56)





### Bug Fixes
* **deps:** reinstall project to finally address CVE-2026-39363 (6447f90)






### Chores
* **release:** 4.1.13 [skip ci] (688aa36)








### Bug Fixes
* **deps:** update devDependencies to address Vite vulnerability in Vitest (f51330c)






### Chores
* **release:** 4.1.12 [skip ci] (53ac780)








### Bug Fixes
* **deps:** update @d1g1tal/collections to ^2.2.0 (281692b)






### Chores
* update tooling config for pnpm v10 and VS Code (d60e2e6)

### Chores
* add breaking change release rule and update README badge (006c7a6)

### Chores
* **release:** 4.1.11 [skip ci] (7e2eb5d)




### Build System
* **deps:** upgrade typescript to v6 and update dev dependencies (47909cf)

### Build System
* **config:** update tsconfig.json for TypeScript 6.0 compatibility (6e6b2e7)





### Bug Fixes
* **deps:** security update for dependency (91254b1)

### Bug Fixes
* Updates collection import to point to package root (789fa27)




### Documentation
* fix README.md badges and missing properties in package.json (473b5e4)



### Chores
* **ci:** add .githooks (071ab06)

### Chores
* **deps:** Updates internal packages and synchronizes lockfile (d275d88)

### Chores
* **release:** 4.1.10 [skip ci] (a7d9a2a)



### Tests
* Improves vitest configuration and resolves aliases (513c1c6)






### Bug Fixes
* **deps:** update dependencies to address CVE-2026-27903 and CVE-2026-27904 (e62f5d4)






### Chores
* bump dependencies to latest patch versions (7e76bf3)

### Chores
* update README.md to correct some errors and add documentation for 'destroy()' (3e8a467)

### Chores
* bump dev dependencies (2295922)

### Chores
* transition to MIT license and update project branding (99653d6)

### Chores
* **release:** 4.1.9 [skip ci] (50c5c65)





### Continuous Integration
* simplify workflows and update README badges (07fb3bd)

### Continuous Integration
* updated release-please 'uses' to googleapis/release-please-action@v4 (a660c37)

### Continuous Integration
* migrate to semantic-release (453df84)

### Continuous Integration
* upgrade workflow actions and refine semantic-release pipeline (08284ed)




### Bug Fixes
* correct permissions in publish workflow\n\n- Add explicit permissions to release-please job (contents: write,\n  pull-requests: write) — previously inherited defaults which may\n  not allow creating releases and PRs\n- Remove packages: write from publish job (GitHub Packages, not npm)\n- Restore contents: write on publish job (5d8a3c7)






### Chores
* **main:** release 4.1.8 (ee1c403)






### Other Changes
* Merge pull request #9 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.8 (9883668)



### Bug Fixes
* rename release.yml to publish.yml to match npm Trusted Publisher config\n\nThe OIDC token includes the workflow filename. npm validates it against\nthe registered Trusted Publisher, which was configured with the default\n'publish.yml'. The mismatch caused all auth rejections. (e1fd070)






### Chores
* **main:** release 4.1.7 (3d13ddb)






### Other Changes
* Merge pull request #8 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.7 (46757ba)



### Bug Fixes
* add .npmrc for scope registry and remove setup-node registry-url\n\nCommitting .npmrc with the scope→registry mapping ensures no auth token\nplaceholder is injected by setup-node. Removing registry-url from\nsetup-node prevents it from writing _authToken=\${NODE_AUTH_TOKEN} to\na project-level .npmrc, which was blocking the OIDC Trusted Publisher\nexchange. (fb2ddeb)






### Chores
* **main:** release 4.1.6 (b6e6479)






### Other Changes
* Merge pull request #7 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.6 (72d7422)



### Bug Fixes
* revert block that removed the _authToken in the release action (e5ae093)






### Chores
* **main:** release 4.1.5 (86aa31c)






### Other Changes
* Merge pull request #6 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.5 (a8aef35)



### Bug Fixes
* update node version in release action (4f3efe1)






### Chores
* **main:** release 4.1.4 (cef1fc3)






### Other Changes
* Merge pull request #5 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.4 (4fc3571)



### Bug Fixes
* remove _authToken placeholder so npm uses OIDC exchange\n\nsetup-node writes _authToken=\${NODE_AUTH_TOKEN} to .npmrc. With no\nNODE_AUTH_TOKEN set, npm sends invalid auth instead of falling through\nto the Trusted Publisher OIDC exchange. Deleting it lets npm detect\nACTIONS_ID_TOKEN_REQUEST_URL and obtain a fresh token automatically. (8de61a3)






### Chores
* **main:** release 4.1.3 (67dd6e4)






### Other Changes
* Merge pull request #4 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.3 (4664f44)



### Bug Fixes
* upgrade npm to latest for OIDC Trusted Publisher support\n\nnpm Trusted Publisher requires npm v11.5.1+. The GitHub runner ships\nwith an older version, so upgrade before publishing. Also restore\nregistry-url on setup-node as required by the OIDC auth flow. (84656e5)






### Chores
* **main:** release 4.1.2 (eaad3ef)






### Other Changes
* Merge pull request #3 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.2 (b9d7ef4)



### Bug Fixes
* add packageManager field for pnpm/action-setup (ccbff83)

### Bug Fixes
* use --noEmit for type-check script (10076e5)






### Chores
* **main:** release 4.1.1 (994d1d7)






### Other Changes
* Merge pull request #2 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.1 (bb8e289)


### Features
* add setErrorHandler for custom error handling\n\nAdd ErrorHandler and SubscriptionOptions types. Update exports. (5a675b0)

### Features
* add error boundary preventing handler errors from blocking others\n\nEvent handler errors are now caught and handled without breaking other subscribers.\nAdd setErrorHandler(), once option, event name validation, and destroy(). (951a2b9)

### Features
* add once option to subscribe for auto-unsubscribe after first event\n\nAdd comprehensive tests for once subscriptions, error handling, validation, and destroy. (76fdcce)

### Features
* add event name validation with TypeError and Error\n\nUpdate CHANGELOG and README with documentation for all new features. (53fd032)

### Features
* add destroy method to clear all subscriptions\n\nUpdate dependencies, lockfile, gitignore, and copilot instructions. (4559c3d)







### Chores
* **main:** release 4.1.0 (7d7b331)





### Continuous Integration
* add GitHub Actions CI, release-please, and Codecov integration\n\n- Add CI workflow (lint, type-check, test, coverage upload, build)\n- Add release workflow with release-please and npm publish --provenance\n- Add release-please config seeded at 4.0.4\n- Add codecov.yml configuration\n- Add json coverage reporter to vitest config\n- Remove sonar outputFile from vitest config\n- Add CI and Codecov badges to README (0c84e7a)

### Continuous Integration
* remove CODECOV_TOKEN from CI workflow\n\nCodecov no longer requires a token for public repos. (93b3eaa)


### Other Changes
* Merge pull request #1 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.0 (8ebffbc)













### Other Changes
* Maintenance release. Dependency updates (ac5003f)













### Other Changes
* Update JSDoc comments to TypeScript format and updated eslint config (8db6426)













### Other Changes
* Maintenance update: updated dependencies and tsconfig.json (9d37ae4)

### Other Changes
* Dependency Updates (f0e6ce1)













### Other Changes
* Maintenance release (713d89c)

### Other Changes
* Project is now using TypeScript and Vitest
- Converted source to TypeScript.
- Migrated from Jest to Vitest for unit testing.
- Updated esbuild to use the new flat config format. (81a138a)













### Other Changes
* Maintenance release (4a4442e)













### Other Changes
* Maintenance update (6c72ae8)













### Other Changes
* Switched to pnpm for package management and removed d.ts files. (c127cc2)













### Other Changes
* Dependency updates and eslint config changes (39e95e9)













### Other Changes
* Refactored unsubscribe to simplify the using the methods in the Subscribr instance.
-Added npm script to create the TypeScript declaration files.
-Updated dependencies.
-Udpated README.
-Added a 'handle()' method to ContextEventHandler and removed 'context' and 'eventHandler' properties.
-Optimized and simplified the main 'Subscribr' class.
-Removed 'context' and 'eventHandler' properties and replaced it with 'contextEventHandler' property. (dfd5ac0)













### Other Changes
* Initial commit (ebe4d30)

### Other Changes
* Initial commit (d51fd47)

### Other Changes
* Merge branch 'main' of github.com:D1g1talEntr0py/subscribr (85e5dc8)

### Other Changes
* Refactored Subscribr class - Still needs some work
-Calling subscribe will return an instance of a Subscription class.
-Added ContextEventHandler class to add to the context and event handler to the underlying Set of the SetMultiMap.
-Added method 'isSubscribed' to check if the Subscription is active.
-Updated README.
-Added first unit tests. (ab6f232)
