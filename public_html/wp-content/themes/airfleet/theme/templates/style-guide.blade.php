<?php
/**
 * App Layout: layouts/app.php
 *
 * Template Name: Style Guide
 *
 * @package WPEmergeTheme
 */

?>
@extends('layouts.app')

@section('content')
	@while (have_posts())
		@php the_post() @endphp
		<div @php post_class() @endphp>
			<div class="container">
				<h1 class="page__title">{{ get_the_title() }}</h1>
			</div>
			<div class="page__content">
				@php the_content(); @endphp
				@php carbon_pagination( 'custom' ); @endphp
			</div>
			@php
				$sections = [
					'navbar',
					'colors',
					'paragraph',
					'headings',
					'links',
					'lists',
					'breaks',
					'margin',
					'buttons',
					'image',
					'picture',
					'background',
					'text',
					'title',
					'section-header',
					'cta',
					'embed',
					'video',
					'media',
					'modal',
					'social',
					'share',
					'form',
				];
			@endphp
			@foreach($sections as $section)
				@includeIf('guide/guide-' . $section)
			@endforeach
		</div>
	@endwhile
@endsection
