'use strict';

let BaseForm = require('./base_form');

module.exports = class SignForm extends BaseForm {
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
        global.ESL.Apply.showStep(global.ESL.Apply.getC().AGREEMENTS);
    }

    submit() {
        super.submit();
        $.ajax({
            url: '/api/v1/core_applications/',
            method: 'POST',
            data: JSON.stringify(global.ESL.Apply.getApp())
        }).success(function(data) {
            console.log('data: ', data);
            global.ESL.Apply.showStep(global.ESL.Apply.getC().SUCCESS);
        }).fail(function() {
           alert('Error submitting');
        });
    }

    getValidData() {
        let _this = this;
        let name = this.elem.find('input[name=full-name]').val();

        // name cannot be blank
        if (name) {
            this.isValid = true;
        } else {
            this.isValid = false;
            this.errors.push('You must sign this form to continue.');
            return;
        }

        return {
            adult_name: name,
            is_signed: true,
            signed_date: new Date().toISOString()
        }
    }
};