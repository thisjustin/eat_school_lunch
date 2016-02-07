'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class AdultSignerSSNForm extends BaseForm {
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

    updateForm() {
        this.signingAdult = _.find(global.ESL.Apply.getApp().adults, {is_signer: true});

        this.elem.find('.adult-name').text(`${this.signingAdult.first_name} ${this.signingAdult.last_name}`);
    }

    show() {
        this.updateForm();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().ADULT_SIGNER);
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep(global.ESL.Apply.getC().ADULT_INCOME);
    }

    getValidData() {
        let _this = this;
        let ssn = this.elem.find('input[name=signing-adult-ssn]').val();
        let adults = global.ESL.Apply.getApp().adults;
        let adultIndex = _.findIndex(adults, function(item) {
            return item.uid === _this.signingAdult.uid;
        });

        // ensure ssn is exactly 4 digits
        if (ssn.length !== 4 || ssn.match(/[^\d]+/)) {
            this.isValid = false;
            return;
        } else {
            this.isValid = true;
        }

        this.signingAdult.ssn = ssn;

        adults[adultIndex] = this.signingAdult;

        return {
            adults: adults
        }
    }
};