'use strict';

let BaseForm = require('./base_form');

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
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().CASE_NUMBER);
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep(global.ESL.Apply.getC().ADULT_SIGNER);
    }

    addAdult() {
        this.elem.find('.add-adult').before(this.adultTemplate);
    }

    getValidData() {
        let adultNames = this.elem.find('input[name=adult-name]');
        let adults = [];

        $.each(adultNames, function(idx, adult) {
            let name = $(adult).val();

            if (name.length > 0) {
                adults.push({
                    name: name
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