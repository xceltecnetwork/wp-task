<section class="section">
	<div class="container">
		<h2 class="section__title">Modal</h2>
		<p>
			@modallink([
				'modal_id' => 'style_guide',
				'class' => 'btn btn-primary',
				'label' => 'Open default modal',
			])@endmodallink
			@modallink([
				'modal_id' => 'style_guide_lightbox',
				'class' => 'btn btn-outline-primary',
				'label' => 'Open lightbox modal',
			])@endmodallink
		</p>
		@modal([
			'id' => 'c-modal_style_guide',
			'title' => 'Modal title',
		])
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		@endmodal
		@modal([
			'id' => 'c-modal_style_guide_lightbox',
			'style' => 'lightbox',
		])
			@image(['image' => Theme\Assets::getAssetUri( 'images/duck.jpg' )])@endimage
		@endmodal
	</div>
</section>
