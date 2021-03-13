<?php

/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Settings_Rest_Route
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        register_rest_route('frsp/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            'permission_callback' => [$this, 'get_settings_permission']
        ]);
        register_rest_route('frsp/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [$this, 'save_settings'],
            'permission_callback' => [$this, 'save_settings_permission']
        ]);
        register_rest_route('frsp/v1', '/settings', [
            'methods' => 'PUT',
            'callback' => [$this, 'update_content'],
            'permission_callback' => [$this, 'save_content_permission']
        ]);
    }

    public function get_settings()
    {
        $searchStr = get_option('frsp_settings_searchStr');
        if (!is_array(($searchStr))) {
            $searchStr = array();
        }
        $searchStr = array_slice($searchStr, -10);
        $update_details  = get_option('frsp_settings_update_details');

        $frsp_settings_last_update_page = get_option('frsp_settings_last_update_page');
        $response = [

            'update_details'  => $update_details,
            'frsp_settings_last_update_page'     => $frsp_settings_last_update_page,
            'searchStr' => $searchStr,

        ];

        return rest_ensure_response($response);
    }

    public function get_settings_permission()
    {
        return true;
    }

    public function save_settings($req)
    {
        $pastStr = get_option('frsp_settings_searchStr');
        if (is_array(($pastStr))) {
            $all_inputs = $pastStr;
        } else {
            $all_inputs = array();
        }
        array_push($all_inputs, sanitize_text_field($req['searchStr']));

        update_option('frsp_settings_searchStr', $all_inputs);
        return rest_ensure_response('success');
    }

    public function update_content($req)
    {
        $searchStr = esc_textarea($req['searchStr']);
        $replaceStr = esc_textarea($req['replaceStr']);
        $pageID = $req['pageID'];

        $pagetoUpdate = get_post($pageID);
        $content = $pagetoUpdate->post_content;
        $updated_content = str_replace($searchStr, $replaceStr,  $content);

        $single = boolval($req['single']);
        $pageTitle = sanitize_text_field($req['pageTitle']);
        $pageSlug = sanitize_title($req['pageSlug']);

        if ($single) {
            $isupdated = wp_update_post(array(
                'ID' => $pageID,
                'post_content' => $updated_content,
                'post_title' => $pageTitle,
                'post_name' => $pageSlug
            ));
        }


        $metaToUpdate = get_post_meta($pageID, "_elementor_data", true);
        $updatedMeta = str_replace($searchStr, $replaceStr, $metaToUpdate);
        if ($metaToUpdate == $updatedMeta) {
            return rest_ensure_response('Nothing to update');
        }
        $isupdatedMeta = update_post_meta($pageID, "_elementor_data", $updatedMeta);

        $update_details = array("replaceStr" => $replaceStr, "searchStr" => $searchStr, "pageID" => $pageID, "updated_content" => $updated_content, "isupdatedContent" => $isupdated, "isupdatedMeta" => $isupdatedMeta);
        update_option('frsp_settings_last_update_page', $pagetoUpdate->post_name);
        update_option('frsp_settings_update_details', $update_details);
        return rest_ensure_response('success');
    }

    public function save_settings_permission()
    {
        return current_user_can('publish_posts');
    }
    public function save_content_permission()
    {
        return current_user_can('edit_posts');
    }
}
new WP_React_Settings_Rest_Route();
