'use strict';

let BaseForm = require('./base_form');
let uuid = require('uuid');

module.exports = class RaceForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
    }

    show() {
        super.show();
    }

    back() {
        global.ESL.Apply.showStep(global.ESL.Apply.getC().CHILDREN_INCOME);
    }

    submit() {
        super.submit();

        global.ESL.Apply.showStep(global.ESL.Apply.getC().CONTACT);
    }

    getValidData() {
        // everything is optional here so mark as valid right away
        this.isValid = true;
        let childrenAreHispanic = false;
        let childrenNotHispanic = false;
        let childrenAreAmericanIndian = false;
        let childrenAreAsian = false;
        let childrenAreBlack = false;
        let childrenArePacificIslander = false;
        let childrenAreWhite = false;

        let checkedOptions = this.elem.find('input:checked');

        $.each(checkedOptions, function(idx, option) {
            let elem = $(option);

            switch(elem.attr('name')) {
                case 'hispanic':
                    childrenAreHispanic = true;
                    break;
                case 'not-hispanic':
                    childrenNotHispanic = true;
                    break;
                case 'american-indian':
                    childrenAreAmericanIndian = true;
                    break;
                case 'asian':
                    childrenAreAsian = true;
                    break;
                case 'black':
                    childrenAreBlack = true;
                    break;
                case 'hawaiian':
                    childrenArePacificIslander = true;
                    break;
                case 'white':
                    childrenAreWhite = true;
                    break;
            }
        });

        return {
            children_are_hispanic: childrenAreHispanic,
            children_not_hispanic: childrenNotHispanic,
            children_are_american_indian: childrenAreAmericanIndian,
            children_are_asian: childrenAreAsian,
            children_are_black: childrenAreBlack,
            children_are_pacific_islander: childrenArePacificIslander,
            children_are_white: childrenAreWhite
        }
    }
};