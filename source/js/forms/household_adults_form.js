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

        this.elem.on('keyup', 'input[type=text]', function() {
            _this.validate();
        });

        this.elem.find('.add-adult').on('tap', function() {
            _this.addAdult();
        });

        this.elem.on('tap', '.form-set .delete', function(e) {
            let formset = $(e.currentTarget).parents('.form-set');
            let uid = formset.attr('data-uid');

            formset.remove();
            _this.removeAdult(uid);
        });
    }

    show() {
        this.showHelpIcon();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().CHILDREN_INCOME, back: true});
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().ADULT_SIGNER});

        this.elem.find('.form-set').addClass('created');
    }

    addAdult() {
        this.elem.find('.add-adult').before(this.adultTemplate);
    }

    removeAdult(uid) {
        global.ESL.Apply.removeAdult(uid);
        this.validate();
    }

    getValidData() {
        let adultNames = this.elem.find('.form-set');
        let adults = [];

        $.each(adultNames, function(idx, adult) {
            let elem = $(adult);
            let firstName = elem.find('input[name=adult-first-name]').val();
            let lastName = elem.find('input[name=adult-last-name]').val();

            if (firstName.length > 0 && lastName.length > 0) {
                let uid = (elem.attr('data-uid')) ? elem.attr('data-uid') : uuid.v4(); // give each adult a unique id

                adults.push({
                    uid: uid,
                    first_name: firstName,
                    last_name: lastName,
                    income_complete: false
                });

                // update DOM with uid of adult so they can be removed if needed
                elem.attr('data-uid', uid);
            }
        });

        // there must be at least one adult
        this.isValid = adults.length > 0;

        return {
            adults: adults
        }
    }
};