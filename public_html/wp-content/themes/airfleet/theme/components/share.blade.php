<div class="{{ $class }}">
	<ul class="c-share__list">
		@foreach($items as $alias => $item)
			@if($item['enabled'])
				<li class="c-share__item">
					<a @attrs([
						'target' => '_blank',
						'class' => classNames([
							'c-share__btn',
							'c-share__btn-' . $alias => boolval( $alias ),
						]),
						'href' => $item['url'],
					])>
						<i @attrs([ 'class' => $item['icon'] ])></i>
					</a>
				</li>
			@endif
		@endforeach
	</ul>
</div>
