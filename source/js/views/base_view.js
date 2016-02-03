'use strict';
/*
 *   Extend this to make any new view class
 */

module.exports = class BaseView {
    constructor(cfg={}) {
        this.name = (cfg.name === undefined) ? console.error('Name is required') : cfg.name;
        this.elem = (cfg.elem === undefined) ? console.error('Elem is required') : $(cfg.elem);
    }

    show() {
        this.elem.fadeIn();
    }

    hide() {
        this.elem.hide();
    }
};