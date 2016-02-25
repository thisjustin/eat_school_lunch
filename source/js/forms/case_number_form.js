'use strict';

let BaseForm = require('./base_form');

module.exports = class CaseNumberForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);

        this.configureEventHandlers();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.find('input[type=text]').on('keyup', function() {
            _this.validate();
        });
    }

    show() {
        this.elem.find(`.form-group-text.${global.ESL.Apply.getApp().assistance_type.toLowerCase()}`).show();
        this.hideHelpIcon();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().ASSISTANCE, back: true});
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().HOUSEHOLD_CHILDREN});
    }

    getValidData() {
        let caseNumber = this.elem.find('input:visible').val();

        if (!caseNumber) {
            this.isValid = false;
            this.errors.push('Invalid case number');
            return;
        }

        this.isValid = true;

        return {
            assistance_case_number: caseNumber
        }
    }
};