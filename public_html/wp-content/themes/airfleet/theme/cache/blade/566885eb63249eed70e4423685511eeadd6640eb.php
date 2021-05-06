<?php $__env->startComponent('components.block', ['block' => $block]); ?>
	<?php $__env->startComponent('components.background', $background); ?>
		<div class="container <?php echo e($orientation); ?>"> <!-- Note the $orientation variable which renders the direction (text+image -or- image+text). You can see this output when inspecting. Add appropriate (S)CSS directives to match design -->
			<div class="row">
				<div class="col-6 col-text">
					<?php $__env->startComponent('components.text', $title); ?><?php echo $__env->renderComponent(); ?>
					<?php $__env->startComponent('components.text', $description); ?><?php echo $__env->renderComponent(); ?>
				</div>
				<div class="col-6 col-picture">
					<?php $__env->startComponent('components.picture', $image); ?><?php echo $__env->renderComponent(); ?>
				</div>
			</div>
		</div>
	<?php echo $__env->renderComponent(); ?>
<?php echo $__env->renderComponent(); ?>
<?php /**PATH /nas/content/live/wpfepizza/wp-content/themes/airfleet/theme/blocks/basic-feature.blade.php ENDPATH**/ ?>