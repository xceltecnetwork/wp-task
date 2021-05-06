@block(['block' => $block])
	@foreach($cards as $card)
		<div class="card-item">
			@carditem($card)@endcarditem
		</div>
	@endforeach
@endblock
