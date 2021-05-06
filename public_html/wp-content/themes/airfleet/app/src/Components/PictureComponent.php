<?php

namespace App\Components;

class PictureComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'size' => 'full',
				'icon' => false,
				'attr' => [],
				'image_class',
				'responsive_sizes' => [ $this, 'get_responsive_sizes' ],
				'image_data' => [ $this, 'get_image_data' ],
			],
			$context
		);
	}

	public function get_responsive_sizes( $responsive_sizes, $defaults, $defined_vars ) {
		if ( ! isset( $defined_vars['responsive_sizes'] ) ) {
			return $responsive_sizes;
		}

		return af_picture_responsive_sizes( $defined_vars['responsive_sizes'] );
	}

	public function get_image_data( $image_data, $defaults ) {
		return [
			'image' => $this->context['image'],
			'size' => $defaults['size'],
			'icon' => $defaults['icon'],
			'attr' => $defaults['attr'],
			'class' => classNames([
				'c-picture__image',
				$defaults[ 'image_class' ],
			]),
		];
	}
}
