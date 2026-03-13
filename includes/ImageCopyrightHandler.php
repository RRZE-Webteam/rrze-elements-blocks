<?php

namespace RRZE\ElementsBlocks;

defined('ABSPATH') || exit;

/**
 * A static helper class to handle image copyright evaluation.
 */
class ImageCopyrightHandler
{
    /**
     * Evaluates and processes the copyright information for a given post or attachment ID.
     *
     * This function determines the correct attachment ID, extracts the copyright
     * text from the image metadata (prioritizing 'copyright' over 'credit'),
     * pushes the copyright information to the global filter, and returns the text.
     *
     * @param int $post_or_attachment_id The ID of the post or the attachment.
     * @return string|null The evaluated copyright text, or null if none is found.
     */
    public static function process(int $post_or_attachment_id): ?string
    {
        $attachment_id = 0;

        if (get_post_type($post_or_attachment_id) === 'attachment') {
            $attachment_id = $post_or_attachment_id;
        } elseif (has_post_thumbnail($post_or_attachment_id)) {
            $attachment_id = (int) get_post_thumbnail_id($post_or_attachment_id);
        }

        if ($attachment_id === 0) {
            return null;
        }

        $copyright_text = self::getCopyrightText($attachment_id);

        if (!empty($copyright_text)) {
            Filters::pushCopyright($copyright_text, $attachment_id);
        }

        return $copyright_text;
    }

    /**
     * Retrieves the copyright text from an attachment's metadata.
     *
     * @param int $attachment_id The ID of the attachment.
     * @return string|null The copyright text or null if not found.
     */
    private static function getCopyrightText(int $attachment_id): ?string
    {
        $meta = wp_get_attachment_metadata($attachment_id);

        if (is_array($meta) && !empty($meta['image_meta'])) {
            $imeta = (array) $meta['image_meta'];
            if (!empty($imeta['copyright'])) {
                return trim((string) $imeta['copyright']);
            } elseif (!empty($imeta['credit'])) {
                return trim((string) $imeta['credit']);
            }
        }

        return null;
    }
}
