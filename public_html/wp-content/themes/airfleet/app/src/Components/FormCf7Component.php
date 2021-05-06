<?php

namespace App\Components;

class FormCf7Component implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'form',
				'cf7_post_id' => [ $this, 'get_cf7_post_id' ],
				'cf7_form' => [ $this, 'get_cf7_form' ],
			],
			$context
		);
	}

	public function get_cf7_post_id( $cf7_post_id, $defaults ) {
		if ( isset( $cf7_post_id ) && ! empty( $cf7_post_id ) ) {
			return $cf7_post_id;
		}

		if ( ! isset( $defaults['form'] ) || empty( $defaults['form'] ) ) {
			return false;
		}

		return af_get_post_id(
			af_field( 'cf7_form', $defaults['form'] )
		);
	}

	public function get_cf7_form( $cf7_form, $defaults ) {
		$id = $defaults['cf7_post_id'];

		if ( empty( $id ) ) {
			return '';
		}

		return do_shortcode( '[contact-form-7 id="' . $id . '"]' );
	}
}
