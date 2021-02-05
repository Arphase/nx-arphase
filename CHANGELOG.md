# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.6.0](https://bitbucket.org/arphase/innovatech/compare/v1.3.2...v1.6.0) (2021-01-28)


### Features

* **app:** implement dirty form guard in vehicles, groups, and guarantees ([49fcee6](https://bitbucket.org/arphase/innovatech/commit/49fcee6095ebd517f51e64087f4811d41916e710))
* **guarantees:** add invoice number to list and Excel ([0023a41](https://bitbucket.org/arphase/innovatech/commit/0023a41e6ef25449ac8ca64acf85d4aacc9d5c98))
* **guarantees:** create new vehicle un update if has different vin ([90126f9](https://bitbucket.org/arphase/innovatech/commit/90126f95fd50004a9cce68a5834669d46671b54f))
* **guarantees:** populate vehicles from VIN in form ([0ffe9f0](https://bitbucket.org/arphase/innovatech/commit/0ffe9f0d21c2ccdc77d917be9b4c10e3d1abd0c8))
* **revision-request:** model ([899b94a](https://bitbucket.org/arphase/innovatech/commit/899b94a0cd13636e41ce090d141ae436c0406af5))
* **revision-requests:** add companyId and userId relations ([ac62f31](https://bitbucket.org/arphase/innovatech/commit/ac62f317542c72b6c282ea541fbd967c0daf771d))
* **revision-requests:** create endpoint ([05399a2](https://bitbucket.org/arphase/innovatech/commit/05399a2074ca21c9583f69b8569625e7be0b7ccd))
* **revisions:** update vehicle status when creating new elegible revision ([412d5ae](https://bitbucket.org/arphase/innovatech/commit/412d5ae034bac89bf07b26830b17a5ec3554960a))
* **state:** add loadingModify variable for modify operations (Create, Update, and Delete) ([c441e83](https://bitbucket.org/arphase/innovatech/commit/c441e835476b2f2673c907f6a7e1c00eeb64307a))
* **ui:** add a proxy service for API calls ([a38f4c1](https://bitbucket.org/arphase/innovatech/commit/a38f4c1feedc14f6479b7c7fdf824d89055e8712))
* **ui:** add dirty form guard ([de9fe5c](https://bitbucket.org/arphase/innovatech/commit/de9fe5cb6bc150565aeed0c5b99ec39e15c87919))
* **ui:** use SASS module system ([6226004](https://bitbucket.org/arphase/innovatech/commit/62260043462098e6945189813ef5fc3bbd5c7943))
* **vehicles:** add constraint of vin length to equal 17 ([8dafb66](https://bitbucket.org/arphase/innovatech/commit/8dafb66dec88ec27d9670609e5e3633280c541ab))
* **vehicles:** add status to model ([be7cfea](https://bitbucket.org/arphase/innovatech/commit/be7cfea0301303a3fd9b304627e8cbca08b01e2c))
* **vehicles:** filter by text in API ([d3c390a](https://bitbucket.org/arphase/innovatech/commit/d3c390af1105a0c279ffbc374a56c54375a5f4ca))
* **vehicles:** schedule midnight job to update status depending on revisions ([fdd7fba](https://bitbucket.org/arphase/innovatech/commit/fdd7fbaa20ed2d1e41478e91c9d45a1c7edc7307))
* **vehicles:** status color in row ([82a9edd](https://bitbucket.org/arphase/innovatech/commit/82a9edddd9a32a9bd3cccc93cc7f440ee900fa0c))
* **vehicles:** validate in form not submitting vehicles with repeated vin ([70ccc41](https://bitbucket.org/arphase/innovatech/commit/70ccc4182315d8c4246b34b2682dd836b2364e20))


## [1.5.0](https://bitbucket.org/arphase/innovatech/compare/v1.4.0...v1.5.0) (2021-01-19)


### Features

* **revisions:** create form ([eabb782](https://bitbucket.org/arphase/innovatech/commit/eabb782922a885fe9b62923bf3c0de6483c117de))
* **revisions:** create model ([dfb6d49](https://bitbucket.org/arphase/innovatech/commit/dfb6d49348eaf7a9113ea243bdd56973ddb5728e))
* **revisions:** delete ([1966953](https://bitbucket.org/arphase/innovatech/commit/1966953fa20f479f42f5cd86568a43d9e381aa47))
* **revisions:** delete endpoint ([36da58b](https://bitbucket.org/arphase/innovatech/commit/36da58bfb4aa5d4337f666d31a0cfc51465abe14))
* **revisions:** edit ([30f3f3f](https://bitbucket.org/arphase/innovatech/commit/30f3f3f2d56dfb9617ad03793ee226f46e41d2a6))
* **revisions:** get by id endpoint ([7517182](https://bitbucket.org/arphase/innovatech/commit/7517182548ea8438065f9cab9547dacf4d2eeaa0))
* **revisions:** list ([a1cce22](https://bitbucket.org/arphase/innovatech/commit/a1cce221376c5a1ac26426c415419881f95abb82))
* **revisions:** list endpoint ([b6fdd51](https://bitbucket.org/arphase/innovatech/commit/b6fdd51b6c630a41bf46f81675982c0f0a1d35a1))
* **revisions:** post endpoint ([d8da707](https://bitbucket.org/arphase/innovatech/commit/d8da70754cd017c9c3b4a649136b51c30a931aeb))
* **revisions:** setup ui module ([abe3f26](https://bitbucket.org/arphase/innovatech/commit/abe3f269947c21f7b6a0208c91ca60d2d97ee42a))
* **vehicles:** create guarantee from list ([e5c8571](https://bitbucket.org/arphase/innovatech/commit/e5c8571da1a9cd4bf08c145d1c77d56c331fe794))

## [1.4.0](https://bitbucket.org/arphase/innovatech/compare/v1.3.1...v1.4.0) (2021-01-16)


### Features

* **api:** update class-transformer syntax ([7a3b07e](https://bitbucket.org/arphase/innovatech/commit/7a3b07ee65dae72aad50663b9395d595dc242610))
* **app:** add PWA support ([cefe1db](https://bitbucket.org/arphase/innovatech/commit/cefe1db3c08955ab88d979bfbab26a216491ac6a))
* **guarantees:** use new vehicle model ([005747a](https://bitbucket.org/arphase/innovatech/commit/005747a5c84368fe06d8038150421d841d717c41))
* **vehicles:** create shareable form component ([bc95c74](https://bitbucket.org/arphase/innovatech/commit/bc95c74883a2b4d58931d85c67104e09f60f8a71))
* **vehicles:** delete confirmation dialog ([a5c1194](https://bitbucket.org/arphase/innovatech/commit/a5c11942eccb2e21e91aa770a0883bb5a4b738fc))
* **vehicles:** delete endpoint ([b872c51](https://bitbucket.org/arphase/innovatech/commit/b872c5112744de5b66d7082fb89e9a8cd71eccfc))
* **vehicles:** endpoint for create item ([73e58f1](https://bitbucket.org/arphase/innovatech/commit/73e58f19db27f70c83a00c85eebe905fe40fdfb6))
* **vehicles:** form ([6ce447d](https://bitbucket.org/arphase/innovatech/commit/6ce447d37bf1282afbb66b965e374cd7c0d0f05c))
* **vehicles:** get item endpoint ([2f10872](https://bitbucket.org/arphase/innovatech/commit/2f10872c4325d2edcb522ae13122348a397dfd0b))
* **vehicles:** get items endpoint ([2ed6259](https://bitbucket.org/arphase/innovatech/commit/2ed6259376eacaa76395b6038829c7936176147c))
* **vehicles:** list ([12431f2](https://bitbucket.org/arphase/innovatech/commit/12431f24febb73ef632a3a65921ae970e93a7d6b))
* **vehicles:** update item ([7675a43](https://bitbucket.org/arphase/innovatech/commit/7675a43d61381a589eab1832d3f9af1c9bc0e926))
* **vehicles:** update model ([c40d615](https://bitbucket.org/arphase/innovatech/commit/c40d615c39bebdf6448763b6522bbd6eb80f41ee))

## [1.5.0](https://bitbucket.org/arphase/innovatech/compare/v1.4.0...v1.5.0) (2021-01-19)


### Features

* **revisions:** create form ([eabb782](https://bitbucket.org/arphase/innovatech/commit/eabb782922a885fe9b62923bf3c0de6483c117de))
* **revisions:** create model ([dfb6d49](https://bitbucket.org/arphase/innovatech/commit/dfb6d49348eaf7a9113ea243bdd56973ddb5728e))
* **revisions:** delete ([1966953](https://bitbucket.org/arphase/innovatech/commit/1966953fa20f479f42f5cd86568a43d9e381aa47))
* **revisions:** delete endpoint ([36da58b](https://bitbucket.org/arphase/innovatech/commit/36da58bfb4aa5d4337f666d31a0cfc51465abe14))
* **revisions:** edit ([30f3f3f](https://bitbucket.org/arphase/innovatech/commit/30f3f3f2d56dfb9617ad03793ee226f46e41d2a6))
* **revisions:** get by id endpoint ([7517182](https://bitbucket.org/arphase/innovatech/commit/7517182548ea8438065f9cab9547dacf4d2eeaa0))
* **revisions:** list ([a1cce22](https://bitbucket.org/arphase/innovatech/commit/a1cce221376c5a1ac26426c415419881f95abb82))
* **revisions:** list endpoint ([b6fdd51](https://bitbucket.org/arphase/innovatech/commit/b6fdd51b6c630a41bf46f81675982c0f0a1d35a1))
* **revisions:** post endpoint ([d8da707](https://bitbucket.org/arphase/innovatech/commit/d8da70754cd017c9c3b4a649136b51c30a931aeb))
* **revisions:** setup ui module ([abe3f26](https://bitbucket.org/arphase/innovatech/commit/abe3f269947c21f7b6a0208c91ca60d2d97ee42a))
* **vehicles:** create guarantee from list ([e5c8571](https://bitbucket.org/arphase/innovatech/commit/e5c8571da1a9cd4bf08c145d1c77d56c331fe794))


### Bug Fixes

* **core:** lazy load lists ([eeef985](https://bitbucket.org/arphase/innovatech/commit/eeef9855c6c9b70dd6661832ddcb1c2c468cc0b0))
* **dashboard:** calculate status amounts correctly ([02f28bc](https://bitbucket.org/arphase/innovatech/commit/02f28bcea35504c104f092d9b674c321311c33c9))
* **ui:** email and phone input validation ([1bbfe1d](https://bitbucket.org/arphase/innovatech/commit/1bbfe1da11502ac399245f327cd58ddf177e1c5c))

## [1.4.0](https://bitbucket.org/arphase/innovatech/compare/v1.3.1...v1.4.0) (2021-01-16)


### Features

* **api:** update class-transformer syntax ([7a3b07e](https://bitbucket.org/arphase/innovatech/commit/7a3b07ee65dae72aad50663b9395d595dc242610))
* **app:** add PWA support ([cefe1db](https://bitbucket.org/arphase/innovatech/commit/cefe1db3c08955ab88d979bfbab26a216491ac6a))
* **guarantees:** use new vehicle model ([005747a](https://bitbucket.org/arphase/innovatech/commit/005747a5c84368fe06d8038150421d841d717c41))
* **vehicles:** create shareable form component ([bc95c74](https://bitbucket.org/arphase/innovatech/commit/bc95c74883a2b4d58931d85c67104e09f60f8a71))
* **vehicles:** delete confirmation dialog ([a5c1194](https://bitbucket.org/arphase/innovatech/commit/a5c11942eccb2e21e91aa770a0883bb5a4b738fc))
* **vehicles:** delete endpoint ([b872c51](https://bitbucket.org/arphase/innovatech/commit/b872c5112744de5b66d7082fb89e9a8cd71eccfc))
* **vehicles:** endpoint for create item ([73e58f1](https://bitbucket.org/arphase/innovatech/commit/73e58f19db27f70c83a00c85eebe905fe40fdfb6))
* **vehicles:** form ([6ce447d](https://bitbucket.org/arphase/innovatech/commit/6ce447d37bf1282afbb66b965e374cd7c0d0f05c))
* **vehicles:** get item endpoint ([2f10872](https://bitbucket.org/arphase/innovatech/commit/2f10872c4325d2edcb522ae13122348a397dfd0b))
* **vehicles:** get items endpoint ([2ed6259](https://bitbucket.org/arphase/innovatech/commit/2ed6259376eacaa76395b6038829c7936176147c))
* **vehicles:** list ([12431f2](https://bitbucket.org/arphase/innovatech/commit/12431f24febb73ef632a3a65921ae970e93a7d6b))
* **vehicles:** update item ([7675a43](https://bitbucket.org/arphase/innovatech/commit/7675a43d61381a589eab1832d3f9af1c9bc0e926))
* **vehicles:** update model ([c40d615](https://bitbucket.org/arphase/innovatech/commit/c40d615c39bebdf6448763b6522bbd6eb80f41ee))
* **groups:** handle transactions correcly on create/update ([6d84946](https://bitbucket.org/arphase/innovatech/commit/6d849466bd3e9430c9d4b114a27aff39dac961ca))

### [1.3.3](https://bitbucket.org/arphase/innovatech/compare/v1.3.2...v1.3.3) (2021-02-05)


### Bug Fixes

* **guarantees:** add vehicle creation in a transaction when creating guarantee ([5c70ce6](https://bitbucket.org/arphase/innovatech/commit/5c70ce662a5141b622cbd0deaf8f186be2b2970f))
* **ui:** display correct error message for number inputs ([b7a3fe5](https://bitbucket.org/arphase/innovatech/commit/b7a3fe5750ba12d70b5b1be6e9f643a88bec60f0))
* **vehicles:** add min validator to HP field ([05bddbb](https://bitbucket.org/arphase/innovatech/commit/05bddbb76e656d254727f224b5566653e23522f5))
* **vehicles:** use correct loading variable on form ([d644482](https://bitbucket.org/arphase/innovatech/commit/d644482b1cf500c0f70bf4d31cc7ab3e95852c31))

### [1.3.2](https://bitbucket.org/arphase/innovatech/compare/v1.3.1...v1.3.2) (2021-01-22)


### Bug Fixes

* **core:** lazy load lists ([eeef985](https://bitbucket.org/arphase/innovatech/commit/eeef9855c6c9b70dd6661832ddcb1c2c468cc0b0))
* **dashboard:** calculate status amounts correctly ([02f28bc](https://bitbucket.org/arphase/innovatech/commit/02f28bcea35504c104f092d9b674c321311c33c9))
* **dashboard:** display empty state when having ceros ([839f9fa](https://bitbucket.org/arphase/innovatech/commit/839f9fa35265a8a3a51244a53495c936e2d88c9c))
* **guarantees:** display product logo in PDF ([5c83bb4](https://bitbucket.org/arphase/innovatech/commit/5c83bb40396e9660481b3a86ca318197ba19b923))
* **ui:** email and phone input validation ([1bbfe1d](https://bitbucket.org/arphase/innovatech/commit/1bbfe1da11502ac399245f327cd58ddf177e1c5c))

### [1.3.1](https://bitbucket.org/arphase/innovatech/compare/v1.3.0...v1.3.1) (2021-01-13)


### Features

* **app:** add application version ([fe0d19a](https://bitbucket.org/arphase/innovatech/commit/fe0d19adc4b4075ff17eaf409eecdbdef373d401))
* **dashboard:** mobile responsiveness ([9f86810](https://bitbucket.org/arphase/innovatech/commit/9f868106b52a296c0f3d86c41296cd30f57075b2))
* **groups:** mobile responsiveness ([e523210](https://bitbucket.org/arphase/innovatech/commit/e523210aec29f77fee6c2e879921e607fd02e223))
* **guarantees:** mobile responsiveness ([d0ae334](https://bitbucket.org/arphase/innovatech/commit/d0ae334e23f47aa587736e12fe9375a1612556b6))
* **state:** filter options by alphabetical order ([c41041b](https://bitbucket.org/arphase/innovatech/commit/c41041b40e544e67d1ec87b3a939a6428a9148af))
* **users:** filter by text ([6be2288](https://bitbucket.org/arphase/innovatech/commit/6be2288c4f143ebd13c5154c42689b1df453e087))


### Bug Fixes

* **forms:** markForCheck for child forms ([543341a](https://bitbucket.org/arphase/innovatech/commit/543341a56e1f0b9810724d7a1084a9ef8436fd4d))
* **groups:** can create groups without users or companies ([91cb079](https://bitbucket.org/arphase/innovatech/commit/91cb079fd1ae3e14a304052c2f1bfd5189584995))
* **groups:** create all companies and users array ([254991e](https://bitbucket.org/arphase/innovatech/commit/254991ef5f378300ff57ee4c16208404fa8b8ee5))
* **groups:** send email to users with no password on edit ([41c0f4d](https://bitbucket.org/arphase/innovatech/commit/41c0f4db4107bcf7b2154dcf539e92db888c75a4))
* **guarantees:** filter by status ([5b2b6c9](https://bitbucket.org/arphase/innovatech/commit/5b2b6c96d3534714707d809788c9974bfc420821))
* **ui:** clear checkbox filter correctly ([a4a93bd](https://bitbucket.org/arphase/innovatech/commit/a4a93bd67bb667f088eb73b03dbd0789e8dc4d18))
* **ui:** display label correctly for inputs with mask ([5c40fe1](https://bitbucket.org/arphase/innovatech/commit/5c40fe1224f4f25a198d3b4a15a18ffacff26678))

## [1.3.0](https://bitbucket.org/arphase/innovatech/compare/v1.2.1...v1.3.0) (2021-01-10)


### Features

* **dashboard:** add date, group, company, and user filters ([da7c004](https://bitbucket.org/arphase/innovatech/commit/da7c004fab8f355046c74bcdbe9902c8749cf1fc))
* **groups:** secure endpoints ([24f6aad](https://bitbucket.org/arphase/innovatech/commit/24f6aad90a494ab84a096c81d33154c33fef441d))
* **guarantees:** filter by company ([98b7ba5](https://bitbucket.org/arphase/innovatech/commit/98b7ba595fb925662f1f87488f2d144669d2297d))
* **guarantees:** filter by group id ([be83678](https://bitbucket.org/arphase/innovatech/commit/be836783eba2881c8aceae9ce007e750fc91afd6))
* **guarantees:** filter by users ([09ca07c](https://bitbucket.org/arphase/innovatech/commit/09ca07ca3a2ab800c301ca7fa7ad08525a087ea6))
* **ui:** checkbox filter component ([e1bb16e](https://bitbucket.org/arphase/innovatech/commit/e1bb16e5662a7eeab4b2ab4440536ea7b2498315))
* **users:** get with query endpoint ([90fe31b](https://bitbucket.org/arphase/innovatech/commit/90fe31b940bbbfabcc43f454d2744a35f53d3230))
* **users:** list ([026ca8f](https://bitbucket.org/arphase/innovatech/commit/026ca8f95cc18c62771fcd8716e07103364c49f1))


### Bug Fixes

* **core:** lazy load lists ([c2337fe](https://bitbucket.org/arphase/innovatech/commit/c2337fe3e96ef381d5dc617ba6b01810dd4c0af6))
* **guarantees:** display moral info in edit ([da7ed89](https://bitbucket.org/arphase/innovatech/commit/da7ed89de78ee86265ee4c31d93116d944b0b066))
* **guarantees:** make user able to update guarantee switching between physical and moral person ([de93af5](https://bitbucket.org/arphase/innovatech/commit/de93af58d8b7565ca5e1054ece80f3b9bb107e16))
* **guarantees:** patch value after view init due disabled form errors ([60d9dde](https://bitbucket.org/arphase/innovatech/commit/60d9dde418dc28b3e5fc76cb3d4427596c15b560))
* **ui:** use mat-dialog-content correctly ([498cb27](https://bitbucket.org/arphase/innovatech/commit/498cb272aedd2622020fc1ccc0f6e6ef2e0ae45b))

### [1.2.1](https://bitbucket.org/arphase/innovatech/compare/v1.2.0...v1.2.1) (2020-12-21)


### Features

* **api:** add migration for companyId in guarantee ([5dc9080](https://bitbucket.org/arphase/innovatech/commit/5dc9080d228e52eb41de497479f6240884876975))
* **app:** add eslint ([21be20a](https://bitbucket.org/arphase/innovatech/commit/21be20a52cb5af92a87c1d67b788ce25d608d83b))
* **app:** add phone pipe and mask ([a8e71d0](https://bitbucket.org/arphase/innovatech/commit/a8e71d0453d78794ba5ed7c272e59d7a7da11bb3))
* **auth:** reset password flow ([6540997](https://bitbucket.org/arphase/innovatech/commit/6540997cf56efda467d908c315b17e3459a37574))
* **auth:** validate password token ([8c9a8a1](https://bitbucket.org/arphase/innovatech/commit/8c9a8a102edf2bb668ed0982a7c73e4b07769ea1))
* **groups:** add filtering to group list ([d3e13f2](https://bitbucket.org/arphase/innovatech/commit/d3e13f21c60f066c4a69edb6e7f67a8f11727396))
* **groups:** add validations to company form ([1de5a85](https://bitbucket.org/arphase/innovatech/commit/1de5a8528c1af90b2919491bd1cc4360510404b7))
* **groups:** companies list in form ([0bafbf7](https://bitbucket.org/arphase/innovatech/commit/0bafbf70165c4a251869571243b058504f65b1bd))
* **groups:** send pending users email when updating the group ([fec13bc](https://bitbucket.org/arphase/innovatech/commit/fec13bcc53463d82b4db95d2576a72c8f66f84f2))
* **guarantees:** add all guarantee properties to Excel export ([7053d99](https://bitbucket.org/arphase/innovatech/commit/7053d997d17721f7d2269697e990a400a18747b8))
* **guarantees:** add motorNumber and client name to text filter ([ce1a6d5](https://bitbucket.org/arphase/innovatech/commit/ce1a6d5c722ce17ae0461ad6109cb6b3e18d637a))
* **guarantees:** lock company field for agency users ([0b0ecf3](https://bitbucket.org/arphase/innovatech/commit/0b0ecf3e369b756cae344d820a2f3ae01ce62f41))
* **guarantees:** make super user able to select company when creating new guarantee ([452470b](https://bitbucket.org/arphase/innovatech/commit/452470b4e5d22cbafdaf48952b21b2d4ab2d0c53))
* **guarantees:** update invoice number ([91ef07b](https://bitbucket.org/arphase/innovatech/commit/91ef07b8aa452d8dc2791e8c4f3546a8d96abb38))


### Bug Fixes

* **app:** bugs from Daniel's Word ([7efabdc](https://bitbucket.org/arphase/innovatech/commit/7efabdc4abf8997ebbc3a1e9abcb781a0870cc62))

## [1.2.0](https://bitbucket.org/arphase/innovatech/compare/v1.1.0...v1.2.0) (2020-11-19)


### Features

* **api:** add Amazon SES settings ([e8e306b](https://bitbucket.org/arphase/innovatech/commit/e8e306bbf8dcf603c182d0fea833c372ecab4564))
* **api:** add gruops and products database migration ([b9bc046](https://bitbucket.org/arphase/innovatech/commit/b9bc046379cf7b30ce7973d3bc057bf93c07c46c))
* **auth:** add email environment variables ([e3c4b69](https://bitbucket.org/arphase/innovatech/commit/e3c4b695f04b4bf2f13672dbf0e3fb2cf501fffd))
* **auth:** set password flow ([17c4763](https://bitbucket.org/arphase/innovatech/commit/17c47638f8da8bd51cd8a05539374aad4c4ecd38))
* **groups:** Create post group endpoint ([a72d7b5](https://bitbucket.org/arphase/innovatech/commit/a72d7b5638ee6001e7de058458396df6476a3075))
* **groups:** Create Put endpoint ([8d2dfbd](https://bitbucket.org/arphase/innovatech/commit/8d2dfbd23bcd161eceb565a833c75f763a04e98a))
* **groups:** Get by id endpoint. Add select false to entity columns ([879a313](https://bitbucket.org/arphase/innovatech/commit/879a31345d4d8caa0c0ce74551214e6b31ba1d48))
* **groups:** Get endpoint. Lazy loading & filters. Add created & updated at to entities ([d4569a9](https://bitbucket.org/arphase/innovatech/commit/d4569a9548e52f151dd6b0ff84c66b90f5e7fa2b))
* **groups:** Send email to each user on create group ([7d27676](https://bitbucket.org/arphase/innovatech/commit/7d2767652e2f5236c5e047284d7f2d4617301238))
* **guarantees:** add user decorator to segment guarantees by user ([3bc477d](https://bitbucket.org/arphase/innovatech/commit/3bc477de29433c2fd9d056b1eef11cf726a92709))
* **ui:** add file-upload component ([349bfd0](https://bitbucket.org/arphase/innovatech/commit/349bfd0d7ca022a9a46fe5e3bb143d5eb9b8a2d6))


### Bug Fixes

* **auth:** make password and salt selectable in order to login ([48074e6](https://bitbucket.org/arphase/innovatech/commit/48074e64ae3f435913d555cb9c27e6c5e1d522e5))
* **guarantees:** save productId ([cd67a5f](https://bitbucket.org/arphase/innovatech/commit/cd67a5f32d44f5cecff4956c60ad530bd5b8ef3a))
* **product:** transform to html in backend ([5f73eb9](https://bitbucket.org/arphase/innovatech/commit/5f73eb95464bf775bd8b34d6156f1aa28739b7af))

## [1.1.0](https://bitbucket.org/arphase/innovatech/compare/v1.0.0...v1.1.0) (2020-10-10)


### Features

* **auth:** create new user role ([cfc1a20](https://bitbucket.org/arphase/innovatech/commit/cfc1a206110222564121daa7ebc7b7a5cfcde346))
* **guarantees:** display distributor column ([d5e2881](https://bitbucket.org/arphase/innovatech/commit/d5e2881f4ed3320510d0eff8250ce01391ed76a4))
* **guarantees:** export to Excel ([7e02c18](https://bitbucket.org/arphase/innovatech/commit/7e02c189339d9459474ce679763d2639c3b54623))
* **payment-orders:** edit ([320a8e1](https://bitbucket.org/arphase/innovatech/commit/320a8e137c630bdd4ddb25a2c972c04478ac4155))
* **state:** logout on unauthorized API response ([8a5b670](https://bitbucket.org/arphase/innovatech/commit/8a5b6700540299d2408cd9c3c1dcd0a977526abf))
* **ui:** create autocomplete component ([bcb864a](https://bitbucket.org/arphase/innovatech/commit/bcb864a5c98bce2734c984ac7ef88323b85c9be0))
* **users:** add migration for roles ([52b0d8b](https://bitbucket.org/arphase/innovatech/commit/52b0d8b0b29b097c44e8652c42ad33810f18a3fb))

## 1.0.0 (2020-09-09)


### Features

* **api:** add custom configuration for migrations ([6cb3b39](https://bitbucket.org/arphase/innovatech/commit/6cb3b39a6598ca2fd899dc2453f896d087895b0e))
* **api:** add database migrations ([ea67f91](https://bitbucket.org/arphase/innovatech/commit/ea67f918fe6c6121c8931536d60c38c4cd20861b))
* **app:** responsive for iPad ([f753f06](https://bitbucket.org/arphase/innovatech/commit/f753f069a7540bf5d635a9d6b3ede684b5550bdd))
* **auth:** add guarding and navigation ([256496f](https://bitbucket.org/arphase/innovatech/commit/256496f4b98fb6efa55b24b45d499de2c9cf4709))
* **auth:** Create signin endpoint. Add super admin seeds. Configure typeorm ([18a339b](https://bitbucket.org/arphase/innovatech/commit/18a339b2bfae3ac67002ed0efb85e89c0a184465))
* **auth:** sign in form ([f8208da](https://bitbucket.org/arphase/innovatech/commit/f8208dab101583486d9fd7ceeac2336b4eba506a))
* **dashboard:** display guarantee summary ([6a2aa35](https://bitbucket.org/arphase/innovatech/commit/6a2aa35ac19b7f007d7b90168ca135b596c8d85c))
* **dashboard:** map guarantees summary with endpoint ([f383c9f](https://bitbucket.org/arphase/innovatech/commit/f383c9feae3f7e519a77951f10d806e0da124204))
* **guarantee:** add collection service ([d296c80](https://bitbucket.org/arphase/innovatech/commit/d296c806970b2cbecd1bf003d85ca854169b43ea))
* **guarantees:** adapt form to tables model ([e91a0a7](https://bitbucket.org/arphase/innovatech/commit/e91a0a7a0029859b64c465995582c83ed8f89df5))
* **guarantees:** Add create guarantee dtos ([79309e2](https://bitbucket.org/arphase/innovatech/commit/79309e23de968949e1dfda7958c5f6acd210d83b))
* **guarantees:** Add filters by date & text. Lazy loading. Add street numbers ([f427800](https://bitbucket.org/arphase/innovatech/commit/f4278008d9f69c0a277b1ec7a58e20144b8f9e25))
* **guarantees:** add paymentOrderId when updating cache ([7b058bc](https://bitbucket.org/arphase/innovatech/commit/7b058bc83fa54b90008157fca0024cfd2a9b57ad))
* **guarantees:** Add post guarantee endpoint ([b13b5f1](https://bitbucket.org/arphase/innovatech/commit/b13b5f13515bfce2874949edb9618e115fd7038b))
* **guarantees:** Add Put ([b90e99d](https://bitbucket.org/arphase/innovatech/commit/b90e99da7cdeb1acb661a6cb22cad0cc64c8f18d))
* **guarantees:** add resolver for list ([58fc609](https://bitbucket.org/arphase/innovatech/commit/58fc60956488d12d44a6c02c95dcbff4394340b3))
* **guarantees:** Add sort & direction to get guarantees ([5b4f880](https://bitbucket.org/arphase/innovatech/commit/5b4f88014f272df4d7d7f9a98865c8cba0139020))
* **guarantees:** add toastr and navigation on create ([0827a71](https://bitbucket.org/arphase/innovatech/commit/0827a71d375ee122180e1957aee978be9fdffd14))
* **guarantees:** cascade save ([25f5686](https://bitbucket.org/arphase/innovatech/commit/25f5686bafe4d97c6c4497210878b67649bedc71))
* **guarantees:** change guarantee status ([6941db1](https://bitbucket.org/arphase/innovatech/commit/6941db1af219029e30cdb151ddee704b1b5e1501))
* **guarantees:** Create list endpoint with no filters ([52527e9](https://bitbucket.org/arphase/innovatech/commit/52527e910f44cfa7a2c9dd1e406e8ee9337d3356))
* **guarantees:** Create Payment Order Dialog and Guarantee Form Edit ([d68c621](https://bitbucket.org/arphase/innovatech/commit/d68c621afb890fa41ea98ee2f5a91d1ba1c4573c))
* **guarantees:** database modifications ([ba669d0](https://bitbucket.org/arphase/innovatech/commit/ba669d090f5b945c024de7df79fdab25bf56fae2))
* **guarantees:** delete ([41f9cdb](https://bitbucket.org/arphase/innovatech/commit/41f9cdb5f7306139c5c323c9661ca6a4092ea2e6))
* **guarantees:** Dialog fix and dashboard empty state ([ad51f3b](https://bitbucket.org/arphase/innovatech/commit/ad51f3bac116efb5a977300edbd7fb8cfdb6af6a))
* **guarantees:** Disable checkbox and Payment Dialog fix ([73d1090](https://bitbucket.org/arphase/innovatech/commit/73d1090ac8517fd5c4062d88d8c2ca988a32b882))
* **guarantees:** display status in row ([6c6765b](https://bitbucket.org/arphase/innovatech/commit/6c6765bb2dc9c3b71bb0d41d664f367380607843))
* **guarantees:** download PDF from list ([8143ced](https://bitbucket.org/arphase/innovatech/commit/8143ced8897e0f84f94325aa2441b405c7618eef))
* **guarantees:** filter by date ([c658ce2](https://bitbucket.org/arphase/innovatech/commit/c658ce2924a35d2500850a05fff63e07a1af7c16))
* **guarantees:** filter by status ([f02b0cb](https://bitbucket.org/arphase/innovatech/commit/f02b0cb5c7efb72e02350e24fa28be23134225b0))
* **guarantees:** Generate payment order pdf. WIP, missing styles ([e21b369](https://bitbucket.org/arphase/innovatech/commit/e21b36942c6a1442efa1e3479061a4520e508ad6))
* **guarantees:** Refactor generate pdf endpoint. Add update status endpoint ([6f2b33d](https://bitbucket.org/arphase/innovatech/commit/6f2b33d75c548ca87efd52952d535b92a6cb7831))
* **guarantees:** select guarantees to create payment orders ([3476dd8](https://bitbucket.org/arphase/innovatech/commit/3476dd86eb36283323db6ab051c6373986e5e6c8))
* **guarantees:** Summary endpoint ([c5aac35](https://bitbucket.org/arphase/innovatech/commit/c5aac35ed582390a9c1a6083558df64440a55372))
* **guarantees:** text filter ([713a2bb](https://bitbucket.org/arphase/innovatech/commit/713a2bb16d68a7d1c40e863f374666be3b5fab0a))
* **guarantees:** update ([bcda72b](https://bitbucket.org/arphase/innovatech/commit/bcda72b647941ee7765428d3c26b287f4156c656))
* **localites:** Add get by zipcode ([38e1e45](https://bitbucket.org/arphase/innovatech/commit/38e1e452cae3fce8747ab1e647acc556cd4697bb))
* **localities:** address form component and sepomex catalog seeds ([7bff311](https://bitbucket.org/arphase/innovatech/commit/7bff311333cd2d38dd2686502c4ec796ef71f9c1))
* **payment-orders:** Add images to footer and header pdfs. ([b8f8074](https://bitbucket.org/arphase/innovatech/commit/b8f8074725f51b0929d4216fe1124827b299113e))
* **payment-orders:** Create controller and service ([98f56df](https://bitbucket.org/arphase/innovatech/commit/98f56dfa87706298426851836cac9c9b897c9c79))
* **payment-orders:** Edit Download modal and action buttons ([226337f](https://bitbucket.org/arphase/innovatech/commit/226337f676789848f078ec117c2129a48bacb3e9))
* **payment-orders:** generate and download payment order from guarantees list ([c2b2b28](https://bitbucket.org/arphase/innovatech/commit/c2b2b283813601877c4bbaf09066e5bf482e84e3))
* **payment-orders:** Pdf name edit ([5a3ce2e](https://bitbucket.org/arphase/innovatech/commit/5a3ce2ead535e0c308aea57d8dace95296c2b058))
* **spa:** logout ([18b8aad](https://bitbucket.org/arphase/innovatech/commit/18b8aadf5f93085f643b335cac807ae270b382d5))
* **ui:** add date filter component ([c652f42](https://bitbucket.org/arphase/innovatech/commit/c652f42a173f3015c650700efbfd95eeadb28f71))
* **ui:** add empty state component ([3dca53e](https://bitbucket.org/arphase/innovatech/commit/3dca53e850998359a947208810743946ef7d7d6c))
* **ui:** add list and form components ([72b719e](https://bitbucket.org/arphase/innovatech/commit/72b719e4f11194c1ffabeae788578a64aba39ad5))
* **ui:** add searchbar component ([7601ad3](https://bitbucket.org/arphase/innovatech/commit/7601ad32b8542afef8ca3452c9f4609ca3527c2f))
* **ui:** add subscriber component ([c795bb6](https://bitbucket.org/arphase/innovatech/commit/c795bb6f38d6e09faf1b239111a789da36557054))
* **ui:** add table header component ([eb55d73](https://bitbucket.org/arphase/innovatech/commit/eb55d739c8363fe8bdcf5c8ace6b36d1e9a6a8aa))
* **ui:** add virtual scroll component ([bf11b74](https://bitbucket.org/arphase/innovatech/commit/bf11b74a446db764a2cc03232a1f5d5d6181549f))
* **ui:** expansion panel component ([d50f133](https://bitbucket.org/arphase/innovatech/commit/d50f133f9e27b145a9c13d025a29d88fdd88f5c6))
* **ui:** form field component ([99c3e01](https://bitbucket.org/arphase/innovatech/commit/99c3e01be5d8e75d50edbf8a3614fc803736b904))
* **ui:** row component ([8c28671](https://bitbucket.org/arphase/innovatech/commit/8c286710cc45392a5587b1768a34b2f238e26505))
* **ui:** side-nav and menu-item components ([348913d](https://bitbucket.org/arphase/innovatech/commit/348913d876c54dde3906f6954f49c2b1b154a0cf))
* **ui:** use localities endpoint in address form ([0ac1d83](https://bitbucket.org/arphase/innovatech/commit/0ac1d83f0c4bd88b2c53e89bb0b1a532dfe33a57))


### Bug Fixes

* **app:** Add auth guards ([cc964f1](https://bitbucket.org/arphase/innovatech/commit/cc964f10191140bab83506353a3019229aa0f069))
* **dashboard:** guarantee summary endpoint name ([b9833e8](https://bitbucket.org/arphase/innovatech/commit/b9833e821f82b05db371348fad348949a15236ca))
