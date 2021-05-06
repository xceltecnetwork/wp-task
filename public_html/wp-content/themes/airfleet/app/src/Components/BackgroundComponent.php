<?php

namespace App\Components;

class BackgroundComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'size' => 'full',
				'class' => [ $this, 'get_class' ],
				'background_class' => [ $this, 'get_background_class' ],
				'image_url' => [ $this, 'get_image_url' ],
				'has_background' => [ $this, 'has_background' ],
			],
			$context
		);
	}

	public function get_class( $class ) {
		return classNames([
			$class,
			'c-background--container' => !af_is_slot_empty( $this->context['slot'] ),
			'c-background--fill' => af_is_slot_empty( $this->context['slot'] ),
		]);
	}

	public function get_background_class( $background_class ) {
		$bg_color_class = af_color_background( $this->context[ 'background_color' ] );

		return classNames([
			'c-background__image',
			$background_class,
			$bg_color_class => $this->context[ 'display_background_color' ],
		]);
	}

	public function get_image_url( $image_url, $defaults ) {
		return is_string( $this->context[ 'image' ] )
			? $this->context[ 'image' ]
			: wp_get_attachment_image_url( $this->context[ 'image' ], $defaults[ 'size' ] );
	}

	public function has_background( $has_background, $defaults ) {
		return $this->context[ 'display_background' ]
			&& ( ! empty( $defaults[ 'image_url' ] ) || ! empty( $this->context[ 'background_color' ] ) );
	}
}
