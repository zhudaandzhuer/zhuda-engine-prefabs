// The builders of this model use the character kit kept in the engine's repository
// (games/tools/characters), which is not part of the engine's npm package. Set
// ZHUDA_ENGINE_CHECKOUT to a checkout of zhuda-laya-engine; without it, a folder named
// zhuda-laya-engine beside this repository is used.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const checkout = path.resolve(process.env.ZHUDA_ENGINE_CHECKOUT || path.join(here, '../../../../zhuda-laya-engine'));

/** A module of the engine repository's games/tools/characters, by file name. */
export async function engineTool(name) {
  const file = path.join(checkout, 'games/tools/characters', name);
  if (!fs.existsSync(file))
    throw Error(
      `${name}: not found under ${path.join(checkout, 'games/tools/characters')}. Set ZHUDA_ENGINE_CHECKOUT to a checkout of zhuda-laya-engine (https://github.com/zhudaandzhuer/zhuda-laya-engine).`,
    );
  return import(pathToFileURL(file).href);
}
