'use strict';

module.exports = moduleA;
function moduleA() {
    console.log(require("moduleb"));
}

moduleA()