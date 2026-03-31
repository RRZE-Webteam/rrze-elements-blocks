import { ProgressBar } from "@wordpress/components";
import type { CSSProperties } from 'react';
import { __ } from "@wordpress/i18n";

interface ProgressBarProps {
    value: number;
    maxValue: number;
    style?: CSSProperties;
}

export const CharacterCountProgressBar = ({ value, maxValue, style }: ProgressBarProps) => {
    const progressValue = Math.min((value / maxValue) * 100, 100);

    let progressClass = "progress-low";
    if (progressValue > 85) {
        progressClass = "progress-high";
    } else if (progressValue > 75) {
        progressClass = "progress-medium";
    }

    return (
        <>
            <ProgressBar
                value={progressValue}
                className={progressClass}
            />
            <span className={"progress-limit-desc"} style={style}>{value} / {maxValue} {__("Characters", "rrze-elements-blocks")}</span>
            <br/>
        </>
    );
}
