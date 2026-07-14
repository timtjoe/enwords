export type Length = 2 | 3 | 4;
export type Pattern =
  | "CV"
  | "VC"
  | "CVC"
  | "VCV"
  | "CVV"
  | "VVC"
  | "CCV"
  | "VCC"
  | "CVCV"
  | "VCVC"
  | "CVVC"
  | "VCCV"
  | "CCVV"
  | "VVCC"
  | "CCVC"
  | "CVCC";

const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const vowels = ["a", "e", "i", "o", "u"];

export interface Result {
  words: string[];
  count: number;
  message: string;
}

const isLength = (val: number): val is Length =>
  val === 2 || val === 3 || val === 4;

export class Generator {
  generate(length: Length, pattern?: Pattern, count?: number): Result {
    const results: string[] = [];

    const expand = (pat: string, current: string) => {
      if (pat.length === 0) {
        results.push(current);
        return;
      }
      const symbol = pat[0];
      if (symbol === "C") {
        for (const c of consonants) expand(pat.slice(1), current + c);
      } else if (symbol === "V") {
        for (const v of vowels) expand(pat.slice(1), current + v);
      }
    };

    const defaults: Record<number, Pattern[]> = {
      2: ["CV", "VC"],
      3: ["CVC", "VCV", "CVV", "VVC", "CCV", "VCC"],
      4: ["CVCV", "VCVC", "CVVC", "VCCV", "CCVV", "VVCC", "CCVC", "CVCC"],
    };

    const isInputValid = isLength(length);
    const targetLength: Length = isInputValid ? length : 2;
    let chosenPattern: Pattern;

    if (pattern && defaults[targetLength].includes(pattern)) {
      chosenPattern = pattern;
    } else {
      chosenPattern = defaults[targetLength][0];
    }

    expand(chosenPattern, "");

    let finalWords = results;
    let message = "Success";

    // Force a strict safe limit of 13 if the structural input parameters were invalid
    const targetCount = !isInputValid && count && count > 13 ? 13 : count;

    if (targetCount && targetCount > 0) {
      if (targetCount <= results.length) {
        finalWords = results.slice(0, targetCount);
        if (!isInputValid && count && count > 13) {
          message = "Requested count too high, defaulted to 13 results";
        }
      } else {
        finalWords = results.slice(0, 13);
        message = "Requested count too high, defaulted to 13 results";
      }
    }

    return {
      words: finalWords,
      count: finalWords.length,
      message,
    };
  }
}
