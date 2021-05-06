@if($type)
	<div class="{{ $class }}">
		@switch($type)
			@case('picture')
				@picture($picture)@endpicture
				@break
			@case('video')
				@video($video)@endvideo
				@break
			@default
		@endswitch
	</div>
@endif
