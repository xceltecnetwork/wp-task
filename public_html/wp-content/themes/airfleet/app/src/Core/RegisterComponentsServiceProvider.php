<?php

namespace App\Core;

use \WPEmerge\Facades\View;
use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Automatically register component aliases in Blade.
 * Alias are created using the first part of the filename before ".blade.php" and removing all non-alphanumeric characters.
 */
class RegisterComponentsServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {
	protected $template_directory = 'components/';
	protected $component_files = [];

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
		$this->component_files = $this->get_component_files();

		foreach ( $this->component_files as $file ) {
			$this->add_blade_component( $container, $file );
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_action( 'acf/init', [ $this, 'add_view_composers' ] );
	}

	public function get_component_files() {
		$files = [];
		$dir = $this->get_directory_iterator();

		foreach ( $dir as $file ) {
			if ($file->isDot()) {
				continue;
			}
			$files[] = $this->get_component_file( $file );
		}

		return $files;
	}

	public function get_component_file( $fileInfo ) {
		$filename = $fileInfo->getFilename();
		$slug 	  = $this->get_component_slug( $fileInfo );
		$alias 	  = $this->get_component_alias( $slug );
		$path 	  = $fileInfo->getPathName();
		$headers  = array_filter( // array_filter removes empty strings
			get_file_data(
				$path,
				[
					'key'   => 'Key',
					'title' => 'Title',
				]
			)
		);

		return [
			'alias'    => $alias,
			'filename' => $filename,
			'headers'  => $headers,
			'path' 	   => $path,
			'slug'     => $slug,
		];
	}

	public function get_directory_iterator() {
		$path = get_stylesheet_directory() . '/' . $this->template_directory;

		if ( ! is_dir( $path ) ) {
			return [];
		}

		return new \DirectoryIterator( locate_template( $this->template_directory ) );
	}

	public function get_component_slug( $file ) {
		return str_replace( '.blade.php', '', $file->getFilename() );
	}

	public function get_component_alias( $slug ) {
		return strtolower( preg_replace( '/[^\da-z]/i', '', $slug ) );
	}

	public function add_blade_component( $container, $component_file ) {
		$path  = 'components.' . $component_file['slug'];
		$blade = $container[ WPEMERGEBLADE_VIEW_BLADE_VIEW_ENGINE_KEY ];
		$blade->compiler()->component( $path, $component_file['alias'] );
	}

	public function add_view_composers() {
		foreach ( $this->component_files as $file ) {
			$this->add_view_composer( $file );
		}
	}

	public function add_view_composer( $component_file ) {
		$path = 'components/' . $component_file['slug'];
		View::addComposer( $path, function( $view ) use ( $component_file ) {
			$fields_context = af_fields_defaults( $this->get_component_fields( $component_file ) );
			$view_context = $view->getContext();
			$css_context = [ 'class' => $this->get_component_css_class( $component_file, $view_context ) ];
			$default_context = array_merge(
				$fields_context,
				$view_context,
				$css_context
			);
			$additional_context = $this->get_component_context( $component_file, $default_context );
			$view->with(
				array_merge(
					$default_context,
					$additional_context
				)
			);
		} );
	}

	public function get_component_fields( $file ) {
		if ( ! function_exists( 'acf_get_fields' ) ) {
			return [];
		}
		$group = $this->get_component_group( $file );

		if ( ! $group ) {
			return [];
		}

		return acf_get_fields( $group );
	}

	public function get_component_group( $file ) {
		if ( isset( $file['headers']['key'] ) ) {
			return $file['headers']['key'];
		}
		$slug_humanized = af_kebab_to_human_capitalized( $file['slug'] );
		$title = $file['headers']['title'] ?? $slug_humanized;
		$group_title = 'Component: ' . $title;

		return af_field_group_by_title( $group_title, false );
	}

	public function get_component_context( $file, $default_context ) {
		$composer_class = '\\App\\Components\\' . af_kebab_to_pascal( $file['slug'] ) . 'Component';

		if ( ! class_exists( $composer_class ) ) {
			return [];
		}
		$composer = new $composer_class( $file, $default_context );

		return array_merge(
			$composer->get_context( $file, $default_context ),
			[ 'composer' => $composer ]
		);
	}

	public function get_component_css_class( $file, $context ) {
		$default_css_class = 'c-' . $file['slug'];
		$custom_class = $context['class'] ?? '';

		return classNames([
			$default_css_class,
			$custom_class,
		]);
	}
 }
