<?php

namespace App\Components;

class NavbarComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'logo' => 'full',
				'class' => [ $this, 'get_class' ],
			],
			$context
		);
	}

	public function get_class( $class ) {
		return classNames([
			$class,
			'navbar',
		]);
	}
}
