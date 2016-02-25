'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class AdultSignerForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.adultTemplate = _.template(this.elem.find('#signing-adult-template').html());
    }

    outputOptions() {
        // display all adults as options to be signer
        let output = '';
        let _this = this;

        global.ESL.Apply.getApp().adults.forEach(function(adult, idx) {
            output += _this.adultTemplate({
                uid: adult.uid,
                adultName: `${adult.first_name} ${adult.last_name}`,
                selected: idx === 0 // select first adult by default
            });
        });

        this.elem.find('form .form-group').html(output);
    }

    show() {
        this.outputOptions();
        this.hideHelpIcon();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().HOUSEHOLD_ADULTS, back: true});
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().ADULT_SIGNER_SSN});
    }

    getValidData() {
        let adults = global.ESL.Apply.getApp().adults;
        let signingAdult = this.elem.find('input:checked').val();

        adults.forEach(function(adult) {
            adult.is_signer = adult.uid === signingAdult;
        });

        this.isValid = true;

        return {
            adults: adults
        }
    }
};