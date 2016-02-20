'use strict';

let BaseForm = require('./base_form');
let uuid = require('uuid');

module.exports = class HouseholdAdultsForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.adultTemplate = this.elem.find('#adult-full-name-template').html();
        this.configureEventHandlers();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.find('input[type=text]').on('keyup', function() {
            _this.validate();
        });

        this.elem.find('.add-adult').on('tap', function() {
            _this.addAdult();
        });
    }

    show() {
        this.showHelpIcon();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().CHILDREN_INCOME);
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep(global.ESL.Apply.getC().ADULT_SIGNER);
    }

    addAdult() {
        this.elem.find('.add-adult').before(this.adultTemplate);
    }

    getValidData() {
        let adultNames = this.elem.find('.form-set');
        let adults = [];

        $.each(adultNames, function(idx, adult) {
            let firstName = $(adult).find('input[name=adult-first-name]').val();
            let lastName = $(adult).find('input[name=adult-last-name]').val();

            if (firstName.length > 0 && lastName.length > 0) {
                adults.push({
                    uid: uuid.v4(), // give each adult a unique identifier
                    first_name: firstName,
                    last_name: lastName,
                    income_complete: false
                });
            }
        });

        // there must be at least one adult
        this.isValid = adults.length > 0;

        return {
            adults: adults
        }
    }
};