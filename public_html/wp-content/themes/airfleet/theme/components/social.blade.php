<ul class="{{ $class }}">
	@if($social)
		@foreach($social as $item)
			<li class="c-social__item">
				@link($item + [
					'class' => 'c-social__link',
					'target' => '_blank',
				])<i class="c-social__icon fab fa-{{ $item['network'] }}"></i>@endlink
			</li>
		@endforeach
	@endif
</ul>
