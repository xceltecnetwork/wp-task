<picture class="<?php echo e($class); ?>">
	<?php echo e($slot); ?>

	<?php if( $responsive_image ): ?>
		<?php $__currentLoopData = $responsive_sizes; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $width => $src): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
			<source <?= af_attributes([
				'srcset' => $src,
				'media' => $width ? '(min-width: ' . $width . 'px)' : '',
			]); ?>>
		<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
	<?php endif; ?>
	<?php $__env->startComponent('components.image', $image_data); ?><?php echo $__env->renderComponent(); ?>
</picture>
<?php /**PATH D:\local\wp-test-theme\app\public\wp-content\themes\airfleet\theme/components/picture.blade.php ENDPATH**/ ?>