import { readFileSync } from "fs";

export function readFileInput(fileName: string) {
  const input = readFileSync(fileName, "utf-8");
  return input;
}
