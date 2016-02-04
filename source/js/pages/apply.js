'use strict';
global.ESL.ns('ESL');

let AssistanceForm = require('../forms/assistance_form');
let CaseNumberForm = require('../forms/case_number_form');
let HouseholdAdultsForm = require('../forms/household_adults_form');
let AdultSignerForm = require('../forms/adult_signer_form');
let AdultSignerSSNForm = require('../forms/adult_signer_ssn_form');

global.ESL.Apply = function() {
    let _assistanceForm;
    let _caseNumberForm;
    let _householdAdultsForm;
    let _adultSignerForm;
    let _adultSignerSSNForm;
    let _adultIncomeForm;
    let _householdChildrenForm;
    let _childrenCircumstancesForm;
    let _childrenIncomeForm;
    let _raceForm;
    let _contactForm;
    let _agreementsForm;
    let _signForm;
    let _successForm;
    let _currentStep;
    let _app = {};
    let _C = { // constants
        ASSISTANCE: 'ASSISTANCE',
        CASE_NUMBER: 'CASE_NUMBER',
        HOUSEHOLD_ADULTS: 'HOUSEHOLD_ADULTS',
        ADULT_SIGNER: 'ADULT_SIGNER',
        ADULT_SIGNER_SSN: 'ADULT_SIGNER_SSN',
        ADULT_INCOME: 'ADULT_INCOME',
        HOUSEHOLD_CHILDREN: 'HOUSEHOLD_CHILDREN',
        CHILDREN_CIRCUMSTANCES: 'CHILDREN_CIRCUMSTANCES',
        CHILDREN_INCOME: 'CHILDREN_INCOME',
        RACE: 'RACE',
        CONTACT: 'CONTACT',
        AGREEMENTS: 'AGREEMENTS',
        SIGN: 'SIGN',
        SUCCESS: 'SUCCESS'
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

            _householdAdultsForm = new HouseholdAdultsForm({
                elem: '.step-household-adults'
            });

            _adultSignerForm = new AdultSignerForm({
                elem: '.step-adult-signer'
            });

            _adultSignerSSNForm = new AdultSignerSSNForm({
                elem: '.step-adult-signer-ssn'
            });

        },
        configureEventHandlers: function configureEventHandlers() {
            let _this = this;

            $('.nav-menu').on('tap', function() {
                $('nav').toggleClass('active');
            });

            $('.btn-next').on('tap', function(e) {
                let step = $(e.currentTarget).parents('.step').attr('data-step');

                _this.submitCurrentStep(step);
            });

            $('.btn-back').on('tap', function(e) {
                _currentStep.back();
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
                    break;
                case _C.CASE_NUMBER:
                    _currentStep = _caseNumberForm;
                    break;
                case _C.HOUSEHOLD_ADULTS:
                    _currentStep = _householdAdultsForm;
                    break;
                case _C.ADULT_SIGNER:
                    _currentStep = _adultSignerForm;
                    break;
                case _C.ADULT_SIGNER_SSN:
                    _currentStep = _adultSignerSSNForm;
                    break;
            }

            _currentStep.show();
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