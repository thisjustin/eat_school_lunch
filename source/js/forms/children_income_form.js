'use strict';

let BaseForm = require('./base_form');

module.exports = class ChildrenIncomeForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.adult = false;
        this.configureEventHandlers();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.find('input[type=text]').on('keyup', function() {
            _this.validate();
        });
    }

    show() {
        this.showHelpIcon();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().CHILDREN_CIRCUMSTANCES);
    }

    submit() {
        super.submit();
        global.ESL.Apply.showStep(global.ESL.Apply.getC().HOUSEHOLD_ADULTS);
    }

    getValidData() {
        let incomeFrequency = this.elem.find('input[name=income-freq]:checked').val();
        let income = this.elem.find('input[name=income]').val();

        // verify income is valid
        if (global.ESL.isInt(income)) {
            this.isValid = true;
        } else {
            this.isValid = false;
            this.errors.push('Invalid income (must be numbers only)');
            return;
        }

        return {
            child_income: income,
            child_income_frequency: incomeFrequency
        }
    }
};