'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class AgreementsForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.configureEventHandlers();
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
    }

    show() {
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().CONTACT);
    }

    submit() {
        super.submit();
        global.ESL.Apply.showStep(global.ESL.Apply.getC().SIGN);
    }

    getValidData() {
        this.isValid = true;

        return {};
    }
};