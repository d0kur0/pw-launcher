import { action, atom, computed } from "nanostores";

const translations: Record<Languages, Record<string, string | number>> = {
	ru: {
		language: "Язык",
		backToList: "Назад к списку персонажей",
		addCharacter: "Добавить персонажа",
		gamePathMock: "Укажите путь к elementclient.exe",
		emptyMessage: "Список персонажей пуст",
		selectElementClient: "Выбрать путь к elementclient.exe",

		charName: "Название в лаунчере",
		charLogin: "Логин аккаунта",
		charIconPath: "Иконка персонажа",
		charRealName: "Ник персонажа (необязательно)",
		charPassword: "Пароль аккаунта",
		charDescription: "Описание (необязательно)",

		edit: "Редактировать",
		start: "Запустить",
		create: "Сохранить",
		remove: "Удалить",

		acceptRemove: "Точно удалить?",
		requireGamePath: "Сперва укажите путь к elementclient.exe",
	},
	en: {
		language: "Lang",
		backToList: "Back to characters list",
		addCharacter: "Add character",
		emptyMessage: "Characters list is empty",
		gamePathMock: "Please select elementclient.exe",
		selectElementClient: "Select path to elementclient.exe",

		charName: "Name at launcher",
		charLogin: "Account login",
		charIconPath: "Character icon",
		charRealName: "Character name at game (not required)",
		charPassword: "Account password",
		charDescription: "Description (not required)",

		edit: "edit",
		start: "Start",
		remove: "Remove",
		create: "Save!",

		acceptRemove: "Really remove it?",
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
	return { ...translations[lang] };
});

const toggleLanguage = action($language, "toggleLanguage", ($store) => {
	const lang = $store.get() === "en" ? "ru" : "en";
	$store.set(lang);
	localStorage.setItem("lang", lang);
});

export const $languageActions = { toggleLanguage };
