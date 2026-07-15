import { consonants, DEFAULTS, Size, vowels } from "./tokens";

export function createGenerator() {
  const history: string[] = [];

  return function enword(size: Size): string[] {
    if (size !== 2 && size !== 3 && size !== 4) {
      throw new Error("Invalid size. Use 2, 3, or 4.");
    }

    const patterns = DEFAULTS[size];
    const batch: string[] = [];

    while (batch.length < 20) {
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      let word = "";

      for (let i = 0; i < pattern.length; i++) {
        const source = pattern[i] === "C" ? consonants : vowels;
        word += source[Math.floor(Math.random() * source.length)];
      }

      // Ensure uniqueness within the current batch AND across recent history
      if (!batch.includes(word) && !history.includes(word)) {
        batch.push(word);
        history.push(word);
      }
    }

    // Retain only the last 40 generated words in memory
    if (history.length > 40) {
      history.splice(0, history.length - 40);
    }

    return batch;
  };
}
