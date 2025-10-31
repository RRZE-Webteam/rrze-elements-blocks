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
                'FAU Jobportal',
                'FAU-Elemental'
            ],
            'fauelemental' => [
                'FAU-Elemental',
            ],
            'rrzethemes' => ['rrze-2019'],
            'eventthemes' => ['FAU-Events'],
        ];

        // Get the current active theme
        $activeTheme = wp_get_theme();
        $themeName = $activeTheme->get('Name');

        if ($targetGroup !== '') {
            return isset($themes[$targetGroup])
                && in_array($themeName, $themes[$targetGroup], true);
        }

        foreach ($themes as $group => $list) {
            if (in_array($themeName, $list, true)) {
                return $group;
            }
        }

        return '';
    }
}

// Usage example:
// To check if the current theme is in 'fauthemes':
// var_dump(ThemeSniffer::getThemeGroup('fauthemes'));

// To get the current theme group name:
// echo ThemeSniffer::getThemeGroup();
