<?php $__env->startComponent('components.block', ['block' => $block]); ?>
	<?php $__currentLoopData = $cards; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $card): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
		<div class="card-item">
			<?php $__env->startComponent('components.card-item', $card); ?><?php echo $__env->renderComponent(); ?>
		</div>
	<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
<?php echo $__env->renderComponent(); ?>
<?php /**PATH D:\local\wp-test-theme\app\public\wp-content\themes\airfleet\theme/blocks/card-list.blade.php ENDPATH**/ ?>