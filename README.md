# Mirajejs-seeds-generator

This project is a utility for generating MirageJS models and routes based on a provided data structure.

## Installation

```bash
npm install
```

## Usage

```javascript
import generate from 'mirajejs-seeds-generator';

const modelsData = {
  // Your models data here
};

const options = {
  prefix: '...', // Optional
  suffix: '...', // Optional
  namespace: '...', // Optional
  timing: '...', // Optional
  outPath: '...', // Required
};

generate(modelsData, options);
```

You can find an example on the branch test

## Functionality

The `generate` function takes in two parameters: `modelsData` and `options`.

`modelsData` is an object where each key is a model name and the value is an array of objects representing the data for that model.

`options` is an object that can have the following properties:

- `prefix`: A string that will be added at the beginning of the generated code.
- `suffix`: A string that will be added at the end of the generated code.
- `namespace`: A string that will be used as the namespace for the routes in MirageJS.
- `timing`: A string that will be used as the timing for the routes in MirageJS.
- `outPath`: A string that specifies the path where the generated code will be written.

The function generates MirageJS code based on the provided data and writes it to the specified output path. The generated code is also formatted using Prettier.

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)