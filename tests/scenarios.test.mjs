import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { checkScenario } from 'zhuda-laya-engine/compiler/stage-probe';

// These two checks were in the engine's own tests while the library lived in its repository.
const lib = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(lib, file), 'utf8');

test("every scenario the viewers keep is one the engine's stage probe takes", () => {
  let files = 0;
  for (const dir of ['viewer2d/scenarios', 'viewer3d/scenarios'])
    for (const file of fs.readdirSync(path.join(lib, dir)).filter((f) => f.endsWith('.json'))) {
      checkScenario(JSON.parse(read(`${dir}/${file}`)));
      files++;
    }
  assert.ok(files >= 30, String(files));
});

test('the two viewers play scenarios with the same file, and both players take the probe steps', () => {
  assert.equal(read('viewer2d/tools/play.mjs'), read('viewer3d/tools/play.mjs'));
  for (const file of ['viewer2d/tools/play.mjs', 'tools/detplay.mjs']) {
    const text = read(file);
    for (const word of ['zhuda-laya-engine/compiler/stage-probe', 'checkScenario', 'step.expect', 'step.probe'])
      assert.ok(text.includes(word), `${file}: ${word}`);
  }
});
