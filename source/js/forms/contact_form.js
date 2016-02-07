'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class ContactForm extends BaseForm {
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
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().RACE);
    }

    submit() {
        super.submit();
        global.ESL.Apply.showStep(global.ESL.Apply.getC().AGREEMENTS);
    }

    getValidData() {
        let _this = this;

        let results = {
            street_address: this.elem.find('input[name=street-address]').val(),
            city: this.elem.find('input[name=city]').val(),
            state: this.elem.find('input[name=state]').val(),
            zip_code: this.elem.find('input[name=zip-code]').val(),
            phone_number: this.elem.find('input[name=phone-number]').val(),
            email: this.elem.find('input[name=email]').val()
        };

        // TODO validation

        this.isValid = true;

        return results
    }
};