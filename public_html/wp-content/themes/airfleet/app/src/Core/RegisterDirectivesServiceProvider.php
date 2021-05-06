<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Register directives in Blade.
 */
class RegisterDirectivesServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
		$blade = $container[ WPEMERGEBLADE_VIEW_BLADE_VIEW_ENGINE_KEY ];
		$directives = [
			'attrs' => [$this, 'attrs_directive'],
		];

		foreach( $directives as $name => $callback ) {
			$blade->compiler()->directive( $name, $callback );
		}
	}


	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
	}


	/**
	 * attrs directive to compose attributes
	 */

	public function attrs_directive( $expression ) {
		return "<?= af_attributes($expression); ?>";
	}
}