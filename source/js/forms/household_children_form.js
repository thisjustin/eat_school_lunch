'use strict';

let BaseForm = require('./base_form');
let uuid = require('uuid');

module.exports = class HouseholdChildrenForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.childTemplate = this.elem.find('#child-name-template').html();
        this.configureEventHandlers();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.find('input[type=text]').on('keyup', function() {
            _this.validate();
        });

        this.elem.find('.add-child').on('tap', function() {
            _this.addChild();
        });
    }

    show() {
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().ADULT_INCOME);
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep(global.ESL.Apply.getC().CHILDREN_CIRCUMSTANCES);
    }

    addChild() {
        this.elem.find('.add-child').before(this.childTemplate);
    }

    getValidData() {
        let childNames = this.elem.find('.form-group.children');
        let children = [];

        $.each(childNames, function(idx, child) {
            let firstName = $(child).find('input[name=child-first-name]').val();
            let middleInitial = $(child).find('input[name=child-middle-initial]').val();
            let lastName = $(child).find('input[name=child-last-name]').val();

            if (firstName.length > 0 && lastName.length > 0) {
                children.push({
                    uid: uuid.v4(), // give each child a unique identifier
                    first_name: firstName,
                    middle_initial: middleInitial,
                    last_name: lastName,
                    is_student: false,
                    is_foster: false,
                    is_homeless_migrant_runaway: false,
                    circumstances_complete: false
                });
            }
        });

        // there must be at least one child
        this.isValid = children.length > 0;

        return {
            children: children
        }
    }
};