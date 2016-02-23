'use strict';
global.ESL.ns('ESL');

let AssistanceForm = require('../forms/assistance_form');
let CaseNumberForm = require('../forms/case_number_form');
let HouseholdAdultsForm = require('../forms/household_adults_form');
let AdultSignerForm = require('../forms/adult_signer_form');
let AdultSignerSSNForm = require('../forms/adult_signer_ssn_form');
let AdultIncomeForm = require('../forms/adult_income_form');
let HouseholdChildrenForm = require('../forms/household_children_form');
let ChildrenCircumstancesForm = require('../forms/children_circumstances_form');
let ChildrenIncomeForm = require('../forms/children_income_form');
let RaceForm = require('../forms/race_form');
let ContactForm = require('../forms/contact_form');
let AgreementsForm = require('../forms/agreements_form');
let SignForm = require('../forms/sign_form');

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
        SIGN: 'SIGN'
    };

    return {
        init: function init(cfg={}) {
            this.setupForms();
            this.configureEventHandlers();
            _currentStep = _assistanceForm;
            _currentStep.show();
        },
        setupForms: function setupForms() {
            _assistanceForm = new AssistanceForm({
                elem: '.step-assistance',
                stepNumber: 1,
                totalSteps: false
            });

            _caseNumberForm = new CaseNumberForm({
                elem: '.step-case-number',
                stepNumber: 2,
                totalSteps: 7
            });

            _householdAdultsForm = new HouseholdAdultsForm({
                elem: '.step-household-adults',
                stepNumber: 5,
                totalSteps: 12
            });

            _adultSignerForm = new AdultSignerForm({
                elem: '.step-adult-signer',
                stepNumber: 6,
                totalSteps: 12
            });

            _adultSignerSSNForm = new AdultSignerSSNForm({
                elem: '.step-adult-signer-ssn',
                stepNumber: 7,
                totalSteps: 12
            });

            _adultIncomeForm = new AdultIncomeForm({
                elem: '.step-adult-income',
                stepNumber: 8,
                totalSteps: 12
            });

            _householdChildrenForm = new HouseholdChildrenForm({
                elem: '.step-household-children',
                stepNumber: 2,
                totalSteps: 12
            });

            _childrenCircumstancesForm = new ChildrenCircumstancesForm({
                elem: '.step-children-circumstances',
                stepNumber: 3,
                totalSteps: 12
            });

            _childrenIncomeForm = new ChildrenIncomeForm({
                elem: '.step-children-income',
                stepNumber: 4,
                totalSteps: 12
            });

            _raceForm = new RaceForm({
                elem: '.step-race',
                stepNumber: 9,
                totalSteps: 12
            });

            _contactForm = new ContactForm({
                elem: '.step-contact',
                stepNumber: 10,
                totalSteps: 12

            });

            _agreementsForm = new AgreementsForm({
                elem: '.step-agreements',
                stepNumber: 11,
                totalSteps: 12
            });

            _signForm = new SignForm({
                elem: '.step-sign',
                stepNumber: 12,
                totalSteps: 12
            });
        },
        configureEventHandlers: function configureEventHandlers() {
            $('.global-header .help').on('tap', function() {
                _currentStep.showHelperText();
            });

            $('.close-step-helper').on('tap', function() {
                _currentStep.hideHelperText();
            });

            $('.btn-next').on('tap', function() {
                _currentStep.submit();
            });

            $('.btn-back').on('tap', function() {
                _currentStep.back();
            });
        },
        showStep: function showStep(step) {
            $('.step').hide();
            $(window).scrollTop(0);

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
                case _C.ADULT_INCOME:
                    _currentStep = _adultIncomeForm;
                    break;
                case _C.HOUSEHOLD_CHILDREN:
                    _currentStep = _householdChildrenForm;
                    break;
                case _C.CHILDREN_CIRCUMSTANCES:
                    _currentStep = _childrenCircumstancesForm;
                    break;
                case _C.CHILDREN_INCOME:
                    _currentStep = _childrenIncomeForm;
                    break;
                case _C.RACE:
                    _currentStep = _raceForm;
                    break;
                case _C.CONTACT:
                    _currentStep = _contactForm;
                    break;
                case _C.AGREEMENTS:
                    _currentStep = _agreementsForm;
                    break;
                case _C.SIGN:
                    _currentStep = _signForm;
                    break;
            }

            _currentStep.show();
        },
        getApp: function getApp() {
            // get the current application data
            return _app;
        },
        isFosterStudent: function isFosterStudent() {
            // is the form for one child who is a student and foster?
            let fosterStudent = false;

            if (_app.children && _app.children.length === 1 && _app.children[0].is_foster && _app.children[0].is_student) {
                fosterStudent = true;
            }

            return fosterStudent;
        },
        isInAssistanceProgram: function isInAssistanceProgram() {
            // has the user entered the required info for being in an assistance program?
            let result = false;

            if (_app.assistance_type && _app.assistance_case_number) {
                result = true;
            }

            return result;
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