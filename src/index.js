import fs from "fs";
import * as prettier from "prettier";

const generate = async (modelsData, options) => {
  const { outPath } = options;

  const generatedCode = generateCodeFromTemplate(modelsData, options);

  const prettierCode = await prettier.format(generatedCode, {
    semi: true,
    parser: "babel",
  });

  fs.writeFileSync(outPath, prettierCode);
  console.log("✅ MirajeJs models generated successfully!");
};

export default generate;
