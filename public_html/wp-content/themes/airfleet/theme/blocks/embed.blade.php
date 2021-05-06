@block(['block' => $block])
	@background($background)
		<div class="container">
			@sectionheader($section_header)@endsectionheader
			@text($text)@endtext
			@embed($embed)@endembed
			@buttoncollection($buttons)@endbuttoncollection
		</div>
	@endbackground
@endblock
