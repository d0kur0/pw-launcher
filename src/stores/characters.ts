import { action, map } from "nanostores";
import { $gamePath } from "./gamePath";
import { notificationService } from "@hope-ui/solid";
import { $translations } from "./language";

const { ipcRenderer } = window.require("electron");

export type Character = {
	name: string;
	iconPath?: string;
	description?: string;

	charName?: string;
	charLogin: string;
	charPassword: string;
};

export const $characters = map<Character[]>(
	localStorage.chars === undefined ? [] : JSON.parse(localStorage.chars),
);

const create = action($characters, "create", ($store, charInfo: Character) => {
	const newList = [charInfo, ...$store.get()];
	localStorage.setItem("chars", JSON.stringify(newList));
	$store.set(newList);
});

const remove = action($characters, "remove", ($store, id: number) => {
	if (!confirm($translations.get().acceptRemove.toString())) return;
	const newList = $store.get().filter((_, _id) => id !== _id);
	localStorage.setItem("chars", JSON.stringify(newList));
	$store.set(newList);
});

const start = action($characters, "start", async ($store, id: number) => {
	const character = $store.get().find((_, _id) => _id === id);
	const elementClient = $gamePath.get();

	if (!character) return;
	if (!elementClient) {
		return notificationService.show({
			title: $translations.get().requireGamePath.toString(),
		});
	}

	const result = await ipcRenderer.invoke("game/start", { character, elementClient: $gamePath.get() });
	console.log(result);
});

export const $characterActions = { create, remove, start };
