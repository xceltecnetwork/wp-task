<section class="section">
	<div class="container">
		<h2 class="section__title">Colors</h2>

		<h3 class="section__subtitle">Theme</h3>
		<p>To use the colors in SCSS you preceed the name of the color with <code>$color-</code>, such as <code>$color-primary</code>, or call <code>theme-color(primary)</code>.</p>
		@foreach(Theme\Config::get('variables.color') as $color => $value)
			<div class="p-3 mb-2 has-{{ $color }}-background-color">
				<span class="text-dark">{{ $color }}</span>
				<span class="text-white">{{ $color }}</span>
			</div>
		@endforeach

		<h3 class="section__subtitle">Bootstrap</h3>
		<div class="p-3 mb-2 bg-primary text-dark">.bg-primary</div>
		<div class="p-3 mb-2 bg-secondary text-dark">.bg-secondary</div>
		<div class="p-3 mb-2 bg-success text-dark">.bg-success</div>
		<div class="p-3 mb-2 bg-danger text-dark">.bg-danger</div>
		<div class="p-3 mb-2 bg-warning text-dark">.bg-warning</div>
		<div class="p-3 mb-2 bg-info text-dark">.bg-info</div>
		<div class="p-3 mb-2 bg-light text-dark">.bg-light</div>
		<div class="p-3 mb-2 bg-dark text-white">.bg-dark</div>
		<div class="p-3 mb-2 bg-white text-dark">.bg-white</div>
		<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>

		<h3 class="section__subtitle">Functions</h3>
		<p>Pass an array with the fields of <code>Component: Color</code> to the following functions:</p>
		<ul>
			<li><code>af_color_background($color)</code>: returns the name of the CSS class to set the background color.</li>
			<li><code>af_color_text($color)</code>: returns the name of the CSS class to set the text color.</li>
		</ul>
		@php
			$bg_color = ['color' => 'primary'];
			$text_color = ['color' => 'secondary'];
			$bg_color_class = af_color_background($bg_color);
			$text_color_class = af_color_text($text_color);
		@endphp
		<p class="{{ $text_color_class }} {{ $bg_color_class }}">
			This is an example of background color <code>{{ $bg_color['color'] }}</code> and text color <code>{{ $text_color['color'] }}</code>.
		</p>
	</div>
</section>
