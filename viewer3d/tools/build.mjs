// Independent consumer build with the engine this project pins.
// ZHUDA_ENGINE_ROOT=<engine checkout> builds against an unreleased engine change; never publish that build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runConsumerBuild } from 'zhuda-laya-engine/compiler/consumer';
const projectRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const config = JSON.parse(fs.readFileSync(path.join(projectRoot, 'zhuda.config.json'), 'utf8'));
if (process.env.RENDERER) config.renderer = process.env.RENDERER;
// The engine is wherever Node finds the package: this folder's node_modules, or the repository root's.
const installed = path.join(path.dirname(fileURLToPath(import.meta.resolve('zhuda-laya-engine/compiler/consumer'))), '../..');
await runConsumerBuild({ projectRoot, engineRoot: process.env.ZHUDA_ENGINE_ROOT || installed, config });
console.log('built', path.join(projectRoot, config.outDir));
