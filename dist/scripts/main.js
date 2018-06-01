/* main.js */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function Main() {

    document.addEventListener('DOMContentLoaded', function () {

        // animate rays
        (function () {
            // set sessionStorage
            if (sessionStorage.getItem('isColor')) {
                ;
            } else {
                sessionStorage.setItem('isColor', 'false');
            }

            // set animate
            var cns = document.createElement('canvas');
            var raysBody = document.getElementsByClassName("main-container")[0];
            var btnRays = document.getElementsByClassName('btn-rays')[0];
            cns.width = raysBody.clientWidth;
            cns.height = raysBody.clientHeight;
            raysBody.append(cns);
            var canvas = cns.getContext('2d');

            var max_rays = 1000;
            var rays = [];
            var init_num = setRays(max_rays);

            function setRays(num) {
                for (var i = 0; i < num; i++) {
                    setTimeout(function () {
                        rays.push(new Rays(canvas, i, raysBody));
                    }, i * 20);
                }
                return rays.length;
            }

            function clear() {
                canvas.globalAlpha = 0.2;
                canvas.fillStyle = "#0f0618";
                canvas.fillRect(0, 0, cns.width, cns.height);
                canvas.globalAlpha = 1;
            }

            function animate() {
                rays = rays.filter(function (p) {
                    return p.move();
                });
                if (rays.length < init_num) {
                    setRays(1);
                }
                clear();
                requestAnimationFrame(animate.bind(this));
            }

            animate();

            // if session storage true => random color
            btnRays.addEventListener('click', function (event) {
                sessionStorage.getItem('isColor') === 'false' ? sessionStorage.setItem('isColor', 'true') : sessionStorage.setItem('isColor', 'false');
                window.location.reload();
            });
        })();

        // animate opasity: 
        setTimeout(function () {
            var elem = document.body;
            elem.classList.add('setOpasity');
            elem.style.opacity = 1;
        }, 1000);

        // set data footer
        (function () {
            var footer = document.querySelector('footer');
            var elp = document.createElement('p');
            elp.textContent = '\xA9 ' + new Date().getFullYear().toString() + ' Vlad Tsiukin';
            footer.insertAdjacentElement('afterbegin', elp);
        })();
    });
})();

/**
 * The Сlass creates the rays
 */

var Rays = function () {
    function Rays(canvas, progress, raysBody) {
        _classCallCheck(this, Rays);

        var random = Math.random();
        this.progress = 0;
        this.canvas = canvas;
        this.entryPointW = raysBody.clientWidth / 2;
        this.entryPointH = raysBody.clientHeight / 2;
        this.x = this.entryPointW / 2 + Math.random() * this.entryPointW;
        this.y = this.entryPointH / 2 + Math.random() * this.entryPointH;
        this.s = Math.random() * 1;
        this.a = 0;
        this.w = raysBody.clientWidth;
        this.h = raysBody.clientHeight;
        this.radius = random > .2 ? Math.random() * 1 : Math.random() * 3;
        this.color = random > .2 ? "#fdff52" : "#feffac";
        this.radius = random > .8 ? Math.random() * 2 : this.radius;
        this.color = random > .8 ? "#feffac" : this.color;

        if (sessionStorage.getItem('isColor') === 'true') {
            this.color = random > .1 ? RandomColor.setRandomRgba() : RandomColor.setRandomRgba();
        }
    }

    _createClass(Rays, [{
        key: 'render',
        value: function render() {
            this.canvas.beginPath();
            this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.canvas.lineWidth = 2;
            this.canvas.fillStyle = this.color;
            this.canvas.fill();
            this.canvas.closePath();
        }
    }, {
        key: 'move',
        value: function move() {
            this.x += Math.cos(this.a) * this.s;
            this.y += Math.sin(this.a) * this.s;
            this.a += Math.random() * 0.8 - 0.4;

            if (this.x < 0 || this.x > this.w - this.radius) {
                return false;
            }

            if (this.y < 0 || this.y > this.h - this.radius) {
                return false;
            }
            this.render();
            this.progress++;
            return true;
        }
    }]);

    return Rays;
}();

/**
 * The Class creates a random rgba color
 */


var RandomColor = function () {
    function RandomColor() {
        _classCallCheck(this, RandomColor);
    }

    _createClass(RandomColor, null, [{
        key: 'setRandomRgba',
        value: function setRandomRgba() {
            var r = this.getRandomArbitrary(0, 255);
            var g = this.getRandomArbitrary(0, 255);
            var b = this.getRandomArbitrary(0, 255);
            var a = Math.random();
            return this.getRgba(r, g, b, a);
        }
    }, {
        key: 'getRgba',
        value: function getRgba(r, g, b, a) {
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
    }, {
        key: 'getRandomArbitrary',
        value: function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }]);

    return RandomColor;
}();

/* ====================================================================================================== */