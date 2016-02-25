'use strict';

let BaseForm = require('./base_form');
let uuid = require('uuid');

module.exports = class HouseholdChildrenForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.childTemplate = this.elem.find('#child-name-template').html();
        this.configureEventHandlers();
        this.configureSteps();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.on('keyup', 'input[type=text]', function() {
            _this.validate();
        });

        this.elem.find('.add-child').on('tap', function() {
            _this.addChild();
        });

        this.elem.on('tap', '.form-set .delete', function(e) {
            let formset = $(e.currentTarget).parents('.form-set');
            let uid = formset.attr('data-uid');

            formset.remove();
            _this.removeChild(uid);
        });
    }

    configureSteps() {
        if (global.ESL.Apply.isInAssistanceProgram()) {
            this.stepNumber = 3;
            this.totalSteps = 7;
        } else {
            this.stepNumber = 2;
            this.totalSteps = 12;
        }

        this.updateStep();
    }

    show() {
        this.showHelpIcon();
        super.show();
    }

    back() {
        if (global.ESL.Apply.isInAssistanceProgram()) {
            // if they have a case number skip other steps and go to the end
            global.ESL.Apply.showStep({step: global.ESL.Apply.getC().CASE_NUMBER, back: true});
        } else {
            global.ESL.Apply.showStep({step: global.ESL.Apply.getC().ASSISTANCE, back: true});
        }
    }

    submit() {
        super.submit();

        if (global.ESL.Apply.isInAssistanceProgram()) {
            // if they have a case number skip other steps and go to the end
            global.ESL.Apply.showStep({step: global.ESL.Apply.getC().RACE});
        } else {
            global.ESL.Apply.showStep({step: global.ESL.Apply.getC().CHILDREN_CIRCUMSTANCES});
        }

        this.elem.find('.form-set').addClass('created');
    }

    addChild() {
        this.elem.find('.add-child').before(this.childTemplate);
    }

    removeChild(uid) {
        global.ESL.Apply.removeChild(uid);
        this.validate();
    }

    getValidData() {
        let childNames = this.elem.find('.form-set');
        let children = [];

        $.each(childNames, function(idx, child) {
            let elem = $(child);
            let firstName = elem.find('input[name=child-first-name]').val();
            let middleInitial = elem.find('input[name=child-middle-initial]').val();
            let lastName = elem.find('input[name=child-last-name]').val();

            if (firstName.length > 0 && lastName.length > 0) {
                let uid = (elem.attr('data-uid')) ? elem.attr('data-uid') : uuid.v4(); // give each child a unique id

                children.push({
                    uid: uid,
                    first_name: firstName,
                    middle_initial: middleInitial,
                    last_name: lastName,
                    is_student: false,
                    is_foster: false,
                    is_homeless_migrant_runaway: false,
                    circumstances_complete: false
                });

                // update DOM with uid of child so they can be removed if needed
                elem.attr('data-uid', uid);
            }
        });

        // there must be at least one child
        this.isValid = children.length > 0;

        return {
            children: children
        }
    }
};