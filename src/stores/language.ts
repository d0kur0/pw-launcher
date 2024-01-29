import { action, atom, computed } from "nanostores";

const translations: Record<Languages, Record<string, string | number>> = {
	ru: {
		addCharacter: "Добавить персонажа",
		selectElementClient: "Выбрать путь к elementclient.exe",
		gamePathMock: "Укажите путь к elementclient.exe",
		emptyMessage: "Список персонажей пуст",
		language: "Язык",
		backToList: "Назад к списку персонажей",

		charName: "Название в лаунчере",
		charIconPath: "Иконка персонажа",
		charDescription: "Описание (необязательно)",
		charRealName: "Ник персонажа (необязательно)",
		charLogin: "Логин аккаунта",
		charPassword: "Пароль аккаунта",

		create: "Создать",

		start: "Запустить",
		remove: "Удалить",

		requireGamePath: "Сперва укажите путь к elementclient.exe",
	},
	en: {
		addCharacter: "Add character",
		selectElementClient: "Select path to elementclient.exe",
		emptyMessage: "Characters list is empty",
		gamePathMock: "Please select elementclient.exe",
		language: "Lang",
		backToList: "Back to characters list",

		charName: "Name at launcher",
		charIconPath: "Character icon",
		charDescription: "Description (not required)",
		charRealName: "Character name at game (not required)",
		charLogin: "Account login",
		charPassword: "Account password",

		create: "Create",

		start: "Start",
		remove: "Remove",

		requireGamePath: "Previosly setup elementclient path",
	},
};

export type Languages = "ru" | "en";

export const $language = atom<Languages>(
	localStorage.lang === undefined
		? ["ru", "en"].includes(navigator.language)
			? navigator.language
			: "ru"
		: localStorage.lang,
);
export const $translations = computed([$language], (lang) => {
	console.log(translations[lang], lang);
	return { ...translations[lang] };
});

const toggleLanguage = action($language, "toggleLanguage", ($store) => {
	const lang = $store.get() === "en" ? "ru" : "en";
	$store.set(lang);
	localStorage.setItem("lang", lang);
});

export const $languageActions = { toggleLanguage };
