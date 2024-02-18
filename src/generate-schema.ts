import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { getProgramFromFiles, generateSchema } from 'typescript-json-schema';

const program = getProgramFromFiles([resolve('src/config/types.ts')]);
const schema = generateSchema(program, 'Config', { required: true });
const outputFilePath = resolve(__dirname, '../web/public/schema.json');

writeFileSync(outputFilePath, JSON.stringify(schema, null, 2));
