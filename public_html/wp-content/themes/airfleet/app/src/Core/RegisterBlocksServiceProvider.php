<?php

namespace App\Core;

use WPEmerge\Facades\View;
use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Automatically register blocks with ACF.
 * Looks for template files in the blocks folder and reads the metadata at the top of the files.
 *
 * @see https://stackoverflow.com/c/codersclan/a/182/5
 * @see https://medium.com/nicooprat/acf-blocks-avec-gutenberg-et-sage-d8c20dab6270
 * @see https://gist.github.com/nicooprat/2c1a642d102425d3131037e5dc156361
 * @see https://github.com/MWDelaney/sage-acf-gutenberg-blocks
 */
class RegisterBlocksServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_filter( 'block_categories', [ $this, 'register_categories' ], 10, 2 );
		add_action( 'acf/init', [ $this,'register_blocks' ] );
	}

	public function register_categories( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => 'airfleet',
					'title' => __( 'Airfleet', 'airfleet' ),
				),
			),
			$categories
		);
	}

	public function register_blocks() {
		if ( ! function_exists( 'acf_register_block' ) ) {
			return;
		}
		$block_files = $this->get_block_files();

		foreach ( $block_files as $block_file ) {
			$default_settings = $this->default_block_settings( $block_file['slug'] );
			$block_settings = $this->get_block_settings( $block_file );
			$final_settings = array_merge( $default_settings, array_filter( $block_settings ) ); // array_filter removes empty strings
			acf_register_block( $final_settings );
		}
	}

	public function get_block_files() {
		// Set the directory blocks are stored in.
		$template_directory   = $this->template_directory();
		$stylesheet_directory = get_stylesheet_directory();
		$path                 = "$stylesheet_directory/$template_directory";

		// Bail if it's not a directory
		if ( ! is_dir( $path ) ) {
			return;
		}

		// Get templates directory iterator.
		$dir                  = new \DirectoryIterator( locate_template( $template_directory ) );

		// Loop through found templates and set up data.
		$files                = [];

		foreach ( $dir as $fileInfo ) {
			if ( $fileInfo->isDot() ) {
				continue;
			}
			$files[] = $this->get_block_file( $fileInfo );
		}

		return $files;
	}

	public function template_directory() {
		return 'blocks/';
	}

	public function get_block_file( $fileInfo ) {
		// Strip the file extension to get the slug.
		$slug               = str_replace( '.blade.php', '', $fileInfo->getFilename() );

		// Locate the template.
		$template_directory = $this->template_directory();
		$file_path          = locate_template( "$template_directory/${slug}.blade.php" );

		return [
			'slug'            => $slug,

			// Get header info from the found template file(s).
			'file_headers'    => get_file_data(
				$file_path,
				[
					'title'       => 'Title',
					'description' => 'Description',
					'category'    => 'Category',
					'icon'        => 'Icon',
					'keywords'    => 'Keywords',
					'mode'        => 'Mode',
					'post_types'  => 'PostTypes',
				]
			),
		];
	}

	public function get_block_settings( $block_file ) {
		$block_settings = [
			'name'            => $block_file['slug'],
			'title'           => $block_file['file_headers']['title'],
			'description'     => $block_file['file_headers']['description'],
			'category'        => $block_file['file_headers']['category'],
			'icon'            => $block_file['file_headers']['icon'],
			'keywords'        => $block_file['file_headers']['keywords'] ? explode( ' ', $block_file['file_headers']['keywords'] ) : '',
			'mode'            => $block_file['file_headers']['mode'],
			'render_callback' => [ $this, 'render_block' ],
		];

		// If the PostTypes header is set in the template, restrict this block to those types.
		if ( ! empty( $block_file['file_headers']['post_types'] ) ) {
			$block_settings['post_types'] = explode( ' ', $block_file['file_headers']['post_types'] );
		}

		return $block_settings;
	}

	public function default_block_settings( $slug ) {
		$title = ucfirst( str_replace( '-', ' ', $slug ) );

		return [
			'name'            => $slug,
			'title'           => $title,
			'description'     => $title . ' block',
			'category'        => 'airfleet',
			'icon'            => 'format-image',
			'keywords'        => array_merge( [ 'airfleet' ], explode( '-', $slug ) ),
			'mode'            => 'auto',
			'render_callback' => [ $this, 'render_block' ],
		];
	}

	public function render_block( $block, $content = '', $is_preview = false, $post_id = 0 ) {
		$block = $this->get_block_data_for_rendering( $block, $content, $is_preview, $post_id );
		$slug  = $block['slug'];
		$context = [
			'block'      => $block,
			'content'    => $content,
			'is_preview' => $is_preview,
			'post_id'    => $post_id,
		];
		$fields_context = function_exists( 'get_fields' ) ? ( get_fields() ?: [] ) : [];
		$default_context = array_merge( $context, $fields_context );
		$additional_context = $this->get_block_context( $default_context );

		// Render the block.
		\WPEmerge\render(
			"blocks/${slug}",
			array_merge(
				$default_context,
				$additional_context
			)
		);
	}

	public function get_block_context( $default_context ) {
		$composer_class = '\\App\\Blocks\\' . af_kebab_to_pascal( $default_context['block']['slug'] ) . 'Block';

		if ( ! class_exists( $composer_class ) ) {
			return [];
		}
		$composer = new $composer_class( $default_context );

		return array_merge(
			$composer->get_context( $default_context ),
			[ 'composer' => $composer ]
		);
	}

	public function get_block_data_for_rendering( $block, $content = '', $is_preview = false, $post_id = 0 ) {
		// Determine page slug.
		$page_slug        = get_post_field( 'post_name', $post_id );

		// Set up the block slug to be useful.
		$slug             = str_replace( 'acf/', '', $block['name'] );

		// Get the class defined through the UI.
		$block_class      = isset( $block['className'] ) ? $block['className'] : '';

		// Set up the block data.
		$block['slug']    = $slug;
		$block['classes'] = implode(
			' ',
			[
				'c-block',
				'b-' . $slug,
				'b-' . $slug . '--page-' . $page_slug,
				$block_class,
				'align' . $block['align'],
			]
		);

		// Update ID last after all block data is up to date.
		$block['id']     = $this->generate_block_id( $block );

		return $block;
	}

	/**
	 * Generate Unique Block ID
	 *
	 * @param array $block Block.
	 * @return string
	 */
	public function generate_block_id( $block ) {
		$slug    = $block['slug'];
		$counter = 'block-id-index-' . $slug;

		if ( ! isset( $GLOBALS[ $counter ] ) || empty( $GLOBALS[ $counter ] ) ) {
			$GLOBALS[ $counter ] = 1;
		} else {
			$GLOBALS[ $counter ] += 1;
		}
		$index   = $GLOBALS[ $counter ];

		return "b-$slug-$index";
	}

 }
