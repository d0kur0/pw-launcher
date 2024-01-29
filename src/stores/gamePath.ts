import { atom } from "nanostores";
const { ipcRenderer } = window.require("electron");

export const $gamePath = atom<string | null>(localStorage.getItem("elementClientPath"));

const selectGamePath = async () => {
	const {
		canceled,
		filePaths: [elementClientPath],
	} = await ipcRenderer.invoke("game/selectPath");

	if (canceled) return;

	$gamePath.set(elementClientPath);
	localStorage.setItem("elementClientPath", elementClientPath);
};

export const $gamePathActions = { selectGamePath };
