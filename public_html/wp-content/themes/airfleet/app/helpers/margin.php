<?php
/**
 * Margin helpers.
 *
 * @package WPEmergeTheme
 */

/**
 * Get the margin class name.
 *
 * @param array $margin ACF field margin value.
 * @return string The current class name.
 */
function af_margin_classes( $margin ) {
	$classes = empty( $margin ) ? [] : [ 'c-margin' ];

	foreach ( $margin as $key => $value ) {
		$classes[] = 'c-' . str_replace( '_', '--', $key ) . '-' . $value;
	}

	return implode( $classes, ' ' );
}
