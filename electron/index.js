const { app, BrowserWindow, session, shell } = require("electron");
const path = require("path");
const fs = require("fs/promises");

if (require("electron-squirrel-startup")) {
	app.quit();
}

if (process.platform === "win32") app.setAppUserModelId(app.getName());

fs.readdir(path.join(__dirname, "events")).then((files) => {
	try {
		files.map((file) => require(path.join(__dirname, `events/${file}`)));
	} catch (e) {
		console.error(e);
	}
});

const isDev = process.env.NODE_ENV === "development";

const createWindow = () => {
	app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

	const mainWindow = new BrowserWindow({
		icon: "../icons/icon.png",
		frame: false,
		width: 400,
		height: 690,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true,
			contextIsolation: false,
		},
		resizable: false,
	});

	isDev && mainWindow.loadURL("http://localhost:3000");
	isDev || mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
