<picture class="{{ $class }}">
	{{ $slot }}
	@if( $responsive_image )
		@foreach( $responsive_sizes as $width => $src )
			<source @attrs([
				'srcset' => $src,
				'media' => $width ? '(min-width: ' . $width . 'px)' : '',
			])>
		@endforeach
	@endif
	@image($image_data)@endimage
</picture>
