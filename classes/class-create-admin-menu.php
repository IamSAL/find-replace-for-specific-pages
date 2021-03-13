<?php

/**
 * This file will create admin menu page.
 */

class FRSP_Create_Admin_Page
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'create_admin_menu']);
    }

    public function create_admin_menu()
    {
        $capability = 'manage_options';
        $slug = 'frsp-settings';

        add_menu_page(
            __('Find Replace-For Specific Pages', 'find-replace-for-specific-pages'),
            __('Find Replace-For Specific Pages', 'find-replace-for-specific-pages'),
            $capability,
            $slug,
            [$this, 'menu_page_template'],
            'dashicons-buddicons-replies'
        );
    }

    public function menu_page_template()
    {
        echo '<div class="wrap"><div id="frsp-admin-app"></div></div>';
    }
}
new FRSP_Create_Admin_Page();
