<?php
/**
 * The template for displaying Comments
 *
 * The area of the page that contains comments and the comment form.
 *
 * @package WPEmergeTheme
 */

/*
 * If the current post is protected by a password and the visitor has not yet
 * entered the password we will return early without loading the comments.
 */
?>
@if (!post_password_required())
	<section class="section-comments" id="comments">
		@if (have_comments())
			<h3>@php comments_number( __( 'No Responses', 'app' ), __( 'One Response', 'app' ), __( '% Responses', 'app' ) ) @endphp</h3>
			<ol class="comments">
				@php
				wp_list_comments(
					[
						'callback' => function( $comment, $args, $depth ) {
							WPEmerge\render(
								'partials.comment-single',
								[
									'comment' => $comment,
									'args'    => $args,
									'depth'   => $depth,
								]
							);
						},
					]
				);
				@endphp
			</ol>

			@php
			carbon_pagination(
				'comments',
				[
					'enable_numbers' => true,
					'prev_html'      => '<a href="{URL}" class="paging__prev">' . esc_html__( '« Previous Comments', 'app' ) . '</a>',
					'next_html'      => '<a href="{URL}" class="paging__next">' . esc_html__( 'Next Comments »', 'app' ) . '</a>',
				]
			);
			@endphp
		@else
			@if (!comments_open())
				<p class="no-comments">{{ __( 'Comments are closed.', 'app' ) }}</p>
			@endif
		@endif

		@php
		comment_form(
			[
				'title_reply'         => __( 'Leave a Reply', 'app' ),
				'comment_notes_after' => '',
			]
		);
		@endphp
	</section>
@endif
