const backupLocation = prompt("Where is your backup located?");
const backupPath = Deno.env.get("TEMP") + "\\extBackupData\\";

try {
  await Deno.remove(backupPath, { recursive: true });
} catch (e) {
  if (!(e instanceof Deno.errors.NotFound)) throw e;
}

await Deno.mkdir(backupPath);

try {
  await Deno.copyFile(backupLocation, backupPath + "backup.zip");
} catch (e) {
  if (!(e instanceof Deno.errors.NotFound)) throw e;

  throw "Your backup was not found";
}

await WindowsAPI.executeShell(["powershell.exe", "/c", "Expand-Archive", "-Force", backupPath + "backup.zip", backupPath]);
const backupData = JSON.parse(await Deno.readTextFile(backupPath + "backup.json"));

if (backupData.libkStandardVer != 0) {
  Console.error("Unsupported backup version. Aborting.");
  Deno.exit(1);
}