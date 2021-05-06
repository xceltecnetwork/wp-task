<?php

namespace App\Components;

class EmbedComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'class' => [ $this, 'get_class' ],
			],
			$context
		);
	}

	public function get_class( $class ) {
		$responsive_class = 'embed-responsive embed-responsive-' . $this->context[ 'container' ];
		$container_is_default = $this->context[ 'container' ] === 'default';

		return classNames([
			$class,
			$responsive_class => !$container_is_default,
		]);
	}
}
