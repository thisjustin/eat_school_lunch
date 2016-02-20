'use strict';

let BaseForm = require('./base_form');

module.exports = class SuccessForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
    }

    show() {
        this.hideHelpIcon();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().SIGN);
    }

    submit() {
        super.submit();
        // return to homepage
        window.location = '/';
    }

    getValidData() {
        this.isValid = true;
    }
};