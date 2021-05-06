<?php

namespace App\Components;

class ModalPostLinkComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'label' => '',
				'modal',
				'has_modal' => [ $this, 'has_modal' ],
				'modal_id' => [ $this, 'get_modal_id' ],
			],
			$context
		);
	}

	public function has_modal( $has_modal, $defaults ) {
		return ! empty( $defaults[ 'modal' ] );
	}

	public function get_modal_id( $modal_id, $defaults ) {
		if ( ! $defaults['has_modal'] ) {
			return false;
		}

		return af_get_post_id( $defaults['modal'] );
	}
}
