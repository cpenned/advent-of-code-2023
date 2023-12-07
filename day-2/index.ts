import { readFileInput } from "../utils/readInput";

const input = readFileInput("day-2/data.txt");

const maxColorPossible = {
  red: 12,
  green: 13,
  blue: 14,
};

function runPartOne() {
  return input
    .trim()
    .split("\n")
    .reduce((acc, x) => {
      // get game index and data into array
      const splitIndexFromData = x.split(":");

      // get game index
      const gameIndex = parseInt(splitIndexFromData[0].match(/\d+/g)[0]);

      // get flatted array of all sets
      const sets = splitIndexFromData[1].split(";");
      const flattenedSubSets = sets.flatMap((set) => set.split(","));

      // create new map
      const maxColorsPerCurrentGame = new Map();

      // loop through each game and get max number for each color
      flattenedSubSets.map((s) => {
        const key = s.match(/[a-zA-Z]+/)[0];
        if (maxColorsPerCurrentGame.has(key)) {
          const value = maxColorsPerCurrentGame.get(key) as number;
          maxColorsPerCurrentGame.set(
            key,
            Math.max(value, parseInt(s.match(/\d+/g)[0]))
          );
        } else {
          maxColorsPerCurrentGame.set(key, parseInt(s.match(/\d+/g)[0]));
        }
      });

      // check if any color is greater than max
      const isGamePossible = Array.from(
        maxColorsPerCurrentGame.entries()
      ).every(([key, value]) => maxColorPossible[key] >= value);

      return isGamePossible ? acc + gameIndex : acc;
    }, 0);
}

const partOneResult = runPartOne();
console.log("🚀 ~ partOneResult:", partOneResult);
