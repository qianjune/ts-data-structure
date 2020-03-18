const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');

const loaderName = 'i18-loader';

const optionsSchema = {
  type: 'object',
  properties: {
    lang: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

const defaultOptions = {
  lang: 'cn',
};

function getOptionsArray(config) {
  const rawOptions = getOptions(config);
  const rawOptionsArray = [rawOptions];
  const optionsArray = [];
  for (const optionsIndex in rawOptionsArray) {
    validateOptions(optionsSchema, rawOptionsArray[optionsIndex], loaderName);
    optionsArray[optionsIndex] = Object.assign({}, defaultOptions, rawOptionsArray[optionsIndex]);
  }
  return optionsArray;
}

module.exports = getOptionsArray;

