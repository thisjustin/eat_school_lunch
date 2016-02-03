'use strict';
/*
 *   Extend this to make any new form class
 */

module.exports = class BaseForm {
    constructor(cfg={}) {
        //this.name = (cfg.name === undefined) ? console.error('Name is required') : cfg.name;
        this.elem = (cfg.elem === undefined) ? console.error('Elem is required') : $(cfg.elem);
        this.errors = [];
        this.isValid = false;

        this._addEventHandlers();
    }

    _addEventHandlers() {
        let _this = this;


        $(_this.elem).on('keypress', 'input', function(e){
            if(e.which === 13) {
                e.preventDefault();
                _this.submitHandler();
            }
        });
    }

    enableNext() {
        // enable next button
        this.elem.find('.btn-next').removeClass('disabled');
    }

    disableNext() {
        // disable next button
        this.elem.find('.btn-next').addClass('disabled');
    }

    showErrors() {
        // output all errors to DOM
        this.setFormError(this.errors.join(' <br/> '));
    }

    submit() {
        /*
         How to handle processing this step
         Child classes should include going to next step at end of successful submit
         */

        // hide form errors
        this.hideFormMessage();

        // check validation
        let data = this.getValidData();

        if (!this.isValid) {
            this.showErrors();
            this.disableNext();
            return;
        }

        // send new data to update core app
        global.ESL.Apply.updateApp(data);

    }

    show() {
        this.elem.fadeIn();
    }

    hide() {
        this.elem.hide();
    }

    setFormError(msg) {
        /*
         Output global form messages, like ajax submission errors
         */
        this.elem.find('.form-message-error').text(msg);
        this.elem.find('.form-message-container').show();
    }

    hideFormMessage() {
        this.elem.find('.form-message-error').text('');
        this.elem.find('.form-message-container').hide();
    }

    clearAllErrors() {
        this.hideFormMessage();
    }

    validate() {
        /*
         validate all fields, if any fail mark form as invalid
         */
        let data = this.getValidData();

        if (!this.isValid) {
            this.disableNext();
            this.showErrors();
        } else {
            this.enableNext();
        }
    }

};