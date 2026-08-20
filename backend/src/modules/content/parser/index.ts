import parserRegistry from "./parser.registry.js";

import { pdfParser } from "./pdf.parser.js";
import { docxParser } from "./docx.parser.js";
import { imageParser } from "./image.parser.js";
import { textParser } from "./text.parser.js";

parserRegistry.register(pdfParser);

parserRegistry.register(docxParser);

parserRegistry.register(imageParser);

parserRegistry.register(textParser);

export {};