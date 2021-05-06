<?php

namespace App\Components;

class FooterComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'social' => [ $this, 'get_social' ],
				'text' => [ $this, 'get_text' ],
			],
			$context
		);
	}

	public function get_social() {
		return af_field('footer_social','options');
	}

	public function get_text() {
		return [
			'text' => af_field('footer_copyright','options'),
			'class' => 'c-footer__copyright-text',
		];
	}

	public function footer_menu() {
		return wp_nav_menu([
			'container' => 'nav',
			'theme_location' => 'footer-menu',
		]);
	}

	public function privacy_menu() {
		return wp_nav_menu([
			'container' => 'nav',
			'theme_location' => 'privacy-menu',
		]);
	}
}
