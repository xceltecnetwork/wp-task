<?php
namespace App\Widgets;

abstract class BaseWidget extends \WP_Widget
{
    abstract public function render($args, $instance, $widget_id);

    /**
     * Outputs the content of the widget
     *
     * @param array $args Display arguments including before_title, after_title, before_widget, and after_widget.
     * @param array $instance The settings for the particular instance of the widget.
     */
    public function widget($args, $instance)
    {
        // outputs the content of the widget
        if ( ! isset( $args['widget_id'] ) ) {
            $args['widget_id'] = $this->id;
        }
        $widget_id = 'widget_' . $args['widget_id'];
        $title = get_field('title', $widget_id);
        echo $args['before_widget'];

        if ($title) {
            echo $args['before_title'] . esc_html($title) . $args['after_title'];
        }
        $this->render($args, $instance, $widget_id);
        echo $args['after_widget'];
    }

    /**
     * Outputs the options form on admin
     *
     * @param array $instance The widget options
     * @return string The HTML markup for the form.
     */
    public function form($instance)
    {
        // outputs the options form on admin
        return '';
    }

    /**
     * Processing widget options on save
     *
     * @param array $new_instance The new options
     * @param array $old_instance The previous options
     *
     * @return array
     */
    public function update($new_instance, $old_instance)
    {
        // processes widget options to be saved
        return $new_instance;
    }
}
