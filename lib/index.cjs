"use strict";

var fs = require("fs");
var prettier = require("prettier");

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              },
        );
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var prettier__namespace = /*#__PURE__*/ _interopNamespaceDefault(prettier);

const generateCodeFromTemplate = (modelsData, options) => {
  const { prefix, suffix, namespace, timing } = options;

  const modelsCode = Object.keys(modelsData)
    .map((modelName) => `${modelName}: Model`)
    .join(",");

  const seedsCode = Object.keys(modelsData)
    .map((modelName) => {
      const objects = modelsData[modelName];
      return objects
        .map(
          (obj) =>
            `server.create("${modelName}", ${JSON.stringify(obj, null, 2)});`,
        )
        .join("\n");
    })
    .join("\n");

  const navigationCode = Object.keys(modelsData)
    .map(
      (modelName) =>
        `this.get("/${modelName}", (schema) => {
            return schema.${modelName}.all().models;
        });
        this.post("/${modelName}", (schema, request) => {
            const attrs = JSON.parse(request.requestBody);
            return schema.${modelName}.create(attrs);
        });`,
    )
    .join("");

  const template = `${prefix ?? ""}
        let server = createServer({
            models: {
                ${modelsCode}
            },
            seeds(server) {
                ${seedsCode}
            },
            routes() {
                ${namespace ? `this.namespace = "${namespace}";` : ""}
                ${timing ? `this.timing = "${timing}";` : ""}
                ${navigationCode}
            },
        });
        ${suffix ?? ""}`;

  return template;
};

const generate = async (modelsData, options) => {
  const { outPath } = options;

  const generatedCode = generateCodeFromTemplate(modelsData, options);

  const prettierCode = await prettier__namespace.format(generatedCode, {
    semi: true,
    parser: "babel",
  });

  fs.writeFileSync(outPath, prettierCode);
  console.log("✅ MirajeJs models generated successfully!");
};

module.exports = generate;
