import { readFileInput } from "../utils/readInput";

const arrayOfLines = readFileInput("day-2/data.txt")
  .split("\n")
  .filter((x) => x);

const maxColorPossible = {
  red: 12,
  green: 13,
  blue: 14,
};

function getStructuredLineData(x: string) {
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
  return { gameIndex, maxColorsPerCurrentGame };
}

function runPartOne() {
  return arrayOfLines.reduce((acc, x) => {
    //  get game data
    const { gameIndex, maxColorsPerCurrentGame } = getStructuredLineData(x);

    // check if any color is greater than max
    const isGamePossible = Array.from(maxColorsPerCurrentGame.entries()).every(
      ([key, value]) => maxColorPossible[key] >= value
    );

    return isGamePossible ? acc + gameIndex : acc;
  }, 0);
}

function runPartTwo() {
  return arrayOfLines.reduce((acc, x) => {
    //  get game data
    const { maxColorsPerCurrentGame } = getStructuredLineData(x);

    // check if any color is greater than max
    const gamePower = Array.from(maxColorsPerCurrentGame.entries()).reduce(
      (acc, [_, value]) => {
        return acc * value;
      },
      1
    );

    return acc + gamePower;
  }, 0);
}

(function run() {
  console.log({
    "🚀 ~ partOneResult": runPartOne(),
    "🚀 ~ partTwoResult": runPartTwo(),
  });
})();
