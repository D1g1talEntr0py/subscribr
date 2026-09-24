# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.0.4](https://github.com/D1g1talEntr0py/subscribr/compare/v5.0.3...v5.0.4) - 2026-09-24









### Chores
* **release:** link generated changelog entries ([3755a79](https://github.com/D1g1talEntr0py/subscribr/commit/3755a79e69cc100b08cae53c95b99324eb189288))







## [5.0.3](https://github.com/D1g1talEntr0py/subscribr/compare/v5.0.2...v5.0.3) - 2026-09-24




### Bug Fixes
* **release:** ensure version is correctly formatted and update release notes generation ([d53b896](https://github.com/D1g1talEntr0py/subscribr/commit/d53b896b0b6590d640a8b6863292e10956644163))






### Chores
* **release:** 5.0.3 [skip ci] ([3232e69](https://github.com/D1g1talEntr0py/subscribr/commit/3232e69642a1506f76ca92e4d7e0808b5b34f7b6))







## [5.0.2](https://github.com/D1g1talEntr0py/subscribr/compare/v5.0.1...v5.0.2) - 2026-09-24




### Bug Fixes
* **release:** fix git-cliff commit rendering ([5900f5a](https://github.com/D1g1talEntr0py/subscribr/commit/5900f5a3ebcd6a2773f63b4cdc38ae16de186b08))






### Chores
* **release:** v5.0.2 [skip ci] ([1875b96](https://github.com/D1g1talEntr0py/subscribr/commit/1875b96cefa5966def99fe7f8345b2aa19602148))


### Code Refactoring
* **release:** implement git-cliff for automated versioning and changelog generation. Hope this works better than UNconventional commits as changelogs MUST log EVERY change. So done ([4883171](https://github.com/D1g1talEntr0py/subscribr/commit/4883171663a6990659abaea71ec09a9983a95c42))






## [5.0.1](https://github.com/D1g1talEntr0py/subscribr/compare/v5.0.0...v5.0.1) - 2026-09-23









### Chores
* **release:** 5.0.1 [skip ci] ([b74727e](https://github.com/D1g1talEntr0py/subscribr/commit/b74727e615829c01b185aff02e3a05ff31482e12))


### Code Refactoring
* **release:** update release rules for semantic versioning as commits were getting filtered for NO reason ([c064210](https://github.com/D1g1talEntr0py/subscribr/commit/c064210e8ed1a1395f88fe9808e4ebde7ee2830b))






## [5.0.0](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.8...v5.0.0) - 2026-09-23


### Breaking Changes
* **release:** 5.0.0 [skip ci] ([cf61f70](https://github.com/D1g1talEntr0py/subscribr/commit/cf61f708ac92e374cb34f246b6f2def4fadfbafb))








### Chores
* **deps:** update dependencies and switch to verbatimModuleSyntax ([fccb4a9](https://github.com/D1g1talEntr0py/subscribr/commit/fccb4a97fba1d4ad89a7a54f29ef7ee4ced96ea0))


### Code Refactoring
* refactor!(subscription): replace Subscription class with plain object type

- remove `Subscription` class in favor of a `Subscription` object type in `src/@types/index.ts`
- add `ContextAwareEventHandler` interface implemented by `ContextEventHandler`
- add `isSubscription` runtime type guard used by `unsubscribe`
- use `SetMultiMap#add`/`#hasValue` instead of `#set`/`Set#has` for subscriber storage
- reorder `setErrorHandler` method for readability

BREAKING CHANGE: `Subscription` is no longer a class instance; `unsubscribe`/`isSubscribed` now accept a plain `{ eventName, contextEventHandler }` object instead of a `Subscription` instance ([b625507](https://github.com/D1g1talEntr0py/subscribr/commit/b6255078c9bccc7812a0f8cd86c97a44320a7e45))


### Tests
* update tests for Subscription object refactor ([277270f](https://github.com/D1g1talEntr0py/subscribr/commit/277270fd8ee4f5cd3efe2bdb655b39ce52b014ff))





## [4.2.8](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.7...v4.2.8) - 2026-09-19




### Bug Fixes
* **subscriptions:** stabilize unsubscribe during dispatch ([13ad542](https://github.com/D1g1talEntr0py/subscribr/commit/13ad5428b109f9abafdb6ccfe770ee527bc10a93))




### Documentation
* document development environment ([26f8a77](https://github.com/D1g1talEntr0py/subscribr/commit/26f8a77af14814968bc50e4a9626fba7dedc7740))



### Chores
* **types:** enable isolated declarations ([da670c4](https://github.com/D1g1talEntr0py/subscribr/commit/da670c48fa5e6e0b51adee936e9ea6afffd7c0ee))

### Chores
* **deps:** update package tooling ([6802f7b](https://github.com/D1g1talEntr0py/subscribr/commit/6802f7b8d05dcd1c3535557b52fdaa345c036645))

### Chores
* **release:** 4.2.8 [skip ci] ([c1d88f2](https://github.com/D1g1talEntr0py/subscribr/commit/c1d88f2f18257fd7ea2485e52441584f124e4bb2))



### Tests
* **subscribr:** strengthen subscription behavior coverage ([a088e17](https://github.com/D1g1talEntr0py/subscribr/commit/a088e17320c3a961d872bd61f8ab1db7ee9f2f75))





## [4.2.7](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.6...v4.2.7) - 2026-09-14




### Bug Fixes
* **exports:** move exports to subscribr.ts for better organization ([bf041f5](https://github.com/D1g1talEntr0py/subscribr/commit/bf041f5f59d8de081c79fd6af684eaad5a056288))

### Bug Fixes
* **package:** update node engine requirement to >=24.11.0 ([a8d4c63](https://github.com/D1g1talEntr0py/subscribr/commit/a8d4c635aaffbe7d020fd6387b9818f0a2968686))






### Chores
* **release:** 4.2.7 [skip ci] ([71f1e15](https://github.com/D1g1talEntr0py/subscribr/commit/71f1e15b2d88680cc75b04997e5ded958cc1987a))







## [4.2.6](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.5...v4.2.6) - 2026-09-13




### Bug Fixes
* **ci:** update node version matrix to remove deprecated version 22 ([8ad87f2](https://github.com/D1g1talEntr0py/subscribr/commit/8ad87f2f6e2bb1b1e2eeb92859edca1f69cd0012))






### Chores
* **release:** 4.2.6 [skip ci] ([9146e0e](https://github.com/D1g1talEntr0py/subscribr/commit/9146e0e877007096cd1b01b37141f3cb69eee31e))







## [4.2.5](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.4...v4.2.5) - 2026-09-13




### Bug Fixes
* **release:** remove silent flag from build command in release configuration ([da2fb7a](https://github.com/D1g1talEntr0py/subscribr/commit/da2fb7af32bf464971a61a670864e3b8976c25a9))






### Chores
* **deps:** update dependencies ([cb8410d](https://github.com/D1g1talEntr0py/subscribr/commit/cb8410d7cd53fb39439939f3e659ebc482101c0b))

### Chores
* **release:** 4.2.5 [skip ci] ([85757aa](https://github.com/D1g1talEntr0py/subscribr/commit/85757aa664920d351f50839d8986db40ab62718e))







## [4.2.4](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.3...v4.2.4) - 2026-08-20




### Bug Fixes
* **release:** restore correct asset name for GitHub release ([5fb04dc](https://github.com/D1g1talEntr0py/subscribr/commit/5fb04dc8fb6f3da183c343c843946df91c3afeba))






### Chores
* **release:** 4.2.4 [skip ci] ([7f6ea52](https://github.com/D1g1talEntr0py/subscribr/commit/7f6ea5296ee9c80cfd7a710dc2c53c70f1d28563))







## [4.2.3](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.2...v4.2.3) - 2026-08-20




### Bug Fixes
* **deps:** upgrade @d1g1tal/collections to v3 and dev tooling ([4d37568](https://github.com/D1g1talEntr0py/subscribr/commit/4d37568c8d4f6028f389ca81400f0ce3deb2eb0d))

### Bug Fixes
* **release:** restore angular preset so changelog headings render ([1bbd184](https://github.com/D1g1talEntr0py/subscribr/commit/1bbd184843ea14b162ed2861a1863e677ff7aadf))




### Documentation
* condense copilot agent instructions ([9a2bf5f](https://github.com/D1g1talEntr0py/subscribr/commit/9a2bf5f275515520cf7c64e3399855cdd713e251))



### Chores
* **build:** drop --force flag from minify script ([7cc402c](https://github.com/D1g1talEntr0py/subscribr/commit/7cc402cfd8c693e7d837cf91c258e0953a17b953))

### Chores
* **release:** 4.2.3 [skip ci] ([fd4a5b6](https://github.com/D1g1talEntr0py/subscribr/commit/fd4a5b690dffdc935a978f3cbeb07b55227be553))


### Code Refactoring
* **lint:** use typescript-eslint bundled parser and plugin ([c265ad3](https://github.com/D1g1talEntr0py/subscribr/commit/c265ad38b62587c30a182ab7399e0bc05b709762))


### Tests
* cover Subscribr.destroy() behavior ([2449009](https://github.com/D1g1talEntr0py/subscribr/commit/244900981d0748273d035ea226f31913a3e55377))



### Continuous Integration
* remove release-age override and bump codecov node version ([711b7f4](https://github.com/D1g1talEntr0py/subscribr/commit/711b7f4a092ac34d0ab9707425a4a949e16201a8))



## [4.2.2](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.1...v4.2.2) - 2026-08-01




### Bug Fixes
* merge issues ([256a82f](https://github.com/D1g1talEntr0py/subscribr/commit/256a82f9a9728cd00e324370079b9ff0efed6ec5))






### Chores
* **config:** add ESLint configuration file with recommended settings ([3705e81](https://github.com/D1g1talEntr0py/subscribr/commit/3705e816c3d4fa7b817dfd9e5918402d430c72f1))

### Chores
* update pnpm workspace configuration and tsconfig schema ([0f024ea](https://github.com/D1g1talEntr0py/subscribr/commit/0f024eaff3f9adf259532e778b3ec834100cbfd4))

### Chores
* **release:** 4.2.2 [skip ci] ([071665e](https://github.com/D1g1talEntr0py/subscribr/commit/071665e1462f7e29ea8422b18086c6354e3368a5))


### Code Refactoring
* replace private fields with class fields in ContextEventHandler, Subscribr, and Subscription ([96de969](https://github.com/D1g1talEntr0py/subscribr/commit/96de969e65b0b0abb8873e46694630ece0eb7ef0))






## [4.2.1](https://github.com/D1g1talEntr0py/subscribr/compare/v4.2.0...v4.2.1) - 2026-05-25









### Chores
* **deps-dev:** update development dependencies ([365819d](https://github.com/D1g1talEntr0py/subscribr/commit/365819de2dc05d85774407d4c50bf0d459489239))

### Chores
* chore!(deps): Updates dependencies and requires Node.js >= 22

Drops support for Node.js 20, establishing Node.js 22 as the minimum required version.
Updates CI workflows, documentation, and the complete dependency tree to align with the new runtime constraints.
Improves security and stability through dependency upgrades. ([085d399](https://github.com/D1g1talEntr0py/subscribr/commit/085d3999a0eab13c0e4b8bf13993c2995b5d0397))

### Chores
* **release:** 4.2.1 [skip ci] ([e1d159c](https://github.com/D1g1talEntr0py/subscribr/commit/e1d159c678c8207fbfcb69b82a772a25bcf74399))


### Code Refactoring
* Migrates to native ES private fields ([8d7bbd7](https://github.com/D1g1talEntr0py/subscribr/commit/8d7bbd70e187c4f1cafd57c30a587f2d2a2aa050))






## [4.2.0](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.13...v4.2.0) - 2026-04-10



### Features
* **build:** iife versions of the modules are built alongside the ESM modules ([c68b3f2](https://github.com/D1g1talEntr0py/subscribr/commit/c68b3f2f9adf6bce1c283ddce1210f7037328726))







### Chores
* **deps:** update @d1g1tal/collections to the latest version ([b6693ad](https://github.com/D1g1talEntr0py/subscribr/commit/b6693ad221353f08f2b1322188478cfd3a9764da))

### Chores
* **test:** remove commented out vitest configuration ([89e6c15](https://github.com/D1g1talEntr0py/subscribr/commit/89e6c157570e326d8d9e72a7fdb79217bd3b3b2f))

### Chores
* **release:** 4.2.0 [skip ci] ([c499653](https://github.com/D1g1talEntr0py/subscribr/commit/c4996539a091b6f8623dad15512a1805ad76d12b))




### Build System
* **deps:** update dependencies ([5c7ce56](https://github.com/D1g1talEntr0py/subscribr/commit/5c7ce56c158b997567bdeb31f03ef53933097544))




## [4.1.13](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.12...v4.1.13) - 2026-04-07




### Bug Fixes
* **deps:** reinstall project to finally address CVE-2026-39363 ([6447f90](https://github.com/D1g1talEntr0py/subscribr/commit/6447f905caeda8b9c55d7e74833adb107a344d7a))






### Chores
* **release:** 4.1.13 [skip ci] ([688aa36](https://github.com/D1g1talEntr0py/subscribr/commit/688aa36a0a526562e3742dc80cf7e988bacf45ad))







## [4.1.12](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.11...v4.1.12) - 2026-04-07




### Bug Fixes
* **deps:** update devDependencies to address Vite vulnerability in Vitest ([f51330c](https://github.com/D1g1talEntr0py/subscribr/commit/f51330c52797d222e6697214b77a51d569473451))






### Chores
* **release:** 4.1.12 [skip ci] ([53ac780](https://github.com/D1g1talEntr0py/subscribr/commit/53ac78017aa654ad7b7a4bb30cffb3edc5c521a8))







## [4.1.11](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.10...v4.1.11) - 2026-04-04




### Bug Fixes
* **deps:** update @d1g1tal/collections to ^2.2.0 ([281692b](https://github.com/D1g1talEntr0py/subscribr/commit/281692b97ec5d569fd9be8741cc9d216cb16042d))






### Chores
* update tooling config for pnpm v10 and VS Code ([d60e2e6](https://github.com/D1g1talEntr0py/subscribr/commit/d60e2e6544c3a5c54f7e53051e74b170cec6a1fe))

### Chores
* add breaking change release rule and update README badge ([006c7a6](https://github.com/D1g1talEntr0py/subscribr/commit/006c7a6c5a8b2e02d8557ed7eed1097a09cf98f3))

### Chores
* **release:** 4.1.11 [skip ci] ([7e2eb5d](https://github.com/D1g1talEntr0py/subscribr/commit/7e2eb5da95b0c0194b0aedc4ddee7c0c7df91250))




### Build System
* **deps:** upgrade typescript to v6 and update dev dependencies ([47909cf](https://github.com/D1g1talEntr0py/subscribr/commit/47909cfa9be65b76c394a5e08e70186bba40e41e))

### Build System
* **config:** update tsconfig.json for TypeScript 6.0 compatibility ([6e6b2e7](https://github.com/D1g1talEntr0py/subscribr/commit/6e6b2e7669438c690dd24edb91c989e6c33a1d49))




## [4.1.10](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.9...v4.1.10) - 2026-03-18




### Bug Fixes
* **deps:** security update for dependency ([91254b1](https://github.com/D1g1talEntr0py/subscribr/commit/91254b120bef1a6d942196ac71eceafc0d66008a))

### Bug Fixes
* Updates collection import to point to package root ([789fa27](https://github.com/D1g1talEntr0py/subscribr/commit/789fa272374714ac3fe620455c4b5f3e219cce9c))




### Documentation
* fix README.md badges and missing properties in package.json ([473b5e4](https://github.com/D1g1talEntr0py/subscribr/commit/473b5e42516b33280a0284a4a799cb2c1279bb99))



### Chores
* **ci:** add .githooks ([071ab06](https://github.com/D1g1talEntr0py/subscribr/commit/071ab061ada767bf722d8b5501f75555fdf798b7))

### Chores
* **deps:** Updates internal packages and synchronizes lockfile ([d275d88](https://github.com/D1g1talEntr0py/subscribr/commit/d275d88680cbcf0cff6cea0cd1281800ad153873))

### Chores
* **release:** 4.1.10 [skip ci] ([a7d9a2a](https://github.com/D1g1talEntr0py/subscribr/commit/a7d9a2a0db894c39e3dcad9fa4cba29aeddd7ad8))



### Tests
* Improves vitest configuration and resolves aliases ([513c1c6](https://github.com/D1g1talEntr0py/subscribr/commit/513c1c648566864e502ef59dd5d06219ff5a514a))





## [4.1.9](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.8...v4.1.9) - 2026-03-18




### Bug Fixes
* **deps:** update dependencies to address CVE-2026-27903 and CVE-2026-27904 ([e62f5d4](https://github.com/D1g1talEntr0py/subscribr/commit/e62f5d4b4a142a561b1da64b8479ad6bf82414f4))






### Chores
* bump dependencies to latest patch versions ([7e76bf3](https://github.com/D1g1talEntr0py/subscribr/commit/7e76bf324f621b42d6b1a8279fd1bd675e90a4a2))

### Chores
* update README.md to correct some errors and add documentation for 'destroy()' ([3e8a467](https://github.com/D1g1talEntr0py/subscribr/commit/3e8a467278c13c2dbc69eacab9513be351c69400))

### Chores
* bump dev dependencies ([2295922](https://github.com/D1g1talEntr0py/subscribr/commit/22959222ae3c497e219d9296297ce7968e7259ff))

### Chores
* transition to MIT license and update project branding ([99653d6](https://github.com/D1g1talEntr0py/subscribr/commit/99653d6a7984bef8beda94af67b8e47050bb7dce))

### Chores
* **release:** 4.1.9 [skip ci] ([50c5c65](https://github.com/D1g1talEntr0py/subscribr/commit/50c5c65e9ec52702ed0a86c490efa3b82d4f6983))





### Continuous Integration
* simplify workflows and update README badges ([07fb3bd](https://github.com/D1g1talEntr0py/subscribr/commit/07fb3bdb35ab578b282e55a6a3df161784a1673d))

### Continuous Integration
* updated release-please 'uses' to googleapis/release-please-action@v4 ([a660c37](https://github.com/D1g1talEntr0py/subscribr/commit/a660c37e593bcb0472182ad6d7c588fc1f99848f))

### Continuous Integration
* migrate to semantic-release ([453df84](https://github.com/D1g1talEntr0py/subscribr/commit/453df848fe3c61047d9e2dc56ef1e5ab6351b115))

### Continuous Integration
* upgrade workflow actions and refine semantic-release pipeline ([08284ed](https://github.com/D1g1talEntr0py/subscribr/commit/08284edb677712d793a67311dfbfa9bac1b2dbd4))



## [4.1.8](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.7...v4.1.8) - 2026-02-21




### Bug Fixes
* correct permissions in publish workflow\n\n- Add explicit permissions to release-please job (contents: write,\n  pull-requests: write) — previously inherited defaults which may\n  not allow creating releases and PRs\n- Remove packages: write from publish job (GitHub Packages, not npm)\n- Restore contents: write on publish job ([5d8a3c7](https://github.com/D1g1talEntr0py/subscribr/commit/5d8a3c74abc4986c8e6b5a208826e301857fb2d5))






### Chores
* **main:** release 4.1.8 ([ee1c403](https://github.com/D1g1talEntr0py/subscribr/commit/ee1c403c6caa67becbdd1dbd5ad326da4d3361f9))






### Other Changes
* Merge pull request #9 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.8 ([9883668](https://github.com/D1g1talEntr0py/subscribr/commit/9883668a2c6fbea5521517fa92ff12225f041eee))


## [4.1.7](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.6...v4.1.7) - 2026-02-21




### Bug Fixes
* rename release.yml to publish.yml to match npm Trusted Publisher config\n\nThe OIDC token includes the workflow filename. npm validates it against\nthe registered Trusted Publisher, which was configured with the default\n'publish.yml'. The mismatch caused all auth rejections. ([e1fd070](https://github.com/D1g1talEntr0py/subscribr/commit/e1fd07032186d501fc334b31a9f316dbfec3c5ed))






### Chores
* **main:** release 4.1.7 ([3d13ddb](https://github.com/D1g1talEntr0py/subscribr/commit/3d13ddb0f0c733b9f0d266c1d424a030fc43c2bc))






### Other Changes
* Merge pull request #8 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.7 ([46757ba](https://github.com/D1g1talEntr0py/subscribr/commit/46757ba34eae6e0cf9728211dc6c5f9bbe6ea55d))


## [4.1.6](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.5...v4.1.6) - 2026-02-21




### Bug Fixes
* add .npmrc for scope registry and remove setup-node registry-url\n\nCommitting .npmrc with the scope→registry mapping ensures no auth token\nplaceholder is injected by setup-node. Removing registry-url from\nsetup-node prevents it from writing _authToken=\${NODE_AUTH_TOKEN} to\na project-level .npmrc, which was blocking the OIDC Trusted Publisher\nexchange. ([fb2ddeb](https://github.com/D1g1talEntr0py/subscribr/commit/fb2ddeb991196ee8ba27136d7683e3241da36c75))






### Chores
* **main:** release 4.1.6 ([b6e6479](https://github.com/D1g1talEntr0py/subscribr/commit/b6e647922ca05f97c78cad0d8151a403bf3af559))






### Other Changes
* Merge pull request #7 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.6 ([72d7422](https://github.com/D1g1talEntr0py/subscribr/commit/72d742255484efc1074cd8fe3c3231e1739ac208))


## [4.1.5](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.4...v4.1.5) - 2026-02-21




### Bug Fixes
* revert block that removed the _authToken in the release action ([e5ae093](https://github.com/D1g1talEntr0py/subscribr/commit/e5ae093ee60bcb9081b3668da118d00f96fdb84a))






### Chores
* **main:** release 4.1.5 ([86aa31c](https://github.com/D1g1talEntr0py/subscribr/commit/86aa31c7baa77eeb45fbc6b4453d7b0e2ef5ccca))






### Other Changes
* Merge pull request #6 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.5 ([a8aef35](https://github.com/D1g1talEntr0py/subscribr/commit/a8aef35b67e63dda722991717d696c80b1fa58d4))


## [4.1.4](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.3...v4.1.4) - 2026-02-21




### Bug Fixes
* update node version in release action ([4f3efe1](https://github.com/D1g1talEntr0py/subscribr/commit/4f3efe1683618f5ec70712ce0baa69ec387c8772))






### Chores
* **main:** release 4.1.4 ([cef1fc3](https://github.com/D1g1talEntr0py/subscribr/commit/cef1fc3d639d3383034ab8bbb2552791a8e57204))






### Other Changes
* Merge pull request #5 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.4 ([4fc3571](https://github.com/D1g1talEntr0py/subscribr/commit/4fc35718f69ec1682f97142d62977b7d4932cd7f))


## [4.1.3](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.2...v4.1.3) - 2026-02-21




### Bug Fixes
* remove _authToken placeholder so npm uses OIDC exchange\n\nsetup-node writes _authToken=\${NODE_AUTH_TOKEN} to .npmrc. With no\nNODE_AUTH_TOKEN set, npm sends invalid auth instead of falling through\nto the Trusted Publisher OIDC exchange. Deleting it lets npm detect\nACTIONS_ID_TOKEN_REQUEST_URL and obtain a fresh token automatically. ([8de61a3](https://github.com/D1g1talEntr0py/subscribr/commit/8de61a3ea5550470eb93f57812522c1696b16df5))






### Chores
* **main:** release 4.1.3 ([67dd6e4](https://github.com/D1g1talEntr0py/subscribr/commit/67dd6e4a40b026ef7775d6554a33a0b42705e48f))






### Other Changes
* Merge pull request #4 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.3 ([4664f44](https://github.com/D1g1talEntr0py/subscribr/commit/4664f446c2188bfd5cb4f87ab691bef14aba3810))


## [4.1.2](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.1...v4.1.2) - 2026-02-21




### Bug Fixes
* upgrade npm to latest for OIDC Trusted Publisher support\n\nnpm Trusted Publisher requires npm v11.5.1+. The GitHub runner ships\nwith an older version, so upgrade before publishing. Also restore\nregistry-url on setup-node as required by the OIDC auth flow. ([84656e5](https://github.com/D1g1talEntr0py/subscribr/commit/84656e5491fd7967179ada9ced5c5a0e8525803a))






### Chores
* **main:** release 4.1.2 ([eaad3ef](https://github.com/D1g1talEntr0py/subscribr/commit/eaad3efd8aa453f9b5665299524bb93396d91845))






### Other Changes
* Merge pull request #3 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.2 ([b9d7ef4](https://github.com/D1g1talEntr0py/subscribr/commit/b9d7ef4c4eea738275a44fcc7de165039fd1a54f))


## [4.1.1](https://github.com/D1g1talEntr0py/subscribr/compare/v4.1.0...v4.1.1) - 2026-02-21




### Bug Fixes
* add packageManager field for pnpm/action-setup ([ccbff83](https://github.com/D1g1talEntr0py/subscribr/commit/ccbff8318dceceb1b56afce35c8d87da0ed6d787))

### Bug Fixes
* use --noEmit for type-check script ([10076e5](https://github.com/D1g1talEntr0py/subscribr/commit/10076e5471b08b0f355e199df8e2b0b135892b32))






### Chores
* **main:** release 4.1.1 ([994d1d7](https://github.com/D1g1talEntr0py/subscribr/commit/994d1d716a01edd2eec33a5a4a5d30cb7ec28a0f))






### Other Changes
* Merge pull request #2 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.1 ([bb8e289](https://github.com/D1g1talEntr0py/subscribr/commit/bb8e289a2ac1f56f9063838892372c98b06adb91))


## [4.1.0](https://github.com/D1g1talEntr0py/subscribr/compare/v4.0.4...v4.1.0) - 2026-02-21



### Features
* add setErrorHandler for custom error handling\n\nAdd ErrorHandler and SubscriptionOptions types. Update exports. ([5a675b0](https://github.com/D1g1talEntr0py/subscribr/commit/5a675b0cf9a617b77ec63940944a78ce256e4e9a))

### Features
* add error boundary preventing handler errors from blocking others\n\nEvent handler errors are now caught and handled without breaking other subscribers.\nAdd setErrorHandler(), once option, event name validation, and destroy(). ([951a2b9](https://github.com/D1g1talEntr0py/subscribr/commit/951a2b98528fd34d8249a68321d484bca84b8ee6))

### Features
* add once option to subscribe for auto-unsubscribe after first event\n\nAdd comprehensive tests for once subscriptions, error handling, validation, and destroy. ([76fdcce](https://github.com/D1g1talEntr0py/subscribr/commit/76fdcce9d6f1795f904f546d94931d362fb0c975))

### Features
* add event name validation with TypeError and Error\n\nUpdate CHANGELOG and README with documentation for all new features. ([53fd032](https://github.com/D1g1talEntr0py/subscribr/commit/53fd03254bf5e510ae415cd71e7e87168dfb9827))

### Features
* add destroy method to clear all subscriptions\n\nUpdate dependencies, lockfile, gitignore, and copilot instructions. ([4559c3d](https://github.com/D1g1talEntr0py/subscribr/commit/4559c3df88ffc051e8b6c0ad6e48f4dd8c4dac4f))







### Chores
* **main:** release 4.1.0 ([7d7b331](https://github.com/D1g1talEntr0py/subscribr/commit/7d7b3317ae939dfd44c7c81369fdd2f576f3d73e))





### Continuous Integration
* add GitHub Actions CI, release-please, and Codecov integration\n\n- Add CI workflow (lint, type-check, test, coverage upload, build)\n- Add release workflow with release-please and npm publish --provenance\n- Add release-please config seeded at 4.0.4\n- Add codecov.yml configuration\n- Add json coverage reporter to vitest config\n- Remove sonar outputFile from vitest config\n- Add CI and Codecov badges to README ([0c84e7a](https://github.com/D1g1talEntr0py/subscribr/commit/0c84e7a9356a01525a2c10bd05dc2d106b7aca05))

### Continuous Integration
* remove CODECOV_TOKEN from CI workflow\n\nCodecov no longer requires a token for public repos. ([93b3eaa](https://github.com/D1g1talEntr0py/subscribr/commit/93b3eaabb0cea049f03062d1b2eca58cf64cd48d))


### Other Changes
* Merge pull request #1 from D1g1talEntr0py/release-please--branches--main--components--subscribr

chore(main): release 4.1.0 ([8ebffbc](https://github.com/D1g1talEntr0py/subscribr/commit/8ebffbcebb8b3889225bea96d19bf22b34dbb2f9))


## [4.0.4](https://github.com/D1g1talEntr0py/subscribr/compare/v4.0.3...v4.0.4) - 2025-10-10














### Other Changes
* Maintenance release. Dependency updates ([ac5003f](https://github.com/D1g1talEntr0py/subscribr/commit/ac5003f95922f1c3439b2393414977fda394193e))


## [4.0.3](https://github.com/D1g1talEntr0py/subscribr/compare/v4.0.2...v4.0.3) - 2025-09-04














### Other Changes
* Update JSDoc comments to TypeScript format and updated eslint config ([8db6426](https://github.com/D1g1talEntr0py/subscribr/commit/8db6426aafba3f3b246469d402820753248727ef))


## [4.0.2](https://github.com/D1g1talEntr0py/subscribr/compare/v4.0.0...v4.0.2) - 2025-07-20














### Other Changes
* Maintenance update: updated dependencies and tsconfig.json ([9d37ae4](https://github.com/D1g1talEntr0py/subscribr/commit/9d37ae4fd3874cdd75694ceeb1770cc29ae3a09b))

### Other Changes
* Dependency Updates ([f0e6ce1](https://github.com/D1g1talEntr0py/subscribr/commit/f0e6ce1c0bd4e1ed17839e8daa1996f943c254ac))


## [4.0.0](https://github.com/D1g1talEntr0py/subscribr/compare/v3.0.4...v4.0.0) - 2024-09-08














### Other Changes
* Maintenance release ([713d89c](https://github.com/D1g1talEntr0py/subscribr/commit/713d89c58773d42e4b124fc8447630db7aceb889))

### Other Changes
* Project is now using TypeScript and Vitest
- Converted source to TypeScript.
- Migrated from Jest to Vitest for unit testing.
- Updated esbuild to use the new flat config format. ([81a138a](https://github.com/D1g1talEntr0py/subscribr/commit/81a138aba7c86df53d78937f45fbfb571bee109c))


## [3.0.4](https://github.com/D1g1talEntr0py/subscribr/compare/v3.0.3...v3.0.4) - 2024-02-10














### Other Changes
* Maintenance release ([4a4442e](https://github.com/D1g1talEntr0py/subscribr/commit/4a4442ec8c22903dbb8a18d0b7f5a6bf2cd292ff))


## [3.0.3](https://github.com/D1g1talEntr0py/subscribr/compare/v3.0.2...v3.0.3) - 2023-11-30














### Other Changes
* Maintenance update ([6c72ae8](https://github.com/D1g1talEntr0py/subscribr/commit/6c72ae8d2f38230d340c1780ebea5f4f2141ad6a))


## [3.0.2](https://github.com/D1g1talEntr0py/subscribr/compare/v3.0.1...v3.0.2) - 2023-11-03














### Other Changes
* Switched to pnpm for package management and removed d.ts files. ([c127cc2](https://github.com/D1g1talEntr0py/subscribr/commit/c127cc2a291d5b14a6e60d9ac2f04c9eccf3f8a1))


## [3.0.1](https://github.com/D1g1talEntr0py/subscribr/compare/v3.0.0...v3.0.1) - 2023-05-04














### Other Changes
* Dependency updates and eslint config changes ([39e95e9](https://github.com/D1g1talEntr0py/subscribr/commit/39e95e99c4d052c557c35e63e85ddcb7b074b2c1))


## [3.0.0](https://github.com/D1g1talEntr0py/subscribr/compare/v2.0.2...v3.0.0) - 2022-10-23














### Other Changes
* Refactored unsubscribe to simplify the using the methods in the Subscribr instance.
-Added npm script to create the TypeScript declaration files.
-Updated dependencies.
-Udpated README.
-Added a 'handle()' method to ContextEventHandler and removed 'context' and 'eventHandler' properties.
-Optimized and simplified the main 'Subscribr' class.
-Removed 'context' and 'eventHandler' properties and replaced it with 'contextEventHandler' property. ([dfd5ac0](https://github.com/D1g1talEntr0py/subscribr/commit/dfd5ac0e0082bfdbb261e17acfba977972239773))


## [2.0.2](https://github.com/D1g1talEntr0py/subscribr/compare/...v2.0.2) - 2022-10-17














### Other Changes
* Initial commit ([ebe4d30](https://github.com/D1g1talEntr0py/subscribr/commit/ebe4d307cbfa2156e9c1eebd763c85eb992ea9d2))

### Other Changes
* Initial commit ([d51fd47](https://github.com/D1g1talEntr0py/subscribr/commit/d51fd47507c594e9ea123074ca55e1a11f5a64eb))

### Other Changes
* Merge branch 'main' of github.com:D1g1talEntr0py/subscribr ([85e5dc8](https://github.com/D1g1talEntr0py/subscribr/commit/85e5dc8dcbab929762087303958ce79598e3b4d8))

### Other Changes
* Refactored Subscribr class - Still needs some work
-Calling subscribe will return an instance of a Subscription class.
-Added ContextEventHandler class to add to the context and event handler to the underlying Set of the SetMultiMap.
-Added method 'isSubscribed' to check if the Subscription is active.
-Updated README.
-Added first unit tests. ([ab6f232](https://github.com/D1g1talEntr0py/subscribr/commit/ab6f23210e9179fcdd7cb940679b952a6fd74769))

