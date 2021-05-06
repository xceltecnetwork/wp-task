<?php

namespace App\Components;

class HeaderComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'image' => af_field( 'header_logo','options' ),
				'header_buttons' => af_field( 'header_buttons','options' ),
			],
			$context
		);
	}

	public function main_menu() {
		return wp_nav_menu([
			'container'       =>  false,
			'depth'           =>  2,
			'theme_location'  => 'main-menu',
			'menu_class'      => 'navbar-nav navbar__nav mr-auto',
			'fallback_cb'     => 'WP_Bootstrap_Navwalker::fallback',
			'walker'          => new \WP_Bootstrap_Navwalker(),
		]);
	}
}
