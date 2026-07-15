export type Size = 2 | 3 | 4;

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

export const consonants = [
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
export const vowels = ["a", "e", "i", "o", "u"];

export const DEFAULTS: Record<Size, Pattern[]> = {
  2: ["CV", "VC"],
  3: ["CVC", "VCV", "CVV", "VVC", "CCV", "VCC"],
  4: ["CVCV", "VCVC", "CVVC", "VCCV", "CCVV", "VVCC", "CCVC", "CVCC"],
};
