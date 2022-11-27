const backupPath = Deno.env.get("TEMP") + "\\extBackupData\\";
const backupData = JSON.parse(await Deno.readTextFile(backupPath + "backup.json"));

const homeDir = Deno.env.get("USERPROFILE");

async function copyDir(src, dest) {
  await WindowsAPI.runBatch(`@echo off
  cd "${src}"
  robocopy . "${dest}" /E /DCOPY:DAT /R:10 /W:3`);
}

for (const file of backupData.copyData.files) {
  await Deno.copyFile(backupPath + file.from, file.to.replace("$user", homeDir));
}

for (const directory of backupData.copyData.folders) {
  await copyDir(backupPath + directory.from, directory.to.replace("$user", homeDir));
}