'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class AdultIncomeForm extends BaseForm {
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

    updateForm() {
        this.adult = this.checkForIncompleteAdults();

        if (this.adult) {
            // update form with new adult's info
            this.elem.find('.adult-name').text(`${this.adult.first_name} ${this.adult.last_name}`);
            this.elem.find('form').attr('data-adult-uid', this.adult.uid);
            this.elem.find('input[type=text]').val('');
            this.elem.find('input[type=radio]').removeProp('checked');
            this.elem.find('input[type=radio][value=monthly]').prop('checked', true);
        } else {
            // no more adults to update, go to next step
            global.ESL.Apply.showStep(global.ESL.Apply.getC().HOUSEHOLD_CHILDREN);
        }
    }

    checkForIncompleteAdults() {
        // are there additional adults in household without income info?
        // returns adult that needs info or false
        let adults = _.find(global.ESL.Apply.getApp().adults, {income_complete: false});

        if (adults !== undefined) {
            return adults;
        } else {
            return false;
        }
    }

    show() {
        this.updateForm();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().ADULT_SIGNER_SSN);
    }

    submit() {
        super.submit();
        this.updateForm();
    }

    getValidData() {
        let _this = this;
        let workIncomeFrequency = this.elem.find('input[name=work-income-freq]:checked').val();
        let workIncome = this.elem.find('input[name=work-income]').val();
        let publicIncomeFrequency = this.elem.find('input[name=public-income-freq]:checked').val();
        let publicIncome = this.elem.find('input[name=public-income]').val();
        let otherIncomeFrequency = this.elem.find('input[name=other-income-freq]:checked').val();
        let otherIncome = this.elem.find('input[name=other-income]').val();
        let adults = global.ESL.Apply.getApp().adults;
        let adultIndex = _.findIndex(adults, function(item) {
            return item.uid === _this.adult.uid;
        });

        // verify incomes are valid
        if (global.ESL.isInt(workIncome) && global.ESL.isInt(publicIncome) && global.ESL.isInt(otherIncome)) {
            this.isValid = true;
        } else {
            this.isValid = false;
            this.errors.push('Invalid income (must be numbers only)');
            return;
        }

        // update all values and mark income as complete
        this.adult.work_income = workIncome;
        this.adult.work_income_frequency = workIncomeFrequency;
        this.adult.public_income = publicIncome;
        this.adult.public_income_frequency = publicIncomeFrequency;
        this.adult.other_income = otherIncome;
        this.adult.other_income_frequency = otherIncomeFrequency;
        this.adult.income_complete = true;

        adults[adultIndex] = this.adult;

        return {
            adults: adults
        }
    }
};