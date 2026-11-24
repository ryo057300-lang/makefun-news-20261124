// Entry for make.fun "news-image-20261124":
// Sum up 24 November's world news in one image.
//
// The artwork lives beside this file as entry.png (1024x1024, under 1 MiB).
// This program's only job is to deliver those exact bytes to the output
// folder, unchanged, every time it runs - the grader runs it twice and
// both runs must produce identical output, so there is no drawing,
// no randomness and no network use here.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const sourceImage = new URL("./entry.png", import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destination = join(outputDir, "entry.png");

// The grader provides /output, but a local run may not have created its
// folder yet - make sure the destination directory exists either way.
mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceImage, destination);

const size = statSync(destination).size;
if (size === 0 || size > 1_048_576) {
  throw new Error(`entry.png has an invalid size: ${size} bytes`);
}
