'use strict';

let BaseForm = require('./base_form');

module.exports = class AssistanceForm extends BaseForm {
    constructor(cfg={}) {
        super(cfg);
        this.toolTipShown = false;

        this.configureEventHandlers();
    }

    configureEventHandlers() {
        $('.help-tooltip .close').on('tap', function() {
           $('.help-tooltip').fadeOut(100);
        });
    }

    show() {
        let _this = this;
        this.showHelpIcon();
        super.show();

        if (!this.toolTipShown) {
            setTimeout(function() {
                _this.showToolTip();
            }, 1500);
        }
    }

    showToolTip() {
        let tooltip = $('.help-tooltip');
        let help = $('.help');
        let helpOffset = help.offset();
        // calc position
        let top = help.height() + helpOffset.top + 5;
        let left = helpOffset.left;

        tooltip.css({
            top: top,
            left: left
        });

        tooltip.fadeIn();

        this.toolTipShown = true;

        setTimeout(function() {
            tooltip.fadeOut();
        }, 10000);
    }

    back() {
        window.location.href = '/';
    }

    submit() {
        super.submit();

        if (global.ESL.Apply.getApp().assistance_type) {
            // gather case number
            global.ESL.Apply.showStep({step: global.ESL.Apply.getC().CASE_NUMBER});
        } else {
            // not a part of any assistance program
            global.ESL.Apply.showStep({step: global.ESL.Apply.getC().HOUSEHOLD_CHILDREN});
        }
    }

    getValidData() {
        let assistance = this.elem.find('input:checked').val();

        // set to null if "none" is selected
        if (assistance === 'none') {
            assistance = null;
        }

        this.isValid = true;

        return {
            assistance_type: assistance
        }
    }
};