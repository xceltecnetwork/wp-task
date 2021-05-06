<?php
/**
 * Helper functions for pictures and images.
 *
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Takes an array of responsive sizes from the Picture component and returns a sorted array with the image URLs.
 *
 * @param array $responsive_sizes Array of arrays with elements "image" (WordPress image ID) and "min_width" (string with width in pixels).
 * @return array Ordered array of responsive sizes, where keys are the minimum widths and values are the images URLs.
 */
function af_picture_responsive_sizes( $responsive_sizes ) {
	$sizes = array();

	if ( ! is_array( $responsive_sizes ) ) {
		return $sizes;
	}

	foreach ( $responsive_sizes as $size ) {
		if ( is_string( $size['image'] ) ) {
			$image_url = $size['image'];
		} else {
			$image     = wp_get_attachment_image_src( $size['image'], 'full' );
			$image_url = $image[0];
		}
		$min_width           = $size['min_width'];
		$sizes[ $min_width ] = $image_url;
	}
	krsort( $sizes );

	return $sizes;
}

/**
 * Get the URL to an image.
 *
 * @param string|array|int $image Image URL, image array with "url" key or image attachment ID.
 * @param string|array     $size (Optional) Image size. Accepts any valid image size, or an array of width and height values in pixels (in that order).
 * @param boolean          $icon (Optional) Whether the image should be treated as an icon.
 * @return string|false
 */
function af_image_url( $image, $size = 'full', $icon = false ) {
	$url = false;

	if ( is_string( $image ) ) {
		$url = $image;
	} elseif ( is_array( $image ) && isset( $image['url'] ) ) {
		$url = $image['url'];
	} elseif ( is_int( $image ) ) {
		$src = wp_get_attachment_image_src( $image, $size, $icon );

		if ( ! empty( $src ) && isset( $src[0] ) ) {
			$url = $src[0];
		}
	}

	return $url;
}
