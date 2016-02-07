'use strict';

let BaseForm = require('./base_form');
let _ = require('lodash');

module.exports = class ChildrenCircumstancesForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.adult = false;
        this.configureEventHandlers();
    }

    configureEventHandlers() {
        let _this = this;

        this.elem.find('input[type=checkbox]').on('change', function() {
            _this.validate();
        });
    }

    updateForm() {
        this.child = this.checkForIncompleteChildren();

        if (this.child) {
            // update form with new child's info
            this.elem.find('.child-name').text(`${this.child.first_name} ${this.child.last_name}`);
            this.elem.find('form').attr('data-child-uid', this.child.uid);
            this.elem.find('input[type=checkbox]').removeProp('checked');
        } else {
            // no more children to update, go to next step
            global.ESL.Apply.showStep(global.ESL.Apply.getC().CHILDREN_INCOME);
        }
    }

    checkForIncompleteChildren() {
        // are there additional children in household without circumstance info?
        // returns child that needs info or false
        let children = _.find(global.ESL.Apply.getApp().children, {circumstances_complete: false});

        if (children !== undefined) {
            return children;
        } else {
            return false;
        }
    }

    show() {
        this.updateForm();
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().HOUSEHOLD_CHILDREN);
    }

    submit() {
        super.submit();
        this.updateForm();
    }

    getValidData() {
        let _this = this;
        let circumstances = this.elem.find('.child-circumstances input:checked');
        let children = global.ESL.Apply.getApp().children;
        let childIndex = _.findIndex(children, function(item) {
            return item.uid === _this.child.uid;
        });

        // verify at least one item is checked
        if (circumstances.length === 0) {
            this.isValid = false;
            this.errors.push('You must select at least one option.')
            return;
        } else {
            this.isValid = true;
        }

        // update all values and mark circumstances as complete
        $.each(circumstances, function(idx, item) {
            let elem = $(item);

            switch(elem.attr('name')) {
                case 'student':
                    _this.child.is_student = true;
                    break;
                case 'foster':
                    _this.child.is_foster = true;
                    break;
                case 'homeless':
                    _this.child.is_homeless_migrant_runaway = true;
                    break;
            }
        });

        this.child.circumstances_complete = true;

        children[childIndex] = this.child;

        return {
            children: children
        }
    }
};