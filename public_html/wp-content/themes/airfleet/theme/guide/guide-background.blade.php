<section class="section">
	<div class="container">
		<h2 class="section__title">Background</h2>
		<h3 class="section__subtitle">Image</h3>
		<div class="c-with-background" style="min-height: 300px;">
			@background([
				'display_background' => true,
				'image' => Theme\Assets::getAssetUri( 'images/background_pattern.jpg' ),
			])
				<div class="container">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
			@endbackground
		</div>
		<h3 class="section__subtitle">Color</h3>
		<div class="c-with-background" style="min-height: 300px;">
			@background([
				'display_background' => true,
				'display_background_color' => true,
				'background_color' => [ 'color' => 'primary' ],
			])
				<div class="container">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
			@endbackground
		</div>
		<h3 class="section__subtitle">With empty slot (fill parent)</h3>
		<div class="c-with-background" style="min-height: 300px;">
			@background([
				'display_background' => true,
				'display_background_color' => true,
				'background_color' => [ 'color' => 'secondary' ],
			])@endbackground
		</div>
	</div>
</section>
