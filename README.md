# enword

This library is used to generate sets of 2-, 3-, and 4-letter English words. The generated words are not intended for use as primary keys, secure IDs, or other forms of unique identifiers. Instead, they should be used as inspiration for choosing programming language extensions or projects that require a file extension.

## Why

When starting a new project, picking a file extension, choosing a short codename, or setting up a local server port mapping, you often need quick, readable words. `enword` solves this by delivering instant phonetic inspiration. It serves as an ultra-fast generator optimized for rapidly spawning readable shorthand strings, helping you bypass naming fatigue.

## Caveats

* **What it is:** A lightweight phonetic engine that generates pronounceable consonant-vowel combinations mimicking English syllabic structures for inspiration.
* **What it is not:** A secure password or ID generator. Never use these words as database primary keys, secure transaction IDs, salts, hashes, or secure entropy vectors.

## Quick Start

Install the package:

```bash
npm install enword

```

### Direct Implementation

The underlying architecture utilizes a closure that preserves a FIFO (First-In, First-Out) memory history buffer to guarantee unique returned batches without you having to manage any state.

```typescript
import { enword, type Size } from "enword";

// 1. The input parameter 'Size' is a strict literal union: 2 | 3 | 4
// It defines the exact character length of each generated word.
const size: Size = 3;

// 2. Execution yields a flat array containing exactly 20 unique phonetic words
const words: string[] = enword(size);

console.log(words);
// Output: ["bax", "ovi", "zuv", "kem", "jin", ...]

```

## Limitations

* **Status:** Stable release.
* **Capacity Limit:** The underlying permutation space is finite. For example, 2-character words contain 105 total possible unique combinations.
* **Deduplication History:** To balance memory allocation with unique results, the closure engine retains an internal history queue of the last 40 generated words to guarantee immediate uniqueness across consecutive runs.

## Performance

Because the generator relies on lazy evaluation and direct index-lookup array mapping rather than pre-generating massive permutation matrices in memory, execution overhead is effectively zero. Batch generation executes in sub-millisecond timeframes, making it ideal for low-latency pipelines and responsive terminal utilities.

MIT © [Timothy T. Joe](https://www.google.com/search?q=https://github.com/timtjoe)