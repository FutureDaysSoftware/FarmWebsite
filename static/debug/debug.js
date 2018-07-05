(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

},{}],2:[function(require,module,exports){
"use strict";

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
	AboutUs: require('./views/AboutUs'),
	Footer: require('./views/Footer'),
	Header: require('./views/Header'),
	Home: require('./views/Home'),
	OurOfferings: require('./views/OurOfferings'),
	TheBlog: require('./views/TheBlog'),
	Toast: require('./views/Toast'),
	WhereToFindUs: require('./views/WhereToFindUs')
};

},{"./views/AboutUs":13,"./views/Footer":14,"./views/Header":15,"./views/Home":16,"./views/OurOfferings":17,"./views/TheBlog":18,"./views/Toast":29,"./views/WhereToFindUs":19}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {

    CapitalizeFirstLetter: function CapitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    Currency: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }),
    capitalizeWords: function capitalizeWords(string) {
        var _this = this;

        return string.split(/\s+/).map(function (word) {
            return _this.CapitalizeFirstLetter(word);
        }).join(' ');
    },
    GetFormField: function GetFormField(datum, value, meta) {
        var isNested = datum.range === 'List' || _typeof(datum.range) === 'object';

        var image = datum.range === 'ImageUrl' ? '<div><button class="btn" data-js="previewBtn" type="button">Preview</button><img data-src="' + this.ImageSrc(value) + '" /></div>' : '';

        var options = datum.range === 'Boolean' ? [{ label: 'True', name: 'true' }, { label: 'False', name: 'false' }] : datum.metadata ? datum.metadata.options : false;

        var icon = datum.metadata && datum.metadata.icon ? this.GetIcon(datum.metadata.icon) : options ? this.GetIcon('caret-down') : '';

        var label = isNested || datum.fk || datum.label && !meta.noLabel ? '<label>' + (datum.fk || datum.label) + '</label>' : '';

        value = value === undefined ? '' : value;

        if (options) {
            if (typeof options === 'function') {
                options();return this.GetSelect(datum, value, [], icon, label);
            } else if (Array.isArray(options)) return this.GetSelect(datum, value, options, icon, label);
        }

        var prompt = datum.prompt ? '<div class="prompt">' + datum.prompt + '</div>' : '';

        var input = datum.fk ? '<div data-view="typeAhead" data-name="' + datum.fk + '"></div>' : datum.range === 'Text' ? '<textarea data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" rows="3">' + value + '</textarea>' : datum.range === 'List' || datum.range === 'View' || _typeof(datum.range) === 'object' ? '<div data-js="' + datum.name + '" data-name="' + datum.name + '"></div>' : '<input type="' + this.RangeToInputType[datum.range] + '" data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" value="' + value + '" />';

        return '' + ('<div class="form-group ' + (isNested ? 'nested' : '') + '">\n            ' + label + '\n            ' + prompt + '\n            ' + input + ' \n            ' + icon + '\n        </div>');
    },
    GetFormFields: function GetFormFields(data) {
        var _this2 = this;

        var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var meta = arguments[2];

        if (!data) return '';

        return data.filter(function (datum) {
            return meta[datum.name] && meta[datum.name].hide ? false : true;
        }).map(function (datum) {
            return _this2.GetFormField(datum, model && model[datum.name], meta);
        }).join('');
    },
    GetIcon: function GetIcon(name) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { IconDataJs: this.IconDataJs };
        return Reflect.apply(this.Icons[name], this, [opts]);
    },
    GetListItems: function GetListItems() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return items.map(function (item) {
            var attr = opts.dataAttr ? 'data-' + opts.dataAttr + '="' + item[opts.dataAttr] + '"' : '';
            return '<li ' + attr + '>' + (item.label || item) + '</li>';
        }).join('');
    },
    GetSelect: function GetSelect(datum, selectedValue, optionsData, icon) {
        var label = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

        if (typeof selectedValue === 'boolean' || typeof selectedValue === 'number') selectedValue = selectedValue.toString();

        var options = optionsData.length ? this.GetSelectOptions(optionsData, selectedValue, { valueAttr: 'name' }) : '';

        return '' + ('<div class="form-group">\n            ' + label + '\n            <select data-js="' + datum.name + '">\n                <option disabled ' + (!selectedValue ? 'selected' : '') + ' value>' + datum.label + '</option>\n                ' + options + '\n            </select>\n            ' + icon + '\n        </div>');
    },
    GetSelectOptions: function GetSelectOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var selectedValue = arguments[1];
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { valueAttr: 'value' };

        return options.map(function (option) {
            return '<option ' + (selectedValue === option[opts.valueAttr] ? 'selected' : '') + ' value="' + option[opts.valueAttr] + '">' + option.label + '</option>';
        }).join('');
    },


    //Icons: require('./.IconMap'),

    IconDataJs: function IconDataJs(p) {
        return p.name ? 'data-js="' + p.name + '"' : '';
    },
    ImageSrc: function ImageSrc(name) {
        return 'https://storage.googleapis.com/icelandic-heritage-chickens/' + name;
    },
    Range: function Range(int) {
        return Array.from(Array(int).keys());
    },


    RangeToInputType: {
        Email: 'email',
        Password: 'password',
        String: 'text'
    }

};

},{}],5:[function(require,module,exports){
"use strict";

module.exports = Object.create(Object.assign({}, require('../../lib/MyObject'), {

    Request: {
        constructor: function constructor(data) {
            var _this = this;

            var req = new XMLHttpRequest();

            if (data.onProgress) req.addEventListener("progress", function (e) {
                return data.onProgress(e.lengthComputable ? Math.floor(e.loaded / e.total * 100) : 0);
            });

            return new Promise(function (resolve, reject) {

                req.onload = function () {
                    [500, 404, 401].includes(this.status) ? reject(this.response ? JSON.parse(this.response) : this.status) : resolve(JSON.parse(this.response));
                };

                data.method = data.method || "get";

                var path = "/" + data.resource + (data.id ? "/" + data.id : '');
                if (data.method === "get" || data.method === "options") {
                    var qs = data.qs ? "?" + window.encodeURIComponent(data.qs) : '';
                    req.open(data.method, "" + path + qs);
                    _this.setHeaders(req, data.headers);
                    req.send(null);
                } else {
                    req.open(data.method.toUpperCase(), path, true);
                    _this.setHeaders(req, data.headers);
                    req.send(data.data || null);
                }

                if (data.onProgress) data.onProgress('sent');
            });
        },
        setHeaders: function setHeaders(req) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            req.setRequestHeader("Accept", headers.accept || 'application/json');
            req.setRequestHeader("Content-Type", headers.contentType || 'text/plain');
        }
    },

    _factory: function _factory(data) {
        return Object.create(this.Request, {}).constructor(data);
    },
    constructor: function constructor() {

        if (!XMLHttpRequest.prototype.sendAsBinary) {
            XMLHttpRequest.prototype.sendAsBinary = function (sData) {
                var nBytes = sData.length,
                    ui8Data = new Uint8Array(nBytes);
                for (var nIdx = 0; nIdx < nBytes; nIdx++) {
                    ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
                }
                this.send(ui8Data);
            };
        }

        return this._factory.bind(this);
    }
}), {}).constructor();

},{"../../lib/MyObject":26}],6:[function(require,module,exports){
'use strict';

module.exports = Object.create({
    constructor: function constructor() {
        this.range = document.createRange();
        this.range.selectNode(document.getElementsByTagName("div").item(0));
        return this;
    },
    create: function create(name, opts) {
        var lower = name;
        name = (name.charAt(0).toUpperCase() + name.slice(1)).replace('-', '');

        return Object.create(this.Views[name], Object.assign({
            Header: { value: this.Header },
            Toast: { value: this.Toast },
            name: { value: name },
            factory: { value: this },
            range: { value: this.range },
            template: { value: this.Templates[name], writable: true },
            model: { value: this.Models[name] ? Object.create(this.Models[name]) : {} },
            user: { value: this.User }
        })).constructor(opts);
    }
}, {
    Header: { value: require('../views/Header') },
    Models: { value: require('../.ModelMap') },
    Templates: { value: require('../.TemplateMap') },
    Toast: { value: require('../views/Toast') },
    User: { value: require('../models/User') },
    Views: { value: require('../.ViewMap') }
});

},{"../.ModelMap":1,"../.TemplateMap":2,"../.ViewMap":3,"../models/User":9,"../views/Header":15,"../views/Toast":29}],7:[function(require,module,exports){
'use strict';

require('./polyfill');

var User = require('./models/User'),
    router = require('./router'),
    onLoad = new Promise(function (resolve) {
    return window.onload = function () {
        return resolve();
    };
});

User.on('logout', function () {
    return router.onLogout();
});

Promise.all([User.get(), onLoad]).then(function () {
    return router.initialize();
}).catch(function (e) {
    return console.log('Error initializing client -> ' + (e.stack || e));
});

},{"./models/User":9,"./polyfill":11,"./router":12}],8:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__.js'), {
    data: ['about us', 'where to find us', 'future days farm', 'the blog', 'our offerings']
});

},{"./__proto__.js":10}],9:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('./__proto__.js'), {
    isLoggedIn: function isLoggedIn() {
        return Boolean(this.data && this.data.id);
    },
    logout: function logout() {
        document.cookie = 'hzy=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        this.data = {};
        this.emit('logout');
    }
}), { resource: { value: 'me' } });

},{"./__proto__.js":10}],10:[function(require,module,exports){
'use strict';

var _Object$assign;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = Object.assign({}, require('../../../lib/Model'), require('events').EventEmitter.prototype, (_Object$assign = {

    Xhr: require('../Xhr'),

    add: function add(datum) {
        this.data.push(datum);

        if (this.storeBy) this._storeOne(datum);

        return this;
    },
    delete: function _delete() {
        var _this = this;

        var keyValue = this.data[this.meta.key];
        return this.Xhr({ method: 'DELETE', resource: this.resource, id: keyValue }).then(function () {
            var key = _this.meta.key;

            if (Array.isArray(_this.data)) {
                var datum = _this.data.find(function (datum) {
                    return datum[key] == keyValue;
                });

                if (_this.store) {
                    Object.keys(_this.store).forEach(function (attr) {
                        _this.store[attr][datum[attr]] = _this.store[attr][datum[attr]].filter(function (datum) {
                            return datum[key] != keyValue;
                        });
                        if (_this.store[attr][datum[attr]].length === 0) {
                            _this.store[attr][datum[attr]] = undefined;
                        }
                    });
                }

                _this.data = _this.data.filter(function (datum) {
                    return datum[key] != keyValue;
                });
            }

            return Promise.resolve(_this.data);
        });
    },
    git: function git(attr) {
        return this.data[attr];
    },
    get: function get() {
        var _this2 = this;

        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { query: {} };

        if (opts.query || this.pagination) Object.assign(opts.query, this.pagination);

        return this.Xhr({ method: opts.method || 'get', resource: this.resource, headers: this.headers || {}, qs: opts.query ? JSON.stringify(opts.query) : undefined }).then(function (response) {

            if (Array.isArray(_this2.data)) {
                _this2.data = _this2.data.concat(opts.parse ? opts.parse(response, opts.storeBy) : response);
            } else {
                if (opts.storeBy) _this2._resetStore(opts.storeBy);
                _this2.data = _this2.parse ? _this2.parse(response, opts.storeBy) : response;
                if (opts.storeBy) _this2._store();
            }

            _this2.emit('got');

            return Promise.resolve(response);
        });
    },
    getCount: function getCount() {
        var _this3 = this;

        return this.Xhr({ method: 'get', resource: this.resource, headers: this.headers || {}, qs: JSON.stringify({ countOnly: true }) }).then(function (_ref) {
            var result = _ref.result;

            _this3.meta.count = result;
            return Promise.resolve(result);
        });
    }
}, _defineProperty(_Object$assign, 'git', function git(attr) {
    return this.data[attr];
}), _defineProperty(_Object$assign, 'patch', function patch(id, data) {
    var _this4 = this;

    return this.Xhr({ method: 'patch', id: id, resource: this.resource, headers: this.headers || {}, data: JSON.stringify(data || this.data) }).then(function (response) {

        if (Array.isArray(_this4.data)) {
            _this4.data = _this4.data ? _this4.data.concat(response) : [response];
            if (_this4.store) Object.keys(_this4.store).forEach(function (attr) {
                return _this4._store(response, attr);
            });
        } else {
            _this4.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, '_put', function _put(keyValue, data) {
    var _this5 = this;

    var item = this.data.find(function (datum) {
        return datum[_this5.meta.key] == keyValue;
    });
    if (item) item = data;
    return this;
}), _defineProperty(_Object$assign, 'put', function put(id, data) {
    var _this6 = this;

    return this.Xhr({ method: 'put', id: id, resource: this.resource, headers: this.headers || {}, data: JSON.stringify(data) }).then(function (response) {

        if (Array.isArray(_this6.data)) {} else {
            _this6.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, 'post', function post(model) {
    var _this7 = this;

    return this.Xhr({ method: 'post', resource: this.resource, headers: this.headers || {}, data: JSON.stringify(model || this.data) }).then(function (response) {

        if (Array.isArray(_this7.data)) {
            _this7.data = _this7.data ? _this7.data.concat(response) : [response];
            if (_this7.store) Object.keys(_this7.store).forEach(function (attr) {
                return _this7._store(response, attr);
            });
        } else {
            _this7.data = response;
        }

        return Promise.resolve(response);
    });
}), _defineProperty(_Object$assign, 'remove', function remove(item) {
    var index = this.data.findIndex(function (datum) {
        return JSON.stringify(datum) === JSON.stringify(item);
    });

    if (index === -1) return;

    this.data.splice(index, 1);
}), _defineProperty(_Object$assign, 'set', function set(attr, value) {
    this.data[attr] = value;
    this.emit(attr + 'Changed');
}), _defineProperty(_Object$assign, 'validate', function validate(data) {
    var _this8 = this;

    var valid = true;

    Object.keys(data).forEach(function (name) {
        var val = data[name],
            attribute = _this8.attributes.find(function (attr) {
            return attr.name === name;
        });

        if (attribute === undefined || !attribute.validate) {
            _this8.data[name] = val ? typeof val === 'string' ? val.trim() : val : undefined;
        } else if (valid && !_this8.validateDatum(attribute, val)) {
            _this8.emit('validationError', attribute);
            valid = false;
        } else if (_this8.validateDatum(attribute, val)) {
            _this8.data[name] = val.trim();
        }
    });

    return valid;
}), _defineProperty(_Object$assign, 'validateDatum', function validateDatum(attr, val) {
    return attr.validate.call(this, val.trim());
}), _Object$assign));

},{"../../../lib/Model":24,"../Xhr":5,"events":27}],11:[function(require,module,exports){
'use strict';

if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) {
        // .length of function is 2
        'use strict';

        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while (i < 0 && (el = el.parentElement));
        return el;
    };
}

//https://gist.github.com/paulirish/1579671
var requestAnimationFramePolyfill = function () {
    var clock = Date.now();

    return function (callback) {

        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                polyfill(callback);
            }, 0);
        }
    };
}();

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || requestAnimationFramePolyfill;

require('smoothscroll-polyfill').polyfill();

module.exports = true;

},{"smoothscroll-polyfill":28}],12:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('../../lib/MyObject'), {

    ViewFactory: require('./factory/View'),

    Views: require('./.ViewMap'),

    Singletons: ['Header'],

    initialize: function initialize() {
        var _this = this;

        this.contentContainer = document.querySelector('#content');

        this.ViewFactory.constructor();

        this.Singletons.forEach(function (name) {
            return _this.Views[name].constructor({ factory: _this.ViewFactory });
        });

        window.onpopstate = this.handle.bind(this);

        this.Views.Header.on('navigate', function (route) {
            return _this.navigate(route);
        });

        this.footer = this.ViewFactory.create('footer', { insertion: { el: document.body } });

        this.handle();
    },
    handle: function handle() {
        this.handler(window.location.pathname.split('/').slice(1));
    },
    handler: function handler(path) {
        var _this2 = this;

        var name = this.pathToView(path[0]),
            view = this.Views[name] ? name : 'home';

        if (view === this.currentView) return this.views[view].onNavigation(path.slice(1));

        this.scrollToTop();

        Promise.all(Object.keys(this.views).map(function (view) {
            return _this2.views[view].hide();
        })).then(function () {

            _this2.currentView = view;

            if (_this2.views[view]) return _this2.views[view].onNavigation(path);

            return Promise.resolve(_this2.views[view] = _this2.ViewFactory.create(view, { insertion: { el: _this2.contentContainer }, path: path }).on('navigate', function (route, options) {
                return _this2.navigate(route, options);
            }).on('deleted', function () {
                return delete _this2.views[view];
            }));
        }).catch(this.Error);

        this.footer.els.container.classList.toggle('hidden', view === 'Admin');
    },
    navigate: function navigate(location) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (options.replace || options.up) {
            var path = ('' + window.location.pathname).split('/');
            path.pop();
            if (options.replace) path.push(location);
            location = path.join('/');
        } else if (options.append) {
            location = window.location.pathname + '/' + location;
        }

        if (location !== window.location.pathname) history.pushState({}, '', location);
        if (!options.silent) this.handle();
    },
    onLogout: function onLogout() {
        var _this3 = this;

        Promise.all(Object.keys(this.views).map(function (view) {
            return _this3.views[view].delete();
        })).then(function () {
            _this3.currentView = undefined;return _this3.handle();
        }).catch(this.Error);
    },
    pathToView: function pathToView(path) {
        var _this4 = this;

        var hyphenSplit = path.split('-');
        return hyphenSplit.map(function (item) {
            return _this4.capitalizeFirstLetter(item);
        }).join('');
    },
    scrollToTop: function scrollToTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
}), { currentView: { value: '', writable: true }, views: { value: {} } });

},{"../../lib/MyObject":26,"./.ViewMap":3,"./factory/View":6}],13:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {});

},{"./__proto__":20}],14:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {
    postRender: function postRender() {
        return this;
    },


    template: require('./templates/Footer')

});

},{"./__proto__":20,"./templates/Footer":22}],15:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = Object.create(Object.assign({}, require('./__proto__'), {

    User: require('../models/User'),

    events: {
        navList: 'click'
    },

    insertion: function insertion() {
        return { el: document.querySelector('#content'), method: 'insertBefore' };
    },


    model: require('../models/Header'),

    name: 'Header',
    onNavListClick: function onNavListClick(event) {
        this.emit('navigate', '/' + event.target.textContent.replace(/\s+/g, ''));
        var headers = [].concat(_toConsumableArray(event.target.parentElement.children)).forEach(function (header) {
            return header.classList.remove('selected');
        });
        event.target.classList.add('selected');
    },
    onLogoutClick: function onLogoutClick() {
        this.User.logout();
    },
    onUserLogin: function onUserLogin() {
        this.els.profileBtn.classList.remove('hidden');
        this.els.name.textContent = this.User.data.name || this.User.data.email;
    },
    onUserLogout: function onUserLogout() {
        this.els.profileBtn.classList.add('hidden');
        this.els.name.textContent = '';
    },
    postRender: function postRender() {
        var _this = this;

        if (this.User.isLoggedIn()) this.onUserLogin();

        this.User.on('got', function () {
            if (_this.User.isLoggedIn()) _this.onUserLogin();
        });
        this.User.on('logout', function () {
            return _this.onUserLogout();
        });

        return this;
    },


    template: require('./templates/Header')

}), {});

},{"../models/Header":8,"../models/User":9,"./__proto__":20,"./templates/Header":23}],16:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {});

},{"./__proto__":20}],17:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {});

},{"./__proto__":20}],18:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {});

},{"./__proto__":20}],19:[function(require,module,exports){
'use strict';

module.exports = Object.assign({}, require('./__proto__'), {});

},{"./__proto__":20}],20:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = Object.assign({}, require('../../../lib/MyObject'), require('events').EventEmitter.prototype, {
    $: function $(el, selector) {
        return Array.from(el.querySelectorAll(selector));
    },


    TemplateContext: require('../TemplateContext'),

    Model: require('../models/__proto__'),

    OptimizedResize: require('./lib/OptimizedResize'),

    Xhr: require('../Xhr'),

    bindEvent: function bindEvent(key, event, el) {
        var _this = this;

        var els = el ? [el] : Array.isArray(this.els[key]) ? this.els[key] : [this.els[key]],
            name = this.getEventMethodName(key, event);

        if (!this['_' + name]) this['_' + name] = function (e) {
            return _this[name](e);
        };

        els.forEach(function (el) {
            return el.addEventListener(event || 'click', _this['_' + name]);
        });
    },
    constructor: function constructor() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


        if (opts.events) {
            Object.assign(this.events, opts.events);delete opts.events;
        }
        Object.assign(this, opts);

        this.subviewElements = [];

        if (this.requiresLogin && !this.user.isLoggedIn()) return this.handleLogin();
        if (this.user && !this.isAllowed(this.user)) return this.scootAway();

        return this.initialize().render();
    },
    delegateEvents: function delegateEvents(key, el) {
        var _this2 = this;

        var type = _typeof(this.events[key]);

        if (type === "string") {
            this.bindEvent(key, this.events[key], el);
        } else if (Array.isArray(this.events[key])) {
            this.events[key].forEach(function (eventObj) {
                return _this2.bindEvent(key, eventObj);
            });
        } else {
            this.bindEvent(key, this.events[key].event);
        }
    },
    delete: function _delete() {
        var _this3 = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { silent: false },
            silent = _ref.silent;

        return this.hide().then(function () {
            var container = _this3.els.container,
                parent = container.parentNode;
            if (container && parent) parent.removeChild(container);
            if (!silent) _this3.emit('deleted');
            return Promise.resolve();
        });
    },


    events: {},

    fadeInImage: function fadeInImage(el) {
        var _this4 = this;

        el.onload = function () {
            _this4.emit('imgLoaded', el);
            el.removeAttribute('data-src');
        };

        el.setAttribute('src', el.getAttribute('data-src'));
    },
    getEventMethodName: function getEventMethodName(key, event) {
        return 'on' + this.capitalizeFirstLetter(key) + this.capitalizeFirstLetter(event);
    },
    getContainer: function getContainer() {
        return this.els.container;
    },
    getTemplateOptions: function getTemplateOptions() {
        var rv = Object.assign(this.user ? { user: this.user.data } : {});

        if (this.model) {
            rv.model = this.model.data;

            if (this.model.meta) rv.meta = this.model.meta;
            if (this.model.attributes) rv.attributes = this.model.attributes;
        }

        if (this.templateOptions) rv.opts = typeof this.templateOptions === 'function' ? this.templateOptions() : this.templateOptions || {};

        return rv;
    },
    handleLogin: function handleLogin() {
        var _this5 = this;

        this.factory.create('login', { insertion: { el: document.querySelector('#content') } }).on("loggedIn", function () {
            return _this5.onLogin();
        });

        return this;
    },
    hide: function hide(isSlow) {
        var _this6 = this;

        //views not hiding consistently with this
        //if( !this.els || this.isHiding ) return Promise.resolve()

        this.isHiding = true;
        return this.hideEl(this.els.container, isSlow).then(function () {
            return Promise.resolve(_this6.hiding = false);
        });
    },
    hideSync: function hideSync() {
        this.els.container.classList.add('hidden');return this;
    },
    _hideEl: function _hideEl(el, resolve, hash, isSlow) {
        el.removeEventListener('animationend', this[hash]);
        el.classList.add('hidden');
        el.classList.remove('animate-out' + (isSlow ? '-slow' : ''));
        delete this[hash];
        this.isHiding = false;
        resolve();
    },
    hideEl: function hideEl(el, isSlow) {
        var _this7 = this;

        if (this.isHidden(el)) return Promise.resolve();

        var time = new Date().getTime(),
            hash = time + 'Hide';

        return new Promise(function (resolve) {
            _this7[hash] = function (e) {
                return _this7._hideEl(el, resolve, hash, isSlow);
            };
            el.addEventListener('animationend', _this7[hash]);
            el.classList.add('animate-out' + (isSlow ? '-slow' : ''));
        });
    },
    htmlToFragment: function htmlToFragment(str) {
        return this.factory.range.createContextualFragment(str);
    },
    initialize: function initialize() {
        return Object.assign(this, { els: {}, slurp: { attr: 'data-js', view: 'data-view', name: 'data-name', img: 'data-src' }, views: {} });
    },
    insertToDom: function insertToDom(fragment, options) {
        var insertion = typeof options.insertion === 'function' ? options.insertion() : options.insertion;

        insertion.method === 'insertBefore' ? insertion.el.parentNode.insertBefore(fragment, insertion.el) : insertion.el[insertion.method || 'appendChild'](fragment);
    },
    isAllowed: function isAllowed(user) {
        if (!this.requiresRole) return true;

        var userRoles = new Set(user.data.roles);

        if (typeof this.requiresRole === 'string') return userRoles.has(this.requiresRole);

        if (Array.isArray(this.requiresRole)) {
            var result = this.requiresRole.find(function (role) {
                return userRoles.has(role);
            });

            return result !== undefined;
        }

        return false;
    },
    isHidden: function isHidden(el) {
        return el ? el.classList.contains('hidden') : this.els.container.classList.contains('hidden');
    },
    onLogin: function onLogin() {

        if (!this.isAllowed(this.user)) return this.scootAway();

        this.initialize().render();
    },
    onNavigation: function onNavigation() {
        return this.show();
    },
    showNoAccess: function showNoAccess() {
        alert("No privileges, son");
        return this;
    },
    postRender: function postRender() {
        return this;
    },
    render: function render() {
        if (this.data) this.model = Object.create(this.Model, {}).constructor(this.data);

        this.slurpTemplate({
            insertion: this.insertion || { el: document.body },
            isView: true,
            storeFragment: this.storeFragment,
            template: Reflect.apply(this.template, this.TemplateContext, [this.getTemplateOptions()])
        });

        this.renderSubviews();

        if (this.size) {
            this.size();this.OptimizedResize.add(this.size.bind(this));
        }

        return this.postRender();
    },
    removeChildren: function removeChildren(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }return this;
    },
    renderSubviews: function renderSubviews() {
        var _this8 = this;

        this.subviewElements.forEach(function (obj) {
            var name = obj.name || obj.view;

            var opts = {};

            if (_this8.Views && _this8.Views[obj.view]) opts = _typeof(_this8.Views[obj.view]) === "object" ? _this8.Views[obj.view] : Reflect.apply(_this8.Views[obj.view], _this8, []);
            if (_this8.Views && _this8.Views[name]) opts = _typeof(_this8.Views[name]) === "object" ? _this8.Views[name] : Reflect.apply(_this8.Views[name], _this8, []);

            _this8.views[name] = _this8.factory.create(obj.view, Object.assign({ insertion: { el: obj.el, method: 'insertBefore' } }, opts));

            if (_this8.events.views) {
                if (_this8.events.views[name]) _this8.events.views[name].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return Reflect.apply(arr[1], _this8, [eventData]);
                    });
                });else if (_this8.events.views[obj.view]) _this8.events.views[obj.view].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return Reflect.apply(arr[1], _this8, [eventData]);
                    });
                });
            }

            if (obj.el.classList.contains('hidden')) _this8.views[name].hideSync();
            obj.el.remove();
        });

        this.subviewElements = [];

        return this;
    },
    scootAway: function scootAway() {
        var _this9 = this;

        this.Toast.showMessage('error', 'You are not allowed here.').catch(function (e) {
            _this9.Error(e);_this9.emit('navigate', '/');
        }).then(function () {
            return _this9.emit('navigate', '/');
        });

        return this;
    },
    show: function show(isSlow) {
        return this.showEl(this.els.container, isSlow);
    },
    showSync: function showSync() {
        this.els.container.classList.remove('hidden');return this;
    },
    _showEl: function _showEl(el, resolve, hash, isSlow) {
        el.removeEventListener('animationend', this[hash]);
        el.classList.remove('animate-in' + (isSlow ? '-slow' : ''));
        delete this[hash];
        resolve();
    },
    showEl: function showEl(el, isSlow) {
        var _this10 = this;

        var time = new Date().getTime(),
            hash = time + 'Show';

        return new Promise(function (resolve) {
            _this10[hash] = function (e) {
                return _this10._showEl(el, resolve, hash, isSlow);
            };
            el.addEventListener('animationend', _this10[hash]);
            el.classList.remove('hidden');
            el.classList.add('animate-in' + (isSlow ? '-slow' : ''));
        });
    },
    slurpEl: function slurpEl(el) {
        var key = el.getAttribute(this.slurp.attr) || 'container';

        if (key === 'container') {
            el.classList.add(this.name);
            if (this.klass) el.classList.add(this.klass);
        }

        this.els[key] = Array.isArray(this.els[key]) ? this.els[key].concat(el) : this.els[key] !== undefined ? [this.els[key], el] : el;

        el.removeAttribute(this.slurp.attr);

        if (this.events[key]) this.delegateEvents(key, el);
    },
    slurpTemplate: function slurpTemplate(options) {
        var _this11 = this;

        var fragment = this.htmlToFragment(options.template),
            selector = '[' + this.slurp.attr + ']',
            viewSelector = '[' + this.slurp.view + ']',
            imgSelector = '[' + this.slurp.img + ']',
            firstEl = fragment.querySelector('*');

        if (options.isView || firstEl.getAttribute(this.slurp.attr)) this.slurpEl(firstEl);
        Array.from(fragment.querySelectorAll(selector + ', ' + viewSelector + ', ' + imgSelector)).forEach(function (el) {
            if (el.hasAttribute(_this11.slurp.attr)) {
                _this11.slurpEl(el);
            } else if (el.hasAttribute(_this11.slurp.img)) _this11.fadeInImage(el);else if (el.hasAttribute(_this11.slurp.view)) {
                _this11.subviewElements.push({ el: el, view: el.getAttribute(_this11.slurp.view), name: el.getAttribute(_this11.slurp.name) });
            }
        });

        if (options.storeFragment) return Object.assign(this, { fragment: fragment });

        this.insertToDom(fragment, options);

        if (options.renderSubviews) this.renderSubviews();

        return this;
    },
    unbindEvent: function unbindEvent(key, event, el) {
        var _this12 = this;

        var els = el ? [el] : Array.isArray(this.els[key]) ? this.els[key] : [this.els[key]],
            name = this.getEventMethodName(key, event);

        els.forEach(function (el) {
            return el.removeEventListener(event || 'click', _this12['_' + name]);
        });
    }
});

},{"../../../lib/MyObject":26,"../TemplateContext":4,"../Xhr":5,"../models/__proto__":10,"./lib/OptimizedResize":21,"events":27}],21:[function(require,module,exports){
'use strict';

module.exports = Object.create({
    add: function add(callback) {
        if (!this.callbacks.length) window.addEventListener('resize', this.onResize.bind(this));
        this.callbacks.push(callback);
    },
    onResize: function onResize() {
        if (this.running) return;

        this.running = true;

        window.requestAnimationFrame ? window.requestAnimationFrame(this.runCallbacks.bind(this)) : setTimeout(this.runCallbacks, 66);
    },
    runCallbacks: function runCallbacks() {
        this.callbacks = this.callbacks.filter(function (callback) {
            return callback();
        });
        this.running = false;
    }
}, { callbacks: { writable: true, value: [] }, running: { writable: true, value: false } });

},{}],22:[function(require,module,exports){
"use strict";

module.exports = function () {
    return "<footer>\n    <div>future days farm</div>\n    <div> \n        2123 Tiny Road<br/>Town Name, Michigan 33344<br/><br/>\n        <a href=\"mailto:Info@FutureDaysFarm.com\">Info@FutureDaysFarm.com</a><br/>\n        (333) 323-8899\n    </div><br/>\n    <div>Copyright " + new Date().getFullYear() + " FutureDays Software</div>\n    </footer>";
};

},{}],23:[function(require,module,exports){
'use strict';

module.exports = function (_ref) {
    var _this = this;

    var model = _ref.model;

    var navOptions = model.map(function (datum) {
        return '<div data-js=\'navList\'>' + _this.capitalizeWords(datum) + '</div>';
    }).join('');
    return '<nav>' + navOptions + '</nav>';
};

},{}],24:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = Object.assign({}, require('./MyObject'), {
    CreateDefault: function CreateDefault() {
        return this.reducer(this.attributes, function (attr) {
            return _defineProperty({}, attr.name, typeof attr.default === 'function' ? attr.default() : attr.default);
        });
    },


    attributes: [],

    data: {},

    constructor: function constructor() {
        var _this = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        Object.assign(this, { store: {}, data: data }, opts);

        if (this.storeBy) {
            this.storeBy.forEach(function (key) {
                return _this.store[key] = {};
            });
            this._store();
        }

        return this;
    },


    meta: {},

    sort: function sort(opts) {
        var attr = Object.keys(opts)[0],
            value = opts[attr];

        this.data.sort(function (a, b) {
            return value ? a[attr] < b[attr] ? -1 : 1 : b[attr] < a[attr] ? -1 : 1;
        });

        return this;
    },
    _resetStore: function _resetStore(storeBy) {
        var _this2 = this;

        this.store = {};
        storeBy.forEach(function (attr) {
            return _this2.store[attr] = {};
        });
        this.storeBy = storeBy;
    },
    _store: function _store(data) {
        var _this3 = this;

        data = data || this.data;
        data.forEach(function (datum) {
            return _this3.storeBy.forEach(function (attr) {
                return _this3._storeAttr(datum, attr);
            });
        });
    },
    _storeAttr: function _storeAttr(datum, attr) {
        this.store[attr][datum[attr]] = this.store[attr][datum[attr]] ? Array.isArray(this.store[attr][datum[attr]]) ? this.store[attr][datum[attr]].concat(datum) : [this.store[attr][datum[attr]], datum] : datum;
    },
    _storeOne: function _storeOne(datum) {
        var _this4 = this;

        this.storeBy.forEach(function (attr) {
            return _this4._storeAttr(datum, attr);
        });
    }
});

},{"./MyObject":26}],25:[function(require,module,exports){
"use strict";

module.exports = function (err) {
  console.log(err.stack || err);
};

},{}],26:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {

    capitalizeFirstLetter: function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getIntRange: function getIntRange(int) {
        return Array.from(Array(int).keys());
    },
    getRandomInclusiveInteger: function getRandomInclusiveInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    omit: function omit(obj, keys) {
        return Object.keys(obj).filter(function (key) {
            return !keys.includes(key);
        }).reduce(function (memo, key) {
            return Object.assign(memo, _defineProperty({}, key, obj[key]));
        }, {});
    },
    pick: function pick(obj, keys) {
        return keys.reduce(function (memo, key) {
            return Object.assign(memo, _defineProperty({}, key, obj[key]));
        }, {});
    },
    reducer: function reducer(arr, fn) {
        return arr.reduce(function (memo, item, i) {
            return Object.assign(memo, fn(item, i));
        }, {});
    },
    shuffleArray: function shuffleArray(arr) {
        var _this = this;

        var rv = Array.from(arr);

        rv.forEach(function (item, i) {
            if (i === rv.length - 1) return;
            var int = _this.getRandomInclusiveInteger(i, rv.length - 1),
                holder = rv[i];

            rv[i] = rv[int];
            rv[int] = holder;
        });

        return rv;
    },


    Error: require('./MyError'),

    P: function P(fun) {
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var thisArg = arguments[2];
        return new Promise(function (resolve, reject) {
            return Reflect.apply(fun, thisArg || undefined, args.concat(function (e) {
                for (var _len = arguments.length, callback = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    callback[_key - 1] = arguments[_key];
                }

                return e ? reject(e) : resolve(callback);
            }));
        });
    },

    constructor: function constructor() {
        return this;
    }
};

},{"./MyError":25}],27:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],28:[function(require,module,exports){
/* smoothscroll v0.4.0 - 2017 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   */
  var w = window;
  var d = document;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

   // polyfill
  function polyfill() {
    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style
      && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now
      ? w.performance.now.bind(w.performance)
      : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null
        || typeof firstArg !== 'object'
        || firstArg.behavior === undefined
        || firstArg.behavior === 'auto'
        || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions '
        + firstArg.behavior
        + ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return (el.clientHeight + ROUNDING_TOLERANCE) < el.scrollHeight;
      }

      if (axis === 'X') {
        return (el.clientWidth + ROUNDING_TOLERANCE) < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : (w.scrollX || w.pageXOffset),
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : (w.scrollY || w.pageYOffset)
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : (w.scrollX || w.pageXOffset),
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : (w.scrollY || w.pageYOffset)
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
             ? arguments[1]
             : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value couldn\'t be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object'
              ? ~~arguments[0]
              : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined
              ? ~~arguments[1]
              : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined
            ? true
            : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (typeof exports === 'object') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }

}());

},{}],29:[function(require,module,exports){
'use strict';

module.exports = Object.create(Object.assign({}, require('../../../client/js/views/__proto__'), {

    ToastMessage: require('./ToastMessage'),

    name: 'Toast',

    postRender: function postRender() {
        this.messages = {};

        return this;
    },


    requiresLogin: false,

    createMessage: function createMessage(type, message) {
        if (!this.messages[message]) this.messages[message] = Object.create(this.ToastMessage, {
            insertion: { value: { el: this.els.container } }
        }).constructor();

        return this.messages[message].showMessage(type, message);
    },


    template: require('./templates/Toast')

}), {});

},{"../../../client/js/views/__proto__":20,"./ToastMessage":30,"./templates/Toast":31}],30:[function(require,module,exports){
module.exports = Object.assign( {}, require('../../../client/js/views/__proto__'), {

    name: 'ToastMessage',

    Icons: {
        error: require('./templates/lib/error')(),
        success: require('./templates/lib/checkmark')()
    },

    postRender() {

        this.on( 'shown', () => this.status = 'shown' )
        this.on( 'hidden', () => this.status = 'hidden' )

        return this
    },

    requiresLogin: false,

    showMessage( type, message ) {
        return new Promise( ( resolve, reject )  => {
            if( /show/.test( this.status ) ) this.teardown()

            this.resolution = resolve

            if( type !== 'error' ) this.els.container.classList.add('success')

            this.els.message.textContent = message
            this.els.title.textContent = type === 'error' ? 'Error' : 'Success'
            this.slurpTemplate( { insertion: { el: this.els.icon }, template: type === 'error' ? this.Icons.error : this.Icons.success } )
            
            this.status = 'showing'

            this.show( true )
            .then( () => this.hide( true ) )
            .then( () => this.teardown() )
            .catch( reject )
        } )
    },

    teardown() {
        if( this.els.container.classList.contains('success') ) this.els.container.classList.remove('success')
        this.els.message.textContent = ''
        this.els.message.title = ''
        if( this.els.icon.firstChild ) this.els.icon.removeChild( this.els.icon.firstChild )
        this.resolution()
    },

    template: require('./templates/ToastMessage')

} )

},{"../../../client/js/views/__proto__":20,"./templates/ToastMessage":32,"./templates/lib/checkmark":33,"./templates/lib/error":34}],31:[function(require,module,exports){
module.exports = () => `<div></div>`

},{}],32:[function(require,module,exports){
module.exports = () => 
`<div class="hidden">
    <div data-js="icon"></div>
    <div>
        <div data-js="title"></div>
        <div data-js="message"></div>
    </div>
</div>`
},{}],33:[function(require,module,exports){
module.exports = (p={}) => `<svg version="1.1" data-js="${p.name || 'checkmark'}" class="checkmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="97.619px" height="97.618px" viewBox="0 0 97.619 97.618" style="enable-background:new 0 0 97.619 97.618;"
	 xml:space="preserve">
<g>
	<path d="M96.939,17.358L83.968,5.959c-0.398-0.352-0.927-0.531-1.449-0.494C81.99,5.5,81.496,5.743,81.146,6.142L34.1,59.688
		L17.372,37.547c-0.319-0.422-0.794-0.701-1.319-0.773c-0.524-0.078-1.059,0.064-1.481,0.385L0.794,47.567
		c-0.881,0.666-1.056,1.92-0.39,2.801l30.974,40.996c0.362,0.479,0.922,0.771,1.522,0.793c0.024,0,0.049,0,0.073,0
		c0.574,0,1.122-0.246,1.503-0.68l62.644-71.297C97.85,19.351,97.769,18.086,96.939,17.358z"/>
</g></svg>`

},{}],34:[function(require,module,exports){
module.exports = (p={}) => `<svg version="1.1" data-js="${p.name || 'error'}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18.978 18.978" style="enable-background:new 0 0 18.978 18.978;" xml:space="preserve">
<g>
    <path d="M16.088,1.675c-0.133-0.104-0.306-0.144-0.47-0.105c-0.013,0.002-1.261,0.29-2.594,0.29
        c-1.788,0-2.789-0.476-2.975-1.415C9.999,0.191,9.779,0.007,9.521,0c-0.257-0.007-0.487,0.167-0.55,0.418
        C8.727,1.386,7.71,1.877,5.95,1.877c-1.332,0-2.571-0.302-2.583-0.305c-0.166-0.04-0.34-0.004-0.474,0.102
        C2.76,1.777,2.681,1.938,2.681,2.108v4.869c0,0.04,0.004,0.078,0.013,0.115c0.057,1.647,0.65,8.714,6.528,11.822
        c0.08,0.043,0.169,0.064,0.258,0.064c0.092,0,0.183-0.021,0.266-0.066c5.74-3.137,6.445-10.115,6.532-11.791
        c0.012-0.046,0.019-0.094,0.019-0.144V2.108C16.297,1.939,16.219,1.78,16.088,1.675z M15.19,6.857
        c-0.007,0.031-0.012,0.064-0.013,0.097c-0.053,1.298-0.574,7.832-5.701,10.838c-5.215-2.965-5.646-9.526-5.68-10.83
        c0-0.029-0.004-0.058-0.009-0.085V2.784C4.322,2.877,5.112,2.982,5.95,2.982c1.911,0,2.965-0.54,3.537-1.208
        c0.553,0.661,1.599,1.191,3.536,1.191c0.839,0,1.631-0.101,2.166-0.188L15.19,6.857L15.19,6.857z"/>
    <polygon points="10.241,11.237 10.529,5.311 8.449,5.311 8.75,11.237 		"/>
    <path d="M9.496,11.891c-0.694,0-1.178,0.498-1.178,1.189c0,0.682,0.471,1.191,1.178,1.191
        c0.706,0,1.164-0.51,1.164-1.191C10.647,12.389,10.189,11.891,9.496,11.891z"/>
</g></svg>`

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvLk1vZGVsTWFwLmpzIiwiY2xpZW50L2pzLy5UZW1wbGF0ZU1hcC5qcyIsImNsaWVudC9qcy8uVmlld01hcC5qcyIsImNsaWVudC9qcy9UZW1wbGF0ZUNvbnRleHQuanMiLCJjbGllbnQvanMvWGhyLmpzIiwiY2xpZW50L2pzL2ZhY3RvcnkvVmlldy5qcyIsImNsaWVudC9qcy9tYWluLmpzIiwiY2xpZW50L2pzL21vZGVscy9IZWFkZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL1VzZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL19fcHJvdG9fXy5qcyIsImNsaWVudC9qcy9wb2x5ZmlsbC5qcyIsImNsaWVudC9qcy9yb3V0ZXIuanMiLCJjbGllbnQvanMvdmlld3MvQWJvdXRVcy5qcyIsImNsaWVudC9qcy92aWV3cy9Gb290ZXIuanMiLCJjbGllbnQvanMvdmlld3MvSGVhZGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL0hvbWUuanMiLCJjbGllbnQvanMvdmlld3MvT3VyT2ZmZXJpbmdzLmpzIiwiY2xpZW50L2pzL3ZpZXdzL1RoZUJsb2cuanMiLCJjbGllbnQvanMvdmlld3MvV2hlcmVUb0ZpbmRVcy5qcyIsImNsaWVudC9qcy92aWV3cy9fX3Byb3RvX18uanMiLCJjbGllbnQvanMvdmlld3MvbGliL09wdGltaXplZFJlc2l6ZS5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvRm9vdGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL3RlbXBsYXRlcy9IZWFkZXIuanMiLCJsaWIvTW9kZWwuanMiLCJsaWIvTXlFcnJvci5qcyIsImxpYi9NeU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL3Ntb290aHNjcm9sbC1wb2x5ZmlsbC9kaXN0L3Ntb290aHNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL1RvYXN0LmpzIiwibm9kZV9tb2R1bGVzL3RvYXN0L3ZpZXdzL3RlbXBsYXRlcy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9jaGVja21hcmsuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTs7OztBQ0RBLE9BQU8sT0FBUCxHQUFlO0FBQ2IsVUFBUyxRQUFRLGlCQUFSLENBREk7QUFFZCxTQUFRLFFBQVEsZ0JBQVIsQ0FGTTtBQUdkLFNBQVEsUUFBUSxnQkFBUixDQUhNO0FBSWQsT0FBTSxRQUFRLGNBQVIsQ0FKUTtBQUtkLGVBQWMsUUFBUSxzQkFBUixDQUxBO0FBTWQsVUFBUyxRQUFRLGlCQUFSLENBTks7QUFPZCxRQUFPLFFBQVEsZUFBUixDQVBPO0FBUWQsZ0JBQWUsUUFBUSx1QkFBUjtBQVJELENBQWY7Ozs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBaUI7O0FBRWIsMkJBQXVCO0FBQUEsZUFBVSxPQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQWlCLFdBQWpCLEtBQWlDLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FBM0M7QUFBQSxLQUZWOztBQUliLGNBQVUsSUFBSSxLQUFLLFlBQVQsQ0FBdUIsT0FBdkIsRUFBZ0M7QUFDeEMsZUFBTyxVQURpQztBQUV4QyxrQkFBVSxLQUY4QjtBQUd4QywrQkFBdUI7QUFIaUIsS0FBaEMsQ0FKRztBQVNiLG1CQVRhLDJCQVNHLE1BVEgsRUFTVztBQUFBOztBQUNwQixlQUFPLE9BQU8sS0FBUCxDQUFhLEtBQWIsRUFDTixHQURNLENBQ0Y7QUFBQSxtQkFBUSxNQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQVI7QUFBQSxTQURFLEVB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hjQSxPQUFPLE9BQVAsR0FBaUIsT0FBTyxNQUFQLENBQWUsT0FBTyxNQUFQLENBQWUsRUFBZixFQUFtQixRQUFRLG9DQUFSLENBQW5CLEVBQWtFOztBQUU5RixrQkFBYyxRQUFRLGdCQUFSLENBRmdGOztBQUk5RixVQUFNLE9BSndGOztBQU05RixjQU44Rix3QkFNakY7QUFDVCxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsZUFBTyxJQUFQO0FBQ0gsS0FWNkY7OztBQVk5RixtQkFBZSxLQVorRTs7QUFjOUYsaUJBZDhGLHlCQWMvRSxJQWQrRSxFQWN6RSxPQWR5RSxFQWMvRDtBQUMzQixZQUFJLENBQUMsS0FBSyxRQUFMLENBQWUsT0FBZixDQUFMLEVBQWdDLEtBQUssUUFBTCxDQUFlLE9BQWYsSUFBMkIsT0FBTyxNQUFQLENBQWUsS0FBSyxZQUFwQixFQUFrQztBQUN6Rix1QkFBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEtBQUssR0FBTCxDQUFTLFNBQWYsRUFBVDtBQUQ4RSxTQUFsQyxFQUV2RCxXQUZ1RCxFQUEzQjs7QUFJaEMsZUFBTyxLQUFLLFFBQUwsQ0FBZSxPQUFmLEVBQXlCLFdBQXpCLENBQXNDLElBQXRDLEVBQTRDLE9BQTVDLENBQVA7QUFFSCxLQXJCNkY7OztBQXVCOUYsY0FBVSxRQUFRLG1CQUFSOztBQXZCb0YsQ0FBbEUsQ0FBZixFQXlCWixFQXpCWSxDQUFqQjs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYlhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWlJc0ltWnBiR1VpT2lJdVRXOWtaV3hOWVhBdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXMTE5IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSXVWR1Z0Y0d4aGRHVk5ZWEF1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNlcxMTkiLCJtb2R1bGUuZXhwb3J0cz17XG5cdCBBYm91dFVzOiByZXF1aXJlKCcuL3ZpZXdzL0Fib3V0VXMnKSxcblx0Rm9vdGVyOiByZXF1aXJlKCcuL3ZpZXdzL0Zvb3RlcicpLFxuXHRIZWFkZXI6IHJlcXVpcmUoJy4vdmlld3MvSGVhZGVyJyksXG5cdEhvbWU6IHJlcXVpcmUoJy4vdmlld3MvSG9tZScpLFxuXHRPdXJPZmZlcmluZ3M6IHJlcXVpcmUoJy4vdmlld3MvT3VyT2ZmZXJpbmdzJyksXG5cdFRoZUJsb2c6IHJlcXVpcmUoJy4vdmlld3MvVGhlQmxvZycpLFxuXHRUb2FzdDogcmVxdWlyZSgnLi92aWV3cy9Ub2FzdCcpLFxuXHRXaGVyZVRvRmluZFVzOiByZXF1aXJlKCcuL3ZpZXdzL1doZXJlVG9GaW5kVXMnKSBcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIENhcGl0YWxpemVGaXJzdExldHRlcjogc3RyaW5nID0+IHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKSxcblxuICAgIEN1cnJlbmN5OiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoICdlbi1VUycsIHtcbiAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyXG4gICAgfSApLFxuICAgIGNhcGl0YWxpemVXb3JkcyhzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5zcGxpdCgvXFxzKy8pXG4gICAgICAgIC5tYXAod29yZCA9PiB0aGlzLkNhcGl0YWxpemVGaXJzdExldHRlcih3b3JkKSkuam9pbignICcpXG4gICAgfSxcbiAgICBHZXRGb3JtRmllbGQoIGRhdHVtLCB2YWx1ZSwgbWV0YSApIHtcbiAgICAgICAgY29uc3QgaXNOZXN0ZWQgPSBkYXR1bS5yYW5nZSA9PT0gJ0xpc3QnIHx8IHR5cGVvZiBkYXR1bS5yYW5nZSA9PT0gJ29iamVjdCdcblxuICAgICAgICBjb25zdCBpbWFnZSA9IGRhdHVtLnJhbmdlID09PSAnSW1hZ2VVcmwnXG4gICAgICAgICAgICA/IGA8ZGl2PjxidXR0b24gY2xhc3M9XCJidG5cIiBkYXRhLWpzPVwicHJldmlld0J0blwiIHR5cGU9XCJidXR0b25cIj5QcmV2aWV3PC9idXR0b24+PGltZyBkYXRhLXNyYz1cIiR7dGhpcy5JbWFnZVNyYyggdmFsdWUgKX1cIiAvPjwvZGl2PmBcbiAgICAgICAgICAgIDogYGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICBjb25zdCBvcHRpb25zID0gZGF0dW0ucmFuZ2UgPT09ICdCb29sZWFuJ1xuICAgICAgICAgICAgPyBbIHsgbGFiZWw6ICdUcnVlJywgbmFtZTogJ3RydWUnIH0sIHsgbGFiZWw6ICdGYWxzZScsIG5hbWU6ICdmYWxzZScgfSBdXG4gICAgICAgICAgICA6IGRhdHVtLm1ldGFkYXRhXG4gICAgICAgICAgICAgICAgPyBkYXR1bS5tZXRhZGF0YS5vcHRpb25zIDogZmFsc2VcblxuICAgICAgICBjb25zdCBpY29uID0gZGF0dW0ubWV0YWRhdGEgJiYgZGF0dW0ubWV0YWRhdGEuaWNvblxuICAgICAgICAgICAgPyB0aGlzLkdldEljb24oIGRhdHVtLm1ldGFkYXRhLmljb24gKVxuICAgICAgICAgICAgOiBvcHRpb25zXG4gICAgICAgICAgICAgICAgPyB0aGlzLkdldEljb24oJ2NhcmV0LWRvd24nKVxuICAgICAgICAgICAgICAgIDogYGBcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGlzTmVzdGVkIHx8ICggZGF0dW0uZmsgfHwgZGF0dW0ubGFiZWwgJiYgIW1ldGEubm9MYWJlbCApXG4gICAgICAgICAgICA/IGA8bGFiZWw+JHtkYXR1bS5mayB8fCBkYXR1bS5sYWJlbH08L2xhYmVsPmBcbiAgICAgICAgICAgIDogYGBcblxuICAgICAgICB2YWx1ZSA9ICggdmFsdWUgPT09IHVuZGVmaW5lZCApID8gJycgOiB2YWx1ZVxuXG4gICAgICAgIGlmKCBvcHRpb25zICkge1xuICAgICAgICAgICAgaWYoIHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nICkgeyBvcHRpb25zKCk7IHJldHVybiB0aGlzLkdldFNlbGVjdCggZGF0dW0sIHZhbHVlLCBbIF0sIGljb24sIGxhYmVsICkgfVxuICAgICAgICAgICAgZWxzZSBpZiggQXJyYXkuaXNBcnJheSggb3B0aW9ucyApICkgcmV0dXJuIHRoaXMuR2V0U2VsZWN0KCBkYXR1bSwgdmFsdWUsIG9wdGlvbnMsIGljb24sIGxhYmVsIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21wdCA9IGRhdHVtLnByb21wdCA/IGA8ZGl2IGNsYXNzPVwicHJvbXB0XCI+JHtkYXR1bS5wcm9tcHR9PC9kaXY+YCA6IGBgXG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBkYXR1bS5ma1xuICAgICAgICAgICAgPyBgPGRpdiBkYXRhLXZpZXc9XCJ0eXBlQWhlYWRcIiBkYXRhLW5hbWU9XCIke2RhdHVtLmZrfVwiPjwvZGl2PmBcbiAgICAgICAgICAgIDogZGF0dW0ucmFuZ2UgPT09ICdUZXh0J1xuICAgICAgICAgICAgICAgID8gYDx0ZXh0YXJlYSBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiIHBsYWNlaG9sZGVyPVwiJHtkYXR1bS5sYWJlbCB8fCAnJ31cIiByb3dzPVwiM1wiPiR7dmFsdWV9PC90ZXh0YXJlYT5gXG4gICAgICAgICAgICAgICAgOiBkYXR1bS5yYW5nZSA9PT0gJ0xpc3QnIHx8IGRhdHVtLnJhbmdlID09PSAnVmlldycgfHwgdHlwZW9mIGRhdHVtLnJhbmdlID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICA/IGA8ZGl2IGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCIgZGF0YS1uYW1lPVwiJHtkYXR1bS5uYW1lfVwiPjwvZGl2PmBcbiAgICAgICAgICAgICAgICAgICAgOiBgPGlucHV0IHR5cGU9XCIke3RoaXMuUmFuZ2VUb0lucHV0VHlwZVsgZGF0dW0ucmFuZ2UgXX1cIiBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiIHBsYWNlaG9sZGVyPVwiJHtkYXR1bS5sYWJlbCB8fCAnJ31cIiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gXG5cbiAgICAgICAgcmV0dXJuIGBgICtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwICR7aXNOZXN0ZWQgPyAnbmVzdGVkJyA6ICcnfVwiPlxuICAgICAgICAgICAgJHtsYWJlbH1cbiAgICAgICAgICAgICR7cHJvbXB0fVxuICAgICAgICAgICAgJHtpbnB1dH0gXG4gICAgICAgICAgICAke2ljb259XG4gICAgICAgIDwvZGl2PmBcbiAgICB9LFxuXG4gICAgR2V0Rm9ybUZpZWxkcyggZGF0YSwgbW9kZWw9e30sIG1ldGEgKSB7XG4gICAgICAgIGlmKCAhZGF0YSApIHJldHVybiBgYFxuXG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgICAgICAuZmlsdGVyKCBkYXR1bSA9PiBtZXRhWyBkYXR1bS5uYW1lIF0gJiYgbWV0YVsgZGF0dW0ubmFtZSBdLmhpZGUgPyBmYWxzZSA6IHRydWUgKVxuICAgICAgICAgICAgLm1hcCggZGF0dW0gPT4gdGhpcy5HZXRGb3JtRmllbGQoIGRhdHVtLCBtb2RlbCAmJiBtb2RlbFsgZGF0dW0ubmFtZSBdLCBtZXRhICkgKS5qb2luKCcnKVxuICAgIH0sXG5cbiAgICBHZXRJY29uKCBuYW1lLCBvcHRzPXsgSWNvbkRhdGFKczogdGhpcy5JY29uRGF0YUpzIH0gKSB7IHJldHVybiBSZWZsZWN0LmFwcGx5KCB0aGlzLkljb25zWyBuYW1lIF0sIHRoaXMsIFsgb3B0cyBdICkgfSxcblxuICAgIEdldExpc3RJdGVtcyggaXRlbXM9W10sIG9wdHM9e30gKSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoIGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgYXR0ciA9IG9wdHMuZGF0YUF0dHIgPyBgZGF0YS0ke29wdHMuZGF0YUF0dHJ9PVwiJHtpdGVtWyBvcHRzLmRhdGFBdHRyIF19XCJgIDogYGBcbiAgICAgICAgICAgIHJldHVybiBgPGxpICR7YXR0cn0+JHtpdGVtLmxhYmVsIHx8IGl0ZW19PC9saT5gIFxuICAgICAgICB9ICkuam9pbignJylcbiAgICB9LFxuXG4gICAgR2V0U2VsZWN0KCBkYXR1bSwgc2VsZWN0ZWRWYWx1ZSwgb3B0aW9uc0RhdGEsIGljb24sIGxhYmVsPWBgICkge1xuICAgICAgICBpZiggdHlwZW9mIHNlbGVjdGVkVmFsdWUgPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygc2VsZWN0ZWRWYWx1ZSA9PT0gJ251bWJlcicgKSBzZWxlY3RlZFZhbHVlID0gc2VsZWN0ZWRWYWx1ZS50b1N0cmluZygpXG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbnNEYXRhLmxlbmd0aCA/IHRoaXMuR2V0U2VsZWN0T3B0aW9ucyggb3B0aW9uc0RhdGEsIHNlbGVjdGVkVmFsdWUsIHsgdmFsdWVBdHRyOiAnbmFtZScgfSApIDogYGBcblxuICAgICAgICByZXR1cm4gYGAgK1xuICAgICAgICBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICR7bGFiZWx9XG4gICAgICAgICAgICA8c2VsZWN0IGRhdGEtanM9XCIke2RhdHVtLm5hbWV9XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBkaXNhYmxlZCAkeyFzZWxlY3RlZFZhbHVlID8gYHNlbGVjdGVkYCA6IGBgfSB2YWx1ZT4ke2RhdHVtLmxhYmVsfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICR7b3B0aW9uc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgJHtpY29ufVxuICAgICAgICA8L2Rpdj5gXG4gICAgfSxcblxuICAgIEdldFNlbGVjdE9wdGlvbnMoIG9wdGlvbnM9W10sIHNlbGVjdGVkVmFsdWUsIG9wdHM9eyB2YWx1ZUF0dHI6ICd2YWx1ZScgfSApIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKCBvcHRpb24gPT4gYDxvcHRpb24gJHtzZWxlY3RlZFZhbHVlID09PSBvcHRpb25bIG9wdHMudmFsdWVBdHRyIF0gPyBgc2VsZWN0ZWRgIDogYGB9IHZhbHVlPVwiJHtvcHRpb25bIG9wdHMudmFsdWVBdHRyIF19XCI+JHtvcHRpb24ubGFiZWx9PC9vcHRpb24+YCApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIC8vSWNvbnM6IHJlcXVpcmUoJy4vLkljb25NYXAnKSxcbiAgICBcbiAgICBJY29uRGF0YUpzKCBwICkgeyByZXR1cm4gcC5uYW1lID8gYGRhdGEtanM9XCIke3AubmFtZX1cImAgOiBgYCB9LFxuXG4gICAgSW1hZ2VTcmMoIG5hbWUgKSB7IHJldHVybiBgaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2ljZWxhbmRpYy1oZXJpdGFnZS1jaGlja2Vucy8ke25hbWV9YCB9LFxuXG4gICAgUmFuZ2UoIGludCApIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oIEFycmF5KCBpbnQgKS5rZXlzKCkgKVxuICAgIH0sXG5cbiAgICBSYW5nZVRvSW5wdXRUeXBlOiB7XG4gICAgICAgIEVtYWlsOiAnZW1haWwnLFxuICAgICAgICBQYXNzd29yZDogJ3Bhc3N3b3JkJyxcbiAgICAgICAgU3RyaW5nOiAndGV4dCdcbiAgICB9XG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4uLy4uL2xpYi9NeU9iamVjdCcpLCB7XG5cbiAgICBSZXF1ZXN0OiB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoIGRhdGEgKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgICAgICAgaWYoIGRhdGEub25Qcm9ncmVzcyApIHJlcS5hZGRFdmVudExpc3RlbmVyKCBcInByb2dyZXNzXCIsIGUgPT5cbiAgICAgICAgICAgICAgICBkYXRhLm9uUHJvZ3Jlc3MoIGUubGVuZ3RoQ29tcHV0YWJsZSA/IE1hdGguZmxvb3IoICggZS5sb2FkZWQgLyBlLnRvdGFsICkgKiAxMDAgKSA6IDAgKSBcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcblxuICAgICAgICAgICAgICAgIHJlcS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgWyA1MDAsIDQwNCwgNDAxIF0uaW5jbHVkZXMoIHRoaXMuc3RhdHVzIClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcmVqZWN0KCB0aGlzLnJlc3BvbnNlID8gSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZSApIDogdGhpcy5zdGF0dXMgKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiByZXNvbHZlKCBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlICkgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGEubWV0aG9kID0gZGF0YS5tZXRob2QgfHwgXCJnZXRcIlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGAvJHtkYXRhLnJlc291cmNlfWAgKyAoIGRhdGEuaWQgPyBgLyR7ZGF0YS5pZH1gIDogJycgKVxuICAgICAgICAgICAgICAgIGlmKCBkYXRhLm1ldGhvZCA9PT0gXCJnZXRcIiB8fCBkYXRhLm1ldGhvZCA9PT0gXCJvcHRpb25zXCIgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBxcyA9IGRhdGEucXMgPyBgPyR7d2luZG93LmVuY29kZVVSSUNvbXBvbmVudCggZGF0YS5xcyApfWAgOiAnJyBcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9wZW4oIGRhdGEubWV0aG9kLCBgJHtwYXRofSR7cXN9YCApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVhZGVycyggcmVxLCBkYXRhLmhlYWRlcnMgKVxuICAgICAgICAgICAgICAgICAgICByZXEuc2VuZChudWxsKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vcGVuKCBkYXRhLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBwYXRoLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEhlYWRlcnMoIHJlcSwgZGF0YS5oZWFkZXJzIClcbiAgICAgICAgICAgICAgICAgICAgcmVxLnNlbmQoIGRhdGEuZGF0YSB8fCBudWxsIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiggZGF0YS5vblByb2dyZXNzICkgZGF0YS5vblByb2dyZXNzKCAnc2VudCcgKVxuICAgICAgICAgICAgfSApXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0SGVhZGVycyggcmVxLCBoZWFkZXJzPXt9ICkge1xuICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoIFwiQWNjZXB0XCIsIGhlYWRlcnMuYWNjZXB0IHx8ICdhcHBsaWNhdGlvbi9qc29uJyApXG4gICAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlciggXCJDb250ZW50LVR5cGVcIiwgaGVhZGVycy5jb250ZW50VHlwZSB8fCAndGV4dC9wbGFpbicgKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9mYWN0b3J5KCBkYXRhICkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSggdGhpcy5SZXF1ZXN0LCB7IH0gKS5jb25zdHJ1Y3RvciggZGF0YSApXG4gICAgfSxcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIGlmKCAhWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLnNlbmRBc0JpbmFyeSApIHtcbiAgICAgICAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZEFzQmluYXJ5ID0gZnVuY3Rpb24oc0RhdGEpIHtcbiAgICAgICAgICAgIHZhciBuQnl0ZXMgPSBzRGF0YS5sZW5ndGgsIHVpOERhdGEgPSBuZXcgVWludDhBcnJheShuQnl0ZXMpO1xuICAgICAgICAgICAgZm9yICh2YXIgbklkeCA9IDA7IG5JZHggPCBuQnl0ZXM7IG5JZHgrKykge1xuICAgICAgICAgICAgICB1aThEYXRhW25JZHhdID0gc0RhdGEuY2hhckNvZGVBdChuSWR4KSAmIDB4ZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbmQodWk4RGF0YSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5LmJpbmQodGhpcylcbiAgICB9XG5cbn0gKSwgeyB9ICkuY29uc3RydWN0b3IoKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHRoaXMucmFuZ2Uuc2VsZWN0Tm9kZShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpdlwiKS5pdGVtKDApKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBjcmVhdGUoIG5hbWUsIG9wdHMgKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyID0gbmFtZVxuICAgICAgICBuYW1lID0gKCBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSApLnJlcGxhY2UoICctJywgJycgKVxuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKFxuICAgICAgICAgICAgdGhpcy5WaWV3c1sgbmFtZSBdLFxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbigge1xuICAgICAgICAgICAgICAgIEhlYWRlcjogeyB2YWx1ZTogdGhpcy5IZWFkZXIgfSxcbiAgICAgICAgICAgICAgICBUb2FzdDogeyB2YWx1ZTogdGhpcy5Ub2FzdCB9LFxuICAgICAgICAgICAgICAgIG5hbWU6IHsgdmFsdWU6IG5hbWUgfSxcbiAgICAgICAgICAgICAgICBmYWN0b3J5OiB7IHZhbHVlOiB0aGlzIH0sXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHsgdmFsdWU6IHRoaXMucmFuZ2UgfSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogeyB2YWx1ZTogdGhpcy5UZW1wbGF0ZXNbIG5hbWUgXSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBtb2RlbDogeyB2YWx1ZTogdGhpcy5Nb2RlbHNbbmFtZV0gPyBPYmplY3QuY3JlYXRlKCB0aGlzLk1vZGVsc1sgbmFtZSBdICkgOiB7fSB9LFxuICAgICAgICAgICAgICAgIHVzZXI6IHsgdmFsdWU6IHRoaXMuVXNlciB9XG4gICAgICAgICAgICB9IClcbiAgICAgICAgKS5jb25zdHJ1Y3Rvciggb3B0cyApXG4gICAgfSxcblxufSwge1xuICAgIEhlYWRlcjogeyB2YWx1ZTogcmVxdWlyZSgnLi4vdmlld3MvSGVhZGVyJykgfSxcbiAgICBNb2RlbHM6IHsgdmFsdWU6IHJlcXVpcmUoJy4uLy5Nb2RlbE1hcCcpIH0sXG4gICAgVGVtcGxhdGVzOiB7IHZhbHVlOiByZXF1aXJlKCcuLi8uVGVtcGxhdGVNYXAnKSB9LFxuICAgIFRvYXN0OiB7IHZhbHVlOiByZXF1aXJlKCcuLi92aWV3cy9Ub2FzdCcpIH0sXG4gICAgVXNlcjogeyB2YWx1ZTogcmVxdWlyZSgnLi4vbW9kZWxzL1VzZXInKSB9LFxuICAgIFZpZXdzOiB7IHZhbHVlOiByZXF1aXJlKCcuLi8uVmlld01hcCcpIH1cbn0gKVxuIiwicmVxdWlyZSgnLi9wb2x5ZmlsbCcpXG5cbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL21vZGVscy9Vc2VyJyksXG4gICAgcm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKSxcbiAgICBvbkxvYWQgPSBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiB3aW5kb3cub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpIClcblxuVXNlci5vbiggJ2xvZ291dCcsICgpID0+IHJvdXRlci5vbkxvZ291dCgpIClcblxuUHJvbWlzZS5hbGwoIFsgVXNlci5nZXQoKSwgb25Mb2FkIF0gKVxuLnRoZW4oICgpID0+IHJvdXRlci5pbml0aWFsaXplKCkgKVxuLmNhdGNoKCBlID0+IGNvbnNvbGUubG9nKCBgRXJyb3IgaW5pdGlhbGl6aW5nIGNsaWVudCAtPiAke2Uuc3RhY2sgfHwgZX1gICkgKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXy5qcycpLCB7XG4gICAgZGF0YTogW1xuICAgICAgICAnYWJvdXQgdXMnLFxuICAgICAgICAnd2hlcmUgdG8gZmluZCB1cycsXG4gICAgICAgICdmdXR1cmUgZGF5cyBmYXJtJyxcbiAgICAgICAgJ3RoZSBibG9nJyxcbiAgICAgICAgJ291ciBvZmZlcmluZ3MnXG4gICAgXVxufSlcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fLmpzJyksIHtcblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgICAgIHJldHVybiBCb29sZWFuKCB0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmlkICkgIFxuICAgIH0sXG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGBoenk9OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UO2BcblxuICAgICAgICB0aGlzLmRhdGEgPSB7IH1cbiAgICAgICAgdGhpcy5lbWl0KCdsb2dvdXQnKVxuICAgIH0sXG5cbn0gKSwgeyByZXNvdXJjZTogeyB2YWx1ZTogJ21lJyB9IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7IH0sIHJlcXVpcmUoJy4uLy4uLy4uL2xpYi9Nb2RlbCcpLCByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG5cbiAgICBYaHI6IHJlcXVpcmUoJy4uL1hocicpLFxuXG4gICAgYWRkKCBkYXR1bSApIHtcbiAgICAgICAgdGhpcy5kYXRhLnB1c2goIGRhdHVtIClcblxuICAgICAgICBpZiggdGhpcy5zdG9yZUJ5ICkgdGhpcy5fc3RvcmVPbmUoIGRhdHVtIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gdGhpcy5kYXRhWyB0aGlzLm1ldGEua2V5IF1cbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ0RFTEVURScsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBpZDoga2V5VmFsdWUgfSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLm1ldGEua2V5XG5cbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXR1bSA9IHRoaXMuZGF0YS5maW5kKCBkYXR1bSA9PiBkYXR1bVsga2V5IF0gPT0ga2V5VmFsdWUgKVxuXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RvcmUgKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKCB0aGlzLnN0b3JlICkuZm9yRWFjaCggYXR0ciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXSA9IHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdLmZpbHRlciggZGF0dW0gPT4gZGF0dW1bIGtleSBdICE9IGtleVZhbHVlIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXS5sZW5ndGggPT09IDAgKSB7IHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdID0gdW5kZWZpbmVkIH1cbiAgICAgICAgICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlciggZGF0dW0gPT4gZGF0dW1bIGtleSBdICE9IGtleVZhbHVlIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5kYXRhIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGdpdCggYXR0ciApIHsgcmV0dXJuIHRoaXMuZGF0YVsgYXR0ciBdIH0sXG5cbiAgICBnZXQoIG9wdHM9eyBxdWVyeTp7fSB9ICkge1xuICAgICAgICBpZiggb3B0cy5xdWVyeSB8fCB0aGlzLnBhZ2luYXRpb24gKSBPYmplY3QuYXNzaWduKCBvcHRzLnF1ZXJ5LCB0aGlzLnBhZ2luYXRpb24gKVxuXG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6IG9wdHMubWV0aG9kIHx8ICdnZXQnLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaGVhZGVyczogdGhpcy5oZWFkZXJzIHx8IHt9LCBxczogb3B0cy5xdWVyeSA/IEpTT04uc3RyaW5naWZ5KCBvcHRzLnF1ZXJ5ICkgOiB1bmRlZmluZWQgfSApXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuY29uY2F0KCBvcHRzLnBhcnNlID8gb3B0cy5wYXJzZSggcmVzcG9uc2UsIG9wdHMuc3RvcmVCeSApIDogcmVzcG9uc2UgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiggb3B0cy5zdG9yZUJ5ICkgdGhpcy5fcmVzZXRTdG9yZSggb3B0cy5zdG9yZUJ5IClcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLnBhcnNlID8gdGhpcy5wYXJzZSggcmVzcG9uc2UsIG9wdHMuc3RvcmVCeSApIDogcmVzcG9uc2VcbiAgICAgICAgICAgICAgICBpZiggb3B0cy5zdG9yZUJ5ICkgdGhpcy5fc3RvcmUoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2dvdCcpXG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3BvbnNlIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGdldENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAnZ2V0JywgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgcXM6IEpTT04uc3RyaW5naWZ5KCB7IGNvdW50T25seTogdHJ1ZSB9ICkgfSApXG4gICAgICAgIC50aGVuKCAoIHsgcmVzdWx0IH0gKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1ldGEuY291bnQgPSByZXN1bHRcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3VsdCApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBnaXQoIGF0dHIgKSB7IHJldHVybiB0aGlzLmRhdGFbIGF0dHIgXSB9LFxuXG4gICAgcGF0Y2goIGlkLCBkYXRhICkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAncGF0Y2gnLCBpZCwgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgZGF0YTogSlNPTi5zdHJpbmdpZnkoIGRhdGEgfHwgdGhpcy5kYXRhICkgfSApXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgPyB0aGlzLmRhdGEuY29uY2F0KCByZXNwb25zZSApIDogWyByZXNwb25zZSBdXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RvcmUgKSBPYmplY3Qua2V5cyggdGhpcy5zdG9yZSApLmZvckVhY2goIGF0dHIgPT4gdGhpcy5fc3RvcmUoIHJlc3BvbnNlLCBhdHRyICkgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNwb25zZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXNwb25zZSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBfcHV0KCBrZXlWYWx1ZSwgZGF0YSApIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmRhdGEuZmluZCggZGF0dW0gPT4gZGF0dW1bIHRoaXMubWV0YS5rZXkgXSA9PSBrZXlWYWx1ZSApO1xuICAgICAgICBpZiggaXRlbSApIGl0ZW0gPSBkYXRhO1xuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBwdXQoIGlkLCBkYXRhICkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAncHV0JywgaWQsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIGRhdGE6IEpTT04uc3RyaW5naWZ5KCBkYXRhICkgfSApXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkgeyBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzcG9uc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzcG9uc2UgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgcG9zdCggbW9kZWwgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6ICdwb3N0JywgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgZGF0YTogSlNPTi5zdHJpbmdpZnkoIG1vZGVsIHx8IHRoaXMuZGF0YSApIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YSA/IHRoaXMuZGF0YS5jb25jYXQoIHJlc3BvbnNlICkgOiBbIHJlc3BvbnNlIF1cbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdG9yZSApIE9iamVjdC5rZXlzKCB0aGlzLnN0b3JlICkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLl9zdG9yZSggcmVzcG9uc2UsIGF0dHIgKSApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3BvbnNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3BvbnNlIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIHJlbW92ZSggaXRlbSApIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGEuZmluZEluZGV4KCBkYXR1bSA9PiBKU09OLnN0cmluZ2lmeSggZGF0dW0gKSA9PT0gSlNPTi5zdHJpbmdpZnkoIGl0ZW0gKSApXG5cbiAgICAgICAgaWYoIGluZGV4ID09PSAtMSApIHJldHVyblxuXG4gICAgICAgIHRoaXMuZGF0YS5zcGxpY2UoIGluZGV4LCAxIClcbiAgICB9LFxuXG4gICAgc2V0KCBhdHRyLCB2YWx1ZSApIHtcbiAgICAgICAgdGhpcy5kYXRhWyBhdHRyIF0gPSB2YWx1ZVxuICAgICAgICB0aGlzLmVtaXQoIGAke2F0dHJ9Q2hhbmdlZGAgKVxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZSggZGF0YSApIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZVxuICAgICAgIFxuICAgICAgICBPYmplY3Qua2V5cyggZGF0YSApLmZvckVhY2goIG5hbWUgPT4geyBcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGRhdGFbIG5hbWUgXSxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnV0ZXMuZmluZCggYXR0ciA9PiBhdHRyLm5hbWUgPT09IG5hbWUgKSAgIFxuICAgIFxuICAgICAgICAgICAgaWYoIGF0dHJpYnV0ZSA9PT0gdW5kZWZpbmVkIHx8ICFhdHRyaWJ1dGUudmFsaWRhdGUgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWyBuYW1lIF0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgPyB0eXBlb2YgdmFsID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgID8gdmFsLnRyaW0oKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICA6IHZhbFxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSBlbHNlIGlmKCB2YWxpZCAmJiAhdGhpcy52YWxpZGF0ZURhdHVtKCBhdHRyaWJ1dGUsIHZhbCApICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCggJ3ZhbGlkYXRpb25FcnJvcicsIGF0dHJpYnV0ZSApXG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZVxuICAgICAgICAgICAgfSBlbHNlIGlmKCB0aGlzLnZhbGlkYXRlRGF0dW0oIGF0dHJpYnV0ZSwgdmFsICkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWyBuYW1lIF0gPSB2YWwudHJpbSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKVxuXG4gICAgICAgIHJldHVybiB2YWxpZFxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZURhdHVtKCBhdHRyLCB2YWwgKSB7XG4gICAgICAgIHJldHVybiBhdHRyLnZhbGlkYXRlLmNhbGwoIHRoaXMsIHZhbC50cmltKCkgKVxuICAgIH1cblxufSApXG4iLCJpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT0gJ2Z1bmN0aW9uJykge1xuICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCB2YXJBcmdzKSB7IC8vIC5sZW5ndGggb2YgZnVuY3Rpb24gaXMgMlxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICB9XG5cbiAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG5cbiAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gbmV4dFNvdXJjZSkge1xuICAgICAgICAgIC8vIEF2b2lkIGJ1Z3Mgd2hlbiBoYXNPd25Qcm9wZXJ0eSBpcyBzaGFkb3dlZFxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvO1xuICB9O1xufVxuXG4vL2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2Nsb3Nlc3RcbmlmICh3aW5kb3cuRWxlbWVudCAmJiAhRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBcbiAgICBmdW5jdGlvbihzKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHMpLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGVsID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaSA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWwpIHt9O1xuICAgICAgICB9IHdoaWxlICgoaSA8IDApICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpKTsgXG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xufVxuXG4vL2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxXG5jb25zdCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQb2x5ZmlsbCA9ICgoKSA9PiB7XG4gICAgbGV0IGNsb2NrID0gRGF0ZS5ub3coKTtcblxuICAgIHJldHVybiAoY2FsbGJhY2spID0+IHtcblxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIC0gY2xvY2sgPiAxNikge1xuICAgICAgICAgICAgY2xvY2sgPSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnRUaW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvbHlmaWxsKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVQb2x5ZmlsbFxuXG5yZXF1aXJlKCdzbW9vdGhzY3JvbGwtcG9seWZpbGwnKS5wb2x5ZmlsbCgpXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHRydWVcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4uLy4uL2xpYi9NeU9iamVjdCcpLCB7XG4gICAgXG4gICAgVmlld0ZhY3Rvcnk6IHJlcXVpcmUoJy4vZmFjdG9yeS9WaWV3JyksXG4gICAgXG4gICAgVmlld3M6IHJlcXVpcmUoJy4vLlZpZXdNYXAnKSxcblxuICAgIFNpbmdsZXRvbnM6IFsgJ0hlYWRlcicgXSxcblxuICAgIGluaXRpYWxpemUoKSB7XG5cbiAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKVxuXG4gICAgICAgIHRoaXMuVmlld0ZhY3RvcnkuY29uc3RydWN0b3IoKTtcblxuICAgICAgICB0aGlzLlNpbmdsZXRvbnMuZm9yRWFjaCggbmFtZSA9PiB0aGlzLlZpZXdzW25hbWVdLmNvbnN0cnVjdG9yKCB7IGZhY3Rvcnk6IHRoaXMuVmlld0ZhY3RvcnkgfSApIClcblxuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IHRoaXMuaGFuZGxlLmJpbmQodGhpcylcblxuICAgICAgICB0aGlzLlZpZXdzLkhlYWRlci5vbiggJ25hdmlnYXRlJywgcm91dGUgPT4gdGhpcy5uYXZpZ2F0ZSggcm91dGUgKSApXG5cbiAgICAgICAgdGhpcy5mb290ZXIgPSB0aGlzLlZpZXdGYWN0b3J5LmNyZWF0ZSggJ2Zvb3RlcicsIHsgaW5zZXJ0aW9uOiB7IGVsOiBkb2N1bWVudC5ib2R5IH0gfSApXG5cbiAgICAgICAgdGhpcy5oYW5kbGUoKVxuICAgIH0sXG5cbiAgICBoYW5kbGUoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlciggd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykuc2xpY2UoMSkgKVxuICAgIH0sXG5cbiAgICBoYW5kbGVyKCBwYXRoICkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5wYXRoVG9WaWV3KCBwYXRoWzBdICksXG4gICAgICAgICAgICB2aWV3ID0gdGhpcy5WaWV3c1sgbmFtZSBdID8gbmFtZSA6ICdob21lJ1xuXG4gICAgICAgIGlmKCB2aWV3ID09PSB0aGlzLmN1cnJlbnRWaWV3ICkgcmV0dXJuIHRoaXMudmlld3NbIHZpZXcgXS5vbk5hdmlnYXRpb24oIHBhdGguc2xpY2UoMSkgKVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKVxuXG4gICAgICAgIFByb21pc2UuYWxsKCBPYmplY3Qua2V5cyggdGhpcy52aWV3cyApLm1hcCggdmlldyA9PiB0aGlzLnZpZXdzWyB2aWV3IF0uaGlkZSgpICkgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdmlld1xuXG4gICAgICAgICAgICBpZiggdGhpcy52aWV3c1sgdmlldyBdICkgcmV0dXJuIHRoaXMudmlld3NbIHZpZXcgXS5vbk5hdmlnYXRpb24oIHBhdGggKVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAgICAgIHRoaXMudmlld3NbIHZpZXcgXSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVmlld0ZhY3RvcnkuY3JlYXRlKCB2aWV3LCB7IGluc2VydGlvbjogeyBlbDogdGhpcy5jb250ZW50Q29udGFpbmVyIH0sIHBhdGggfSApXG4gICAgICAgICAgICAgICAgICAgIC5vbiggJ25hdmlnYXRlJywgKCByb3V0ZSwgb3B0aW9ucyApID0+IHRoaXMubmF2aWdhdGUoIHJvdXRlLCBvcHRpb25zICkgKVxuICAgICAgICAgICAgICAgICAgICAub24oICdkZWxldGVkJywgKCkgPT4gZGVsZXRlIHRoaXMudmlld3NbIHZpZXcgXSApXG4gICAgICAgICAgICApXG4gICAgICAgIH0gKVxuICAgICAgICAuY2F0Y2goIHRoaXMuRXJyb3IgKVxuICAgICAgIFxuICAgICAgICB0aGlzLmZvb3Rlci5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoICdoaWRkZW4nLCB2aWV3ID09PSAnQWRtaW4nIClcbiAgICB9LFxuXG4gICAgbmF2aWdhdGUoIGxvY2F0aW9uLCBvcHRpb25zPXt9ICkge1xuICAgICAgICBpZiggb3B0aW9ucy5yZXBsYWNlIHx8IG9wdGlvbnMudXAgKSB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX1gLnNwbGl0KCcvJylcbiAgICAgICAgICAgIHBhdGgucG9wKClcbiAgICAgICAgICAgIGlmKCBvcHRpb25zLnJlcGxhY2UgKSBwYXRoLnB1c2goIGxvY2F0aW9uIClcbiAgICAgICAgICAgIGxvY2F0aW9uID0gcGF0aC5qb2luKCcvJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKCBvcHRpb25zLmFwcGVuZCApIHsgbG9jYXRpb24gPSBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9LyR7bG9jYXRpb259YCB9XG5cbiAgICAgICAgaWYoIGxvY2F0aW9uICE9PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKSBoaXN0b3J5LnB1c2hTdGF0ZSgge30sICcnLCBsb2NhdGlvbiApXG4gICAgICAgIGlmKCAhb3B0aW9ucy5zaWxlbnQgKSB0aGlzLmhhbmRsZSgpXG4gICAgfSxcblxuICAgIG9uTG9nb3V0KCkge1xuICAgICAgICBQcm9taXNlLmFsbCggT2JqZWN0LmtleXMoIHRoaXMudmlld3MgKS5tYXAoIHZpZXcgPT4gdGhpcy52aWV3c1sgdmlldyBdLmRlbGV0ZSgpICkgKVxuICAgICAgICAudGhlbiggKCkgPT4geyB0aGlzLmN1cnJlbnRWaWV3ID0gdW5kZWZpbmVkOyByZXR1cm4gdGhpcy5oYW5kbGUoKSB9IClcbiAgICAgICAgLmNhdGNoKCB0aGlzLkVycm9yIClcbiAgICB9LFxuXG4gICAgcGF0aFRvVmlldyggcGF0aCApIHtcbiAgICAgICAgY29uc3QgaHlwaGVuU3BsaXQgPSBwYXRoLnNwbGl0KCctJylcbiAgICAgICAgcmV0dXJuIGh5cGhlblNwbGl0Lm1hcCggaXRlbSA9PiB0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlciggaXRlbSApICkuam9pbignJylcbiAgICB9LFxuXG4gICAgc2Nyb2xsVG9Ub3AoKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGwoIHsgdG9wOiAwLCBsZWZ0OiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSApXG4gICAgfVxuXG59ICksIHsgY3VycmVudFZpZXc6IHsgdmFsdWU6ICcnLCB3cml0YWJsZTogdHJ1ZSB9LCB2aWV3czogeyB2YWx1ZTogeyB9IH0gfSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHt9KVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18nKSwge1xuXG4gICAgcG9zdFJlbmRlcigpIHsgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9Gb290ZXInKVxuXG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHtcblxuICAgIFVzZXI6IHJlcXVpcmUoJy4uL21vZGVscy9Vc2VyJyksXG5cbiAgICBldmVudHM6IHtcbiAgICAgICAgbmF2TGlzdDogJ2NsaWNrJ1xuICAgIH0sXG5cbiAgICBpbnNlcnRpb24oKSB7IHJldHVybiB7IGVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpLCBtZXRob2Q6ICdpbnNlcnRCZWZvcmUnIH0gfSxcblxuICAgIG1vZGVsOiByZXF1aXJlKCcuLi9tb2RlbHMvSGVhZGVyJyksXG5cbiAgICBuYW1lOiAnSGVhZGVyJyxcbiAgICBvbk5hdkxpc3RDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLmVtaXQoJ25hdmlnYXRlJywgYC8keyBldmVudC50YXJnZXQudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzKy9nLCAnJykgfWApXG4gICAgICAgIHZhciBoZWFkZXJzID0gWy4uLmV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuXS5mb3JFYWNoKGhlYWRlciA9PiBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSlcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICB9LFxuXG4gICAgb25Mb2dvdXRDbGljaygpIHtcbiAgICAgICAgdGhpcy5Vc2VyLmxvZ291dCgpXG4gICAgfSxcblxuICAgIG9uVXNlckxvZ2luKCkge1xuICAgICAgICB0aGlzLmVscy5wcm9maWxlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpICAgICAgICBcbiAgICAgICAgdGhpcy5lbHMubmFtZS50ZXh0Q29udGVudCA9IHRoaXMuVXNlci5kYXRhLm5hbWUgfHwgdGhpcy5Vc2VyLmRhdGEuZW1haWxcbiAgICB9LFxuXG4gICAgb25Vc2VyTG9nb3V0KCkge1xuICAgICAgICB0aGlzLmVscy5wcm9maWxlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpICAgICAgICBcbiAgICAgICAgdGhpcy5lbHMubmFtZS50ZXh0Q29udGVudCA9ICcnXG4gICAgfSxcblxuICAgIHBvc3RSZW5kZXIoKSB7XG5cbiAgICAgICAgaWYoIHRoaXMuVXNlci5pc0xvZ2dlZEluKCkgKSB0aGlzLm9uVXNlckxvZ2luKClcblxuICAgICAgICB0aGlzLlVzZXIub24oICdnb3QnLCAoKSA9PiB7IGlmKCB0aGlzLlVzZXIuaXNMb2dnZWRJbigpICkgdGhpcy5vblVzZXJMb2dpbigpIH0gKVxuICAgICAgICB0aGlzLlVzZXIub24oICdsb2dvdXQnLCAoKSA9PiB0aGlzLm9uVXNlckxvZ291dCgpIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL0hlYWRlcicpXG5cbn0gKSwgeyB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHsgfSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHt9KVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXycpLCB7fSlcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18nKSwge30pIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7IH0sIHJlcXVpcmUoJy4uLy4uLy4uL2xpYi9NeU9iamVjdCcpLCByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG5cbiAgICAkKCBlbCwgc2VsZWN0b3IgKSB7IHJldHVybiBBcnJheS5mcm9tKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApICkgfSxcblxuICAgIFRlbXBsYXRlQ29udGV4dDogcmVxdWlyZSgnLi4vVGVtcGxhdGVDb250ZXh0JyksXG5cbiAgICBNb2RlbDogcmVxdWlyZSgnLi4vbW9kZWxzL19fcHJvdG9fXycpLFxuXG4gICAgT3B0aW1pemVkUmVzaXplOiByZXF1aXJlKCcuL2xpYi9PcHRpbWl6ZWRSZXNpemUnKSxcbiAgICBcbiAgICBYaHI6IHJlcXVpcmUoJy4uL1hocicpLFxuXG4gICAgYmluZEV2ZW50KCBrZXksIGV2ZW50LCBlbCApIHtcbiAgICAgICAgY29uc3QgZWxzID0gZWwgPyBbIGVsIF0gOiBBcnJheS5pc0FycmF5KCB0aGlzLmVsc1sga2V5IF0gKSA/IHRoaXMuZWxzWyBrZXkgXSA6IFsgdGhpcy5lbHNbIGtleSBdIF0sXG4gICAgICAgICAgIG5hbWUgPSB0aGlzLmdldEV2ZW50TWV0aG9kTmFtZSgga2V5LCBldmVudCApXG5cbiAgICAgICAgaWYoICF0aGlzWyBgXyR7bmFtZX1gIF0gKSB0aGlzWyBgXyR7bmFtZX1gIF0gPSBlID0+IHRoaXNbIG5hbWUgXShlKVxuXG4gICAgICAgIGVscy5mb3JFYWNoKCBlbCA9PiBlbC5hZGRFdmVudExpc3RlbmVyKCBldmVudCB8fCAnY2xpY2snLCB0aGlzWyBgXyR7bmFtZX1gIF0gKSApXG4gICAgfSxcblxuICAgIGNvbnN0cnVjdG9yKCBvcHRzPXt9ICkge1xuXG4gICAgICAgIGlmKCBvcHRzLmV2ZW50cyApIHsgT2JqZWN0LmFzc2lnbiggdGhpcy5ldmVudHMsIG9wdHMuZXZlbnRzICk7IGRlbGV0ZSBvcHRzLmV2ZW50czsgfVxuICAgICAgICBPYmplY3QuYXNzaWduKCB0aGlzLCBvcHRzIClcblxuICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cyA9IFsgXVxuXG4gICAgICAgIGlmKCB0aGlzLnJlcXVpcmVzTG9naW4gJiYgKCAhdGhpcy51c2VyLmlzTG9nZ2VkSW4oKSApICkgcmV0dXJuIHRoaXMuaGFuZGxlTG9naW4oKVxuICAgICAgICBpZiggdGhpcy51c2VyICYmICF0aGlzLmlzQWxsb3dlZCggdGhpcy51c2VyICkgKSByZXR1cm4gdGhpcy5zY29vdEF3YXkoKVxuXG4gICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxpemUoKS5yZW5kZXIoKVxuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZUV2ZW50cygga2V5LCBlbCApIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdGhpcy5ldmVudHNba2V5XVxuXG4gICAgICAgIGlmKCB0eXBlID09PSBcInN0cmluZ1wiICkgeyB0aGlzLmJpbmRFdmVudCgga2V5LCB0aGlzLmV2ZW50c1trZXldLCBlbCApIH1cbiAgICAgICAgZWxzZSBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5ldmVudHNba2V5XSApICkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbIGtleSBdLmZvckVhY2goIGV2ZW50T2JqID0+IHRoaXMuYmluZEV2ZW50KCBrZXksIGV2ZW50T2JqICkgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnQoIGtleSwgdGhpcy5ldmVudHNba2V5XS5ldmVudCApXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVsZXRlKCB7IHNpbGVudCB9ID0geyBzaWxlbnQ6IGZhbHNlIH0gKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGUoKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbHMuY29udGFpbmVyLFxuICAgICAgICAgICAgICAgIHBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnROb2RlXG4gICAgICAgICAgICBpZiggY29udGFpbmVyICYmIHBhcmVudCApIHBhcmVudC5yZW1vdmVDaGlsZCggY29udGFpbmVyIClcbiAgICAgICAgICAgIGlmKCAhc2lsZW50ICkgdGhpcy5lbWl0KCdkZWxldGVkJylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgZXZlbnRzOiB7fSxcblxuICAgIGZhZGVJbkltYWdlKCBlbCApIHtcbiAgICAgICAgZWwub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCAnaW1nTG9hZGVkJywgZWwgKVxuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpXG4gICAgICAgIH1cblxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoICdzcmMnLCBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgKVxuICAgIH0sXG5cbiAgICBnZXRFdmVudE1ldGhvZE5hbWUoIGtleSwgZXZlbnQgKSB7IHJldHVybiBgb24ke3RoaXMuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGtleSl9JHt0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihldmVudCl9YCB9LFxuXG4gICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gdGhpcy5lbHMuY29udGFpbmVyIH0sXG5cbiAgICBnZXRUZW1wbGF0ZU9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHJ2ID0gT2JqZWN0LmFzc2lnbiggdGhpcy51c2VyID8geyB1c2VyOiB0aGlzLnVzZXIuZGF0YSB9IDoge30gKVxuXG4gICAgICAgIGlmKCB0aGlzLm1vZGVsICkge1xuICAgICAgICAgICAgcnYubW9kZWwgPSB0aGlzLm1vZGVsLmRhdGFcblxuICAgICAgICAgICAgaWYoIHRoaXMubW9kZWwubWV0YSApIHJ2Lm1ldGEgPSB0aGlzLm1vZGVsLm1ldGFcbiAgICAgICAgICAgIGlmKCB0aGlzLm1vZGVsLmF0dHJpYnV0ZXMgKSBydi5hdHRyaWJ1dGVzID0gdGhpcy5tb2RlbC5hdHRyaWJ1dGVzXG4gICAgICAgIH1cblxuICAgICAgICBpZiggdGhpcy50ZW1wbGF0ZU9wdGlvbnMgKSBydi5vcHRzID0gdHlwZW9mIHRoaXMudGVtcGxhdGVPcHRpb25zID09PSAnZnVuY3Rpb24nID8gdGhpcy50ZW1wbGF0ZU9wdGlvbnMoKSA6IHRoaXMudGVtcGxhdGVPcHRpb25zIHx8IHt9XG5cbiAgICAgICAgcmV0dXJuIHJ2XG4gICAgfSxcblxuICAgIGhhbmRsZUxvZ2luKCkge1xuICAgICAgICB0aGlzLmZhY3RvcnkuY3JlYXRlKCAnbG9naW4nLCB7IGluc2VydGlvbjogeyBlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKSB9IH0gKVxuICAgICAgICAub24oIFwibG9nZ2VkSW5cIiwgKCkgPT4gdGhpcy5vbkxvZ2luKCkgKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIGhpZGUoIGlzU2xvdyApIHtcbiAgICAgICAgLy92aWV3cyBub3QgaGlkaW5nIGNvbnNpc3RlbnRseSB3aXRoIHRoaXNcbiAgICAgICAgLy9pZiggIXRoaXMuZWxzIHx8IHRoaXMuaXNIaWRpbmcgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICB0aGlzLmlzSGlkaW5nID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZUVsKCB0aGlzLmVscy5jb250YWluZXIsIGlzU2xvdyApXG4gICAgICAgIC50aGVuKCAoKSA9PiBQcm9taXNlLnJlc29sdmUoIHRoaXMuaGlkaW5nID0gZmFsc2UgKSApXG4gICAgfSxcbiAgICBcbiAgICBoaWRlU3luYygpIHsgdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyByZXR1cm4gdGhpcyB9LFxuXG4gICAgX2hpZGVFbCggZWwsIHJlc29sdmUsIGhhc2gsIGlzU2xvdyApIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2FuaW1hdGlvbmVuZCcsIHRoaXNbIGhhc2ggXSApXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYGFuaW1hdGUtb3V0JHsgaXNTbG93ID8gJy1zbG93JyA6ICcnfWApXG4gICAgICAgIGRlbGV0ZSB0aGlzW2hhc2hdXG4gICAgICAgIHRoaXMuaXNIaWRpbmcgPSBmYWxzZVxuICAgICAgICByZXNvbHZlKClcbiAgICB9LFxuXG4gICAgaGlkZUVsKCBlbCwgaXNTbG93ICkge1xuICAgICAgICBpZiggdGhpcy5pc0hpZGRlbiggZWwgKSApIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIGhhc2ggPSBgJHt0aW1lfUhpZGVgXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpc1sgaGFzaCBdID0gZSA9PiB0aGlzLl9oaWRlRWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKVxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lciggJ2FuaW1hdGlvbmVuZCcsIHRoaXNbIGhhc2ggXSApXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGBhbmltYXRlLW91dCR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgaHRtbFRvRnJhZ21lbnQoIHN0ciApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjdG9yeS5yYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoIHN0ciApXG4gICAgfSxcblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKCB0aGlzLCB7IGVsczogeyB9LCBzbHVycDogeyBhdHRyOiAnZGF0YS1qcycsIHZpZXc6ICdkYXRhLXZpZXcnLCBuYW1lOiAnZGF0YS1uYW1lJywgaW1nOiAnZGF0YS1zcmMnIH0sIHZpZXdzOiB7IH0gfSApXG4gICAgfSxcblxuICAgIGluc2VydFRvRG9tKCBmcmFnbWVudCwgb3B0aW9ucyApIHtcbiAgICAgICAgY29uc3QgaW5zZXJ0aW9uID0gdHlwZW9mIG9wdGlvbnMuaW5zZXJ0aW9uID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5pbnNlcnRpb24oKSA6IG9wdGlvbnMuaW5zZXJ0aW9uO1xuXG4gICAgICAgIGluc2VydGlvbi5tZXRob2QgPT09ICdpbnNlcnRCZWZvcmUnXG4gICAgICAgICAgICA/IGluc2VydGlvbi5lbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZnJhZ21lbnQsIGluc2VydGlvbi5lbCApXG4gICAgICAgICAgICA6IGluc2VydGlvbi5lbFsgaW5zZXJ0aW9uLm1ldGhvZCB8fCAnYXBwZW5kQ2hpbGQnIF0oIGZyYWdtZW50IClcbiAgICB9LFxuXG4gICAgaXNBbGxvd2VkKCB1c2VyICkge1xuICAgICAgICBpZiggIXRoaXMucmVxdWlyZXNSb2xlICkgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIFxuICAgICAgICBjb25zdCB1c2VyUm9sZXMgPSBuZXcgU2V0KCB1c2VyLmRhdGEucm9sZXMgKVxuXG4gICAgICAgIGlmKCB0eXBlb2YgdGhpcy5yZXF1aXJlc1JvbGUgPT09ICdzdHJpbmcnICkgcmV0dXJuIHVzZXJSb2xlcy5oYXMoIHRoaXMucmVxdWlyZXNSb2xlIClcblxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5yZXF1aXJlc1JvbGUgKSApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucmVxdWlyZXNSb2xlLmZpbmQoIHJvbGUgPT4gdXNlclJvbGVzLmhhcyggcm9sZSApIClcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICAgIFxuICAgIGlzSGlkZGVuKCBlbCApIHsgcmV0dXJuIGVsID8gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSA6IHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpIH0sXG5cbiAgICBvbkxvZ2luKCkge1xuXG4gICAgICAgIGlmKCAhdGhpcy5pc0FsbG93ZWQoIHRoaXMudXNlciApICkgcmV0dXJuIHRoaXMuc2Nvb3RBd2F5KClcblxuICAgICAgICB0aGlzLmluaXRpYWxpemUoKS5yZW5kZXIoKVxuICAgIH0sXG5cbiAgICBvbk5hdmlnYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3coKVxuICAgIH0sXG5cbiAgICBzaG93Tm9BY2Nlc3MoKSB7XG4gICAgICAgIGFsZXJ0KFwiTm8gcHJpdmlsZWdlcywgc29uXCIpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHBvc3RSZW5kZXIoKSB7IHJldHVybiB0aGlzIH0sXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmKCB0aGlzLmRhdGEgKSB0aGlzLm1vZGVsID0gT2JqZWN0LmNyZWF0ZSggdGhpcy5Nb2RlbCwgeyB9ICkuY29uc3RydWN0b3IoIHRoaXMuZGF0YSApXG5cbiAgICAgICAgdGhpcy5zbHVycFRlbXBsYXRlKCB7XG4gICAgICAgICAgICBpbnNlcnRpb246IHRoaXMuaW5zZXJ0aW9uIHx8IHsgZWw6IGRvY3VtZW50LmJvZHkgfSxcbiAgICAgICAgICAgIGlzVmlldzogdHJ1ZSxcbiAgICAgICAgICAgIHN0b3JlRnJhZ21lbnQ6IHRoaXMuc3RvcmVGcmFnbWVudCxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBSZWZsZWN0LmFwcGx5KCB0aGlzLnRlbXBsYXRlLCB0aGlzLlRlbXBsYXRlQ29udGV4dCwgWyB0aGlzLmdldFRlbXBsYXRlT3B0aW9ucygpIF0gKVxuICAgICAgICB9IClcblxuICAgICAgICB0aGlzLnJlbmRlclN1YnZpZXdzKClcblxuICAgICAgICBpZiggdGhpcy5zaXplICkgeyB0aGlzLnNpemUoKTsgdGhpcy5PcHRpbWl6ZWRSZXNpemUuYWRkKCB0aGlzLnNpemUuYmluZCh0aGlzKSApIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0UmVuZGVyKClcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2hpbGRyZW4oIGVsICkge1xuICAgICAgICB3aGlsZSggZWwuZmlyc3RDaGlsZCApIGVsLnJlbW92ZUNoaWxkKCBlbC5maXJzdENoaWxkIClcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgcmVuZGVyU3Vidmlld3MoKSB7XG4gICAgICAgIHRoaXMuc3Vidmlld0VsZW1lbnRzLmZvckVhY2goIG9iaiA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gb2JqLm5hbWUgfHwgb2JqLnZpZXdcblxuICAgICAgICAgICAgbGV0IG9wdHMgPSB7IH1cblxuICAgICAgICAgICAgaWYoIHRoaXMuVmlld3MgJiYgdGhpcy5WaWV3c1sgb2JqLnZpZXcgXSApIG9wdHMgPSB0eXBlb2YgdGhpcy5WaWV3c1sgb2JqLnZpZXcgXSA9PT0gXCJvYmplY3RcIiA/IHRoaXMuVmlld3NbIG9iai52aWV3IF0gOiBSZWZsZWN0LmFwcGx5KCB0aGlzLlZpZXdzWyBvYmoudmlldyBdLCB0aGlzLCBbIF0gKVxuICAgICAgICAgICAgaWYoIHRoaXMuVmlld3MgJiYgdGhpcy5WaWV3c1sgbmFtZSBdICkgb3B0cyA9IHR5cGVvZiB0aGlzLlZpZXdzWyBuYW1lIF0gPT09IFwib2JqZWN0XCIgPyB0aGlzLlZpZXdzWyBuYW1lIF0gOiBSZWZsZWN0LmFwcGx5KCB0aGlzLlZpZXdzWyBuYW1lIF0sIHRoaXMsIFsgXSApXG5cbiAgICAgICAgICAgIHRoaXMudmlld3NbIG5hbWUgXSA9IHRoaXMuZmFjdG9yeS5jcmVhdGUoIG9iai52aWV3LCBPYmplY3QuYXNzaWduKCB7IGluc2VydGlvbjogeyBlbDogb2JqLmVsLCBtZXRob2Q6ICdpbnNlcnRCZWZvcmUnIH0gfSwgb3B0cyApIClcblxuICAgICAgICAgICAgaWYoIHRoaXMuZXZlbnRzLnZpZXdzICkge1xuICAgICAgICAgICAgICAgIGlmKCB0aGlzLmV2ZW50cy52aWV3c1sgbmFtZSBdICkgdGhpcy5ldmVudHMudmlld3NbIG5hbWUgXS5mb3JFYWNoKCBhcnIgPT4gdGhpcy52aWV3c1sgbmFtZSBdLm9uKCBhcnJbMF0sIGV2ZW50RGF0YSA9PiBSZWZsZWN0LmFwcGx5KCBhcnJbMV0sIHRoaXMsIFsgZXZlbnREYXRhIF0gKSApIClcbiAgICAgICAgICAgICAgICBlbHNlIGlmKCB0aGlzLmV2ZW50cy52aWV3c1sgb2JqLnZpZXcgXSApIHRoaXMuZXZlbnRzLnZpZXdzWyBvYmoudmlldyBdLmZvckVhY2goIGFyciA9PiB0aGlzLnZpZXdzWyBuYW1lIF0ub24oIGFyclswXSwgZXZlbnREYXRhID0+IFJlZmxlY3QuYXBwbHkoIGFyclsxXSwgdGhpcywgWyBldmVudERhdGEgXSApICkgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggb2JqLmVsLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykgKSB0aGlzLnZpZXdzW25hbWVdLmhpZGVTeW5jKClcbiAgICAgICAgICAgIG9iai5lbC5yZW1vdmUoKVxuICAgICAgICB9IClcblxuICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cyA9IFsgXVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHNjb290QXdheSgpIHtcbiAgICAgICAgdGhpcy5Ub2FzdC5zaG93TWVzc2FnZSggJ2Vycm9yJywgJ1lvdSBhcmUgbm90IGFsbG93ZWQgaGVyZS4nKVxuICAgICAgICAuY2F0Y2goIGUgPT4geyB0aGlzLkVycm9yKCBlICk7IHRoaXMuZW1pdCggJ25hdmlnYXRlJywgYC9gICkgfSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB0aGlzLmVtaXQoICduYXZpZ2F0ZScsIGAvYCApIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBzaG93KCBpc1Nsb3cgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dFbCggdGhpcy5lbHMuY29udGFpbmVyLCBpc1Nsb3cgKVxuICAgIH0sXG5cbiAgICBzaG93U3luYygpIHsgdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOyByZXR1cm4gdGhpcyB9LFxuXG4gICAgX3Nob3dFbCggZWwsIHJlc29sdmUsIGhhc2gsIGlzU2xvdyApIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2FuaW1hdGlvbmVuZCcsIHRoaXNbaGFzaF0gKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBhbmltYXRlLWluJHsgaXNTbG93ID8gJy1zbG93JyA6ICcnfWApXG4gICAgICAgIGRlbGV0ZSB0aGlzWyBoYXNoIF1cbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgfSxcblxuICAgIHNob3dFbCggZWwsIGlzU2xvdyApIHtcbiAgICAgICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgaGFzaCA9IGAke3RpbWV9U2hvd2BcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpc1sgaGFzaCBdID0gZSA9PiB0aGlzLl9zaG93RWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKVxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lciggJ2FuaW1hdGlvbmVuZCcsIHRoaXNbIGhhc2ggXSApXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChgYW5pbWF0ZS1pbiR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICB9ICkgICAgICAgIFxuICAgIH0sXG5cbiAgICBzbHVycEVsKCBlbCApIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZWwuZ2V0QXR0cmlidXRlKCB0aGlzLnNsdXJwLmF0dHIgKSB8fCAnY29udGFpbmVyJ1xuXG4gICAgICAgIGlmKCBrZXkgPT09ICdjb250YWluZXInICkge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCggdGhpcy5uYW1lIClcbiAgICAgICAgICAgIGlmKCB0aGlzLmtsYXNzICkgZWwuY2xhc3NMaXN0LmFkZCggdGhpcy5rbGFzcyApXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVsc1sga2V5IF0gPSBBcnJheS5pc0FycmF5KCB0aGlzLmVsc1sga2V5IF0gKVxuICAgICAgICAgICAgPyB0aGlzLmVsc1sga2V5IF0uY29uY2F0KCBlbCApXG4gICAgICAgICAgICA6ICggdGhpcy5lbHNbIGtleSBdICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAgICAgID8gWyB0aGlzLmVsc1sga2V5IF0sIGVsIF1cbiAgICAgICAgICAgICAgICA6IGVsXG5cbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKHRoaXMuc2x1cnAuYXR0cilcblxuICAgICAgICBpZiggdGhpcy5ldmVudHNbIGtleSBdICkgdGhpcy5kZWxlZ2F0ZUV2ZW50cygga2V5LCBlbCApXG4gICAgfSxcblxuICAgIHNsdXJwVGVtcGxhdGUoIG9wdGlvbnMgKSB7XG4gICAgICAgIHZhciBmcmFnbWVudCA9IHRoaXMuaHRtbFRvRnJhZ21lbnQoIG9wdGlvbnMudGVtcGxhdGUgKSxcbiAgICAgICAgICAgIHNlbGVjdG9yID0gYFske3RoaXMuc2x1cnAuYXR0cn1dYCxcbiAgICAgICAgICAgIHZpZXdTZWxlY3RvciA9IGBbJHt0aGlzLnNsdXJwLnZpZXd9XWAsXG4gICAgICAgICAgICBpbWdTZWxlY3RvciA9IGBbJHt0aGlzLnNsdXJwLmltZ31dYCxcbiAgICAgICAgICAgIGZpcnN0RWwgPSBmcmFnbWVudC5xdWVyeVNlbGVjdG9yKCcqJylcblxuICAgICAgICBpZiggb3B0aW9ucy5pc1ZpZXcgfHwgZmlyc3RFbC5nZXRBdHRyaWJ1dGUoIHRoaXMuc2x1cnAuYXR0ciApICkgdGhpcy5zbHVycEVsKCBmaXJzdEVsIClcbiAgICAgICAgQXJyYXkuZnJvbSggZnJhZ21lbnQucXVlcnlTZWxlY3RvckFsbCggYCR7c2VsZWN0b3J9LCAke3ZpZXdTZWxlY3Rvcn0sICR7aW1nU2VsZWN0b3J9YCApICkuZm9yRWFjaCggZWwgPT4ge1xuICAgICAgICAgICAgaWYoIGVsLmhhc0F0dHJpYnV0ZSggdGhpcy5zbHVycC5hdHRyICkgKSB7IHRoaXMuc2x1cnBFbCggZWwgKSB9XG4gICAgICAgICAgICBlbHNlIGlmKCBlbC5oYXNBdHRyaWJ1dGUoIHRoaXMuc2x1cnAuaW1nICkgKSB0aGlzLmZhZGVJbkltYWdlKCBlbCApXG4gICAgICAgICAgICBlbHNlIGlmKCBlbC5oYXNBdHRyaWJ1dGUoIHRoaXMuc2x1cnAudmlldyApICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vidmlld0VsZW1lbnRzLnB1c2goIHsgZWwsIHZpZXc6IGVsLmdldEF0dHJpYnV0ZSh0aGlzLnNsdXJwLnZpZXcpLCBuYW1lOiBlbC5nZXRBdHRyaWJ1dGUodGhpcy5zbHVycC5uYW1lKSB9IClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSApXG4gICBcbiAgICAgICAgaWYoIG9wdGlvbnMuc3RvcmVGcmFnbWVudCApIHJldHVybiBPYmplY3QuYXNzaWduKCB0aGlzLCB7IGZyYWdtZW50IH0gKVxuXG4gICAgICAgIHRoaXMuaW5zZXJ0VG9Eb20oIGZyYWdtZW50LCBvcHRpb25zIClcblxuICAgICAgICBpZiggb3B0aW9ucy5yZW5kZXJTdWJ2aWV3cyApIHRoaXMucmVuZGVyU3Vidmlld3MoKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHVuYmluZEV2ZW50KCBrZXksIGV2ZW50LCBlbCApIHtcbiAgICAgICAgY29uc3QgZWxzID0gZWwgPyBbIGVsIF0gOiBBcnJheS5pc0FycmF5KCB0aGlzLmVsc1sga2V5IF0gKSA/IHRoaXMuZWxzWyBrZXkgXSA6IFsgdGhpcy5lbHNbIGtleSBdIF0sXG4gICAgICAgICAgIG5hbWUgPSB0aGlzLmdldEV2ZW50TWV0aG9kTmFtZSgga2V5LCBldmVudCApXG5cbiAgICAgICAgZWxzLmZvckVhY2goIGVsID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoIGV2ZW50IHx8ICdjbGljaycsIHRoaXNbIGBfJHtuYW1lfWAgXSApIClcbiAgICB9XG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSgge1xuXG4gICAgYWRkKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmKCAhdGhpcy5jYWxsYmFja3MubGVuZ3RoICkgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSApXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spXG4gICAgfSxcblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgIGlmKCB0aGlzLnJ1bm5pbmcgKSByZXR1cm5cblxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXG4gICAgICAgIFxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgICAgICA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMucnVuQ2FsbGJhY2tzLmJpbmQodGhpcykgKVxuICAgICAgICAgICAgOiBzZXRUaW1lb3V0KCB0aGlzLnJ1bkNhbGxiYWNrcywgNjYgKVxuICAgIH0sXG5cbiAgICBydW5DYWxsYmFja3MoKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3MuZmlsdGVyKCBjYWxsYmFjayA9PiBjYWxsYmFjaygpIClcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2UgXG4gICAgfVxuXG59LCB7IGNhbGxiYWNrczogeyB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IFtdIH0sIHJ1bm5pbmc6IHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiBmYWxzZSB9IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgXG4gICAgcmV0dXJuIGA8Zm9vdGVyPlxuICAgIDxkaXY+ZnV0dXJlIGRheXMgZmFybTwvZGl2PlxuICAgIDxkaXY+IFxuICAgICAgICAyMTIzIFRpbnkgUm9hZDxici8+VG93biBOYW1lLCBNaWNoaWdhbiAzMzM0NDxici8+PGJyLz5cbiAgICAgICAgPGEgaHJlZj1cIm1haWx0bzpJbmZvQEZ1dHVyZURheXNGYXJtLmNvbVwiPkluZm9ARnV0dXJlRGF5c0Zhcm0uY29tPC9hPjxici8+XG4gICAgICAgICgzMzMpIDMyMy04ODk5XG4gICAgPC9kaXY+PGJyLz5cbiAgICA8ZGl2PkNvcHlyaWdodCAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gRnV0dXJlRGF5cyBTb2Z0d2FyZTwvZGl2PlxuICAgIDwvZm9vdGVyPmBcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oIHsgbW9kZWwgfSApIHtcbiAgICBjb25zdCBuYXZPcHRpb25zID0gbW9kZWwubWFwKGRhdHVtID0+IGA8ZGl2IGRhdGEtanM9J25hdkxpc3QnPiR7IHRoaXMuY2FwaXRhbGl6ZVdvcmRzKGRhdHVtKSB9PC9kaXY+YCkuam9pbignJylcbiAgICByZXR1cm4gYDxuYXY+JHsgbmF2T3B0aW9ucyB9PC9uYXY+YFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7IH0sIHJlcXVpcmUoJy4vTXlPYmplY3QnKSwge1xuXG4gICAgQ3JlYXRlRGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkdWNlciggdGhpcy5hdHRyaWJ1dGVzLCBhdHRyID0+ICggeyBbYXR0ci5uYW1lXTogdHlwZW9mIGF0dHIuZGVmYXVsdCA9PT0gJ2Z1bmN0aW9uJyA/IGF0dHIuZGVmYXVsdCgpIDogYXR0ci5kZWZhdWx0IH0gKSApXG4gICAgfSxcblxuICAgIGF0dHJpYnV0ZXM6IFsgXSxcblxuICAgIGRhdGE6IHsgfSxcblxuICAgIGNvbnN0cnVjdG9yKCBkYXRhPXt9LCBvcHRzPXt9ICkge1xuICAgICAgICBPYmplY3QuYXNzaWduKCB0aGlzLCB7IHN0b3JlOiB7IH0sIGRhdGEgfSwgb3B0cyApXG5cbiAgICAgICAgaWYoIHRoaXMuc3RvcmVCeSApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBrZXkgPT4gdGhpcy5zdG9yZVsga2V5IF0gPSB7IH0gKVxuICAgICAgICAgICAgdGhpcy5fc3RvcmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgbWV0YTogeyB9LFxuXG4gICAgc29ydCggb3B0cyApIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IE9iamVjdC5rZXlzKCBvcHRzIClbMF0sXG4gICAgICAgICAgICB2YWx1ZSA9IG9wdHNbYXR0cl07XG5cbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoICggYSwgYiApID0+XG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgID8gYVthdHRyXSA8IGJbYXR0cl0gPyAtMSA6IDFcbiAgICAgICAgICAgICAgICA6IGJbYXR0cl0gPCBhW2F0dHJdID8gLTEgOiAxXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBfcmVzZXRTdG9yZSggc3RvcmVCeSApIHtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHsgfVxuICAgICAgICBzdG9yZUJ5LmZvckVhY2goIGF0dHIgPT4gdGhpcy5zdG9yZVsgYXR0ciBdID0geyB9IClcbiAgICAgICAgdGhpcy5zdG9yZUJ5ID0gc3RvcmVCeVxuICAgIH0sXG5cbiAgICBfc3RvcmUoIGRhdGEgKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHRoaXMuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goIGRhdHVtID0+IHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSApIClcbiAgICB9LFxuXG4gICAgX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSB7XG4gICAgICAgIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdID1cbiAgICAgICAgICAgIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdXG4gICAgICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KCB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXSApXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0uY29uY2F0KCBkYXR1bSApXG4gICAgICAgICAgICAgICAgICAgIDpbIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdLCBkYXR1bSBdXG4gICAgICAgICAgICAgICAgOiBkYXR1bVxuICAgIH0sXG5cbiAgICBfc3RvcmVPbmUoIGRhdHVtICkge1xuICAgICAgICB0aGlzLnN0b3JlQnkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLl9zdG9yZUF0dHIoIGRhdHVtLCBhdHRyICkgKVxuICAgIH1cblxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGVyciA9PiB7IGNvbnNvbGUubG9nKCBlcnIuc3RhY2sgfHwgZXJyICkgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBjYXBpdGFsaXplRmlyc3RMZXR0ZXI6IHN0cmluZyA9PiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSksXG5cbiAgICBnZXRJbnRSYW5nZSggaW50ICkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSggQXJyYXkoIGludCApLmtleXMoKSApXG4gICAgfSxcblxuICAgIGdldFJhbmRvbUluY2x1c2l2ZUludGVnZXIoIG1pbiwgbWF4ICkge1xuICAgICAgICBtaW4gPSBNYXRoLmNlaWwobWluKVxuICAgICAgICBtYXggPSBNYXRoLmZsb29yKG1heClcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cbiAgICB9LFxuXG4gICAgb21pdCggb2JqLCBrZXlzICkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoIG9iaiApLmZpbHRlcigga2V5ID0+ICFrZXlzLmluY2x1ZGVzKCBrZXkgKSApLnJlZHVjZSggKCBtZW1vLCBrZXkgKSA9PiBPYmplY3QuYXNzaWduKCBtZW1vLCB7IFtrZXldOiBvYmpba2V5XSB9ICksIHsgfSApXG4gICAgfSxcblxuICAgIHBpY2soIG9iaiwga2V5cyApIHtcbiAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKCAoIG1lbW8sIGtleSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIHsgW2tleV06IG9ialtrZXldIH0gKSwgeyB9IClcbiAgICB9LFxuXG4gICAgcmVkdWNlciggYXJyLCBmbiApIHsgcmV0dXJuIGFyci5yZWR1Y2UoICggbWVtbywgaXRlbSwgaSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIGZuKCBpdGVtLCBpICkgKSwgeyB9ICkgfSxcblxuICAgIHNodWZmbGVBcnJheSggYXJyICkge1xuICAgICAgICBjb25zdCBydiA9IEFycmF5LmZyb20oIGFyciApXG4gICAgICAgXG4gICAgICAgIHJ2LmZvckVhY2goICggaXRlbSwgaSApID0+IHtcbiAgICAgICAgICAgIGlmKCBpID09PSBydi5sZW5ndGggLSAxICkgcmV0dXJuIFxuICAgICAgICAgICAgY29uc3QgaW50ID0gdGhpcy5nZXRSYW5kb21JbmNsdXNpdmVJbnRlZ2VyKCBpLCBydi5sZW5ndGggLSAxICksXG4gICAgICAgICAgICAgICAgaG9sZGVyID0gcnZbIGkgXVxuXG4gICAgICAgICAgICBydltpXSA9IHJ2W2ludF1cbiAgICAgICAgICAgIHJ2W2ludF0gPSBob2xkZXJcbiAgICAgICAgfSApXG5cbiAgICAgICAgcmV0dXJuIHJ2XG4gICAgfSxcblxuICAgIEVycm9yOiByZXF1aXJlKCcuL015RXJyb3InKSxcblxuICAgIFA6ICggZnVuLCBhcmdzPVsgXSwgdGhpc0FyZyApID0+XG4gICAgICAgIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IFJlZmxlY3QuYXBwbHkoIGZ1biwgdGhpc0FyZyB8fCB0aGlzLCBhcmdzLmNvbmNhdCggKCBlLCAuLi5jYWxsYmFjayApID0+IGUgPyByZWplY3QoZSkgOiByZXNvbHZlKGNhbGxiYWNrKSApICkgKSxcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHsgcmV0dXJuIHRoaXMgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLyogc21vb3Roc2Nyb2xsIHYwLjQuMCAtIDIwMTcgLSBEdXN0YW4gS2FzdGVuLCBKZXJlbWlhcyBNZW5pY2hlbGxpIC0gTUlUIExpY2Vuc2UgKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKlxuICAgKiBhbGlhc2VzXG4gICAqIHc6IHdpbmRvdyBnbG9iYWwgb2JqZWN0XG4gICAqIGQ6IGRvY3VtZW50XG4gICAqL1xuICB2YXIgdyA9IHdpbmRvdztcbiAgdmFyIGQgPSBkb2N1bWVudDtcblxuICAvKipcbiAgICogaW5kaWNhdGVzIGlmIGEgdGhlIGN1cnJlbnQgYnJvd3NlciBpcyBtYWRlIGJ5IE1pY3Jvc29mdFxuICAgKiBAbWV0aG9kIGlzTWljcm9zb2Z0QnJvd3NlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFnZW50XG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgZnVuY3Rpb24gaXNNaWNyb3NvZnRCcm93c2VyKHVzZXJBZ2VudCkge1xuICAgIHZhciB1c2VyQWdlbnRQYXR0ZXJucyA9IFsnTVNJRSAnLCAnVHJpZGVudC8nLCAnRWRnZS8nXTtcblxuICAgIHJldHVybiBuZXcgUmVnRXhwKHVzZXJBZ2VudFBhdHRlcm5zLmpvaW4oJ3wnKSkudGVzdCh1c2VyQWdlbnQpO1xuICB9XG5cbiAgIC8vIHBvbHlmaWxsXG4gIGZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICAgIC8vIHJldHVybiBpZiBzY3JvbGwgYmVoYXZpb3IgaXMgc3VwcG9ydGVkIGFuZCBwb2x5ZmlsbCBpcyBub3QgZm9yY2VkXG4gICAgaWYgKCdzY3JvbGxCZWhhdmlvcicgaW4gZC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcbiAgICAgICYmIHcuX19mb3JjZVNtb290aFNjcm9sbFBvbHlmaWxsX18gIT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnbG9iYWxzXG4gICAgdmFyIEVsZW1lbnQgPSB3LkhUTUxFbGVtZW50IHx8IHcuRWxlbWVudDtcbiAgICB2YXIgU0NST0xMX1RJTUUgPSA0Njg7XG5cbiAgICAvKlxuICAgICAqIElFIGhhcyByb3VuZGluZyBidWcgcm91bmRpbmcgZG93biBjbGllbnRIZWlnaHQgYW5kIGNsaWVudFdpZHRoIGFuZFxuICAgICAqIHJvdW5kaW5nIHVwIHNjcm9sbEhlaWdodCBhbmQgc2Nyb2xsV2lkdGggY2F1c2luZyBmYWxzZSBwb3NpdGl2ZXNcbiAgICAgKiBvbiBoYXNTY3JvbGxhYmxlU3BhY2VcbiAgICAgKi9cbiAgICB2YXIgUk9VTkRJTkdfVE9MRVJBTkNFID0gaXNNaWNyb3NvZnRCcm93c2VyKHcubmF2aWdhdG9yLnVzZXJBZ2VudCkgPyAxIDogMDtcblxuICAgIC8vIG9iamVjdCBnYXRoZXJpbmcgb3JpZ2luYWwgc2Nyb2xsIG1ldGhvZHNcbiAgICB2YXIgb3JpZ2luYWwgPSB7XG4gICAgICBzY3JvbGw6IHcuc2Nyb2xsIHx8IHcuc2Nyb2xsVG8sXG4gICAgICBzY3JvbGxCeTogdy5zY3JvbGxCeSxcbiAgICAgIGVsZW1lbnRTY3JvbGw6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCB8fCBzY3JvbGxFbGVtZW50LFxuICAgICAgc2Nyb2xsSW50b1ZpZXc6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSB0aW1pbmcgbWV0aG9kXG4gICAgdmFyIG5vdyA9IHcucGVyZm9ybWFuY2UgJiYgdy5wZXJmb3JtYW5jZS5ub3dcbiAgICAgID8gdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3LnBlcmZvcm1hbmNlKVxuICAgICAgOiBEYXRlLm5vdztcblxuICAgIC8qKlxuICAgICAqIGNoYW5nZXMgc2Nyb2xsIHBvc2l0aW9uIGluc2lkZSBhbiBlbGVtZW50XG4gICAgICogQG1ldGhvZCBzY3JvbGxFbGVtZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc2Nyb2xsRWxlbWVudCh4LCB5KSB7XG4gICAgICB0aGlzLnNjcm9sbExlZnQgPSB4O1xuICAgICAgdGhpcy5zY3JvbGxUb3AgPSB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgcmVzdWx0IG9mIGFwcGx5aW5nIGVhc2UgbWF0aCBmdW5jdGlvbiB0byBhIG51bWJlclxuICAgICAqIEBtZXRob2QgZWFzZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBrXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlYXNlKGspIHtcbiAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGEgc21vb3RoIGJlaGF2aW9yIHNob3VsZCBiZSBhcHBsaWVkXG4gICAgICogQG1ldGhvZCBzaG91bGRCYWlsT3V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBmaXJzdEFyZ1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNob3VsZEJhaWxPdXQoZmlyc3RBcmcpIHtcbiAgICAgIGlmIChmaXJzdEFyZyA9PT0gbnVsbFxuICAgICAgICB8fCB0eXBlb2YgZmlyc3RBcmcgIT09ICdvYmplY3QnXG4gICAgICAgIHx8IGZpcnN0QXJnLmJlaGF2aW9yID09PSB1bmRlZmluZWRcbiAgICAgICAgfHwgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdhdXRvJ1xuICAgICAgICB8fCBmaXJzdEFyZy5iZWhhdmlvciA9PT0gJ2luc3RhbnQnKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvbnVsbFxuICAgICAgICAvLyBvciBiZWhhdmlvciBpcyBhdXRvLCBpbnN0YW50IG9yIHVuZGVmaW5lZFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBmaXJzdEFyZyA9PT0gJ29iamVjdCcgJiYgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdzbW9vdGgnKSB7XG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIGFuIG9iamVjdCBhbmQgYmVoYXZpb3IgaXMgc21vb3RoXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBiZWhhdmlvciBpcyBub3Qgc3VwcG9ydGVkXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnYmVoYXZpb3IgbWVtYmVyIG9mIFNjcm9sbE9wdGlvbnMgJ1xuICAgICAgICArIGZpcnN0QXJnLmJlaGF2aW9yXG4gICAgICAgICsgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgZW51bWVyYXRpb24gU2Nyb2xsQmVoYXZpb3IuJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYW4gZWxlbWVudCBoYXMgc2Nyb2xsYWJsZSBzcGFjZSBpbiB0aGUgcHJvdmlkZWQgYXhpc1xuICAgICAqIEBtZXRob2QgaGFzU2Nyb2xsYWJsZVNwYWNlXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCBheGlzKSB7XG4gICAgICBpZiAoYXhpcyA9PT0gJ1knKSB7XG4gICAgICAgIHJldHVybiAoZWwuY2xpZW50SGVpZ2h0ICsgUk9VTkRJTkdfVE9MRVJBTkNFKSA8IGVsLnNjcm9sbEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgICAgICByZXR1cm4gKGVsLmNsaWVudFdpZHRoICsgUk9VTkRJTkdfVE9MRVJBTkNFKSA8IGVsLnNjcm9sbFdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBhIHNjcm9sbGFibGUgb3ZlcmZsb3cgcHJvcGVydHkgaW4gdGhlIGF4aXNcbiAgICAgKiBAbWV0aG9kIGNhbk92ZXJmbG93XG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FuT3ZlcmZsb3coZWwsIGF4aXMpIHtcbiAgICAgIHZhciBvdmVyZmxvd1ZhbHVlID0gdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKVsnb3ZlcmZsb3cnICsgYXhpc107XG5cbiAgICAgIHJldHVybiBvdmVyZmxvd1ZhbHVlID09PSAnYXV0bycgfHwgb3ZlcmZsb3dWYWx1ZSA9PT0gJ3Njcm9sbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGFuIGVsZW1lbnQgY2FuIGJlIHNjcm9sbGVkIGluIGVpdGhlciBheGlzXG4gICAgICogQG1ldGhvZCBpc1Njcm9sbGFibGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc1Njcm9sbGFibGUoZWwpIHtcbiAgICAgIHZhciBpc1Njcm9sbGFibGVZID0gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCAnWScpICYmIGNhbk92ZXJmbG93KGVsLCAnWScpO1xuICAgICAgdmFyIGlzU2Nyb2xsYWJsZVggPSBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsICdYJykgJiYgY2FuT3ZlcmZsb3coZWwsICdYJyk7XG5cbiAgICAgIHJldHVybiBpc1Njcm9sbGFibGVZIHx8IGlzU2Nyb2xsYWJsZVg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZmluZHMgc2Nyb2xsYWJsZSBwYXJlbnQgb2YgYW4gZWxlbWVudFxuICAgICAqIEBtZXRob2QgZmluZFNjcm9sbGFibGVQYXJlbnRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXG4gICAgICogQHJldHVybnMge05vZGV9IGVsXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNjcm9sbGFibGVQYXJlbnQoZWwpIHtcbiAgICAgIHZhciBpc0JvZHk7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuXG4gICAgICAgIGlzQm9keSA9IGVsID09PSBkLmJvZHk7XG4gICAgICB9IHdoaWxlIChpc0JvZHkgPT09IGZhbHNlICYmIGlzU2Nyb2xsYWJsZShlbCkgPT09IGZhbHNlKTtcblxuICAgICAgaXNCb2R5ID0gbnVsbDtcblxuICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNlbGYgaW52b2tlZCBmdW5jdGlvbiB0aGF0LCBnaXZlbiBhIGNvbnRleHQsIHN0ZXBzIHRocm91Z2ggc2Nyb2xsaW5nXG4gICAgICogQG1ldGhvZCBzdGVwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0ZXAoY29udGV4dCkge1xuICAgICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhciBjdXJyZW50WDtcbiAgICAgIHZhciBjdXJyZW50WTtcbiAgICAgIHZhciBlbGFwc2VkID0gKHRpbWUgLSBjb250ZXh0LnN0YXJ0VGltZSkgLyBTQ1JPTExfVElNRTtcblxuICAgICAgLy8gYXZvaWQgZWxhcHNlZCB0aW1lcyBoaWdoZXIgdGhhbiBvbmVcbiAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xuXG4gICAgICAvLyBhcHBseSBlYXNpbmcgdG8gZWxhcHNlZCB0aW1lXG4gICAgICB2YWx1ZSA9IGVhc2UoZWxhcHNlZCk7XG5cbiAgICAgIGN1cnJlbnRYID0gY29udGV4dC5zdGFydFggKyAoY29udGV4dC54IC0gY29udGV4dC5zdGFydFgpICogdmFsdWU7XG4gICAgICBjdXJyZW50WSA9IGNvbnRleHQuc3RhcnRZICsgKGNvbnRleHQueSAtIGNvbnRleHQuc3RhcnRZKSAqIHZhbHVlO1xuXG4gICAgICBjb250ZXh0Lm1ldGhvZC5jYWxsKGNvbnRleHQuc2Nyb2xsYWJsZSwgY3VycmVudFgsIGN1cnJlbnRZKTtcblxuICAgICAgLy8gc2Nyb2xsIG1vcmUgaWYgd2UgaGF2ZSBub3QgcmVhY2hlZCBvdXIgZGVzdGluYXRpb25cbiAgICAgIGlmIChjdXJyZW50WCAhPT0gY29udGV4dC54IHx8IGN1cnJlbnRZICE9PSBjb250ZXh0LnkpIHtcbiAgICAgICAgdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcC5iaW5kKHcsIGNvbnRleHQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzY3JvbGxzIHdpbmRvdyBvciBlbGVtZW50IHdpdGggYSBzbW9vdGggYmVoYXZpb3JcbiAgICAgKiBAbWV0aG9kIHNtb290aFNjcm9sbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5vZGV9IGVsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGVsLCB4LCB5KSB7XG4gICAgICB2YXIgc2Nyb2xsYWJsZTtcbiAgICAgIHZhciBzdGFydFg7XG4gICAgICB2YXIgc3RhcnRZO1xuICAgICAgdmFyIG1ldGhvZDtcbiAgICAgIHZhciBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgLy8gZGVmaW5lIHNjcm9sbCBjb250ZXh0XG4gICAgICBpZiAoZWwgPT09IGQuYm9keSkge1xuICAgICAgICBzY3JvbGxhYmxlID0gdztcbiAgICAgICAgc3RhcnRYID0gdy5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQ7XG4gICAgICAgIHN0YXJ0WSA9IHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0O1xuICAgICAgICBtZXRob2QgPSBvcmlnaW5hbC5zY3JvbGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxhYmxlID0gZWw7XG4gICAgICAgIHN0YXJ0WCA9IGVsLnNjcm9sbExlZnQ7XG4gICAgICAgIHN0YXJ0WSA9IGVsLnNjcm9sbFRvcDtcbiAgICAgICAgbWV0aG9kID0gc2Nyb2xsRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgLy8gc2Nyb2xsIGxvb3Bpbmcgb3ZlciBhIGZyYW1lXG4gICAgICBzdGVwKHtcbiAgICAgICAgc2Nyb2xsYWJsZTogc2Nyb2xsYWJsZSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICBzdGFydFg6IHN0YXJ0WCxcbiAgICAgICAgc3RhcnRZOiBzdGFydFksXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE9SSUdJTkFMIE1FVEhPRFMgT1ZFUlJJREVTXG4gICAgLy8gdy5zY3JvbGwgYW5kIHcuc2Nyb2xsVG9cbiAgICB3LnNjcm9sbCA9IHcuc2Nyb2xsVG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbC5jYWxsKFxuICAgICAgICAgIHcsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgICA6ICh3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldCksXG4gICAgICAgICAgLy8gdXNlIHRvcCBwcm9wLCBzZWNvbmQgYXJndW1lbnQgaWYgcHJlc2VudCBvciBmYWxsYmFjayB0byBzY3JvbGxZXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgOiAody5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdyxcbiAgICAgICAgZC5ib2R5LFxuICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgOiAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxuICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgIDogKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gdy5zY3JvbGxCeVxuICAgIHcuc2Nyb2xsQnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEJ5LmNhbGwoXG4gICAgICAgICAgdyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS5sZWZ0XG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLnRvcFxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgID8gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAgOiAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdyxcbiAgICAgICAgZC5ib2R5LFxuICAgICAgICB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgKHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0KSxcbiAgICAgICAgfn5hcmd1bWVudHNbMF0udG9wICsgKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsIGFuZCBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUb1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCA9IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbFRvID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBpZiBvbmUgbnVtYmVyIGlzIHBhc3NlZCwgdGhyb3cgZXJyb3IgdG8gbWF0Y2ggRmlyZWZveCBpbXBsZW1lbnRhdGlvblxuICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicgJiYgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1ZhbHVlIGNvdWxkblxcJ3QgYmUgY29udmVydGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvcmlnaW5hbC5lbGVtZW50U2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICAvLyB1c2UgbGVmdCBwcm9wLCBmaXJzdCBudW1iZXIgYXJndW1lbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsTGVmdFxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdXG4gICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIC8vIHVzZSB0b3AgcHJvcCwgc2Vjb25kIGFyZ3VtZW50IG9yIGZhbGxiYWNrIHRvIHNjcm9sbFRvcFxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVmdCA9IGFyZ3VtZW50c1swXS5sZWZ0O1xuICAgICAgdmFyIHRvcCA9IGFyZ3VtZW50c1swXS50b3A7XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLFxuICAgICAgICB0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLnNjcm9sbExlZnQgOiB+fmxlZnQsXG4gICAgICAgIHR5cGVvZiB0b3AgPT09ICd1bmRlZmluZWQnID8gdGhpcy5zY3JvbGxUb3AgOiB+fnRvcFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsQnlcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxCeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgb3JpZ2luYWwuZWxlbWVudFNjcm9sbC5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgdGhpcy5zY3JvbGxMZWZ0XG4gICAgICAgICAgICA6IH5+YXJndW1lbnRzWzBdICsgdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3AgKyB0aGlzLnNjcm9sbFRvcFxuICAgICAgICAgICAgOiB+fmFyZ3VtZW50c1sxXSArIHRoaXMuc2Nyb2xsVG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbCh7XG4gICAgICAgIGxlZnQ6IH5+YXJndW1lbnRzWzBdLmxlZnQgKyB0aGlzLnNjcm9sbExlZnQsXG4gICAgICAgIHRvcDogfn5hcmd1bWVudHNbMF0udG9wICsgdGhpcy5zY3JvbGxUb3AsXG4gICAgICAgIGJlaGF2aW9yOiBhcmd1bWVudHNbMF0uYmVoYXZpb3JcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxJbnRvVmlld1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEludG9WaWV3LmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1swXVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgdmFyIHNjcm9sbGFibGVQYXJlbnQgPSBmaW5kU2Nyb2xsYWJsZVBhcmVudCh0aGlzKTtcbiAgICAgIHZhciBwYXJlbnRSZWN0cyA9IHNjcm9sbGFibGVQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgY2xpZW50UmVjdHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICBpZiAoc2Nyb2xsYWJsZVBhcmVudCAhPT0gZC5ib2R5KSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluc2lkZSBwYXJlbnRcbiAgICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsTGVmdCArIGNsaWVudFJlY3RzLmxlZnQgLSBwYXJlbnRSZWN0cy5sZWZ0LFxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsVG9wICsgY2xpZW50UmVjdHMudG9wIC0gcGFyZW50UmVjdHMudG9wXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gcmV2ZWFsIHBhcmVudCBpbiB2aWV3cG9ydCB1bmxlc3MgaXMgZml4ZWRcbiAgICAgICAgaWYgKHcuZ2V0Q29tcHV0ZWRTdHlsZShzY3JvbGxhYmxlUGFyZW50KS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgICAgbGVmdDogcGFyZW50UmVjdHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogcGFyZW50UmVjdHMudG9wLFxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluIHZpZXdwb3J0XG4gICAgICAgIHcuc2Nyb2xsQnkoe1xuICAgICAgICAgIGxlZnQ6IGNsaWVudFJlY3RzLmxlZnQsXG4gICAgICAgICAgdG9wOiBjbGllbnRSZWN0cy50b3AsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gY29tbW9uanNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgcG9seWZpbGw6IHBvbHlmaWxsIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gZ2xvYmFsXG4gICAgcG9seWZpbGwoKTtcbiAgfVxuXG59KCkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vLi4vY2xpZW50L2pzL3ZpZXdzL19fcHJvdG9fXycpLCB7XG5cbiAgICBUb2FzdE1lc3NhZ2U6IHJlcXVpcmUoJy4vVG9hc3RNZXNzYWdlJyksXG5cbiAgICBuYW1lOiAnVG9hc3QnLFxuXG4gICAgcG9zdFJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHJlcXVpcmVzTG9naW46IGZhbHNlLFxuXG4gICAgY3JlYXRlTWVzc2FnZSggdHlwZSwgbWVzc2FnZSApIHtcbiAgICAgICAgaWYoICF0aGlzLm1lc3NhZ2VzWyBtZXNzYWdlIF0gKSB0aGlzLm1lc3NhZ2VzWyBtZXNzYWdlIF0gPSBPYmplY3QuY3JlYXRlKCB0aGlzLlRvYXN0TWVzc2FnZSwge1xuICAgICAgICAgICAgaW5zZXJ0aW9uOiB7IHZhbHVlOiB7IGVsOiB0aGlzLmVscy5jb250YWluZXIgfSB9XG4gICAgICAgIH0gKS5jb25zdHJ1Y3RvcigpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXNbIG1lc3NhZ2UgXS5zaG93TWVzc2FnZSggdHlwZSwgbWVzc2FnZSApXG5cbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL1RvYXN0JylcblxufSApLCB7IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vLi4vY2xpZW50L2pzL3ZpZXdzL19fcHJvdG9fXycpLCB7XG5cbiAgICBuYW1lOiAnVG9hc3RNZXNzYWdlJyxcblxuICAgIEljb25zOiB7XG4gICAgICAgIGVycm9yOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9saWIvZXJyb3InKSgpLFxuICAgICAgICBzdWNjZXNzOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9saWIvY2hlY2ttYXJrJykoKVxuICAgIH0sXG5cbiAgICBwb3N0UmVuZGVyKCkge1xuXG4gICAgICAgIHRoaXMub24oICdzaG93bicsICgpID0+IHRoaXMuc3RhdHVzID0gJ3Nob3duJyApXG4gICAgICAgIHRoaXMub24oICdoaWRkZW4nLCAoKSA9PiB0aGlzLnN0YXR1cyA9ICdoaWRkZW4nIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICByZXF1aXJlc0xvZ2luOiBmYWxzZSxcblxuICAgIHNob3dNZXNzYWdlKCB0eXBlLCBtZXNzYWdlICkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgID0+IHtcbiAgICAgICAgICAgIGlmKCAvc2hvdy8udGVzdCggdGhpcy5zdGF0dXMgKSApIHRoaXMudGVhcmRvd24oKVxuXG4gICAgICAgICAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHZlXG5cbiAgICAgICAgICAgIGlmKCB0eXBlICE9PSAnZXJyb3InICkgdGhpcy5lbHMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N1Y2Nlc3MnKVxuXG4gICAgICAgICAgICB0aGlzLmVscy5tZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5lbHMudGl0bGUudGV4dENvbnRlbnQgPSB0eXBlID09PSAnZXJyb3InID8gJ0Vycm9yJyA6ICdTdWNjZXNzJ1xuICAgICAgICAgICAgdGhpcy5zbHVycFRlbXBsYXRlKCB7IGluc2VydGlvbjogeyBlbDogdGhpcy5lbHMuaWNvbiB9LCB0ZW1wbGF0ZTogdHlwZSA9PT0gJ2Vycm9yJyA/IHRoaXMuSWNvbnMuZXJyb3IgOiB0aGlzLkljb25zLnN1Y2Nlc3MgfSApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ3Nob3dpbmcnXG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyggdHJ1ZSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gdGhpcy5oaWRlKCB0cnVlICkgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHRoaXMudGVhcmRvd24oKSApXG4gICAgICAgICAgICAuY2F0Y2goIHJlamVjdCApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICB0ZWFyZG93bigpIHtcbiAgICAgICAgaWYoIHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Y2Nlc3MnKSApIHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzdWNjZXNzJylcbiAgICAgICAgdGhpcy5lbHMubWVzc2FnZS50ZXh0Q29udGVudCA9ICcnXG4gICAgICAgIHRoaXMuZWxzLm1lc3NhZ2UudGl0bGUgPSAnJ1xuICAgICAgICBpZiggdGhpcy5lbHMuaWNvbi5maXJzdENoaWxkICkgdGhpcy5lbHMuaWNvbi5yZW1vdmVDaGlsZCggdGhpcy5lbHMuaWNvbi5maXJzdENoaWxkIClcbiAgICAgICAgdGhpcy5yZXNvbHV0aW9uKClcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL1RvYXN0TWVzc2FnZScpXG5cbn0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiBgPGRpdj48L2Rpdj5gXG4iLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IFxuYDxkaXYgY2xhc3M9XCJoaWRkZW5cIj5cbiAgICA8ZGl2IGRhdGEtanM9XCJpY29uXCI+PC9kaXY+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBkYXRhLWpzPVwidGl0bGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBkYXRhLWpzPVwibWVzc2FnZVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YCIsIm1vZHVsZS5leHBvcnRzID0gKHA9e30pID0+IGA8c3ZnIHZlcnNpb249XCIxLjFcIiBkYXRhLWpzPVwiJHtwLm5hbWUgfHwgJ2NoZWNrbWFyayd9XCIgY2xhc3M9XCJjaGVja21hcmtcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuXHQgd2lkdGg9XCI5Ny42MTlweFwiIGhlaWdodD1cIjk3LjYxOHB4XCIgdmlld0JveD1cIjAgMCA5Ny42MTkgOTcuNjE4XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDk3LjYxOSA5Ny42MTg7XCJcblx0IHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG48Zz5cblx0PHBhdGggZD1cIk05Ni45MzksMTcuMzU4TDgzLjk2OCw1Ljk1OWMtMC4zOTgtMC4zNTItMC45MjctMC41MzEtMS40NDktMC40OTRDODEuOTksNS41LDgxLjQ5Niw1Ljc0Myw4MS4xNDYsNi4xNDJMMzQuMSw1OS42ODhcblx0XHRMMTcuMzcyLDM3LjU0N2MtMC4zMTktMC40MjItMC43OTQtMC43MDEtMS4zMTktMC43NzNjLTAuNTI0LTAuMDc4LTEuMDU5LDAuMDY0LTEuNDgxLDAuMzg1TDAuNzk0LDQ3LjU2N1xuXHRcdGMtMC44ODEsMC42NjYtMS4wNTYsMS45Mi0wLjM5LDIuODAxbDMwLjk3NCw0MC45OTZjMC4zNjIsMC40NzksMC45MjIsMC43NzEsMS41MjIsMC43OTNjMC4wMjQsMCwwLjA0OSwwLDAuMDczLDBcblx0XHRjMC41NzQsMCwxLjEyMi0wLjI0NiwxLjUwMy0wLjY4bDYyLjY0NC03MS4yOTdDOTcuODUsMTkuMzUxLDk3Ljc2OSwxOC4wODYsOTYuOTM5LDE3LjM1OHpcIi8+XG48L2c+PC9zdmc+YFxuIiwibW9kdWxlLmV4cG9ydHMgPSAocD17fSkgPT4gYDxzdmcgdmVyc2lvbj1cIjEuMVwiIGRhdGEtanM9XCIke3AubmFtZSB8fCAnZXJyb3InfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgMTguOTc4IDE4Ljk3OFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOC45NzggMTguOTc4O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XHJcbjxnPlxyXG4gICAgPHBhdGggZD1cIk0xNi4wODgsMS42NzVjLTAuMTMzLTAuMTA0LTAuMzA2LTAuMTQ0LTAuNDctMC4xMDVjLTAuMDEzLDAuMDAyLTEuMjYxLDAuMjktMi41OTQsMC4yOVxyXG4gICAgICAgIGMtMS43ODgsMC0yLjc4OS0wLjQ3Ni0yLjk3NS0xLjQxNUM5Ljk5OSwwLjE5MSw5Ljc3OSwwLjAwNyw5LjUyMSwwYy0wLjI1Ny0wLjAwNy0wLjQ4NywwLjE2Ny0wLjU1LDAuNDE4XHJcbiAgICAgICAgQzguNzI3LDEuMzg2LDcuNzEsMS44NzcsNS45NSwxLjg3N2MtMS4zMzIsMC0yLjU3MS0wLjMwMi0yLjU4My0wLjMwNWMtMC4xNjYtMC4wNC0wLjM0LTAuMDA0LTAuNDc0LDAuMTAyXHJcbiAgICAgICAgQzIuNzYsMS43NzcsMi42ODEsMS45MzgsMi42ODEsMi4xMDh2NC44NjljMCwwLjA0LDAuMDA0LDAuMDc4LDAuMDEzLDAuMTE1YzAuMDU3LDEuNjQ3LDAuNjUsOC43MTQsNi41MjgsMTEuODIyXHJcbiAgICAgICAgYzAuMDgsMC4wNDMsMC4xNjksMC4wNjQsMC4yNTgsMC4wNjRjMC4wOTIsMCwwLjE4My0wLjAyMSwwLjI2Ni0wLjA2NmM1Ljc0LTMuMTM3LDYuNDQ1LTEwLjExNSw2LjUzMi0xMS43OTFcclxuICAgICAgICBjMC4wMTItMC4wNDYsMC4wMTktMC4wOTQsMC4wMTktMC4xNDRWMi4xMDhDMTYuMjk3LDEuOTM5LDE2LjIxOSwxLjc4LDE2LjA4OCwxLjY3NXogTTE1LjE5LDYuODU3XHJcbiAgICAgICAgYy0wLjAwNywwLjAzMS0wLjAxMiwwLjA2NC0wLjAxMywwLjA5N2MtMC4wNTMsMS4yOTgtMC41NzQsNy44MzItNS43MDEsMTAuODM4Yy01LjIxNS0yLjk2NS01LjY0Ni05LjUyNi01LjY4LTEwLjgzXHJcbiAgICAgICAgYzAtMC4wMjktMC4wMDQtMC4wNTgtMC4wMDktMC4wODVWMi43ODRDNC4zMjIsMi44NzcsNS4xMTIsMi45ODIsNS45NSwyLjk4MmMxLjkxMSwwLDIuOTY1LTAuNTQsMy41MzctMS4yMDhcclxuICAgICAgICBjMC41NTMsMC42NjEsMS41OTksMS4xOTEsMy41MzYsMS4xOTFjMC44MzksMCwxLjYzMS0wLjEwMSwyLjE2Ni0wLjE4OEwxNS4xOSw2Ljg1N0wxNS4xOSw2Ljg1N3pcIi8+XHJcbiAgICA8cG9seWdvbiBwb2ludHM9XCIxMC4yNDEsMTEuMjM3IDEwLjUyOSw1LjMxMSA4LjQ0OSw1LjMxMSA4Ljc1LDExLjIzNyBcdFx0XCIvPlxyXG4gICAgPHBhdGggZD1cIk05LjQ5NiwxMS44OTFjLTAuNjk0LDAtMS4xNzgsMC40OTgtMS4xNzgsMS4xODljMCwwLjY4MiwwLjQ3MSwxLjE5MSwxLjE3OCwxLjE5MVxyXG4gICAgICAgIGMwLjcwNiwwLDEuMTY0LTAuNTEsMS4xNjQtMS4xOTFDMTAuNjQ3LDEyLjM4OSwxMC4xODksMTEuODkxLDkuNDk2LDExLjg5MXpcIi8+XHJcbjwvZz48L3N2Zz5gXHJcbiJdfQ==
