const lunr = require("lunr");
const exercisesPath = require("../../data/exercises-with-ids.json");
const lunrIdx = require('../../data/lunr-index.json')
const chalk = require('chalk');
// const fs = require("fs");

const index = lunr.Index.load(lunrIdx)

// const idx = lunr(function () {
//     this.ref("id");
//     this.field("name");
//     this.field("description");
//     this.field("equipment");
//     this.field("level");
//     this.field("mechanic");
//     this.field("primaryMuscles");
//     this.field("secondaryMuscles");
//     this.field("instructions");
//     this.field("category");

//     exercises.forEach((doc) => {
//         this.add(doc);
//     }, this);
// });

// const serializedIndex = JSON.stringify(idx.toJSON());
// fs.writeFileSync("./data/lunr-index.json", serializedIndex);


export const exerciseSearch = (query) => {
    var result = index.search(query);
    console.log(chalk.blueBright(result));
    // return exercises.find((exercise) => exercise.id === parseInt(result.ref));
}
// const results = idx.search('pull up');
// console.log(results[1]);
// exercise = exercises.find((exercise) => exercise.id === parseInt(results[1].ref));
// console.log(exercise);