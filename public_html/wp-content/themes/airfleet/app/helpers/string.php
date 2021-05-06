<?php
/**
 * String helper functions.
 *
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Transform a string from kebab-case to PascalCase.
 *
 * @param string $str Input string.
 * @return string
 */
function af_kebab_to_pascal( string $str ) {
	return str_replace( '-', '', ucwords( $str, '-' ) );
}

/**
 * Transform a string from kebab-case to Human Case (uppercasing the first character of each word).
 *
 * @param string $str Input string.
 * @return string
 */
function af_kebab_to_human_capitalized( string $str ) {
	return str_replace( '-', ' ', ucwords( $str, '-' ) );
}
