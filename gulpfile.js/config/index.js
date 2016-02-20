'use strict';

var config = {};

function checkProd() {
    return process.env.ESL_ENV === 'prod';
}

function checkStage() {
    return process.env.ESL_ENV === 'stage';
}

function checkDev() {
    return process.env.ESL_ENV === 'dev';
}

config.publicDirectory = './build';
config.sourceDirectory = './source';
config.prod = checkProd();
config.stage = checkStage();
config.dev = checkDev();

console.log('dev: ', config.dev);

module.exports = config;