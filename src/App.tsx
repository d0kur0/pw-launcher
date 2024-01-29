import { NotificationsProvider, HopeProvider, Box, Heading, Anchor, Button } from "@hope-ui/solid";
import { ErrorBoundary } from "solid-js";
import "./App.css";
import { ViewPort } from "./components/ViewPort";
import { WindowBar } from "./components/WindowBar";

import { Characters } from "./components/Characters";
import { Route, Routes } from "@solidjs/router";
import { AddCharacter } from "./components/AddCharacter";

function ErrorScreen(props: { err: Error }) {
	return (
		<Box css={{ p: 16, px: 42 }}>
			<Heading css={{ fontSize: "2rem" }}>Какая-то ошибка</Heading>

			<Box css={{ mt: 24 }}>
				Какая-то рантайм ошибка, скорее всего потому, что разработчик сделал что-то хуево. <br />
				Если возникает часто и хочется фикса, можно создать ишью{" "}
				<Anchor css={{ color: "$accent10" }} external href="https://github.com/d0kur0/webm-desktop/issues">
					гитхабе
				</Anchor>{" "}
				программы.
			</Box>

			<Button onClick={location.reload} css={{ mt: 24 }} colorScheme="warning">
				Перезагрузить страницу
			</Button>

			<Heading css={{ fontSize: "1.5rem", mt: 24 }}>Отладочная инфа</Heading>

			<Box css={{ mt: 19, backgroundColor: "$neutral5", p: 15, borderRadius: 15 }}>
				<Box>{props.err?.name}</Box>
				<Box>{props.err?.cause as never}</Box>
				<Box>{props.err?.message}</Box>
				<Box>{props.err?.stack}</Box>
			</Box>
		</Box>
	);
}

export function App() {
	return (
		<HopeProvider config={{ initialColorMode: "system" }}>
			<NotificationsProvider placement="bottom">
				<WindowBar />

				<ErrorBoundary fallback={(err) => <ErrorScreen err={err} />}>
					<ViewPort>
						<Routes>
							<Route path="/" component={Characters} />
							<Route path="/add-char" component={AddCharacter} />
						</Routes>
					</ViewPort>
				</ErrorBoundary>
			</NotificationsProvider>
		</HopeProvider>
	);
}
