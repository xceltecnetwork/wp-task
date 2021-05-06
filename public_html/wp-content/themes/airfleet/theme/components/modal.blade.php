{{--
 Key: group_5db4848cdaf57
--}}
<div @attrs([
	'class' => $class,
	'id' => $id,
	'tabindex' => -1,
	'role' => 'dialog',
	'aria-labelledby' => $id . 'Label',
	'aria-hidden' => 'true',
])>
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				@if($header)
					{{ $header }}
				@else
					<h5 @attrs([ 'class' => 'modal-title', 'id' => $id . 'Label' ])>{{ $title }}</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="{{ __('Close', 'airfleet') }}">
						<span aria-hidden="true">&times;</span>
					</button>
				@endif
			</div>
			<div class="modal-body">
				{{ $slot }}
			</div>
			@if($footer)
				<div class="modal-footer">
					{{ $footer }}
				</div>
			@endif
		</div>
	</div>
</div>
