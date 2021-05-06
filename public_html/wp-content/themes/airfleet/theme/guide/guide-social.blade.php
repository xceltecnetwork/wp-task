<section class="section">
	<div class="container">
		<h2 class="section__title">Social</h2>
		@social([
			'social' => [
				[
					"network" => "facebook-f",
					"url" => 'https://facebook.com'
				],
				[
					"network" => "linkedin-in",
					"url" => 'https://linkedin.com'
				],
				[
					"network" => "twitter",
					"url" => 'https://twitter.com'
				],
				[
					"network" => "instagram",
					"url" => 'https://instagram.com'
				],
			],
		])@endsocial
		<ul>
			<li>Before adding any other social icon, remember to import needed FontAwesome icons in <code>vendor/fontawesome.js</code>.</li>
			<li>If you want to test the Social component as a widget, feel free to <code>include('sidebar')</code> somewhere in the code.</li>
		</ul>
	</div>
</section>
