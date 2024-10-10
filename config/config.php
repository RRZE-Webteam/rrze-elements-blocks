<?php

namespace RRZE\ElementsBlocks\Config;

defined('ABSPATH') || exit;

/*-----------------------------------------------------------------------------------*/
/* Calculate Contrast Color
/*-----------------------------------------------------------------------------------*/
function calculateContrastColor( $color ) {
    $color = str_replace( '#', '', $color );
    if (strlen($color) == 3) {
        $chars = str_split($color);
        $color = $chars[0] . $chars[0] . $chars[1] . $chars[1] . $chars[2] . $chars[2];
    }
    $r = hexdec( substr( $color, 0, 2 ) );
    $g = hexdec( substr( $color, 2, 2 ) );
    $b = hexdec( substr( $color, 4, 2 ) );
    $r2 = hexdec( 'ff' );
    $g2 = hexdec( 'ff' );
    $b2 = hexdec( 'ff' );

    $L1 = 0.2126 * pow($r/255, 2.2) +
        0.7152 * pow($g/255, 2.2) +
        0.0722 * pow($b/255, 2.2);
    $L2 = 0.2126 * pow($r2/255, 2.2) +
        0.7152 * pow($g2/255, 2.2) +
        0.0722 * pow($b2/255, 2.2);
    if ($L1 > $L2){
        $d = ($L1+0.05) / ($L2+0.05);
    } else {
        $d = ($L2+0.05) / ($L1+0.05);
    }
    return ($d > 4.5 ? '#ffffff' : '#000000');
}