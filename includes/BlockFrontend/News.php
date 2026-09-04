<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

defined('ABSPATH') || exit;

use RRZE\ElementsBlocks\SpriteGenerator;

/**
 * Server-side renderer for the News block.
 */
class News extends AbstractBlockRender
{
    /**
     * Renders the News block.
     *
     * This renderer is based on the legacy RRZE Elements custom-news output,
     * but lives with the block and can evolve independently of the shortcode.
     *
     * @param array<string, mixed> $attributes Block attributes.
     */
    public function render(array $attributes = [], string $content = '', ?\WP_Block $block = null): string {
        $atts = $attributes;
        $idAttribute = $attributes['id'] ?? '';
        if (is_array($idAttribute)) {
            $atts['id'] = '';
        }
        $sc_atts = shortcode_atts([
            'category' => '',
            'tag' => '',
            'number' => '10',
            'days' => '',
            'id' => '',
            'hide' => '',
            'display' => '',
            'imgfloat' => 'left',
            'title' => '',
            'has_thumbnail' => 'false',
            'columns' => '',
            'type' => '',
            'year' => '',
            'month' => '',
            'day' => '',
            // aus FAU-Einrichtungen
            'cat'	=> '',
            'num'	=> '',
            'divclass'	=> '',
            'hidemeta'	=> 'false',
            'hstart'	=> 2,
            'hideduplicates'	=> 'false',
            'hide_duplicates'	=> 'false',
            'fau_settings'  => 'false',
            'forcelandscape' => 'false',
            'force_landscape' => 'false',
            'sticky_only' => 'false',
            'teaser_length' => '55',
            'showFallbackImage' => 'true',
        ], $atts);
        $sc_atts = array_map(
            static fn($value): string => sanitize_text_field((string) $value),
            $sc_atts
        );

        $cat = ($sc_atts['cat'] != '') ? $sc_atts['cat'] : $sc_atts['category'];
        $tag = $sc_atts['tag'];
        $num = ($sc_atts['num'] != '') ? intval($sc_atts['num']) : intval($sc_atts['number']);
        $days = intval($sc_atts['days']);
        $hide = array_map('trim', explode(",", $sc_atts['hide']));
        $display = ($sc_atts['display'] == 'list' || $sc_atts['display'] == 'table') ? $sc_atts['display'] : '';
        $imgfloat = ($sc_atts['imgfloat'] == 'right') ? 'float-right' : 'float-left';
        $hstart = intval($sc_atts['hstart']);
        $divclass = esc_attr($sc_atts['divclass']);
        $hideMeta = $this->toBoolean($sc_atts['hidemeta']);
        $title = esc_attr($sc_atts['title']);
        $hasThumbnail = $this->toBoolean($sc_atts['has_thumbnail']);
        $columns = absint($sc_atts['columns']);
        $type = esc_attr($sc_atts['type']);
        $mode = array_map('trim', explode(",", $type));
        $thumbnailSize = 'large';
        $hideDuplicates = !empty($sc_atts['hideduplicates']) ? $sc_atts['hideduplicates'] : $sc_atts['hide_duplicates'];
        $hideDuplicates = $this->toBoolean($hideDuplicates);
        $forceLandscape = !empty($sc_atts['forcelandscape']) ? $sc_atts['forcelandscape'] : $sc_atts['force_landscape'];
        $forceLandscape = $this->toBoolean($forceLandscape);
        $stickyOnly = $this->toBoolean($sc_atts['sticky_only']);
        $teaserLength = absint($sc_atts['teaser_length']);
        $showFallbackImage = $this->toBoolean($sc_atts['showFallbackImage']);

        $borderTop = '';
        if ($this->toBoolean($sc_atts['fau_settings'])) {
            array_push($mode, 'img_first','ili_mode','show_more');
            $hideMeta = true;
            $borderTop = '1px solid #036';
        }

        $postCols = [];
        if ($columns > 0) {
            $scColumnsOpen = '<div class="rrze-elements elements-columns cols-' . $columns . '">';
            $scColumnsClose = '</div>';
        } else {
            $scColumnsOpen = '';
            $scColumnsClose = '';
            foreach ($mode as $v) {
                if (substr($v,0, 5) == 'cols_') {
                    $colsPart = explode('_', $v);
                    $tmpPostCols = explode('-', $colsPart[1]);
                    if (count($tmpPostCols) < 2) {
                        continue;
                    }
                    $postCols['left'] = $tmpPostCols[0];
                    $postCols['right'] = $tmpPostCols[1];
                    $divclass .= ' post-cols';
                }
            }
        }

        if (in_array('ili_mode', $mode)) {
            $divclass .= ' ili-tpl';
        }
        if ($borderTop != '') {
            $divclass .= ' border-top';
        }

        $imgFirst = (in_array('img_first', $mode)) ? true : false;

        if (is_array($idAttribute)) {
            $id = array_values(array_filter(array_map('absint', $idAttribute)));
        } elseif ($sc_atts['id'] !== '') {
            $id = array_values(array_filter(array_map(
                static fn(string $postId): int => absint(trim($postId)),
                explode(',', $sc_atts['id'])
            )));
        } else {
            $id = [];
        }

        $args = [
            'post_type' => 'post',
            'post_status' => 'publish',
            'orderby' => 'date',
            'posts_per_page' => $num,
            'ignore_sticky_posts' => 1
        ];
        if ($stickyOnly === true) {
            $args['post__in'] = get_option( 'sticky_posts' );
        }

        $c_id = [];
        $categories = [];
        if ($cat != '') {
            $categories = array_map('trim', explode(",", $cat));
            foreach ($categories as $_c) {
                $cat_obj = get_category_by_slug($_c);
                if (!$cat_obj instanceof \WP_Term) {
                    // if slug not found -> try with cat name
                    $cat_id = get_cat_ID($_c);
                } else {
                    $cat_id = $cat_obj->term_id;
                }
                $c_id[] = (int) $cat_id;
            }
            $args['cat'] = implode(',', $c_id);
        }

        $t_id = [];
        $tags = [];
        if ($tag != '') {
            $tags = array_map('trim', explode(",", $tag));
            foreach ($tags as $_t) {
                if ($term = get_term_by('name', $_t, 'post_tag')) {
                    $t_id[] = $term->term_id;
                }
            }
            $args['tag__in'] = implode(',', $t_id);
        }

        if ($posts_per_page = absint($num)) {
            $args['posts_per_page'] = $posts_per_page;
        }

        if (absint($days)) {
            $now = current_time('timestamp');
            $timestamp = strtotime('-' . $days . ' days', $now);
            if ($timestamp) {
                $startdate = date('Y-m-d', $timestamp);
                $date_elements = explode('-', $startdate);
                $date_query = [
                    'after' => [
                        'year' => $date_elements[0],
                        'month' => $date_elements[1],
                        'day' => $date_elements[2],
                    ],
                ];
                $args['date_query'] = $date_query;
            }
        }

        if(absint($sc_atts['year'])) {
        	$date_query['year'] = $sc_atts['year'];
        	if(absint($sc_atts['month'])) {
	        	$date_query['month'] = $sc_atts['month'];
                if(absint($sc_atts['day'])) {
                    $date_query['day'] = $sc_atts['day'];
                }
            }
        	$args['date_query'] = $date_query;
        }

        if (!empty($id)) {
            $args['post__in'] = $id;
        }

        if($hideDuplicates && isset($GLOBALS['a_rrze_elements_displayed_posts']) && is_array($GLOBALS['a_rrze_elements_displayed_posts'])) {
        	$args['post__not_in'] = array_unique($GLOBALS['a_rrze_elements_displayed_posts']);
        }

        if ($hasThumbnail) {
            $args['meta_query'] = [
                [
                    'key'     => '_thumbnail_id',
                    'value'   => '',
                    'compare' => '!=',
                ]
            ];
        }

        $hide_date = in_array('date', $hide);
        if ($hideMeta) {
            $hide[] = 'category';
            $hide[] = 'date';
        }

        $titleText = '';
        $titleHtml = '';
        switch ($title) {
            case 'category':
                if ($cat != '') {
                    $catNames = [];
                    foreach ($categories as $category) {
                        if ($catObj = get_term_by('slug', $category, 'category')) {
                            $catNames[] = $catObj->name;
                        }
                    }
                    $titleText = implode(' | ', $catNames);
                }
                break;
            case 'tag':
                if ($tag != '') {
                    $tagNames = [];
                    foreach ($tags as $onetag) {
                        if ($tagObj = get_term_by('name', $onetag, 'post_tag')) {
                            $tagNames[] = $tagObj->name;
                        }
                    }
                    $titleText = implode(' | ', $tagNames);
                }
                break;
            case '':
                break;
            default:
                $titleText = $title;
                break;
        }

        if ($titleText != '') {
            $titleHtml = '<h'.$hstart.' class="section-title">'.$titleText.'</h'.$hstart.'>';
            $hstart++;
        }

        $moreLink = '';
        if (in_array('show_more', $mode)) {
            if ($c_id !== []) {
                $moreLink = $this->renderMoreLink(get_category_link($c_id[0]), $cat);
            } elseif ($t_id !== []) {
                $moreLink = $this->renderMoreLink(get_tag_link($t_id[0]), $tag);
            }
        }

        $output = '';

        $wp_query = new \WP_Query($args);

        if ($wp_query->have_posts()) {

            if ($display == 'list' || $display == 'table') {
                $output .= $titleHtml . '<ul class="rrze-elements-news' . ($display == 'table' ? ' news-table' : '') . '">';
            } else {
                $output .= '<section class="rrze-elements-news blogroll ' . $divclass . '">' . $titleHtml . $moreLink . $scColumnsOpen;
            }

            while ($wp_query->have_posts()) {
                $wp_query->the_post();
                $id = absint(get_the_ID());
                $title = get_the_title();
                $permalink = get_permalink();
                $externalLink = get_post_meta($id, 'external_link', true);
                if (filter_var($externalLink, FILTER_VALIDATE_URL) !== false) {
                    $permalink = $externalLink;
                }
                $GLOBALS['a_rrze_elements_displayed_posts'][] = $id;
                $args = [];

                if ($display == 'list' || $display == 'table') {
                    $output .= '<li>';
                    if (! $hide_date) {
                        $output .= '<span class="news-date">' . get_the_date('d.m.Y', $id) . ': </span>';
                    }
                    $output .= '<a href="' . $permalink . '" rel="bookmark" class="news-title">' . $title . '</a>';
                    $output .= '</li>';
	            } else {
                    if ($columns > 0) {
                        if ($columns <= 3 || $wp_query->post_count <= 3) {
                            $thumbnailSize = 'large';
                        }
                        $args = [
                            'id' => $id,
                            'hide' => $hide,
                            'hstart' => $hstart,
                            'imgfloat' => $imgfloat,
                            'imgFirst' => $imgFirst,
                            'postCols' => $postCols,
                            'thumbnailSize' => $thumbnailSize,
                            'forceLandscape' => $forceLandscape,
                            'showContent' => (in_array('show_content', $mode) ? true : false),
                            'teaserLength' => $teaserLength,
                            'showFallbackImage' => $showFallbackImage,
                        ];
                        $output .= '<div class="column colspan-1" style="">'
                            . $this->display_news_teaser($args)
                            . '</div>';
                    } elseif (!empty($postCols)) {
                        if ((float) array_sum($postCols) / max(1, (int) $postCols['left']) > .3) {
                            $thumbnailSize = 'large';
                        }
                        $args = [
                            'id' => $id,
                            'hide' => $hide,
                            'hstart' => $hstart,
                            'imgfloat' => $imgfloat,
                            'imgFirst' => $imgFirst,
                            'postCols' => $postCols,
                            'thumbnailSize' => $thumbnailSize,
                            'forceLandscape' => $forceLandscape,
                            'showContent' => (in_array('show_content', $mode) ? true : false),
                            'teaserLength' => $teaserLength,
                            'showFallbackImage' => $showFallbackImage,
                        ];
                        $output .= do_shortcode($this->display_news_teaser($args));
                    } else {
                        $args = [
                            'id' => $id,
                            'hide' => $hide,
                            'hstart' => $hstart,
                            'imgfloat' => $imgfloat,
                            'imgFirst' => $imgFirst,
                            'postCols' => $postCols,
                            'forceLandscape' => $forceLandscape,
                            'showContent' => in_array('show_content', $mode, true),
                            'teaserLength' => $teaserLength,
                            'showFallbackImage' => $showFallbackImage,
                        ];
                        $output .= $this->display_news_teaser($args);
                    }
                }
            }

            if ($display == 'list' || $display == 'table') {
                $output .= '</ul>';
            } else {
                $output .= $scColumnsClose . '</section>';
            }

            wp_reset_postdata();
        } else {
            $output = '<p>' . __('No posts found.', 'rrze-elements-blocks') . '</p>';
        }

        wp_reset_postdata();
        return do_shortcode($output);
    }

    /**
     * @param array<string, mixed> $argsRaw
     */
    private function display_news_teaser(array $argsRaw): string
    {
        $id = absint($argsRaw['id'] ?? 0);
        if ($id === 0) {
            return '';
        }

        $hide = is_array($argsRaw['hide'] ?? null)
            ? array_map('strval', $argsRaw['hide'])
            : [];
        $hstart = max(1, min(6, absint($argsRaw['hstart'] ?? 2)));
        $imgfloat = ($argsRaw['imgfloat'] ?? '') === 'float-right' ? 'float-right' : 'float-left';
        $imgFirst = (bool) ($argsRaw['imgFirst'] ?? false);
        $postCols = is_array($argsRaw['postCols'] ?? null) ? $argsRaw['postCols'] : [];
        $thumbnailSize = sanitize_key((string) ($argsRaw['thumbnailSize'] ?? 'large'));
        $forceLandscape = (bool) ($argsRaw['forceLandscape'] ?? false);
        $teaserLength = absint($argsRaw['teaserLength'] ?? 20);
        $showFallbackImage = (bool) ($argsRaw['showFallbackImage'] ?? true);
        $showContent = (bool) ($argsRaw['showContent'] ?? false);
        $hideDate = in_array('date', $hide, true);
        $hideCategory = in_array('category', $hide, true);
        $hideThumbnail = in_array('thumbnail', $hide, true);
        $columns = isset($postCols['left'], $postCols['right']);
        $leftSpan = $columns ? max(1, min(3, absint($postCols['left']))) : 1;
        $rightSpan = $columns ? max(1, min(3, absint($postCols['right']))) : 1;
        $numCols = $leftSpan + $rightSpan;

        if ($columns) {
            $imgFirst = true;
        }

        $permalink = (string) get_permalink($id);
        $externalLink = get_post_meta($id, 'external_link', true);
        if (is_string($externalLink) && filter_var($externalLink, FILTER_VALIDATE_URL) !== false) {
            $permalink = $externalLink;
        }

        $image = $hideThumbnail
            ? null
            : $this->getTeaserImage($id, $thumbnailSize, $showFallbackImage);
        $ratioClass = $image && !$forceLandscape && $image['height'] > $image['width']
            ? 'ratio-portrait'
            : 'ratio-landscape';
        $ariaLabelId = 'aria-' . $id . '-' . random_int(10000, 30000);
        $schemaPublisher = $this->getSchemaPublisher();
        $postClasses = implode(' ', array_map('sanitize_html_class', get_post_class('', $id)));

        $output = '<article id="post-' . $id . '" class="news-item clear clearfix '
            . esc_attr($postClasses) . ' cf" aria-labelledby="' . esc_attr($ariaLabelId)
            . '" itemscope itemtype="http://schema.org/NewsArticle">';

        if ($columns) {
            $output .= '<div class="rrze-elements elements-columns cols-' . $numCols . '">'
                . '<div class="column colspan-' . $leftSpan . '" style="">';
        }

        if ($image && $imgFirst) {
            $output .= $this->renderTeaserImage($image, $ratioClass, $imgfloat, $permalink, true);
        }

        if ($columns) {
            $output .= '</div><div class="column colspan-' . $rightSpan . '" style="">';
        }

        $output .= '<header class="entry-header"><h' . $hstart . ' class="entry-title" id="'
            . esc_attr($ariaLabelId) . '" itemprop="headline"><a href="' . esc_url($permalink)
            . '" rel="bookmark" itemprop="url">' . esc_html(get_the_title($id)) . '</a></h'
            . $hstart . '></header>';
        $output .= '<div class="entry-meta">' . $schemaPublisher;
        $output .= '<div itemprop="author" itemscope itemtype="https://schema.org/Person">'
            . '<meta itemprop="name" content="' . esc_attr(get_the_author()) . '"/></div>';

        if (!$hideDate) {
            $output .= '<div class="entry-date" itemprop="datePublished" content="'
                . esc_attr((string) get_the_date('Y-m-d', $id)) . '">'
                . SpriteGenerator::svgUse('symbols calendar_month', 'news-meta-icon')
                . esc_html((string) get_the_date((string) get_option('date_format'), $id)) . '</div>';
        } else {
            $output .= '<div><meta itemprop="datePublished" content="'
                . esc_attr((string) get_the_date('Y-m-d', $id)) . '"></div>';
        }

        if (!$hideCategory) {
            $categoryLinks = [];
            foreach (get_the_category($id) as $category) {
                $categoryLinks[] = '<a href="' . esc_url(get_category_link($category->term_id))
                    . '" aria-label="' . esc_attr(sprintf(
                        __('View all posts in %s', 'rrze-elements-blocks'),
                        $category->name
                    )) . '">' . esc_html($category->name) . '</a>';
            }
            if ($categoryLinks !== []) {
                $output .= '<div class="entry-cats">'
                    . SpriteGenerator::svgUse('symbols sell', 'news-meta-icon')
                    . '<span>' . implode(' / ', $categoryLinks) . '</span></div>';
            }
        }
        $output .= '</div>';

        if ($image && !$imgFirst) {
            $output .= $this->renderTeaserImage($image, $ratioClass, $imgfloat, $permalink, false);
        }

        if (!in_array('teaser', $hide, true)) {
            $abstract = $this->getTeaserText($id, $permalink, $showContent, $teaserLength);
            $output .= '<div class="entry-content" itemprop="description">' . $abstract . '</div>';
        }

        if ($columns) {
            $output .= '</div></div>';
        }

        return do_shortcode($output . '</article>');
    }

    /**
     * @param array{html: string, url: string, width: int, height: int} $image
     */
    private function renderTeaserImage(
        array $image,
        string $ratioClass,
        string $imgfloat,
        string $permalink,
        bool $linked
    ): string {
        $output = '<div class="entry-thumbnail ' . esc_attr($ratioClass . ' ' . $imgfloat) . '"';
        if ($linked) {
            $output .= ' aria-hidden="true" role="presentation"';
        }
        $output .= '><meta itemprop="image" content="' . esc_url($image['url']) . '">';
        if ($linked) {
            $output .= '<a href="' . esc_url($permalink) . '" tabindex="-1">';
        }
        $output .= $image['html'];
        if ($linked) {
            $output .= '</a>';
        }

        return $output . '</div>';
    }

    /** @param string|\WP_Error $url */
    private function renderMoreLink($url, string $context): string
    {
        if (is_wp_error($url)) {
            return '';
        }

        $label = __('More news', 'rrze-elements-blocks');

        return '<div class="more-posts"><a class="standard-btn xsmall-btn primary-btn" href="'
            . esc_url($url) . '" aria-label="' . esc_attr($label . ': ' . $context) . '">'
            . esc_html($label)
            . SpriteGenerator::svgUse('symbols arrow_forward', 'news-link-icon')
            . '</a></div>';
    }

    private function getSchemaPublisher(): string
    {
        if (function_exists('fau_create_schema_publisher')) {
            return (string) fau_create_schema_publisher();
        }

        $customLogoId = absint(get_theme_mod('custom_logo', 0));
        $logo = $customLogoId ? wp_get_attachment_image_url($customLogoId, 'full') : false;

        return '<div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">'
            . '<meta itemprop="name" content="' . esc_attr(get_bloginfo('name')) . '"/>'
            . '<meta itemprop="logo" content="' . esc_url($logo ?: '') . '"/></div>';
    }

    private function getTeaserText(int $postId, string $permalink, bool $showContent, int $teaserLength): string
    {
        if ($showContent) {
            return (string) get_the_content(null, false, $postId);
        }

        $abstract = get_post_meta($postId, 'abstract', true);
        $abstract = is_string($abstract) ? $abstract : '';
        if (strlen(trim($abstract)) >= 3) {
            return $abstract . $this->renderReadMoreLink($permalink, (string) get_the_title($postId));
        }

        if (function_exists('fau_custom_excerpt')) {
            $abstract = (string) fau_custom_excerpt(
                $postId,
                get_theme_mod('default_anleser_excerpt_length'),
                false,
                '',
                true,
                get_theme_mod('search_display_excerpt_morestring')
            );
            return $abstract . $this->renderReadMoreLink($permalink, (string) get_the_title($postId));
        }

        $excerptMore = (string) apply_filters('excerpt_more', '&hellip;');

        return wp_trim_words(get_the_excerpt($postId), $teaserLength, $excerptMore)
            . $this->renderReadMoreLink($permalink, (string) get_the_title($postId));
    }

    private function renderReadMoreLink(string $permalink, string $postTitle): string
    {
        $label = __('Read more', 'rrze-elements-blocks');

        return '<a class="read-more-link" href="' . esc_url($permalink) . '" aria-label="'
            . esc_attr(sprintf(__('Read more about %s', 'rrze-elements-blocks'), $postTitle)) . '">'
            . esc_html($label)
            . SpriteGenerator::svgUse('symbols arrow_forward', 'news-link-icon')
            . '</a>';
    }

    /**
     * Accepts Gutenberg booleans as well as legacy shortcode truthy strings.
     *
     * @param mixed $value
     */
    private function toBoolean($value): bool
    {
        return in_array($value, [true, 1, '1', 'true', 'yes', 'ja', 'on'], true);
    }

    /**
     * Returns the featured image or the active theme's post fallback image.
     *
     * @return array{html: string, url: string, width: int, height: int}|null
     */
    private function getTeaserImage(int $postId, string $size, bool $showFallbackImage): ?array
    {
        $thumbnailId = get_post_thumbnail_id($postId);
        if ($thumbnailId) {
            $imageData = wp_get_attachment_image_src($thumbnailId, $size);
            if ($imageData) {
                return [
                    'html' => get_the_post_thumbnail($postId, $size),
                    'url' => (string) $imageData[0],
                    'width' => (int) $imageData[1],
                    'height' => (int) $imageData[2],
                ];
            }
        }

        if (!$showFallbackImage) {
            return null;
        }

        $title = (string) get_the_title($postId);

        // FAU-Elemental supplies both a responsive attachment helper and a URL
        // helper whose last resort is the bundled theme fallback image.
        if (function_exists('faue_get_post_fallback_image')) {
            $url = (string) faue_get_post_fallback_image($postId, $size);
            $html = '';
            if (function_exists('faue_get_post_fallback_image_html')) {
                $html = (string) faue_get_post_fallback_image_html(
                    $postId,
                    $title,
                    $size,
                    ['class' => 'attachment-' . sanitize_html_class($size), 'loading' => 'lazy']
                );
            }

            if ($url !== '') {
                $fallbackId = attachment_url_to_postid($url);
                $imageData = $fallbackId ? wp_get_attachment_image_src($fallbackId, $size) : false;

                return [
                    'html' => $html !== '' ? $html : sprintf(
                        '<img src="%s" alt="%s" loading="lazy">',
                        esc_url($url),
                        esc_attr($title)
                    ),
                    'url' => $url,
                    'width' => $imageData ? (int) $imageData[1] : 480,
                    'height' => $imageData ? (int) $imageData[2] : 320,
                ];
            }
        }

        // Classic FAU themes store the selected post fallback as an attachment ID.
        $fallbackId = absint(get_theme_mod('default_postthumb_image', 0));
        if ($fallbackId) {
            $imageData = wp_get_attachment_image_src($fallbackId, $size);
            if ($imageData) {
                return [
                    'html' => wp_get_attachment_image($fallbackId, $size, false, [
                        'alt' => $title,
                        'loading' => 'lazy',
                    ]),
                    'url' => (string) $imageData[0],
                    'width' => (int) $imageData[1],
                    'height' => (int) $imageData[2],
                ];
            }
        }

        return null;
    }
}
