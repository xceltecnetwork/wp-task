<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Contact Form 7 Service provider
 */
class CF7ServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}


	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_filter( 'af_form_sources', [ $this, 'add_form_source' ], 1 );
	}


	/**
	 * Function to add additional source dynamically to ACF
	 * @param $source array
	 *
	 *  @return array
	 */
	public function add_form_source( $source ) {
		/* Check if plugin is activated */
		if ( is_plugin_active( 'contact-form-7/wp-contact-form-7.php' ) ) {
			$source['cf7'] = "Contact Form 7";
		}

		return $source;
	}
}
