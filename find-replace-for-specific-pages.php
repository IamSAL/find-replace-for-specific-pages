<?php

/**
 * Plugin Name: Find Replace-For Specific Pages
 * Author: Sheikh Salman
 * Author URI: https://github.com/iamsal
 * Version: 1.0.0
 * Description: Search and replace text in specific elementor pages. Also update page title and slug.
 * Text-Domain: find-replace-for-specific-pages
 */

if (!defined('ABSPATH')) : exit();
endif; // No direct access allowed.

/**
 * Define Plugins Contants
 */
define('FRSP_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('FRSP_URL', trailingslashit(plugins_url('/', __FILE__)));

/**
 * Loading Necessary Scripts
 */
add_action('admin_enqueue_scripts', 'load_scripts');
function load_scripts()
{

    wp_enqueue_script('find-replace-for-specific-pages', FRSP_URL . 'dist/bundle.js', ['jquery', 'wp-element'], wp_rand(), true);
    wp_localize_script('find-replace-for-specific-pages', 'appLocalizer', [
        'apiUrl' => home_url('/index.php/wp-json'),
        'nonce' => wp_create_nonce('wp_rest'),
        'dev' => 'Salman'
    ]);
}

require_once FRSP_PATH . 'classes/class-create-admin-menu.php';
require_once FRSP_PATH . 'classes/class-create-settings-routes.php';
