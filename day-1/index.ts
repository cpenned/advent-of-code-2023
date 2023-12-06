import fs from "fs";

const input = fs.readFileSync("./data.txt", "utf-8");

const data = input.split("\n").reduce((acc, x) => {
  const currentArray = x.replace(/[a-zA-Z]/g, "").split("") as string[];

  if (currentArray.length > 1) {
    return (
      acc + parseInt(currentArray[0] + currentArray[currentArray.length - 1])
    );
  }
  return acc + parseInt(currentArray[0] + currentArray[0]);
}, 0);
console.log("🚀 ~ data ~ data:", data);
