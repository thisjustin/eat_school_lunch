'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class AgreementsForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.configureEventHandlers();
    }

    configureEventHandlers() {
        let _this = this;

    }

    show() {
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().AGREEMENTS);
    }

    submit() {
        super.submit();
        global.ESL.Apply.showStep(global.ESL.Apply.getC().SIGN);
    }

    getValidData() {
        this.isValid = true;

        return {};
    }
};