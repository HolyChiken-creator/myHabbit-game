import fs from 'node:fs';

const source=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const validateStart=source.indexOf('async function validateImportedAccountOnServer(item)');
const storeStart=source.indexOf('function storeImportedAccount(item)');
const importStart=source.indexOf('async function importAccountFile(file)');
if(validateStart<0||storeStart<0||importStart<0)throw new Error('New-device JSON login flow is missing');
const validate=source.slice(validateStart,storeStart);
const flow=source.slice(importStart,source.indexOf('function switchAccount',importStart));
if(!validate.includes("fetch('/api/family/state'"))throw new Error('Imported JSON token is not validated against the server');
if(!validate.includes('authorization:`Bearer ${token}`'))throw new Error('Imported token is not sent to the server for validation');
if(!validate.includes("res.status===401||res.status===403"))throw new Error('Invalid imported credentials are not rejected explicitly');
if(!validate.includes('freshState.currentUserId=userId'))throw new Error('Server-confirmed profile does not select the imported user');
const confirmPos=flow.indexOf('await validateImportedAccountOnServer(box.account)');
const storePos=flow.indexOf('storeImportedAccount(confirmed)');
if(confirmPos<0||storePos<0||confirmPos>storePos)throw new Error('JSON account is stored before server validation');
if(!flow.includes("location.replace('/?screen=dashboard')"))throw new Error('Imported login does not restart through the normal authenticated bootstrap');
if(flow.includes('switchAccount('))throw new Error('Legacy local-only JSON login path returned');
console.log('PASS: JSON login validates the credential server-side before storage and reboots into the authenticated runtime on a new device.');
