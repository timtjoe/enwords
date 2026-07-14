import { describe, it, expect } from "vitest";
import { Generator } from "../src/generator.js";

describe("Generator", () => {
  const gen = new Generator();

  it("generates correct patterns and honors exact counts", () => {
    const result = gen.generate(2, "CV", 5);
    expect(result.words).toHaveLength(5);
    expect(result.count).toBe(5);
    expect(result.message).toBe("Success");

    // Structure validation: Ensure words match CV format
    const consonants = "bcdfghjklmnpqrstvwxyz";
    const vowels = "aeiou";
    for (const word of result.words) {
      expect(consonants).toContain(word[0]);
      expect(vowels).toContain(word[1]);
    }
  });

  it("defaults pattern if omitted or invalid for a valid length", () => {
    // Missing pattern
    const noPattern = gen.generate(3);
    expect(noPattern.words[0]).toHaveLength(3);

    // Invalid pattern for valid length
    const badPattern = gen.generate(2, "CVC" as any);
    expect(badPattern.words[0]).toHaveLength(2); // Safely drops to "CV"
  });

  it("defaults length gracefully when fallback value is unsupported", () => {
    const result = gen.generate(99 as any, "XYZ" as any);
    expect(result.words[0]).toHaveLength(2); // Safely drops to length 2 ("CV")
  });

  it("handles high limits and sets error messaging on count overflow", () => {
    const result = gen.generate(2, "CV", 9999);
    expect(result.count).toBe(13);
    expect(result.message).toContain("defaulted to 13 results");
  });

  it("returns full array sequence if count parameter is completely omitted", () => {
    const result = gen.generate(2, "CV");
    // 21 consonants * 5 vowels = 105 total combinations
    expect(result.count).toBe(105);
    expect(result.message).toBe("Success");
  });
});
