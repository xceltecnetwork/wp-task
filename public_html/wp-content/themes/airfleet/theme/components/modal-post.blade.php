@modal([
	'id'    => 'c-modal_' . $post_id,
	'title' => get_the_title( $modal ),
	'class' => $class,
	'style' => $style,
])
	{!! af_get_content( $modal ) !!}
@endmodal
