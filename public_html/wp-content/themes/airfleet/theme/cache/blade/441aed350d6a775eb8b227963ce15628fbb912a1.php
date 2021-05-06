<?php
	$id = wp_unique_id('card-link-id-');
?>
<style>
  .<?php echo e($id); ?> a {
    background-color: <?php echo e($background_color); ?>;
    color: <?php echo e($text_color); ?>

  }
</style>
<li class="c-button-collection__item <?php echo e($id); ?>"><a href="<?php echo e($link['url']); ?>" target="<?php echo e($link['target']); ?>"><?php echo $link['title']; ?><?php echo e($slot); ?></a></li>
<?php /**PATH /nas/content/live/wpfepizza/wp-content/themes/airfleet/theme/components/card-link.blade.php ENDPATH**/ ?>