
<?php $__env->startComponent('components.block', ['block' => $block]); ?>
	<?php $__env->startComponent('components.background', $background); ?>
		<div class="container">
			<div class="row">
				<div class="col-6 col-text">
					<?php $__env->startComponent('components.text', $title); ?><?php echo $__env->renderComponent(); ?>
					<?php $__env->startComponent('components.text', $subtitle); ?><?php echo $__env->renderComponent(); ?>
					<ul class="buttons">
						<?php $__env->startComponent('components.link', $primary_button); ?><?php echo $__env->renderComponent(); ?>
						<?php $__env->startComponent('components.link', $secondary_button); ?><?php echo $__env->renderComponent(); ?>
					</ul>
				</div>
				<div class="col-6 col-picture">
					<?php $__env->startComponent('components.picture', $image); ?><?php echo $__env->renderComponent(); ?>
				</div>
			</div>
		</div>
	<?php echo $__env->renderComponent(); ?>
<?php echo $__env->renderComponent(); ?>
<?php /**PATH /nas/content/live/wpfepizza/wp-content/themes/airfleet/theme/blocks/hero.blade.php ENDPATH**/ ?>