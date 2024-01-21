import { writeFileSync } from "fs";
import { resolve } from "path";

import * as TJS from "typescript-json-schema";

const program = TJS.getProgramFromFiles([resolve("src/config/config.ts")]);
const schema = TJS.generateSchema(program, "Config", { required: true });
const outputFilePath = resolve(__dirname, "json-schema.json");
writeFileSync(outputFilePath, JSON.stringify(schema, null, 2));

console.log(`JSON schema has been generated and saved to ${outputFilePath}`);
