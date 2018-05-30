/* main.js */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function Main() {

    document.addEventListener('DOMContentLoaded', function () {

        var max_rays = 500;

        var cns = document.createElement('canvas');
        var raysBody = document.getElementsByClassName("main-container")[0];
        cns.width = raysBody.offsetWidth;
        cns.height = raysBody.offsetHeight;
        raysBody.append(cns);

        var canvas = cns.getContext('2d');

        var Rays = function () {
            function Rays(canvas, progress) {
                _classCallCheck(this, Rays);

                var random = Math.random();
                this.progress = 0;
                this.canvas = canvas;

                this.x = raysBody.offsetWidth + (Math.random() * 300 - Math.random() * 300);
                this.y = raysBody.offsetHeight + (Math.random() * 300 - Math.random() * 300);
                this.s = Math.random() * 1;
                this.a = 0;
                this.w = raysBody.offsetWidth;
                this.h = raysBody.offsetHeight;
                this.radius = random > .2 ? Math.random() * 1 : Math.random() * 3;
                this.color = random > .2 ? "#fdff52" : "#feffac";
                this.radius = random > .8 ? Math.random() * 2 : this.radius;
                this.color = random > .8 ? "#feffac" : this.color;

                // this.color  = random > .1 ? "#ffae00" : "#f0ff00" // rays
                this.variantx1 = Math.random() * 300;
                this.variantx2 = Math.random() * 400;
                this.varianty1 = Math.random() * 100;
                this.varianty2 = Math.random() * 120;
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

        var rays = [];
        var init_num = popolate(max_rays);
        function popolate(num) {
            for (var i = 0; i < num; i++) {
                setTimeout(function () {
                    rays.push(new Rays(canvas, i));
                }.bind(this), i * 20);
            }
            return rays.length;
        }

        function clear() {
            canvas.globalAlpha = 0.2;
            canvas.fillStyle = "#0f0618";
            canvas.fillRect(0, 0, cns.width, cns.height);
            canvas.globalAlpha = 1;
        }

        function update() {
            rays = rays.filter(function (p) {
                return p.move();
            });
            if (rays.length < init_num) {
                popolate(1);
            }
            clear();
            requestAnimationFrame(update.bind(this));
        }
        update();

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
            elp.textContent = 'Vlad Tsiukin ' + new Date().getFullYear().toString() + ' \xA9';
            footer.insertAdjacentElement('afterbegin', elp);
        })();
    });
})();

/* ====================================================================================================== */

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

/* ===================================================================================================== */