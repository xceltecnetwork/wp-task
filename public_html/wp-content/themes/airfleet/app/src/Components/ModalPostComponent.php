<?php

namespace App\Components;

class ModalPostComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'modal',
				'post_id' => [ $this, 'get_post_id' ],
				'style' => [ $this, 'get_style' ],
			],
			$context
		);
	}

	public function get_post_id( $post_id, $defaults ) {
		return af_get_post_id( $defaults['modal'] );
	}

	public function get_style( $style, $defaults ) {
		return get_field( 'style', $defaults['post_id'] );
	}
}
