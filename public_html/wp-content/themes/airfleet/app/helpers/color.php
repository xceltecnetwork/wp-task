<?php
/**
 * Color helper functions.
 *
 * @package WPEmergeTheme
 */

/**
 * Determines if a color has been chosen for an instance of "Component: Color".
 *
 * @param array $color Array with custom fields of "Component: Color".
 * @return boolean
 */
function af_color_is_set( $color ) {
	return isset( $color ) && ! empty( $color ) && isset( $color['color'] ) && ! empty( $color['color'] );
}

/**
 * Returns background class based on given color custom field.
 *
 * @param array $color Array with custom fields of "Component: Color".
 * @return string
 */
function af_color_background( $color ) {
	return af_color_is_set( $color ) ? 'has-' . $color['color'] . '-background-color' : '';
}

/**
 * Returns text color class based on given color custom field.
 *
 * @param array $color Array with custom fields of "Component: Color".
 * @return string
 */
function af_color_text( $color ) {
	return af_color_is_set( $color ) ? 'has-' . $color['color'] . '-color' : '';
}

/**
 * Populates Color Custom Field (Select) with values/colors defined in config.
 *
 * @param array $field custom fiield.
 * @return array
 */
function af_load_acf_colors( $field ) {
	$colors = \Theme\Config::get( 'variables.color', [] );

	if ( is_array( $colors ) && ! empty( $colors ) ) {
		// Only customize the choices when not editing the group in ACF.
		if ( get_post_type() !== 'acf-field-group' ) {
			// Reset choices.
			$field['choices'] = array();

			// Loop through colors and add to field 'choices'.
			foreach ( $colors as $name => $color ) {
				$field['choices'][ $name ] = ucfirst( preg_replace( '/[-_]/', ' ', $name ) );
			}
		}
	}

	return $field;
}
