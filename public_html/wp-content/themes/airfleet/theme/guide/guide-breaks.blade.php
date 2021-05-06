<section class="section">
	<div class="container">
		@php $breakpoints = [ 'xs', 'sm', 'md', 'lg', 'xl' ]; @endphp
		<h2 class="section__title">Responsive line breaks</h2>
		<p>A set of CSS classes to control the display of <code>&lt;br&gt;</code> responsively.</p>
		<p>
			The classes are based on the grid breakpoints:
			@foreach( $breakpoints as $breakpoint )
				<code>{{ $breakpoint }}</code>{{ $loop->last ? '.' : ',' }}
			@endforeach
		</p>

		<h3 class="section__subtitle">Applied directly to <code>&lt;br&gt;</code></h3>
		<p>These classes are added directly to the <code>&lt;br&gt;</code> element:</p>
		<ul>
			<li>
				Display <code>&lt;br&gt;</code> only in the exact breakpoint:
				@foreach( $breakpoints as $breakpoint )
					<code>{{ $breakpoint }}</code>{{ $loop->last ? '.' : ',' }}
				@endforeach
			</li>
			<li>
				Display <code>&lt;br&gt;</code> in the breakpoint and below:
				@foreach( $breakpoints as $breakpoint )
					<code>{{ $breakpoint }}-down</code>{{ $loop->last ? '.' : ',' }}
				@endforeach
			</li>
			<li>
				Display <code>&lt;br&gt;</code> above the breakpoint:
				@foreach( $breakpoints as $breakpoint )
					<code>{{ $breakpoint }}-up</code>{{ $loop->last ? '.' : ',' }}
				@endforeach
			</li>
		</ul>
		<p>Example:</p>
		<p>There is a <code>&lt;br class="lg-up"&gt;</code> here<br class="lg-up"> that only displays above breakpoint <code>lg</code>.</p>

		<h3 class="section__subtitle">Applied to the parent container of <code>&lt;br&gt;</code></h3>
		<p>These classes are added to the parent container of the <code>&lt;br&gt;</code> element:</p>
		<ul>
			<li>
				Display <code>&lt;br&gt;</code> only in the exact breakpoint:
				@foreach( $breakpoints as $breakpoint )
					<code>br--{{ $breakpoint }}</code>{{ $loop->last ? '.' : ',' }}
				@endforeach
			</li>
			<li>
				Display <code>&lt;br&gt;</code> in the breakpoint and below:
				@foreach( $breakpoints as $breakpoint )
					<code>br--{{ $breakpoint }}-down</code>{{ $loop->last ? '.' : ',' }}
				@endforeach
			</li>
			<li>
				Display <code>&lt;br&gt;</code> above the breakpoint:
				@foreach( $breakpoints as $breakpoint )
					<code>br--{{ $breakpoint }}-up</code>{{ $loop->last ? '.' : ',' }}
				@endforeach
			</li>
		</ul>
		<p>Example:</p>
		<div class="br--lg-up">
			<p>This is a div with code <code>&lt;div class="br--lg-up"&gt;</code>.</p>
			<p>Inside the div there is a <code>&lt;br&gt;</code><br> that only displays above breakpoint <code>lg</code>.</p>
			<p>Inside the div there is a <code>&lt;br&gt;</code><br> that only displays above breakpoint <code>lg</code>.</p>
		</div>

	</div>
</section>
