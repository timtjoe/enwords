import { describe, it, expect } from "vitest";
import { enword } from "./index.js";
import { consonants, vowels } from "./tokens.js";

// Helper to check if a single character matches 'C' or 'V'
const matchesPattern = (word: string, pattern: string): boolean => {
  if (word.length !== pattern.length) return false;
  for (let i = 0; i < word.length; i++) {
    const isConsonant = consonants.includes(word[i]);
    const isVowel = vowels.includes(word[i]);
    const expected = pattern[i];

    if (expected === "C" && !isConsonant) return false;
    if (expected === "V" && !isVowel) return false;
  }
  return true;
};

describe("enword", () => {
  it("generates exactly 20 words of the correct size", () => {
    const results = enword(3);
    expect(results).toHaveLength(20);

    for (const word of results) {
      expect(word).toHaveLength(3);
    }
  });

  it("conforms to valid consonant/vowel patterns for the requested size", () => {
    const results = enword(2);
    const validPatterns = ["CV", "VC"];

    for (const word of results) {
      const isValid = validPatterns.some((pat) => matchesPattern(word, pat));
      expect(isValid).toBe(true);
    }
  });

  it("throws an error for invalid sizes", () => {
    expect(() => enword(5 as any)).toThrow("Invalid size. Use 2, 3, or 4.");
    expect(() => enword(1 as any)).toThrow("Invalid size. Use 2, 3, or 4.");
  });

  it("maintains uniqueness across consecutive calls", () => {
    const firstBatch = enword(2);
    const secondBatch = enword(2);

    // Verify all 20 items in the first batch are internally unique
    const uniqueFirstBatch = new Set(firstBatch);
    expect(uniqueFirstBatch.size).toBe(20);

    // Verify the second batch did not reuse any words from the first batch
    for (const word of secondBatch) {
      expect(firstBatch).not.toContain(word);
    }
  });
});
