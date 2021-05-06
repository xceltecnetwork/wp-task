<?php

namespace App\Components;

class ImageComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'image',
				'size' => 'full',
				'icon' => false,
				'attr' => [ $this, 'get_attr' ],
			],
			$context
		);
	}

	public function get_attr( $attr, $defaults ) {
		$return_value = ($attr ?: []) + [ 'class' => '' ];
		$return_value['class'] = classNames([
			$return_value['class'],
			$this->context['class'],
		]);

		return $return_value;
	}
}
