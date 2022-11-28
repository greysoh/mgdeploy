const backupPath = Deno.env.get("TEMP") + "\\extBackupData\\";

await Deno.remove(backupPath, { recursive: true });
await WindowsAPI.runBatch("shutdown /r /t 60");