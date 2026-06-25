const moves = [
  { fromDir: 'manage/csv-mapping', toDir: 'features/manage/csv-mapping' },
];

const importMap = {};
for (const move of moves) {
  if (move.fromDir) {
    importMap[move.fromDir] = move.toDir;
  }
}

let compPath = 'manage/csv-mapping/ExistingTab';

let bestMatch = null;
for (const [oldP, newP] of Object.entries(importMap)) {
  console.log(`Checking ${compPath} against ${oldP}`);
  if (compPath === oldP || compPath.startsWith(oldP + '/')) {
    if (!bestMatch || oldP.length > bestMatch.oldP.length) {
      bestMatch = { oldP, newP };
    }
  }
}

console.log("bestMatch:", bestMatch);
