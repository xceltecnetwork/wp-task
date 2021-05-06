<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Core form features.
 * Registers `af_form` custom post type.
 * Allows dynamic custom choices for forms sources (filter `af_form_sources`).
 */
class FormsServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}


	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_filter( 'acf/load_field/key=field_5d1489119980b', [ $this, 'load_source_choices' ] );
	}


	/**
	 * Populates Form Source Custom Field (Select) with values/integrations added via af_form_sources filter
	 *
	 * @param array $field custom field.
	 * @return array
	 */
	function load_source_choices( $field ) {
		if ( get_post_type() !== 'acf-field-group' ) {
			// Assign available form sources as a custom field value
			$field['choices'] = apply_filters( 'af_form_sources', [] );
		}

		return $field;
	}

	/**
	 * Register custom post type for forms.
	 *
	 * @return void
	 */
	public function register_post_type() {
		register_post_type(
			'af_form',
			array(
				'labels'              => array(
					'name'               => __( 'Forms', 'app' ),
					'singular_name'      => __( 'Form', 'app' ),
					'add_new'            => __( 'Add New', 'app' ),
					'add_new_item'       => __( 'Add new Form', 'app' ),
					'view_item'          => __( 'View Form', 'app' ),
					'edit_item'          => __( 'Edit Form', 'app' ),
					'new_item'           => __( 'New Form', 'app' ),
					'search_items'       => __( 'Search Forms', 'app' ),
					'not_found'          => __( 'No forms found', 'app' ),
					'not_found_in_trash' => __( 'No forms found in trash', 'app' ),
				),
				'public'              => false,
				'exclude_from_search' => false,
				'show_ui'             => true,
				'hierarchical'        => false,
				'query_var'           => true,
				'menu_icon'           => 'dashicons-admin-post',
				'supports'            => array( 'title' ),
				'rewrite'             => array(
					'slug'       => 'form',
					'with_front' => false,
				),
			)
		);
	}


}
