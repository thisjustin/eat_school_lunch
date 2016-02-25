'use strict';

let BaseForm = require('./base_form');

module.exports = class SignForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.configureEventHandlers();
    }

    configureSteps() {
        if (global.ESL.Apply.isInAssistanceProgram()) {
            this.stepNumber = 7;
            this.totalSteps = 7;
        } else {
            this.stepNumber = 12;
            this.totalSteps = 12;
        }

        this.updateStep();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.find('input[type=text]').on('keyup', function() {
            _this.validate();
        });
    }

    updateHouseholdSize() {
        let adults = (global.ESL.Apply.getApp().adults) ? global.ESL.Apply.getApp().adults.length : 0;
        let children = (global.ESL.Apply.getApp().children) ? global.ESL.Apply.getApp().children.length : 0;

        if (adults > 0) {
            this.elem.find('.total-adults').text(adults);
        }

        this.elem.find('.total-children').text(children);
    }

    show() {
        this.hideHelpIcon();
        this.configureSteps();
        this.updateHouseholdSize();
        this.clearErrors();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep({step: global.ESL.Apply.getC().AGREEMENTS, back: true});
    }

    submit() {
        let _this = this;

        super.submit();

        this.clearErrors();

        $.ajax({
            url: '/api/v1/core_applications/',
            method: 'POST',
            data: JSON.stringify(global.ESL.Apply.getApp())
        }).success(function(data) {
            window.location.href = '/success';
        }).fail(function(data) {
           _this.handleSubmissionError(data);
        });
    }

    clearErrors() {
        this.elem.find('.errors .error-output').empty();
        this.elem.find('.errors').hide();
    }

    handleSubmissionError(data) {
        let output = '';

        try{
            let errors = JSON.parse(data.responseText);

            // look through errors returned by django rest framework and parse out messages
            Object.keys(errors).forEach(function(d) {
                if (typeof(errors[d][0]) === 'string') {
                    output += `<p>Error in ${d.replace(/\_/g, ' ')}: ${errors[d][0]}</p>`;
                } else if (typeof(errors[d][0]) === 'object') {
                    // recurse one level into error messages
                    Object.keys(errors[d][0]).forEach(function(f) {
                        if (typeof(errors[d][0][f][0]) === 'string') {
                            output += `<p>Error in ${d.replace(/\_/g, ' ')} ${f.replace(/\_/g, ' ')}: ${errors[d][0][f][0]}</p>`;
                        }
                    });
                }
            });
        } catch(e) {
            console.error(e);
        }

        this.elem.find('.errors .error-output').html(output);
        this.elem.find('.errors').fadeIn();
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