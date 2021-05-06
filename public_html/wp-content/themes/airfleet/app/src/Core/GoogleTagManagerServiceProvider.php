<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Add GTM Tag.
 */
class GoogleTagManagerServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}

	/**
	 * Adds the GTM subpage to the options page
	 */
	public function add_options( $sub_pages ) {
		return array_merge(
			$sub_pages,
			[
				[
					'page_title' => 'Google Tag Manager Settings',
					'menu_title' => 'Google Tag Manager',
				],
			]
		);
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_filter( 'af_option_pages', [$this,'add_options']);
		add_action( 'wp_head', [$this,'head_script'], 1 );
		add_action( 'wp_body_open', [$this,'body_script'], 1);
	}

	/**
	 * Adds GTM code to HEAD
	 */
	public function head_script() {
		// Exit if GTM not enabled in options.
		if ( !$this->is_enabled_and_valid() ) {
			return;
		}

		// Get GMT container ID.
		$gtm_container_id = get_field( 'gtm_container_id', 'option' );

		// Print out GTM with container ID.
		?>
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','<?php echo esc_js( $gtm_container_id ); ?>');</script>
	<!-- End Google Tag Manager -->
		<?php
		
	}
	
	/**
	 * Adds GTM noscript code to BODY
	 */
	public function body_script(){
		// Exit if GTM not enabled in options.
		if ( !$this->is_enabled_and_valid() ) {
			return;
		}

		// Get GMT container ID.
		$gtm_container_id = get_field( 'gtm_container_id', 'option' );

		// Print out GTM noscript with container ID.
		?>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo esc_js( $gtm_container_id ); ?>"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
		<?php
	}
	
	/**
	 * Checks if GTM is enabled and the container ID is not empty
	 */
	public function is_enabled_and_valid(){
		return get_field( 'gtm_enabled', 'option' ) === true && ! empty( get_field( 'gtm_container_id', 'option' ) );
	}
 }
