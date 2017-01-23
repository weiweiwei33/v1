function Swipe(a, b) {
    "use strict";

    function c() {
        p = t.children, s = p.length, p.length < 2 && (b.continuous = !1), o.transitions && b.continuous && p.length < 3 && (t.appendChild(p[0].cloneNode(!0)), t.appendChild(t.children[1].cloneNode(!0)), p = t.children), q = new Array(p.length), r = a.getBoundingClientRect().width || a.offsetWidth, t.style.width = p.length * r + "px";
        for (var c = p.length; c--;) {
            var d = p[c];
            d.style.width = r + "px", d.setAttribute("data-index", c), o.transitions && (d.style.left = c * -r + "px", h(c, u > c ? -r : c > u ? r : 0, 0))
        }
        b.continuous && o.transitions && (h(f(u - 1), -r, 0), h(f(u + 1), r, 0)), o.transitions || (t.style.left = u * -r + "px"), a.style.visibility = "visible"
    }

    function d() {
        b.continuous ? g(u - 1) : u && g(u - 1)
    }

    function e() {
        b.continuous ? g(u + 1) : u < p.length - 1 && g(u + 1)
    }

    function f(a) {
        return (p.length + a % p.length) % p.length
    }

    function g(a, c) {
        if (u != a) {
            if (o.transitions) {
                var d = Math.abs(u - a) / (u - a);
                if (b.continuous) {
                    var e = d;
                    d = -q[f(a)] / r, d !== e && (a = -d * p.length + a)
                }
                for (var g = Math.abs(u - a) - 1; g--;) h(f((a > u ? a : u) - g - 1), r * d, 0);
                a = f(a), h(u, r * d, c || v), h(a, 0, c || v), b.continuous && h(f(a - d), -(r * d), 0)
            } else a = f(a), j(u * -r, a * -r, c || v);
            u = a, n(b.callback && b.callback(u, p[u]))
        }
    }

    function h(a, b, c) {
        i(a, b, c), q[a] = b
    }

    function i(a, b, c) {
        var d = p[a],
            e = d && d.style;
        e && (e.webkitTransitionDuration = e.MozTransitionDuration = e.msTransitionDuration = e.OTransitionDuration = e.transitionDuration = c + "ms", e.webkitTransform = "translate(" + b + "px,0)translateZ(0)", e.msTransform = e.MozTransform = e.OTransform = "translateX(" + b + "px)")
    }

    function j(a, c, d) {
        if (!d) return void(t.style.left = c + "px");
        var e = +new Date,
            f = setInterval(function() {
                var g = +new Date - e;
                return g > d ? (t.style.left = c + "px", y && k(), b.transitionEnd && b.transitionEnd.call(event, u, p[u]), void clearInterval(f)) : void(t.style.left = (c - a) * (Math.floor(g / d * 100) / 100) + a + "px")
            }, 4)
    }

    function k() {
        w = setTimeout(e, y)
    }

    function l() {
        y = 0, clearTimeout(w)
    }
    var m = function() {},
        n = function(a) {
            setTimeout(a || m, 0)
        },
        o = {
            addEventListener: !!window.addEventListener,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: function(a) {
                var b = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
                for (var c in b)
                    if (void 0 !== a.style[b[c]]) return !0;
                return !1
            }(document.createElement("swipe"))
        };
    if (a) {
        var p, q, r, s, t = a.children[0];
        b = b || {};
        var u = parseInt(b.startSlide, 10) || 0,
            v = b.speed || 300;
        b.continuous = void 0 !== b.continuous ? b.continuous : !0;
        var w, x, y = b.auto || 0,
            z = {},
            A = {},
            B = {
                handleEvent: function(a) {
                    switch (a.type) {
                        case "touchstart":
                            this.start(a);
                            break;
                        case "touchmove":
                            this.move(a);
                            break;
                        case "touchend":
                            n(this.end(a));
                            break;
                        case "webkitTransitionEnd":
                        case "msTransitionEnd":
                        case "oTransitionEnd":
                        case "otransitionend":
                        case "transitionend":
                            n(this.transitionEnd(a));
                            break;
                        case "resize":
                            n(c)
                    }
                    b.stopPropagation && a.stopPropagation()
                },
                start: function(a) {
                    var b = a.touches[0];
                    z = {
                        x: b.pageX,
                        y: b.pageY,
                        time: +new Date
                    }, x = void 0, A = {}, t.addEventListener("touchmove", this, !1), t.addEventListener("touchend", this, !1)
                },
                move: function(a) {
                    if (!(a.touches.length > 1 || a.scale && 1 !== a.scale)) {
                        b.disableScroll && a.preventDefault();
                        var c = a.touches[0];
                        A = {
                            x: c.pageX - z.x,
                            y: c.pageY - z.y
                        }, "undefined" == typeof x && (x = !!(x || Math.abs(A.x) < Math.abs(A.y))), x || (a.preventDefault(), l(), b.continuous ? (i(f(u - 1), A.x + q[f(u - 1)], 0), i(u, A.x + q[u], 0), i(f(u + 1), A.x + q[f(u + 1)], 0)) : (A.x = A.x / (!u && A.x > 0 || u == p.length - 1 && A.x < 0 ? Math.abs(A.x) / r + 1 : 1), i(u - 1, A.x + q[u - 1], 0), i(u, A.x + q[u], 0), i(u + 1, A.x + q[u + 1], 0)))
                    }
                },
                end: function() {
                    var a = +new Date - z.time,
                        c = Number(a) < 250 && Math.abs(A.x) > 20 || Math.abs(A.x) > r / 2,
                        d = !u && A.x > 0 || u == p.length - 1 && A.x < 0;
                    b.continuous && (d = !1);
                    var e = A.x < 0;
                    x || (c && !d ? (e ? (b.continuous ? (h(f(u - 1), -r, 0), h(f(u + 2), r, 0)) : h(u - 1, -r, 0), h(u, q[u] - r, v), h(f(u + 1), q[f(u + 1)] - r, v), u = f(u + 1)) : (b.continuous ? (h(f(u + 1), r, 0), h(f(u - 2), -r, 0)) : h(u + 1, r, 0), h(u, q[u] + r, v), h(f(u - 1), q[f(u - 1)] + r, v), u = f(u - 1)), b.callback && b.callback(u, p[u])) : b.continuous ? (h(f(u - 1), -r, v), h(u, 0, v), h(f(u + 1), r, v)) : (h(u - 1, -r, v), h(u, 0, v), h(u + 1, r, v))), t.removeEventListener("touchmove", B, !1), t.removeEventListener("touchend", B, !1)
                },
                transitionEnd: function(a) {
                    parseInt(a.target.getAttribute("data-index"), 10) == u && (y && k(), b.transitionEnd && b.transitionEnd.call(a, u, p[u]))
                }
            };
        return c(), y && k(), o.addEventListener ? (o.touch && t.addEventListener("touchstart", B, !1), o.transitions && (t.addEventListener("webkitTransitionEnd", B, !1), t.addEventListener("msTransitionEnd", B, !1), t.addEventListener("oTransitionEnd", B, !1), t.addEventListener("otransitionend", B, !1), t.addEventListener("transitionend", B, !1)), window.addEventListener("resize", B, !1)) : window.onresize = function() {
            c()
        }, {
            setup: function() {
                c()
            },
            slide: function(a, b) {
                l(), g(a, b)
            },
            prev: function() {
                l(), d()
            },
            next: function() {
                l(), e()
            },
            stop: function() {
                l()
            },
            getPos: function() {
                return u
            },
            getNumSlides: function() {
                return s
            },
            kill: function() {
                l(), t.style.width = "", t.style.left = "";
                for (var a = p.length; a--;) {
                    var b = p[a];
                    b.style.width = "", b.style.left = "", o.transitions && i(a, 0, 0)
                }
                o.addEventListener ? (t.removeEventListener("touchstart", B, !1), t.removeEventListener("webkitTransitionEnd", B, !1), t.removeEventListener("msTransitionEnd", B, !1), t.removeEventListener("oTransitionEnd", B, !1), t.removeEventListener("otransitionend", B, !1), t.removeEventListener("transitionend", B, !1), window.removeEventListener("resize", B, !1)) : window.onresize = null
            }
        }
    }
}! function(a, b, c) {
    "use strict";

    function d(a, b) {
        return b = b || Error,
            function() {
                var c, d, e = arguments[0],
                    f = "[" + (a ? a + ":" : "") + e + "] ",
                    g = arguments[1],
                    h = arguments,
                    i = function(a) {
                        return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined" : "string" != typeof a ? JSON.stringify(a) : a
                    };
                for (c = f + g.replace(/\{\d+\}/g, function(a) {
                        var b, c = +a.slice(1, -1);
                        return c + 2 < h.length ? (b = h[c + 2], "function" == typeof b ? b.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof b ? "undefined" : "string" != typeof b ? Q(b) : b) : a
                    }), c = c + "\nhttp://errors.angularjs.org/1.3.0/" + (a ? a + "/" : "") + e, d = 2; d < arguments.length; d++) c = c + (2 == d ? "?" : "&") + "p" + (d - 2) + "=" + encodeURIComponent(i(arguments[d]));
                return new b(c)
            }
    }

    function e(a) {
        if (null == a || z(a)) return !1;
        var b = a.length;
        return a.nodeType === ee && b ? !0 : u(a) || $d(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function f(a, b, c) {
        var d, g;
        if (a)
            if (x(a))
                for (d in a) "prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d, a);
            else if ($d(a) || e(a)) {
            var h = "object" != typeof a;
            for (d = 0, g = a.length; g > d; d++)(h || d in a) && b.call(c, a[d], d, a)
        } else if (a.forEach && a.forEach !== f) a.forEach(b, c, a);
        else
            for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d, a);
        return a
    }

    function g(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && b.push(c);
        return b.sort()
    }

    function h(a, b, c) {
        for (var d = g(a), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
        return d
    }

    function i(a) {
        return function(b, c) {
            a(c, b)
        }
    }

    function j() {
        return ++Yd
    }

    function k(a, b) {
        b ? a.$$hashKey = b : delete a.$$hashKey
    }

    function l(a) {
        for (var b = a.$$hashKey, c = 1, d = arguments.length; d > c; c++) {
            var e = arguments[c];
            if (e)
                for (var f = Object.keys(e), g = 0, h = f.length; h > g; g++) {
                    var i = f[g];
                    a[i] = e[i]
                }
        }
        return k(a, b), a
    }

    function m(a) {
        return parseInt(a, 10)
    }

    function n(a, b) {
        return l(new(l(function() {}, {
            prototype: a
        })), b)
    }

    function o() {}

    function p(a) {
        return a
    }

    function q(a) {
        return function() {
            return a
        }
    }

    function r(a) {
        return "undefined" == typeof a
    }

    function s(a) {
        return "undefined" != typeof a
    }

    function t(a) {
        return null !== a && "object" == typeof a
    }

    function u(a) {
        return "string" == typeof a
    }

    function v(a) {
        return "number" == typeof a
    }

    function w(a) {
        return "[object Date]" === Vd.call(a)
    }

    function x(a) {
        return "function" == typeof a
    }

    function y(a) {
        return "[object RegExp]" === Vd.call(a)
    }

    function z(a) {
        return a && a.window === a
    }

    function A(a) {
        return a && a.$evalAsync && a.$watch
    }

    function B(a) {
        return "[object File]" === Vd.call(a)
    }

    function C(a) {
        return "[object Blob]" === Vd.call(a)
    }

    function D(a) {
        return "boolean" == typeof a
    }

    function E(a) {
        return a && x(a.then)
    }

    function F(a) {
        return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
    }

    function G(a) {
        var b, c = {},
            d = a.split(",");
        for (b = 0; b < d.length; b++) c[d[b]] = !0;
        return c
    }

    function H(a) {
        return Jd(a.nodeName || a[0].nodeName)
    }

    function I(a, b) {
        var c = a.indexOf(b);
        return c >= 0 && a.splice(c, 1), b
    }

    function J(a, b, c, d) {
        if (z(a) || A(a)) throw Wd("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (b) {
            if (a === b) throw Wd("cpi", "Can't copy! Source and destination are identical.");
            if (c = c || [], d = d || [], t(a)) {
                var e = c.indexOf(a);
                if (-1 !== e) return d[e];
                c.push(a), d.push(b)
            }
            var g;
            if ($d(a)) {
                b.length = 0;
                for (var h = 0; h < a.length; h++) g = J(a[h], null, c, d), t(a[h]) && (c.push(a[h]), d.push(g)), b.push(g)
            } else {
                var i = b.$$hashKey;
                $d(b) ? b.length = 0 : f(b, function(a, c) {
                    delete b[c]
                });
                for (var j in a) a.hasOwnProperty(j) && (g = J(a[j], null, c, d), t(a[j]) && (c.push(a[j]), d.push(g)), b[j] = g);
                k(b, i)
            }
        } else if (b = a, a)
            if ($d(a)) b = J(a, [], c, d);
            else if (w(a)) b = new Date(a.getTime());
        else if (y(a)) b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex;
        else if (t(a)) {
            var l = Object.create(Object.getPrototypeOf(a));
            b = J(a, l, c, d)
        }
        return b
    }

    function K(a, b) {
        if ($d(a)) {
            b = b || [];
            for (var c = 0, d = a.length; d > c; c++) b[c] = a[c]
        } else if (t(a)) {
            b = b || {};
            for (var e in a)("$" !== e.charAt(0) || "$" !== e.charAt(1)) && (b[e] = a[e])
        }
        return b || a
    }

    function L(a, b) {
        if (a === b) return !0;
        if (null === a || null === b) return !1;
        if (a !== a && b !== b) return !0;
        var d, e, f, g = typeof a,
            h = typeof b;
        if (g == h && "object" == g) {
            if (!$d(a)) {
                if (w(a)) return w(b) ? L(a.getTime(), b.getTime()) : !1;
                if (y(a) && y(b)) return a.toString() == b.toString();
                if (A(a) || A(b) || z(a) || z(b) || $d(b)) return !1;
                f = {};
                for (e in a)
                    if ("$" !== e.charAt(0) && !x(a[e])) {
                        if (!L(a[e], b[e])) return !1;
                        f[e] = !0
                    }
                for (e in b)
                    if (!f.hasOwnProperty(e) && "$" !== e.charAt(0) && b[e] !== c && !x(b[e])) return !1;
                return !0
            }
            if (!$d(b)) return !1;
            if ((d = a.length) == b.length) {
                for (e = 0; d > e; e++)
                    if (!L(a[e], b[e])) return !1;
                return !0
            }
        }
        return !1
    }

    function M(a, b, c) {
        return a.concat(Sd.call(b, c))
    }

    function N(a, b) {
        return Sd.call(a, b || 0)
    }

    function O(a, b) {
        var c = arguments.length > 2 ? N(arguments, 2) : [];
        return !x(b) || b instanceof RegExp ? b : c.length ? function() {
            return arguments.length ? b.apply(a, c.concat(Sd.call(arguments, 0))) : b.apply(a, c)
        } : function() {
            return arguments.length ? b.apply(a, arguments) : b.call(a)
        }
    }

    function P(a, d) {
        var e = d;
        return "string" == typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? e = c : z(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : A(d) && (e = "$SCOPE"), e
    }

    function Q(a, b) {
        return "undefined" == typeof a ? c : JSON.stringify(a, P, b ? "  " : null)
    }

    function R(a) {
        return u(a) ? JSON.parse(a) : a
    }

    function S(a) {
        a = Pd(a).clone();
        try {
            a.empty()
        } catch (b) {}
        var c = Pd("<div>").append(a).html();
        try {
            return a[0].nodeType === fe ? Jd(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + Jd(b)
            })
        } catch (b) {
            return Jd(c)
        }
    }

    function T(a) {
        try {
            return decodeURIComponent(a)
        } catch (b) {}
    }

    function U(a) {
        var b, c, d = {};
        return f((a || "").split("&"), function(a) {
            if (a && (b = a.replace(/\+/g, "%20").split("="), c = T(b[0]), s(c))) {
                var e = s(b[1]) ? T(b[1]) : !0;
                Kd.call(d, c) ? $d(d[c]) ? d[c].push(e) : d[c] = [d[c], e] : d[c] = e
            }
        }), d
    }

    function V(a) {
        var b = [];
        return f(a, function(a, c) {
            $d(a) ? f(a, function(a) {
                b.push(X(c, !0) + (a === !0 ? "" : "=" + X(a, !0)))
            }) : b.push(X(c, !0) + (a === !0 ? "" : "=" + X(a, !0)))
        }), b.length ? b.join("&") : ""
    }

    function W(a) {
        return X(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function X(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+")
    }

    function Y(a, b) {
        var c, d, e = be.length;
        for (a = Pd(a), d = 0; e > d; ++d)
            if (c = be[d] + b, u(c = a.attr(c))) return c;
        return null
    }

    function Z(a, b) {
        var c, d, e = {};
        f(be, function(b) {
            var e = b + "app";
            !c && a.hasAttribute && a.hasAttribute(e) && (c = a, d = a.getAttribute(e))
        }), f(be, function(b) {
            var e, f = b + "app";
            !c && (e = a.querySelector("[" + f.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(f))
        }), c && (e.strictDi = null !== Y(c, "strict-di"), b(c, d ? [d] : [], e))
    }

    function $(c, d, e) {
        t(e) || (e = {});
        var g = {
            strictDi: !1
        };
        e = l(g, e);
        var h = function() {
                if (c = Pd(c), c.injector()) {
                    var a = c[0] === b ? "document" : S(c);
                    throw Wd("btstrpd", "App Already Bootstrapped with this Element '{0}'", a.replace(/</, "&lt;").replace(/>/, "&gt;"))
                }
                d = d || [], d.unshift(["$provide", function(a) {
                    a.value("$rootElement", c)
                }]), e.debugInfoEnabled && d.push(["$compileProvider", function(a) {
                    a.debugInfoEnabled(!0)
                }]), d.unshift("ng");
                var f = Ob(d, e.strictDi);
                return f.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
                    a.$apply(function() {
                        b.data("$injector", d), c(b)(a)
                    })
                }]), f
            },
            i = /^NG_ENABLE_DEBUG_INFO!/,
            j = /^NG_DEFER_BOOTSTRAP!/;
        return a && i.test(a.name) && (e.debugInfoEnabled = !0, a.name = a.name.replace(i, "")), a && !j.test(a.name) ? h() : (a.name = a.name.replace(j, ""), void(Xd.resumeBootstrap = function(a) {
            f(a, function(a) {
                d.push(a)
            }), h()
        }))
    }

    function _() {
        a.name = "NG_ENABLE_DEBUG_INFO!" + a.name, a.location.reload()
    }

    function ab(a) {
        return Xd.element(a).injector().get("$$testability")
    }

    function bb(a, b) {
        return b = b || "_", a.replace(ce, function(a, c) {
            return (c ? b : "") + a.toLowerCase()
        })
    }

    function cb() {
        var b;
        de || (Qd = a.jQuery, Qd && Qd.fn.on ? (Pd = Qd, l(Qd.fn, {
            scope: xe.scope,
            isolateScope: xe.isolateScope,
            controller: xe.controller,
            injector: xe.injector,
            inheritedData: xe.inheritedData
        }), b = Qd.cleanData, Qd.cleanData = function(a) {
            var c;
            if (Zd) Zd = !1;
            else
                for (var d, e = 0; null != (d = a[e]); e++) c = Qd._data(d, "events"), c && c.$destroy && Qd(d).triggerHandler("$destroy");
            b(a)
        }) : Pd = rb, Xd.element = Pd, de = !0)
    }

    function db(a, b, c) {
        if (!a) throw Wd("areq", "Argument '{0}' is {1}", b || "?", c || "required");
        return a
    }

    function eb(a, b, c) {
        return c && $d(a) && (a = a[a.length - 1]), db(x(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
    }

    function fb(a, b) {
        if ("hasOwnProperty" === a) throw Wd("badname", "hasOwnProperty is not a valid {0} name", b)
    }

    function gb(a, b, c) {
        if (!b) return a;
        for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++) d = e[h], a && (a = (f = a)[d]);
        return !c && x(a) ? O(f, a) : a
    }

    function hb(a) {
        var b = a[0],
            c = a[a.length - 1],
            d = [b];
        do {
            if (b = b.nextSibling, !b) break;
            d.push(b)
        } while (b !== c);
        return Pd(d)
    }

    function ib() {
        return Object.create(null)
    }

    function jb(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c())
        }
        var c = d("$injector"),
            e = d("ng"),
            f = b(a, "angular", Object);
        return f.$$minErr = f.$$minErr || d, b(f, "module", function() {
            var a = {};
            return function(d, f, g) {
                var h = function(a, b) {
                    if ("hasOwnProperty" === a) throw e("badname", "hasOwnProperty is not a valid {0} name", b)
                };
                return h(d, "module"), f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function() {
                    function a(a, c, d, e) {
                        return e || (e = b),
                            function() {
                                return e[d || "push"]([a, c, arguments]), j
                            }
                    }
                    if (!f) throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
                    var b = [],
                        e = [],
                        h = [],
                        i = a("$injector", "invoke", "push", e),
                        j = {
                            _invokeQueue: b,
                            _configBlocks: e,
                            _runBlocks: h,
                            requires: f,
                            name: d,
                            provider: a("$provide", "provider"),
                            factory: a("$provide", "factory"),
                            service: a("$provide", "service"),
                            value: a("$provide", "value"),
                            constant: a("$provide", "constant", "unshift"),
                            animation: a("$animateProvider", "register"),
                            filter: a("$filterProvider", "register"),
                            controller: a("$controllerProvider", "register"),
                            directive: a("$compileProvider", "directive"),
                            config: i,
                            run: function(a) {
                                return h.push(a), this
                            }
                        };
                    return g && i(g), j
                })
            }
        })
    }

    function kb(b) {
        l(b, {
            bootstrap: $,
            copy: J,
            extend: l,
            equals: L,
            element: Pd,
            forEach: f,
            injector: Ob,
            noop: o,
            bind: O,
            toJson: Q,
            fromJson: R,
            identity: p,
            isUndefined: r,
            isDefined: s,
            isString: u,
            isFunction: x,
            isObject: t,
            isNumber: v,
            isElement: F,
            isArray: $d,
            version: je,
            isDate: w,
            lowercase: Jd,
            uppercase: Ld,
            callbacks: {
                counter: 0
            },
            getTestability: ab,
            $$minErr: d,
            $$csp: ae,
            reloadWithDebugInfo: _
        }), Rd = jb(a);
        try {
            Rd("ngLocale")
        } catch (c) {
            Rd("ngLocale", []).provider("$locale", kc)
        }
        Rd("ng", ["ngLocale"], ["$provide", function(a) {
            a.provider({
                $$sanitizeUri: Mc
            }), a.provider("$compile", Vb).directive({
                a: hf,
                input: Bf,
                textarea: Bf,
                form: nf,
                script: sg,
                select: vg,
                style: xg,
                option: wg,
                ngBind: Uf,
                ngBindHtml: Wf,
                ngBindTemplate: Vf,
                ngClass: Xf,
                ngClassEven: Zf,
                ngClassOdd: Yf,
                ngCloak: $f,
                ngController: _f,
                ngForm: of ,
                ngHide: mg,
                ngIf: cg,
                ngInclude: dg,
                ngInit: fg,
                ngNonBindable: gg,
                ngPluralize: hg,
                ngRepeat: ig,
                ngShow: lg,
                ngStyle: ng,
                ngSwitch: og,
                ngSwitchWhen: pg,
                ngSwitchDefault: qg,
                ngOptions: ug,
                ngTransclude: rg,
                ngModel: Kf,
                ngList: Qf,
                ngChange: Lf,
                pattern: Nf,
                ngPattern: Nf,
                required: Mf,
                ngRequired: Mf,
                minlength: Pf,
                ngMinlength: Pf,
                maxlength: Of,
                ngMaxlength: Of,
                ngValue: Sf,
                ngModelOptions: Tf
            }).directive({
                ngInclude: eg
            }).directive(jf).directive(ag), a.provider({
                $anchorScroll: Pb,
                $animate: He,
                $browser: Sb,
                $cacheFactory: Tb,
                $controller: Zb,
                $document: $b,
                $exceptionHandler: _b,
                $filter: Zc,
                $interpolate: ic,
                $interval: jc,
                $http: ec,
                $httpBackend: gc,
                $location: xc,
                $log: yc,
                $parse: Gc,
                $rootScope: Lc,
                $q: Hc,
                $$q: Ic,
                $sce: Rc,
                $sceDelegate: Qc,
                $sniffer: Sc,
                $templateCache: Ub,
                $templateRequest: Tc,
                $$testability: Uc,
                $timeout: Vc,
                $window: Yc,
                $$rAF: Kc,
                $$asyncCallback: Qb
            })
        }])
    }

    function lb() {
        return ++le
    }

    function mb(a) {
        return a.replace(oe, function(a, b, c, d) {
            return d ? c.toUpperCase() : c
        }).replace(pe, "Moz$1")
    }

    function nb(a) {
        return !te.test(a)
    }

    function ob(a) {
        var b = a.nodeType;
        return b === ee || !b || b === he
    }

    function pb(a, b) {
        var c, d, e, g, h = b.createDocumentFragment(),
            i = [];
        if (nb(a)) i.push(b.createTextNode(a));
        else {
            for (c = c || h.appendChild(b.createElement("div")), d = (ue.exec(a) || ["", ""])[1].toLowerCase(), e = we[d] || we._default, c.innerHTML = e[1] + a.replace(ve, "<$1></$2>") + e[2], g = e[0]; g--;) c = c.lastChild;
            i = M(i, c.childNodes), c = h.firstChild, c.textContent = ""
        }
        return h.textContent = "", h.innerHTML = "", f(i, function(a) {
            h.appendChild(a)
        }), h
    }

    function qb(a, c) {
        c = c || b;
        var d;
        return (d = se.exec(a)) ? [c.createElement(d[1])] : (d = pb(a, c)) ? d.childNodes : []
    }

    function rb(a) {
        if (a instanceof rb) return a;
        var b;
        if (u(a) && (a = _d(a), b = !0), !(this instanceof rb)) {
            if (b && "<" != a.charAt(0)) throw re("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new rb(a)
        }
        b ? Bb(this, qb(a)) : Bb(this, a)
    }

    function sb(a) {
        return a.cloneNode(!0)
    }

    function tb(a, b) {
        if (b || vb(a), a.querySelectorAll)
            for (var c = a.querySelectorAll("*"), d = 0, e = c.length; e > d; d++) vb(c[d])
    }

    function ub(a, b, c, d) {
        if (s(d)) throw re("offargs", "jqLite#off() does not support the `selector` argument");
        var e = wb(a),
            g = e && e.events,
            h = e && e.handle;
        if (h)
            if (b) f(b.split(" "), function(b) {
                if (s(c)) {
                    var d = g[b];
                    if (I(d || [], c), d && d.length > 0) return
                }
                ne(a, b, h), delete g[b]
            });
            else
                for (b in g) "$destroy" !== b && ne(a, b, h), delete g[b]
    }

    function vb(a, b) {
        var d = a.ng339,
            e = d && ke[d];
        if (e) {
            if (b) return void delete e.data[b];
            e.handle && (e.events.$destroy && e.handle({}, "$destroy"), ub(a)), delete ke[d], a.ng339 = c
        }
    }

    function wb(a, b) {
        var d = a.ng339,
            e = d && ke[d];
        return b && !e && (a.ng339 = d = lb(), e = ke[d] = {
            events: {},
            data: {},
            handle: c
        }), e
    }

    function xb(a, b, c) {
        if (ob(a)) {
            var d = s(c),
                e = !d && b && !t(b),
                f = !b,
                g = wb(a, !e),
                h = g && g.data;
            if (d) h[b] = c;
            else {
                if (f) return h;
                if (e) return h && h[b];
                l(h, b)
            }
        }
    }

    function yb(a, b) {
        return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1 : !1
    }

    function zb(a, b) {
        b && a.setAttribute && f(b.split(" "), function(b) {
            a.setAttribute("class", _d((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + _d(b) + " ", " ")))
        })
    }

    function Ab(a, b) {
        if (b && a.setAttribute) {
            var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            f(b.split(" "), function(a) {
                a = _d(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
            }), a.setAttribute("class", _d(c))
        }
    }

    function Bb(a, b) {
        if (b)
            if (b.nodeType) a[a.length++] = b;
            else {
                var c = b.length;
                if ("number" == typeof c && b.window !== b) {
                    if (c)
                        for (var d = 0; c > d; d++) a[a.length++] = b[d]
                } else a[a.length++] = b
            }
    }

    function Cb(a, b) {
        return Db(a, "$" + (b || "ngController") + "Controller")
    }

    function Db(a, b, d) {
        a.nodeType == he && (a = a.documentElement);
        for (var e = $d(b) ? b : [b]; a;) {
            for (var f = 0, g = e.length; g > f; f++)
                if ((d = Pd.data(a, e[f])) !== c) return d;
            a = a.parentNode || a.nodeType === ie && a.host
        }
    }

    function Eb(a) {
        for (tb(a, !0); a.firstChild;) a.removeChild(a.firstChild)
    }

    function Fb(a, b) {
        b || tb(a);
        var c = a.parentNode;
        c && c.removeChild(a)
    }

    function Gb(b, c) {
        c = c || a, "complete" === c.document.readyState ? c.setTimeout(b) : Pd(c).on("load", b)
    }

    function Hb(a, b) {
        var c = ye[b.toLowerCase()];
        return c && ze[H(a)] && c
    }

    function Ib(a, b) {
        var c = a.nodeName;
        return ("INPUT" === c || "TEXTAREA" === c) && Ae[b]
    }

    function Jb(a, b) {
        var c = function(c, d) {
            c.isDefaultPrevented = function() {
                return c.defaultPrevented
            };
            var e = b[d || c.type],
                f = e ? e.length : 0;
            if (f) {
                if (r(c.immediatePropagationStopped)) {
                    var g = c.stopImmediatePropagation;
                    c.stopImmediatePropagation = function() {
                        c.immediatePropagationStopped = !0, c.stopPropagation && c.stopPropagation(), g && g.call(c)
                    }
                }
                c.isImmediatePropagationStopped = function() {
                    return c.immediatePropagationStopped === !0
                }, f > 1 && (e = K(e));
                for (var h = 0; f > h; h++) c.isImmediatePropagationStopped() || e[h].call(a, c)
            }
        };
        return c.elem = a, c
    }

    function Kb(a, b) {
        var c = a && a.$$hashKey;
        if (c) return "function" == typeof c && (c = a.$$hashKey()), c;
        var d = typeof a;
        return c = "function" == d || "object" == d && null !== a ? a.$$hashKey = d + ":" + (b || j)() : d + ":" + a
    }

    function Lb(a, b) {
        if (b) {
            var c = 0;
            this.nextUid = function() {
                return ++c
            }
        }
        f(a, this.put, this)
    }

    function Mb(a) {
        var b = a.toString().replace(Ee, ""),
            c = b.match(Be);
        return c ? "function(" + (c[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
    }

    function Nb(a, b, c) {
        var d, e, g, h;
        if ("function" == typeof a) {
            if (!(d = a.$inject)) {
                if (d = [], a.length) {
                    if (b) throw u(c) && c || (c = a.name || Mb(a)), Fe("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", c);
                    e = a.toString().replace(Ee, ""), g = e.match(Be), f(g[1].split(Ce), function(a) {
                        a.replace(De, function(a, b, c) {
                            d.push(c)
                        })
                    })
                }
                a.$inject = d
            }
        } else $d(a) ? (h = a.length - 1, eb(a[h], "fn"), d = a.slice(0, h)) : eb(a, "fn", !0);
        return d
    }

    function Ob(a, b) {
        function d(a) {
            return function(b, c) {
                return t(b) ? void f(b, i(a)) : a(b, c)
            }
        }

        function e(a, b) {
            if (fb(a, "service"), (x(b) || $d(b)) && (b = A.instantiate(b)), !b.$get) throw Fe("pget", "Provider '{0}' must define $get factory method.", a);
            return z[a + v] = b
        }

        function g(a, b) {
            return function() {
                var d = C.invoke(b, this, c, a);
                if (r(d)) throw Fe("undef", "Provider '{0}' must return a value from $get factory method.", a);
                return d
            }
        }

        function h(a, b, c) {
            return e(a, {
                $get: c !== !1 ? g(a, b) : b
            })
        }

        function j(a, b) {
            return h(a, ["$injector", function(a) {
                return a.instantiate(b)
            }])
        }

        function k(a, b) {
            return h(a, q(b), !1)
        }

        function l(a, b) {
            fb(a, "constant"), z[a] = b, B[a] = b
        }

        function m(a, b) {
            var c = A.get(a + v),
                d = c.$get;
            c.$get = function() {
                var a = C.invoke(d, c);
                return C.invoke(b, null, {
                    $delegate: a
                })
            }
        }

        function n(a) {
            var b, c = [];
            return f(a, function(a) {
                function d(a) {
                    var b, c;
                    for (b = 0, c = a.length; c > b; b++) {
                        var d = a[b],
                            e = A.get(d[0]);
                        e[d[1]].apply(e, d[2])
                    }
                }
                if (!y.get(a)) {
                    y.put(a, !0);
                    try {
                        u(a) ? (b = Rd(a), c = c.concat(n(b.requires)).concat(b._runBlocks), d(b._invokeQueue), d(b._configBlocks)) : x(a) ? c.push(A.invoke(a)) : $d(a) ? c.push(A.invoke(a)) : eb(a, "module")
                    } catch (e) {
                        throw $d(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), Fe("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, e.stack || e.message || e)
                    }
                }
            }), c
        }

        function p(a, c) {
            function d(b) {
                if (a.hasOwnProperty(b)) {
                    if (a[b] === s) throw Fe("cdep", "Circular dependency found: {0}", b + " <- " + w.join(" <- "));
                    return a[b]
                }
                try {
                    return w.unshift(b), a[b] = s, a[b] = c(b)
                } catch (d) {
                    throw a[b] === s && delete a[b], d
                } finally {
                    w.shift()
                }
            }

            function e(a, c, e, f) {
                "string" == typeof e && (f = e, e = null);
                var g, h, i, j = [],
                    k = Nb(a, b, f);
                for (h = 0, g = k.length; g > h; h++) {
                    if (i = k[h], "string" != typeof i) throw Fe("itkn", "Incorrect injection token! Expected service name as string, got {0}", i);
                    j.push(e && e.hasOwnProperty(i) ? e[i] : d(i))
                }
                return $d(a) && (a = a[g]), a.apply(c, j)
            }

            function f(a, b, c) {
                var d, f, g = function() {};
                return g.prototype = ($d(a) ? a[a.length - 1] : a).prototype, d = new g, f = e(a, d, b, c), t(f) || x(f) ? f : d
            }
            return {
                invoke: e,
                instantiate: f,
                get: d,
                annotate: Nb,
                has: function(b) {
                    return z.hasOwnProperty(b + v) || a.hasOwnProperty(b)
                }
            }
        }
        b = b === !0;
        var s = {},
            v = "Provider",
            w = [],
            y = new Lb([], !0),
            z = {
                $provide: {
                    provider: d(e),
                    factory: d(h),
                    service: d(j),
                    value: d(k),
                    constant: d(l),
                    decorator: m
                }
            },
            A = z.$injector = p(z, function() {
                throw Fe("unpr", "Unknown provider: {0}", w.join(" <- "))
            }),
            B = {},
            C = B.$injector = p(B, function(a) {
                var b = A.get(a + v);
                return C.invoke(b.$get, b, c, a)
            });
        return f(n(a), function(a) {
            C.invoke(a || o)
        }), C
    }

    function Pb() {
        var a = !0;
        this.disableAutoScrolling = function() {
            a = !1
        }, this.$get = ["$window", "$location", "$rootScope", function(b, c, d) {
            function e(a) {
                var b = null;
                return Array.prototype.some.call(a, function(a) {
                    return "a" === H(a) ? (b = a, !0) : void 0
                }), b
            }

            function f() {
                var a = h.yOffset;
                if (x(a)) a = a();
                else if (F(a)) {
                    var c = a[0],
                        d = b.getComputedStyle(c);
                    a = "fixed" !== d.position ? 0 : c.getBoundingClientRect().bottom
                } else v(a) || (a = 0);
                return a
            }

            function g(a) {
                if (a) {
                    a.scrollIntoView();
                    var c = f();
                    if (c) {
                        var d = a.getBoundingClientRect().top;
                        b.scrollBy(0, d - c)
                    }
                } else b.scrollTo(0, 0)
            }

            function h() {
                var a, b = c.hash();
                b ? (a = i.getElementById(b)) ? g(a) : (a = e(i.getElementsByName(b))) ? g(a) : "top" === b && g(null) : g(null)
            }
            var i = b.document;
            return a && d.$watch(function() {
                return c.hash()
            }, function(a, b) {
                (a !== b || "" !== a) && Gb(function() {
                    d.$evalAsync(h)
                })
            }), h
        }]
    }

    function Qb() {
        this.$get = ["$$rAF", "$timeout", function(a, b) {
            return a.supported ? function(b) {
                return a(b)
            } : function(a) {
                return b(a, 0, !1)
            }
        }]
    }

    function Rb(a, b, d, e) {
        function g(a) {
            try {
                a.apply(null, N(arguments, 1))
            } finally {
                if (w--, 0 === w)
                    for (; x.length;) try {
                        x.pop()()
                    } catch (b) {
                        d.error(b)
                    }
            }
        }

        function h(a, b) {
            ! function c() {
                f(z, function(a) {
                    a()
                }), y = b(c, a)
            }()
        }

        function i() {
            j(), k()
        }

        function j() {
            A = a.history.state, A = r(A) ? null : A, L(A, H) && (A = H), H = A
        }

        function k() {
            (C !== m.url() || B !== A) && (C = m.url(), B = A, f(F, function(a) {
                a(m.url(), A)
            }))
        }

        function l(a) {
            try {
                return decodeURIComponent(a)
            } catch (b) {
                return a
            }
        }
        var m = this,
            n = b[0],
            p = a.location,
            q = a.history,
            s = a.setTimeout,
            t = a.clearTimeout,
            v = {};
        m.isMock = !1;
        var w = 0,
            x = [];
        m.$$completeOutstandingRequest = g, m.$$incOutstandingRequestCount = function() {
            w++
        }, m.notifyWhenNoOutstandingRequests = function(a) {
            f(z, function(a) {
                a()
            }), 0 === w ? a() : x.push(a)
        };
        var y, z = [];
        m.addPollFn = function(a) {
            return r(y) && h(100, s), z.push(a), a
        };
        var A, B, C = p.href,
            D = b.find("base"),
            E = null;
        j(), B = A, m.url = function(b, c, d) {
            if (r(d) && (d = null), p !== a.location && (p = a.location), q !== a.history && (q = a.history), b) {
                var f = B === d;
                if (C === b && (!e.history || f)) return;
                var g = C && pc(C) === pc(b);
                return C = b, B = d, !e.history || g && f ? (g || (E = b), c ? p.replace(b) : p.href = b) : (q[c ? "replaceState" : "pushState"](d, "", b), j(), B = A), m
            }
            return E || p.href.replace(/%27/g, "'")
        }, m.state = function() {
            return A
        };
        var F = [],
            G = !1,
            H = null;
        m.onUrlChange = function(b) {
            return G || (e.history && Pd(a).on("popstate", i), Pd(a).on("hashchange", i), G = !0), F.push(b), b
        }, m.$$checkUrlChange = k, m.baseHref = function() {
            var a = D.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var I = {},
            J = "",
            K = m.baseHref();
        m.cookies = function(a, b) {
            var e, f, g, h, i;
            if (!a) {
                if (n.cookie !== J)
                    for (J = n.cookie, f = J.split("; "), I = {}, h = 0; h < f.length; h++) g = f[h], i = g.indexOf("="), i > 0 && (a = l(g.substring(0, i)), I[a] === c && (I[a] = l(g.substring(i + 1))));
                return I
            }
            b === c ? n.cookie = encodeURIComponent(a) + "=;path=" + K + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (n.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + ";path=" + K).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
        }, m.defer = function(a, b) {
            var c;
            return w++, c = s(function() {
                delete v[c], g(a)
            }, b || 0), v[c] = !0, c
        }, m.defer.cancel = function(a) {
            return v[a] ? (delete v[a], t(a), g(o), !0) : !1
        }
    }

    function Sb() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
            return new Rb(a, d, b, c)
        }]
    }

    function Tb() {
        this.$get = function() {
            function a(a, c) {
                function e(a) {
                    a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
                }

                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a))
                }
                if (a in b) throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
                var g = 0,
                    h = l({}, c, {
                        id: a
                    }),
                    i = {},
                    j = c && c.capacity || Number.MAX_VALUE,
                    k = {},
                    m = null,
                    n = null;
                return b[a] = {
                    put: function(a, b) {
                        if (j < Number.MAX_VALUE) {
                            var c = k[a] || (k[a] = {
                                key: a
                            });
                            e(c)
                        }
                        if (!r(b)) return a in i || g++, i[a] = b, g > j && this.remove(n.key), b
                    },
                    get: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b) return;
                            e(b)
                        }
                        return i[a]
                    },
                    remove: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b) return;
                            b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a]
                        }
                        delete i[a], g--
                    },
                    removeAll: function() {
                        i = {}, g = 0, k = {}, m = n = null
                    },
                    destroy: function() {
                        i = null, h = null, k = null, delete b[a]
                    },
                    info: function() {
                        return l({}, h, {
                            size: g
                        })
                    }
                }
            }
            var b = {};
            return a.info = function() {
                var a = {};
                return f(b, function(b, c) {
                    a[c] = b.info()
                }), a
            }, a.get = function(a) {
                return b[a]
            }, a
        }
    }

    function Ub() {
        this.$get = ["$cacheFactory", function(a) {
            return a("templates")
        }]
    }

    function Vb(a, d) {
        function e(a, b) {
            var c = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
                d = {};
            return f(a, function(a, e) {
                var f = a.match(c);
                if (!f) throw Ie("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", b, e, a);
                d[e] = {
                    attrName: f[3] || e,
                    mode: f[1],
                    optional: "?" === f[2]
                }
            }), d
        }
        var g = {},
            h = "Directive",
            j = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,
            k = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/,
            m = G("ngSrc,ngSrcset,src,srcset"),
            r = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
            v = /^(on[a-z]+|formaction)$/;
        this.directive = function y(b, c) {
            return fb(b, "directive"), u(b) ? (db(c, "directiveFactory"), g.hasOwnProperty(b) || (g[b] = [], a.factory(b + h, ["$injector", "$exceptionHandler", function(a, c) {
                var d = [];
                return f(g[b], function(f, g) {
                    try {
                        var h = a.invoke(f);
                        x(h) ? h = {
                            compile: q(h)
                        } : !h.compile && h.link && (h.compile = q(h.link)), h.priority = h.priority || 0, h.index = g, h.name = h.name || b, h.require = h.require || h.controller && h.name, h.restrict = h.restrict || "EA", t(h.scope) && (h.$$isolateBindings = e(h.scope, h.name)), d.push(h)
                    } catch (i) {
                        c(i)
                    }
                }), d
            }])), g[b].push(c)) : f(b, i(y)), this
        }, this.aHrefSanitizationWhitelist = function(a) {
            return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
        };
        var w = !0;
        this.debugInfoEnabled = function(a) {
            return s(a) ? (w = a, this) : w
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, d, e, i, q, s, y, z, B, C, D) {
            function E(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {}
            }

            function F(a, b, c, d, e) {
                a instanceof Pd || (a = Pd(a)), f(a, function(b, c) {
                    b.nodeType == fe && b.nodeValue.match(/\S+/) && (a[c] = Pd(b).wrap("<span></span>").parent()[0])
                });
                var g = J(a, b, a, c, d, e);
                F.$$addScopeClass(a);
                var h = null;
                return function(b, c, d, e, f) {
                    db(b, "scope"), h || (h = G(f));
                    var i;
                    if (i = "html" !== h ? Pd($(h, Pd("<div>").append(a).html())) : c ? xe.clone.call(a) : a, d)
                        for (var j in d) i.data("$" + j + "Controller", d[j].instance);
                    return F.$$addScopeInfo(i, b), c && c(i, b), g && g(b, i, i, e), i
                }
            }

            function G(a) {
                var b = a && a[0];
                return b && "foreignobject" !== H(b) && b.toString().match(/SVG/) ? "svg" : "html"
            }

            function J(a, b, d, e, f, g) {
                function h(a, d, e, f) {
                    var g, h, i, j, k, l, m, n, q;
                    if (o) {
                        var r = d.length;
                        for (q = new Array(r), k = 0; k < p.length; k += 3) m = p[k], q[m] = d[m]
                    } else q = d;
                    for (k = 0, l = p.length; l > k;) i = q[p[k++]], g = p[k++], h = p[k++], g ? (g.scope ? (j = a.$new(), F.$$addScopeInfo(Pd(i), j)) : j = a, n = g.transcludeOnThisElement ? K(a, g.transclude, f, g.elementTranscludeOnThisElement) : !g.templateOnThisElement && f ? f : !f && b ? K(a, b) : null, g(h, j, i, e, n)) : h && h(a, i.childNodes, c, f)
                }
                for (var i, j, k, l, m, n, o, p = [], q = 0; q < a.length; q++) i = new gb, j = M(a[q], [], i, 0 === q ? e : c, f), k = j.length ? Q(j, a[q], i, b, d, null, [], [], g) : null, k && k.scope && F.$$addScopeClass(i.$$element), m = k && k.terminal || !(l = a[q].childNodes) || !l.length ? null : J(l, k ? (k.transcludeOnThisElement || !k.templateOnThisElement) && k.transclude : b), (k || m) && (p.push(q, k, m), n = !0, o = o || k), g = null;
                return n ? h : null
            }

            function K(a, b, c) {
                var d = function(d, e, f, g, h) {
                    return d || (d = a.$new(!1, h), d.$$transcluded = !0), b(d, e, f, c, g)
                };
                return d
            }

            function M(a, b, c, d, e) {
                var f, g, h = a.nodeType,
                    i = c.$attr;
                switch (h) {
                    case ee:
                        T(b, Wb(H(a)), "E", d, e);
                        for (var l, m, n, o, p, q, r = a.attributes, s = 0, t = r && r.length; t > s; s++) {
                            var v = !1,
                                w = !1;
                            l = r[s], m = l.name, p = _d(l.value), o = Wb(m), (q = lb.test(o)) && (m = bb(o.substr(6), "-"));
                            var x = o.replace(/(Start|End)$/, "");
                            U(x) && o === x + "Start" && (v = m, w = m.substr(0, m.length - 5) + "end", m = m.substr(0, m.length - 6)), n = Wb(m.toLowerCase()), i[n] = m, (q || !c.hasOwnProperty(n)) && (c[n] = p, Hb(a, n) && (c[n] = !0)), ab(a, b, p, n, q), T(b, n, "A", d, e, v, w)
                        }
                        if (g = a.className, u(g) && "" !== g)
                            for (; f = k.exec(g);) n = Wb(f[2]), T(b, n, "C", d, e) && (c[n] = _d(f[3])), g = g.substr(f.index + f[0].length);
                        break;
                    case fe:
                        Z(b, a.nodeValue);
                        break;
                    case ge:
                        try {
                            f = j.exec(a.nodeValue), f && (n = Wb(f[1]), T(b, n, "M", d, e) && (c[n] = _d(f[2])))
                        } catch (y) {}
                }
                return b.sort(X), b
            }

            function O(a, b, c) {
                var d = [],
                    e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw Ie("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
                        a.nodeType == ee && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
                    } while (e > 0)
                } else d.push(a);
                return Pd(d)
            }

            function P(a, b, c) {
                return function(d, e, f, g, h) {
                    return e = O(e[0], b, c), a(d, e, f, g, h)
                }
            }

            function Q(a, g, h, i, j, k, l, m, n) {
                function o(a, b, c, d) {
                    a && (c && (a = P(a, c, d)), a.require = z.require, a.directiveName = B, (I === z || z.$$isolateScope) && (a = eb(a, {
                        isolateScope: !0
                    })), l.push(a)), b && (c && (b = P(b, c, d)), b.require = z.require, b.directiveName = B, (I === z || z.$$isolateScope) && (b = eb(b, {
                        isolateScope: !0
                    })), m.push(b))
                }

                function p(a, b, c, d) {
                    var e, g, h = "data",
                        i = !1,
                        j = c;
                    if (u(b)) {
                        if (g = b.match(r), b = b.substring(g[0].length), g[3] && (g[1] ? g[3] = null : g[1] = g[3]), "^" === g[1] ? h = "inheritedData" : "^^" === g[1] && (h = "inheritedData", j = c.parent()), "?" === g[2] && (i = !0), e = null, d && "data" === h && (e = d[b]) && (e = e.instance), e = e || j[h]("$" + b + "Controller"), !e && !i) throw Ie("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", b, a);
                        return e
                    }
                    return $d(b) && (e = [], f(b, function(b) {
                        e.push(p(a, b, c, d))
                    })), e
                }

                function v(a, b, e, i, j) {
                    function k(a, b, d) {
                        var e;
                        return A(a) || (d = b, b = a, a = c), U && (e = v), d || (d = U ? x.parent() : x), j(a, b, e, d, D)
                    }
                    var n, o, r, t, u, v, w, x, z;
                    if (g === e ? (z = h, x = h.$$element) : (x = Pd(e), z = new gb(x, h)), I && (u = b.$new(!0)), w = j && k, H && (y = {}, v = {}, f(H, function(a) {
                            var c, d = {
                                $scope: a === I || a.$$isolateScope ? u : b,
                                $element: x,
                                $attrs: z,
                                $transclude: w
                            };
                            t = a.controller, "@" == t && (t = z[a.name]), c = s(t, d, !0, a.controllerAs), v[a.name] = c, U || x.data("$" + a.name + "Controller", c.instance), y[a.name] = c
                        })), I) {
                        F.$$addScopeInfo(x, u, !0, !(J && (J === I || J === I.$$originalDirective))), F.$$addScopeClass(x, !0);
                        var B = y && y[I.name],
                            C = u;
                        B && B.identifier && I.bindToController === !0 && (C = B.instance), f(u.$$isolateBindings = I.$$isolateBindings, function(a, c) {
                            var e, f, g, h, i = a.attrName,
                                j = a.optional,
                                k = a.mode;
                            switch (k) {
                                case "@":
                                    z.$observe(i, function(a) {
                                        C[c] = a
                                    }), z.$$observers[i].$$scope = b, z[i] && (C[c] = d(z[i])(b));
                                    break;
                                case "=":
                                    if (j && !z[i]) return;
                                    f = q(z[i]), h = f.literal ? L : function(a, b) {
                                        return a === b || a !== a && b !== b
                                    }, g = f.assign || function() {
                                        throw e = C[c] = f(b), Ie("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", z[i], I.name)
                                    }, e = C[c] = f(b);
                                    var l = function(a) {
                                        return h(a, C[c]) || (h(a, e) ? g(b, a = C[c]) : C[c] = a), e = a
                                    };
                                    l.$stateful = !0;
                                    var m = b.$watch(q(z[i], l), null, f.literal);
                                    u.$on("$destroy", m);
                                    break;
                                case "&":
                                    f = q(z[i]), C[c] = function(a) {
                                        return f(b, a)
                                    }
                            }
                        })
                    }
                    for (y && (f(y, function(a) {
                            a()
                        }), y = null), n = 0, o = l.length; o > n; n++) r = l[n], fb(r, r.isolateScope ? u : b, x, z, r.require && p(r.directiveName, r.require, x, v), w);
                    var D = b;
                    for (I && (I.template || null === I.templateUrl) && (D = u), a && a(D, e.childNodes, c, j), n = m.length - 1; n >= 0; n--) r = m[n], fb(r, r.isolateScope ? u : b, x, z, r.require && p(r.directiveName, r.require, x, v), w)
                }
                n = n || {};
                for (var w, y, z, B, C, D, E, G = -Number.MAX_VALUE, H = n.controllerDirectives, I = n.newIsolateScopeDirective, J = n.templateDirective, K = n.nonTlbTranscludeDirective, Q = !1, T = !1, U = n.hasElementTranscludeDirective, X = h.$$element = Pd(g), Z = k, _ = i, ab = 0, bb = a.length; bb > ab; ab++) {
                    z = a[ab];
                    var db = z.$$start,
                        hb = z.$$end;
                    if (db && (X = O(g, db, hb)), C = c, G > z.priority) break;
                    if ((E = z.scope) && (z.templateUrl || (t(E) ? (Y("new/isolated scope", I || w, z, X), I = z) : Y("new/isolated scope", I, z, X)), w = w || z), B = z.name, !z.templateUrl && z.controller && (E = z.controller, H = H || {}, Y("'" + B + "' controller", H[B], z, X), H[B] = z), (E = z.transclude) && (Q = !0, z.$$tlb || (Y("transclusion", K, z, X), K = z), "element" == E ? (U = !0, G = z.priority, C = X, X = h.$$element = Pd(b.createComment(" " + B + ": " + h[B] + " ")), g = X[0], cb(j, N(C), g), _ = F(C, i, G, Z && Z.name, {
                            nonTlbTranscludeDirective: K
                        })) : (C = Pd(sb(g)).contents(), X.empty(), _ = F(C, i))), z.template)
                        if (T = !0, Y("template", J, z, X), J = z, E = x(z.template) ? z.template(X, h) : z.template, E = kb(E), z.replace) {
                            if (Z = z, C = nb(E) ? [] : Yb($(z.templateNamespace, _d(E))), g = C[0], 1 != C.length || g.nodeType !== ee) throw Ie("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", B, "");
                            cb(j, X, g);
                            var ib = {
                                    $attr: {}
                                },
                                jb = M(g, [], ib),
                                lb = a.splice(ab + 1, a.length - (ab + 1));
                            I && R(jb), a = a.concat(jb).concat(lb), V(h, ib), bb = a.length
                        } else X.html(E);
                    if (z.templateUrl) T = !0, Y("template", J, z, X), J = z, z.replace && (Z = z), v = W(a.splice(ab, a.length - ab), X, h, j, Q && _, l, m, {
                        controllerDirectives: H,
                        newIsolateScopeDirective: I,
                        templateDirective: J,
                        nonTlbTranscludeDirective: K
                    }), bb = a.length;
                    else if (z.compile) try {
                        D = z.compile(X, h, _), x(D) ? o(null, D, db, hb) : D && o(D.pre, D.post, db, hb)
                    } catch (mb) {
                        e(mb, S(X))
                    }
                    z.terminal && (v.terminal = !0, G = Math.max(G, z.priority))
                }
                return v.scope = w && w.scope === !0, v.transcludeOnThisElement = Q, v.elementTranscludeOnThisElement = U, v.templateOnThisElement = T, v.transclude = _, n.hasElementTranscludeDirective = U, v
            }

            function R(a) {
                for (var b = 0, c = a.length; c > b; b++) a[b] = n(a[b], {
                    $$isolateScope: !0
                })
            }

            function T(b, d, f, i, j, k, l) {
                if (d === j) return null;
                var m = null;
                if (g.hasOwnProperty(d))
                    for (var o, p = a.get(d + h), q = 0, r = p.length; r > q; q++) try {
                        o = p[q], (i === c || i > o.priority) && -1 != o.restrict.indexOf(f) && (k && (o = n(o, {
                            $$start: k,
                            $$end: l
                        })), b.push(o), m = o)
                    } catch (s) {
                        e(s)
                    }
                return m
            }

            function U(b) {
                if (g.hasOwnProperty(b))
                    for (var c, d = a.get(b + h), e = 0, f = d.length; f > e; e++)
                        if (c = d[e], c.multiElement) return !0;
                return !1
            }

            function V(a, b) {
                var c = b.$attr,
                    d = a.$attr,
                    e = a.$$element;
                f(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
                }), f(b, function(b, f) {
                    "class" == f ? (E(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            }

            function W(a, b, c, d, e, g, h, j) {
                var k, m, n = [],
                    o = b[0],
                    p = a.shift(),
                    q = l({}, p, {
                        templateUrl: null,
                        transclude: null,
                        replace: null,
                        $$originalDirective: p
                    }),
                    r = x(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl,
                    s = p.templateNamespace;
                return b.empty(), i(B.getTrustedResourceUrl(r)).then(function(i) {
                        var l, u, v, w;
                        if (i = kb(i), p.replace) {
                            if (v = nb(i) ? [] : Yb($(s, _d(i))), l = v[0], 1 != v.length || l.nodeType !== ee) throw Ie("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", p.name, r);
                            u = {
                                $attr: {}
                            }, cb(d, b, l);
                            var x = M(l, [], u);
                            t(p.scope) && R(x), a = x.concat(a), V(c, u)
                        } else l = o, b.html(i);
                        for (a.unshift(q), k = Q(a, l, c, e, b, p, g, h, j), f(d, function(a, c) {
                                a == l && (d[c] = b[0])
                            }), m = J(b[0].childNodes, e); n.length;) {
                            var y = n.shift(),
                                z = n.shift(),
                                A = n.shift(),
                                B = n.shift(),
                                C = b[0];
                            if (!y.$$destroyed) {
                                if (z !== o) {
                                    var D = z.className;
                                    j.hasElementTranscludeDirective && p.replace || (C = sb(l)), cb(A, Pd(z), C), E(Pd(C), D)
                                }
                                w = k.transcludeOnThisElement ? K(y, k.transclude, B) : B, k(m, y, C, d, w)
                            }
                        }
                        n = null
                    }),
                    function(a, b, c, d, e) {
                        var f = e;
                        b.$$destroyed || (n ? (n.push(b), n.push(c), n.push(d), n.push(f)) : (k.transcludeOnThisElement && (f = K(b, k.transclude, e)), k(m, b, c, d, f)))
                    }
            }

            function X(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
            }

            function Y(a, b, c, d) {
                if (b) throw Ie("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", b.name, c.name, a, S(d))
            }

            function Z(a, b) {
                var c = d(b, !0);
                c && a.push({
                    priority: 0,
                    compile: function(a) {
                        var b = a.parent(),
                            d = !!b.length;
                        return d && F.$$addBindingClass(b),
                            function(a, b) {
                                var e = b.parent();
                                d || F.$$addBindingClass(e), F.$$addBindingInfo(e, c.expressions), a.$watch(c, function(a) {
                                    b[0].nodeValue = a
                                })
                            }
                    }
                })
            }

            function $(a, c) {
                switch (a = Jd(a || "html")) {
                    case "svg":
                    case "math":
                        var d = b.createElement("div");
                        return d.innerHTML = "<" + a + ">" + c + "</" + a + ">", d.childNodes[0].childNodes;
                    default:
                        return c
                }
            }

            function _(a, b) {
                if ("srcdoc" == b) return B.HTML;
                var c = H(a);
                return "xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b) ? B.RESOURCE_URL : void 0
            }

            function ab(a, b, c, e, f) {
                var g = d(c, !0);
                if (g) {
                    if ("multiple" === e && "select" === H(a)) throw Ie("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", S(a));
                    b.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(b, c, h) {
                                    var i = h.$$observers || (h.$$observers = {});
                                    if (v.test(e)) throw Ie("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    h[e] && (g = d(h[e], !0, _(a, e), m[e] || f), g && (h[e] = g(b), (i[e] || (i[e] = [])).$$inter = !0, (h.$$observers && h.$$observers[e].$$scope || b).$watch(g, function(a, b) {
                                        "class" === e && a != b ? h.$updateClass(a, b) : h.$set(e, a)
                                    })))
                                }
                            }
                        }
                    })
                }
            }

            function cb(a, c, d) {
                var e, f, g = c[0],
                    h = c.length,
                    i = g.parentNode;
                if (a)
                    for (e = 0, f = a.length; f > e; e++)
                        if (a[e] == g) {
                            a[e++] = d;
                            for (var j = e, k = j + h - 1, l = a.length; l > j; j++, k++) l > k ? a[j] = a[k] : delete a[j];
                            a.length -= h - 1, a.context === g && (a.context = d);
                            break
                        }
                i && i.replaceChild(d, g);
                var m = b.createDocumentFragment();
                m.appendChild(g), Pd(d).data(Pd(g).data()), Qd ? (Zd = !0, Qd.cleanData([g])) : delete Pd.cache[g[Pd.expando]];
                for (var n = 1, o = c.length; o > n; n++) {
                    var p = c[n];
                    Pd(p).remove(), m.appendChild(p), delete c[n]
                }
                c[0] = d, c.length = 1
            }

            function eb(a, b) {
                return l(function() {
                    return a.apply(null, arguments)
                }, a, b)
            }

            function fb(a, b, c, d, f, g) {
                try {
                    a(b, c, d, f, g)
                } catch (h) {
                    e(h, S(c))
                }
            }
            var gb = function(a, b) {
                if (b) {
                    var c, d, e, f = Object.keys(b);
                    for (c = 0, d = f.length; d > c; c++) e = f[c], this[e] = b[e]
                } else this.$attr = {};
                this.$$element = a
            };
            gb.prototype = {
                $normalize: Wb,
                $addClass: function(a) {
                    a && a.length > 0 && C.addClass(this.$$element, a)
                },
                $removeClass: function(a) {
                    a && a.length > 0 && C.removeClass(this.$$element, a)
                },
                $updateClass: function(a, b) {
                    var c = Xb(a, b);
                    c && c.length && C.addClass(this.$$element, c);
                    var d = Xb(b, a);
                    d && d.length && C.removeClass(this.$$element, d)
                },
                $set: function(a, b, d, g) {
                    var h, i = this.$$element[0],
                        j = Hb(i, a),
                        k = Ib(i, a),
                        l = a;
                    if (j ? (this.$$element.prop(a, b), g = j) : k && (this[k] = b, l = k), this[a] = b, g ? this.$attr[a] = g : (g = this.$attr[a], g || (this.$attr[a] = g = bb(a, "-"))), h = H(this.$$element), "a" === h && "href" === a || "img" === h && "src" === a) this[a] = b = D(b, "src" === a);
                    else if ("img" === h && "srcset" === a) {
                        for (var m = "", n = _d(b), o = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, p = /\s/.test(n) ? o : /(,)/, q = n.split(p), r = Math.floor(q.length / 2), s = 0; r > s; s++) {
                            var t = 2 * s;
                            m += D(_d(q[t]), !0), m += " " + _d(q[t + 1])
                        }
                        var u = _d(q[2 * s]).split(/\s/);
                        m += D(_d(u[0]), !0), 2 === u.length && (m += " " + _d(u[1])), this[a] = b = m
                    }
                    d !== !1 && (null === b || b === c ? this.$$element.removeAttr(g) : this.$$element.attr(g, b));
                    var v = this.$$observers;
                    v && f(v[l], function(a) {
                        try {
                            a(b)
                        } catch (c) {
                            e(c)
                        }
                    })
                },
                $observe: function(a, b) {
                    var c = this,
                        d = c.$$observers || (c.$$observers = ib()),
                        e = d[a] || (d[a] = []);
                    return e.push(b), y.$evalAsync(function() {
                            e.$$inter || b(c[a])
                        }),
                        function() {
                            I(e, b)
                        }
                }
            };
            var hb = d.startSymbol(),
                jb = d.endSymbol(),
                kb = "{{" == hb || "}}" == jb ? p : function(a) {
                    return a.replace(/\{\{/g, hb).replace(/}}/g, jb)
                },
                lb = /^ngAttr[A-Z]/;
            return F.$$addBindingInfo = w ? function(a, b) {
                var c = a.data("$binding") || [];
                $d(b) ? c = c.concat(b) : c.push(b), a.data("$binding", c)
            } : o, F.$$addBindingClass = w ? function(a) {
                E(a, "ng-binding")
            } : o, F.$$addScopeInfo = w ? function(a, b, c, d) {
                var e = c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                a.data(e, b)
            } : o, F.$$addScopeClass = w ? function(a, b) {
                E(a, b ? "ng-isolate-scope" : "ng-scope")
            } : o, F
        }]
    }

    function Wb(a) {
        return mb(a.replace(Je, ""))
    }

    function Xb(a, b) {
        var c = "",
            d = a.split(/\s+/),
            e = b.split(/\s+/);
        a: for (var f = 0; f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++)
                if (g == e[h]) continue a;
            c += (c.length > 0 ? " " : "") + g
        }
        return c
    }

    function Yb(a) {
        a = Pd(a);
        var b = a.length;
        if (1 >= b) return a;
        for (; b--;) {
            var c = a[b];
            c.nodeType === ge && Td.call(a, b, 1)
        }
        return a
    }

    function Zb() {
        var a = {},
            b = !1,
            e = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(b, c) {
            fb(b, "controller"), t(b) ? l(a, b) : a[b] = c
        }, this.allowGlobals = function() {
            b = !0
        }, this.$get = ["$injector", "$window", function(f, g) {
            function h(a, b, c, e) {
                if (!a || !t(a.$scope)) throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", e, b);
                a.$scope[b] = c
            }
            return function(d, i, j, k) {
                var m, n, o, p;
                if (j = j === !0, k && u(k) && (p = k), u(d) && (n = d.match(e), o = n[1], p = p || n[3], d = a.hasOwnProperty(o) ? a[o] : gb(i.$scope, o, !0) || (b ? gb(g, o, !0) : c), eb(d, o, !0)), j) {
                    var q = function() {};
                    return q.prototype = ($d(d) ? d[d.length - 1] : d).prototype, m = new q, p && h(i, p, m, o || d.name), l(function() {
                        return f.invoke(d, m, i, o), m
                    }, {
                        instance: m,
                        identifier: p
                    })
                }
                return m = f.instantiate(d, i, o), p && h(i, p, m, o || d.name), m
            }
        }]
    }

    function $b() {
        this.$get = ["$window", function(a) {
            return Pd(a.document)
        }]
    }

    function _b() {
        this.$get = ["$log", function(a) {
            return function() {
                a.error.apply(a, arguments)
            }
        }]
    }

    function ac(a) {
        var b, c, d, e = {};
        return a ? (f(a.split("\n"), function(a) {
            d = a.indexOf(":"), b = Jd(_d(a.substr(0, d))), c = _d(a.substr(d + 1)), b && (e[b] = e[b] ? e[b] + ", " + c : c)
        }), e) : e
    }

    function bc(a) {
        var b = t(a) ? a : c;
        return function(c) {
            return b || (b = ac(a)), c ? b[Jd(c)] || null : b
        }
    }

    function cc(a, b, c) {
        return x(c) ? c(a, b) : (f(c, function(c) {
            a = c(a, b)
        }), a)
    }

    function dc(a) {
        return a >= 200 && 300 > a
    }

    function ec() {
        var a = /^\s*(\[|\{[^\{])/,
            b = /[\}\]]\s*$/,
            d = /^\)\]\}',?\n/,
            e = "application/json",
            g = {
                "Content-Type": e + ";charset=utf-8"
            },
            i = this.defaults = {
                transformResponse: [function(c, f) {
                    if (u(c)) {
                        c = c.replace(d, "");
                        var g = f("Content-Type");
                        (g && 0 === g.indexOf(e) || a.test(c) && b.test(c)) && (c = R(c))
                    }
                    return c
                }],
                transformRequest: [function(a) {
                    return !t(a) || B(a) || C(a) ? a : Q(a)
                }],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: K(g),
                    put: K(g),
                    patch: K(g)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
            },
            j = !1;
        this.useApplyAsync = function(a) {
            return s(a) ? (j = !!a, this) : j
        };
        var k = this.interceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, d, e, g, m) {
            function n(a) {
                function b(a) {
                    var b = l({}, a);
                    return b.data = a.data ? cc(a.data, a.headers, e.transformResponse) : a.data, dc(a.status) ? b : g.reject(b)
                }

                function d(a) {
                    function b(a) {
                        var b;
                        f(a, function(c, d) {
                            x(c) && (b = c(), null != b ? a[d] = b : delete a[d])
                        })
                    }
                    var c, d, e, g = i.headers,
                        h = l({}, a.headers);
                    g = l({}, g.common, g[Jd(a.method)]);
                    a: for (c in g) {
                        d = Jd(c);
                        for (e in h)
                            if (Jd(e) === d) continue a;
                        h[c] = g[c]
                    }
                    return b(h), h
                }
                var e = {
                        method: "get",
                        transformRequest: i.transformRequest,
                        transformResponse: i.transformResponse
                    },
                    h = d(a);
                l(e, a), e.headers = h, e.method = Ld(e.method);
                var j = function(a) {
                        h = a.headers;
                        var c = cc(a.data, bc(h), a.transformRequest);
                        return r(c) && f(h, function(a, b) {
                            "content-type" === Jd(b) && delete h[b]
                        }), r(a.withCredentials) && !r(i.withCredentials) && (a.withCredentials = i.withCredentials), q(a, c, h).then(b, b)
                    },
                    k = [j, c],
                    m = g.when(e);
                for (f(z, function(a) {
                        (a.request || a.requestError) && k.unshift(a.request, a.requestError), (a.response || a.responseError) && k.push(a.response, a.responseError)
                    }); k.length;) {
                    var n = k.shift(),
                        o = k.shift();
                    m = m.then(n, o)
                }
                return m.success = function(a) {
                    return m.then(function(b) {
                        a(b.data, b.status, b.headers, e)
                    }), m
                }, m.error = function(a) {
                    return m.then(null, function(b) {
                        a(b.data, b.status, b.headers, e)
                    }), m
                }, m
            }

            function o() {
                f(arguments, function(a) {
                    n[a] = function(b, c) {
                        return n(l(c || {}, {
                            method: a,
                            url: b
                        }))
                    }
                })
            }

            function p() {
                f(arguments, function(a) {
                    n[a] = function(b, c, d) {
                        return n(l(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }))
                    }
                })
            }

            function q(d, f, h) {
                function k(a, b, c, d) {
                    function f() {
                        l(b, a, c, d)
                    }
                    o && (dc(a) ? o.put(w, [a, b, ac(c), d]) : o.remove(w)), j ? e.$applyAsync(f) : (f(), e.$$phase || e.$apply())
                }

                function l(a, b, c, e) {
                    b = Math.max(b, 0), (dc(b) ? q.resolve : q.reject)({
                        data: a,
                        status: b,
                        headers: bc(c),
                        config: d,
                        statusText: e
                    })
                }

                function m() {
                    var a = n.pendingRequests.indexOf(d); - 1 !== a && n.pendingRequests.splice(a, 1)
                }
                var o, p, q = g.defer(),
                    u = q.promise,
                    w = v(d.url, d.params);
                if (n.pendingRequests.push(d), u.then(m, m), !d.cache && !i.cache || d.cache === !1 || "GET" !== d.method && "JSONP" !== d.method || (o = t(d.cache) ? d.cache : t(i.cache) ? i.cache : y), o)
                    if (p = o.get(w), s(p)) {
                        if (E(p)) return p.then(m, m), p;
                        $d(p) ? l(p[1], p[0], K(p[2]), p[3]) : l(p, 200, {}, "OK")
                    } else o.put(w, u);
                if (r(p)) {
                    var x = Xc(d.url) ? b.cookies()[d.xsrfCookieName || i.xsrfCookieName] : c;
                    x && (h[d.xsrfHeaderName || i.xsrfHeaderName] = x), a(d.method, w, f, k, h, d.timeout, d.withCredentials, d.responseType)
                }
                return u
            }

            function v(a, b) {
                if (!b) return a;
                var c = [];
                return h(b, function(a, b) {
                    null === a || r(a) || ($d(a) || (a = [a]), f(a, function(a) {
                        t(a) && (a = w(a) ? a.toISOString() : Q(a)), c.push(X(b) + "=" + X(a))
                    }))
                }), c.length > 0 && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")), a
            }
            var y = d("$http"),
                z = [];
            return f(k, function(a) {
                z.unshift(u(a) ? m.get(a) : m.invoke(a))
            }), n.pendingRequests = [], o("get", "delete", "head", "jsonp"), p("post", "put", "patch"), n.defaults = i, n
        }]
    }

    function fc() {
        return new a.XMLHttpRequest
    }

    function gc() {
        this.$get = ["$browser", "$window", "$document", function(a, b, c) {
            return hc(a, fc, a.defer, b.angular.callbacks, c[0])
        }]
    }

    function hc(a, b, c, d, e) {
        function g(a, b, c) {
            var f = e.createElement("script"),
                g = null;
            return f.type = "text/javascript", f.src = a, f.async = !0, g = function(a) {
                ne(f, "load", g), ne(f, "error", g), e.body.removeChild(f), f = null;
                var h = -1,
                    i = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {
                    type: "error"
                }), i = a.type, h = "error" === a.type ? 404 : 200), c && c(h, i)
            }, me(f, "load", g), me(f, "error", g), e.body.appendChild(f), g
        }
        return function(e, h, i, j, k, l, m, n) {
            function p() {
                t && t(), u && u.abort()
            }

            function q(b, d, e, f, g) {
                x && c.cancel(x), t = u = null, b(d, e, f, g), a.$$completeOutstandingRequest(o)
            }
            if (a.$$incOutstandingRequestCount(), h = h || a.url(), "jsonp" == Jd(e)) {
                var r = "_" + (d.counter++).toString(36);
                d[r] = function(a) {
                    d[r].data = a, d[r].called = !0
                };
                var t = g(h.replace("JSON_CALLBACK", "angular.callbacks." + r), r, function(a, b) {
                    q(j, a, d[r].data, "", b), d[r] = o
                })
            } else {
                var u = b();
                u.open(e, h, !0), f(k, function(a, b) {
                    s(a) && u.setRequestHeader(b, a)
                }), u.onload = function() {
                    var a = u.statusText || "",
                        b = "response" in u ? u.response : u.responseText,
                        c = 1223 === u.status ? 204 : u.status;
                    0 === c && (c = b ? 200 : "file" == Wc(h).protocol ? 404 : 0), q(j, c, b, u.getAllResponseHeaders(), a)
                };
                var v = function() {
                    q(j, -1, null, null, "")
                };
                if (u.onerror = v, u.onabort = v, m && (u.withCredentials = !0), n) try {
                    u.responseType = n
                } catch (w) {
                    if ("json" !== n) throw w
                }
                u.send(i || null)
            }
            if (l > 0) var x = c(p, l);
            else E(l) && l.then(p)
        }
    }

    function ic() {
        var a = "{{",
            b = "}}";
        this.startSymbol = function(b) {
            return b ? (a = b, this) : a
        }, this.endSymbol = function(a) {
            return a ? (b = a, this) : b
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(a) {
                return "\\\\\\" + a
            }

            function g(f, g, m, n) {
                function o(c) {
                    return c.replace(j, a).replace(k, b)
                }

                function p(a) {
                    try {
                        return D(C(a))
                    } catch (b) {
                        var c = Ke("interr", "Can't interpolate: {0}\n{1}", f, b.toString());
                        d(c)
                    }
                }
                n = !!n;
                for (var q, s, t, u = 0, v = [], w = [], y = f.length, z = [], A = []; y > u;) {
                    if (-1 == (q = f.indexOf(a, u)) || -1 == (s = f.indexOf(b, q + h))) {
                        u !== y && z.push(o(f.substring(u)));
                        break
                    }
                    u !== q && z.push(o(f.substring(u, q))), t = f.substring(q + h, s), v.push(t), w.push(c(t, p)), u = s + i, A.push(z.length), z.push("")
                }
                if (m && z.length > 1) throw Ke("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", f);
                if (!g || v.length) {
                    var B = function(a) {
                            for (var b = 0, c = v.length; c > b; b++) {
                                if (n && r(a[b])) return;
                                z[A[b]] = a[b]
                            }
                            return z.join("")
                        },
                        C = function(a) {
                            return m ? e.getTrusted(m, a) : e.valueOf(a)
                        },
                        D = function(a) {
                            if (null == a) return "";
                            switch (typeof a) {
                                case "string":
                                    break;
                                case "number":
                                    a = "" + a;
                                    break;
                                default:
                                    a = Q(a)
                            }
                            return a
                        };
                    return l(function(a) {
                        var b = 0,
                            c = v.length,
                            e = new Array(c);
                        try {
                            for (; c > b; b++) e[b] = w[b](a);
                            return B(e)
                        } catch (g) {
                            var h = Ke("interr", "Can't interpolate: {0}\n{1}", f, g.toString());
                            d(h)
                        }
                    }, {
                        exp: f,
                        expressions: v,
                        $$watchDelegate: function(a, b, c) {
                            var d;
                            return a.$watchGroup(w, function(c, e) {
                                var f = B(c);
                                x(b) && b.call(this, f, c !== e ? d : f, a), d = f
                            }, c)
                        }
                    })
                }
            }
            var h = a.length,
                i = b.length,
                j = new RegExp(a.replace(/./g, f), "g"),
                k = new RegExp(b.replace(/./g, f), "g");
            return g.startSymbol = function() {
                return a
            }, g.endSymbol = function() {
                return b
            }, g
        }]
    }

    function jc() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", function(a, b, c, d) {
            function e(e, g, h, i) {
                var j = b.setInterval,
                    k = b.clearInterval,
                    l = 0,
                    m = s(i) && !i,
                    n = (m ? d : c).defer(),
                    o = n.promise;
                return h = s(h) ? h : 0, o.then(null, null, e), o.$$intervalId = j(function() {
                    n.notify(l++), h > 0 && l >= h && (n.resolve(l), k(o.$$intervalId), delete f[o.$$intervalId]), m || a.$apply()
                }, g), f[o.$$intervalId] = n, o
            }
            var f = {};
            return e.cancel = function(a) {
                return a && a.$$intervalId in f ? (f[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete f[a.$$intervalId], !0) : !1
            }, e
        }]
    }

    function kc() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(a) {
                    return 1 === a ? "one" : "other"
                }
            }
        }
    }

    function lc(a) {
        for (var b = a.split("/"), c = b.length; c--;) b[c] = W(b[c]);
        return b.join("/")
    }

    function mc(a, b, c) {
        var d = Wc(a, c);
        b.$$protocol = d.protocol, b.$$host = d.hostname, b.$$port = m(d.port) || Me[d.protocol] || null
    }

    function nc(a, b, c) {
        var d = "/" !== a.charAt(0);
        d && (a = "/" + a);
        var e = Wc(a, c);
        b.$$path = decodeURIComponent(d && "/" === e.pathname.charAt(0) ? e.pathname.substring(1) : e.pathname), b.$$search = U(e.search), b.$$hash = decodeURIComponent(e.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
    }

    function oc(a, b) {
        return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
    }

    function pc(a) {
        var b = a.indexOf("#");
        return -1 == b ? a : a.substr(0, b)
    }

    function qc(a) {
        return a.substr(0, pc(a).lastIndexOf("/") + 1)
    }

    function rc(a) {
        return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
    }

    function sc(a, b) {
        this.$$html5 = !0, b = b || "";
        var d = qc(a);
        mc(a, this, a), this.$$parse = function(b) {
            var c = oc(d, b);
            if (!u(c)) throw Ne("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', b, d);
            nc(c, this, a), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function() {
            var a = V(this.$$search),
                b = this.$$hash ? "#" + W(this.$$hash) : "";
            this.$$url = lc(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
        }, this.$$parseLinkUrl = function(e, f) {
            if (f && "#" === f[0]) return this.hash(f.slice(1)), !0;
            var g, h, i;
            return (g = oc(a, e)) !== c ? (h = g, i = (g = oc(b, g)) !== c ? d + (oc("/", g) || g) : a + h) : (g = oc(d, e)) !== c ? i = d + g : d == e + "/" && (i = d), i && this.$$parse(i), !!i
        }
    }

    function tc(a, b) {
        var c = qc(a);
        mc(a, this, a), this.$$parse = function(d) {
            function e(a, b, c) {
                var d, e = /^\/[A-Z]:(\/.*)/;
                return 0 === b.indexOf(c) && (b = b.replace(c, "")), e.exec(b) ? a : (d = e.exec(a), d ? d[1] : a)
            }
            var f = oc(a, d) || oc(c, d),
                g = "#" == f.charAt(0) ? oc(b, f) : this.$$html5 ? f : "";
            if (!u(g)) throw Ne("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', d, b);
            nc(g, this, a), this.$$path = e(this.$$path, g, a), this.$$compose()
        }, this.$$compose = function() {
            var c = V(this.$$search),
                d = this.$$hash ? "#" + W(this.$$hash) : "";
            this.$$url = lc(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
        }, this.$$parseLinkUrl = function(b) {
            return pc(a) == pc(b) ? (this.$$parse(b), !0) : !1
        }
    }

    function uc(a, b) {
        this.$$html5 = !0, tc.apply(this, arguments);
        var c = qc(a);
        this.$$parseLinkUrl = function(d, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            return a == pc(d) ? f = d : (g = oc(c, d)) ? f = a + b + g : c === d + "/" && (f = c), f && this.$$parse(f), !!f
        }, this.$$compose = function() {
            var c = V(this.$$search),
                d = this.$$hash ? "#" + W(this.$$hash) : "";
            this.$$url = lc(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + b + this.$$url
        }
    }

    function vc(a) {
        return function() {
            return this[a]
        }
    }

    function wc(a, b) {
        return function(c) {
            return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
        }
    }

    function xc() {
        var b = "",
            c = {
                enabled: !1,
                requireBase: !0,
                rewriteLinks: !0
            };
        this.hashPrefix = function(a) {
            return s(a) ? (b = a, this) : b
        }, this.html5Mode = function(a) {
            return D(a) ? (c.enabled = a, this) : t(a) ? (D(a.enabled) && (c.enabled = a.enabled), D(a.requireBase) && (c.requireBase = a.requireBase), D(a.rewriteLinks) && (c.rewriteLinks = a.rewriteLinks), this) : c
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(d, e, f, g) {
            function h(a, b, c) {
                var d = j.url(),
                    f = j.$$state;
                try {
                    e.url(a, b, c), j.$$state = e.state()
                } catch (g) {
                    throw j.url(d), j.$$state = f, g
                }
            }

            function i(a, b) {
                d.$broadcast("$locationChangeSuccess", j.absUrl(), a, j.$$state, b)
            }
            var j, k, l, m = e.baseHref(),
                n = e.url();
            if (c.enabled) {
                if (!m && c.requireBase) throw Ne("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                l = rc(n) + (m || "/"), k = f.history ? sc : uc
            } else l = pc(n), k = tc;
            j = new k(l, "#" + b), j.$$parseLinkUrl(n, n), j.$$state = e.state();
            var o = /^\s*(javascript|mailto):/i;
            g.on("click", function(b) {
                if (c.rewriteLinks && !b.ctrlKey && !b.metaKey && 2 != b.which) {
                    for (var f = Pd(b.target);
                        "a" !== H(f[0]);)
                        if (f[0] === g[0] || !(f = f.parent())[0]) return;
                    var h = f.prop("href"),
                        i = f.attr("href") || f.attr("xlink:href");
                    t(h) && "[object SVGAnimatedString]" === h.toString() && (h = Wc(h.animVal).href), o.test(h) || !h || f.attr("target") || b.isDefaultPrevented() || j.$$parseLinkUrl(h, i) && (b.preventDefault(), j.absUrl() != e.url() && (d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                }
            }), j.absUrl() != n && e.url(j.absUrl(), !0);
            var p = !0;
            return e.onUrlChange(function(a, b) {
                d.$evalAsync(function() {
                    var c = j.absUrl(),
                        e = j.$$state;
                    j.$$parse(a), j.$$state = b, d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented ? (j.$$parse(c), j.$$state = e, h(c, !1, e)) : (p = !1, i(c, e))
                }), d.$$phase || d.$digest()
            }), d.$watch(function() {
                var a = e.url(),
                    b = e.state(),
                    c = j.$$replace,
                    g = a !== j.absUrl() || j.$$html5 && f.history && b !== j.$$state;
                (p || g) && (p = !1, d.$evalAsync(function() {
                    d.$broadcast("$locationChangeStart", j.absUrl(), a, j.$$state, b).defaultPrevented ? (j.$$parse(a), j.$$state = b) : (g && h(j.absUrl(), c, b === j.$$state ? null : j.$$state), i(a, b))
                })), j.$$replace = !1
            }), j
        }]
    }

    function yc() {
        var a = !0,
            b = this;
        this.debugEnabled = function(b) {
            return s(b) ? (a = b, this) : a
        }, this.$get = ["$window", function(c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
            }

            function e(a) {
                var b = c.console || {},
                    e = b[a] || b.log || o,
                    g = !1;
                try {
                    g = !!e.apply
                } catch (h) {}
                return g ? function() {
                    var a = [];
                    return f(arguments, function(b) {
                        a.push(d(b))
                    }), e.apply(b, a)
                } : function(a, b) {
                    e(a, null == b ? "" : b)
                }
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        a && c.apply(b, arguments)
                    }
                }()
            }
        }]
    }

    function zc(a, b) {
        if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw Pe("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", b);
        return a
    }

    function Ac(a, b) {
        if (a) {
            if (a.constructor === a) throw Pe("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
            if (a.window === a) throw Pe("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
            if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw Pe("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b);
            if (a === Object) throw Pe("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", b)
        }
        return a
    }

    function Bc(a, b) {
        if (a) {
            if (a.constructor === a) throw Pe("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
            if (a === Qe || a === Re || a === Se) throw Pe("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", b)
        }
    }

    function Cc(a) {
        return a.constant
    }

    function Dc(a, b, c, d) {
        Ac(a, d);
        for (var e, f = b.split("."), g = 0; f.length > 1; g++) {
            e = zc(f.shift(), d);
            var h = Ac(a[e], d);
            h || (h = {}, a[e] = h), a = h
        }
        return e = zc(f.shift(), d), Ac(a[e], d), a[e] = c, c
    }

    function Ec(a, b, d, e, f, g) {
        return zc(a, g), zc(b, g), zc(d, g), zc(e, g), zc(f, g),
            function(g, h) {
                var i = h && h.hasOwnProperty(a) ? h : g;
                return null == i ? i : (i = i[a], b ? null == i ? c : (i = i[b], d ? null == i ? c : (i = i[d], e ? null == i ? c : (i = i[e], f ? null == i ? c : i = i[f] : i) : i) : i) : i)
            }
    }

    function Fc(a, b, d) {
        var e = Ye[a];
        if (e) return e;
        var g = a.split("."),
            h = g.length;
        if (b.csp) e = 6 > h ? Ec(g[0], g[1], g[2], g[3], g[4], d) : function(a, b) {
            var e, f = 0;
            do e = Ec(g[f++], g[f++], g[f++], g[f++], g[f++], d)(a, b), b = c, a = e; while (h > f);
            return e
        };
        else {
            var i = "";
            f(g, function(a, b) {
                zc(a, d), i += "if(s == null) return undefined;\ns=" + (b ? "s" : '((l&&l.hasOwnProperty("' + a + '"))?l:s)') + "." + a + ";\n"
            }), i += "return s;";
            var j = new Function("s", "l", i);
            j.toString = q(i), e = j
        }
        return e.sharedGetter = !0, e.assign = function(b, c) {
            return Dc(b, a, c, a)
        }, Ye[a] = e, e
    }

    function Gc() {
        var a = ib(),
            b = {
                csp: !1
            };
        this.$get = ["$filter", "$sniffer", function(c, d) {
            function e(a) {
                var b = a;
                return a.sharedGetter && (b = function(b, c) {
                    return a(b, c)
                }, b.literal = a.literal, b.constant = a.constant, b.assign = a.assign), b
            }

            function g(a, b) {
                for (var c = 0, d = a.length; d > c; c++) {
                    var e = a[c];
                    e.constant || (e.inputs ? g(e.inputs, b) : -1 === b.indexOf(e) && b.push(e))
                }
                return b
            }

            function h(a, b) {
                return null == a || null == b ? a === b : "object" == typeof a && (a = a.valueOf(), "object" == typeof a) ? !1 : a === b || a !== a && b !== b
            }

            function i(a, b, c, d) {
                var e, f = d.$$inputs || (d.$$inputs = g(d.inputs, []));
                if (1 === f.length) {
                    var i = h;
                    return f = f[0], a.$watch(function(a) {
                        var b = f(a);
                        return h(b, i) || (e = d(a), i = b && b.valueOf()), e
                    }, b, c)
                }
                for (var j = [], k = 0, l = f.length; l > k; k++) j[k] = h;
                return a.$watch(function(a) {
                    for (var b = !1, c = 0, g = f.length; g > c; c++) {
                        var i = f[c](a);
                        (b || (b = !h(i, j[c]))) && (j[c] = i && i.valueOf())
                    }
                    return b && (e = d(a)), e
                }, b, c)
            }

            function j(a, b, c, d) {
                var e, f;
                return e = a.$watch(function(a) {
                    return d(a)
                }, function(a, c, d) {
                    f = a, x(b) && b.apply(this, arguments), s(a) && d.$$postDigest(function() {
                        s(f) && e()
                    })
                }, c)
            }

            function k(a, b, c, d) {
                function e(a) {
                    var b = !0;
                    return f(a, function(a) {
                        s(a) || (b = !1)
                    }), b
                }
                var g, h;
                return g = a.$watch(function(a) {
                    return d(a)
                }, function(a, c, d) {
                    h = a, x(b) && b.call(this, a, c, d), e(a) && d.$$postDigest(function() {
                        e(h) && g()
                    })
                }, c)
            }

            function l(a, b, c, d) {
                var e;
                return e = a.$watch(function(a) {
                    return d(a)
                }, function() {
                    x(b) && b.apply(this, arguments), e()
                }, c)
            }

            function m(a, b) {
                if (!b) return a;
                var c = function(c, d) {
                    var e = a(c, d),
                        f = b(e, c, d);
                    return s(e) ? f : e
                };
                return a.$$watchDelegate && a.$$watchDelegate !== i ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = i, c.inputs = [a]), c
            }
            return b.csp = d.csp,
                function(d, f) {
                    var g, h, n;
                    switch (typeof d) {
                        case "string":
                            if (n = d = d.trim(), g = a[n], !g) {
                                ":" === d.charAt(0) && ":" === d.charAt(1) && (h = !0, d = d.substring(2));
                                var p = new We(b),
                                    q = new Xe(p, c, b);
                                g = q.parse(d), g.constant ? g.$$watchDelegate = l : h ? (g = e(g), g.$$watchDelegate = g.literal ? k : j) : g.inputs && (g.$$watchDelegate = i), a[n] = g
                            }
                            return m(g, f);
                        case "function":
                            return m(d, f);
                        default:
                            return m(o, f)
                    }
                }
        }]
    }

    function Hc() {
        this.$get = ["$rootScope", "$exceptionHandler", function(a, b) {
            return Jc(function(b) {
                a.$evalAsync(b)
            }, b)
        }]
    }

    function Ic() {
        this.$get = ["$browser", "$exceptionHandler", function(a, b) {
            return Jc(function(b) {
                a.defer(b)
            }, b)
        }]
    }

    function Jc(a, b) {
        function e(a, b, c) {
            function d(b) {
                return function(c) {
                    e || (e = !0, b.call(a, c))
                }
            }
            var e = !1;
            return [d(b), d(c)]
        }

        function g() {
            this.$$state = {
                status: 0
            }
        }

        function h(a, b) {
            return function(c) {
                b.call(a, c)
            }
        }

        function i(a) {
            var d, e, f;
            f = a.pending, a.processScheduled = !1, a.pending = c;
            for (var g = 0, h = f.length; h > g; ++g) {
                e = f[g][0], d = f[g][a.status];
                try {
                    x(d) ? e.resolve(d(a.value)) : 1 === a.status ? e.resolve(a.value) : e.reject(a.value)
                } catch (i) {
                    e.reject(i), b(i)
                }
            }
        }

        function j(b) {
            !b.processScheduled && b.pending && (b.processScheduled = !0, a(function() {
                i(b)
            }))
        }

        function k() {
            this.promise = new g, this.resolve = h(this, this.resolve), this.reject = h(this, this.reject), this.notify = h(this, this.notify)
        }

        function l(a) {
            var b = new k,
                c = 0,
                d = $d(a) ? [] : {};
            return f(a, function(a, e) {
                c++, r(a).then(function(a) {
                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                }, function(a) {
                    d.hasOwnProperty(e) || b.reject(a)
                })
            }), 0 === c && b.resolve(d), b.promise
        }
        var m = d("$q", TypeError),
            n = function() {
                return new k
            };
        g.prototype = {
            then: function(a, b, c) {
                var d = new k;
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([d, a, b, c]), this.$$state.status > 0 && j(this.$$state), d.promise
            },
            "catch": function(a) {
                return this.then(null, a)
            },
            "finally": function(a, b) {
                return this.then(function(b) {
                    return q(b, !0, a)
                }, function(b) {
                    return q(b, !1, a)
                }, b)
            }
        }, k.prototype = {
            resolve: function(a) {
                this.promise.$$state.status || (a === this.promise ? this.$$reject(m("qcycle", "Expected promise to be resolved with value other than itself '{0}'", a)) : this.$$resolve(a))
            },
            $$resolve: function(a) {
                var c, d;
                d = e(this, this.$$resolve, this.$$reject);
                try {
                    (t(a) || x(a)) && (c = a && a.then), x(c) ? (this.promise.$$state.status = -1, c.call(a, d[0], d[1], this.notify)) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, j(this.promise.$$state))
                } catch (f) {
                    d[1](f), b(f)
                }
            },
            reject: function(a) {
                this.promise.$$state.status || this.$$reject(a)
            },
            $$reject: function(a) {
                this.promise.$$state.value = a, this.promise.$$state.status = 2, j(this.promise.$$state)
            },
            notify: function(c) {
                var d = this.promise.$$state.pending;
                this.promise.$$state.status <= 0 && d && d.length && a(function() {
                    for (var a, e, f = 0, g = d.length; g > f; f++) {
                        e = d[f][0], a = d[f][3];
                        try {
                            e.notify(x(a) ? a(c) : c)
                        } catch (h) {
                            b(h)
                        }
                    }
                })
            }
        };
        var o = function(a) {
                var b = new k;
                return b.reject(a), b.promise
            },
            p = function(a, b) {
                var c = new k;
                return b ? c.resolve(a) : c.reject(a), c.promise
            },
            q = function(a, b, c) {
                var d = null;
                try {
                    x(c) && (d = c())
                } catch (e) {
                    return p(e, !1)
                }
                return E(d) ? d.then(function() {
                    return p(a, b)
                }, function(a) {
                    return p(a, !1)
                }) : p(a, b)
            },
            r = function(a, b, c, d) {
                var e = new k;
                return e.resolve(a), e.promise.then(b, c, d)
            },
            s = function u(a) {
                function b(a) {
                    d.resolve(a)
                }

                function c(a) {
                    d.reject(a)
                }
                if (!x(a)) throw m("norslvr", "Expected resolverFn, got '{0}'", a);
                if (!(this instanceof u)) return new u(a);
                var d = new k;
                return a(b, c), d.promise
            };
        return s.defer = n, s.reject = o, s.when = r, s.all = l, s
    }

    function Kc() {
        this.$get = ["$window", "$timeout", function(a, b) {
            var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame,
                d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
                e = !!c,
                f = e ? function(a) {
                    var b = c(a);
                    return function() {
                        d(b)
                    }
                } : function(a) {
                    var c = b(a, 16.66, !1);
                    return function() {
                        b.cancel(c)
                    }
                };
            return f.supported = e, f
        }]
    }

    function Lc() {
        var a = 10,
            b = d("$rootScope"),
            c = null,
            g = null;
        this.digestTtl = function(b) {
            return arguments.length && (a = b), a
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(d, h, i, k) {
            function l() {
                this.$id = j(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = null
            }

            function m(a) {
                if (u.$$phase) throw b("inprog", "{0} already in progress", u.$$phase);
                u.$$phase = a
            }

            function n() {
                u.$$phase = null
            }

            function p(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent)
            }

            function q() {}

            function r() {
                for (; y.length;) try {
                    y.shift()()
                } catch (a) {
                    h(a)
                }
                g = null
            }

            function s() {
                null === g && (g = k.defer(function() {
                    u.$apply(r)
                }))
            }
            l.prototype = {
                constructor: l,
                $new: function(a, b) {
                    function c() {
                        d.$$destroyed = !0
                    }
                    var d;
                    return b = b || this, a ? (d = new l, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$id = j(), this.$$ChildScope = null
                    }, this.$$ChildScope.prototype = this), d = new this.$$ChildScope), d.$parent = b, d.$$prevSibling = b.$$childTail, b.$$childHead ? (b.$$childTail.$$nextSibling = d, b.$$childTail = d) : b.$$childHead = b.$$childTail = d, (a || b != this) && d.$on("$destroy", c), d
                },
                $watch: function(a, b, d) {
                    var e = i(a);
                    if (e.$$watchDelegate) return e.$$watchDelegate(this, b, d, e);
                    var f = this,
                        g = f.$$watchers,
                        h = {
                            fn: b,
                            last: q,
                            get: e,
                            exp: a,
                            eq: !!d
                        };
                    return c = null, x(b) || (h.fn = o), g || (g = f.$$watchers = []), g.unshift(h),
                        function() {
                            I(g, h), c = null
                        }
                },
                $watchGroup: function(a, b) {
                    function c() {
                        i = !1, j ? (j = !1, b(e, e, h)) : b(e, d, h)
                    }
                    var d = new Array(a.length),
                        e = new Array(a.length),
                        g = [],
                        h = this,
                        i = !1,
                        j = !0;
                    if (!a.length) {
                        var k = !0;
                        return h.$evalAsync(function() {
                                k && b(e, e, h)
                            }),
                            function() {
                                k = !1
                            }
                    }
                    return 1 === a.length ? this.$watch(a[0], function(a, c, f) {
                        e[0] = a, d[0] = c, b(e, a === c ? e : d, f)
                    }) : (f(a, function(a, b) {
                        var f = h.$watch(a, function(a, f) {
                            e[b] = a, d[b] = f, i || (i = !0, h.$evalAsync(c))
                        });
                        g.push(f)
                    }), function() {
                        for (; g.length;) g.shift()()
                    })
                },
                $watchCollection: function(a, b) {
                    function c(a) {
                        f = a;
                        var b, c, d, h, i;
                        if (t(f))
                            if (e(f)) {
                                g !== n && (g = n, q = g.length = 0, l++), b = f.length, q !== b && (l++, g.length = q = b);
                                for (var j = 0; b > j; j++) i = g[j], h = f[j], d = i !== i && h !== h, d || i === h || (l++, g[j] = h)
                            } else {
                                g !== o && (g = o = {}, q = 0, l++), b = 0;
                                for (c in f) f.hasOwnProperty(c) && (b++, h = f[c], i = g[c], c in g ? (d = i !== i && h !== h, d || i === h || (l++, g[c] = h)) : (q++, g[c] = h, l++));
                                if (q > b) {
                                    l++;
                                    for (c in g) f.hasOwnProperty(c) || (q--, delete g[c])
                                }
                            }
                        else g !== f && (g = f, l++);
                        return l
                    }

                    function d() {
                        if (p ? (p = !1, b(f, f, j)) : b(f, h, j), k)
                            if (t(f))
                                if (e(f)) {
                                    h = new Array(f.length);
                                    for (var a = 0; a < f.length; a++) h[a] = f[a]
                                } else {
                                    h = {};
                                    for (var c in f) Kd.call(f, c) && (h[c] = f[c])
                                }
                        else h = f
                    }
                    c.$stateful = !0;
                    var f, g, h, j = this,
                        k = b.length > 1,
                        l = 0,
                        m = i(a, c),
                        n = [],
                        o = {},
                        p = !0,
                        q = 0;
                    return this.$watch(m, d)
                },
                $digest: function() {
                    var d, e, f, i, j, l, o, p, s, t, y, z = a,
                        A = this,
                        B = [];
                    m("$digest"), k.$$checkUrlChange(), this === u && null !== g && (k.defer.cancel(g), r()), c = null;
                    do {
                        for (l = !1, p = A; v.length;) {
                            try {
                                y = v.shift(), y.scope.$eval(y.expression)
                            } catch (C) {
                                h(C)
                            }
                            c = null
                        }
                        a: do {
                            if (i = p.$$watchers)
                                for (j = i.length; j--;) try {
                                    if (d = i[j])
                                        if ((e = d.get(p)) === (f = d.last) || (d.eq ? L(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
                                            if (d === c) {
                                                l = !1;
                                                break a
                                            }
                                        } else l = !0, c = d, d.last = d.eq ? J(e, null) : e, d.fn(e, f === q ? e : f, p), 5 > z && (s = 4 - z, B[s] || (B[s] = []), t = x(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, t += "; newVal: " + Q(e) + "; oldVal: " + Q(f), B[s].push(t))
                                } catch (C) {
                                    h(C)
                                }
                            if (!(o = p.$$childHead || p !== A && p.$$nextSibling))
                                for (; p !== A && !(o = p.$$nextSibling);) p = p.$parent
                        } while (p = o);
                        if ((l || v.length) && !z--) throw n(), b("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", a, Q(B))
                    } while (l || v.length);
                    for (n(); w.length;) try {
                        w.shift()()
                    } catch (C) {
                        h(C)
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        if (this.$broadcast("$destroy"), this.$$destroyed = !0, this !== u) {
                            for (var b in this.$$listenerCount) p(this, this.$$listenerCount[b], b);
                            a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = o, this.$on = this.$watch = this.$watchGroup = function() {
                                return o
                            }, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null
                        }
                    }
                },
                $eval: function(a, b) {
                    return i(a)(this, b)
                },
                $evalAsync: function(a) {
                    u.$$phase || v.length || k.defer(function() {
                        v.length && u.$digest()
                    }), v.push({
                        scope: this,
                        expression: a
                    })
                },
                $$postDigest: function(a) {
                    w.push(a)
                },
                $apply: function(a) {
                    try {
                        return m("$apply"), this.$eval(a)
                    } catch (b) {
                        h(b)
                    } finally {
                        n();
                        try {
                            u.$digest()
                        } catch (b) {
                            throw h(b), b
                        }
                    }
                },
                $applyAsync: function(a) {
                    function b() {
                        c.$eval(a)
                    }
                    var c = this;
                    a && y.push(b), s()
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []), c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        c[c.indexOf(b)] = null, p(e, 1, a)
                    }
                },
                $emit: function(a) {
                    var b, c, d, e = [],
                        f = this,
                        g = !1,
                        i = {
                            name: a,
                            targetScope: f,
                            stopPropagation: function() {
                                g = !0
                            },
                            preventDefault: function() {
                                i.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        },
                        j = M([i], arguments, 1);
                    do {
                        for (b = f.$$listeners[a] || e, i.currentScope = f, c = 0, d = b.length; d > c; c++)
                            if (b[c]) try {
                                b[c].apply(null, j)
                            } catch (k) {
                                h(k)
                            } else b.splice(c, 1), c--, d--;
                        if (g) return i.currentScope = null, i;
                        f = f.$parent
                    } while (f);
                    return i.currentScope = null, i
                },
                $broadcast: function(a) {
                    var b = this,
                        c = b,
                        d = b,
                        e = {
                            name: a,
                            targetScope: b,
                            preventDefault: function() {
                                e.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        };
                    if (!b.$$listenerCount[a]) return e;
                    for (var f, g, i, j = M([e], arguments, 1); c = d;) {
                        for (e.currentScope = c, f = c.$$listeners[a] || [], g = 0, i = f.length; i > g; g++)
                            if (f[g]) try {
                                f[g].apply(null, j)
                            } catch (k) {
                                h(k)
                            } else f.splice(g, 1), g--, i--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== b && c.$$nextSibling))
                            for (; c !== b && !(d = c.$$nextSibling);) c = c.$parent
                    }
                    return e.currentScope = null, e
                }
            };
            var u = new l,
                v = u.$$asyncQueue = [],
                w = u.$$postDigestQueue = [],
                y = u.$$applyAsyncQueue = [];
            return u
        }]
    }

    function Mc() {
        var a = /^\s*(https?|ftp|mailto|tel|file):/,
            b = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(b) {
            return s(b) ? (a = b, this) : a
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (b = a, this) : b
        }, this.$get = function() {
            return function(c, d) {
                var e, f = d ? b : a;
                return e = Wc(c).href, "" === e || e.match(f) ? c : "unsafe:" + e
            }
        }
    }

    function Nc(a) {
        return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }

    function Oc(a) {
        if ("self" === a) return a;
        if (u(a)) {
            if (a.indexOf("***") > -1) throw Ze("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
            return a = Nc(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
        }
        if (y(a)) return new RegExp("^" + a.source + "$");
        throw Ze("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }

    function Pc(a) {
        var b = [];
        return s(a) && f(a, function(a) {
            b.push(Oc(a))
        }), b
    }

    function Qc() {
        this.SCE_CONTEXTS = $e;
        var a = ["self"],
            b = [];
        this.resourceUrlWhitelist = function(b) {
            return arguments.length && (a = Pc(b)), a
        }, this.resourceUrlBlacklist = function(a) {
            return arguments.length && (b = Pc(a)), b
        }, this.$get = ["$injector", function(d) {
            function e(a, b) {
                return "self" === a ? Xc(b) : !!a.exec(b.href)
            }

            function f(c) {
                var d, f, g = Wc(c.toString()),
                    h = !1;
                for (d = 0, f = a.length; f > d; d++)
                    if (e(a[d], g)) {
                        h = !0;
                        break
                    }
                if (h)
                    for (d = 0, f = b.length; f > d; d++)
                        if (e(b[d], g)) {
                            h = !1;
                            break
                        }
                return h
            }

            function g(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a
                    }
                };
                return a && (b.prototype = new a), b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue()
                }, b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString()
                }, b
            }

            function h(a, b) {
                var d = m.hasOwnProperty(a) ? m[a] : null;
                if (!d) throw Ze("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
                if (null === b || b === c || "" === b) return b;
                if ("string" != typeof b) throw Ze("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
                return new d(b)
            }

            function i(a) {
                return a instanceof l ? a.$$unwrapTrustedValue() : a
            }

            function j(a, b) {
                if (null === b || b === c || "" === b) return b;
                var d = m.hasOwnProperty(a) ? m[a] : null;
                if (d && b instanceof d) return b.$$unwrapTrustedValue();
                if (a === $e.RESOURCE_URL) {
                    if (f(b)) return b;
                    throw Ze("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
                }
                if (a === $e.HTML) return k(b);
                throw Ze("unsafe", "Attempting to use an unsafe value in a safe context.")
            }
            var k = function() {
                throw Ze("unsafe", "Attempting to use an unsafe value in a safe context.")
            };
            d.has("$sanitize") && (k = d.get("$sanitize"));
            var l = g(),
                m = {};
            return m[$e.HTML] = g(l), m[$e.CSS] = g(l), m[$e.URL] = g(l), m[$e.JS] = g(l), m[$e.RESOURCE_URL] = g(m[$e.URL]), {
                trustAs: h,
                getTrusted: j,
                valueOf: i
            }
        }]
    }

    function Rc() {
        var a = !0;
        this.enabled = function(b) {
            return arguments.length && (a = !!b), a
        }, this.$get = ["$document", "$parse", "$sceDelegate", function(b, c, d) {
            if (a && b[0].documentMode < 8) throw Ze("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var e = K($e);
            e.isEnabled = function() {
                return a
            }, e.trustAs = d.trustAs, e.getTrusted = d.getTrusted, e.valueOf = d.valueOf, a || (e.trustAs = e.getTrusted = function(a, b) {
                return b
            }, e.valueOf = p), e.parseAs = function(a, b) {
                var d = c(b);
                return d.literal && d.constant ? d : c(b, function(b) {
                    return e.getTrusted(a, b)
                })
            };
            var g = e.parseAs,
                h = e.getTrusted,
                i = e.trustAs;
            return f($e, function(a, b) {
                var c = Jd(b);
                e[mb("parse_as_" + c)] = function(b) {
                    return g(a, b)
                }, e[mb("get_trusted_" + c)] = function(b) {
                    return h(a, b)
                }, e[mb("trust_as_" + c)] = function(b) {
                    return i(a, b)
                }
            }), e
        }]
    }

    function Sc() {
        this.$get = ["$window", "$document", function(a, b) {
            var c, d, e = {},
                f = m((/android (\d+)/.exec(Jd((a.navigator || {}).userAgent)) || [])[1]),
                g = /Boxee/i.test((a.navigator || {}).userAgent),
                h = b[0] || {},
                i = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                j = h.body && h.body.style,
                k = !1,
                l = !1;
            if (j) {
                for (var n in j)
                    if (d = i.exec(n)) {
                        c = d[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
                        break
                    }
                c || (c = "WebkitOpacity" in j && "webkit"), k = !!("transition" in j || c + "Transition" in j), l = !!("animation" in j || c + "Animation" in j), !f || k && l || (k = u(h.body.style.webkitTransition), l = u(h.body.style.webkitAnimation))
            }
            return {
                history: !(!a.history || !a.history.pushState || 4 > f || g),
                hasEvent: function(a) {
                    if ("input" == a && 9 == Od) return !1;
                    if (r(e[a])) {
                        var b = h.createElement("div");
                        e[a] = "on" + a in b
                    }
                    return e[a]
                },
                csp: ae(),
                vendorPrefix: c,
                transitions: k,
                animations: l,
                android: f
            }
        }]
    }

    function Tc() {
        this.$get = ["$templateCache", "$http", "$q", function(a, b, c) {
            function d(e, f) {
                function g() {
                    if (h.totalPendingRequests--, !f) throw Ie("tpload", "Failed to load template: {0}", e);
                    return c.reject()
                }
                var h = d;
                return h.totalPendingRequests++, b.get(e, {
                    cache: a
                }).then(function(b) {
                    var c = b.data;
                    return c && 0 !== c.length ? (h.totalPendingRequests--, a.put(e, c), c) : g()
                }, g)
            }
            return d.totalPendingRequests = 0, d
        }]
    }

    function Uc() {
        this.$get = ["$rootScope", "$browser", "$location", function(a, b, c) {
            var d = {};
            return d.findBindings = function(a, b, c) {
                var d = a.getElementsByClassName("ng-binding"),
                    e = [];
                return f(d, function(a) {
                    var d = Xd.element(a).data("$binding");
                    d && f(d, function(d) {
                        if (c) {
                            var f = new RegExp("(^|\\s)" + b + "(\\s|\\||$)");
                            f.test(d) && e.push(a)
                        } else -1 != d.indexOf(b) && e.push(a)
                    })
                }), e
            }, d.findModels = function(a, b, c) {
                for (var d = ["ng-", "data-ng-", "ng\\:"], e = 0; e < d.length; ++e) {
                    var f = c ? "=" : "*=",
                        g = "[" + d[e] + "model" + f + '"' + b + '"]',
                        h = a.querySelectorAll(g);
                    if (h.length) return h
                }
            }, d.getLocation = function() {
                return c.url()
            }, d.setLocation = function(b) {
                b !== c.url() && (c.url(b), a.$digest())
            }, d.whenStable = function(a) {
                b.notifyWhenNoOutstandingRequests(a)
            }, d
        }]
    }

    function Vc() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(a, b, c, d, e) {
            function f(f, h, i) {
                var j, k = s(i) && !i,
                    l = (k ? d : c).defer(),
                    m = l.promise;
                return j = b.defer(function() {
                    try {
                        l.resolve(f())
                    } catch (b) {
                        l.reject(b), e(b)
                    } finally {
                        delete g[m.$$timeoutId]
                    }
                    k || a.$apply()
                }, h), m.$$timeoutId = j, g[j] = l, m
            }
            var g = {};
            return f.cancel = function(a) {
                return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
            }, f
        }]
    }

    function Wc(a) {
        var b = a;
        return Od && (_e.setAttribute("href", b), b = _e.href), _e.setAttribute("href", b), {
            href: _e.href,
            protocol: _e.protocol ? _e.protocol.replace(/:$/, "") : "",
            host: _e.host,
            search: _e.search ? _e.search.replace(/^\?/, "") : "",
            hash: _e.hash ? _e.hash.replace(/^#/, "") : "",
            hostname: _e.hostname,
            port: _e.port,
            pathname: "/" === _e.pathname.charAt(0) ? _e.pathname : "/" + _e.pathname
        }
    }

    function Xc(a) {
        var b = u(a) ? Wc(a) : a;
        return b.protocol === af.protocol && b.host === af.host
    }

    function Yc() {
        this.$get = q(a)
    }

    function Zc(a) {
        function b(d, e) {
            if (t(d)) {
                var g = {};
                return f(d, function(a, c) {
                    g[c] = b(c, a)
                }), g
            }
            return a.factory(d + c, e)
        }
        var c = "Filter";
        this.register = b, this.$get = ["$injector", function(a) {
            return function(b) {
                return a.get(b + c)
            }
        }], b("currency", _c), b("date", kd), b("filter", $c), b("json", ld), b("limitTo", md), b("lowercase", ff), b("number", ad), b("orderBy", nd), b("uppercase", gf)
    }

    function $c() {
        return function(a, b, c) {
            if (!$d(a)) return a;
            var d = typeof c,
                e = [];
            e.check = function(a, b) {
                for (var c = 0; c < e.length; c++)
                    if (!e[c](a, b)) return !1;
                return !0
            }, "function" !== d && (c = "boolean" === d && c ? function(a, b) {
                return Xd.equals(a, b)
            } : function(a, b) {
                if (a && b && "object" == typeof a && "object" == typeof b) {
                    for (var d in a)
                        if ("$" !== d.charAt(0) && Kd.call(a, d) && c(a[d], b[d])) return !0;
                    return !1
                }
                return b = ("" + b).toLowerCase(), ("" + a).toLowerCase().indexOf(b) > -1
            });
            var f = function(a, b) {
                if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1));
                switch (typeof a) {
                    case "boolean":
                    case "number":
                    case "string":
                        return c(a, b);
                    case "object":
                        switch (typeof b) {
                            case "object":
                                return c(a, b);
                            default:
                                for (var d in a)
                                    if ("$" !== d.charAt(0) && f(a[d], b)) return !0
                        }
                        return !1;
                    case "array":
                        for (var e = 0; e < a.length; e++)
                            if (f(a[e], b)) return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof b) {
                case "boolean":
                case "number":
                case "string":
                    b = {
                        $: b
                    };
                case "object":
                    for (var g in b) ! function(a) {
                        "undefined" != typeof b[a] && e.push(function(c) {
                            return f("$" == a ? c : c && c[a], b[a])
                        })
                    }(g);
                    break;
                case "function":
                    e.push(b);
                    break;
                default:
                    return a
            }
            for (var h = [], i = 0; i < a.length; i++) {
                var j = a[i];
                e.check(j, i) && h.push(j)
            }
            return h
        }
    }

    function _c(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c, d) {
            return r(c) && (c = b.CURRENCY_SYM), r(d) && (d = 2), null == a ? a : bd(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, d).replace(/\u00A4/g, c)
        }
    }

    function ad(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return null == a ? a : bd(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
        }
    }

    function bd(a, b, c, d, e) {
        if (!isFinite(a) || t(a)) return "";
        var f = 0 > a;
        a = Math.abs(a);
        var g = a + "",
            h = "",
            i = [],
            j = !1;
        if (-1 !== g.indexOf("e")) {
            var k = g.match(/([\d\.]+)e(-?)(\d+)/);
            k && "-" == k[2] && k[3] > e + 1 ? (g = "0", a = 0) : (h = g, j = !0)
        }
        if (j) e > 0 && a > -1 && 1 > a && (h = a.toFixed(e));
        else {
            var l = (g.split(bf)[1] || "").length;
            r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac)), a = +(Math.round(+(a.toString() + "e" + e)).toString() + "e" + -e), 0 === a && (f = !1);
            var m = ("" + a).split(bf),
                n = m[0];
            m = m[1] || "";
            var o, p = 0,
                q = b.lgSize,
                s = b.gSize;
            if (n.length >= q + s)
                for (p = n.length - q, o = 0; p > o; o++)(p - o) % s === 0 && 0 !== o && (h += c), h += n.charAt(o);
            for (o = p; o < n.length; o++)(n.length - o) % q === 0 && 0 !== o && (h += c), h += n.charAt(o);
            for (; m.length < e;) m += "0";
            e && "0" !== e && (h += d + m.substr(0, e))
        }
        return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join("")
    }

    function cd(a, b, c) {
        var d = "";
        for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;) a = "0" + a;
        return c && (a = a.substr(a.length - b)), d + a
    }

    function dd(a, b, c, d) {
        return c = c || 0,
            function(e) {
                var f = e["get" + a]();
                return (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), cd(f, b, d)
            }
    }

    function ed(a, b) {
        return function(c, d) {
            var e = c["get" + a](),
                f = Ld(b ? "SHORT" + a : a);
            return d[f][e]
        }
    }

    function fd(a) {
        var b = -1 * a.getTimezoneOffset(),
            c = b >= 0 ? "+" : "";
        return c += cd(Math[b > 0 ? "floor" : "ceil"](b / 60), 2) + cd(Math.abs(b % 60), 2)
    }

    function gd(a) {
        var b = new Date(a, 0, 1).getDay();
        return new Date(a, 0, (4 >= b ? 5 : 12) - b)
    }

    function hd(a) {
        return new Date(a.getFullYear(), a.getMonth(), a.getDate() + (4 - a.getDay()))
    }

    function id(a) {
        return function(b) {
            var c = gd(b.getFullYear()),
                d = hd(b),
                e = +d - +c,
                f = 1 + Math.round(e / 6048e5);
            return cd(f, a)
        }
    }

    function jd(a, b) {
        return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
    }

    function kd(a) {
        function b(a) {
            var b;
            if (b = a.match(c)) {
                var d = new Date(0),
                    e = 0,
                    f = 0,
                    g = b[8] ? d.setUTCFullYear : d.setFullYear,
                    h = b[8] ? d.setUTCHours : d.setHours;
                b[9] && (e = m(b[9] + b[10]), f = m(b[9] + b[11])), g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
                var i = m(b[4] || 0) - e,
                    j = m(b[5] || 0) - f,
                    k = m(b[6] || 0),
                    l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                return h.call(d, i, j, k, l), d
            }
            return a
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, d, e) {
            var g, h, i = "",
                j = [];
            if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = ef.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c)) return c;
            for (; d;) h = df.exec(d), h ? (j = M(j, h, 1), d = j.pop()) : (j.push(d), d = null);
            return e && "UTC" === e && (c = new Date(c.getTime()), c.setMinutes(c.getMinutes() + c.getTimezoneOffset())), f(j, function(b) {
                g = cf[b], i += g ? g(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), i
        }
    }

    function ld() {
        return function(a) {
            return Q(a, !0)
        }
    }

    function md() {
        return function(a, b) {
            if (v(a) && (a = a.toString()), !$d(a) && !u(a)) return a;
            if (b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : m(b), u(a)) return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
            var c, d, e = [];
            for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++) e.push(a[c]);
            return e
        }
    }

    function nd(a) {
        return function(b, c, d) {
            function f(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e
                }
                return 0
            }

            function g(a, b) {
                return b ? function(b, c) {
                    return a(c, b)
                } : a
            }

            function h(a, b) {
                var c = typeof a,
                    d = typeof b;
                return c == d ? (w(a) && w(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
            }
            if (!e(b)) return b;
            c = $d(c) ? c : [c], 0 === c.length && (c = ["+"]), c = c.map(function(b) {
                var c = !1,
                    d = b || p;
                if (u(b)) {
                    if (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), "" === b) return g(function(a, b) {
                        return h(a, b)
                    }, c);
                    if (d = a(b), d.constant) {
                        var e = d();
                        return g(function(a, b) {
                            return h(a[e], b[e])
                        }, c)
                    }
                }
                return g(function(a, b) {
                    return h(d(a), d(b))
                }, c)
            });
            for (var i = [], j = 0; j < b.length; j++) i.push(b[j]);
            return i.sort(g(f, d))
        }
    }

    function od(a) {
        return x(a) && (a = {
            link: a
        }), a.restrict = a.restrict || "AC", q(a)
    }

    function pd(a, b) {
        a.$name = b
    }

    function qd(a, b, d, e, g) {
        var h = this,
            i = [],
            j = h.$$parentForm = a.parent().controller("form") || kf;
        h.$error = {}, h.$$success = {}, h.$pending = c, h.$name = g(b.name || b.ngForm || "")(d), h.$dirty = !1, h.$pristine = !0, h.$valid = !0, h.$invalid = !1, h.$submitted = !1, j.$addControl(h), h.$rollbackViewValue = function() {
            f(i, function(a) {
                a.$rollbackViewValue()
            })
        }, h.$commitViewValue = function() {
            f(i, function(a) {
                a.$commitViewValue()
            })
        }, h.$addControl = function(a) {
            fb(a.$name, "input"), i.push(a), a.$name && (h[a.$name] = a)
        }, h.$$renameControl = function(a, b) {
            var c = a.$name;
            h[c] === a && delete h[c], h[b] = a, a.$name = b
        }, h.$removeControl = function(a) {
            a.$name && h[a.$name] === a && delete h[a.$name], f(h.$pending, function(b, c) {
                h.$setValidity(c, null, a)
            }), f(h.$error, function(b, c) {
                h.$setValidity(c, null, a)
            }), I(i, a)
        }, Ed({
            ctrl: this,
            $element: a,
            set: function(a, b, c) {
                var d = a[b];
                if (d) {
                    var e = d.indexOf(c); - 1 === e && d.push(c)
                } else a[b] = [c]
            },
            unset: function(a, b, c) {
                var d = a[b];
                d && (I(d, c), 0 === d.length && delete a[b])
            },
            parentForm: j,
            $animate: e
        }), h.$setDirty = function() {
            e.removeClass(a, Ef), e.addClass(a, Ff), h.$dirty = !0, h.$pristine = !1, j.$setDirty()
        }, h.$setPristine = function() {
            e.setClass(a, Ef, Ff + " " + lf), h.$dirty = !1, h.$pristine = !0, h.$submitted = !1, f(i, function(a) {
                a.$setPristine()
            })
        }, h.$setUntouched = function() {
            f(i, function(a) {
                a.$setUntouched()
            })
        }, h.$setSubmitted = function() {
            e.addClass(a, lf), h.$submitted = !0, j.$setSubmitted()
        }
    }

    function rd(a) {
        a.$formatters.push(function(b) {
            return a.$isEmpty(b) ? b : b.toString()
        })
    }

    function sd(a, b, c, d, e, f) {
        td(a, b, c, d, e, f), rd(d)
    }

    function td(a, b, c, d, e, f) {
        var g = (b.prop(Id), b[0].placeholder),
            h = {},
            i = Jd(b[0].type);
        if (!e.android) {
            var j = !1;
            b.on("compositionstart", function() {
                j = !0
            }), b.on("compositionend", function() {
                j = !1, k()
            })
        }
        var k = function(a) {
            if (!j) {
                var e = b.val(),
                    f = a && a.type;
                if (Od && "input" === (a || h).type && b[0].placeholder !== g) return void(g = b[0].placeholder);
                "password" === i || c.ngTrim && "false" === c.ngTrim || (e = _d(e)), (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, f)
            }
        };
        if (e.hasEvent("input")) b.on("input", k);
        else {
            var l, m = function(a) {
                l || (l = f.defer(function() {
                    k(a), l = null
                }))
            };
            b.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || m(a)
            }), e.hasEvent("paste") && b.on("paste cut", m)
        }
        b.on("change", k), d.$render = function() {
            b.val(d.$isEmpty(d.$modelValue) ? "" : d.$viewValue)
        }
    }

    function ud(a, b) {
        if (w(a)) return a;
        if (u(a)) {
            vf.lastIndex = 0;
            var c = vf.exec(a);
            if (c) {
                var d = +c[1],
                    e = +c[2],
                    f = 0,
                    g = 0,
                    h = 0,
                    i = 0,
                    j = gd(d),
                    k = 7 * (e - 1);
                return b && (f = b.getHours(), g = b.getMinutes(), h = b.getSeconds(), i = b.getMilliseconds()), new Date(d, 0, j.getDate() + k, f, g, h, i)
            }
        }
        return 0 / 0
    }

    function vd(a, b) {
        return function(c, d) {
            var e, g;
            if (w(c)) return c;
            if (u(c)) {
                if ('"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1)), pf.test(c)) return new Date(c);
                if (a.lastIndex = 0, e = a.exec(c)) return e.shift(), g = d ? {
                    yyyy: d.getFullYear(),
                    MM: d.getMonth() + 1,
                    dd: d.getDate(),
                    HH: d.getHours(),
                    mm: d.getMinutes(),
                    ss: d.getSeconds(),
                    sss: d.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, f(e, function(a, c) {
                    c < b.length && (g[b[c]] = +a)
                }), new Date(g.yyyy, g.MM - 1, g.dd, g.HH, g.mm, g.ss || 0, 1e3 * g.sss || 0)
            }
            return 0 / 0
        }
    }

    function wd(a, b, d, e) {
        return function(f, g, h, i, j, k, l) {
            function m(a) {
                return s(a) ? w(a) ? a : d(a) : c
            }
            xd(f, g, h, i), td(f, g, h, i, j, k);
            var n, o = i && i.$options && i.$options.timezone;
            if (i.$$parserName = a, i.$parsers.push(function(a) {
                    if (i.$isEmpty(a)) return null;
                    if (b.test(a)) {
                        var e = d(a, n);
                        return "UTC" === o && e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e
                    }
                    return c
                }), i.$formatters.push(function(a) {
                    if (!i.$isEmpty(a)) {
                        if (!w(a)) throw zf("datefmt", "Expected `{0}` to be a date", a);
                        if (n = a, n && "UTC" === o) {
                            var b = 6e4 * n.getTimezoneOffset();
                            n = new Date(n.getTime() + b)
                        }
                        return l("date")(a, e, o)
                    }
                    return n = null, ""
                }), s(h.min) || h.ngMin) {
                var p;
                i.$validators.min = function(a) {
                    return i.$isEmpty(a) || r(p) || d(a) >= p
                }, h.$observe("min", function(a) {
                    p = m(a), i.$validate()
                })
            }
            if (s(h.max) || h.ngMax) {
                var q;
                i.$validators.max = function(a) {
                    return i.$isEmpty(a) || r(q) || d(a) <= q
                }, h.$observe("max", function(a) {
                    q = m(a), i.$validate()
                })
            }
            i.$isEmpty = function(a) {
                return !a || a.getTime && a.getTime() !== a.getTime()
            }
        }
    }

    function xd(a, b, d, e) {
        var f = b[0],
            g = e.$$hasNativeValidators = t(f.validity);
        g && e.$parsers.push(function(a) {
            var d = b.prop(Id) || {};
            return d.badInput && !d.typeMismatch ? c : a
        })
    }

    function yd(a, b, d, e, f, g) {
        if (xd(a, b, d, e), td(a, b, d, e, f, g), e.$$parserName = "number", e.$parsers.push(function(a) {
                return e.$isEmpty(a) ? null : sf.test(a) ? parseFloat(a) : c
            }), e.$formatters.push(function(a) {
                if (!e.$isEmpty(a)) {
                    if (!v(a)) throw zf("numfmt", "Expected `{0}` to be a number", a);
                    a = a.toString()
                }
                return a
            }), d.min || d.ngMin) {
            var h;
            e.$validators.min = function(a) {
                return e.$isEmpty(a) || r(h) || a >= h
            }, d.$observe("min", function(a) {
                s(a) && !v(a) && (a = parseFloat(a, 10)), h = v(a) && !isNaN(a) ? a : c, e.$validate()
            })
        }
        if (d.max || d.ngMax) {
            var i;
            e.$validators.max = function(a) {
                return e.$isEmpty(a) || r(i) || i >= a
            }, d.$observe("max", function(a) {
                s(a) && !v(a) && (a = parseFloat(a, 10)), i = v(a) && !isNaN(a) ? a : c, e.$validate()
            })
        }
    }

    function zd(a, b, c, d, e, f) {
        td(a, b, c, d, e, f), rd(d), d.$$parserName = "url", d.$validators.url = function(a) {
            return d.$isEmpty(a) || qf.test(a)
        }
    }

    function Ad(a, b, c, d, e, f) {
        td(a, b, c, d, e, f), rd(d), d.$$parserName = "email", d.$validators.email = function(a) {
            return d.$isEmpty(a) || rf.test(a)
        }
    }

    function Bd(a, b, c, d) {
        r(c.name) && b.attr("name", j());
        var e = function(a) {
            b[0].checked && d.$setViewValue(c.value, a && a.type)
        };
        b.on("click", e), d.$render = function() {
            var a = c.value;
            b[0].checked = a == d.$viewValue
        }, c.$observe("value", d.$render)
    }

    function Cd(a, b, c, e, f) {
        var g;
        if (s(e)) {
            if (g = a(e), !g.constant) throw d("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", c, e);
            return g(b)
        }
        return f
    }

    function Dd(a, b, c, d, e, f, g, h) {
        var i = Cd(h, a, "ngTrueValue", c.ngTrueValue, !0),
            j = Cd(h, a, "ngFalseValue", c.ngFalseValue, !1),
            k = function(a) {
                d.$setViewValue(b[0].checked, a && a.type)
            };
        b.on("click", k), d.$render = function() {
            b[0].checked = d.$viewValue
        }, d.$isEmpty = function(a) {
            return a !== i
        }, d.$formatters.push(function(a) {
            return L(a, i)
        }), d.$parsers.push(function(a) {
            return a ? i : j
        })
    }

    function Ed(a) {
        function b(a, b, i) {
            b === c ? d("$pending", a, i) : e("$pending", a, i), D(b) ? b ? (l(h.$error, a, i), k(h.$$success, a, i)) : (k(h.$error, a, i), l(h.$$success, a, i)) : (l(h.$error, a, i), l(h.$$success, a, i)), h.$pending ? (f(If, !0), h.$valid = h.$invalid = c, g("", null)) : (f(If, !1), h.$valid = Fd(h.$error), h.$invalid = !h.$valid, g("", h.$valid));
            var j;
            j = h.$pending && h.$pending[a] ? c : h.$error[a] ? !1 : h.$$success[a] ? !0 : null, g(a, j), m.$setValidity(a, j, h)
        }

        function d(a, b, c) {
            h[a] || (h[a] = {}), k(h[a], b, c)
        }

        function e(a, b, d) {
            h[a] && l(h[a], b, d), Fd(h[a]) && (h[a] = c)
        }

        function f(a, b) {
            b && !j[a] ? (n.addClass(i, a), j[a] = !0) : !b && j[a] && (n.removeClass(i, a), j[a] = !1)
        }

        function g(a, b) {
            a = a ? "-" + bb(a, "-") : "", f(Cf + a, b === !0), f(Df + a, b === !1)
        }
        var h = a.ctrl,
            i = a.$element,
            j = {},
            k = a.set,
            l = a.unset,
            m = a.parentForm,
            n = a.$animate;
        j[Df] = !(j[Cf] = i.hasClass(Cf)), h.$setValidity = b
    }

    function Fd(a) {
        if (a)
            for (var b in a) return !1;
        return !0
    }

    function Gd(a, b) {
        return a = "ngClass" + a, ["$animate", function(c) {
            function d(a, b) {
                var c = [];
                a: for (var d = 0; d < a.length; d++) {
                    for (var e = a[d], f = 0; f < b.length; f++)
                        if (e == b[f]) continue a;
                    c.push(e)
                }
                return c
            }

            function e(a) {
                if ($d(a)) return a;
                if (u(a)) return a.split(" ");
                if (t(a)) {
                    var b = [];
                    return f(a, function(a, c) {
                        a && (b = b.concat(c.split(" ")))
                    }), b
                }
                return a
            }
            return {
                restrict: "AC",
                link: function(g, h, i) {
                    function j(a) {
                        var b = l(a, 1);
                        i.$addClass(b)
                    }

                    function k(a) {
                        var b = l(a, -1);
                        i.$removeClass(b)
                    }

                    function l(a, b) {
                        var c = h.data("$classCounts") || {},
                            d = [];
                        return f(a, function(a) {
                            (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a))
                        }), h.data("$classCounts", c), d.join(" ")
                    }

                    function m(a, b) {
                        var e = d(b, a),
                            f = d(a, b);
                        e = l(e, 1), f = l(f, -1), e && e.length && c.addClass(h, e), f && f.length && c.removeClass(h, f)
                    }

                    function n(a) {
                        if (b === !0 || g.$index % 2 === b) {
                            var c = e(a || []);
                            if (o) {
                                if (!L(a, o)) {
                                    var d = e(o);
                                    m(d, c)
                                }
                            } else j(c)
                        }
                        o = K(a)
                    }
                    var o;
                    g.$watch(i[a], n, !0), i.$observe("class", function() {
                        n(g.$eval(i[a]))
                    }), "ngClass" !== a && g.$watch("$index", function(c, d) {
                        var f = 1 & c;
                        if (f !== (1 & d)) {
                            var h = e(g.$eval(i[a]));
                            f === b ? j(h) : k(h)
                        }
                    })
                }
            }
        }]
    }
    var Hd = /^\/(.+)\/([a-z]*)$/,
        Id = "validity",
        Jd = function(a) {
            return u(a) ? a.toLowerCase() : a
        },
        Kd = Object.prototype.hasOwnProperty,
        Ld = function(a) {
            return u(a) ? a.toUpperCase() : a
        },
        Md = function(a) {
            return u(a) ? a.replace(/[A-Z]/g, function(a) {
                return String.fromCharCode(32 | a.charCodeAt(0))
            }) : a
        },
        Nd = function(a) {
            return u(a) ? a.replace(/[a-z]/g, function(a) {
                return String.fromCharCode(-33 & a.charCodeAt(0))
            }) : a
        };
    "i" !== "I".toLowerCase() && (Jd = Md, Ld = Nd);
    var Od, Pd, Qd, Rd, Sd = [].slice,
        Td = [].splice,
        Ud = [].push,
        Vd = Object.prototype.toString,
        Wd = d("ng"),
        Xd = a.angular || (a.angular = {}),
        Yd = 0;
    Od = b.documentMode, o.$inject = [], p.$inject = [];
    var Zd, $d = Array.isArray,
        _d = function(a) {
            return u(a) ? a.trim() : a
        },
        ae = function() {
            if (s(ae.isActive_)) return ae.isActive_;
            var a = !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"));
            if (!a) try {
                new Function("")
            } catch (c) {
                a = !0
            }
            return ae.isActive_ = a
        },
        be = ["ng-", "data-ng-", "ng:", "x-ng-"],
        ce = /[A-Z]/g,
        de = !1,
        ee = 1,
        fe = 3,
        ge = 8,
        he = 9,
        ie = 11,
        je = {
            full: "1.3.0",
            major: 1,
            minor: 3,
            dot: 0,
            codeName: "superluminal-nudge"
        };
    rb.expando = "ng339";
    var ke = rb.cache = {},
        le = 1,
        me = function(a, b, c) {
            a.addEventListener(b, c, !1)
        },
        ne = function(a, b, c) {
            a.removeEventListener(b, c, !1)
        };
    rb._data = function(a) {
        return this.cache[a[this.expando]] || {}
    };
    var oe = /([\:\-\_]+(.))/g,
        pe = /^moz([A-Z])/,
        qe = {
            mouseleave: "mouseout",
            mouseenter: "mouseover"
        },
        re = d("jqLite"),
        se = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        te = /<|&#?\w+;/,
        ue = /<([\w:]+)/,
        ve = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        we = {
            option: [1, '<select multiple="multiple">', "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    we.optgroup = we.option, we.tbody = we.tfoot = we.colgroup = we.caption = we.thead, we.th = we.td;
    var xe = rb.prototype = {
            ready: function(c) {
                function d() {
                    e || (e = !0, c())
                }
                var e = !1;
                "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), rb(a).on("load", d), this.on("DOMContentLoaded", d))
            },
            toString: function() {
                var a = [];
                return f(this, function(b) {
                    a.push("" + b)
                }), "[" + a.join(", ") + "]"
            },
            eq: function(a) {
                return Pd(a >= 0 ? this[a] : this[this.length + a])
            },
            length: 0,
            push: Ud,
            sort: [].sort,
            splice: [].splice
        },
        ye = {};
    f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(a) {
        ye[Jd(a)] = a
    });
    var ze = {};
    f("input,select,option,textarea,button,form,details".split(","), function(a) {
        ze[a] = !0
    });
    var Ae = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    f({
        data: xb,
        removeData: vb
    }, function(a, b) {
        rb[b] = a
    }), f({
        data: xb,
        inheritedData: Db,
        scope: function(a) {
            return Pd.data(a, "$scope") || Db(a.parentNode || a, ["$isolateScope", "$scope"])
        },
        isolateScope: function(a) {
            return Pd.data(a, "$isolateScope") || Pd.data(a, "$isolateScopeNoTemplate")
        },
        controller: Cb,
        injector: function(a) {
            return Db(a, "$injector")
        },
        removeAttr: function(a, b) {
            a.removeAttribute(b)
        },
        hasClass: yb,
        css: function(a, b, c) {
            return b = mb(b), s(c) ? void(a.style[b] = c) : a.style[b]
        },
        attr: function(a, b, d) {
            var e = Jd(b);
            if (ye[e]) {
                if (!s(d)) return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
                d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
            } else if (s(d)) a.setAttribute(b, d);
            else if (a.getAttribute) {
                var f = a.getAttribute(b, 2);
                return null === f ? c : f
            }
        },
        prop: function(a, b, c) {
            return s(c) ? void(a[b] = c) : a[b]
        },
        text: function() {
            function a(a, b) {
                if (r(b)) {
                    var c = a.nodeType;
                    return c === ee || c === fe ? a.textContent : ""
                }
                a.textContent = b
            }
            return a.$dv = "", a
        }(),
        val: function(a, b) {
            if (r(b)) {
                if (a.multiple && "select" === H(a)) {
                    var c = [];
                    return f(a.options, function(a) {
                        a.selected && c.push(a.value || a.text)
                    }), 0 === c.length ? null : c
                }
                return a.value
            }
            a.value = b
        },
        html: function(a, b) {
            return r(b) ? a.innerHTML : (tb(a, !0), void(a.innerHTML = b))
        },
        empty: Eb
    }, function(a, b) {
        rb.prototype[b] = function(b, d) {
            var e, f, g = this.length;
            if (a !== Eb && (2 == a.length && a !== yb && a !== Cb ? b : d) === c) {
                if (t(b)) {
                    for (e = 0; g > e; e++)
                        if (a === xb) a(this[e], b);
                        else
                            for (f in b) a(this[e], f, b[f]);
                    return this
                }
                for (var h = a.$dv, i = h === c ? Math.min(g, 1) : g, j = 0; i > j; j++) {
                    var k = a(this[j], b, d);
                    h = h ? h + k : k
                }
                return h
            }
            for (e = 0; g > e; e++) a(this[e], b, d);
            return this
        }
    }), f({
        removeData: vb,
        on: function yg(a, b, c, d) {
            if (s(d)) throw re("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (ob(a)) {
                var e = wb(a, !0),
                    f = e.events,
                    g = e.handle;
                g || (g = e.handle = Jb(a, f));
                for (var h = b.indexOf(" ") >= 0 ? b.split(" ") : [b], i = h.length; i--;) {
                    b = h[i];
                    var j = f[b];
                    j || (f[b] = [], "mouseenter" === b || "mouseleave" === b ? yg(a, qe[b], function(a) {
                        var c = this,
                            d = a.relatedTarget;
                        (!d || d !== c && !c.contains(d)) && g(a, b)
                    }) : "$destroy" !== b && me(a, b, g), j = f[b]), j.push(c)
                }
            }
        },
        off: ub,
        one: function(a, b, c) {
            a = Pd(a), a.on(b, function d() {
                a.off(b, c), a.off(b, d)
            }), a.on(b, c)
        },
        replaceWith: function(a, b) {
            var c, d = a.parentNode;
            tb(a), f(new rb(b), function(b) {
                c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
            })
        },
        children: function(a) {
            var b = [];
            return f(a.childNodes, function(a) {
                a.nodeType === ee && b.push(a)
            }), b
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || []
        },
        append: function(a, b) {
            var c = a.nodeType;
            if (c === ee || c === ie) {
                b = new rb(b);
                for (var d = 0, e = b.length; e > d; d++) {
                    var f = b[d];
                    a.appendChild(f)
                }
            }
        },
        prepend: function(a, b) {
            if (a.nodeType === ee) {
                var c = a.firstChild;
                f(new rb(b), function(b) {
                    a.insertBefore(b, c)
                })
            }
        },
        wrap: function(a, b) {
            b = Pd(b).eq(0).clone()[0];
            var c = a.parentNode;
            c && c.replaceChild(b, a), b.appendChild(a)
        },
        remove: Fb,
        detach: function(a) {
            Fb(a, !0)
        },
        after: function(a, b) {
            var c = a,
                d = a.parentNode;
            b = new rb(b);
            for (var e = 0, f = b.length; f > e; e++) {
                var g = b[e];
                d.insertBefore(g, c.nextSibling), c = g
            }
        },
        addClass: Ab,
        removeClass: zb,
        toggleClass: function(a, b, c) {
            b && f(b.split(" "), function(b) {
                var d = c;
                r(d) && (d = !yb(a, b)), (d ? Ab : zb)(a, b)
            })
        },
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== ie ? b : null
        },
        next: function(a) {
            return a.nextElementSibling
        },
        find: function(a, b) {
            return a.getElementsByTagName ? a.getElementsByTagName(b) : []
        },
        clone: sb,
        triggerHandler: function(a, b, c) {
            var d, e, g, h = b.type || b,
                i = wb(a),
                j = i && i.events,
                k = j && j[h];
            k && (d = {
                preventDefault: function() {
                    this.defaultPrevented = !0
                },
                isDefaultPrevented: function() {
                    return this.defaultPrevented === !0
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0
                },
                isImmediatePropagationStopped: function() {
                    return this.immediatePropagationStopped === !0
                },
                stopPropagation: o,
                type: h,
                target: a
            }, b.type && (d = l(d, b)), e = K(k), g = c ? [d].concat(c) : [d], f(e, function(b) {
                d.isImmediatePropagationStopped() || b.apply(a, g)
            }))
        }
    }, function(a, b) {
        rb.prototype[b] = function(b, c, d) {
            for (var e, f = 0, g = this.length; g > f; f++) r(e) ? (e = a(this[f], b, c, d), s(e) && (e = Pd(e))) : Bb(e, a(this[f], b, c, d));
            return s(e) ? e : this
        }, rb.prototype.bind = rb.prototype.on, rb.prototype.unbind = rb.prototype.off
    }), Lb.prototype = {
        put: function(a, b) {
            this[Kb(a, this.nextUid)] = b
        },
        get: function(a) {
            return this[Kb(a, this.nextUid)]
        },
        remove: function(a) {
            var b = this[a = Kb(a, this.nextUid)];
            return delete this[a], b
        }
    };
    var Be = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        Ce = /,/,
        De = /^\s*(_?)(\S+?)\1\s*$/,
        Ee = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        Fe = d("$injector");
    Ob.$$annotate = Nb;
    var Ge = d("$animate"),
        He = ["$provide", function(a) {
            this.$$selectors = {}, this.register = function(b, c) {
                var d = b + "-animation";
                if (b && "." != b.charAt(0)) throw Ge("notcsel", "Expecting class selector starting with '.' got '{0}'.", b);
                this.$$selectors[b.substr(1)] = d, a.factory(d, c)
            }, this.classNameFilter = function(a) {
                return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
            }, this.$get = ["$$q", "$$asyncCallback", "$rootScope", function(a, b, c) {
                function d(b) {
                    var d, e = a.defer();
                    return e.promise.$$cancelFn = function() {
                        d && d()
                    }, c.$$postDigest(function() {
                        d = b(function() {
                            e.resolve()
                        })
                    }), e.promise
                }

                function e(a, b) {
                    var c = [],
                        d = [],
                        e = ib();
                    return f((a.attr("class") || "").split(/\s+/), function(a) {
                        e[a] = !0
                    }), f(b, function(a, b) {
                        var f = e[b];
                        a === !1 && f ? d.push(b) : a !== !0 || f || c.push(b)
                    }), c.length + d.length > 0 && [c.length ? c : null, d.length ? d : null]
                }

                function g(a, b, c) {
                    for (var d = 0, e = b.length; e > d; ++d) {
                        var f = b[d];
                        a[f] = c
                    }
                }

                function h() {
                    return j || (j = a.defer(), b(function() {
                        j.resolve(), j = null
                    })), j.promise
                }

                function i(a, b) {
                    if (Xd.isObject(b)) {
                        var c = l(b.from || {}, b.to || {});
                        a.css(c)
                    }
                }
                var j;
                return {
                    animate: function(a, b, c) {
                        return i(a, {
                            from: b,
                            to: c
                        }), h()
                    },
                    enter: function(a, b, c, d) {
                        return i(a, d), c ? c.after(a) : b.prepend(a), h()
                    },
                    leave: function(a) {
                        return a.remove(), h()
                    },
                    move: function(a, b, c, d) {
                        return this.enter(a, b, c, d)
                    },
                    addClass: function(a, b, c) {
                        return this.setClass(a, b, [], c)
                    },
                    $$addClassImmediately: function(a, b, c) {
                        return a = Pd(a), b = u(b) ? b : $d(b) ? b.join(" ") : "", f(a, function(a) {
                            Ab(a, b)
                        }), i(a, c), h()
                    },
                    removeClass: function(a, b, c) {
                        return this.setClass(a, [], b, c)
                    },
                    $$removeClassImmediately: function(a, b, c) {
                        return a = Pd(a), b = u(b) ? b : $d(b) ? b.join(" ") : "", f(a, function(a) {
                            zb(a, b)
                        }), i(a, c), h()
                    },
                    setClass: function(a, b, c, f) {
                        var h = this,
                            i = "$$animateClasses",
                            j = !1;
                        a = Pd(a);
                        var k = a.data(i);
                        k ? f && k.options && (k.options = Xd.extend(k.options || {}, f)) : (k = {
                            classes: {},
                            options: f
                        }, j = !0);
                        var l = k.classes;
                        return b = $d(b) ? b : b.split(" "), c = $d(c) ? c : c.split(" "), g(l, b, !0), g(l, c, !1), j && (k.promise = d(function(b) {
                            var c = a.data(i);
                            if (a.removeData(i), c) {
                                var d = e(a, c.classes);
                                d && h.$$setClassImmediately(a, d[0], d[1], c.options)
                            }
                            b()
                        }), a.data(i, k)), k.promise
                    },
                    $$setClassImmediately: function(a, b, c, d) {
                        return b && this.$$addClassImmediately(a, b), c && this.$$removeClassImmediately(a, c), i(a, d), h()
                    },
                    enabled: o,
                    cancel: o
                }
            }]
        }],
        Ie = d("$compile");
    Vb.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Je = /^(x[\:\-_]|data[\:\-_])/i,
        Ke = d("$interpolate"),
        Le = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        Me = {
            http: 80,
            https: 443,
            ftp: 21
        },
        Ne = d("$location"),
        Oe = {
            $$html5: !1,
            $$replace: !1,
            absUrl: vc("$$absUrl"),
            url: function(a) {
                if (r(a)) return this.$$url;
                var b = Le.exec(a);
                return b[1] && this.path(decodeURIComponent(b[1])), (b[2] || b[1]) && this.search(b[3] || ""), this.hash(b[5] || ""), this
            },
            protocol: vc("$$protocol"),
            host: vc("$$host"),
            port: vc("$$port"),
            path: wc("$$path", function(a) {
                return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a
            }),
            search: function(a, b) {
                switch (arguments.length) {
                    case 0:
                        return this.$$search;
                    case 1:
                        if (u(a) || v(a)) a = a.toString(), this.$$search = U(a);
                        else {
                            if (!t(a)) throw Ne("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                            a = J(a, {}), f(a, function(b, c) {
                                null == b && delete a[c]
                            }), this.$$search = a
                        }
                        break;
                    default:
                        r(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
                }
                return this.$$compose(), this
            },
            hash: wc("$$hash", function(a) {
                return null !== a ? a.toString() : ""
            }),
            replace: function() {
                return this.$$replace = !0, this
            }
        };
    f([uc, tc, sc], function(a) {
        a.prototype = Object.create(Oe), a.prototype.state = function(b) {
            if (!arguments.length) return this.$$state;
            if (a !== sc || !this.$$html5) throw Ne("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = r(b) ? null : b, this
        }
    });
    var Pe = d("$parse"),
        Qe = Function.prototype.call,
        Re = Function.prototype.apply,
        Se = Function.prototype.bind,
        Te = ib();
    f({
        "null": function() {
            return null
        },
        "true": function() {
            return !0
        },
        "false": function() {
            return !1
        },
        undefined: function() {}
    }, function(a, b) {
        a.constant = a.literal = a.sharedGetter = !0, Te[b] = a
    }), Te["this"] = function(a) {
        return a
    }, Te["this"].sharedGetter = !0;
    var Ue = l(ib(), {
            "+": function(a, b, d, e) {
                return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
            },
            "-": function(a, b, c, d) {
                return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
            },
            "*": function(a, b, c, d) {
                return c(a, b) * d(a, b)
            },
            "/": function(a, b, c, d) {
                return c(a, b) / d(a, b)
            },
            "%": function(a, b, c, d) {
                return c(a, b) % d(a, b)
            },
            "===": function(a, b, c, d) {
                return c(a, b) === d(a, b)
            },
            "!==": function(a, b, c, d) {
                return c(a, b) !== d(a, b)
            },
            "==": function(a, b, c, d) {
                return c(a, b) == d(a, b)
            },
            "!=": function(a, b, c, d) {
                return c(a, b) != d(a, b)
            },
            "<": function(a, b, c, d) {
                return c(a, b) < d(a, b)
            },
            ">": function(a, b, c, d) {
                return c(a, b) > d(a, b)
            },
            "<=": function(a, b, c, d) {
                return c(a, b) <= d(a, b)
            },
            ">=": function(a, b, c, d) {
                return c(a, b) >= d(a, b)
            },
            "&&": function(a, b, c, d) {
                return c(a, b) && d(a, b)
            },
            "||": function(a, b, c, d) {
                return c(a, b) || d(a, b)
            },
            "!": function(a, b, c) {
                return !c(a, b)
            },
            "=": !0,
            "|": !0
        }),
        Ve = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
        },
        We = function(a) {
            this.options = a
        };
    We.prototype = {
        constructor: We,
        lex: function(a) {
            for (this.text = a, this.index = 0, this.ch = c, this.tokens = []; this.index < this.text.length;)
                if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
                else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
            else if (this.isIdent(this.ch)) this.readIdent();
            else if (this.is("(){}[].,;:?")) this.tokens.push({
                index: this.index,
                text: this.ch
            }), this.index++;
            else if (this.isWhitespace(this.ch)) this.index++;
            else {
                var b = this.ch + this.peek(),
                    d = b + this.peek(2),
                    e = Ue[this.ch],
                    f = Ue[b],
                    g = Ue[d];
                g ? (this.tokens.push({
                    index: this.index,
                    text: d,
                    fn: g
                }), this.index += 3) : f ? (this.tokens.push({
                    index: this.index,
                    text: b,
                    fn: f
                }), this.index += 2) : e ? (this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    fn: e
                }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
            }
            return this.tokens
        },
        is: function(a) {
            return -1 !== a.indexOf(this.ch)
        },
        peek: function(a) {
            var b = a || 1;
            return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
        },
        isNumber: function(a) {
            return a >= "0" && "9" >= a
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
        },
        isIdent: function(a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a)
        },
        throwError: function(a, b, c) {
            c = c || this.index;
            var d = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c;
            throw Pe("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
        },
        readNumber: function() {
            for (var a = "", b = this.index; this.index < this.text.length;) {
                var c = Jd(this.text.charAt(this.index));
                if ("." == c || this.isNumber(c)) a += c;
                else {
                    var d = this.peek();
                    if ("e" == c && this.isExpOperator(d)) a += c;
                    else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c;
                    else {
                        if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            a = 1 * a, this.tokens.push({
                index: b,
                text: a,
                constant: !0,
                fn: function() {
                    return a
                }
            })
        },
        readIdent: function() {
            for (var a, b, d, e, f = this.text, g = "", h = this.index; this.index < this.text.length && (e = this.text.charAt(this.index), "." === e || this.isIdent(e) || this.isNumber(e));) "." === e && (a = this.index), g += e, this.index++;
            if (a && "." === g[g.length - 1] && (this.index--, g = g.slice(0, -1), a = g.lastIndexOf("."), -1 === a && (a = c)), a)
                for (b = this.index; b < this.text.length;) {
                    if (e = this.text.charAt(b), "(" === e) {
                        d = g.substr(a - h + 1), g = g.substr(0, a - h), this.index = b;
                        break
                    }
                    if (!this.isWhitespace(e)) break;
                    b++
                }
            this.tokens.push({
                index: h,
                text: g,
                fn: Te[g] || Fc(g, this.options, f)
            }), d && (this.tokens.push({
                index: a,
                text: "."
            }), this.tokens.push({
                index: a + 1,
                text: d
            }))
        },
        readString: function(a) {
            var b = this.index;
            this.index++;
            for (var c = "", d = a, e = !1; this.index < this.text.length;) {
                var f = this.text.charAt(this.index);
                if (d += f, e) {
                    if ("u" === f) {
                        var g = this.text.substring(this.index + 1, this.index + 5);
                        g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"), this.index += 4, c += String.fromCharCode(parseInt(g, 16))
                    } else {
                        var h = Ve[f];
                        c += h || f
                    }
                    e = !1
                } else if ("\\" === f) e = !0;
                else {
                    if (f === a) return this.index++, void this.tokens.push({
                        index: b,
                        text: d,
                        string: c,
                        constant: !0,
                        fn: function() {
                            return c
                        }
                    });
                    c += f
                }
                this.index++
            }
            this.throwError("Unterminated quote", b)
        }
    };
    var Xe = function(a, b, c) {
        this.lexer = a, this.$filter = b, this.options = c
    };
    Xe.ZERO = l(function() {
        return 0
    }, {
        sharedGetter: !0,
        constant: !0
    }), Xe.prototype = {
        constructor: Xe,
        parse: function(a) {
            this.text = a, this.tokens = this.lexer.lex(a);
            var b = this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), b.literal = !!b.literal, b.constant = !!b.constant, b
        },
        primary: function() {
            var a;
            if (this.expect("(")) a = this.filterChain(), this.consume(")");
            else if (this.expect("[")) a = this.arrayDeclaration();
            else if (this.expect("{")) a = this.object();
            else {
                var b = this.expect();
                a = b.fn, a || this.throwError("not a primary expression", b), b.constant && (a.constant = !0, a.literal = !0)
            }
            for (var c, d; c = this.expect("(", "[", ".");) "(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a
        },
        throwError: function(a, b) {
            throw Pe("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw Pe("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function(a, b, c, d) {
            if (this.tokens.length > 0) {
                var e = this.tokens[0],
                    f = e.text;
                if (f === a || f === b || f === c || f === d || !a && !b && !c && !d) return e
            }
            return !1
        },
        expect: function(a, b, c, d) {
            var e = this.peek(a, b, c, d);
            return e ? (this.tokens.shift(), e) : !1
        },
        consume: function(a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
        },
        unaryFn: function(a, b) {
            return l(function(c, d) {
                return a(c, d, b)
            }, {
                constant: b.constant,
                inputs: [b]
            })
        },
        binaryFn: function(a, b, c, d) {
            return l(function(d, e) {
                return b(d, e, a, c)
            }, {
                constant: a.constant && c.constant,
                inputs: !d && [a, c]
            })
        },
        statements: function() {
            for (var a = [];;)
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function(b, c) {
                    for (var d, e = 0, f = a.length; f > e; e++) d = a[e](b, c);
                    return d
                }
        },
        filterChain: function() {
            for (var a, b = this.expression(); a = this.expect("|");) b = this.filter(b);
            return b
        },
        filter: function(a) {
            var b, d, e = this.expect(),
                f = this.$filter(e.text);
            if (this.peek(":"))
                for (b = [], d = []; this.expect(":");) b.push(this.expression());
            var g = [a].concat(b || []);
            return l(function(e, g) {
                var h = a(e, g);
                if (d) {
                    d[0] = h;
                    for (var i = b.length; i--;) d[i + 1] = b[i](e, g);
                    return f.apply(c, d)
                }
                return f(h)
            }, {
                constant: !f.$stateful && g.every(Cc),
                inputs: !f.$stateful && g
            })
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var a, b, c = this.ternary();
            return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(), l(function(b, d) {
                return c.assign(b, a(b, d), d)
            }, {
                inputs: [c, a]
            })) : c
        },
        ternary: function() {
            var a, b, c = this.logicalOR();
            if (b = this.expect("?")) {
                if (a = this.assignment(), b = this.expect(":")) {
                    var d = this.assignment();
                    return l(function(b, e) {
                        return c(b, e) ? a(b, e) : d(b, e)
                    }, {
                        constant: c.constant && a.constant && d.constant
                    })
                }
                this.throwError("expected :", b)
            }
            return c
        },
        logicalOR: function() {
            for (var a, b = this.logicalAND(); a = this.expect("||");) b = this.binaryFn(b, a.fn, this.logicalAND(), !0);
            return b
        },
        logicalAND: function() {
            var a, b = this.equality();
            return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND(), !0)), b
        },
        equality: function() {
            var a, b = this.relational();
            return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())), b
        },
        relational: function() {
            var a, b = this.additive();
            return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())), b
        },
        additive: function() {
            for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = this.binaryFn(b, a.fn, this.multiplicative());
            return b
        },
        multiplicative: function() {
            for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = this.binaryFn(b, a.fn, this.unary());
            return b
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(Xe.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
        },
        fieldAccess: function(a) {
            var b = this.text,
                c = this.expect().text,
                d = Fc(c, this.options, b);
            return l(function(b, c, e) {
                return d(e || a(b, c))
            }, {
                assign: function(d, e, f) {
                    var g = a(d, f);
                    return g || a.assign(d, g = {}), Dc(g, c, e, b)
                }
            })
        },
        objectIndex: function(a) {
            var b = this.text,
                d = this.expression();
            return this.consume("]"), l(function(e, f) {
                var g, h = a(e, f),
                    i = d(e, f);
                return zc(i, b), h ? g = Ac(h[i], b) : c
            }, {
                assign: function(c, e, f) {
                    var g = zc(d(c, f), b),
                        h = Ac(a(c, f), b);
                    return h || a.assign(c, h = {}), h[g] = e
                }
            })
        },
        functionCall: function(a, b) {
            var c = [];
            if (")" !== this.peekToken().text)
                do c.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var d = this.text,
                e = c.length ? [] : null;
            return function(f, g) {
                var h = b ? b(f, g) : f,
                    i = a(f, g, h) || o;
                if (e)
                    for (var j = c.length; j--;) e[j] = Ac(c[j](f, g), d);
                Ac(h, d), Bc(i, d);
                var k = i.apply ? i.apply(h, e) : i(e[0], e[1], e[2], e[3], e[4]);
                return Ac(k, d)
            }
        },
        arrayDeclaration: function() {
            var a = [];
            if ("]" !== this.peekToken().text)
                do {
                    if (this.peek("]")) break;
                    var b = this.expression();
                    a.push(b)
                } while (this.expect(","));
            return this.consume("]"), l(function(b, c) {
                for (var d = [], e = 0, f = a.length; f > e; e++) d.push(a[e](b, c));
                return d
            }, {
                literal: !0,
                constant: a.every(Cc),
                inputs: a
            })
        },
        object: function() {
            var a = [],
                b = [];
            if ("}" !== this.peekToken().text)
                do {
                    if (this.peek("}")) break;
                    var c = this.expect();
                    a.push(c.string || c.text), this.consume(":");
                    var d = this.expression();
                    b.push(d)
                } while (this.expect(","));
            return this.consume("}"), l(function(c, d) {
                for (var e = {}, f = 0, g = b.length; g > f; f++) e[a[f]] = b[f](c, d);
                return e
            }, {
                literal: !0,
                constant: b.every(Cc),
                inputs: b
            })
        }
    };
    var Ye = ib(),
        Ze = d("$sce"),
        $e = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        Ie = d("$compile"),
        _e = b.createElement("a"),
        af = Wc(a.location.href, !0);
    Zc.$inject = ["$provide"], _c.$inject = ["$locale"], ad.$inject = ["$locale"];
    var bf = ".",
        cf = {
            yyyy: dd("FullYear", 4),
            yy: dd("FullYear", 2, 0, !0),
            y: dd("FullYear", 1),
            MMMM: ed("Month"),
            MMM: ed("Month", !0),
            MM: dd("Month", 2, 1),
            M: dd("Month", 1, 1),
            dd: dd("Date", 2),
            d: dd("Date", 1),
            HH: dd("Hours", 2),
            H: dd("Hours", 1),
            hh: dd("Hours", 2, -12),
            h: dd("Hours", 1, -12),
            mm: dd("Minutes", 2),
            m: dd("Minutes", 1),
            ss: dd("Seconds", 2),
            s: dd("Seconds", 1),
            sss: dd("Milliseconds", 3),
            EEEE: ed("Day"),
            EEE: ed("Day", !0),
            a: jd,
            Z: fd,
            ww: id(2),
            w: id(1)
        },
        df = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,
        ef = /^\-?\d+$/;
    kd.$inject = ["$locale"];
    var ff = q(Jd),
        gf = q(Ld);
    nd.$inject = ["$parse"];
    var hf = q({
            restrict: "E",
            compile: function(a, b) {
                return b.href || b.xlinkHref || b.name ? void 0 : function(a, b) {
                    var c = "[object SVGAnimatedString]" === Vd.call(b.prop("href")) ? "xlink:href" : "href";
                    b.on("click", function(a) {
                        b.attr(c) || a.preventDefault()
                    })
                }
            }
        }),
        jf = {};
    f(ye, function(a, b) {
        if ("multiple" != a) {
            var c = Wb("ng-" + b);
            jf[c] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: function(a, d, e) {
                        a.$watch(e[c], function(a) {
                            e.$set(b, !!a)
                        })
                    }
                }
            }
        }
    }), f(Ae, function(a, b) {
        jf[b] = function() {
            return {
                priority: 100,
                link: function(a, c, d) {
                    if ("ngPattern" === b && "/" == d.ngPattern.charAt(0)) {
                        var e = d.ngPattern.match(Hd);
                        if (e) return void d.$set("ngPattern", new RegExp(e[1], e[2]))
                    }
                    a.$watch(d[b], function(a) {
                        d.$set(b, a)
                    })
                }
            }
        }
    }), f(["src", "srcset", "href"], function(a) {
        var b = Wb("ng-" + a);
        jf[b] = function() {
            return {
                priority: 99,
                link: function(c, d, e) {
                    var f = a,
                        g = a;
                    "href" === a && "[object SVGAnimatedString]" === Vd.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function(b) {
                        return b ? (e.$set(g, b), void(Od && f && d.prop(f, e[g]))) : void("href" === a && e.$set(g, null))
                    })
                }
            }
        }
    });
    var kf = {
            $addControl: o,
            $$renameControl: pd,
            $removeControl: o,
            $setValidity: o,
            $setDirty: o,
            $setPristine: o,
            $setSubmitted: o
        },
        lf = "ng-submitted";
    qd.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
    var mf = function(a) {
            return ["$timeout", function(b) {
                var d = {
                    name: "form",
                    restrict: a ? "EAC" : "E",
                    controller: qd,
                    compile: function(a) {
                        return a.addClass(Ef).addClass(Cf), {
                            pre: function(a, d, e, f) {
                                if (!("action" in e)) {
                                    var g = function(b) {
                                        a.$apply(function() {
                                            f.$commitViewValue(), f.$setSubmitted()
                                        }), b.preventDefault ? b.preventDefault() : b.returnValue = !1
                                    };
                                    me(d[0], "submit", g), d.on("$destroy", function() {
                                        b(function() {
                                            ne(d[0], "submit", g)
                                        }, 0, !1)
                                    })
                                }
                                var h = f.$$parentForm,
                                    i = f.$name;
                                i && (Dc(a, i, f, i), e.$observe(e.name ? "name" : "ngForm", function(b) {
                                    i !== b && (Dc(a, i, c, i), i = b, Dc(a, i, f, i), h.$$renameControl(f, i))
                                })), d.on("$destroy", function() {
                                    h.$removeControl(f), i && Dc(a, i, c, i), l(f, kf)
                                })
                            }
                        }
                    }
                };
                return d
            }]
        },
        nf = mf(),
        of = mf(!0),
        pf = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
        qf = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        rf = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        sf = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
        tf = /^(\d{4})-(\d{2})-(\d{2})$/,
        uf = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        vf = /^(\d{4})-W(\d\d)$/,
        wf = /^(\d{4})-(\d\d)$/,
        xf = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        yf = /(\s+|^)default(\s+|$)/,
        zf = new d("ngModel"),
        Af = {
            text: sd,
            date: wd("date", tf, vd(tf, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
            "datetime-local": wd("datetimelocal", uf, vd(uf, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
            time: wd("time", xf, vd(xf, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
            week: wd("week", vf, ud, "yyyy-Www"),
            month: wd("month", wf, vd(wf, ["yyyy", "MM"]), "yyyy-MM"),
            number: yd,
            url: zd,
            email: Ad,
            radio: Bd,
            checkbox: Dd,
            hidden: o,
            button: o,
            submit: o,
            reset: o,
            file: o
        },
        Bf = ["$browser", "$sniffer", "$filter", "$parse", function(a, b, c, d) {
            return {
                restrict: "E",
                require: ["?ngModel"],
                link: {
                    pre: function(e, f, g, h) {
                        h[0] && (Af[Jd(g.type)] || Af.text)(e, f, g, h[0], b, a, c, d)
                    }
                }
            }
        }],
        Cf = "ng-valid",
        Df = "ng-invalid",
        Ef = "ng-pristine",
        Ff = "ng-dirty",
        Gf = "ng-untouched",
        Hf = "ng-touched",
        If = "ng-pending",
        Jf = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, b, d, e, g, h, i, j, k, l) {
            this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = c, this.$name = l(d.name || "", !1)(a);
            var m = g(d.ngModel),
                n = null,
                p = this,
                q = function() {
                    var b = m(a);
                    return p.$options && p.$options.getterSetter && x(b) && (b = b()), b
                },
                t = function() {
                    var b;
                    p.$options && p.$options.getterSetter && x(b = m(a)) ? b(p.$modelValue) : m.assign(a, p.$modelValue)
                };
            this.$$setOptions = function(a) {
                if (p.$options = a, !(m.assign || a && a.getterSetter)) throw zf("nonassign", "Expression '{0}' is non-assignable. Element: {1}", d.ngModel, S(e))
            }, this.$render = o, this.$isEmpty = function(a) {
                return r(a) || "" === a || null === a || a !== a
            };
            var u = e.inheritedData("$formController") || kf,
                w = 0;
            Ed({
                ctrl: this,
                $element: e,
                set: function(a, b) {
                    a[b] = !0
                },
                unset: function(a, b) {
                    delete a[b]
                },
                parentForm: u,
                $animate: h
            }), this.$setPristine = function() {
                p.$dirty = !1, p.$pristine = !0, h.removeClass(e, Ff), h.addClass(e, Ef)
            }, this.$setUntouched = function() {
                p.$touched = !1, p.$untouched = !0, h.setClass(e, Gf, Hf)
            }, this.$setTouched = function() {
                p.$touched = !0, p.$untouched = !1, h.setClass(e, Hf, Gf)
            }, this.$rollbackViewValue = function() {
                i.cancel(n), p.$viewValue = p.$$lastCommittedViewValue, p.$render()
            }, this.$validate = function() {
                v(p.$modelValue) && isNaN(p.$modelValue) || this.$$parseAndValidate()
            }, this.$$runValidators = function(a, b, d, e) {
                function g(a) {
                    var b = p.$$parserName || "parse";
                    if (a === c) j(b, null);
                    else if (j(b, a), !a) return f(p.$validators, function(a, b) {
                        j(b, null)
                    }), f(p.$asyncValidators, function(a, b) {
                        j(b, null)
                    }), !1;
                    return !0
                }

                function h() {
                    var a = !0;
                    return f(p.$validators, function(c, e) {
                        var f = c(b, d);
                        a = a && f, j(e, f)
                    }), a ? !0 : (f(p.$asyncValidators, function(a, b) {
                        j(b, null)
                    }), !1)
                }

                function i() {
                    var a = [],
                        e = !0;
                    f(p.$asyncValidators, function(f, g) {
                        var h = f(b, d);
                        if (!E(h)) throw zf("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", h);
                        j(g, c), a.push(h.then(function() {
                            j(g, !0)
                        }, function() {
                            e = !1, j(g, !1)
                        }))
                    }), a.length ? k.all(a).then(function() {
                        l(e)
                    }, o) : l(!0)
                }

                function j(a, b) {
                    m === w && p.$setValidity(a, b)
                }

                function l(a) {
                    m === w && e(a)
                }
                w++;
                var m = w;
                return g(a) && h() ? void i() : void l(!1)
            }, this.$commitViewValue = function() {
                var a = p.$viewValue;
                i.cancel(n), (p.$$lastCommittedViewValue !== a || "" === a && p.$$hasNativeValidators) && (p.$$lastCommittedViewValue = a, p.$pristine && (p.$dirty = !0, p.$pristine = !1, h.removeClass(e, Ef), h.addClass(e, Ff), u.$setDirty()), this.$$parseAndValidate())
            }, this.$$parseAndValidate = function() {
                function a() {
                    p.$modelValue !== g && p.$$writeModelToScope()
                }
                var b = p.$$lastCommittedViewValue,
                    d = b,
                    e = r(d) ? c : !0;
                if (e)
                    for (var f = 0; f < p.$parsers.length; f++)
                        if (d = p.$parsers[f](d), r(d)) {
                            e = !1;
                            break
                        }
                v(p.$modelValue) && isNaN(p.$modelValue) && (p.$modelValue = q());
                var g = p.$modelValue,
                    h = p.$options && p.$options.allowInvalid;
                h && (p.$modelValue = d, a()), p.$$runValidators(e, d, b, function(b) {
                    h || (p.$modelValue = b ? d : c, a())
                })
            }, this.$$writeModelToScope = function() {
                t(p.$modelValue), f(p.$viewChangeListeners, function(a) {
                    try {
                        a()
                    } catch (c) {
                        b(c)
                    }
                })
            }, this.$setViewValue = function(a, b) {
                p.$viewValue = a, (!p.$options || p.$options.updateOnDefault) && p.$$debounceViewValueCommit(b)
            }, this.$$debounceViewValueCommit = function(b) {
                var c, d = 0,
                    e = p.$options;
                e && s(e.debounce) && (c = e.debounce, v(c) ? d = c : v(c[b]) ? d = c[b] : v(c["default"]) && (d = c["default"])), i.cancel(n), d ? n = i(function() {
                    p.$commitViewValue()
                }, d) : j.$$phase ? p.$commitViewValue() : a.$apply(function() {
                    p.$commitViewValue()
                })
            }, a.$watch(function() {
                var a = q();
                if (a !== p.$modelValue) {
                    p.$modelValue = a;
                    for (var b = p.$formatters, d = b.length, e = a; d--;) e = b[d](e);
                    p.$viewValue !== e && (p.$viewValue = p.$$lastCommittedViewValue = e, p.$render(), p.$$runValidators(c, a, e, o))
                }
                return a
            })
        }],
        Kf = function() {
            return {
                restrict: "A",
                require: ["ngModel", "^?form", "^?ngModelOptions"],
                controller: Jf,
                priority: 1,
                compile: function(a) {
                    return a.addClass(Ef).addClass(Gf).addClass(Cf), {
                        pre: function(a, b, c, d) {
                            var e = d[0],
                                f = d[1] || kf;
                            e.$$setOptions(d[2] && d[2].$options), f.$addControl(e), c.$observe("name", function(a) {
                                e.$name !== a && f.$$renameControl(e, a)
                            }), a.$on("$destroy", function() {
                                f.$removeControl(e)
                            })
                        },
                        post: function(a, b, c, d) {
                            var e = d[0];
                            e.$options && e.$options.updateOn && b.on(e.$options.updateOn, function(a) {
                                e.$$debounceViewValueCommit(a && a.type)
                            }), b.on("blur", function() {
                                e.$touched || a.$apply(function() {
                                    e.$setTouched()
                                })
                            })
                        }
                    }
                }
            }
        },
        Lf = q({
            restrict: "A",
            require: "ngModel",
            link: function(a, b, c, d) {
                d.$viewChangeListeners.push(function() {
                    a.$eval(c.ngChange)
                })
            }
        }),
        Mf = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    d && (c.required = !0, d.$validators.required = function(a) {
                        return !c.required || !d.$isEmpty(a)
                    }, c.$observe("required", function() {
                        d.$validate()
                    }))
                }
            }
        },
        Nf = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, e, f) {
                    if (f) {
                        var g, h = e.ngPattern || e.pattern;
                        e.$observe("pattern", function(a) {
                            if (u(a) && a.length > 0 && (a = new RegExp(a)), a && !a.test) throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", h, a, S(b));
                            g = a || c, f.$validate()
                        }), f.$validators.pattern = function(a) {
                            return f.$isEmpty(a) || r(g) || g.test(a)
                        }
                    }
                }
            }
        },
        Of = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    if (d) {
                        var e = 0;
                        c.$observe("maxlength", function(a) {
                            e = m(a) || 0, d.$validate()
                        }), d.$validators.maxlength = function(a, b) {
                            return d.$isEmpty(a) || b.length <= e
                        }
                    }
                }
            }
        },
        Pf = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    if (d) {
                        var e = 0;
                        c.$observe("minlength", function(a) {
                            e = m(a) || 0, d.$validate()
                        }), d.$validators.minlength = function(a, b) {
                            return d.$isEmpty(a) || b.length >= e
                        }
                    }
                }
            }
        },
        Qf = function() {
            return {
                restrict: "A",
                priority: 100,
                require: "ngModel",
                link: function(a, b, d, e) {
                    var g = b.attr(d.$attr.ngList) || ", ",
                        h = "false" !== d.ngTrim,
                        i = h ? _d(g) : g,
                        j = function(a) {
                            if (!r(a)) {
                                var b = [];
                                return a && f(a.split(i), function(a) {
                                    a && b.push(h ? _d(a) : a)
                                }), b
                            }
                        };
                    e.$parsers.push(j), e.$formatters.push(function(a) {
                        return $d(a) ? a.join(g) : c
                    }), e.$isEmpty = function(a) {
                        return !a || !a.length
                    }
                }
            }
        },
        Rf = /^(true|false|\d+)$/,
        Sf = function() {
            return {
                restrict: "A",
                priority: 100,
                compile: function(a, b) {
                    return Rf.test(b.ngValue) ? function(a, b, c) {
                        c.$set("value", a.$eval(c.ngValue))
                    } : function(a, b, c) {
                        a.$watch(c.ngValue, function(a) {
                            c.$set("value", a)
                        })
                    }
                }
            }
        },
        Tf = function() {
            return {
                restrict: "A",
                controller: ["$scope", "$attrs", function(a, b) {
                    var d = this;
                    this.$options = a.$eval(b.ngModelOptions), this.$options.updateOn !== c ? (this.$options.updateOnDefault = !1, this.$options.updateOn = _d(this.$options.updateOn.replace(yf, function() {
                        return d.$options.updateOnDefault = !0, " "
                    }))) : this.$options.updateOnDefault = !0
                }]
            }
        },
        Uf = ["$compile", function(a) {
            return {
                restrict: "AC",
                compile: function(b) {
                    return a.$$addBindingClass(b),
                        function(b, d, e) {
                            a.$$addBindingInfo(d, e.ngBind), d = d[0], b.$watch(e.ngBind, function(a) {
                                d.textContent = a === c ? "" : a
                            })
                        }
                }
            }
        }],
        Vf = ["$interpolate", "$compile", function(a, b) {
            return {
                compile: function(d) {
                    return b.$$addBindingClass(d),
                        function(d, e, f) {
                            var g = a(e.attr(f.$attr.ngBindTemplate));
                            b.$$addBindingInfo(e, g.expressions), e = e[0], f.$observe("ngBindTemplate", function(a) {
                                e.textContent = a === c ? "" : a
                            })
                        }
                }
            }
        }],
        Wf = ["$sce", "$parse", "$compile", function(a, b, c) {
            return {
                restrict: "A",
                compile: function(d, e) {
                    var f = b(e.ngBindHtml),
                        g = b(e.ngBindHtml, function(a) {
                            return (a || "").toString()
                        });
                    return c.$$addBindingClass(d),
                        function(b, d, e) {
                            c.$$addBindingInfo(d, e.ngBindHtml), b.$watch(g, function() {
                                d.html(a.getTrustedHtml(f(b)) || "")
                            })
                        }
                }
            }
        }],
        Xf = Gd("", !0),
        Yf = Gd("Odd", 0),
        Zf = Gd("Even", 1),
        $f = od({
            compile: function(a, b) {
                b.$set("ngCloak", c), a.removeClass("ng-cloak")
            }
        }),
        _f = [function() {
            return {
                restrict: "A",
                scope: !0,
                controller: "@",
                priority: 500
            }
        }],
        ag = {},
        bg = {
            blur: !0,
            focus: !0
        };
    f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var b = Wb("ng-" + a);
        ag[b] = ["$parse", "$rootScope", function(c, d) {
            return {
                restrict: "A",
                compile: function(e, f) {
                    var g = c(f[b]);
                    return function(b, c) {
                        c.on(a, function(c) {
                            var e = function() {
                                g(b, {
                                    $event: c
                                })
                            };
                            bg[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e)
                        })
                    }
                }
            }
        }]
    });
    var cg = ["$animate", function(a) {
            return {
                multiElement: !0,
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function(c, d, e, f, g) {
                    var h, i, j;
                    c.$watch(e.ngIf, function(c) {
                        c ? i || g(function(c, f) {
                            i = f, c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {
                                clone: c
                            }, a.enter(c, d.parent(), d)
                        }) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = hb(h.clone), a.leave(j).then(function() {
                            j = null
                        }), h = null))
                    })
                }
            }
        }],
        dg = ["$templateRequest", "$anchorScroll", "$animate", "$sce", function(a, b, c, d) {
            return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                controller: Xd.noop,
                compile: function(e, f) {
                    var g = f.ngInclude || f.src,
                        h = f.onload || "",
                        i = f.autoscroll;
                    return function(e, f, j, k, l) {
                        var m, n, o, p = 0,
                            q = function() {
                                n && (n.remove(), n = null), m && (m.$destroy(), m = null), o && (c.leave(o).then(function() {
                                    n = null
                                }), n = o, o = null)
                            };
                        e.$watch(d.parseAsResourceUrl(g), function(d) {
                            var g = function() {
                                    !s(i) || i && !e.$eval(i) || b()
                                },
                                j = ++p;
                            d ? (a(d, !0).then(function(a) {
                                if (j === p) {
                                    var b = e.$new();
                                    k.template = a;
                                    var i = l(b, function(a) {
                                        q(), c.enter(a, null, f).then(g)
                                    });
                                    m = b, o = i, m.$emit("$includeContentLoaded", d), e.$eval(h)
                                }
                            }, function() {
                                j === p && (q(), e.$emit("$includeContentError", d))
                            }), e.$emit("$includeContentRequested", d)) : (q(), k.template = null)
                        })
                    }
                }
            }
        }],
        eg = ["$compile", function(a) {
            return {
                restrict: "ECA",
                priority: -400,
                require: "ngInclude",
                link: function(d, e, f, g) {
                    return /SVG/.test(e[0].toString()) ? (e.empty(), void a(pb(g.template, b).childNodes)(d, function(a) {
                        e.append(a)
                    }, c, c, e)) : (e.html(g.template), void a(e.contents())(d))
                }
            }
        }],
        fg = od({
            priority: 450,
            compile: function() {
                return {
                    pre: function(a, b, c) {
                        a.$eval(c.ngInit)
                    }
                }
            }
        }),
        gg = od({
            terminal: !0,
            priority: 1e3
        }),
        hg = ["$locale", "$interpolate", function(a, b) {
            var c = /{}/g;
            return {
                restrict: "EA",
                link: function(d, e, g) {
                    var h = g.count,
                        i = g.$attr.when && e.attr(g.$attr.when),
                        j = g.offset || 0,
                        k = d.$eval(i) || {},
                        l = {},
                        m = b.startSymbol(),
                        n = b.endSymbol(),
                        o = /^when(Minus)?(.+)$/;
                    f(g, function(a, b) {
                        o.test(b) && (k[Jd(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
                    }), f(k, function(a, d) {
                        l[d] = b(a.replace(c, m + h + "-" + j + n))
                    }), d.$watch(function() {
                        var b = parseFloat(d.$eval(h));
                        return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)), l[b](d))
                    }, function(a) {
                        e.text(a)
                    })
                }
            }
        }],
        ig = ["$parse", "$animate", function(a, g) {
            var h = "$$NG_REMOVED",
                i = d("ngRepeat"),
                j = function(a, b, c, d, e, f, g) {
                    a[c] = d, e && (a[e] = f), a.$index = b, a.$first = 0 === b, a.$last = b === g - 1, a.$middle = !(a.$first || a.$last), a.$odd = !(a.$even = 0 === (1 & b))
                },
                k = function(a) {
                    return a.clone[0]
                },
                l = function(a) {
                    return a.clone[a.clone.length - 1]
                };
            return {
                restrict: "A",
                multiElement: !0,
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                compile: function(d, m) {
                    var n = m.ngRepeat,
                        o = b.createComment(" end ngRepeat: " + n + " "),
                        p = n.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                    if (!p) throw i("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", n);
                    var q = p[1],
                        r = p[2],
                        s = p[3],
                        t = p[4];
                    if (p = q.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !p) throw i("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", q);
                    var u = p[3] || p[1],
                        v = p[2];
                    if (s && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(s))) throw i("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", s);
                    var w, x, y, z, A = {
                        $id: Kb
                    };
                    return t ? w = a(t) : (y = function(a, b) {
                            return Kb(b)
                        }, z = function(a) {
                            return a
                        }),
                        function(a, b, d, m, p) {
                            w && (x = function(b, c, d) {
                                return v && (A[v] = b), A[u] = c, A.$index = d, w(a, A)
                            });
                            var q = ib();
                            a.$watchCollection(r, function(d) {
                                var m, r, t, w, A, B, C, D, E, F, G, H, I = b[0],
                                    J = ib();
                                if (s && (a[s] = d), e(d)) E = d, D = x || y;
                                else {
                                    D = x || z, E = [];
                                    for (var K in d) d.hasOwnProperty(K) && "$" != K.charAt(0) && E.push(K);
                                    E.sort()
                                }
                                for (w = E.length, G = new Array(w), m = 0; w > m; m++)
                                    if (A = d === E ? m : E[m], B = d[A], C = D(A, B, m), q[C]) F = q[C], delete q[C], J[C] = F, G[m] = F;
                                    else {
                                        if (J[C]) throw f(G, function(a) {
                                            a && a.scope && (q[a.id] = a)
                                        }), i("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", n, C, Q(B));
                                        G[m] = {
                                            id: C,
                                            scope: c,
                                            clone: c
                                        }, J[C] = !0
                                    }
                                for (var L in q) {
                                    if (F = q[L], H = hb(F.clone), g.leave(H), H[0].parentNode)
                                        for (m = 0, r = H.length; r > m; m++) H[m][h] = !0;
                                    F.scope.$destroy()
                                }
                                for (m = 0; w > m; m++)
                                    if (A = d === E ? m : E[m], B = d[A], F = G[m], F.scope) {
                                        t = I;
                                        do t = t.nextSibling; while (t && t[h]);
                                        k(F) != t && g.move(hb(F.clone), null, Pd(I)), I = l(F), j(F.scope, m, u, B, v, A, w)
                                    } else p(function(a, b) {
                                        F.scope = b;
                                        var c = o.cloneNode(!1);
                                        a[a.length++] = c, g.enter(a, null, Pd(I)), I = c, F.clone = a, J[F.id] = F, j(F.scope, m, u, B, v, A, w)
                                    });
                                q = J
                            })
                        }
                }
            }
        }],
        jg = "ng-hide",
        kg = "ng-hide-animate",
        lg = ["$animate", function(a) {
            return {
                restrict: "A",
                multiElement: !0,
                link: function(b, c, d) {
                    b.$watch(d.ngShow, function(b) {
                        a[b ? "removeClass" : "addClass"](c, jg, {
                            tempClasses: kg
                        })
                    })
                }
            }
        }],
        mg = ["$animate", function(a) {
            return {
                restrict: "A",
                multiElement: !0,
                link: function(b, c, d) {
                    b.$watch(d.ngHide, function(b) {
                        a[b ? "addClass" : "removeClass"](c, jg, {
                            tempClasses: kg
                        })
                    })
                }
            }
        }],
        ng = od(function(a, b, c) {
            a.$watch(c.ngStyle, function(a, c) {
                c && a !== c && f(c, function(a, c) {
                    b.css(c, "")
                }), a && b.css(a)
            }, !0)
        }),
        og = ["$animate", function(a) {
            return {
                restrict: "EA",
                require: "ngSwitch",
                controller: ["$scope", function() {
                    this.cases = {}
                }],
                link: function(c, d, e, g) {
                    var h = e.ngSwitch || e.on,
                        i = [],
                        j = [],
                        k = [],
                        l = [],
                        m = function(a, b) {
                            return function() {
                                a.splice(b, 1)
                            }
                        };
                    c.$watch(h, function(c) {
                        var d, e;
                        for (d = 0, e = k.length; e > d; ++d) a.cancel(k[d]);
                        for (k.length = 0, d = 0, e = l.length; e > d; ++d) {
                            var h = hb(j[d].clone);
                            l[d].$destroy();
                            var n = k[d] = a.leave(h);
                            n.then(m(k, d))
                        }
                        j.length = 0, l.length = 0, (i = g.cases["!" + c] || g.cases["?"]) && f(i, function(c) {
                            c.transclude(function(d, e) {
                                l.push(e);
                                var f = c.element;
                                d[d.length++] = b.createComment(" end ngSwitchWhen: ");
                                var g = {
                                    clone: d
                                };
                                j.push(g), a.enter(d, f.parent(), f)
                            })
                        })
                    })
                }
            }
        }],
        pg = od({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(a, b, c, d, e) {
                d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
                    transclude: e,
                    element: b
                })
            }
        }),
        qg = od({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(a, b, c, d, e) {
                d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
                    transclude: e,
                    element: b
                })
            }
        }),
        rg = od({
            restrict: "EAC",
            link: function(a, b, c, e, f) {
                if (!f) throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", S(b));
                f(function(a) {
                    b.empty(), b.append(a)
                })
            }
        }),
        sg = ["$templateCache", function(a) {
            return {
                restrict: "E",
                terminal: !0,
                compile: function(b, c) {
                    if ("text/ng-template" == c.type) {
                        var d = c.id,
                            e = b[0].text;
                        a.put(d, e)
                    }
                }
            }
        }],
        tg = d("ngOptions"),
        ug = q({
            restrict: "A",
            terminal: !0
        }),
        vg = ["$compile", "$parse", function(a, d) {
            var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                h = {
                    $setViewValue: o
                };
            return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: ["$element", "$scope", "$attrs", function(a, b, c) {
                    var d, e, f = this,
                        g = {},
                        i = h;
                    f.databound = c.ngModel, f.init = function(a, b, c) {
                        i = a, d = b, e = c
                    }, f.addOption = function(b, c) {
                        fb(b, '"option value"'), g[b] = !0, i.$viewValue == b && (a.val(b), e.parent() && e.remove()), c && c[0].hasAttribute("selected") && (c[0].selected = !0)
                    }, f.removeOption = function(a) {
                        this.hasOption(a) && (delete g[a], i.$viewValue == a && this.renderUnknownOption(a))
                    }, f.renderUnknownOption = function(b) {
                        var c = "? " + Kb(b) + " ?";
                        e.val(c), a.prepend(e), a.val(c), e.prop("selected", !0)
                    }, f.hasOption = function(a) {
                        return g.hasOwnProperty(a)
                    }, b.$on("$destroy", function() {
                        f.renderUnknownOption = o
                    })
                }],
                link: function(h, i, j, k) {
                    function l(a, b, c, d) {
                        c.$render = function() {
                            var a = c.$viewValue;
                            d.hasOption(a) ? (z.parent() && z.remove(), b.val(a), "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
                        }, b.on("change", function() {
                            a.$apply(function() {
                                z.parent() && z.remove(), c.$setViewValue(b.val())
                            })
                        })
                    }

                    function m(a, b, c) {
                        var d;
                        c.$render = function() {
                            var a = new Lb(c.$viewValue);
                            f(b.find("option"), function(b) {
                                b.selected = s(a.get(b.value))
                            })
                        }, a.$watch(function() {
                            L(d, c.$viewValue) || (d = K(c.$viewValue), c.$render())
                        }), b.on("change", function() {
                            a.$apply(function() {
                                var a = [];
                                f(b.find("option"), function(b) {
                                    b.selected && a.push(b.value)
                                }), c.$setViewValue(a)
                            })
                        })
                    }

                    function n(b, h, i) {
                        function j(a, c, d) {
                            return L[B] = d, E && (L[E] = c), a(b, L)
                        }

                        function k() {
                            b.$apply(function() {
                                var a, c = H(b) || [];
                                if (t) a = [], f(h.val(), function(b) {
                                    a.push(l(b, c[b]))
                                });
                                else {
                                    var d = h.val();
                                    a = l(d, c[d])
                                }
                                i.$setViewValue(a), r()
                            })
                        }

                        function l(a, b) {
                            if ("?" === a) return c;
                            if ("" === a) return null;
                            var d = D ? D : G;
                            return j(d, a, b)
                        }

                        function m() {
                            var a, c = H(b);
                            if (c && $d(c)) {
                                a = new Array(c.length);
                                for (var d = 0, e = c.length; e > d; d++) a[d] = j(A, d, c[d]);
                                return a
                            }
                            if (c) {
                                a = {};
                                for (var f in c) c.hasOwnProperty(f) && (a[f] = j(A, f, c[f]))
                            }
                            return a
                        }

                        function n(a) {
                            var b;
                            if (t)
                                if (J && $d(a)) {
                                    b = new Lb([]);
                                    for (var c = 0; c < a.length; c++) b.put(j(J, null, a[c]), !0)
                                } else b = new Lb(a);
                            else J && (a = j(J, null, a));
                            return function(c, d) {
                                var e;
                                return e = J ? J : D ? D : G, t ? s(b.remove(j(e, c, d))) : a == j(e, c, d)
                            }
                        }

                        function o() {
                            w || (b.$$postDigest(r), w = !0)
                        }

                        function q(a, b, c) {
                            a[b] = a[b] || 0, a[b] += c ? 1 : -1
                        }

                        function r() {
                            w = !1;
                            var a, c, d, e, k, l, m, o, r, u, z, B, C, D, G, I, J = {
                                    "": []
                                },
                                L = [""],
                                M = i.$viewValue,
                                N = H(b) || [],
                                O = E ? g(N) : N,
                                P = {},
                                Q = n(M),
                                R = !1;
                            for (B = 0; u = O.length, u > B; B++) m = B, E && (m = O[B], "$" === m.charAt(0)) || (o = N[m], a = j(F, m, o) || "", (c = J[a]) || (c = J[a] = [], L.push(a)), C = Q(m, o), R = R || C, I = j(A, m, o), I = s(I) ? I : "", c.push({
                                id: E ? O[B] : B,
                                label: I,
                                selected: C
                            }));
                            for (t || (v || null === M ? J[""].unshift({
                                    id: "",
                                    label: "",
                                    selected: !R
                                }) : R || J[""].unshift({
                                    id: "?",
                                    label: "",
                                    selected: !0
                                })), z = 0, r = L.length; r > z; z++) {
                                for (a = L[z], c = J[a], K.length <= z ? (e = {
                                        element: y.clone().attr("label", a),
                                        label: c.label
                                    }, k = [e], K.push(k), h.append(e.element)) : (k = K[z], e = k[0], e.label != a && e.element.attr("label", e.label = a)), D = null, B = 0, u = c.length; u > B; B++) d = c[B], (l = k[B + 1]) ? (D = l.element, l.label !== d.label && (q(P, l.label, !1), q(P, d.label, !0), D.text(l.label = d.label)), l.id !== d.id && D.val(l.id = d.id), D[0].selected !== d.selected && (D.prop("selected", l.selected = d.selected), Od && D.prop("selected", l.selected))) : ("" === d.id && v ? G = v : (G = x.clone()).val(d.id).prop("selected", d.selected).attr("selected", d.selected).text(d.label), k.push(l = {
                                    element: G,
                                    label: d.label,
                                    id: d.id,
                                    selected: d.selected
                                }), q(P, d.label, !0), D ? D.after(G) : e.element.append(G), D = G);
                                for (B++; k.length > B;) d = k.pop(), q(P, d.label, !1), d.element.remove();
                                f(P, function(a, b) {
                                    a > 0 ? p.addOption(b) : 0 > a && p.removeOption(b)
                                })
                            }
                            for (; K.length > z;) K.pop()[0].element.remove()
                        }
                        var z;
                        if (!(z = u.match(e))) throw tg("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", u, S(h));
                        var A = d(z[2] || z[1]),
                            B = z[4] || z[6],
                            C = / as /.test(z[0]) && z[1],
                            D = C ? d(C) : null,
                            E = z[5],
                            F = d(z[3] || ""),
                            G = d(z[2] ? z[1] : B),
                            H = d(z[7]),
                            I = z[8],
                            J = I ? d(z[8]) : null,
                            K = [
                                [{
                                    element: h,
                                    label: ""
                                }]
                            ],
                            L = {};
                        v && (a(v)(b), v.removeClass("ng-scope"), v.remove()), h.empty(), h.on("change", k), i.$render = r, b.$watchCollection(H, o), b.$watchCollection(m, o), t && b.$watchCollection(function() {
                            return i.$modelValue
                        }, o)
                    }
                    if (k[1]) {
                        for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = !1, x = Pd(b.createElement("option")), y = Pd(b.createElement("optgroup")), z = x.clone(), A = 0, B = i.children(), C = B.length; C > A; A++)
                            if ("" === B[A].value) {
                                o = v = B.eq(A);
                                break
                            }
                        p.init(q, v, z), t && (q.$isEmpty = function(a) {
                            return !a || 0 === a.length
                        }), u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
                    }
                }
            }
        }],
        wg = ["$interpolate", function(a) {
            var b = {
                addOption: o,
                removeOption: o
            };
            return {
                restrict: "E",
                priority: 100,
                compile: function(c, d) {
                    if (r(d.value)) {
                        var e = a(c.text(), !0);
                        e || d.$set("value", c.text())
                    }
                    return function(a, c, d) {
                        var f = "$selectController",
                            g = c.parent(),
                            h = g.data(f) || g.parent().data(f);
                        h && h.databound || (h = b), e ? a.$watch(e, function(a, b) {
                            d.$set("value", a), b !== a && h.removeOption(b), h.addOption(a, c)
                        }) : h.addOption(d.value, c), c.on("$destroy", function() {
                            h.removeOption(d.value)
                        })
                    }
                }
            }
        }],
        xg = q({
            restrict: "E",
            terminal: !1
        });
    return a.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (cb(), kb(Xd), void Pd(b).ready(function() {
        Z(b, $)
    }))
}(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>'),
    function(a, b, c) {
        "use strict";
        b.module("ngAnimate", ["ng"]).directive("ngAnimateChildren", function() {
            var a = "$$ngAnimateChildren";
            return function(c, d, e) {
                var f = e.ngAnimateChildren;
                b.isString(f) && 0 === f.length ? d.data(a, !0) : c.$watch(f, function(b) {
                    d.data(a, !!b)
                })
            }
        }).factory("$$animateReflow", ["$$rAF", "$document", function(a, b) {
            var c = b[0].body;
            return function(b) {
                return a(function() {
                    c.offsetWidth + 1;
                    b()
                })
            }
        }]).config(["$provide", "$animateProvider", function(d, e) {
            function f(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    if (c.nodeType == p) return c
                }
            }

            function g(a) {
                return a && b.element(a)
            }

            function h(a) {
                return b.element(f(a))
            }

            function i(a, b) {
                return f(a) == f(b)
            }
            var j = b.noop,
                k = b.forEach,
                l = e.$$selectors,
                m = b.isArray,
                n = b.isString,
                o = b.isObject,
                p = 1,
                q = "$$ngAnimateState",
                r = "$$ngAnimateChildren",
                s = "ng-animate",
                t = {
                    running: !0
                };
            d.decorator("$animate", ["$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", function(a, c, d, p, u, v, w, x, y) {
                function z(a, b) {
                    var c = a.data(q) || {};
                    return b && (c.running = !0, c.structural = !0, a.data(q, c)), c.disabled || c.running && c.structural
                }

                function A(a) {
                    var b, d = c.defer();
                    return d.promise.$$cancelFn = function() {
                        b && b()
                    }, w.$$postDigest(function() {
                        b = a(function() {
                            d.resolve()
                        })
                    }), d.promise
                }

                function B(a) {
                    return o(a) ? (a.tempClasses && n(a.tempClasses) && (a.tempClasses = a.tempClasses.split(/\s+/)), a) : void 0
                }

                function C(a, b, c) {
                    c = c || {};
                    var d = {};
                    k(c, function(a, b) {
                        k(b.split(" "), function(b) {
                            d[b] = a
                        })
                    });
                    var e = Object.create(null);
                    k((a.attr("class") || "").split(/\s+/), function(a) {
                        e[a] = !0
                    });
                    var f = [],
                        g = [];
                    return k(b.classes, function(a, b) {
                        var c = e[b],
                            h = d[b] || {};
                        a === !1 ? (c || "addClass" == h.event) && g.push(b) : a === !0 && (c && "removeClass" != h.event || f.push(b))
                    }), f.length + g.length > 0 && [f.join(" "), g.join(" ")]
                }

                function D(a) {
                    if (a) {
                        var b = [],
                            c = {},
                            e = a.substr(1).split(".");
                        (p.transitions || p.animations) && b.push(d.get(l[""]));
                        for (var f = 0; f < e.length; f++) {
                            var g = e[f],
                                h = l[g];
                            h && !c[g] && (b.push(d.get(h)), c[g] = !0)
                        }
                        return b
                    }
                }

                function E(a, c, d, e) {
                    function f(a, b) {
                        var c = a[b],
                            d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
                        return c || d ? ("leave" == b && (d = c, c = null), w.push({
                            event: b,
                            fn: c
                        }), t.push({
                            event: b,
                            fn: d
                        }), !0) : void 0
                    }

                    function g(b, c, f) {
                        function g(a) {
                            if (c) {
                                if ((c[a] || j)(), ++m < h.length) return;
                                c = null
                            }
                            f()
                        }
                        var h = [];
                        k(b, function(a) {
                            a.fn && h.push(a)
                        });
                        var m = 0;
                        k(h, function(b, f) {
                            var h = function() {
                                g(f)
                            };
                            switch (b.event) {
                                case "setClass":
                                    c.push(b.fn(a, i, l, h, e));
                                    break;
                                case "animate":
                                    c.push(b.fn(a, d, e.from, e.to, h));
                                    break;
                                case "addClass":
                                    c.push(b.fn(a, i || d, h, e));
                                    break;
                                case "removeClass":
                                    c.push(b.fn(a, l || d, h, e));
                                    break;
                                default:
                                    c.push(b.fn(a, h, e))
                            }
                        }), c && 0 === c.length && f()
                    }
                    var h = a[0];
                    if (h) {
                        e && (e.to = e.to || {}, e.from = e.from || {});
                        var i, l;
                        m(d) && (i = d[0], l = d[1], i ? l ? d = i + " " + l : (d = i, c = "addClass") : (d = l, c = "removeClass"));
                        var n = "setClass" == c,
                            o = n || "addClass" == c || "removeClass" == c || "animate" == c,
                            p = a.attr("class"),
                            q = p + " " + d;
                        if (M(q)) {
                            var r = j,
                                s = [],
                                t = [],
                                u = j,
                                v = [],
                                w = [],
                                x = (" " + q).replace(/\s+/g, ".");
                            return k(D(x), function(a) {
                                var b = f(a, c);
                                !b && n && (f(a, "addClass"), f(a, "removeClass"))
                            }), {
                                node: h,
                                event: c,
                                className: d,
                                isClassBased: o,
                                isSetClassOperation: n,
                                applyStyles: function() {
                                    e && a.css(b.extend(e.from || {}, e.to || {}))
                                },
                                before: function(a) {
                                    r = a, g(t, s, function() {
                                        r = j, a()
                                    })
                                },
                                after: function(a) {
                                    u = a, g(w, v, function() {
                                        u = j, a()
                                    })
                                },
                                cancel: function() {
                                    s && (k(s, function(a) {
                                        (a || j)(!0)
                                    }), r(!0)), v && (k(v, function(a) {
                                        (a || j)(!0)
                                    }), u(!0))
                                }
                            }
                        }
                    }
                }

                function F(a, c, d, e, f, g, h, i) {
                    function l(b) {
                        var e = "$animate:" + b;
                        w && w[e] && w[e].length > 0 && v(function() {
                            d.triggerHandler(e, {
                                event: a,
                                className: c
                            })
                        })
                    }

                    function m() {
                        l("before")
                    }

                    function n() {
                        l("after")
                    }

                    function o() {
                        l("close"), i()
                    }

                    function p() {
                        p.hasBeenRun || (p.hasBeenRun = !0, g())
                    }

                    function r() {
                        if (!r.hasBeenRun) {
                            u && u.applyStyles(), r.hasBeenRun = !0, h && h.tempClasses && k(h.tempClasses, function(a) {
                                d.removeClass(a)
                            });
                            var b = d.data(q);
                            b && (u && u.isClassBased ? H(d, c) : (v(function() {
                                var b = d.data(q) || {};
                                G == b.index && H(d, c, a)
                            }), d.data(q, b))), o()
                        }
                    }
                    var t = j,
                        u = E(d, a, c, h);
                    if (!u) return p(), m(), n(), r(), t;
                    a = u.event, c = u.className;
                    var w = b.element._data(u.node);
                    if (w = w && w.events, e || (e = f ? f.parent() : d.parent()), I(d, e)) return p(), m(), n(), r(), t;
                    var x = d.data(q) || {},
                        y = x.active || {},
                        z = x.totalActive || 0,
                        A = x.last,
                        B = !1;
                    if (z > 0) {
                        var C = [];
                        if (u.isClassBased) {
                            if ("setClass" == A.event) C.push(A), H(d, c);
                            else if (y[c]) {
                                var D = y[c];
                                D.event == a ? B = !0 : (C.push(D), H(d, c))
                            }
                        } else if ("leave" == a && y["ng-leave"]) B = !0;
                        else {
                            for (var F in y) C.push(y[F]);
                            x = {}, H(d, !0)
                        }
                        C.length > 0 && k(C, function(a) {
                            a.cancel()
                        })
                    }
                    if (!u.isClassBased || u.isSetClassOperation || "animate" == a || B || (B = "addClass" == a == d.hasClass(c)), B) return p(), m(), n(), o(), t;
                    y = x.active || {}, z = x.totalActive || 0, "leave" == a && d.one("$destroy", function() {
                        var a = b.element(this),
                            c = a.data(q);
                        if (c) {
                            var d = c.active["ng-leave"];
                            d && (d.cancel(), H(a, "ng-leave"))
                        }
                    }), d.addClass(s), h && h.tempClasses && k(h.tempClasses, function(a) {
                        d.addClass(a)
                    });
                    var G = K++;
                    return z++, y[c] = u, d.data(q, {
                        last: u,
                        active: y,
                        index: G,
                        totalActive: z
                    }), m(), u.before(function(b) {
                        var e = d.data(q);
                        b = b || !e || !e.active[c] || u.isClassBased && e.active[c].event != a, p(), b === !0 ? r() : (n(), u.after(r))
                    }), u.cancel
                }

                function G(a) {
                    var c = f(a);
                    if (c) {
                        var d = b.isFunction(c.getElementsByClassName) ? c.getElementsByClassName(s) : c.querySelectorAll("." + s);
                        k(d, function(a) {
                            a = b.element(a);
                            var c = a.data(q);
                            c && c.active && k(c.active, function(a) {
                                a.cancel()
                            })
                        })
                    }
                }

                function H(a, b) {
                    if (i(a, u)) t.disabled || (t.running = !1, t.structural = !1);
                    else if (b) {
                        var c = a.data(q) || {},
                            d = b === !0;
                        !d && c.active && c.active[b] && (c.totalActive--, delete c.active[b]), (d || !c.totalActive) && (a.removeClass(s), a.removeData(q))
                    }
                }

                function I(a, c) {
                    if (t.disabled) return !0;
                    if (i(a, u)) return t.running;
                    var d, e, f;
                    do {
                        if (0 === c.length) break;
                        var g = i(c, u),
                            h = g ? t : c.data(q) || {};
                        if (h.disabled) return !0;
                        if (g && (f = !0), d !== !1) {
                            var j = c.data(r);
                            b.isDefined(j) && (d = j)
                        }
                        e = e || h.running || h.last && !h.last.isClassBased
                    } while (c = c.parent());
                    return !f || !d && e
                }
                u.data(q, t);
                var J = w.$watch(function() {
                        return y.totalPendingRequests
                    }, function(a) {
                        0 === a && (J(), w.$$postDigest(function() {
                            w.$$postDigest(function() {
                                t.running = !1
                            })
                        }))
                    }),
                    K = 0,
                    L = e.classNameFilter(),
                    M = L ? function(a) {
                        return L.test(a)
                    } : function() {
                        return !0
                    };
                return {
                    animate: function(a, b, c, d, e) {
                        return d = d || "ng-inline-animate", e = B(e) || {}, e.from = c ? b : null, e.to = c ? c : b, A(function(b) {
                            return F("animate", d, h(a), null, null, j, e, b)
                        })
                    },
                    enter: function(c, d, e, f) {
                        return f = B(f), c = b.element(c), d = g(d), e = g(e), z(c, !0), a.enter(c, d, e), A(function(a) {
                            return F("enter", "ng-enter", h(c), d, e, j, f, a)
                        })
                    },
                    leave: function(c, d) {
                        return d = B(d), c = b.element(c), G(c), z(c, !0), A(function(b) {
                            return F("leave", "ng-leave", h(c), null, null, function() {
                                a.leave(c)
                            }, d, b)
                        })
                    },
                    move: function(c, d, e, f) {
                        return f = B(f), c = b.element(c), d = g(d), e = g(e), G(c), z(c, !0), a.move(c, d, e), A(function(a) {
                            return F("move", "ng-move", h(c), d, e, j, f, a)
                        })
                    },
                    addClass: function(a, b, c) {
                        return this.setClass(a, b, [], c)
                    },
                    removeClass: function(a, b, c) {
                        return this.setClass(a, [], b, c)
                    },
                    setClass: function(c, d, e, g) {
                        g = B(g);
                        var i = "$$animateClasses";
                        if (c = b.element(c), c = h(c), z(c)) return a.$$setClassImmediately(c, d, e, g);
                        var j, l = c.data(i),
                            n = !!l;
                        return l || (l = {}, l.classes = {}), j = l.classes, d = m(d) ? d : d.split(" "), k(d, function(a) {
                            a && a.length && (j[a] = !0)
                        }), e = m(e) ? e : e.split(" "), k(e, function(a) {
                            a && a.length && (j[a] = !1)
                        }), n ? (g && l.options && (l.options = b.extend(l.options || {}, g)), l.promise) : (c.data(i, l = {
                            classes: j,
                            options: g
                        }), l.promise = A(function(b) {
                            var d = c.parent(),
                                e = f(c),
                                g = e.parentNode;
                            if (!g || g.$$NG_REMOVED || e.$$NG_REMOVED) return void b();
                            var h = c.data(i);
                            c.removeData(i);
                            var j = c.data(q) || {},
                                k = C(c, h, j.active);
                            return k ? F("setClass", k, c, d, null, function() {
                                k[0] && a.$$addClassImmediately(c, k[0]), k[1] && a.$$removeClassImmediately(c, k[1])
                            }, h.options, b) : b()
                        }))
                    },
                    cancel: function(a) {
                        a.$$cancelFn()
                    },
                    enabled: function(a, b) {
                        switch (arguments.length) {
                            case 2:
                                if (a) H(b);
                                else {
                                    var c = b.data(q) || {};
                                    c.disabled = !0, b.data(q, c)
                                }
                                break;
                            case 1:
                                t.disabled = !a;
                                break;
                            default:
                                a = !t.disabled
                        }
                        return !!a
                    }
                }
            }]), e.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function(d, e, g, h) {
                function i() {
                    I || (I = h(function() {
                        V = [], I = null, T = {}
                    }))
                }

                function l(a, b) {
                    I && I(), V.push(b), I = h(function() {
                        k(V, function(a) {
                            a()
                        }), V = [], I = null, T = {}
                    })
                }

                function o(a, c) {
                    var d = f(a);
                    a = b.element(d), Y.push(a);
                    var e = Date.now() + c;
                    X >= e || (g.cancel(W), X = e, W = g(function() {
                        q(Y), Y = []
                    }, c, !1))
                }

                function q(a) {
                    k(a, function(a) {
                        var b = a.data(P);
                        b && k(b.closeAnimationFns, function(a) {
                            a()
                        })
                    })
                }

                function r(a, b) {
                    var c = b ? T[b] : null;
                    if (!c) {
                        var e = 0,
                            f = 0,
                            g = 0,
                            h = 0;
                        k(a, function(a) {
                            if (a.nodeType == p) {
                                var b = d.getComputedStyle(a) || {},
                                    c = b[D + J];
                                e = Math.max(s(c), e);
                                var i = b[D + L];
                                f = Math.max(s(i), f); {
                                    b[F + L]
                                }
                                h = Math.max(s(b[F + L]), h);
                                var j = s(b[F + J]);
                                j > 0 && (j *= parseInt(b[F + M], 10) || 1), g = Math.max(j, g)
                            }
                        }), c = {
                            total: 0,
                            transitionDelay: f,
                            transitionDuration: e,
                            animationDelay: h,
                            animationDuration: g
                        }, b && (T[b] = c)
                    }
                    return c
                }

                function s(a) {
                    var b = 0,
                        c = n(a) ? a.split(/\s*,\s*/) : [];
                    return k(c, function(a) {
                        b = Math.max(parseFloat(a) || 0, b)
                    }), b
                }

                function t(a) {
                    var b = a.parent(),
                        c = b.data(O);
                    return c || (b.data(O, ++U), c = U), c + "-" + f(a).getAttribute("class")
                }

                function u(a, b, c, d) {
                    var e = ["ng-enter", "ng-leave", "ng-move"].indexOf(c) >= 0,
                        g = t(b),
                        h = g + " " + c,
                        i = T[h] ? ++T[h].total : 0,
                        j = {};
                    if (i > 0) {
                        var k = c + "-stagger",
                            l = g + " " + k,
                            m = !T[l];
                        m && b.addClass(k), j = r(b, l), m && b.removeClass(k)
                    }
                    b.addClass(c);
                    var n = b.data(P) || {},
                        o = r(b, h),
                        p = o.transitionDuration,
                        q = o.animationDuration;
                    if (e && 0 === p && 0 === q) return b.removeClass(c), !1;
                    var s = d || e && p > 0,
                        u = q > 0 && j.animationDelay > 0 && 0 === j.animationDuration,
                        v = n.closeAnimationFns || [];
                    b.data(P, {
                        stagger: j,
                        cacheKey: h,
                        running: n.running || 0,
                        itemIndex: i,
                        blockTransition: s,
                        closeAnimationFns: v
                    });
                    var y = f(b);
                    return s && (w(y, !0), d && b.css(d)), u && x(y, !0), !0
                }

                function v(a, b, c, d, e) {
                    function h() {
                        b.off(L, i), b.removeClass(m), b.removeClass(n), J && g.cancel(J), B(b, c);
                        var a = f(b);
                        for (var d in q) a.style.removeProperty(q[d])
                    }

                    function i(a) {
                        a.stopPropagation();
                        var b = a.originalEvent || a,
                            c = b.$manualTimeStamp || b.timeStamp || Date.now(),
                            e = parseFloat(b.elapsedTime.toFixed(Q));
                        Math.max(c - K, 0) >= F && e >= C && d()
                    }
                    var j = f(b),
                        l = b.data(P);
                    if (-1 == j.getAttribute("class").indexOf(c) || !l) return void d();
                    var m = "",
                        n = "";
                    k(c.split(" "), function(a, b) {
                        var c = (b > 0 ? " " : "") + a;
                        m += c + "-active", n += c + "-pending"
                    });
                    var p = "",
                        q = [],
                        s = l.itemIndex,
                        t = l.stagger,
                        u = 0;
                    if (s > 0) {
                        var v = 0;
                        t.transitionDelay > 0 && 0 === t.transitionDuration && (v = t.transitionDelay * s);
                        var y = 0;
                        t.animationDelay > 0 && 0 === t.animationDuration && (y = t.animationDelay * s, q.push(H + "animation-play-state")), u = Math.round(100 * Math.max(v, y)) / 100
                    }
                    u || (b.addClass(m), l.blockTransition && w(j, !1));
                    var z = l.cacheKey + " " + m,
                        A = r(b, z),
                        C = Math.max(A.transitionDuration, A.animationDuration);
                    if (0 === C) return b.removeClass(m), B(b, c), void d();
                    !u && e && (A.transitionDuration || (b.css("transition", A.animationDuration + "s linear all"), q.push("transition")), b.css(e));
                    var D = Math.max(A.transitionDelay, A.animationDelay),
                        F = D * S;
                    if (q.length > 0) {
                        var I = j.getAttribute("style") || "";
                        ";" !== I.charAt(I.length - 1) && (I += ";"), j.setAttribute("style", I + " " + p)
                    }
                    var J, K = Date.now(),
                        L = G + " " + E,
                        M = (D + C) * R,
                        N = (u + M) * S;
                    return u > 0 && (b.addClass(n), J = g(function() {
                        J = null, A.transitionDuration > 0 && w(j, !1), A.animationDuration > 0 && x(j, !1), b.addClass(m), b.removeClass(n), e && (0 === A.transitionDuration && b.css("transition", A.animationDuration + "s linear all"), b.css(e), q.push("transition"))
                    }, u * S, !1)), b.on(L, i), l.closeAnimationFns.push(function() {
                        h(), d()
                    }), l.running++, o(b, N), h
                }

                function w(a, b) {
                    a.style[D + K] = b ? "none" : ""
                }

                function x(a, b) {
                    a.style[F + N] = b ? "paused" : ""
                }

                function y(a, b, c, d) {
                    return u(a, b, c, d) ? function(a) {
                        a && B(b, c)
                    } : void 0
                }

                function z(a, b, c, d, e) {
                    return b.data(P) ? v(a, b, c, d, e) : (B(b, c), void d())
                }

                function A(a, b, c, d, e) {
                    var f = y(a, b, c, e.from);
                    if (!f) return i(), void d();
                    var g = f;
                    return l(b, function() {
                            g = z(a, b, c, d, e.to)
                        }),
                        function(a) {
                            (g || j)(a)
                        }
                }

                function B(a, b) {
                    a.removeClass(b);
                    var c = a.data(P);
                    c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData(P))
                }

                function C(a, b) {
                    var c = "";
                    return a = m(a) ? a : a.split(/\s+/), k(a, function(a, d) {
                        a && a.length > 0 && (c += (d > 0 ? " " : "") + a + b)
                    }), c
                }
                var D, E, F, G, H = "";
                a.ontransitionend === c && a.onwebkittransitionend !== c ? (H = "-webkit-", D = "WebkitTransition", E = "webkitTransitionEnd transitionend") : (D = "transition", E = "transitionend"), a.onanimationend === c && a.onwebkitanimationend !== c ? (H = "-webkit-", F = "WebkitAnimation", G = "webkitAnimationEnd animationend") : (F = "animation", G = "animationend");
                var I, J = "Duration",
                    K = "Property",
                    L = "Delay",
                    M = "IterationCount",
                    N = "PlayState",
                    O = "$$ngAnimateKey",
                    P = "$$ngAnimateCSS3Data",
                    Q = 3,
                    R = 1.5,
                    S = 1e3,
                    T = {},
                    U = 0,
                    V = [],
                    W = null,
                    X = 0,
                    Y = [];
                return {
                    animate: function(a, b, c, d, e, f) {
                        return f = f || {}, f.from = c, f.to = d, A("animate", a, b, e, f)
                    },
                    enter: function(a, b, c) {
                        return c = c || {}, A("enter", a, "ng-enter", b, c)
                    },
                    leave: function(a, b, c) {
                        return c = c || {}, A("leave", a, "ng-leave", b, c)
                    },
                    move: function(a, b, c) {
                        return c = c || {}, A("move", a, "ng-move", b, c)
                    },
                    beforeSetClass: function(a, b, c, d, e) {
                        e = e || {};
                        var f = C(c, "-remove") + " " + C(b, "-add"),
                            g = y("setClass", a, f, e.from);
                        return g ? (l(a, d), g) : (i(), void d())
                    },
                    beforeAddClass: function(a, b, c, d) {
                        d = d || {};
                        var e = y("addClass", a, C(b, "-add"), d.from);
                        return e ? (l(a, c), e) : (i(), void c())
                    },
                    beforeRemoveClass: function(a, b, c, d) {
                        d = d || {};
                        var e = y("removeClass", a, C(b, "-remove"), d.from);
                        return e ? (l(a, c), e) : (i(), void c())
                    },
                    setClass: function(a, b, c, d, e) {
                        e = e || {}, c = C(c, "-remove"), b = C(b, "-add");
                        var f = c + " " + b;
                        return z("setClass", a, f, d, e.to)
                    },
                    addClass: function(a, b, c, d) {
                        return d = d || {}, z("addClass", a, C(b, "-add"), c, d.to)
                    },
                    removeClass: function(a, b, c, d) {
                        return d = d || {}, z("removeClass", a, C(b, "-remove"), c, d.to)
                    }
                }
            }])
        }])
    }(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
    function(a, b, c) {
        "use strict";

        function d(a, b) {
            return J(new(J(function() {}, {
                prototype: a
            })), b)
        }

        function e(a) {
            return I(arguments, function(b) {
                b !== a && I(b, function(b, c) {
                    a.hasOwnProperty(c) || (a[c] = b)
                })
            }), a
        }

        function f(a, b) {
            var c = [];
            for (var d in a.path) {
                if (a.path[d] !== b.path[d]) break;
                c.push(a.path[d])
            }
            return c
        }

        function g(a) {
            if (Object.keys) return Object.keys(a);
            var c = [];
            return b.forEach(a, function(a, b) {
                c.push(b)
            }), c
        }

        function h(a, b) {
            if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
            var c = a.length >>> 0,
                d = Number(arguments[2]) || 0;
            for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)
                if (d in a && a[d] === b) return d;
            return -1
        }

        function i(a, b, c, d) {
            var e, i = f(c, d),
                j = {},
                k = [];
            for (var l in i)
                if (i[l].params && (e = g(i[l].params), e.length))
                    for (var m in e) h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
            return J({}, j, b)
        }

        function j(a, b, c) {
            if (!c) {
                c = [];
                for (var d in a) c.push(d)
            }
            for (var e = 0; e < c.length; e++) {
                var f = c[e];
                if (a[f] != b[f]) return !1
            }
            return !0
        }

        function k(a, b) {
            var c = {};
            return I(a, function(a) {
                c[a] = b[a]
            }), c
        }

        function l(a, b) {
            var d = 1,
                f = 2,
                g = {},
                h = [],
                i = g,
                j = J(a.when(g), {
                    $$promises: g,
                    $$values: g
                });
            this.study = function(g) {
                function k(a, c) {
                    if (o[c] !== f) {
                        if (n.push(c), o[c] === d) throw n.splice(0, n.indexOf(c)), new Error("Cyclic dependency: " + n.join(" -> "));
                        if (o[c] = d, F(a)) m.push(c, [function() {
                            return b.get(a)
                        }], h);
                        else {
                            var e = b.annotate(a);
                            I(e, function(a) {
                                a !== c && g.hasOwnProperty(a) && k(g[a], a)
                            }), m.push(c, a, e)
                        }
                        n.pop(), o[c] = f
                    }
                }

                function l(a) {
                    return G(a) && a.then && a.$$promises
                }
                if (!G(g)) throw new Error("'invocables' must be an object");
                var m = [],
                    n = [],
                    o = {};
                return I(g, k), g = n = o = null,
                    function(d, f, g) {
                        function h() {
                            --s || (t || e(r, f.$$values), p.$$values = r, p.$$promises = !0, delete p.$$inheritedValues, o.resolve(r))
                        }

                        function k(a) {
                            p.$$failure = a, o.reject(a)
                        }

                        function n(c, e, f) {
                            function i(a) {
                                l.reject(a), k(a)
                            }

                            function j() {
                                if (!D(p.$$failure)) try {
                                    l.resolve(b.invoke(e, g, r)), l.promise.then(function(a) {
                                        r[c] = a, h()
                                    }, i)
                                } catch (a) {
                                    i(a)
                                }
                            }
                            var l = a.defer(),
                                m = 0;
                            I(f, function(a) {
                                q.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, q[a].then(function(b) {
                                    r[a] = b, --m || j()
                                }, i))
                            }), m || j(), q[c] = l.promise
                        }
                        if (l(d) && g === c && (g = f, f = d, d = null), d) {
                            if (!G(d)) throw new Error("'locals' must be an object")
                        } else d = i;
                        if (f) {
                            if (!l(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                        } else f = j;
                        var o = a.defer(),
                            p = o.promise,
                            q = p.$$promises = {},
                            r = J({}, d),
                            s = 1 + m.length / 3,
                            t = !1;
                        if (D(f.$$failure)) return k(f.$$failure), p;
                        f.$$inheritedValues && e(r, f.$$inheritedValues), f.$$values ? (t = e(r, f.$$values), p.$$inheritedValues = f.$$values, h()) : (f.$$inheritedValues && (p.$$inheritedValues = f.$$inheritedValues), J(q, f.$$promises), f.then(h, k));
                        for (var u = 0, v = m.length; v > u; u += 3) d.hasOwnProperty(m[u]) ? h() : n(m[u], m[u + 1], m[u + 2]);
                        return p
                    }
            }, this.resolve = function(a, b, c, d) {
                return this.study(a)(b, c, d)
            }
        }

        function m(a, b, c) {
            this.fromConfig = function(a, b, c) {
                return D(a.template) ? this.fromString(a.template, b) : D(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : D(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
            }, this.fromString = function(a, b) {
                return E(a) ? a(b) : a
            }, this.fromUrl = function(c, d) {
                return E(c) && (c = c(d)), null == c ? null : a.get(c, {
                    cache: b
                }).then(function(a) {
                    return a.data
                })
            }, this.fromProvider = function(a, b, d) {
                return c.invoke(a, null, d || {
                    params: b
                })
            }
        }

        function n(a, d) {
            function e(a) {
                return D(a) ? this.type.decode(a) : p.$$getDefaultValue(this)
            }

            function f(b, c, d) {
                if (!/^\w+(-+\w+)*$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
                if (n[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
                n[b] = J({
                    type: c || new o,
                    $value: e
                }, d)
            }

            function g(a, b, c) {
                var d = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
                if (!b) return d;
                var e = c ? "?" : "";
                return d + e + "(" + b + ")" + e
            }

            function h(a) {
                if (!d.params || !d.params[a]) return {};
                var b = d.params[a];
                return G(b) ? b : {
                    value: b
                }
            }
            d = b.isObject(d) ? d : {};
            var i, j = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                k = "^",
                l = 0,
                m = this.segments = [],
                n = this.params = {};
            this.source = a;
            for (var q, r, s, t, u;
                (i = j.exec(a)) && (q = i[2] || i[3], r = i[4] || ("*" == i[1] ? ".*" : "[^/]*"), s = a.substring(l, i.index), t = this.$types[r] || new o({
                    pattern: new RegExp(r)
                }), u = h(q), !(s.indexOf("?") >= 0));) k += g(s, t.$subPattern(), D(u.value)), f(q, t, u), m.push(s), l = j.lastIndex;
            s = a.substring(l);
            var v = s.indexOf("?");
            if (v >= 0) {
                var w = this.sourceSearch = s.substring(v);
                s = s.substring(0, v), this.sourcePath = a.substring(0, l + v), I(w.substring(1).split(/[&?]/), function(a) {
                    f(a, null, h(a))
                })
            } else this.sourcePath = a, this.sourceSearch = "";
            k += g(s) + (d.strict === !1 ? "/?" : "") + "$", m.push(s), this.regexp = new RegExp(k, d.caseInsensitive ? "i" : c), this.prefix = m[0]
        }

        function o(a) {
            J(this, a)
        }

        function p() {
            function a() {
                return {
                    strict: f,
                    caseInsensitive: e
                }
            }

            function b(a) {
                return E(a) || H(a) && E(a[a.length - 1])
            }

            function c() {
                I(h, function(a) {
                    if (n.prototype.$types[a.name]) throw new Error("A type named '" + a.name + "' has already been defined.");
                    var c = new o(b(a.def) ? d.invoke(a.def) : a.def);
                    n.prototype.$types[a.name] = c
                })
            }
            var d, e = !1,
                f = !0,
                g = !0,
                h = [],
                i = {
                    "int": {
                        decode: function(a) {
                            return parseInt(a, 10)
                        },
                        is: function(a) {
                            return D(a) ? this.decode(a.toString()) === a : !1
                        },
                        pattern: /\d+/
                    },
                    bool: {
                        encode: function(a) {
                            return a ? 1 : 0
                        },
                        decode: function(a) {
                            return 0 === parseInt(a, 10) ? !1 : !0
                        },
                        is: function(a) {
                            return a === !0 || a === !1
                        },
                        pattern: /0|1/
                    },
                    string: {
                        pattern: /[^\/]*/
                    },
                    date: {
                        equals: function(a, b) {
                            return a.toISOString() === b.toISOString()
                        },
                        decode: function(a) {
                            return new Date(a)
                        },
                        encode: function(a) {
                            return [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-")
                        },
                        pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/
                    }
                };
            p.$$getDefaultValue = function(a) {
                if (!b(a.value)) return a.value;
                if (!d) throw new Error("Injectable functions cannot be called at configuration time");
                return d.invoke(a.value)
            }, this.caseInsensitive = function(a) {
                e = a
            }, this.strictMode = function(a) {
                f = a
            }, this.compile = function(b, c) {
                return new n(b, J(a(), c))
            }, this.isMatcher = function(a) {
                if (!G(a)) return !1;
                var b = !0;
                return I(n.prototype, function(c, d) {
                    E(c) && (b = b && D(a[d]) && E(a[d]))
                }), b
            }, this.type = function(a, b) {
                return D(b) ? (h.push({
                    name: a,
                    def: b
                }), g || c(), this) : n.prototype.$types[a]
            }, this.$get = ["$injector", function(a) {
                return d = a, g = !1, n.prototype.$types = {}, c(), I(i, function(a, b) {
                    n.prototype.$types[b] || (n.prototype.$types[b] = new o(a))
                }), this
            }]
        }

        function q(a, b) {
            function d(a) {
                var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
                return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
            }

            function e(a, b) {
                return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
                    return b["$" === c ? 0 : Number(c)]
                })
            }

            function f(a, b, c) {
                if (!c) return !1;
                var d = a.invoke(b, b, {
                    $match: c
                });
                return D(d) ? d : !0
            }

            function g(b, c, d, e) {
                function f(a, b, c) {
                    return "/" === m ? a : b ? m.slice(0, -1) + a : c ? m.slice(1) + a : a
                }

                function g(a) {
                    function c(a) {
                        var c = a(d, b);
                        return c ? (F(c) && b.replace().url(c), !0) : !1
                    }
                    if (!a || !a.defaultPrevented) {
                        var e, f = i.length;
                        for (e = 0; f > e; e++)
                            if (c(i[e])) return;
                        j && c(j)
                    }
                }

                function l() {
                    return h = h || c.$on("$locationChangeSuccess", g)
                }
                var m = e.baseHref(),
                    n = b.url();
                return k || l(), {
                    sync: function() {
                        g()
                    },
                    listen: function() {
                        return l()
                    },
                    update: function(a) {
                        return a ? void(n = b.url()) : void(b.url() !== n && (b.url(n), b.replace()))
                    },
                    push: function(a, c, d) {
                        b.url(a.format(c || {})), d && d.replace && b.replace()
                    },
                    href: function(c, d, e) {
                        if (!c.validates(d)) return null;
                        var g = a.html5Mode(),
                            h = c.format(d);
                        if (e = e || {}, g || null === h || (h = "#" + a.hashPrefix() + h), h = f(h, g, e.absolute), !e.absolute || !h) return h;
                        var i = !g && h ? "/" : "",
                            j = b.port();
                        return j = 80 === j || 443 === j ? "" : ":" + j, [b.protocol(), "://", b.host(), j, i, h].join("")
                    }
                }
            }
            var h, i = [],
                j = null,
                k = !1;
            this.rule = function(a) {
                if (!E(a)) throw new Error("'rule' must be a function");
                return i.push(a), this
            }, this.otherwise = function(a) {
                if (F(a)) {
                    var b = a;
                    a = function() {
                        return b
                    }
                } else if (!E(a)) throw new Error("'rule' must be a function");
                return j = a, this
            }, this.when = function(a, c) {
                var g, h = F(c);
                if (F(a) && (a = b.compile(a)), !h && !E(c) && !H(c)) throw new Error("invalid 'handler' in when()");
                var i = {
                        matcher: function(a, c) {
                            return h && (g = b.compile(c), c = ["$match", function(a) {
                                return g.format(a)
                            }]), J(function(b, d) {
                                return f(b, c, a.exec(d.path(), d.search()))
                            }, {
                                prefix: F(a.prefix) ? a.prefix : ""
                            })
                        },
                        regex: function(a, b) {
                            if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
                            return h && (g = b, b = ["$match", function(a) {
                                return e(g, a)
                            }]), J(function(c, d) {
                                return f(c, b, a.exec(d.path()))
                            }, {
                                prefix: d(a)
                            })
                        }
                    },
                    j = {
                        matcher: b.isMatcher(a),
                        regex: a instanceof RegExp
                    };
                for (var k in j)
                    if (j[k]) return this.rule(i[k](a, c));
                throw new Error("invalid 'what' in when()")
            }, this.deferIntercept = function(a) {
                a === c && (a = !0), k = a
            }, this.$get = g, g.$inject = ["$location", "$rootScope", "$injector", "$browser"]
        }

        function r(a, e) {
            function f(a) {
                return 0 === a.indexOf(".") || 0 === a.indexOf("^")
            }

            function h(a, b) {
                if (!a) return c;
                var d = F(a),
                    e = d ? a : a.name,
                    g = f(e);
                if (g) {
                    if (!b) throw new Error("No reference point given for path '" + e + "'");
                    for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)
                        if ("" !== h[i] || 0 !== i) {
                            if ("^" !== h[i]) break;
                            if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                            k = k.parent
                        } else k = b;
                    h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
                }
                var l = v[e];
                return !l || !d && (d || l !== a && l.self !== a) ? c : l
            }

            function l(a, b) {
                w[a] || (w[a] = []), w[a].push(b)
            }

            function m(b) {
                b = d(b, {
                    self: b,
                    resolve: b.resolve || {},
                    toString: function() {
                        return this.name
                    }
                });
                var c = b.name;
                if (!F(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
                if (v.hasOwnProperty(c)) throw new Error("State '" + c + "'' is already defined");
                var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : F(b.parent) ? b.parent : "";
                if (e && !v[e]) return l(e, b.self);
                for (var f in y) E(y[f]) && (b[f] = y[f](b, y.$delegates[f]));
                if (v[c] = b, !b[x] && b.url && a.when(b.url, ["$match", "$stateParams", function(a, c) {
                        u.$current.navigable == b && j(a, c) || u.transitionTo(b, a, {
                            location: !1
                        })
                    }]), w[c])
                    for (var g = 0; g < w[c].length; g++) m(w[c][g]);
                return b
            }

            function n(a) {
                return a.indexOf("*") > -1
            }

            function o(a) {
                var b = a.split("."),
                    c = u.$current.name.split(".");
                if ("**" === b[0] && (c = c.slice(c.indexOf(b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(c.indexOf(b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length) return !1;
                for (var d = 0, e = b.length; e > d; d++) "*" === b[d] && (c[d] = "*");
                return c.join("") === b.join("")
            }

            function p(a, b) {
                return F(a) && !D(b) ? y[a] : E(b) && F(a) ? (y[a] && !y.$delegates[a] && (y.$delegates[a] = y[a]), y[a] = b, this) : this
            }

            function q(a, b) {
                return G(a) ? b = a : b.name = a, m(b), this
            }

            function r(a, e, f, l, m, p, q) {
                function r(b, c, d, f) {
                    var g = a.$broadcast("$stateNotFound", b, c, d);
                    if (g.defaultPrevented) return q.update(), A;
                    if (!g.retry) return null;
                    if (f.$retry) return q.update(), B;
                    var h = u.transition = e.when(g.retry);
                    return h.then(function() {
                        return h !== u.transition ? y : (b.options.$retry = !0, u.transitionTo(b.to, b.toParams, b.options))
                    }, function() {
                        return A
                    }), q.update(), h
                }

                function w(a, c, d, h, i) {
                    var j = d ? c : k(g(a.params), c),
                        n = {
                            $stateParams: j
                        };
                    i.resolve = m.resolve(a.resolve, n, i.resolve, a);
                    var o = [i.resolve.then(function(a) {
                        i.globals = a
                    })];
                    return h && o.push(h), I(a.views, function(c, d) {
                        var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
                        e.$template = [function() {
                            return f.load(d, {
                                view: c,
                                locals: n,
                                params: j
                            }) || ""
                        }], o.push(m.resolve(e, n, i.resolve, a).then(function(f) {
                            if (E(c.controllerProvider) || H(c.controllerProvider)) {
                                var g = b.extend({}, e, n);
                                f.$$controller = l.invoke(c.controllerProvider, null, g)
                            } else f.$$controller = c.controller;
                            f.$$state = a, f.$$controllerAs = c.controllerAs, i[d] = f
                        }))
                    }), e.all(o).then(function() {
                        return i
                    })
                }
                var y = e.reject(new Error("transition superseded")),
                    z = e.reject(new Error("transition prevented")),
                    A = e.reject(new Error("transition aborted")),
                    B = e.reject(new Error("transition failed"));
                return t.locals = {
                    resolve: null,
                    globals: {
                        $stateParams: {}
                    }
                }, u = {
                    params: {},
                    current: t.self,
                    $current: t,
                    transition: null
                }, u.reload = function() {
                    u.transitionTo(u.current, p, {
                        reload: !0,
                        inherit: !1,
                        notify: !1
                    })
                }, u.go = function(a, b, c) {
                    return u.transitionTo(a, b, J({
                        inherit: !0,
                        relative: u.$current
                    }, c))
                }, u.transitionTo = function(b, c, f) {
                    c = c || {}, f = J({
                        location: !0,
                        inherit: !1,
                        relative: null,
                        notify: !0,
                        reload: !1,
                        $retry: !1
                    }, f || {});
                    var m, n = u.$current,
                        o = u.params,
                        v = n.path,
                        A = h(b, f.relative);
                    if (!D(A)) {
                        var B = {
                                to: b,
                                toParams: c,
                                options: f
                            },
                            C = r(B, n.self, o, f);
                        if (C) return C;
                        if (b = B.to, c = B.toParams, f = B.options, A = h(b, f.relative), !D(A)) {
                            if (!f.relative) throw new Error("No such state '" + b + "'");
                            throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'")
                        }
                    }
                    if (A[x]) throw new Error("Cannot transition to abstract state '" + b + "'");
                    f.inherit && (c = i(p, c || {}, u.$current, A)), b = A;
                    var E = b.path,
                        F = 0,
                        G = E[F],
                        H = t.locals,
                        I = [];
                    if (!f.reload)
                        for (; G && G === v[F] && j(c, o, G.ownParams);) H = I[F] = G.locals, F++, G = E[F];
                    if (s(b, n, H, f)) return b.self.reloadOnSearch !== !1 && q.update(), u.transition = null, e.when(u.current);
                    if (c = k(g(b.params), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, n.self, o).defaultPrevented) return q.update(), z;
                    for (var L = e.when(H), M = F; M < E.length; M++, G = E[M]) H = I[M] = d(H), L = w(G, c, G === b, L, H);
                    var N = u.transition = L.then(function() {
                        var d, e, g;
                        if (u.transition !== N) return y;
                        for (d = v.length - 1; d >= F; d--) g = v[d], g.self.onExit && l.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                        for (d = F; d < E.length; d++) e = E[d], e.locals = I[d], e.self.onEnter && l.invoke(e.self.onEnter, e.self, e.locals.globals);
                        return u.transition !== N ? y : (u.$current = b, u.current = b.self, u.params = c, K(u.params, p), u.transition = null, f.location && b.navigable && q.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
                            replace: "replace" === f.location
                        }), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, n.self, o), q.update(!0), u.current)
                    }, function(d) {
                        return u.transition !== N ? y : (u.transition = null, m = a.$broadcast("$stateChangeError", b.self, c, n.self, o, d), m.defaultPrevented || q.update(), e.reject(d))
                    });
                    return N
                }, u.is = function(a, d) {
                    var e = h(a);
                    return D(e) ? u.$current !== e ? !1 : D(d) && null !== d ? b.equals(p, d) : !0 : c
                }, u.includes = function(a, b) {
                    if (F(a) && n(a)) {
                        if (!o(a)) return !1;
                        a = u.$current.name
                    }
                    var d = h(a);
                    return D(d) ? D(u.$current.includes[d.name]) ? j(b, p) : !1 : c
                }, u.href = function(a, b, c) {
                    c = J({
                        lossy: !0,
                        inherit: !0,
                        absolute: !1,
                        relative: u.$current
                    }, c || {});
                    var d = h(a, c.relative);
                    if (!D(d)) return null;
                    c.inherit && (b = i(p, b || {}, u.$current, d));
                    var e = d && c.lossy ? d.navigable : d;
                    return e && e.url ? q.href(e.url, k(g(d.params), b || {}), {
                        absolute: c.absolute
                    }) : null
                }, u.get = function(a, b) {
                    if (0 === arguments.length) return g(v).map(function(a) {
                        return v[a].self
                    });
                    var c = h(a, b);
                    return c && c.self ? c.self : null
                }, u
            }

            function s(a, b, c, d) {
                return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
            }
            var t, u, v = {},
                w = {},
                x = "abstract",
                y = {
                    parent: function(a) {
                        if (D(a.parent) && a.parent) return h(a.parent);
                        var b = /^(.+)\.[^.]+$/.exec(a.name);
                        return b ? h(b[1]) : t
                    },
                    data: function(a) {
                        return a.parent && a.parent.data && (a.data = a.self.data = J({}, a.parent.data, a.data)), a.data
                    },
                    url: function(a) {
                        var b = a.url,
                            c = {
                                params: a.params || {}
                            };
                        if (F(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || t).url.concat(b, c);
                        if (!b || e.isMatcher(b)) return b;
                        throw new Error("Invalid url '" + b + "' in state '" + a + "'")
                    },
                    navigable: function(a) {
                        return a.url ? a : a.parent ? a.parent.navigable : null
                    },
                    params: function(a) {
                        return a.params ? a.params : a.url ? a.url.params : a.parent.params
                    },
                    views: function(a) {
                        var b = {};
                        return I(D(a.views) ? a.views : {
                            "": a
                        }, function(c, d) {
                            d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
                        }), b
                    },
                    ownParams: function(a) {
                        if (a.params = a.params || {}, !a.parent) return g(a.params);
                        var b = {};
                        I(a.params, function(a, c) {
                            b[c] = !0
                        }), I(a.parent.params, function(c, d) {
                            if (!b[d]) throw new Error("Missing required parameter '" + d + "' in state '" + a.name + "'");
                            b[d] = !1
                        });
                        var c = [];
                        return I(b, function(a, b) {
                            a && c.push(b)
                        }), c
                    },
                    path: function(a) {
                        return a.parent ? a.parent.path.concat(a) : []
                    },
                    includes: function(a) {
                        var b = a.parent ? J({}, a.parent.includes) : {};
                        return b[a.name] = !0, b
                    },
                    $delegates: {}
                };
            t = m({
                name: "",
                url: "^",
                views: null,
                "abstract": !0
            }), t.navigable = null, this.decorator = p, this.state = q, this.$get = r, r.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter"]
        }

        function s() {
            function a(a, b) {
                return {
                    load: function(c, d) {
                        var e, f = {
                            template: null,
                            controller: null,
                            view: null,
                            locals: null,
                            notify: !0,
                            async: !0,
                            params: {}
                        };
                        return d = J(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
                    }
                }
            }
            this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
        }

        function t() {
            var a = !1;
            this.useAnchorScroll = function() {
                a = !0
            }, this.$get = ["$anchorScroll", "$timeout", function(b, c) {
                return a ? b : function(a) {
                    c(function() {
                        a[0].scrollIntoView()
                    }, 0, !1)
                }
            }]
        }

        function u(a, c, d) {
            function e() {
                return c.has ? function(a) {
                    return c.has(a) ? c.get(a) : null
                } : function(a) {
                    try {
                        return c.get(a)
                    } catch (b) {
                        return null
                    }
                }
            }

            function f(a, b) {
                var c = function() {
                    return {
                        enter: function(a, b, c) {
                            b.after(a), c()
                        },
                        leave: function(a, b) {
                            a.remove(), b()
                        }
                    }
                };
                if (i) return {
                    enter: function(a, b, c) {
                        i.enter(a, null, b, c)
                    },
                    leave: function(a, b) {
                        i.leave(a, b)
                    }
                };
                if (h) {
                    var d = h && h(b, a);
                    return {
                        enter: function(a, b, c) {
                            d.enter(a, null, b), c()
                        },
                        leave: function(a, b) {
                            d.leave(a), b()
                        }
                    }
                }
                return c()
            }
            var g = e(),
                h = g("$animator"),
                i = g("$animate"),
                j = {
                    restrict: "ECA",
                    terminal: !0,
                    priority: 400,
                    transclude: "element",
                    compile: function(c, e, g) {
                        return function(c, e, h) {
                            function i() {
                                k && (k.remove(), k = null), m && (m.$destroy(), m = null), l && (q.leave(l, function() {
                                    k = null
                                }), k = l, l = null)
                            }

                            function j(f) {
                                var j, k = w(h, e.inheritedData("$uiView")),
                                    r = k && a.$current && a.$current.locals[k];
                                if (f || r !== n) {
                                    j = c.$new(), n = a.$current.locals[k];
                                    var s = g(j, function(a) {
                                        q.enter(a, e, function() {
                                            (b.isDefined(p) && !p || c.$eval(p)) && d(a)
                                        }), i()
                                    });
                                    l = s, m = j, m.$emit("$viewContentLoaded"), m.$eval(o)
                                }
                            }
                            var k, l, m, n, o = h.onload || "",
                                p = h.autoscroll,
                                q = f(h, c);
                            c.$on("$stateChangeSuccess", function() {
                                j(!1)
                            }), c.$on("$viewContentLoading", function() {
                                j(!1)
                            }), j(!0)
                        }
                    }
                };
            return j
        }

        function v(a, b, c) {
            return {
                restrict: "ECA",
                priority: -400,
                compile: function(d) {
                    var e = d.html();
                    return function(d, f, g) {
                        var h = c.$current,
                            i = w(g, f.inheritedData("$uiView")),
                            j = h && h.locals[i];
                        if (j) {
                            f.data("$uiView", {
                                name: i,
                                state: j.$$state
                            }), f.html(j.$template ? j.$template : e);
                            var k = a(f.contents());
                            if (j.$$controller) {
                                j.$scope = d;
                                var l = b(j.$$controller, j);
                                j.$$controllerAs && (d[j.$$controllerAs] = l), f.data("$ngControllerController", l), f.children().data("$ngControllerController", l)
                            }
                            k(d)
                        }
                    }
                }
            }
        }

        function w(a, b) {
            var c = a.uiView || a.name || "";
            return c.indexOf("@") >= 0 ? c : c + "@" + (b ? b.state.name : "")
        }

        function x(a, b) {
            var c, d = a.match(/^\s*({[^}]*})\s*$/);
            if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length) throw new Error("Invalid state ref '" + a + "'");
            return {
                state: c[1],
                paramExpr: c[3] || null
            }
        }

        function y(a) {
            var b = a.parent().inheritedData("$uiView");
            return b && b.state && b.state.name ? b.state : void 0
        }

        function z(a, c) {
            var d = ["location", "inherit", "reload"];
            return {
                restrict: "A",
                require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                link: function(e, f, g, h) {
                    var i = x(g.uiSref, a.current.name),
                        j = null,
                        k = y(f) || a.$current,
                        l = "FORM" === f[0].nodeName,
                        m = l ? "action" : "href",
                        n = !0,
                        o = {
                            relative: k,
                            inherit: !0
                        },
                        p = e.$eval(g.uiSrefOpts) || {};
                    b.forEach(d, function(a) {
                        a in p && (o[a] = p[a])
                    });
                    var q = function(b) {
                        if (b && (j = b), n) {
                            var c = a.href(i.state, j, o),
                                d = h[1] || h[0];
                            return d && d.$$setStateInfo(i.state, j), null === c ? (n = !1, !1) : void(f[0][m] = c)
                        }
                    };
                    i.paramExpr && (e.$watch(i.paramExpr, function(a) {
                        a !== j && q(a)
                    }, !0), j = e.$eval(i.paramExpr)), q(), l || f.bind("click", function(b) {
                        var d = b.which || b.button;
                        if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
                            var e = c(function() {
                                a.go(i.state, j, o)
                            });
                            b.preventDefault(), b.preventDefault = function() {
                                c.cancel(e)
                            }
                        }
                    })
                }
            }
        }

        function A(a, b, c) {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", function(d, e, f) {
                    function g() {
                        h() ? e.addClass(m) : e.removeClass(m)
                    }

                    function h() {
                        return "undefined" != typeof f.uiSrefActiveEq ? a.$current.self === k && i() : a.includes(k.name) && i()
                    }

                    function i() {
                        return !l || j(l, b)
                    }
                    var k, l, m;
                    m = c(f.uiSrefActiveEq || f.uiSrefActive || "", !1)(d), this.$$setStateInfo = function(b, c) {
                        k = a.get(b, y(e)), l = c, g()
                    }, d.$on("$stateChangeSuccess", g)
                }]
            }
        }

        function B(a) {
            return function(b) {
                return a.is(b)
            }
        }

        function C(a) {
            return function(b) {
                return a.includes(b)
            }
        }
        var D = b.isDefined,
            E = b.isFunction,
            F = b.isString,
            G = b.isObject,
            H = b.isArray,
            I = b.forEach,
            J = b.extend,
            K = b.copy;
        b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), l.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", l), m.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", m), n.prototype.concat = function(a, b) {
            return new n(this.sourcePath + a + this.sourceSearch, b)
        }, n.prototype.toString = function() {
            return this.source
        }, n.prototype.exec = function(a, b) {
            var c = this.regexp.exec(a);
            if (!c) return null;
            b = b || {};
            var d, e, f, g = this.parameters(),
                h = g.length,
                i = this.segments.length - 1,
                j = {};
            if (i !== c.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
            for (d = 0; i > d; d++) f = g[d], e = this.params[f], j[f] = e.$value(c[d + 1]);
            for (; h > d; d++) f = g[d], e = this.params[f], j[f] = e.$value(b[f]);
            return j
        }, n.prototype.parameters = function(a) {
            return D(a) ? this.params[a] || null : g(this.params)
        }, n.prototype.validates = function(a) {
            var b, c, d = !0,
                e = this;
            return I(a, function(a, f) {
                e.params[f] && (c = e.params[f], b = !a && D(c.value), d = d && (b || c.type.is(a)))
            }), d
        }, n.prototype.format = function(a) {
            var b = this.segments,
                c = this.parameters();
            if (!a) return b.join("").replace("//", "/");
            var d, e, f, g, h, i, j = b.length - 1,
                k = c.length,
                l = b[0];
            if (!this.validates(a)) return null;
            for (d = 0; j > d; d++) g = c[d], f = a[g], h = this.params[g], (D(f) || "/" !== b[d] && "/" !== b[d + 1]) && (null != f && (l += encodeURIComponent(h.type.encode(f))), l += b[d + 1]);
            for (; k > d; d++) g = c[d], f = a[g], null != f && (i = H(f), i && (f = f.map(encodeURIComponent).join("&" + g + "=")), l += (e ? "&" : "?") + g + "=" + (i ? f : encodeURIComponent(f)), e = !0);
            return l
        }, n.prototype.$types = {}, o.prototype.is = function() {
            return !0
        }, o.prototype.encode = function(a) {
            return a
        }, o.prototype.decode = function(a) {
            return a
        }, o.prototype.equals = function(a, b) {
            return a == b
        }, o.prototype.$subPattern = function() {
            var a = this.pattern.toString();
            return a.substr(1, a.length - 2)
        }, o.prototype.pattern = /.*/, b.module("ui.router.util").provider("$urlMatcherFactory", p), q.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", q), r.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", r), s.$inject = [], b.module("ui.router.state").provider("$view", s), b.module("ui.router.state").provider("$uiViewScroll", t), u.$inject = ["$state", "$injector", "$uiViewScroll"], v.$inject = ["$compile", "$controller", "$state"], b.module("ui.router.state").directive("uiView", u), b.module("ui.router.state").directive("uiView", v), z.$inject = ["$state", "$timeout"], A.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", z).directive("uiSrefActive", A).directive("uiSrefActiveEq", A), B.$inject = ["$state"], C.$inject = ["$state"], b.module("ui.router.state").filter("isState", B).filter("includedByState", C)
    }(window, window.angular), (window.jQuery || window.Zepto) && ! function(a) {
        a.fn.Swipe = function(b) {
            return this.each(function() {
                a(this).data("Swipe", new Swipe(a(this)[0], b))
            })
        }
    }(window.jQuery || window.Zepto);
var app = angular.module("app", ["ui.router", "ngAnimate"]).run(["$rootScope", "$state", "$stateParams", function(a, b, c) {
    a.$state = b, a.$stateParams = c, a.gallery = document.getElementById("gallery"), a.galleryWrap = document.getElementById("gallery-wrap"), a.galleryInterval = 0, a.suppressAnimation = !0, a.isAnimationSuppressed = function() {
        return a.suppressAnimation
    }, Math.easeInOutQuad = function(a, b, c, d) {
        return a /= d / 2, 1 > a ? c / 2 * a * a + b : (a--, -c / 2 * (a * (a - 2) - 1) + b)
    }, a.prefixTransform = function(a, b) {
        a.style.webkitTransform = b, a.style.mozTransform = b, a.style.msTransform = b, a.style.transform = b
    }, a.scrollTo = function(a, b, c) {
        var d = a.scrollLeft,
            e = b - d,
            f = 0,
            g = 20,
            h = function() {
                f += g;
                var b = Math.easeInOutQuad(f, d, e, c);
                a.scrollLeft = b, c > f && setTimeout(h, g)
            };
        h()
    }
}]).config(["$stateProvider", "$urlRouterProvider", "$logProvider", "$interpolateProvider", function(a, b, c, d) {
    d.startSymbol("{%"), d.endSymbol("%}"), b.otherwise("/"), a.state("gallery", {
        label: "Gallery",
        url: "/",
        controller: "galleryController"
    });
    for (var e = ["about-me","valence","thinking-wrong", "leveled-self", "creative-sketches", "bridge", "xnode-accelerator", "cyborg", "creator-caravan", "archive"], f = 0; f < e.length; f++) a.state(e[f], {
        label: e[f],
        url: "/" + e[f],
        type: "article",
        templateUrl: "public/app/partials/" + e[f] + ".html",
        controller: "articleController"
    });
    c.debugEnabled(!0)
}]);
app.service("galleryState", function() {
    activeGalleryItem = null, launchFromGallery = !1, windowWidth = 0, windowHeight = 0, mobile = !0
}), app.controller("galleryController", ["$scope", "$window", "$state", "$timeout", "$interval", "galleryState", function(a, b, c, d, e, f) {
    a.$on("$stateChangeStart", function() {
        e.cancel(a.galleryInterval), f.activeGalleryItem && (b.scrollTo(0, 0), f.activeGalleryItem.style.width = "")
    }), f.mobile ? a.prefixTransform(a.galleryWrap, "translate3d(0,0,0)") : f.activeGalleryItem && f.activeGalleryItem.offsetLeft >= f.galleryWidth / 3 && a.prefixTransform(a.galleryWrap, "translate3d(-" + f.galleryPosition + "px,0,0)"), d(function() {
        a.galleryWrap.classList.remove("lock")
    }, 1e3), f.activeGalleryItem && (f.activeGalleryItem.style.width = "")
}]), app.controller("articleController", ["$scope", "$window", "$state", "$timeout", "$interval", "galleryState", function(a, b, c, d, e, f) {
    var g = document.getElementById(c.current.label),
        h = document.getElementById("article-" + c.current.label),
        i = g.offsetLeft,
        j = i > f.galleryWidth / 2 ? !0 : !1,
        k = (j ? i - f.windowWidth + 300 : i, j && !a.suppressAnimation ? 400 : 0),
        l = j || a.suppressAnimation ? 0 : 400;
    f.activeGalleryItem = g, a.galleryWrap.classList.add("lock"), e.cancel(a.galleryInterval), d(function() {
        f.mobile ? (a.prefixTransform(a.galleryWrap, "translate3d(-" + i + "px,0,0)"), a.scrollTo(a.gallery, i, 0)) : a.prefixTransform(a.galleryWrap, "translate3d(-" + i + "px,0,0)")
    }, k), d(function() {
        g.style.width = f.windowWidth + "px", h.classList.add("active")
    }, l)
}]), app.directive("jsGallery", ["$timeout", "$interval", "$window", "galleryState", function(a, b, c, d) {
    return {
        restrict: "A",
        link: function(c, e) {
            c.galleryEvents = function() {
                if (!d.mobile) {
                    var a = e[0],
                        f = d.windowWidth,
                        g = a.scrollWidth,
                        h = g / f - 1,
                        i = 200,
                        j = 20,
                        k = 0,
                        l = 0,
                        m = 0,
                        n = f - 2 * i,
                        o = f / n;
                    e.bind("mousemove", function(e) {
                        k = e.pageX - a.offsetLeft, l = Math.min(Math.max(0, k - i), n) * o, locked = c.galleryWrap.classList.contains("lock"), c.galleryInterval || locked || (c.galleryInterval = b(function() {
                            m += (l - m) / j, d.galleryPosition = m * h, c.prefixTransform(c.galleryWrap, "translate3d(-" + d.galleryPosition + "px,0,0)")
                        }, 10))
                    }), e.bind("mouseleave", function() {
                        b.cancel(c.galleryInterval), c.galleryInterval = 0
                    })
                }
            }, c.galleryWrap.style.width = "", a(function() {
                c.galleryEvents()
            }, 200)
        }
    }
}]), app.directive("jsLaunch", ["$rootScope", "$timeout", "$interval", "galleryState", function(a, b, c, d) {
    return {
        restrict: "A",
        link: function(c, e) {
            e.bind("click", function() {
                d.launchFromGallery = !0, d.mobile || (a.suppressAnimation = !1, b(function() {
                    a.suppressAnimation = !0
                }, 1e3))
            })
        }
    }
}]), app.directive("jsLoadImage", ["$timeout", "$q", function(a, b) {
    return {
        restrict: "A",
        scope: {
            loadImageUrl: "="
        },
        link: function(c, d) {
            function e(a) {
                var c = b.defer(),
                    d = new Image;
                return d.src = a, d.complete ? c.resolve() : (d.addEventListener("load", function() {
                    c.resolve()
                }), d.addEventListener("error", function() {
                    c.reject()
                })), c.promise
            }
            e(c.loadImageUrl).then(function() {
                a(function() {
                    d.css({
                        "background-image": "url(" + c.loadImageUrl + ")"
                    }), d.addClass("loaded")
                }, 100)
            })
        }
    }
}]), app.directive("backToGallery", ["$rootScope", "$timeout", "$state", "galleryState", function(a, b, c, d) {
    return {
        restrict: "A",
        link: function(e, f) {
            f.bind("click", function() {
                d.mobile || (a.suppressAnimation = !1), a.$apply(), b(function() {
                    c.go("gallery")
                }, 0), b(function() {
                    a.suppressAnimation = !0
                }, 2e3)
            })
        }
    }
}]), app.directive("resize", ["$window", "galleryState", function(a, b) {
    return function(c, d, e) {
        var f = angular.element(a);
        c.$watch(function() {
            return {
                h: f[0].innerHeight,
                w: f[0].innerWidth
            }
        }, function(a) {
            var d = b.windowWidth && a.w !== b.windowWidth;
            c.resizeHeight = function(f) {
                var g = d || !b.windowHeight ? a.h : b.windowHeight;
                return b.windowHeight = g, c.$eval(e.notifier), {
                    height: g - f + "px"
                }
            }, b.windowWidth = a.w, b.mobile = b.windowWidth <= 600, b.galleryWidth = c.galleryWrap.clientWidth
        }, !0), f.bind("resize", function() {
            c.$apply()
        })
    }
}]);
