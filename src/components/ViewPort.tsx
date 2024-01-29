import { Box } from "@hope-ui/solid";
import { JSXElement } from "solid-js";

export function ViewPort(props: { children: JSXElement }) {
	return (
		<Box
			css={{
				p: 12,
				pt: 16,
				height: "var(--viewport-height)",
				position: "relative",
				overflowY: "auto",
			}}
		>
			{props.children}
		</Box>
	);
}
