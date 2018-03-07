const fs = require('fs');
const _ = require('lodash');

const envVariables = require('../config/.env.sample');

const createENVFile = (directory, variables) => {
<<<<<<< HEAD
  _.each(variables, variable => {
    fs.appendFileSync(`./${directory}/.env`, variable + '\n');
  });
};

const buildEnv = () => {
  _.each(envVariables, (value, key) => {
    fs.writeFileSync(`./${key}/.env`, '');
    createENVFile(key, value);
  });
};
=======
  _.each(variables, (variable) => {
    fs.appendFileSync(`./${directory}/.env`, variable + '\n');
  })
}

const buildEnv = () => {
  _.each(envVariables, (value, key) => {
    fs.writeFileSync(`./${key}/.env`, '')
    createENVFile(key, value);
  });
}
>>>>>>> Master rebase

buildEnv();
