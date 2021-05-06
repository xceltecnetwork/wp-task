{{--
 Description: Display a video section with background, header, text, and buttons.
--}}
@block(['block' => $block])
	@background($background)
		<div class="container">
			@sectionheader($section_header)@endsectionheader
			@text($text)@endtext
			@video($video)@endvideo
			@buttoncollection($buttons)@endbuttoncollection
		</div>
	@endbackground
@endblock
