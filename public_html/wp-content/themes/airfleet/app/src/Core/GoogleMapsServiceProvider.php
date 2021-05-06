<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Add GTM Tag.
 */
class GoogleMapsServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_filter( 'af_option_pages', [ $this, 'add_options' ] );
		add_action( 'acf/init', [ $this, 'set_acf_maps_api_key' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'localize_api_key' ], 20 );
	}

	/**
	 * Adds the GTM subpage to the options page
	 */
	public function add_options( $sub_pages ) {
		return array_merge(
			$sub_pages,
			[
				[
					'page_title' => 'Google Maps Settings',
					'menu_title' => 'Google Maps',
				],
			]
		);
	}

	public function set_acf_maps_api_key() {
		if ( ! $this->is_enabled_and_valid() ) {
			return;
		}
		acf_update_setting( 'google_api_key', $this->api_key() );
	}

	public function localize_api_key() {
		if ( ! $this->is_enabled_and_valid() ) {
			return;
		}
		wp_localize_script( 'theme-js-bundle', 'af_google_maps', [ 'api_key' => $this->api_key() ] );
	}

	public function api_key() {
		return get_field( 'google_maps_api_key', 'option' );
	}

	public function is_enabled_and_valid() {
		return get_field( 'google_maps_enabled', 'option' ) && ! empty( $this->api_key() );
	}
 }
