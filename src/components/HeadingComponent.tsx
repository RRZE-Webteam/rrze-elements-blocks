import type { ReactNode } from "react";

type HeadingComponentProps = {
	level: number;
	children: ReactNode;
	[key: string]: any; // This allows for any additional properties like `className`.
};

const HeadingComponent = ({
	level,
	children,
	...props
}: HeadingComponentProps) => {
	switch (level) {
		case 3:
			return <h3 {...props}>{children}</h3>;
		case 4:
			return <h4 {...props}>{children}</h4>;
		case 5:
			return <h5 {...props}>{children}</h5>;
		case 6:
			return <h6 {...props}>{children}</h6>;
		case 7:
			return <h6 {...props}>{children}</h6>;
		default:
			return <h2 {...props}>{children}</h2>;
	}
};

export default HeadingComponent;
