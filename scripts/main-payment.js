(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-payment="form"]'; //order->payment, to differentiate between selectors
    var App = window.App;

    var FormHandler = App.FormHandler;
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler();
})(window);