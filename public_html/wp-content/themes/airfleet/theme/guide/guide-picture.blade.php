<section class="section">
	<div class="container">
		<h2 class="section__title">Picture</h2>
		<h3 class="section__subtitle">Picture with responsive sizes</h3>
		<p>Resize window to see different image.</p>
		@picture([
			'image' => Theme\Assets::getAssetUri( 'images/duck.jpg' ),
			'responsive_image' => true,
			'responsive_sizes' => [
				[
					'image' => Theme\Assets::getAssetUri( 'images/duck_large.jpg' ),
					'min_width' => '992',
				],
			],
		])@endpicture
	</div>
</section>
