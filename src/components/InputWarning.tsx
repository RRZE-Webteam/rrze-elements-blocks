import { __ } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';

/**
 * Props for InputWarning component.
 * 
 * @param warning - The warning message to display.
 * @param min - The minimum threshold for the count to start displaying the warning.
 * @param max - The maximum threshold for the count, after which the warning will not be displayed. If null, there's no upper limit.
 * @param count - The current count of items.
 * @param status - The status of the notice which can be "info", "warning", or "error".
 * @param className - The CSS class name to apply to the notice for styling.
 */
interface InputWarningProps {
    warning: string;
    min: number;
    max: number | null;
    count: number;
    status: "info" | "warning" | "error";
    className: string;
}

const InputWarning: React.FC<InputWarningProps> = ({ warning, min, max, count, status, className }) => {
    const shouldDisplay = (max === null) ? (count >= min) : (count >= min && count < max);

    return shouldDisplay ? (
        <Notice
            status={status}
            isDismissible={false}
            className={className}
        >
            {__(warning, "rrze-elements-blocks")}
        </Notice>
    ) : null;
};

export default InputWarning;