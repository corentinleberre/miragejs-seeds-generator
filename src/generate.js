const generateCodeFromTemplate = (modelsData, options) => {
  const { prefix, suffix, namespace, timing } = options;

  const modelsCode = Object.keys(modelsData)
    .map((modelName) => `${modelName.slice(0, -1)}: Model`)
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

export default generateCodeFromTemplate;
