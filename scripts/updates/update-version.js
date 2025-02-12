import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { copyProjectFolder } from './update-helper.js';

// current version is stored here
const templateJsonFileName = '.template.json';

const updateList = [
  { from: '1.3.0', update: updateFrom_1p3_to_1p4 },
  { from: '1.4.0', update: updateFrom_1p4_to_1p5 },
];

export function updateVersion(prefix) {
  const currentFolder = process.cwd();
  const templateFolder = process.cwd() + '_template';

  const currentFolderJsonFileName = path.join(
    currentFolder,
    templateJsonFileName,
  );
  var currentTemplateSettings = fs.existsSync(currentFolderJsonFileName)
    ? JSON.parse(fs.readFileSync(currentFolderJsonFileName))
    : { version: '1.0.0' };
  var newTemplateSettings = JSON.parse(
    fs.readFileSync(path.join(templateFolder, templateJsonFileName)),
  );

  const currentVersion = currentTemplateSettings.version;
  for (const update of updateList) {
    if (semver.gte(update.from, currentVersion)) {
      update.update(currentFolder, templateFolder, prefix);
    }
  }

  currentTemplateSettings.version = newTemplateSettings.version;
  fs.writeFileSync(
    currentFolderJsonFileName,
    JSON.stringify(currentTemplateSettings),
  );
}

function updateFrom_1p3_to_1p4(currentFolder, templateFolder, prefix) {
  copyProjectFolder(`webapi/src/${prefix}.App/Features/TestApi`);
  copyProjectFolder(`webapi/tests/${prefix}.App.Tests/TestApiServiceTests.cs`);
}

function updateFrom_1p4_to_1p5(currentFolder, templateFolder, prefix) {}
