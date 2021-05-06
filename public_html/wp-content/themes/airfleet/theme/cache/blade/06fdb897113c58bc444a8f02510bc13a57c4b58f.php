<?php $__currentLoopData = $global['modals']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $modal): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
	<?php $__env->startComponent('components.modal-post', ['modal' => $modal]); ?><?php echo $__env->renderComponent(); ?>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
<?php /**PATH D:\local\wp-test-theme\app\public\wp-content\themes\airfleet\theme/partials/modals.blade.php ENDPATH**/ ?>