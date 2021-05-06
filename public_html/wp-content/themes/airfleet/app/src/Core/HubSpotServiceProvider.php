<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Add HubSpot Service Provider
 */
class HubSpotServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

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
		add_action( 'wp_footer', [ $this, 'render_embed_code' ] );
		add_filter( 'af_form_sources', [ $this, 'add_form_source' ], 1 );
	}

	/**
	 * Adds the HubSpot subpage to the options page
	 */
	public function add_options( $sub_pages ) {
		return array_merge(
			$sub_pages,
			[
				[
					'page_title' => 'HubSpot Settings',
					'menu_title' => 'HubSpot',
				],
			]
		);
	}

	/**
	 * Adds HubSpot embed code to footer
	 */
	public function render_embed_code() {
		// Exit if HubSpot is not enabled in options.
		if ( !$this->is_embed_enabled_and_valid() ) {
			return;
		}

		// Render content of HubSpot embed code
		echo get_field( 'hubspot_embed_code', 'option' );

	}

	/**
	 * Checks if HubSpot is enabled
	 */
	public function is_enabled() {
		return get_field( 'hubspot_enabled', 'option' ) === true;
	}

	public function is_embed_enabled_and_valid() {
		// Check if HubSpot is enabled in options.
		if ( $this->is_enabled() ) {
			return get_field( 'hubspot_embed_enabled', 'option' ) === true && ! empty( get_field( 'hubspot_embed_code', 'option' ) );
		}
	}

	/**
	 * Function to add additional source dynamically to ACF
	 * @param $source array
	 *
	 *  @return array
	 */
	public function add_form_source( $source ) {
		/* Check if HubSpot is enabled */
		if ( $this->is_enabled() ) {
			$source['hubspot'] = "HubSpot";
		}

		return $source;
	}

}
