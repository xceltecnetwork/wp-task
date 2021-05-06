<?php

namespace App\Components;

class MediaComponent implements \App\Core\ComponentComposer {
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

	public function get_class( $class, $defaults ) {
		$type_class = 'c-media--' . $this->context['type'];

		return classNames([
			$class,
			$type_class => $this->context[ 'type' ],
		]);
	}
}
