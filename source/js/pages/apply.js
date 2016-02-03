'use strict';
global.ESL.ns('ESL');

let AssistanceForm = require('../forms/assistance_form');
let CaseNumberForm = require('../forms/case_number_form');

global.ESL.Apply = function() {
    let _assistanceForm;
    let _caseNumberForm;
    let _currentStep;
    let _app = {};
    let _C = { // constants
        ASSISTANCE: 'ASSISTANCE',
        CASE_NUMBER: 'CASE_NUMBER',
    };

    return {
        init: function init(cfg={}) {
            this.setupForms();
            _currentStep = _assistanceForm;
            this.configureEventHandlers();
        },
        setupForms: function setupForms() {
            _assistanceForm = new AssistanceForm({
                elem: '.step-assistance'
            });

            _caseNumberForm = new CaseNumberForm({
                elem: '.step-case-number'
            });

        },
        configureEventHandlers: function configureEventHandlers() {
            let _this = this;

            $('.nav-menu').on('tap', function() {
                $('nav').toggleClass('active');
            });

            $('.btn-next').on('tap', function(e) {
                // TODO temp logic for demo. Add step data attr to more easily decide which logic to run on next / back
                let elem = $(e.currentTarget);
                let step = elem.parents('.step').attr('data-step');

                _this.submitCurrentStep(step);

                //_currentStep++;
                //step.hide();
                //$(`.step-${_currentStep}`).fadeIn();

            });

            $('.btn-back').on('tap', function(e) {
                // TODO temp logic for demo. Add step data attr to more easily decide which logic to run on next / back
                let elem = $(e.currentTarget);
                let step = elem.parents('.step');

                _currentStep--;
                step.hide();
                $(`.step-${_currentStep}`).fadeIn();

            });
        },
        submitCurrentStep: function submitCurrentStep(step) {
            _currentStep.submit();
        },
        showStep: function showStep(step) {
            $('.step').hide();

            switch (step) {
                case _C.ASSISTANCE:
                    _currentStep = _assistanceForm;
                    _assistanceForm.show();
                    break;
                case _C.CASE_NUMBER:
                    _currentStep = _caseNumberForm;
                    _caseNumberForm.show();
                    break;
            }
        },
        getApp: function getApp() {
            return _app;
        },
        updateApp: function updateApp(data) {
            // add new values to application data
            $.extend(_app, data);
        },
        getC: function getC() {
            return _C;
        }
    };
}();