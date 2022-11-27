const backupPath = Deno.env.get("TEMP") + "\\extBackupData\\";
const backupData = JSON.parse(await Deno.readTextFile(backupPath + "backup.json"));

await WindowsAPI.installWingetCMD(backupData.apps.winget.join(" "));

if (backupData.apps.missing.length > 0) {
  for (const i of backupData.apps.missing) {
    console.log(i.name);
    console.log(" - Architecture: " + i.type);
    console.log(" - Version: " + i.ver);
    console.log(" - Developer: " + i.dev + "\n");
  }

  console.log("The backup assistant couldn't figure out the package IDs for these apps.")
  prompt("Press any key to continue, showing that you adknowledged the missing packages.");
}