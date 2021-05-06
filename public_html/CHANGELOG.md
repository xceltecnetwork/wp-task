# Changelog

Changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).



## [0.10.1] - 2020-03-16

### Fixed
- Mark font files as binary to avoid transfer issues.




## [0.10.0] - 2020-03-02

### Added
- CSS utility classes to set margins. Format: `c-margin--top-small`. Available for all sides and with the following sizes: none, small, medium, and large. Sizes can be customized in SCSS.
- The bottom margin can now be set through the admin UI for any block. Options available: default, none, small, medium, and large.
- WP Rocket added as plugin dependency (can be installed directly from the admin).
- `af_field_group_by_title`. Utility function to find an ACF group by title (i.e. find the custom group's metadata).
- `af_field_default` and `af_field_defaults`. Utility functions to determine default values for ACF fields. Uses the default value defined in the field options when available. Otherwise returns an empty value appropriate for the field type and options (empty string or empty array).
- `af_kebab_to_pascal` and `af_kebab_to_human_capitalized`. Utility functions to change a string's capitalization and word separation.

### Changed
- Blocks: all metadata is now optional and automatically determined from the filename. Options can still be overriden with metadata comments at the top of the block's template.
- Blocks: custom fields are now automatically loaded in the block's template and available as separate variables (e.g. a variable `$title` will be created for custom field "title").
- Blocks: can now optional use a view composer (a class to make additional data available to the view or to store complex logic). Composer classes must be placed in `app/src/Blocks/`, named after the block's template (e.g. template: `hero.blade.php`, class: `HeroBlock` - full name `\App\Blocks\HeroBlock`), and implement interface `\App\Core\BlockComposer`.
- Blocks: all blocks refactored to use the above features.
- Components: `$class` is now automatically generated from its file name (i.e. `button.blade.php` will result in class name `c-button`).
- Components: can now optional use a view composer (a class to make additional data available to the view or to store complex logic). Composer classes must be placed in `app/src/Components/`, named after the components's template (e.g. template: `button-collection.blade.php`, class: `ButtonCollectionComponent` - full name `\App\Components\ButtonCollectionComponent`), and implement interface `\App\Core\ComponentComposer`.
- Components: default variables for the customs fields are now automatically generated. The custom fields are associated with the template through it's name (e.g. filename `button-collection.blade.php` expects the custom group `Component: Button Collection`). Custom group can be directly specified or overriden with a metadata comment at the top of the template (either for "Key" or "Title").
- Components: all components refactored to use the above features.
- Core helpers (previously `app/helpers/core.php`) split into multiple files.
- Changes to PHP files in `app/` will now trigger a Browsersync refresh when running in dev mode.
- `fixed-top` CSS utility class now takes into account presence of WP Admin bar.
- Navbar: now fixed to the top.
- Navbar: options are now inside container.
- Navbar: now has two different modifiers and styles for when the window is scrolled or not scrolled: `c-navbar--position-top` and `c-navbar--position-scrolled`.
- README: restructuring of the sections outline (i.e. the position of each section and the indent level). Updated the "Summary" section with level 1 and 2 headings. Other updates to make the readme easier to follow.
- README: included links to the [Local environment](https://www.youtube.com/watch?v=ZSbpWwTsTZk) and [Introduction](https://www.youtube.com/watch?v=yuliPyVmfFQ) videos.
- README: included link to the [Frontend Implementation Guidelines](https://docs.google.com/document/d/1bdKk263IFr9RgzrQhoFFZouXY1agLw3i3SWaqHKbC6Q/edit?usp=sharing).
- README: in the main readme, updated all mentions of the theme's readme with links.
- README: mention "No extension" Adminer error and possible workaround in section about local environment setup.
- README: added section on WP Rocket optimization.
- README: updated "Blocks" section with information about metadata, custom fields, and view composers.
- README: updated "Components" section with information about custom fields, default variables, and view composers.
- README: updated "Images" section with information about getting image URIs in JS and PHP.
- README: updated "Cloning fields" section with some clarifications.
- README: updated "Forms" section with more information about creating additional form integrations.

### Fixed
- ACF erroneously returns an array for Select fields that don't have a saved value yet (`af_coerce_array_to_value`).
- Assets not getting imported from SCSS.
- Handle images and fonts referenced in node_modules.




## [0.9.0] - 2020-02-14

### Added
- Extended WP Admin post search to include custom fields. Can be enabled in the theme options. Done in `AdminSearchCustomFieldsServiceProvider`.
- Form and Content block. Displays a form and several content fields. Supports multiple layouts.
- Header. Displays a logo, the `main-menu` using the navbar component, and a collection of buttons. Adds theme options.
- HubSpot integration. Adds theme options. Optionally includes HubSpot embed code. Extends forms (post type, blocks, components) to support HubSpot forms. HubSpot Forms support several redirect types (file, page/post, URL). Default JS callbacks have been created for easy extension. Done in `HubSpotServiceProvider`, `form-hubspot.blade.php` and `formHubSpot.js`.
- Lint watch script (`lint-watch`). Watches changes and runs linters for PHP, scripts, and styles.
- Navbar component. Displays a Bootstrap navbar with slots for logo and menu items.
- Utility methods `loadJs` and `loadCss` to load assets in JS with promises.

### Changed
- Blocks now use the following naming format: `b-$name`. All blocks and CSS classes updated to reflect this.
- Block CSS classes are now automatically added based on the slug (e.g. if filename is `hero.blade.php`, block class will be `b-hero`) - i.e. you no longer need to manually add a CSS class to the block.
- Block IDs now use the following naming format: `b-$name-$index`.
- Components now use the following naming format: `c-$name`. All components and CSS classes updated to reflect this.
- `dev` script will now also watch for changes and run linters by running `lint-watch`. Previous `dev` script is available as `dev:core`.
- Enabled cache for all linters.
- Refactored blocks registration into a service provider (`RegisterBlocksServiceProvider`) to make the code more modular and easier to extend.
- Refactored forms to make it easier to extend with new form sources. Created a forms service provider (`FormsServiceProvider`), a hook to allow additional form sources (`af_form_sources`), and a separate Contact Form 7 service provider (`CF7ServiceProvider`).
- README: added section on enabling `short_open_tag` to avoid lint warnings on Blade templates.
- README: added "Forms" section, describing the forms features and how to add new form sources.
- README: updated commands section to reflect new scripts.
- README: updated information about class names.

### Fixed
- ESLint errors on macOS fixed by updating ESLint and related packages to the latest version.



## [0.8.0] - 2020-01-10

### Added
- Allow JSON file uploads. Can be configured in the theme options.
- Footer with multiple column navigation, copyright text, privacy menu, and social buttons. Can be configured in the theme options and in the menus.
- Google Maps integration. Adds theme options for the API key, registers the API key with ACF, and makes the API key available in JavaScript in variable `af_google_maps.api_key`.
- Hide the theme and plugins WordPress editor.
- Logging npm package `loglevel`. Allows separate loggers and level-based filtering. See the theme's README for usage.

### Changed
- Enabled `imagemin` cache (image cache for webpack build).
- README: added "Integrations" section with information about the various integrations.
- Refactored theme options into a service provider (`OptionsServiceProvider`) and created a hook (`'af_option_pages'`) to allow adding options sub-pages from other parts of the code.
- Refactored Google Tag Manager integration into a service provider (`GoogleTagManagerServiceProvider`).
- Replaced deprecated package `extract-text-webpack-plugin` with `mini-css-extract-plugin` in the webpack build.
- Upgraded ACF Pro to version 5.8.7.
- Upgraded `css-loader` to the latest version and installed `cssnano` (due to `css-loader`'s deprecated `minimize` option).

### Fixed
- Replaced a corrupt JPEG that was being used in the Style Guide and causing a build error in Windows.



## [0.7.0] - 2019-12-17

### Added
- `af_defaults` function. Utility function to define default variables, mainly for use in components.
- `af_fields` function. Utility function to get many custom fields.
- Buttons block. Simply includes the button collection component.
- Custom CSS class for pages and posts. Can be edited on the sidebar. Replaces plugin "Custom Body Class".
- max-width by default on all img elements (`height: auto; max-width: 100%;`).
- modal-link component. Renders a link to open a modal (any modal, not necessarily from a modal post).
- modal-post-link component. Renders a link to open a modal post and registers the modal post for rendering.
- Social block. Simply includes the social component.

### Changed
- Blocks now automatically get a modifier class based on the current page (i.e. `af-$block--page-$page`).
- Blocks refactored to use the `af_fields` function.
- Components refactored to use the `af_defaults` function.
- Hero block now uses media component (which currently supports a picture or video) instead of picture component.

### Fixed
- Guide: added back colors section that had been erroneously removed.

### Removed
- "Custom Body Class" plugin dependency.



## [0.6.0] - 2019-11-29

### Added
- Added `af_attributes utility` functions. Renders HTML attributes.
- Added attrs Blade directive. Renders HTML attributes using function `af_attributes`.
- Added el Blade component. Render an HTML element.
- Added Media component. Displays either a picture or a video, using the respective components.
- Added Media block. Simply includes the media component.
- Added Video File component. Displays a video from a file. Ability to specify multiple file types and video related attributes (poster, autoplay, loop, preload, controls, and muted).
- Added Video component. Can include a video from one of two sources: embed or file, using the respective components.
- Added Video block. Includes section header, text, video, buttons, and background.

### Changed
- ACF: administration page is now also shown on `.test` domains.
- Background component: make display of background optional.
- Background component: make background color optional.
- Blocks: IDs are now based on the block slug and have an incrementing index (e.g. `#block-hero-1`, `#block-hero-2`, etc.).
- README: updated "Creating a local environment" section to reflect the latest Local by Flywheel version and covered some additional caveats.
- README: added a "Customize project" section to "Creating an external environment" with information on how to customize the readme and theme for a new project.

### Fixed
- Upgraded `wp-dependency-installer` to the latest version to fix an issue in WordPress 5.3.



## [0.5.0] - 2019-11-15

### Added
- Added `af_image_url` utility function. Returns an image URL based on misc input (string, ACF array, or attachment ID).
- Added Color component. A set of custom fields and functions. Color options are inherited from the theme's config. Helper functions are used to render appropriate color classes.
- Added Google Tag Manager integration. Includes GTM scripts based on theme settings.
- Added Hero block. Includes section header, text, buttons, picture, and background.
- Added Link component. Renders a link (accepts and ACF array).
- Added Text block. Simply includes the text component.
- Added Title block. Simply includes the title component.
- Added Section Header block. Simply includes the section header component.
- Added Share component. Displays a list of share buttons with icons.
- Added Social component. Displays a list of links with icons for social networks. Not to be confused with the Share component, the Social component is used to link to social network profiles.
- Added Social Widget. Simply includes the social component.
- Installed classNames utility. Blocks and components now use classNames to render CSS classes.

### Changed
- Background component: added support for the color component.
- Modal component: added a CSS class based on the title of the modal.
- Modal component: added style option.
- Modal component: added lightbox style.

### Fixed
- Picture component: prevents error when responsive sizes is not an array.



## [0.4.0] - 2019-10-22

### Added
- Adds CSS class to the body based on the permalink.
- Added Style Guide template with examples for existing components.
- Added utility function `af_value_or_field`.
- Added setup file for image sizes: `app/setup/image-sizes.php`.
- Added responsive line breaks CSS utility classes.
- Added JavaScript router.

### Changed
- GitLab CI: switched docker image to `roadiz/php73-runner`. Already comes with Prestissimo and image optimization fixes are not required.
- Cleanup CSS body classes by removing blade and folder names.
- Background component: only render image when it's not empty.
- CTA component: support for passed-in content as well as CTA post.
- Picture component: support for passed-in responsive sizes.
- Styles: changed order of stylesheet imports for convenience.
- Blocks: block templates now have access to all variables passed from ACF: `$block`, `$content`, `$is_preview`, `$post_id`.
- Blocks: the CSS class of the block that is based on its filename is now prefixed by `af-`.
- Theme Options: sub-pages are now sorted alphabetically.

### Fixed
- `af_field` function: no longer appends empty class to array which caused some issues with empty fields.



## [0.3.1] - 2019-10-18

### Changed
- GitLab CI: added composer cache.
- GitLab CI: added prestissimo to download composer packages in parallel.
- GitLab CI: now shares cache between all branches.
- GitLab CI: removed jpegtran fix.
- GitLab CI: removed i18n script.
- npm: updated dependencies to latest supported version.
- README: added composer cache and prestissimo to DeployHQ commands section.
- README: removed i18n and lint from DeployHQ commands sections.
- README: added section on how to fix build errors when optimizing images for the GitLab CI.
- webpack: replaced UglifyJS with Terser.

### Fixed
- GitLab CI: fixed cache paths.
- README: fixed cache paths in DeployHQ commands section.



## [0.3.0] - 2019-10-11

### Added
- Added CTA post type. Same custom fields that were previously assigned to CTA block.
- Added CTA component. Displays a CTA post.
- Picture component: added support for responsive sizes.

### Changed
- `config.json` is now stored in git and `config-local.json` acts as the local configuration file.
- Button collection component: removed bottom margin.
- CTA block: now references a CTA post and uses the CTA component.
- Renamed "Settings" option in the admin to "AirFleet".
- Set git line-ending character to LF. Helps to avoid linting errors in PHP files in local Windows environment.

### Fixed
- Background component: now properly displays container if placed inside background.



## [0.2.0] - 2019-07-25

### Added
- Added embed component. Allows including any code in an embed wrapper. Supports [Bootstrap's responsive embeds](https://getbootstrap.com/docs/4.3/utilities/embed/).
- Added embed block. A block with header, text, embed, and buttons.

### Changed
- Updated Stylelint to allow up to 3 nested levels.
- Updated Stylelint to allow underscores in class names.

### Fixed
- Image component: removed extra semicolon.



## [0.1.0] - 2019-07-23

### Added
- Added "Connect DeployHQ with Slack" to [README](README.md).
- Added function `af_is_slot_empty` to check if Blade's `$slot` is empty.

### Changed
- Add default variables to all components.
- Background component: added optional size variable.
- Background component: added support for direct URI (`image` can now be either URI or attachment ID).
- Background component: added support for inner content.
- Image component: added support for direct URI (`image` can now be either URI or attachment ID).
- Image component: `class` is now always added regardless if `attr` already contains a class.
- Picture component: added support for custom CSS class for image.

### Fixed
- Updated WP Emerge Theme to version [0.15.1](https://github.com/htmlburger/wpemerge-theme/releases/tag/0.15.1).
