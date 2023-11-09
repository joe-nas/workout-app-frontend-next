const { Document } = require("flexsearch");
const fs = require("fs");
const exercises = require("../../data/exercises.json");

var counter = 1;
exercises.forEach((exercise) => {
  exercise.id = counter++;
});

// console.log(exercises.length);
// const jsonData = exercises;

// fs.writeFile(
//   "exercises-with-ids.json",
//   JSON.stringify(jsonData),
//   function (err) {
//     if (err) {
//       console.log(err);
//     }
//   }
// );

const index = new Document({
  document: {
    id: "id",
    index: [
      "name",
      "description",
      "equipment",
      "level",
      "mechanic",
      "primaryMuscles",
      "secondaryMuscles",
      "instructions",
      "category",
    ],
    store: [
      "name",
      "description",
      "equipment",
      "level",
      "mechanic",
      "primaryMuscles",
      "secondaryMuscles",
      "instructions",
      "category",
    ],
  },
});
exercises.forEach((element) => {
  index.add({
    id: element.id,
    name: element.name,
    description: element.description,
    equipment: element.equipment,
    level: element.level,
    mechanic: element.mechanic,
    primaryMuscles: element.primaryMuscles,
    secondaryMuscles: element.secondaryMuscles,
    instructions: element.instructions,
    category: element.category,
  });
});

const result = index.search("curl", { enrich: true });

console.log(result[1].result[0]);
// console.log(index.search("pull", { limit: 5 }));

index.export((key, data) => {
  // Save each part of the index to a separate file
  fs.writeFile(`exportedIndex_${key}.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(`File exportedIndex_${key}.json written successfully`);
    }
  });
});