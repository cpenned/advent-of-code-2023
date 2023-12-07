import { readFileInput } from "../utils/readInput";

const input = readFileInput("day-1/data.txt");

const stringNumbers = {
  // for part 2
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function concatAndSumAnArrayOfStrings(acc: number, arr: string[]) {
  if (arr.length > 1) {
    return acc + parseInt(arr[0] + arr.at(-1));
  }
  return acc + parseInt(arr[0] + arr[0]);
}

function runPartOne() {
  return input
    .trim()
    .split("\n")
    .reduce((acc, x) => {
      const currentArray = x.replace(/[a-zA-Z]/g, "").split("") as string[];
      return concatAndSumAnArrayOfStrings(acc, currentArray);
    }, 0);
}

function runPartTwo() {
  const data = input
    .trim()
    .split("\n")
    .reduce((acc, x) => {
      // check if string contains any spelled out letters
      const containsStringNumbers = Object.keys(stringNumbers).some((key) =>
        x.includes(key)
      );

      // if contains string numbers, we need to do some extra work
      if (containsStringNumbers) {
        const finalMap = new Map() as Map<number, string>;

        // get all numbers and add to map with their index
        x.split("").forEach((char, index) => {
          if (parseInt(char)) {
            finalMap.set(index, `${char}`);
          }
        });

        // get all words and add values to a map with their index
        Object.entries(stringNumbers).forEach(([key, value]) => {
          if (x.includes(key)) {
            // regex to include all possible times a word is spelled out per string
            const regex = new RegExp(key, "g");
            const indexes = [...x.matchAll(regex)].map((x) => x.index);
            indexes.forEach((index) => {
              finalMap.set(index, `${value}`);
            });
          }
        });

        // sort map by index
        const mapKeys = Array.from(finalMap.keys()).sort((a, b) => a - b);

        if (mapKeys.length > 1) {
          return (
            acc +
            parseInt(finalMap.get(mapKeys[0]) + finalMap.get(mapKeys.at(-1)))
          );
        }
        return (
          acc + parseInt(finalMap.get(mapKeys[0]) + finalMap.get(mapKeys[0]))
        );
      }

      // if no words, just concat and sum
      const currentArray = x.replace(/[a-zA-Z]/g, "").split("") as string[];
      return concatAndSumAnArrayOfStrings(acc, currentArray);
    }, 0);

  return data;
}

const partOneAnswer = runPartOne();
console.log("🚀 ~ partOneAnswer:", partOneAnswer);
const partTwoAnswer = runPartTwo();
console.log("🚀 ~ partTwoAnswer:", partTwoAnswer);
