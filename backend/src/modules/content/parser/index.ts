import parserRegistry from "./parser.registry.js";

import { pdfParser } from "./pdf.parser.js";
import { docxParser } from "./docx.parser.js";
import { imageParser } from "./image.parser.js";

parserRegistry.register(pdfParser);

parserRegistry.register(docxParser);

parserRegistry.register(imageParser);

export {};