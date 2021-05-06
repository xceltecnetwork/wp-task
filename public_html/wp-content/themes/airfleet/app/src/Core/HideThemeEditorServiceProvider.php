<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
* Add Hide Theme Editor Service Provider
*/
class HideThemeEditorServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	* {@inheritDoc}
	*/
	public function register( $container ) {
	}

	/**
	* {@inheritDoc}
	*/
	public function bootstrap( $container ) {
		add_filter( 'map_meta_cap', array( $this, 'remove_edit_action' ), 10, 3 );
	}

	public function remove_edit_action( $caps, $cap ) {
		if ( $cap === 'edit_plugins' || $cap === 'edit_themes' ) {
			$caps[] = 'do_not_allow';
		}
		
		return $caps;
	}
}
