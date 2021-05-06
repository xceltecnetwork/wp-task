<{!!
	join(
		' ',
		array_filter([
			$tag,
			af_attributes( $attrs )
		])
	)
!!}>{!! $slot !!}</{{ $tag }}>
