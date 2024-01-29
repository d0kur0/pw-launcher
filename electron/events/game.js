const { ipcMain } = require("electron");
const { dialog } = require("electron");
const { spawn } = require("child_process");
const fs = require("fs/promises");
const path = require("path");

ipcMain.handle("game/selectPath", async () => {
	return await dialog.showOpenDialog({ properties: ["openFile"] });
});

ipcMain.on("game/start", async (event, { character, elementClient }) => {
	console.log(character, elementClient);

	const processCwd = path.dirname(elementClient);

	const script = `
$script:nativeMethods = @();
function Register-NativeMethod([string]$dll, [string]$methodSignature)
{
		$script:nativeMethods += [PSCustomObject]@{ Dll = $dll; Signature = $methodSignature; }
}

function Add-NativeMethods()
{
		$nativeMethodsCode = $script:nativeMethods | % { "
				[DllImport(\`"$($_.Dll)\`")]
				public static extern $($_.Signature);
		" }

		Add-Type @"
				using System;
				using System.Runtime.InteropServices;
				public static class NativeMethods {
						$nativeMethodsCode
				}
"@
}

Register-NativeMethod "user32.dll" "bool SetWindowText(IntPtr hWnd, string lpString)"
Add-NativeMethods

$myprocess = start-process -WorkingDirectory "${processCwd}" -FilePath "${elementClient}" -ArgumentList "startbypatcher user:${
		character.charLogin
	} pwd:${character.charPassword}${character.charName ? ` role:${character.charName}` : ""}" -PassThru
sleep 5

[NativeMethods]::SetWindowText($myprocess.MainWindowHandle, "${character.name}")`;

	const tmpPath = path.join(__dirname, Date.now() + ".ps1");

	await fs.writeFile(tmpPath, script, { encoding: "utf-8" });

	const child = spawn("powershell.exe", [tmpPath]);

	child.stdout.on("data", function (data) {
		console.log("Powershell Data: " + data);
	});

	child.stderr.on("data", function (data) {
		console.log("Powershell Errors: " + data);
	});

	child.on("exit", async () => await fs.unlink(tmpPath));

	child.stdin.end(); //end input
});
