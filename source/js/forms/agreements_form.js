'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class AgreementsForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.configureEventHandlers();
    }

    configureSteps() {
        if (global.ESL.Apply.isInAssistanceProgram()) {
            this.stepNumber = 6;
            this.totalSteps = 7;
        } else {
            this.stepNumber = 11;
            this.totalSteps = 12;
        }

        this.updateStep();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.find('.usda').on('tap', function() {
            _this.elem.find('.usda-statement').toggleClass('show');
        });

        this.elem.find('.use-info').on('tap', function() {
            _this.elem.find('.use-info-statement').toggleClass('show');
        });

        this.elem.find('.usda-statement .close').on('tap', function() {
            _this.elem.find('.usda-statement').toggleClass('show');
        });

        this.elem.find('.use-info-statement .close').on('tap', function() {
            _this.elem.find('.use-info-statement').toggleClass('show');
        });

        this.elem.find('input[type=checkbox]').on('change', function() {
            _this.validate();
        });
    }

    show() {
        this.hideHelpIcon();
        this.configureSteps();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().CONTACT, back: true});
    }

    submit() {
        super.submit();
        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().SIGN});
    }

    getValidData() {
        this.isValid = this.elem.find('input[name=read-statements]').is(':checked');

        return {};
    }
};