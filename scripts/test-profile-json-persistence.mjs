import fs from 'node:fs';

const source=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const restoreStart=source.indexOf('async function restoreAuthenticatedSessionBeforePaint()');
const restoreEnd=source.indexOf('function showSessionRestoreFailure',restoreStart);
if(restoreStart<0||restoreEnd<0)throw new Error('Session restore function missing');
const restore=source.slice(restoreStart,restoreEnd);
if(!restore.includes('const pendingPacket=localTrusted?safeJsonRead(settingsKey(),null):null'))throw new Error('Bootstrap does not inspect pending profile JSON');
const pendingBranch=restore.indexOf('if(pendingPacket?.state&&localTrusted)');
const accept=restore.indexOf('acceptServer(data);');
if(pendingBranch<0||accept<0||pendingBranch>accept)throw new Error('Server state can overwrite pending local profile before preservation');
if(source.includes('localStorage.removeItem(key);acceptServer(error.data)'))throw new Error('409 conflict can still discard the active local profile packet');
if(!source.includes(`const account=persistAccount();\n    if(!account?.auth||!account?.state)`))throw new Error('Quick JSON export is not built from the freshly persisted account snapshot');
if(!source.includes(`const account=persistAccount();\n    if(!account){showToast('Не вдалося зберегти актуальний стан профілю')`))throw new Error('Encrypted JSON export is not built from the freshly persisted account snapshot');
console.log('PASS: pending profile JSON survives bootstrap and exports use the current live account snapshot.');
