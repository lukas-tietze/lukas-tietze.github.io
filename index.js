define("main", ["require", "exports", "rxjs"], function (require, exports, rxjs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    rxjs_1.fromEvent(document, 'load').subscribe(() => console.log('loaded!'));
});
