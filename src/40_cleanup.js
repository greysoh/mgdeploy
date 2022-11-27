const backupData = JSON.parse(await Deno.readTextFile(backupPath + "backup.json"));
await Deno.remove(backupPath, { recursive: true });

await WindowsAPI.runBatch("shutdown /r /t 60");