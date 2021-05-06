<?php

namespace App\Components;

class VideoFileComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'sources' => [ $this, 'get_sources' ],
				'poster_size' => 'full',
				'poster' => [ $this, 'get_poster' ],
			],
			$context
		);
	}

	public function get_sources( $sources ) {
		return array_filter(
			$sources,
			function( $source ) {
				return ! empty( $source )
					&& isset( $source[ 'type' ] )
					&& ! empty( $source[ 'type' ] )
					&& isset( $source[ 'file' ] )
					&& ! empty( $source[ 'file' ] );
			}
		);
	}

	public function get_poster( $poster, $defaults ) {
		if ( is_string( $poster ) ) {
			return $poster;
		}

		return wp_get_attachment_image_url( $poster, $defaults[ 'poster_size' ] );
	}
}
