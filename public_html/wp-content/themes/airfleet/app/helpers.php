<?php
/**
 * Load helpers.
 * Automatically require helpers in app/helpers directory.
 * You should not need to edit this file (instead add your helpers in app/helpers).
 *
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Automatically require all helper files in the app/helpers directory (non-recursive).
 */
$helpers = glob( APP_APP_HELPERS_DIR . '*.php' );
foreach ( $helpers as $helper ) {
	if ( ! is_file( $helper ) ) {
		continue;
	}

	require_once $helper;
}
