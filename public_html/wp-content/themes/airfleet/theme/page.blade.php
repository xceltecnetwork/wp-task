<?php
/**
 * App Layout: layouts/app.php
 *
 * This is the template that is used for displaying all pages by default.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WPEmergeTheme
 */

?>
@extends('layouts.app')

@section('content')
	@while (have_posts())
		@php the_post() @endphp
		<div @php post_class() @endphp>
			<div class="page__content">
				@php the_content(); @endphp
				@php carbon_pagination( 'custom' ); @endphp
			</div>
		</div>
	@endwhile
@endsection
