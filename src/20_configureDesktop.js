const backupPath = Deno.env.get("TEMP") + "\\extBackupData\\";
const backupData = JSON.parse(await Deno.readTextFile(backupPath + "backup.json"));

const homeDir = Deno.env.get("USERPROFILE");

const osIs11 = prompt("Which OS are you running? (10/11)") == "11";

let batchCmd = WindowsAPI.invokeUAC(`
${backupData.desktopInfo.taskbarBackupPath && !osIs11 ? `reg import "${backupPath + backupData.desktopInfo.taskbarBackupPath}"`: "rem ."}
${backupData.desktopInfo.advancedBackupPath ? `reg import "${backupPath + backupData.desktopInfo.advancedBackupPath}"`: "rem ."}
${backupData.desktopInfo.accentBackupPath ? `reg import "${backupPath + backupData.desktopInfo.accentBackupPath}"`: "rem ."}
${backupData.desktopInfo.colorsBackupPath ? `reg import "${backupPath + backupData.desktopInfo.colorsBackupPath}"`: "rem ."}
`);

await WindowsAPI.runBatch(batchCmd);
Console.info("Waiting for registry to finish deploying...");
await Deployinator.sleep(4000);

if (backupData.desktopInfo.wallpaperPath) {
  await Deno.copyFile(backupPath + backupData.desktopInfo.wallpaperPath, homeDir + backupData.desktopInfo.wallpaperPath);
  await WindowsAPI.runReg([
    { 
      key: "HKEY_CURRENT_USER\\Control Panel\\Desktop",
      value: "WallPaper",
      type: "REG_SZ",
      value: homeDir + backupData.desktopInfo.wallpaperPath 
    }
  ])
}