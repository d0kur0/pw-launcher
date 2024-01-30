import { Box, Button, IconButton, useColorMode } from "@hope-ui/solid";
import { VsChromeMinimize } from "solid-icons/vs";
import { CgMinimizeAlt } from "solid-icons/cg";
import { IoClose } from "solid-icons/io";
import { FiMaximize2, FiSun } from "solid-icons/fi";
import { createSignal } from "solid-js";
import { FaSolidMoon } from "solid-icons/fa";
import { RiDevelopmentBugFill } from "solid-icons/ri";
import { $language, $languageActions, $translations } from "../stores/language";
import { useStore } from "@nanostores/solid";
import { useNavigate } from "@solidjs/router";

const { ipcRenderer } = window.require("electron");

const parentStyles = {
	pl: 0,
	pr: 10,
	top: 0,
	lefT: 0,
	width: "100%",
	zIndex: "200",
	height: "var(--window-header-height)",
	display: "flex",
	position: "fixed",
	useSelect: "none",
	alignItems: "center",
	borderBottom: "1px solid $neutral6",
	backgroundColor: "$background",
};

const iconButtonStyles = {
	scale: "0.8",
	padding: "0",
	borderRadius: "50%",
};

export function WindowBar() {
	const language = useStore($language);
	const navigate = useNavigate();
	const translations = useStore($translations);

	const { colorMode, toggleColorMode } = useColorMode();

	const [isFullscreen, setIsFullscreen] = createSignal(false);
	const [isDevToolsOpened, setIsDevToolsOpened] = createSignal(false);

	const handleMinimize = () => {
		ipcRenderer.send("window/minimize");
	};

	const handleToggleFullScreen = () => {
		ipcRenderer.send("window/toggleFullscreen");
		setIsFullscreen((v) => !v);
	};

	const handleCloseWindow = () => {
		ipcRenderer.send("window/close");
	};

	const openDevTools = () => {
		setIsDevToolsOpened((v) => !v);
		ipcRenderer.send("debug/openTools");
	};

	return (
		<>
			<Box css={parentStyles}>
				<Button
					css={{ scale: "0.8", ml: "-3px", mr: "-6px" }}
					size="sm"
					variant="outline"
					onClick={() => navigate("/add-char")}
					aria-label="add character"
					colorScheme="primary"
				>
					{translations().addCharacter}
				</Button>

				<IconButton
					css={iconButtonStyles}
					icon={<RiDevelopmentBugFill />}
					size="sm"
					variant="dashed"
					onClick={openDevTools}
					aria-label="open dev tools"
					colorScheme={isDevToolsOpened() ? "warning" : undefined}
				/>

				<IconButton
					css={iconButtonStyles}
					icon={colorMode() === "dark" ? <FiSun /> : <FaSolidMoon />}
					size="sm"
					variant="dashed"
					onClick={toggleColorMode}
					aria-label="toggle theme"
				/>

				<Box css={{ "-webkit-app-region": "drag", flex: "1 1 0", height: "100%" }} />

				<Button
					css={{ scale: "0.8" }}
					size="sm"
					variant="outline"
					onClick={$languageActions.toggleLanguage}
					aria-label="reload"
					colorScheme="success"
				>
					{translations().language} - {language().toUpperCase()}
				</Button>

				<IconButton
					css={iconButtonStyles}
					size="xs"
					icon={<VsChromeMinimize />}
					onClick={handleMinimize}
					aria-label="minimize"
					colorScheme="success"
				/>

				<IconButton
					css={iconButtonStyles}
					size="xs"
					icon={isFullscreen() ? <CgMinimizeAlt /> : <FiMaximize2 />}
					onClick={handleToggleFullScreen}
					aria-label="toggle full screen"
					colorScheme="warning"
				/>

				<IconButton
					css={iconButtonStyles}
					size="xs"
					icon={<IoClose />}
					onClick={handleCloseWindow}
					aria-label="close window"
					colorScheme="danger"
				/>
			</Box>

			<Box css={{ height: "var(--window-header-height)" }} />
		</>
	);
}
