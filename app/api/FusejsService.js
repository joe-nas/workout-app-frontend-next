const Fuse = require('fuse.js')
const fs = require('fs');
const path = require('path');


const fuseOptions = {
    // isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    minMatchCharLength: 3,
    // location: 0,
    threshold: 0.1,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
        "name",
        "description",
        "equipment",
        "level",
        "mechanic",
        "primaryMuscles",
        "secondaryMuscles",
        "instructions",
        "category",
    ]
};


// const exercises = require('../../data/exercises.json');
// const fuse = new Fuse(exercises, fuseOptions);
// const myindex = new Fuse.createIndex(fuseOptions.keys, exercises);
// const indexPath = path.join(__dirname, '../../data/fuse-index.json');
// fs.writeFileSync(indexPath, JSON.stringify(myindex.toJSON()));


// console.log(fuse.search('prea'));
