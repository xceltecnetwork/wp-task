<?php

namespace App\Components;

class BlockComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'block' => [ $this, 'get_block' ],
				'class' => [ $this, 'get_class' ],
			],
			$context
		);
	}

	public function get_block( $block ) {
		return ($block ?: []) + [ 'classes' => '', 'id' => '' ];
	}

	public function get_class( $class, $defaults ) {
		return classNames([
			$class,
			af_margin_classes( af_field( 'margin' ) ),
			$defaults[ 'block' ][ 'classes' ],
		]);
	}
}
