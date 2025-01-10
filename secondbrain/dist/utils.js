"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = 'erioukdsjfkdsb1234';
    let optionsLen = options.length;
    let ans = '';
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random() * optionsLen))];
    }
    return ans;
}
