<?php
/**
 * Helper functions related to display, rendering and manipulating HTML.
 *
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Check if $slot from Blade template is empty.
 *
 * @param \Illuminate\Support\HtmlString $slot Slot variable from Blade template.
 * @return boolean
 */
function af_is_slot_empty( $slot ) {
	if ( $slot instanceof \Illuminate\Contracts\Support\Htmlable ) {
		return empty( $slot->toHtml() );
	}

	return empty( $slot );
}

/**
 * Renders the attributes for an HTML tag.
 * The function accepts attributes in associative array,
 * filters out falsy attributes and escapes the attribute values.
 *
 * @param array $attributes List of attributes to render.
 * @return string
 */
function af_attributes( array $attributes = [] ) {
	$attributes = array_map(
		function( $name, $value ) {
			// All the falsy attributes should be filtered out except the alt attribute for the images.
			if ( ! boolval( $value ) && ! in_array( $name, [ 'alt' ], true ) ) {
				return false;
			}

			if ( true === $value ) {
				return $name;
			}

			if ( is_callable( $value ) ) {
				$value = $value();
			}

			if ( is_array( $value ) || is_object( $value ) ) {
				$value = wp_json_encode( $value );
			}

			return $name . '="' . esc_attr( $value ) . '"';
		},
		array_keys( $attributes ),
		array_values( $attributes )
	);

	return join( ' ', array_filter( $attributes ) );
}

/**
 * Filter body classes by removing unwanted strings.
 *
 * @param array $classes CSS body classes.
 * @return array
 */
function af_cleanup_body_classes( array $classes ) {
	if ( is_single() || is_page() && ! is_front_page() ) {
		$base = basename( get_permalink() );

		if ( ! in_array( $base, $classes, true ) ) {
			$classes[] = $base;
		}
	}

	$classes = array_map(
		function ( $class ) {
			return preg_replace( [ '/-blade(-php)?$/', '/^page-template-templates/' ], '', $class );
		},
		$classes
	);

	return array_filter( $classes );
}

/**
 * Filter Body Class so it gets the custom classes from the ACF
 *
 * @param array $classes Classes from body_class WP function.
 * @return array
 */
function af_custom_body_class( array $classes ) : array {

	$custom_class = get_field( 'css_class' );

	if ( $custom_class ) {
		foreach ( explode( ' ', $custom_class ) as $class ) {
			$trimmed   = trim( $class );
			$sanitized = sanitize_html_class( $trimmed );

			$classes = ! in_array( $sanitized, $classes, true ) ? array_merge( $classes, [ $sanitized ] ) : $classes;
		}
	}

	return $classes;

}
