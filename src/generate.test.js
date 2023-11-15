import generateCodeFromTemplate from "./generate";
import prettier from "prettier";

it("should generate a template string with models, seeds, and routes code", async () => {
  const modelsData = {
    cars: [{ brand: "toyota" }, { brand: "ford" }],
    phones: [{ model: "iphone" }, { model: "pixel" }],
  };
  const options = {
    prefix: "const server = createServer();",
    suffix: "export default server;",
    namespace: "/api/v1",
    timing: 1000,
  };

  const expectedTemplate = 
`const server = createServer();
let server = createServer({
  models: {
    car: Model,
    phone: Model,
  },
  seeds(server) {
    server.create("cars", {
      brand: "toyota",
    });
    server.create("cars", {
      brand: "ford",
    });
    server.create("phones", {
      model: "iphone",
    });
    server.create("phones", {
      model: "pixel",
    });
  },
  routes() {
    this.namespace = "/api/v1";
    this.timing = "1000";
    this.get("/cars", (schema) => {
      return schema.cars.all().models;
    });
    this.post("/cars", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.cars.create(attrs);
    });
    this.get("/phones", (schema) => {
      return schema.phones.all().models;
    });
    this.post("/phones", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.phones.create(attrs);
    });
  },
});
export default server;
`;

  const generatedTemplate = generateCodeFromTemplate(modelsData, options);

  const prettierCode = await prettier.format(generatedTemplate, {
    semi: true,
    parser: "babel",
  });

  expect(prettierCode).toEqual(expectedTemplate);
});

it("should generate a template string with models with no options", async () => {
    const modelsData = {
      cars: [{ brand: "toyota" }, { brand: "ford" }],
      phones: [{ model: "iphone" }, { model: "pixel" }],
    };
  
    const expectedTemplate = 
  `let server = createServer({
  models: {
    car: Model,
    phone: Model,
  },
  seeds(server) {
    server.create("cars", {
      brand: "toyota",
    });
    server.create("cars", {
      brand: "ford",
    });
    server.create("phones", {
      model: "iphone",
    });
    server.create("phones", {
      model: "pixel",
    });
  },
  routes() {
    this.get("/cars", (schema) => {
      return schema.cars.all().models;
    });
    this.post("/cars", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.cars.create(attrs);
    });
    this.get("/phones", (schema) => {
      return schema.phones.all().models;
    });
    this.post("/phones", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.phones.create(attrs);
    });
  },
});
`;
  
    const generatedTemplate = generateCodeFromTemplate(modelsData, {});

    const prettierCode = await prettier.format(generatedTemplate, {
        semi: true,
        parser: "babel",
    });

    expect(prettierCode).toEqual(expectedTemplate);
});