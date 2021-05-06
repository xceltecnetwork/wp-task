<div class="{{ $class }}">
	@switch($source)
		@case('embed')
			@embed($embed)@endembed
			@break
		@case('file')
			@videofile($file)@endvideofile
			@break
		@default
	@endswitch
</div>
