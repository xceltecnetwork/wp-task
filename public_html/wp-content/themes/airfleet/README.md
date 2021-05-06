# AirFleet Theme

Built using [WP Emerge Theme v0.15.0](https://github.com/htmlburger/wpemerge-theme).

A video introduction to the theme can be seen here: [Introduction to the AirFleet Starter Theme](https://www.youtube.com/watch?v=yuliPyVmfFQ).





## Summary

- [Requirements](#requirements)
- [Getting Started](#getting-started)
	- [Commands](#commands)
	- [Documentation](#documentation)
	- [Directory Structure](#directory-structure)
- [Theme Configuration](#theme-configuration)
	- [Screenshot](#screenshot)
	- [Favicon](#favicon)
	- [Configuration](#configuration)
- [Frontend](#frontend)
	- [Frontend Implementation Guidelines](#frontend-implementation-guidelines)
	- [Styles](#styles)
	- [Scripts](#scripts)
	- [Assets](#assets)
- [Backend](#backend)
	- [Backend files and folders](#backend-files-and-folders)
	- [Templates](#templates)
- [Features](#features)
	- [Components](#components)
	- [Blocks](#blocks)
	- [Custom fields](#custom-fields)
	- [Theme Options](#theme-options)
	- [Style Guide](#style-guide)
- [Integrations](#integrations)
	- [Google Maps](#google-maps)
	- [Google Tag Manager](#google-tag-manager)
	- [HubSpot](#hubspot)
	- [Forms](#forms)
- [Plugins](#plugins)
	- [WP Rocket](#wp-rocket)
	- [WP Sync DB](#wp-sync-db)





## Requirements

- [PHP](http://php.net/) >= 7.2
- [WordPress](https://wordpress.org/)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/en/) >= 6.9.1
- [Yarn](https://yarnpkg.com/en/)

Prefer the use of Yarn instead of npm to manage packages, so we're all on the same page. Yarn's lockfile is commited, while npm's isn't (we follow WP Emerge Theme here).





## Getting Started

- Browse to the theme's folder.
- Run `composer install`.
- Run `yarn install`.
- Set `define( 'WP_DEBUG', true );` in your `wp-config.php` to see all PHP errors.
- Go to WP Admin and make sure the theme is enabled and all necessary plugins are installed and activated (message boxes will appear at the top asking to install/activate the plugins).

If you have a local URL other than the one specified in `config.json`, create a `config-local.json` based on `config.json` and customize the development URL, otherwise Browsersync won't work properly. To be able to access the Custom Fields page, your local URL should end in `.local` or `.test`.

See the video introduction for general information about the theme: [Introduction to the AirFleet Starter Theme](https://www.youtube.com/watch?v=yuliPyVmfFQ).


### Commands

- `yarn dev`: run build in development mode with [Browsersync](https://docs.wpemerge.com/#/starter-theme/scripts/overview?id=browsersync) enabled and watch for linting errors. Use this during development for live changes and error reporting.
- `yarn lint`: run linters for PHP, scripts, and styles. Run this before creating a PR to check for linting errors.
- `yarn build`: run build in production mode with all optimizations enabled. Use this to test if your build is good.

#### Additional commands

- `yarn dev:core`: run build in development mode with [Browsersync](https://docs.wpemerge.com/#/starter-theme/scripts/overview?id=browsersync) enabled and without linting.
- `yarn lint-watch`: watch for changes and run linters for PHP, scripts, and styles.
- `yarn lint-fix`: fix PHP, scripts, and styles linting errors.



### Documentation

This theme uses a few frameworks and packages. Here are some useful links for you to get up to speed on the most important ones. I recommend going through them.

- [WP Emerge](https://docs.wpemerge.com/#/framework/overview): a framework for WordPress.
- [WP Emerge Theme](https://docs.wpemerge.com/#/starter-theme/overview): the starter theme we built upon that uses the WP Emerge framework.
- [Blade](https://laravel.com/docs/5.8/blade): the template engine.
- [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/): the CSS framework. We are using the SCSS version, so you can fully customize the variables and use the Bootstrap mixins.
- [WordPress PHP Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/): the PHP style and formatting is validated against these standards.
- [Sass Guidelines](https://sass-guidelin.es/): the SCSS syntax and formatting is validated according to these guidelines. In general, the entire guide is very useful, but there are some things we handle differently (excluding the syntax and formatting).



### Directory Structure

```
wp-content/themes/airfleet
├── app/
│   ├── helpers/              # Helper files, add your own here as well.
│   ├── routes/               # Register your WP Emerge routes.
│   ├── setup/                # Register WordPress menus, post types etc.
│   ├── src/                  # PSR-4 autoloaded classes.
│   ├── config.php            # WP Emerge configuration.
│   ├── helpers.php           # Loads helpers. DO NOT CHANGE.
│   ├── hooks.php             # Register your actions and filters here.
│   └── views.php             # Register your WP Emerge view composers etc.
├── dist/                     # Bundles, optimized images etc.
├── languages/                # Language files.
├── resources/
│   ├── build/                # Build process configuration.
│   ├── fonts/				  # Font files.
│   ├── images/				  # Image files.
│   ├── scripts/
│   │   ├── admin/            # Administration scripts.
│   │   ├── editor/           # Gutenberg editor scripts.
│   │   ├── login/            # Login scripts.
│   │   └── theme/            # Frontend scripts.
│   ├── styles/
│   │   ├── admin/            # Administration styles.
│   │   ├── editor/           # Gutenberg editor styles.
│   │   ├── login/            # Login styles.
│   │   ├── shared/           # Shared styles.
│   │   └── theme/            # Frontend styles.
│   └── vendor/               # Any third-party, non-npm assets.
├── theme/                    # Required theme files and views
│   ├── acf-json/             # ACF Local JSON.
│   ├── blocks/               # Gutenberg block templates.
│   ├── components/           # Blade component templates.
│   ├── layouts/              # Blade layout templates.
│   ├── partials/             # View partials.
│   ├── templates/            # Page templates.
│   ├── functions.php         # Bootstrap theme. DO NOT CHANGE.
│   ├── screenshot.png        # Theme screenshot.
│   ├── style.css             # Theme stylesheet. DO NOT CHANGE.
│   └── [index.php ...]
├── vendor/                   # Composer packages.
├── README.md                 # Your theme README.
└── ...
```

More information about what goes where is given in the further down in this document.





## Theme Configuration

### Screenshot

The theme's screenshot is displayed in WP Admin. The file can be found in `theme/screenshot.png`.

When starting the project I recommend updating the screenshot with the homepage design.

It should be a PNG with size 1200x900 pixels. Cut/resize as needed.

### Favicon

By default the favicon is a white square. The favicon can be update in `resources/images/favicon.ico`.

### Configuration

The file `config.json` is a global configuration that is available in SCSS, JS, and PHP.

- `config.json` is the configuration stored in git, that will be used in the production environment.
- `config-local.json` is local to your environment, it's not stored in git.

In this configuration file we can customize variables that will be available "everywhere", useful to store settings that we need to use in different contexts.

Colors and font sizes are registered to WP, making them available in the standard blocks. If adding differently named colors/font sizes, review the file `app/setup/theme-support.php`.

Usage in PHP:

```php
Theme\Config::get( 'variables.color.material-red', '#000000' );
```

Usage in SCSS:

```scss
color: $color-material-red;
```

Usage in JS:

```js
import config from '@config';

console.log(config.variables.color['material-red']);
```




## Frontend


### Frontend Implementation Guidelines

Follow CodersClan's [Frontend Implementation Guidelines](https://docs.google.com/document/d/1bdKk263IFr9RgzrQhoFFZouXY1agLw3i3SWaqHKbC6Q/edit?usp=sharing). A few of the principles are repeated below as well.


### Styles

The theme uses SCSS for the stylesheets and has separate style bundles for frontend, administration, editor (Gutenberg), and login pages.

#### Folow BEM

Follow the [BEM](http://getbem.com/) methodology for naming your classes.

#### Generic first

Always implement the [generic design first](https://www.smashingmagazine.com/2018/12/generic-css-mobile-first/). Generic means the rules that apply to all variants of a design. Then you add breakpoints that apply only to each view. Check the linked article for the benefits of this approach.

#### Customize and use Bootstrap

Using the SASS from Bootstrap we can fully customize all its variables. Before overriding any styles check the Bootstrap's variables and update them where relevant. You can check all the variables and their default values in `node_modules/bootstrap/scss/_variables.scss` (obviously override them in `resources/styles/theme/_variables.scss`).

Besides customization, Bootstrap comes with a lot of useful mixins and function. Use them as much as possible. For example, use the [breakpoint mixins](https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints) and the `theme-color` function. Explore Bootstrap' source code to find out more.

#### Single-direction margin declarations

Use [single-direction margin declarations](https://csswizardry.com/2012/06/single-direction-margin-declarations/). That means mostly using `margin-bottom`. Check the linked article for reasoning.

#### Don't add vendor prefixes

Don't add vendor prefixes to the code, since autoprefixer is installed. If a specific vendor prefix that you require is not getting added in the dist asset, you might need to update the `browserslist` in `package.json`.


#### Adding vendor packages

In general all external packages should be installed from npm.

You can import the vendor dist files directly through JS (yes), but if you want to use a SCSS package you need to import it in SCSS (create a file in `resources/styles/theme/vendor/`).

All common CSS packages are available in npm, so only in the most rare circumstances will you need to include the vendor files directly in the project. If you do, add the files in folder `resources/vendor/` and import them in `resources/[styles,scripts]/theme/vendor/`.

Check [Importing assets](https://docs.wpemerge.com/#/starter-theme/assets/overview?id=importing-assets) for more information.


#### Style folders

- `resources/styles/theme/`: The SCSS files for the frontend bundle are placed here.
- `resources/styles/theme/[blocks,components,pages]`: Styles that apply to specific blocks/components/pages. In "pages" you can place code for specific WP templates (pages, posts, archives, etc.).
- `resources/styles/theme/generic/`: Generic global styles.
- `resources/styles/theme/mixins/`: Where to place mixins, since they need to be loaded before the other files. Create new files for each topic as needed.
- `resources/styles/shared/`: Shared styles between all bundles.
- `resources/styles/[admin,editor,login]/`: These directories are for the admin, editor, and login bundles, respectively. They work identically to the main `resources/styles/theme/` directory. The editor bundle is where you want to add styling to customize a block's appearance in the Gutenberg editor. By default it will load from the theme the components, blocks, generic, and Bootstrap styles.





### Scripts

The theme is setup for ES6 and has separate script bundles for frontend, administration, editor (Gutenberg), and login pages.

Use a class-based approach for development.

#### Adding vendor packages

In general all external packages should be installed from npm.

If a plugin/package is not available on npm, add the files in folder `resources/vendor/` and import them in `resources/scripts/theme/vendor/`.

Check [Importing assets](https://docs.wpemerge.com/#/starter-theme/assets/overview?id=importing-assets) for more information.

#### Adding scripts for blocks, components, and pages

Add JavaScript files in folder `resources/scripts/theme/` to add them to the frontend bundle. The entry point is `index.js`.

Features should be added through the router. The router expects classes with a specific signature. Check the example below and the files under `resources/scripts/theme/[blocks,components,pages]/`.

```js
// An instance of this class should be added to the router defined in index.
export default class Example {
  constructor() {
	// This is the selector that identifies the main element that this script is attached to.
	// For example, if it's a script for a block, it would be the main CSS class of the block.
	// If it's for a component, it would be the main CSS class of the component.
	// If it's for a page, it would be a CSS class from the body that identifies the page or template.
    this.selector = '.example';
  }

  bootstrap() {
	// Do the necessary initilization here.
	// This function will only be called by the router when the selector matches an element that exists on the page.
	// The router in index executes this function on document ready.
  }
}
```

#### Adding scripts to the admin, editor, and login

The directories for the admin, editor, and login bundles are `resources/scripts/[admin,editor,login]/`. They work identically to the main `resources/scripts/theme/` directory.

In most cases you won't need to edit these files, but if you do, this is where to do it.


#### Logging

For JavaScript logging purposes use the npm package `loglevel` which acts as a replacement for `console.log()` and comes with features such as level-based logging and filtering.

A separate logger should be created for each component to allow toggling the logging on/off selectively.


```js
import { getLogger } from 'loglevel';

// An instance of this class should be added to the router defined in index.
export default class Example {
  constructor() {
	// The selector that identifies the main element that this script is attached to.
	this.selector = '.example';

	// Create a unique logger for this component.
	this.logger = getLogger('example');

	// Optionally disable logging messages below a given level.
	// To disable logging completely, set it to 'silent'.
	this.logger.setLevel('warn');
  }

  bootstrap() {
	// Call logging functions as needed.
	this.logger.info('Logging has started');
	this.logger.warn('Something unexpected happened');
  }
}
```

For more information please refer to the [loglevel documentation](https://github.com/pimterry/loglevel#documentation).

### Assets

#### Fonts

If not using an external font service, add local fonts to `resources/fonts/` and then declare the `@font-face`s in the styles (`resources/styles/theme/generic/_fonts.scss`) using `~@fonts/` path (see [Importing assets](https://docs.wpemerge.com/#/starter-theme/assets/overview?id=importing-assets)). Be sure to convert the font files to a wide range of formats, for example using [Transfonter](https://transfonter.org/) which also generates the `@font-face` declarations.

#### Images

Images can be added in `resources/images/`.

**Images need to be imported from JavaScript or SCSS** to be available for use. To reference images in SCSS use path `~@images/` and in JS use path `@images/`. See [Importing assets](https://docs.wpemerge.com/#/starter-theme/assets/overview?id=importing-assets).

Optimized copies of the images will be placed in `dist/images/` when running the build process.

##### Getting image paths

If you need the URI of an image, you can obtain it in the following way:

- PHP: `$background_uri = Theme\Assets::getAssetUri( 'images/background.jpg' );`.
- JS: `import backgroundUri from '@images/background.jpg';`.

##### Sprites

Images placed in `resources/images/sprite/` will be automatically prepared for [sprite usage](https://docs.wpemerge.com/#/starter-theme/assets/sprite-mixins) and don't need to be manually imported from JavaScript. Use `@include sprite($imagename)` to add a sprite image as a background with width and height set to the image's dimensions.

Note: [SVG sprites are not supported](https://github.com/htmlburger/wpemerge-theme/issues/11) at the moment.

#### Icons

[Font Awesome](https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use) is installed. We are using the [SVG version](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core), which means we have to preload the specific icons we want (see `resources/scripts/theme/vendor/fontawesome.js`). Search for [icons here](https://fontawesome.com/icons?d=gallery).

If you need to add custom icons images, see if you can add them to the sprites (see previous section) or add them as standard images.






## Backend

Backend logic resides in `app/`. **Do not customize `functions.php`**.

[WP Emerge](https://docs.wpemerge.com/#/framework/overview) is used as a framework, so look to use its features (routing, view composers, service providers, etc.).

### Backend files and folders

- `app/config.php`: [WP Emerge configuration](https://docs.wpemerge.com/#/framework/configuration). Where to configure service providers, middleware, etc.
- `app/hooks.php`: Add actions and filters here. __Function definitions should not be placed here__. See remaining documentation for where to put functions.
- `app/views.php`: Register your [view composers](https://docs.wpemerge.com/#/framework/views/view-composers) and [globals](https://docs.wpemerge.com/#/framework/views/global-context) here (just the registration, the class definitions should be in `app/src/`). View composers are where you prepare the data for your views.
- `app/helpers/`: Add PHP helper files here. Files in this folder are automatically loaded.
	- Create additional files as needed for different sections of the site.
	- Helper files should include __function definitions only__. No code should be executed in the root. See remaining documentation on where to put actions, filters, classes, etc.
	- Prefix your custom functions with a common prefix (e.g. `af_`).
- `app/routes/`: Add WP Emerge routes here.
	- For example, if you want to add an AJAX action, this is the place to add it.
	- Read the [routing section](https://docs.wpemerge.com/#/framework/routing/defining-routes) of the WP Emerge documentation for more information.
- `app/setup/`: Modify files here according to your needs. These files should contain __registrations and declarations of WordPress entities only__ such as post types, taxonomies, menus, etc.
- `app/src/`: Add PHP class files here. All clases in the `App\` namespace are autoloaded in accordance with [PSR-4](http://www.php-fig.org/psr/psr-4/).
	- `app/src/Blocks/`: block composers.
	- `app/src/Components/`: component composers.
	- `app/src/Core/`: core service providers and other classes.
	- `app/src/Widgets/`: widgets.


### Templates

[Blade](https://laravel.com/docs/5.8/blade) is used for the template engine.

The templates are stored in `theme/`. Avoid adding any PHP logic here, unless it pertains to layouting (PHP logic should go into helper files or [WP Emerge controllers](https://docs.wpemerge.com/#/framework/routing/controllers))

- `theme/blocks/`: [block](https://www.advancedcustomfields.com/resources/blocks/) templates. More information in the [Blocks](#blocks) section of this file.
- `theme/components/`: [component](https://laravel.com/docs/5.8/blade#components-and-slots) templates. More information in the [Components](#components) section of this file.
- `theme/layouts/`: Blade [layouts](https://laravel.com/docs/5.8/blade#template-inheritance).
- `theme/partials/`: partial templates.
- `theme/template/`: page templates.

Despite using Blade, the templates still adhere to the [WordPress Template Hierarchy/name convention](https://developer.wordpress.org/themes/basics/template-hierarchy/) (with the added `.blade` pre-extension).


#### Enabling short_open_tag in php.ini

If `short_open_tag` is turned off in the PHP configuration, the PHP linter will complain about Blade templates with the following warning:

```
No PHP code was found in this file and short open tags are not allowed by this install of PHP. This file may be using short open tags but PHP Does not allow them.
```

To fix this, you must change `short_open_tag` in your `php.ini` configuration to the following:

```
short_open_tag = On
```

Make sure you are updating the correct `php.ini` file. The PHP linter should be using the PHP version installed in `PATH`.

You can check if the `short_open_tag` setting is enabled correctly by entering the following in the command line: 

```
php -r "echo ini_get('short_open_tag');"
```



## Features


### Components

A component is a reusable element. Components can range from the most basic (e.g. buttons, images) to the most complex (e.g. a resource card, a carousel) and can use other components.

Components can be used in any Blade template, so you can use them inside blocks, templates, layouts, etc.

#### Component folders

These are the most important folders for components:

- `theme/components/`: component templates.
- `app/src/Components/`: component view composers (where the data is loaded for the template).
- `resources/scripts/theme/components/`: component scripts. See the [Scripts](#scripts) section on how to add scripts for specific components.
- `resources/styles/theme/components/`: component styles.

When creating a new component, it should be added to the [Style Guide](#style-guide) with an example.

#### Use components as much as possible

It's specially important to make the experience consistent throughout the site both for the frontend interface as well as the editor and even the code, that's why we want to create robust components and reuse them as much as possible.

Example: all buttons in the site should be an instance of the same basic component. If we need to add new features to buttons (for example, the ability to open modals or add a new style option), it becomes trivial to add the same feature to all instances.

#### Usage

The components are available in other Blade templates through an alias. E.g. if you have a `theme/components/button.blade.php` file, the component can be used with the following code:

```php
@button($data)@endbutton
```

Where `$data` is an array. Its keys will be available as variables in the component's template.

For the alias, any non-alphanumeric character will be stripped (e.g. `button-collection.blade.php` will be aliased as `@buttoncollection`).

Check the [Style Guide](#style-guide) for examples of components usages.

#### Custom fields

When creating a new component that will be editable through the admin (for example, used in a block), also create a new custom fields group for it.

This fields group should be named "Component: [name of the component]" (e.g. "Component: Button") and **it should be disabled**.

In the place where you want to use it (for example, in a block), create a group field with the name of the component and inside clone the entire group of fields of the component. See the [Custom fields](#custom-fields) section for more information.

Its usage inside a block will then become very straighforward. Just fetch the group and pass it to the component:

```php
@php $background = af_field('background'); @endphp
@background($background)@endbackground
```

Note: each custom field is automatically available in block templates in a variable of the same name of the custom field.

#### Additional component data

If the component requires additional data or logic, you can implement it in a composer for better separation of concerns.

The composer must implement the interface `\App\Core\ComponentComposer`. The composer will be automatically instantiated if it's named appropriately.

The composer's class name will be determined based on the component's filename. If the component's template is named `button-collection.blade.php`, then the full class name should be `\App\Components\ButtonCollectionComponent`.

The composer can define additional data to be available in the template and you will be able to access the composer object itself in variable `$composer`.

E.g. if your component file is `theme/components/hello-world.blade.php`, create `app/src/Components/HelloWorldComponent.php` with the following code:

```php
namespace App\Blocks;

class HelloWorldComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	/**
	 * Get data that will be available when rendering the component template.
	 *
	 * @param array $file An array with file information.
	 * 	$file = [
	 * 		'filename' => (string) Component file name (e.g. "button-collection.blade.php").
	 * 		'alias'    => (string) Component alias (e.g. "buttoncollection).
	 * 		'slug'     => (string) Component slug (e.g. "button-collection").
	 * 	]
	 * @param array $context An array with the current context.
	 * 	$context = [
	 * 		'slot'			=> (array) Slot content.
	 * 		'global'		=> (array) globals array registered with WPEmerge.
	 * 		... 			=> A member for each variable passed in the array to the component.
	 * 		... 			=> A member for each custom field associated with the custom fields group of the component.
	 * 	]
	 * @return array Each item in the array will be available as a separate variable in the component template.
	 */
	public function get_context( $file, $context ) {
		/**
		 * $context will be the same as $this->context.
		 * 
		 * You can also access the custom fields here.
		 * $context['my_field'] will return the value of custom field "my_field".
		 * 
		 * What you return here will be available in the template as separate variables.
		 */
		return [
			'hello' => 'World',
		];
	}
	
	// Additional you can create any function and you will be able to access it from the block's template.
	public function hello_menu() {
		return wp_nav_menu([
			'container' => 'nav',
			'theme_location' => 'hello-menu',
			// etc.
		]);
	}
}
```

Then in the component template, you can do the following:

```html
My custom variable: {{ $hello }}<br>

{{ $composer->hello_menu() }}
```

#### Default variables for templates

In the `get_context` method of the component's composer class it's importat to define all variables that can be used in the component's template. Some variables may be optional, but to **avoid undefined warnings**, they should be initiated with a default value.

To do so, we can make use of the `$context` array in conjunction with the `af_defaults` function. The `$context` array will have the variables that were passed to the component and we want to check that array and **provide default values for all variables** that can be used.

For example, if the component supports an optional `style` attribute, you can define it as such:

```php
public function get_context( $file, $context ) {
	return af_defaults(
		[
			'style' => 'default',
		],
		$context
	);
}
```

Here, the `af_defaults` function will look for a `style` key in the `$context` array. If it doesn't find any value, it will return `'default'`.

Alternatively, you can make more complex conditions and combine both a default and a provided value:

```php
public function get_context( $file, $context ) {
	return af_defaults(
		[
			'container_class' => [ $this, 'get_container_class' ],
		],
		$context
	);
}

public function get_container_class( $container_class ) {
	return classNames([
		'c-my-container-class',
		$container_class,
	]);
}
```

In this case, we take the value of `container_class` that was passed to the component and is available in the `$context` array, and we modify it.


#### Custom fields in the component template

The custom fields are available in a component's template as variables when they are passed to the component in an array. For example, if the component has a custom field named `title`, you can obtain its value from variable `$title`.

Where the component is called:

```php
// Here we assume "hello" is the name of the group field that has a clone field of the component's custom fields group.
// So $hello will be an array and each key of the array will match a custom field.
$hello = af_field('hello'); // as an example: $hello = ['title' => 'Hello World'];
@helloworld($hello)@endhelloworld
```

In the component template:

```php
Title: {{ $title }}<br>
```

To facilitate the process of defining default values for the custom fields of the components (e.g. empty strings for text fields, arrays for repeaters), an association is made between the custom fields group and the template's name. The service provider that registers the components, takes the filename of the component and searches for a custom fields group that matches it.

This helps, for example, when we are using a component and the values haven't been saved yet to the custom fields or when we want to use a component without resorting to custom fields and have optional properties. Instead of manually defining default empty values for all custom fields, the service provider that registers the components (`RegisterComponentsServiceProvider`) automatically finds the custom fields group and defines default values based on each field type (empty arrays or strings).

E.g.:

- Filename: `button-collection.blade.php`.
- Determined slug: `button-collection`.
- Determined title: `Button Collection`.
- Custom fields group should be named: `Component: Button Collection`.

If, however, the name of the custom fields group doesn't or can't be made to match this convention, we can specify the custom group key in a component at the top of the component:

```php
{{--
 Key: group_5d56fedc04d90
--}}
<div class="{{ $class }}">
	{{-- etc. --}}
</div>
```

In this example, we are forcing a specific custom fields by providing its key. Alternatively, you can specify a Title instead of a Key.


#### Naming conventions

The component's name should be equivalent everywhere it is used (filenames, main class, admin interface, etc.).

Example:

- Template: `theme/components/resource-card.blade.php`.
- Script: `resources/scripts/theme/components/resourceCard.js`.
- Style: `resources/styles/theme/components/_resource-card.scss`.
- Main CSS class: `c-resource-card`. The name of the CSS class is automatically available in the component's template in variable `$class`.
- Custom fields group: `Component: Resource Card`.

Notice that it's always based on "Resource Card", but adapts to the particular naming conventions of each format.


### Blocks

A block is an individual section on a page and is the basic unit of the Gutenberg editor.

We build most of the design through blocks and even custom posts can use blocks.

Many blocks will use the same components (titles, text, buttons, backgrounds, etc.). When starting a new block, review the existing components and select the ones you can reuse or the ones you can enhance to fit your use case or the ones you can create to make them generic.

#### Block folders

These are the most important folders for blocks:

- `theme/blocks/`: block templates.
- `app/src/Blocks/`: block view composers (where the data is loaded for the template).
- `resources/scripts/theme/blocks/`: blocks scripts. See the [Scripts](#scripts) section on how to add scripts for specific blocks.
- `resources/styles/theme/blocks/`: blocks styles.

When creating a new block, it should be added to the [Style Guide](#style-guide) page with an example.

#### Usage

Files placed in `theme/blocks/` are automatically registered with ACF through [acf_register_block](https://www.advancedcustomfields.com/resources/acf_register_block_type/).

#### Block metadata

The metadata for the block will be automatically determined from the filename, but it can be customized by setting formatted comments at the top of the file. The following metadata can be customized:

- `Title`: name of the block.
- `Description`: the description.
- `Category`: the category. In most cases you will want to use "airfleet".
- `Icon`: the [dashicon](https://developer.wordpress.org/resource/dashicons/).
- `Keywords`: search terms for easier filtering the blocks.
- `Mode`: display mode. "auto" is recommended (preview is shown by default but changes to edit form when the block is selected).
- `PostTypes`: restrict to specific post types. You will want to leave this out in most cases.

#### Custom fields

In most cases, the block will require custom fields. Create a fields group named "Block: [name of the block]" (e.g. "Block: Hero").

The value of the custom fields will be available in the template as separate variables,
e.g. if the block has a custom field named "title", in the template you can access its value in variable `$title`.

Most blocks will be made up of components and some additional fields. Refer to the [Components](#components) section for more information on how to setup the component's fields and usage.

#### Additional block data

If the block requires complex data or logic, you can implement it in a composer for better separation of concerns.

The composer needs to implement the interface `\App\Core\BlockComposer`. The composer will be automatically instantiated if it's named appropriately.

The composer's class name will be determined based on the block's filename. If the template is named `hero.blade.php`, then the full class name should be `\App\Blocks\HeroBlock`.

The composer can define additional data to be available in the template and you will be able to access the composer object itself in variable `$composer`.

E.g. if your block file is `theme/blocks/hero.blade.php`, create `app/src/Blocks/HeroBlock.php` with the following code:

```php
namespace App\Blocks;

class HeroBlock implements \App\Core\BlockComposer {
	public function __construct( $context ) {
		$this->context = $context;
	}

	/**
	 * Get data that will be available when rendering the block template.
	 *
	 * @param array $context An array with the default context.
	 * 	$context = [
	 * 		'block'			=> (array) The block settings and attributes.
	 * 		'content'		=> (string) The block inner HTML (empty).
	 * 		'is_preview'	=> (bool) True during AJAX preview.
	 * 		'post_id'		=> (int|string) The post ID this block is saved to.
	 * 		... 			=> A member for each custom field (with the key being the field name).
	 * 	]
	 * @return array Each item in the array will be available as a separate variable in the block template.
	 */
	public function get_context( $context ) {
		/**
		 * $context will be the same as $this->context.
		 * 
		 * You can also access the custom fields here.
		 * $context['my_field'] will return the value of custom field "my_field".
		 * 
		 * What you return here will be available in the template as separate variables.
		 */
		return [
			'hello' => 'World',
		];
	}
	
	// Additional you can create any function and you will be able to access it from the block's template.
	public function get_something() {
		return 'Hello World!';
	}
}
```

Then in the block template, you can do the following:

```html
My custom variable: {{ $hello }}<br>

Calling my custom function: {{ $composer->get_something() }}<br>
```


#### Styling

Add Block specific stylesheet files in folder `resources/styles/theme/blocks` and import them on `resources/styles/theme/blocks/index.scss`

Apart from default block classes, Each block has a modifier class on the format: `b-$block--page-$page` where `$block` is the block slug and `$page` is the page slug. 

You can use this modifier class to style the block differently for specific pages.

#### Naming conventions

The block's name should be equivalent everywhere it is used (filenames, main class, admin interface, etc.).

Example:

- Template: `theme/blocks/customers-list.blade.php`.
- Script: `resources/scripts/theme/blocks/customersList.js`.
- Style: `resources/styles/theme/blocks/_customers-list.scss`.
- Block title: `Customers List`.
- Main CSS class: `b-customers-list` (automatically generated based on the slug).
- Custom fields group: `Block: Customers List`.

Notice that it's always based on "Customers List", but adapts to the particular naming conventions of each format.


### Custom fields

[Advanced Custom Fields](https://www.advancedcustomfields.com) is used to manage the custom fields.

#### Making changes to the custom fields

The theme is setup to use [Local JSON](https://www.advancedcustomfields.com/resources/local-json/). Any change done to the custom fields through the admin interface will be saved to the theme. You only need to commit these changes and once they are deployed to a production or staging environment, the new fields will be picked up automatically.

Before making any local change to the custom fields, always sync them first to prevent any overwrite.

The admin page for custom fields is hidden in all domains except `.local` and `.test` (i.e. make sure your local environment ends in `.local` or `.test` to be able to manage the fields through the interface). This is done because **the fields should not be customized in production and staging environments**.

#### Naming conventions

Please use the following nomenclature for custom field groups:

- `Page`: to target pages.
- `Post`: to target posts.
- `Post: [Post Type]`: to target a post type.
- `Block: [Block Title]`: to target a block.
- `Component: [Component Title]`: to target a component.
- `Partial: [Title]`: to target a partial.
- `Options: [Options Page Title]`: to target an options page.
- `Widget: [Widget Title]`: to target a widget.

#### Cloning fields

You will need to clone fields often, in most cases to reuse a component. Clone entire groups at once and not single fields.

This is the proper procedure to clone a custom group:

- Create a [Group field](https://www.advancedcustomfields.com/resources/group/).
- Inside the group field, create a [Clone field](https://www.advancedcustomfields.com/resources/clone/).

It's important to create a group field and not clone directly because of these reasons:

- Avoids field name conflicts with other fields on the same level.
- Compartimentalizes the fields in the UI.
- Makes it easier to obtain all of the group's fields at once in a template and pass them to a component.
- Ability to apply conditional options to the group field.

The only exception to this is if you are cloning inside a repeater field and the cloned group is the entire contents of each row.

Note: the [Clone field](https://www.advancedcustomfields.com/resources/clone/) has a property to switch the display between Group/Seamless, but this property doesn't produce the same effects.


### Theme Options

The theme settings pages are created through ACF. Refer to function `af_add_option_pages` in file `app/helpers/options.php`.

Create sub-pages for each category of options. Then create a custom fields group for each sub-page. Use the following nomenclature for the custom fields groups: `Options: [Options Page Title]`.


### Style Guide

The Style Guide template and page should be maintained with examples of custom components, blocks, and other features. It's a good place to get to know the design and features of the theme.

When creating a new component or adding new features to a component, edit the Style Guide template and create a new section with an example usage of the component.

When creating a new block, edit the Style Guide page on the server and add the block. Using the default "Heading" block, add an h2 heading with the name of the block, before the new block you added.





## Integrations

There are integrations with external services such as HubSpot and Google Tag Manager.

The integrations that come with the starter theme can be configured from the Theme Options in WP Admin and enabled/disabled there.

To completely remove an integration, go to `app/config.php` and remove the corresponding service provider.


### Google Maps

The Google Maps integration adds a theme options page in WP Admin where the integration can be configured. This integration does the following when enabled and configured:

- Register the API key with ACF, enabling the use of the Google Map field.
- Make the API key available client-side in JS variable `af_google_maps.api_key`.


### Google Tag Manager

The Google Tag Manager integration adds a theme options page in WP Admin where the integration can be configured and renders the necessary scripts in the HTML when the integration has been enabled. The code can be found in `GoogleTagManagerServiceProvider`.


### HubSpot

The HubSpot integration does the following:

- Adds a theme options page in WP Admin where the integration can be configured.
- Includes the embed code that allows HubSpot features to be automatically added to the site.
- Extends the forms custom post type to support HubSpot forms.


### Forms

New forms should be created through the Forms post type. 
This post type can be extended to support forms from different sources.

The following form sources are currently available:

- Contact Form 7. Available when the Contact Form 7 plugin is installed.
- HubSpot. Available when the HubSpot integration is enabled in WP Admin.

#### How to add new form integrations

To add new form sources/integrations you have to:

- Add a new choice to the "source" field. This is done using filter `af_form_sources`. See example in `CF7ServiceProvider`. Create a new service provider similar to it and include it in `config.php`.
- Create a new custom fields group with the custom fields specific to the new form integration (e.g. form ID/key, options to be passed to external service).
- Update the custom fields group "Post: Form" to add a new Group/Clone field of the group created in the previous point. Use "Conditional Logic" to make sure the custom fields are only visible with the appropriate "source" value. Use "Value contains" filter (because the options are dynamically generated).
- Create the form template. Create a new file template in `theme/components/form-source.blade.php` and replace "source" with the value of your new choice. The template will be automatically called based on its name. In the template, a `$form` variable will be available which contains the form post and you can use it to retrieve the necessary fields. See how it is done in `form-hubspot.blade.php` and `FormHubspotComponent`.


## Plugins

Plugin dependencies are managed through [WP Dependency Installer](https://github.com/afragen/wp-dependency-installer). They are defined in `wp-dependencies.json`.

You can add new dependencies if the theme depends on them or if you want to "bundle" them with the theme (they will be externally installed).

Once you add a new dependency, a message will appear at the top of WP Admin for installing the plugin. You can use the link to install it. Then refresh the page and a new message will appear for activating the plugin.


### WP Rocket

WP Rocket is included as a plugin dependency. It should be configured specifically for each project.

I recommend testing the following settings, which are not enabled by default, and finding the best results:

**File Optimization**

- Minify HTML.
- Minify CSS files.
- Combine CSS files.
- Optimize CSS delivery.
- Minify JavaScript files.
- Combine JavaScript.

**Media**

- LazyLoad - enable for images, iframes and videos. Enable "Replace YouTube iframe with preview image".
- Disable WordPress embeds.

If anything breaks, enable/disable each setting one-by-one.


### WP Sync DB

[WP Sync DB](https://github.com/wp-sync-db/wp-sync-db) is installed in production/staging environments. This plugins allows easy environment syncing.

- On the production server, go to `WP Admin > Tools > Migrate DB`.
    - Go to `Settings` tab.
    - Check `Accept pull requests allow this database to be exported and downloaded`.
    - Copy `Connection Info`.
- On the local server, go to `WP Admin > Tools > Migrate DB`.
    - On `Migrate` tab, select `Pull` and paste the connection info.
    - If the site is behind HTTP authentication, an error will be shown and you will be able to enter the credentials.
    - Check `Media Files` and check `Save Migration Profile`.
    - Save or migrate and save the profile.
