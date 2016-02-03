'use strict';

let BaseForm = require('./base_form');

module.exports = class AssistanceForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep(global.ESL.Apply.getC().CASE_NUMBER);
    }

    getValidData() {
        let assistance = this.elem.find('input:checked').val();

        // set to null if "none" is selected
        if (assistance === 'none') {
            assistance = null;
        }

        this.isValid = true;

        return {
            assistance_type: assistance
        }
    }
};