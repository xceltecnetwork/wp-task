{{--
 Key: group_5d56fedc04d90
--}}
<div class="{{ $class }} c-with-background">
	@background($background)
		<div class="container">
			@sectionheader($section_header)@endsectionheader
			@text($text)@endtext
			@buttoncollection($buttons)@endbuttoncollection
		</div>
	@endbackground
</div>
