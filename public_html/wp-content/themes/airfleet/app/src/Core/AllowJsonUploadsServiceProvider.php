<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Allow Json Uploads
 */
class AllowJsonUploadsServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}


	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_filter( 'upload_mimes', [ $this, 'upload_mimes' ], 1, 1 );
		add_filter( 'wp_check_filetype_and_ext', [ $this, 'check_filetype_and_ext' ], 10, 4 );
	}

	/**
	 * Function to update allowed file types array
	 */
	public function upload_mimes( $mime_types ) {
		if ( $this->is_enabled_and_valid() ) {
			$mime_types['json'] = 'application/json';
		}


		return $mime_types;
	}

	/**
	 * Check filetype and mime type
	 */
	function check_filetype_and_ext( $types, $file, $filename, $mimes ) {
		if ( ! $this->is_enabled_and_valid() ) {
			return $types;
		}
		$wp_filetype = wp_check_filetype( $filename, $mimes );
		$ext         = $wp_filetype['ext'];
		$type        = $wp_filetype['type'];

		if ( $ext !== 'json' || ! function_exists( 'finfo_file' ) ) {
			return $types;
		}

		// Use finfo_file if available to validate non-image files.
		$finfo     = finfo_open( FILEINFO_MIME_TYPE );
		$real_mime = finfo_file( $finfo, $file );
		finfo_close( $finfo );

		// If the extension matches an alternate mime type, let's use it
		if ( in_array( $real_mime, array( 'application/json', 'text/plain' ) ) ) {
			$types['ext']  = $ext;
			$types['type'] = $type;
		}

		return $types;
	}


	/**
	 * Check if options field allow_json_uploads is enabled and not empty
	 */
	public function is_enabled_and_valid() {
		return get_field( 'allow_json_uploads', 'option' ) === true;
	}
}
