import React from "react";
import SearchComponent from "@/components/SearchComponent";
import Fuse from 'fuse.js';
import path from 'path';
import fs from 'fs';


const ExercisesPage = () => {
  try {
    const { index, exercises, options } = getSearchData();

    return (
      <div className="">
        <SearchComponent index={index} exercises={exercises} options={options} />
      </div>
    )
  } catch (error) {
    console.log(error);
  }
};

function getSearchData() {
  const exercisesPath = path.join(process.cwd(), 'data/exercises.json');
  const exercisesData = fs.readFileSync(exercisesPath, 'utf8');
  const exercises = JSON.parse(exercisesData);

  const fuseIdxPath = path.join(process.cwd(), 'data/fuse-index.json');
  const fuseIdxData = fs.readFileSync(fuseIdxPath, 'utf8');

  const fuseOptions = {
    // isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    // includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 4,
    location: 0,
    threshold: 0.6,
    distance: 3,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    fieldNormWeight: 2,
    keys: [
      "name",
      "description",
      "equipment",
      "level",
      "mechanic",
      "primaryMuscles",
      "secondaryMuscles",
      // "instructions",
      "category",
    ]
  };

  return {
    index: fuseIdxData,
    exercises: exercises,
    options: fuseOptions,
  };
}



export default ExercisesPage;
