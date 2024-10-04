<?php

namespace RRZE\ElementsBlocks;

defined('ABSPATH') || exit;

class ThemeSniffer {
    /**
     * Checks if the current theme belongs to a specified group or returns the group name.
     * @param string $targetGroup Optional. The specific group to check against the active theme.
     * @return bool|string Boolean if a target group is specified, otherwise the group name or an empty string.
     */
    public static function getThemeGroup($targetGroup = '') {
        $themes = [
            'fauthemes' => [
                'FAU-Einrichtungen',
                'FAU-Einrichtungen-BETA',
                'FAU-Philfak',
                'FAU-Medfak',
                'FAU-Techfak',
                'FAU-Natfak',
                'FAU-RWFak',
                'Fau-Blog',
                'FAU Jobportal'
            ],
            'rrzethemes' => ['rrze-2019'],
            'eventthemes' => ['FAU-Events'],
        ];

        // Get the current active theme
        $active_theme = wp_get_theme();
        $theme_name = $active_theme->get('Name');

        // Check against predefined theme groups
        foreach ($themes as $group => $themeList) {
            if (in_array($theme_name, $themeList, true)) {
                // Return boolean if a target group is specified, otherwise the group name
                return $targetGroup ? $group === $targetGroup : $group;
            }
        }

        // Return false or an empty string depending on if a target group is specified
        return $targetGroup ? false : '';
    }
}

// Usage example:
// To check if the current theme is in 'fauthemes':
// var_dump(ThemeSniffer::getThemeGroup('fauthemes'));

// To get the current theme group name:
// echo ThemeSniffer::getThemeGroup();
