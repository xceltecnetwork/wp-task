@if( is_string( $image ) )
	<img @attrs([
		'src' => $image,
		'class' => $class,
		'alt' => '',
	])>
@else
	{!! wp_get_attachment_image(
		$image,
		$size,
		$icon,
		$attr
	) !!}
@endif
