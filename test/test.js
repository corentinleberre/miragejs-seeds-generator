import generate from "mirajejs-seeds-generator";

const prefix = `/* eslint-disable no-undef */
import { createServer, Model } from "miragejs";

if (window.server) {
    server.shutdown();
}`;

const suffix = `window.server = server;`;

const modelsData = {
  cars: [
    {
      name: "Toyota",
      year: "2010",
    },
    {
      name: "Ford",
      year: "2014",
    },
    {
      name: "Renault",
      year: "2017",
    },
  ],
  movies: [
    {
      title: "Inception",
      year: "2010",
    },
    {
      title: "The Dark Knight",
      year: "2008",
    },
    {
      title: "Interstellar",
      year: "2014",
    },
  ],
  meals: [
    {
      name: "Pizza",
      year: "2010",
    },
    {
      name: "Burger",
      year: "2014",
    },
    {
      name: "Pasta",
      year: "2017",
    },
  ],
};

const options = {
  prefix,
  suffix,
  namespace: "api",
  timing: 1000,
  outPath: "./translate.js",
};

generate(modelsData, options);