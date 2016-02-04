'use strict';

let BaseForm = require('./base_form');

module.exports = class AssistanceForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
    }

    submit() {
        super.submit();

        if (global.ESL.Apply.getApp().assistance_type) {
            // gather case number
            global.ESL.Apply.showStep(global.ESL.Apply.getC().CASE_NUMBER);
        } else {
            // not a part of any assistance program
            global.ESL.Apply.showStep(global.ESL.Apply.getC().HOUSEHOLD_ADULTS);
        }

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