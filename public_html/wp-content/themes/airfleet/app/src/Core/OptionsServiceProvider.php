<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Add option pages.
 */
class OptionsServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}

	public function add_option_pages(){
		if ( ! function_exists( 'acf_add_options_page' ) ) {
			return;
		}
		acf_add_options_page(
			array(
				'page_title' => __( 'Theme Settings', 'airfleet' ),
				'menu_title' => __( 'AirFleet', 'airfleet' ),
				'menu_slug'  => 'airfleet-settings',
			)
		);
		$sub_pages = apply_filters( 'af_option_pages', [] );
		usort(
			$sub_pages,
			function ( $x, $y ) {
				return strcasecmp( $x['page_title'], $y['page_title'] );
			}
		);

		foreach ( $sub_pages as $page ) {
			acf_add_options_sub_page(
				array(
					// phpcs:ignore
					'page_title'  => __( $page['page_title'], 'airfleet' ),
					// phpcs:ignore
					'menu_title'  => __( $page['menu_title'], 'airfleet' ),
					'parent_slug' => 'airfleet-settings',
				)
			);
		}
	}
	
	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_action( 'acf/init', [ $this,'add_option_pages' ] );
	}
 }
