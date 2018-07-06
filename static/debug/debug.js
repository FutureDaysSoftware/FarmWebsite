(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
	Header: require('./models/Header'),
	Home: require('./models/Home'),
	TheBlog: require('./models/TheBlog'),
	User: require('./models/User')
};

},{"./models/Header":8,"./models/Home":9,"./models/TheBlog":10,"./models/User":11}],2:[function(require,module,exports){
'use strict';

module.exports = {
	AboutUs: require('./views/templates/AboutUs'),
	Footer: require('./views/templates/Footer'),
	Header: require('./views/templates/Header'),
	Home: require('./views/templates/Home'),
	OurOfferings: require('./views/templates/OurOfferings'),
	TheBlog: require('./views/templates/TheBlog'),
	Toast: require('./views/templates/Toast'),
	WhereToFindUs: require('./views/templates/WhereToFindUs')
};

},{"./views/templates/AboutUs":24,"./views/templates/Footer":25,"./views/templates/Header":26,"./views/templates/Home":27,"./views/templates/OurOfferings":28,"./views/templates/TheBlog":29,"./views/templates/Toast":168,"./views/templates/WhereToFindUs":30}],3:[function(require,module,exports){
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

},{"./views/AboutUs":15,"./views/Footer":16,"./views/Header":17,"./views/Home":18,"./views/OurOfferings":19,"./views/TheBlog":20,"./views/Toast":166,"./views/WhereToFindUs":21}],4:[function(require,module,exports){
'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        var isNested = datum.range === 'List' || (0, _typeof3.default)(datum.range) === 'object';

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

        var input = datum.fk ? '<div data-view="typeAhead" data-name="' + datum.fk + '"></div>' : datum.range === 'Text' ? '<textarea data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" rows="3">' + value + '</textarea>' : datum.range === 'List' || datum.range === 'View' || (0, _typeof3.default)(datum.range) === 'object' ? '<div data-js="' + datum.name + '" data-name="' + datum.name + '"></div>' : '<input type="' + this.RangeToInputType[datum.range] + '" data-js="' + datum.name + '" placeholder="' + (datum.label || '') + '" value="' + value + '" />';

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
        return (0, _apply2.default)(this.Icons[name], this, [opts]);
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


    /* Eventually put the bucket name in the config file */
    ImageSrc: function ImageSrc(name) {
        return 'https://storage.googleapis.com/icelandic-heritage-chickens/' + name;
    },
    Range: function Range(int) {
        return (0, _from2.default)(Array(int).keys());
    },


    RangeToInputType: {
        Email: 'email',
        Password: 'password',
        String: 'text'
    }

};

},{"babel-runtime/core-js/array/from":34,"babel-runtime/core-js/reflect/apply":41,"babel-runtime/helpers/typeof":48}],5:[function(require,module,exports){
"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _create2.default)((0, _assign2.default)({}, require('../../lib/MyObject'), {

    Request: {
        constructor: function constructor(data) {
            var _this = this;

            var req = new XMLHttpRequest();

            if (data.onProgress) req.addEventListener("progress", function (e) {
                return data.onProgress(e.lengthComputable ? Math.floor(e.loaded / e.total * 100) : 0);
            });

            return new _promise2.default(function (resolve, reject) {

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
        return (0, _create2.default)(this.Request, {}).constructor(data);
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

},{"../../lib/MyObject":33,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/create":37,"babel-runtime/core-js/promise":40}],6:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _create2.default)({
    constructor: function constructor() {
        this.range = document.createRange();
        this.range.selectNode(document.getElementsByTagName("div").item(0));
        return this;
    },
    create: function create(name, opts) {
        var lower = name;
        name = (name.charAt(0).toUpperCase() + name.slice(1)).replace('-', '');

        return (0, _create2.default)(this.Views[name], (0, _assign2.default)({
            Header: { value: this.Header },
            Toast: { value: this.Toast },
            name: { value: name },
            factory: { value: this },
            range: { value: this.range },
            template: { value: this.Templates[name], writable: true },
            model: { value: this.Models[name] ? (0, _create2.default)(this.Models[name]) : {} },
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

},{"../.ModelMap":1,"../.TemplateMap":2,"../.ViewMap":3,"../models/User":11,"../views/Header":17,"../views/Toast":166,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/create":37}],7:[function(require,module,exports){
'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./polyfill');

var User = require('./models/User'),
    router = require('./router'),
    onLoad = new _promise2.default(function (resolve) {
    return window.onload = function () {
        return resolve();
    };
});

User.on('logout', function () {
    return router.onLogout();
});

_promise2.default.all([User.get(), onLoad]).then(function () {
    return router.initialize();
}).catch(function (e) {
    return console.log('Error initializing client -> ' + (e.stack || e));
});

},{"./models/User":11,"./polyfill":13,"./router":14,"babel-runtime/core-js/promise":40}],8:[function(require,module,exports){
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _extends3.default)({}, require('./__proto__.js'), {
    data: [{ name: 'about-us', label: 'About Us' }, { name: 'where-to-find-us', label: 'Where To Find Us' }, { name: 'future-days-farm', label: 'Future Days Farm' }, { name: 'the-blog', label: 'The Blog' }, { name: 'our-offerings', label: 'Our Offerings' }]
});

},{"./__proto__.js":12,"babel-runtime/helpers/extends":46}],9:[function(require,module,exports){
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _extends3.default)({}, require('./__proto__.js'), {
	data: [{ filename: 'Jam.jpg', alt: 'Jam', date: 'Nov. 12', caption: 'Wild Berry Jam' }, { filename: 'Beets.jpg', alt: 'Beets', date: 'Oct. 4', caption: 'We Got The Beets' }, { filename: 'Squash.jpg', alt: 'Squash', date: 'Oct. 13', caption: "It's Time For Squash" }, { filename: 'Vine.jpg', alt: 'Vines', date: 'August. 19', caption: 'Chicken In The Vine' }, { filename: 'Carrots.png', alt: 'Carrots', date: 'July. 9', caption: 'Cute Misfit Carrots' }, { filename: 'Kale.jpg', alt: 'Kale', date: 'June. 7', caption: 'First Kale Of 2017' }]
});

},{"./__proto__.js":12,"babel-runtime/helpers/extends":46}],10:[function(require,module,exports){
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _extends3.default)({}, require('./__proto__.js'), {
	data: [{ filename: 'Jam.jpg', alt: 'Jam', date: 'Nov. 12', caption: 'Wild Berry Jam' }, { filename: 'Beets.jpg', alt: 'Beets', date: 'Oct. 4', caption: 'We Got The Beets' }, { filename: 'Squash.jpg', alt: 'Squash', date: 'Oct. 13', caption: "It's Time For Squash" }, { filename: 'Vine.jpg', alt: 'Vines', date: 'August. 19', caption: 'Chicken In The Vine' }, { filename: 'Carrots.png', alt: 'Carrots', date: 'July. 9', caption: 'Cute Misfit Carrots' }, { filename: 'Kale.jpg', alt: 'Kale', date: 'June. 7', caption: 'First Kale Of 2017' }, { filename: 'Jam.jpg', alt: 'Jam', date: 'Nov. 12', caption: 'Wild Berry Jam' }, { filename: 'Beets.jpg', alt: 'Beets', date: 'Oct. 4', caption: 'We Got The Beets' }, { filename: 'Squash.jpg', alt: 'Squash', date: 'Oct. 13', caption: "It's Time For Squash" }]
});

},{"./__proto__.js":12,"babel-runtime/helpers/extends":46}],11:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _create2.default)((0, _assign2.default)({}, require('./__proto__.js'), {
    isLoggedIn: function isLoggedIn() {
        return Boolean(this.data && this.data.id);
    },
    logout: function logout() {
        document.cookie = 'hzy=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        this.data = {};
        this.emit('logout');
    }
}), { resource: { value: 'me' } });

},{"./__proto__.js":12,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/create":37}],12:[function(require,module,exports){
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _Object$assign2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('../../../lib/Model'), require('events').EventEmitter.prototype, (_Object$assign2 = {

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
                    (0, _keys2.default)(_this.store).forEach(function (attr) {
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

            return _promise2.default.resolve(_this.data);
        });
    },
    git: function git(attr) {
        return this.data[attr];
    },
    get: function get() {
        var _this2 = this;

        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { query: {} };

        if (opts.query || this.pagination) (0, _assign2.default)(opts.query, this.pagination);

        return this.Xhr({ method: opts.method || 'get', resource: this.resource, headers: this.headers || {}, qs: opts.query ? (0, _stringify2.default)(opts.query) : undefined }).then(function (response) {

            if (Array.isArray(_this2.data)) {
                _this2.data = _this2.data.concat(opts.parse ? opts.parse(response, opts.storeBy) : response);
            } else {
                if (opts.storeBy) _this2._resetStore(opts.storeBy);
                _this2.data = _this2.parse ? _this2.parse(response, opts.storeBy) : response;
                if (opts.storeBy) _this2._store();
            }

            _this2.emit('got');

            return _promise2.default.resolve(response);
        });
    },
    getCount: function getCount() {
        var _this3 = this;

        return this.Xhr({ method: 'get', resource: this.resource, headers: this.headers || {}, qs: (0, _stringify2.default)({ countOnly: true }) }).then(function (_ref) {
            var result = _ref.result;

            _this3.meta.count = result;
            return _promise2.default.resolve(result);
        });
    }
}, (0, _defineProperty3.default)(_Object$assign2, 'git', function git(attr) {
    return this.data[attr];
}), (0, _defineProperty3.default)(_Object$assign2, 'patch', function patch(id, data) {
    var _this4 = this;

    return this.Xhr({ method: 'patch', id: id, resource: this.resource, headers: this.headers || {}, data: (0, _stringify2.default)(data || this.data) }).then(function (response) {

        if (Array.isArray(_this4.data)) {
            _this4.data = _this4.data ? _this4.data.concat(response) : [response];
            if (_this4.store) (0, _keys2.default)(_this4.store).forEach(function (attr) {
                return _this4._store(response, attr);
            });
        } else {
            _this4.data = response;
        }

        return _promise2.default.resolve(response);
    });
}), (0, _defineProperty3.default)(_Object$assign2, '_put', function _put(keyValue, data) {
    var _this5 = this;

    var item = this.data.find(function (datum) {
        return datum[_this5.meta.key] == keyValue;
    });
    if (item) item = data;
    return this;
}), (0, _defineProperty3.default)(_Object$assign2, 'put', function put(id, data) {
    var _this6 = this;

    return this.Xhr({ method: 'put', id: id, resource: this.resource, headers: this.headers || {}, data: (0, _stringify2.default)(data) }).then(function (response) {

        if (Array.isArray(_this6.data)) {} else {
            _this6.data = response;
        }

        return _promise2.default.resolve(response);
    });
}), (0, _defineProperty3.default)(_Object$assign2, 'post', function post(model) {
    var _this7 = this;

    return this.Xhr({ method: 'post', resource: this.resource, headers: this.headers || {}, data: (0, _stringify2.default)(model || this.data) }).then(function (response) {

        if (Array.isArray(_this7.data)) {
            _this7.data = _this7.data ? _this7.data.concat(response) : [response];
            if (_this7.store) (0, _keys2.default)(_this7.store).forEach(function (attr) {
                return _this7._store(response, attr);
            });
        } else {
            _this7.data = response;
        }

        return _promise2.default.resolve(response);
    });
}), (0, _defineProperty3.default)(_Object$assign2, 'remove', function remove(item) {
    var index = this.data.findIndex(function (datum) {
        return (0, _stringify2.default)(datum) === (0, _stringify2.default)(item);
    });

    if (index === -1) return;

    this.data.splice(index, 1);
}), (0, _defineProperty3.default)(_Object$assign2, 'set', function set(attr, value) {
    this.data[attr] = value;
    this.emit(attr + 'Changed');
}), (0, _defineProperty3.default)(_Object$assign2, 'validate', function validate(data) {
    var _this8 = this;

    var valid = true;

    (0, _keys2.default)(data).forEach(function (name) {
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
}), (0, _defineProperty3.default)(_Object$assign2, 'validateDatum', function validateDatum(attr, val) {
    return attr.validate.call(this, val.trim());
}), _Object$assign2));

},{"../../../lib/Model":31,"../Xhr":5,"babel-runtime/core-js/json/stringify":35,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/keys":39,"babel-runtime/core-js/promise":40,"babel-runtime/helpers/defineProperty":45,"events":164}],13:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof _assign2.default != 'function') {
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

},{"babel-runtime/core-js/object/assign":36,"smoothscroll-polyfill":165}],14:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _create2.default)((0, _assign2.default)({}, require('../../lib/MyObject'), {

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

        _promise2.default.all((0, _keys2.default)(this.views).map(function (view) {
            return _this2.views[view].hide();
        })).then(function () {

            _this2.currentView = view;

            if (_this2.views[view]) return _this2.views[view].onNavigation(path);

            return _promise2.default.resolve(_this2.views[view] = _this2.ViewFactory.create(view, { insertion: { el: _this2.contentContainer }, path: path }).on('navigate', function (route, options) {
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

        _promise2.default.all((0, _keys2.default)(this.views).map(function (view) {
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

},{"../../lib/MyObject":33,"./.ViewMap":3,"./factory/View":6,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/create":37,"babel-runtime/core-js/object/keys":39,"babel-runtime/core-js/promise":40}],15:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('./__proto__'), {});

},{"./__proto__":22,"babel-runtime/core-js/object/assign":36}],16:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('./__proto__'), {
    postRender: function postRender() {
        return this;
    },


    template: require('./templates/Footer')

});

},{"./__proto__":22,"./templates/Footer":25,"babel-runtime/core-js/object/assign":36}],17:[function(require,module,exports){
'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _create2.default)((0, _assign2.default)({}, require('./__proto__'), {

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
        this.emit('navigate', '/' + event.target.getAttribute('data-name'));
        [].concat((0, _toConsumableArray3.default)(event.target.parentElement.children)).forEach(function (header) {
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

},{"../models/Header":8,"../models/User":11,"./__proto__":22,"./templates/Header":26,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/create":37,"babel-runtime/helpers/toConsumableArray":47}],18:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('./__proto__'), {});

},{"./__proto__":22,"babel-runtime/core-js/object/assign":36}],19:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('./__proto__'), {});

},{"./__proto__":22,"babel-runtime/core-js/object/assign":36}],20:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('./__proto__'), {});

},{"./__proto__":22,"babel-runtime/core-js/object/assign":36}],21:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('./__proto__'), {});

},{"./__proto__":22,"babel-runtime/core-js/object/assign":36}],22:[function(require,module,exports){
'use strict';

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('../../../lib/MyObject'), require('events').EventEmitter.prototype, {
    $: function $(el, selector) {
        return (0, _from2.default)(el.querySelectorAll(selector));
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
            (0, _assign2.default)(this.events, opts.events);delete opts.events;
        }
        (0, _assign2.default)(this, opts);

        this.subviewElements = [];

        if (this.requiresLogin && !this.user.isLoggedIn()) return this.handleLogin();
        if (this.user && !this.isAllowed(this.user)) return this.scootAway();

        return this.initialize().render();
    },
    delegateEvents: function delegateEvents(key, el) {
        var _this2 = this;

        var type = (0, _typeof3.default)(this.events[key]);

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
            return _promise2.default.resolve();
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
        var rv = (0, _assign2.default)(this.user ? { user: this.user.data } : {});

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
            return _promise2.default.resolve(_this6.hiding = false);
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

        if (this.isHidden(el)) return _promise2.default.resolve();

        var time = new Date().getTime(),
            hash = time + 'Hide';

        return new _promise2.default(function (resolve) {
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
        return (0, _assign2.default)(this, { els: {}, slurp: { attr: 'data-js', view: 'data-view', name: 'data-name', img: 'data-src' }, views: {} });
    },
    insertToDom: function insertToDom(fragment, options) {
        var insertion = typeof options.insertion === 'function' ? options.insertion() : options.insertion;

        insertion.method === 'insertBefore' ? insertion.el.parentNode.insertBefore(fragment, insertion.el) : insertion.el[insertion.method || 'appendChild'](fragment);
    },
    isAllowed: function isAllowed(user) {
        if (!this.requiresRole) return true;

        var userRoles = new _set2.default(user.data.roles);

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
        if (this.data) this.model = (0, _create2.default)(this.Model, {}).constructor(this.data);

        this.slurpTemplate({
            insertion: this.insertion || { el: document.body },
            isView: true,
            storeFragment: this.storeFragment,
            template: (0, _apply2.default)(this.template, this.TemplateContext, [this.getTemplateOptions()])
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

            if (_this8.Views && _this8.Views[obj.view]) opts = (0, _typeof3.default)(_this8.Views[obj.view]) === "object" ? _this8.Views[obj.view] : (0, _apply2.default)(_this8.Views[obj.view], _this8, []);
            if (_this8.Views && _this8.Views[name]) opts = (0, _typeof3.default)(_this8.Views[name]) === "object" ? _this8.Views[name] : (0, _apply2.default)(_this8.Views[name], _this8, []);

            _this8.views[name] = _this8.factory.create(obj.view, (0, _assign2.default)({ insertion: { el: obj.el, method: 'insertBefore' } }, opts));

            if (_this8.events.views) {
                if (_this8.events.views[name]) _this8.events.views[name].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return (0, _apply2.default)(arr[1], _this8, [eventData]);
                    });
                });else if (_this8.events.views[obj.view]) _this8.events.views[obj.view].forEach(function (arr) {
                    return _this8.views[name].on(arr[0], function (eventData) {
                        return (0, _apply2.default)(arr[1], _this8, [eventData]);
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

        return new _promise2.default(function (resolve) {
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
        (0, _from2.default)(fragment.querySelectorAll(selector + ', ' + viewSelector + ', ' + imgSelector)).forEach(function (el) {
            if (el.hasAttribute(_this11.slurp.attr)) {
                _this11.slurpEl(el);
            } else if (el.hasAttribute(_this11.slurp.img)) _this11.fadeInImage(el);else if (el.hasAttribute(_this11.slurp.view)) {
                _this11.subviewElements.push({ el: el, view: el.getAttribute(_this11.slurp.view), name: el.getAttribute(_this11.slurp.name) });
            }
        });

        if (options.storeFragment) return (0, _assign2.default)(this, { fragment: fragment });

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

},{"../../../lib/MyObject":33,"../TemplateContext":4,"../Xhr":5,"../models/__proto__":12,"./lib/OptimizedResize":23,"babel-runtime/core-js/array/from":34,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/create":37,"babel-runtime/core-js/promise":40,"babel-runtime/core-js/reflect/apply":41,"babel-runtime/core-js/set":42,"babel-runtime/helpers/typeof":48,"events":164}],23:[function(require,module,exports){
'use strict';

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _create2.default)({
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

},{"babel-runtime/core-js/object/create":37}],24:[function(require,module,exports){
"use strict";

module.exports = function (_ref) {
    var model = _ref.model;

    return "<div>about us</div>";
};

},{}],25:[function(require,module,exports){
"use strict";

module.exports = function () {
    return "<footer>\n    <div>future days farm</div>\n    <div> \n        2123 Tiny Road<br/>Town Name, Michigan 33344<br/><br/>\n        <a href=\"mailto:Info@FutureDaysFarm.com\">Info@FutureDaysFarm.com</a><br/>\n        (333) 323-8899\n    </div><br/>\n    <div>Copyright " + new Date().getFullYear() + " FutureDays Software</div>\n    </footer>";
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = function (_ref) {
    var model = _ref.model;

    var navOptions = model.map(function (datum) {
        return '<li data-js=\'navList\' data-name=\'' + datum.name + '\'>' + datum.label + '</li>';
    }).join('');
    return '<nav>' + navOptions + '</nav>';
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = function (_ref) {
	var _this = this;

	var model = _ref.model;

	var images = model.reduce(function (memo, image) {
		var markup = '<div>\n\t    \t<img data-src=\'' + _this.ImageSrc(image.filename) + '\' alt=\'' + image.alt + '\'/> \n\t    \t<div>' + image.date + '<br/>' + image.caption + '</div>\n\t  \t</div>';
		return memo + markup;
	}, '');
	return '<div>\n\t<img data-src=\'' + this.ImageSrc('FutureDaysFarmLogo.svg') + '\' alt=\'Logo\'/> \n\t<div>Welcome Headline</div>\n\t<div>allegan county, michigan</div>\n\t<div>Praesent laoreet ornare ligula, ac accumsan turpis sagittis at.  Integer auctor egestas eleifend. Etiam luctus \n\t\tmattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus.  Praesent sollicitudin \n\t\tvestibulum felis, ut sodales enim.</div>\n\t<div class=\'calendar-images\'>' + images + '</div>\n\t</div>';
};

},{}],28:[function(require,module,exports){
"use strict";

module.exports = function (_ref) {
    var model = _ref.model;

    return "<div>our offerings</div>";
};

},{}],29:[function(require,module,exports){
'use strict';

module.exports = function (_ref) {
	var _this = this;

	var model = _ref.model;

	var images = model.reduce(function (memo, image) {
		var markup = '<div>\n\t    \t<img data-src=\'' + _this.ImageSrc(image.filename) + '\' alt=\'' + image.alt + '\'/> \n\t    \t<div>' + image.date + '<br/>' + image.caption + '</div>\n\t  \t</div>';
		return memo + markup;
	}, '');
	return '<div>\n    <h1>Recipes and News from the Farm</h1>\n    <p>Praesent laoreet ornare ligula, ac accumsan turpis sagittis at. Integer auctor egestas eleifend. Etiam luctus mattis justo, vitae fermentum libero euismod lacinia. Proin at consequat risus. Praesent sollicitudin vestibulum felis, ut sodales enim.</p>\n    <div class=\'calendar-images\'>' + images + '</div>\n    </div>';
};

},{}],30:[function(require,module,exports){
"use strict";

module.exports = function (_ref) {
    var model = _ref.model;

    return "<div>where to find us</div>";
};

},{}],31:[function(require,module,exports){
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _assign2.default)({}, require('./MyObject'), {
    CreateDefault: function CreateDefault() {
        return this.reducer(this.attributes, function (attr) {
            return (0, _defineProperty3.default)({}, attr.name, typeof attr.default === 'function' ? attr.default() : attr.default);
        });
    },


    attributes: [],

    data: {},

    constructor: function constructor() {
        var _this = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        (0, _assign2.default)(this, { store: {}, data: data }, opts);

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
        var attr = (0, _keys2.default)(opts)[0],
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

},{"./MyObject":33,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/keys":39,"babel-runtime/helpers/defineProperty":45}],32:[function(require,module,exports){
"use strict";

module.exports = function (err) {
  console.log(err.stack || err);
};

},{}],33:[function(require,module,exports){
'use strict';

var _apply = require('babel-runtime/core-js/reflect/apply');

var _apply2 = _interopRequireDefault(_apply);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    capitalizeFirstLetter: function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getIntRange: function getIntRange(int) {
        return (0, _from2.default)(Array(int).keys());
    },
    getRandomInclusiveInteger: function getRandomInclusiveInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    omit: function omit(obj, keys) {
        return (0, _keys2.default)(obj).filter(function (key) {
            return !keys.includes(key);
        }).reduce(function (memo, key) {
            return (0, _assign2.default)(memo, (0, _defineProperty3.default)({}, key, obj[key]));
        }, {});
    },
    pick: function pick(obj, keys) {
        return keys.reduce(function (memo, key) {
            return (0, _assign2.default)(memo, (0, _defineProperty3.default)({}, key, obj[key]));
        }, {});
    },
    reducer: function reducer(arr, fn) {
        return arr.reduce(function (memo, item, i) {
            return (0, _assign2.default)(memo, fn(item, i));
        }, {});
    },
    shuffleArray: function shuffleArray(arr) {
        var _this = this;

        var rv = (0, _from2.default)(arr);

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
        return new _promise2.default(function (resolve, reject) {
            return (0, _apply2.default)(fun, thisArg || undefined, args.concat(function (e) {
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

},{"./MyError":32,"babel-runtime/core-js/array/from":34,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/keys":39,"babel-runtime/core-js/promise":40,"babel-runtime/core-js/reflect/apply":41,"babel-runtime/helpers/defineProperty":45}],34:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":49}],35:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":50}],36:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":51}],37:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":52}],38:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":53}],39:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":54}],40:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":55}],41:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/reflect/apply"), __esModule: true };
},{"core-js/library/fn/reflect/apply":56}],42:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/set"), __esModule: true };
},{"core-js/library/fn/set":57}],43:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":58}],44:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":59}],45:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":38}],46:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":36}],47:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":34}],48:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":43,"../core-js/symbol/iterator":44}],49:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":74,"../../modules/es6.array.from":144,"../../modules/es6.string.iterator":154}],50:[function(require,module,exports){
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../modules/_core":74}],51:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":74,"../../modules/es6.object.assign":146}],52:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};

},{"../../modules/_core":74,"../../modules/es6.object.create":147}],53:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":74,"../../modules/es6.object.define-property":148}],54:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":74,"../../modules/es6.object.keys":149}],55:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":74,"../modules/es6.object.to-string":150,"../modules/es6.promise":151,"../modules/es6.string.iterator":154,"../modules/es7.promise.finally":156,"../modules/es7.promise.try":157,"../modules/web.dom.iterable":163}],56:[function(require,module,exports){
require('../../modules/es6.reflect.apply');
module.exports = require('../../modules/_core').Reflect.apply;

},{"../../modules/_core":74,"../../modules/es6.reflect.apply":152}],57:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
require('../modules/es7.set.of');
require('../modules/es7.set.from');
module.exports = require('../modules/_core').Set;

},{"../modules/_core":74,"../modules/es6.object.to-string":150,"../modules/es6.set":153,"../modules/es6.string.iterator":154,"../modules/es7.set.from":158,"../modules/es7.set.of":159,"../modules/es7.set.to-json":160,"../modules/web.dom.iterable":163}],58:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":74,"../../modules/es6.object.to-string":150,"../../modules/es6.symbol":155,"../../modules/es7.symbol.async-iterator":161,"../../modules/es7.symbol.observable":162}],59:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":141,"../../modules/es6.string.iterator":154,"../../modules/web.dom.iterable":163}],60:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],61:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],62:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],63:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":94}],64:[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":84}],65:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":132,"./_to-iobject":134,"./_to-length":135}],66:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":68,"./_ctx":76,"./_iobject":91,"./_to-length":135,"./_to-object":136}],67:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":93,"./_is-object":94,"./_wks":142}],68:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":67}],69:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":70,"./_wks":142}],70:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],71:[function(require,module,exports){
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_an-instance":62,"./_ctx":76,"./_descriptors":78,"./_for-of":84,"./_iter-define":97,"./_iter-step":99,"./_meta":102,"./_object-create":106,"./_object-dp":107,"./_redefine-all":121,"./_set-species":125,"./_validate-collection":139}],72:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_array-from-iterable":64,"./_classof":69}],73:[function(require,module,exports){
'use strict';
var global = require('./_global');
var $export = require('./_export');
var meta = require('./_meta');
var fails = require('./_fails');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var setToStringTag = require('./_set-to-string-tag');
var dP = require('./_object-dp').f;
var each = require('./_array-methods')(0);
var DESCRIPTORS = require('./_descriptors');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_an-instance":62,"./_array-methods":66,"./_descriptors":78,"./_export":82,"./_fails":83,"./_for-of":84,"./_global":85,"./_hide":87,"./_is-object":94,"./_meta":102,"./_object-dp":107,"./_redefine-all":121,"./_set-to-string-tag":126}],74:[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],75:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":107,"./_property-desc":120}],76:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":60}],77:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],78:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":83}],79:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":85,"./_is-object":94}],80:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],81:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":112,"./_object-keys":115,"./_object-pie":116}],82:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":74,"./_ctx":76,"./_global":85,"./_hide":87}],83:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],84:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":63,"./_ctx":76,"./_is-array-iter":92,"./_iter-call":95,"./_to-length":135,"./core.get-iterator-method":143}],85:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],86:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],87:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":78,"./_object-dp":107,"./_property-desc":120}],88:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":85}],89:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":78,"./_dom-create":79,"./_fails":83}],90:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],91:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":70}],92:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":100,"./_wks":142}],93:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":70}],94:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],95:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":63}],96:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":87,"./_object-create":106,"./_property-desc":120,"./_set-to-string-tag":126,"./_wks":142}],97:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":82,"./_has":86,"./_hide":87,"./_iter-create":96,"./_iterators":100,"./_library":101,"./_object-gpo":113,"./_redefine":122,"./_set-to-string-tag":126,"./_wks":142}],98:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":142}],99:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],100:[function(require,module,exports){
module.exports = {};

},{}],101:[function(require,module,exports){
module.exports = true;

},{}],102:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":83,"./_has":86,"./_is-object":94,"./_object-dp":107,"./_uid":138}],103:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":70,"./_global":85,"./_task":131}],104:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":60}],105:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":83,"./_iobject":91,"./_object-gops":112,"./_object-keys":115,"./_object-pie":116,"./_to-object":136}],106:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":63,"./_dom-create":79,"./_enum-bug-keys":80,"./_html":88,"./_object-dps":108,"./_shared-key":127}],107:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":63,"./_descriptors":78,"./_ie8-dom-define":89,"./_to-primitive":137}],108:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":63,"./_descriptors":78,"./_object-dp":107,"./_object-keys":115}],109:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":78,"./_has":86,"./_ie8-dom-define":89,"./_object-pie":116,"./_property-desc":120,"./_to-iobject":134,"./_to-primitive":137}],110:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":111,"./_to-iobject":134}],111:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":80,"./_object-keys-internal":114}],112:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],113:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":86,"./_shared-key":127,"./_to-object":136}],114:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":65,"./_has":86,"./_shared-key":127,"./_to-iobject":134}],115:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":80,"./_object-keys-internal":114}],116:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],117:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":74,"./_export":82,"./_fails":83}],118:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],119:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":63,"./_is-object":94,"./_new-promise-capability":104}],120:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],121:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":87}],122:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":87}],123:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_a-function":60,"./_ctx":76,"./_export":82,"./_for-of":84}],124:[function(require,module,exports){
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":82}],125:[function(require,module,exports){
'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_core":74,"./_descriptors":78,"./_global":85,"./_object-dp":107,"./_wks":142}],126:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":86,"./_object-dp":107,"./_wks":142}],127:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":128,"./_uid":138}],128:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":85}],129:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":60,"./_an-object":63,"./_wks":142}],130:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":77,"./_to-integer":133}],131:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":70,"./_ctx":76,"./_dom-create":79,"./_global":85,"./_html":88,"./_invoke":90}],132:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":133}],133:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],134:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":77,"./_iobject":91}],135:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":133}],136:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":77}],137:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":94}],138:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],139:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":94}],140:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":74,"./_global":85,"./_library":101,"./_object-dp":107,"./_wks-ext":141}],141:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":142}],142:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":85,"./_shared":128,"./_uid":138}],143:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":69,"./_core":74,"./_iterators":100,"./_wks":142}],144:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":75,"./_ctx":76,"./_export":82,"./_is-array-iter":92,"./_iter-call":95,"./_iter-detect":98,"./_to-length":135,"./_to-object":136,"./core.get-iterator-method":143}],145:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":61,"./_iter-define":97,"./_iter-step":99,"./_iterators":100,"./_to-iobject":134}],146:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":82,"./_object-assign":105}],147:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":82,"./_object-create":106}],148:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":78,"./_export":82,"./_object-dp":107}],149:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":115,"./_object-sap":117,"./_to-object":136}],150:[function(require,module,exports){

},{}],151:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":60,"./_an-instance":62,"./_classof":69,"./_core":74,"./_ctx":76,"./_export":82,"./_for-of":84,"./_global":85,"./_is-object":94,"./_iter-detect":98,"./_library":101,"./_microtask":103,"./_new-promise-capability":104,"./_perform":118,"./_promise-resolve":119,"./_redefine-all":121,"./_set-species":125,"./_set-to-string-tag":126,"./_species-constructor":129,"./_task":131,"./_wks":142}],152:[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_a-function":60,"./_an-object":63,"./_export":82,"./_fails":83,"./_global":85}],153:[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection":73,"./_collection-strong":71,"./_validate-collection":139}],154:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":97,"./_string-at":130}],155:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":63,"./_descriptors":78,"./_enum-keys":81,"./_export":82,"./_fails":83,"./_global":85,"./_has":86,"./_hide":87,"./_is-array":93,"./_is-object":94,"./_library":101,"./_meta":102,"./_object-create":106,"./_object-dp":107,"./_object-gopd":109,"./_object-gopn":111,"./_object-gopn-ext":110,"./_object-gops":112,"./_object-keys":115,"./_object-pie":116,"./_property-desc":120,"./_redefine":122,"./_set-to-string-tag":126,"./_shared":128,"./_to-iobject":134,"./_to-primitive":137,"./_uid":138,"./_wks":142,"./_wks-define":140,"./_wks-ext":141}],156:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":74,"./_export":82,"./_global":85,"./_promise-resolve":119,"./_species-constructor":129}],157:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":82,"./_new-promise-capability":104,"./_perform":118}],158:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":123}],159:[function(require,module,exports){
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":124}],160:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_collection-to-json":72,"./_export":82}],161:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":140}],162:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":140}],163:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":85,"./_hide":87,"./_iterators":100,"./_wks":142,"./es6.array.iterator":145}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _create2.default)((0, _assign2.default)({}, require('../../../client/js/views/__proto__'), {

    ToastMessage: require('./ToastMessage'),

    name: 'Toast',

    postRender: function postRender() {
        this.messages = {};

        return this;
    },


    requiresLogin: false,

    createMessage: function createMessage(type, message) {
        if (!this.messages[message]) this.messages[message] = (0, _create2.default)(this.ToastMessage, {
            insertion: { value: { el: this.els.container } }
        }).constructor();

        return this.messages[message].showMessage(type, message);
    },


    template: require('./templates/Toast')

}), {});

},{"../../../client/js/views/__proto__":22,"./ToastMessage":167,"./templates/Toast":168,"babel-runtime/core-js/object/assign":36,"babel-runtime/core-js/object/create":37}],167:[function(require,module,exports){
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

},{"../../../client/js/views/__proto__":22,"./templates/ToastMessage":169,"./templates/lib/checkmark":170,"./templates/lib/error":171}],168:[function(require,module,exports){
module.exports = () => `<div></div>`

},{}],169:[function(require,module,exports){
module.exports = () => 
`<div class="hidden">
    <div data-js="icon"></div>
    <div>
        <div data-js="title"></div>
        <div data-js="message"></div>
    </div>
</div>`
},{}],170:[function(require,module,exports){
module.exports = (p={}) => `<svg version="1.1" data-js="${p.name || 'checkmark'}" class="checkmark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="97.619px" height="97.618px" viewBox="0 0 97.619 97.618" style="enable-background:new 0 0 97.619 97.618;"
	 xml:space="preserve">
<g>
	<path d="M96.939,17.358L83.968,5.959c-0.398-0.352-0.927-0.531-1.449-0.494C81.99,5.5,81.496,5.743,81.146,6.142L34.1,59.688
		L17.372,37.547c-0.319-0.422-0.794-0.701-1.319-0.773c-0.524-0.078-1.059,0.064-1.481,0.385L0.794,47.567
		c-0.881,0.666-1.056,1.92-0.39,2.801l30.974,40.996c0.362,0.479,0.922,0.771,1.522,0.793c0.024,0,0.049,0,0.073,0
		c0.574,0,1.122-0.246,1.503-0.68l62.644-71.297C97.85,19.351,97.769,18.086,96.939,17.358z"/>
</g></svg>`

},{}],171:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvLk1vZGVsTWFwLmpzIiwiY2xpZW50L2pzLy5UZW1wbGF0ZU1hcC5qcyIsImNsaWVudC9qcy8uVmlld01hcC5qcyIsImNsaWVudC9qcy9UZW1wbGF0ZUNvbnRleHQuanMiLCJjbGllbnQvanMvWGhyLmpzIiwiY2xpZW50L2pzL2ZhY3RvcnkvVmlldy5qcyIsImNsaWVudC9qcy9tYWluLmpzIiwiY2xpZW50L2pzL21vZGVscy9IZWFkZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL0hvbWUuanMiLCJjbGllbnQvanMvbW9kZWxzL1RoZUJsb2cuanMiLCJjbGllbnQvanMvbW9kZWxzL1VzZXIuanMiLCJjbGllbnQvanMvbW9kZWxzL19fcHJvdG9fXy5qcyIsImNsaWVudC9qcy9wb2x5ZmlsbC5qcyIsImNsaWVudC9qcy9yb3V0ZXIuanMiLCJjbGllbnQvanMvdmlld3MvQWJvdXRVcy5qcyIsImNsaWVudC9qcy92aWV3cy9Gb290ZXIuanMiLCJjbGllbnQvanMvdmlld3MvSGVhZGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL0hvbWUuanMiLCJjbGllbnQvanMvdmlld3MvT3VyT2ZmZXJpbmdzLmpzIiwiY2xpZW50L2pzL3ZpZXdzL1RoZUJsb2cuanMiLCJjbGllbnQvanMvdmlld3MvV2hlcmVUb0ZpbmRVcy5qcyIsImNsaWVudC9qcy92aWV3cy9fX3Byb3RvX18uanMiLCJjbGllbnQvanMvdmlld3MvbGliL09wdGltaXplZFJlc2l6ZS5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvQWJvdXRVcy5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvRm9vdGVyLmpzIiwiY2xpZW50L2pzL3ZpZXdzL3RlbXBsYXRlcy9IZWFkZXIuanMiLCJjbGllbnQvanMvdmlld3MvdGVtcGxhdGVzL0hvbWUuanMiLCJjbGllbnQvanMvdmlld3MvdGVtcGxhdGVzL091ck9mZmVyaW5ncy5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvVGhlQmxvZy5qcyIsImNsaWVudC9qcy92aWV3cy90ZW1wbGF0ZXMvV2hlcmVUb0ZpbmRVcy5qcyIsImxpYi9Nb2RlbC5qcyIsImxpYi9NeUVycm9yLmpzIiwibGliL015T2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3JlZmxlY3QvYXBwbHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3NldC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3JlZmxlY3QvYXBwbHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3NldC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LWNvbGxlY3Rpb24tZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LWNvbGxlY3Rpb24tb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3ZhbGlkYXRlLWNvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucmVmbGVjdC5hcHBseS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc2V0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc2V0LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC5vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL3Ntb290aHNjcm9sbC1wb2x5ZmlsbC9kaXN0L3Ntb290aHNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdC5qcyIsIm5vZGVfbW9kdWxlcy90b2FzdC92aWV3cy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL1RvYXN0LmpzIiwibm9kZV9tb2R1bGVzL3RvYXN0L3ZpZXdzL3RlbXBsYXRlcy9Ub2FzdE1lc3NhZ2UuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9jaGVja21hcmsuanMiLCJub2RlX21vZHVsZXMvdG9hc3Qvdmlld3MvdGVtcGxhdGVzL2xpYi9lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWU7QUFDYixTQUFRLFFBQVEsaUJBQVIsQ0FESztBQUVkLE9BQU0sUUFBUSxlQUFSLENBRlE7QUFHZCxVQUFTLFFBQVEsa0JBQVIsQ0FISztBQUlkLE9BQU0sUUFBUSxlQUFSO0FBSlEsQ0FBZjs7Ozs7QUNBQSxPQUFPLE9BQVAsR0FBZTtBQUNiLFVBQVMsUUFBUSwyQkFBUixDQURJO0FBRWQsU0FBUSxRQUFRLDBCQUFSLENBRk07QUFHZCxTQUFRLFFBQVEsMEJBQVIsQ0FITTtBQUlkLE9BQU0sUUFBUSx3QkFBUixDQUpRO0FBS2QsZUFBYyxRQUFRLGdDQUFSLENBTEE7QUFNZCxVQUFTLFFBQVEsMkJBQVIsQ0FOSztBQU9kLFFBQU8sUUFBUSx5QkFBUixDQVBPO0FBUWQsZ0JBQWUsUUFBUSxpQ0FBUjtBQVJELENBQWY7Ozs7O0FDQUEsT0FBTyxPQUFQLEdBQWU7QUFDYixVQUFTLFFBQVEsaUJBQVIsQ0FESTtBQUVkLFNBQVEsUUFB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Q0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hjQSxPQUFPLE9BQVAsR0FBaUIsc0JBQWUsc0JBQWUsRUFBZixFQUFtQixRQUFRLG9DQUFSLENBQW5CLEVBQWtFOztBQUU5RixrQkFBYyxRQUFRLGdCQUFSLENBRmdGOztBQUk5RixVQUFNLE9BSndGOztBQU05RixjQU44Rix3QkFNakY7QUFDVCxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsZUFBTyxJQUFQO0FBQ0gsS0FWNkY7OztBQVk5RixtQkFBZSxLQVorRTs7QUFjOUYsaUJBZDhGLHlCQWMvRSxJQWQrRSxFQWN6RSxPQWR5RSxFQWMvRDtBQUMzQixZQUFJLENBQUMsS0FBSyxRQUFMLENBQWUsT0FBZixDQUFMLEVBQWdDLEtBQUssUUFBTCxDQUFlLE9BQWYsSUFBMkIsc0JBQWUsS0FBSyxZQUFwQixFQUFrQztBQUN6Rix1QkFBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEtBQUssR0FBTCxDQUFTLFNBQWYsRUFBVDtBQUQ4RSxTQUFsQyxFQUV2RCxXQUZ1RCxFQUEzQjs7QUFJaEMsZUFBTyxLQUFLLFFBQUwsQ0FBZSxPQUFmLEVBQXlCLFdBQXpCLENBQXNDLElBQXRDLEVBQTRDLE9BQTVDLENBQVA7QUFFSCxLQXJCNkY7OztBQXVCOUYsY0FBVSxRQUFRLG1CQUFSOztBQXZCb0YsQ0FBbEUsQ0FBZixFQXlCWixFQXpCWSxDQUFqQjs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG5cdCBIZWFkZXI6IHJlcXVpcmUoJy4vbW9kZWxzL0hlYWRlcicpLFxuXHRIb21lOiByZXF1aXJlKCcuL21vZGVscy9Ib21lJyksXG5cdFRoZUJsb2c6IHJlcXVpcmUoJy4vbW9kZWxzL1RoZUJsb2cnKSxcblx0VXNlcjogcmVxdWlyZSgnLi9tb2RlbHMvVXNlcicpIFxufSIsIm1vZHVsZS5leHBvcnRzPXtcblx0IEFib3V0VXM6IHJlcXVpcmUoJy4vdmlld3MvdGVtcGxhdGVzL0Fib3V0VXMnKSxcblx0Rm9vdGVyOiByZXF1aXJlKCcuL3ZpZXdzL3RlbXBsYXRlcy9Gb290ZXInKSxcblx0SGVhZGVyOiByZXF1aXJlKCcuL3ZpZXdzL3RlbXBsYXRlcy9IZWFkZXInKSxcblx0SG9tZTogcmVxdWlyZSgnLi92aWV3cy90ZW1wbGF0ZXMvSG9tZScpLFxuXHRPdXJPZmZlcmluZ3M6IHJlcXVpcmUoJy4vdmlld3MvdGVtcGxhdGVzL091ck9mZmVyaW5ncycpLFxuXHRUaGVCbG9nOiByZXF1aXJlKCcuL3ZpZXdzL3RlbXBsYXRlcy9UaGVCbG9nJyksXG5cdFRvYXN0OiByZXF1aXJlKCcuL3ZpZXdzL3RlbXBsYXRlcy9Ub2FzdCcpLFxuXHRXaGVyZVRvRmluZFVzOiByZXF1aXJlKCcuL3ZpZXdzL3RlbXBsYXRlcy9XaGVyZVRvRmluZFVzJykgXG59IiwibW9kdWxlLmV4cG9ydHM9e1xuXHQgQWJvdXRVczogcmVxdWlyZSgnLi92aWV3cy9BYm91dFVzJyksXG5cdEZvb3RlcjogcmVxdWlyZSgnLi92aWV3cy9Gb290ZXInKSxcblx0SGVhZGVyOiByZXF1aXJlKCcuL3ZpZXdzL0hlYWRlcicpLFxuXHRIb21lOiByZXF1aXJlKCcuL3ZpZXdzL0hvbWUnKSxcblx0T3VyT2ZmZXJpbmdzOiByZXF1aXJlKCcuL3ZpZXdzL091ck9mZmVyaW5ncycpLFxuXHRUaGVCbG9nOiByZXF1aXJlKCcuL3ZpZXdzL1RoZUJsb2cnKSxcblx0VG9hc3Q6IHJlcXVpcmUoJy4vdmlld3MvVG9hc3QnKSxcblx0V2hlcmVUb0ZpbmRVczogcmVxdWlyZSgnLi92aWV3cy9XaGVyZVRvRmluZFVzJykgXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBDYXBpdGFsaXplRmlyc3RMZXR0ZXI6IHN0cmluZyA9PiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSksXG5cbiAgICBDdXJyZW5jeTogbmV3IEludGwuTnVtYmVyRm9ybWF0KCAnZW4tVVMnLCB7XG4gICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgIGN1cnJlbmN5OiAnVVNEJyxcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMlxuICAgIH0gKSxcbiAgICBjYXBpdGFsaXplV29yZHMoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcuc3BsaXQoL1xccysvKVxuICAgICAgICAubWFwKHdvcmQgPT4gdGhpcy5DYXBpdGFsaXplRmlyc3RMZXR0ZXIod29yZCkpLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgR2V0Rm9ybUZpZWxkKCBkYXR1bSwgdmFsdWUsIG1ldGEgKSB7XG4gICAgICAgIGNvbnN0IGlzTmVzdGVkID0gZGF0dW0ucmFuZ2UgPT09ICdMaXN0JyB8fCB0eXBlb2YgZGF0dW0ucmFuZ2UgPT09ICdvYmplY3QnXG5cbiAgICAgICAgY29uc3QgaW1hZ2UgPSBkYXR1bS5yYW5nZSA9PT0gJ0ltYWdlVXJsJ1xuICAgICAgICAgICAgPyBgPGRpdj48YnV0dG9uIGNsYXNzPVwiYnRuXCIgZGF0YS1qcz1cInByZXZpZXdCdG5cIiB0eXBlPVwiYnV0dG9uXCI+UHJldmlldzwvYnV0dG9uPjxpbWcgZGF0YS1zcmM9XCIke3RoaXMuSW1hZ2VTcmMoIHZhbHVlICl9XCIgLz48L2Rpdj5gXG4gICAgICAgICAgICA6IGBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGRhdHVtLnJhbmdlID09PSAnQm9vbGVhbidcbiAgICAgICAgICAgID8gWyB7IGxhYmVsOiAnVHJ1ZScsIG5hbWU6ICd0cnVlJyB9LCB7IGxhYmVsOiAnRmFsc2UnLCBuYW1lOiAnZmFsc2UnIH0gXVxuICAgICAgICAgICAgOiBkYXR1bS5tZXRhZGF0YVxuICAgICAgICAgICAgICAgID8gZGF0dW0ubWV0YWRhdGEub3B0aW9ucyA6IGZhbHNlXG5cbiAgICAgICAgY29uc3QgaWNvbiA9IGRhdHVtLm1ldGFkYXRhICYmIGRhdHVtLm1ldGFkYXRhLmljb25cbiAgICAgICAgICAgID8gdGhpcy5HZXRJY29uKCBkYXR1bS5tZXRhZGF0YS5pY29uIClcbiAgICAgICAgICAgIDogb3B0aW9uc1xuICAgICAgICAgICAgICAgID8gdGhpcy5HZXRJY29uKCdjYXJldC1kb3duJylcbiAgICAgICAgICAgICAgICA6IGBgXG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBpc05lc3RlZCB8fCAoIGRhdHVtLmZrIHx8IGRhdHVtLmxhYmVsICYmICFtZXRhLm5vTGFiZWwgKVxuICAgICAgICAgICAgPyBgPGxhYmVsPiR7ZGF0dW0uZmsgfHwgZGF0dW0ubGFiZWx9PC9sYWJlbD5gXG4gICAgICAgICAgICA6IGBgXG5cbiAgICAgICAgdmFsdWUgPSAoIHZhbHVlID09PSB1bmRlZmluZWQgKSA/ICcnIDogdmFsdWVcblxuICAgICAgICBpZiggb3B0aW9ucyApIHtcbiAgICAgICAgICAgIGlmKCB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyApIHsgb3B0aW9ucygpOyByZXR1cm4gdGhpcy5HZXRTZWxlY3QoIGRhdHVtLCB2YWx1ZSwgWyBdLCBpY29uLCBsYWJlbCApIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIEFycmF5LmlzQXJyYXkoIG9wdGlvbnMgKSApIHJldHVybiB0aGlzLkdldFNlbGVjdCggZGF0dW0sIHZhbHVlLCBvcHRpb25zLCBpY29uLCBsYWJlbCApXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9tcHQgPSBkYXR1bS5wcm9tcHQgPyBgPGRpdiBjbGFzcz1cInByb21wdFwiPiR7ZGF0dW0ucHJvbXB0fTwvZGl2PmAgOiBgYFxuXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZGF0dW0uZmtcbiAgICAgICAgICAgID8gYDxkaXYgZGF0YS12aWV3PVwidHlwZUFoZWFkXCIgZGF0YS1uYW1lPVwiJHtkYXR1bS5ma31cIj48L2Rpdj5gXG4gICAgICAgICAgICA6IGRhdHVtLnJhbmdlID09PSAnVGV4dCdcbiAgICAgICAgICAgICAgICA/IGA8dGV4dGFyZWEgZGF0YS1qcz1cIiR7ZGF0dW0ubmFtZX1cIiBwbGFjZWhvbGRlcj1cIiR7ZGF0dW0ubGFiZWwgfHwgJyd9XCIgcm93cz1cIjNcIj4ke3ZhbHVlfTwvdGV4dGFyZWE+YFxuICAgICAgICAgICAgICAgIDogZGF0dW0ucmFuZ2UgPT09ICdMaXN0JyB8fCBkYXR1bS5yYW5nZSA9PT0gJ1ZpZXcnIHx8IHR5cGVvZiBkYXR1bS5yYW5nZSA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgPyBgPGRpdiBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiIGRhdGEtbmFtZT1cIiR7ZGF0dW0ubmFtZX1cIj48L2Rpdj5gXG4gICAgICAgICAgICAgICAgICAgIDogYDxpbnB1dCB0eXBlPVwiJHt0aGlzLlJhbmdlVG9JbnB1dFR5cGVbIGRhdHVtLnJhbmdlIF19XCIgZGF0YS1qcz1cIiR7ZGF0dW0ubmFtZX1cIiBwbGFjZWhvbGRlcj1cIiR7ZGF0dW0ubGFiZWwgfHwgJyd9XCIgdmFsdWU9XCIke3ZhbHVlfVwiIC8+YFxuXG4gICAgICAgIHJldHVybiBgYCArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCAke2lzTmVzdGVkID8gJ25lc3RlZCcgOiAnJ31cIj5cbiAgICAgICAgICAgICR7bGFiZWx9XG4gICAgICAgICAgICAke3Byb21wdH1cbiAgICAgICAgICAgICR7aW5wdXR9IFxuICAgICAgICAgICAgJHtpY29ufVxuICAgICAgICA8L2Rpdj5gXG4gICAgfSxcblxuICAgIEdldEZvcm1GaWVsZHMoIGRhdGEsIG1vZGVsPXt9LCBtZXRhICkge1xuICAgICAgICBpZiggIWRhdGEgKSByZXR1cm4gYGBcblxuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICAgICAgLmZpbHRlciggZGF0dW0gPT4gbWV0YVsgZGF0dW0ubmFtZSBdICYmIG1ldGFbIGRhdHVtLm5hbWUgXS5oaWRlID8gZmFsc2UgOiB0cnVlIClcbiAgICAgICAgICAgIC5tYXAoIGRhdHVtID0+IHRoaXMuR2V0Rm9ybUZpZWxkKCBkYXR1bSwgbW9kZWwgJiYgbW9kZWxbIGRhdHVtLm5hbWUgXSwgbWV0YSApICkuam9pbignJylcbiAgICB9LFxuXG4gICAgR2V0SWNvbiggbmFtZSwgb3B0cz17IEljb25EYXRhSnM6IHRoaXMuSWNvbkRhdGFKcyB9ICkgeyByZXR1cm4gUmVmbGVjdC5hcHBseSggdGhpcy5JY29uc1sgbmFtZSBdLCB0aGlzLCBbIG9wdHMgXSApIH0sXG5cbiAgICBHZXRMaXN0SXRlbXMoIGl0ZW1zPVtdLCBvcHRzPXt9ICkge1xuICAgICAgICByZXR1cm4gaXRlbXMubWFwKCBpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHIgPSBvcHRzLmRhdGFBdHRyID8gYGRhdGEtJHtvcHRzLmRhdGFBdHRyfT1cIiR7aXRlbVsgb3B0cy5kYXRhQXR0ciBdfVwiYCA6IGBgXG4gICAgICAgICAgICByZXR1cm4gYDxsaSAke2F0dHJ9PiR7aXRlbS5sYWJlbCB8fCBpdGVtfTwvbGk+YCBcbiAgICAgICAgfSApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIEdldFNlbGVjdCggZGF0dW0sIHNlbGVjdGVkVmFsdWUsIG9wdGlvbnNEYXRhLCBpY29uLCBsYWJlbD1gYCApIHtcbiAgICAgICAgaWYoIHR5cGVvZiBzZWxlY3RlZFZhbHVlID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIHNlbGVjdGVkVmFsdWUgPT09ICdudW1iZXInICkgc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWUudG9TdHJpbmcoKVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRpb25zRGF0YS5sZW5ndGggPyB0aGlzLkdldFNlbGVjdE9wdGlvbnMoIG9wdGlvbnNEYXRhLCBzZWxlY3RlZFZhbHVlLCB7IHZhbHVlQXR0cjogJ25hbWUnIH0gKSA6IGBgXG5cbiAgICAgICAgcmV0dXJuIGBgICtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAke2xhYmVsfVxuICAgICAgICAgICAgPHNlbGVjdCBkYXRhLWpzPVwiJHtkYXR1bS5uYW1lfVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gZGlzYWJsZWQgJHshc2VsZWN0ZWRWYWx1ZSA/IGBzZWxlY3RlZGAgOiBgYH0gdmFsdWU+JHtkYXR1bS5sYWJlbH08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAke29wdGlvbnN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICR7aWNvbn1cbiAgICAgICAgPC9kaXY+YFxuICAgIH0sXG5cbiAgICBHZXRTZWxlY3RPcHRpb25zKCBvcHRpb25zPVtdLCBzZWxlY3RlZFZhbHVlLCBvcHRzPXsgdmFsdWVBdHRyOiAndmFsdWUnIH0gKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1hcCggb3B0aW9uID0+IGA8b3B0aW9uICR7c2VsZWN0ZWRWYWx1ZSA9PT0gb3B0aW9uWyBvcHRzLnZhbHVlQXR0ciBdID8gYHNlbGVjdGVkYCA6IGBgfSB2YWx1ZT1cIiR7b3B0aW9uWyBvcHRzLnZhbHVlQXR0ciBdfVwiPiR7b3B0aW9uLmxhYmVsfTwvb3B0aW9uPmAgKS5qb2luKCcnKVxuICAgIH0sXG5cbiAgICAvL0ljb25zOiByZXF1aXJlKCcuLy5JY29uTWFwJyksXG4gICAgXG4gICAgSWNvbkRhdGFKcyggcCApIHsgcmV0dXJuIHAubmFtZSA/IGBkYXRhLWpzPVwiJHtwLm5hbWV9XCJgIDogYGAgfSxcblxuICAgIC8qIEV2ZW50dWFsbHkgcHV0IHRoZSBidWNrZXQgbmFtZSBpbiB0aGUgY29uZmlnIGZpbGUgKi9cbiAgICBJbWFnZVNyYyggbmFtZSApIHsgcmV0dXJuIGBodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vaWNlbGFuZGljLWhlcml0YWdlLWNoaWNrZW5zLyR7bmFtZX1gIH0sXG5cbiAgICBSYW5nZSggaW50ICkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSggQXJyYXkoIGludCApLmtleXMoKSApXG4gICAgfSxcblxuICAgIFJhbmdlVG9JbnB1dFR5cGU6IHtcbiAgICAgICAgRW1haWw6ICdlbWFpbCcsXG4gICAgICAgIFBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICBTdHJpbmc6ICd0ZXh0J1xuICAgIH1cblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlKCBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi4vLi4vbGliL015T2JqZWN0JyksIHtcblxuICAgIFJlcXVlc3Q6IHtcblxuICAgICAgICBjb25zdHJ1Y3RvciggZGF0YSApIHtcbiAgICAgICAgICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICAgICAgICBpZiggZGF0YS5vblByb2dyZXNzICkgcmVxLmFkZEV2ZW50TGlzdGVuZXIoIFwicHJvZ3Jlc3NcIiwgZSA9PlxuICAgICAgICAgICAgICAgIGRhdGEub25Qcm9ncmVzcyggZS5sZW5ndGhDb21wdXRhYmxlID8gTWF0aC5mbG9vciggKCBlLmxvYWRlZCAvIGUudG90YWwgKSAqIDEwMCApIDogMCApIFxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBbIDUwMCwgNDA0LCA0MDEgXS5pbmNsdWRlcyggdGhpcy5zdGF0dXMgKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyByZWplY3QoIHRoaXMucmVzcG9uc2UgPyBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlICkgOiB0aGlzLnN0YXR1cyApXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJlc29sdmUoIEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2UgKSApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGF0YS5tZXRob2QgPSBkYXRhLm1ldGhvZCB8fCBcImdldFwiXG5cbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gYC8ke2RhdGEucmVzb3VyY2V9YCArICggZGF0YS5pZCA/IGAvJHtkYXRhLmlkfWAgOiAnJyApXG4gICAgICAgICAgICAgICAgaWYoIGRhdGEubWV0aG9kID09PSBcImdldFwiIHx8IGRhdGEubWV0aG9kID09PSBcIm9wdGlvbnNcIiApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHFzID0gZGF0YS5xcyA/IGA/JHt3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50KCBkYXRhLnFzICl9YCA6ICcnIFxuICAgICAgICAgICAgICAgICAgICByZXEub3BlbiggZGF0YS5tZXRob2QsIGAke3BhdGh9JHtxc31gIClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRIZWFkZXJzKCByZXEsIGRhdGEuaGVhZGVycyApXG4gICAgICAgICAgICAgICAgICAgIHJlcS5zZW5kKG51bGwpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9wZW4oIGRhdGEubWV0aG9kLnRvVXBwZXJDYXNlKCksIHBhdGgsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVhZGVycyggcmVxLCBkYXRhLmhlYWRlcnMgKVxuICAgICAgICAgICAgICAgICAgICByZXEuc2VuZCggZGF0YS5kYXRhIHx8IG51bGwgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCBkYXRhLm9uUHJvZ3Jlc3MgKSBkYXRhLm9uUHJvZ3Jlc3MoICdzZW50JyApXG4gICAgICAgICAgICB9IClcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRIZWFkZXJzKCByZXEsIGhlYWRlcnM9e30gKSB7XG4gICAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlciggXCJBY2NlcHRcIiwgaGVhZGVycy5hY2NlcHQgfHwgJ2FwcGxpY2F0aW9uL2pzb24nIClcbiAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBoZWFkZXJzLmNvbnRlbnRUeXBlIHx8ICd0ZXh0L3BsYWluJyApXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2ZhY3RvcnkoIGRhdGEgKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKCB0aGlzLlJlcXVlc3QsIHsgfSApLmNvbnN0cnVjdG9yKCBkYXRhIClcbiAgICB9LFxuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgaWYoICFYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuc2VuZEFzQmluYXJ5ICkge1xuICAgICAgICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZW5kQXNCaW5hcnkgPSBmdW5jdGlvbihzRGF0YSkge1xuICAgICAgICAgICAgdmFyIG5CeXRlcyA9IHNEYXRhLmxlbmd0aCwgdWk4RGF0YSA9IG5ldyBVaW50OEFycmF5KG5CeXRlcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBuSWR4ID0gMDsgbklkeCA8IG5CeXRlczsgbklkeCsrKSB7XG4gICAgICAgICAgICAgIHVpOERhdGFbbklkeF0gPSBzRGF0YS5jaGFyQ29kZUF0KG5JZHgpICYgMHhmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VuZCh1aThEYXRhKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZhY3RvcnkuYmluZCh0aGlzKVxuICAgIH1cblxufSApLCB7IH0gKS5jb25zdHJ1Y3RvcigpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgdGhpcy5yYW5nZS5zZWxlY3ROb2RlKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGl2XCIpLml0ZW0oMCkpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIGNyZWF0ZSggbmFtZSwgb3B0cyApIHtcbiAgICAgICAgY29uc3QgbG93ZXIgPSBuYW1lXG4gICAgICAgIG5hbWUgPSAoIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpICkucmVwbGFjZSggJy0nLCAnJyApXG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoXG4gICAgICAgICAgICB0aGlzLlZpZXdzWyBuYW1lIF0sXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKCB7XG4gICAgICAgICAgICAgICAgSGVhZGVyOiB7IHZhbHVlOiB0aGlzLkhlYWRlciB9LFxuICAgICAgICAgICAgICAgIFRvYXN0OiB7IHZhbHVlOiB0aGlzLlRvYXN0IH0sXG4gICAgICAgICAgICAgICAgbmFtZTogeyB2YWx1ZTogbmFtZSB9LFxuICAgICAgICAgICAgICAgIGZhY3Rvcnk6IHsgdmFsdWU6IHRoaXMgfSxcbiAgICAgICAgICAgICAgICByYW5nZTogeyB2YWx1ZTogdGhpcy5yYW5nZSB9LFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB7IHZhbHVlOiB0aGlzLlRlbXBsYXRlc1sgbmFtZSBdLCB3cml0YWJsZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIG1vZGVsOiB7IHZhbHVlOiB0aGlzLk1vZGVsc1tuYW1lXSA/IE9iamVjdC5jcmVhdGUoIHRoaXMuTW9kZWxzWyBuYW1lIF0gKSA6IHt9IH0sXG4gICAgICAgICAgICAgICAgdXNlcjogeyB2YWx1ZTogdGhpcy5Vc2VyIH1cbiAgICAgICAgICAgIH0gKVxuICAgICAgICApLmNvbnN0cnVjdG9yKCBvcHRzIClcbiAgICB9LFxuXG59LCB7XG4gICAgSGVhZGVyOiB7IHZhbHVlOiByZXF1aXJlKCcuLi92aWV3cy9IZWFkZXInKSB9LFxuICAgIE1vZGVsczogeyB2YWx1ZTogcmVxdWlyZSgnLi4vLk1vZGVsTWFwJykgfSxcbiAgICBUZW1wbGF0ZXM6IHsgdmFsdWU6IHJlcXVpcmUoJy4uLy5UZW1wbGF0ZU1hcCcpIH0sXG4gICAgVG9hc3Q6IHsgdmFsdWU6IHJlcXVpcmUoJy4uL3ZpZXdzL1RvYXN0JykgfSxcbiAgICBVc2VyOiB7IHZhbHVlOiByZXF1aXJlKCcuLi9tb2RlbHMvVXNlcicpIH0sXG4gICAgVmlld3M6IHsgdmFsdWU6IHJlcXVpcmUoJy4uLy5WaWV3TWFwJykgfVxufSApXG4iLCJyZXF1aXJlKCcuL3BvbHlmaWxsJylcblxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4vbW9kZWxzL1VzZXInKSxcbiAgICByb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcicpLFxuICAgIG9uTG9hZCA9IG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHdpbmRvdy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCkgKVxuXG5Vc2VyLm9uKCAnbG9nb3V0JywgKCkgPT4gcm91dGVyLm9uTG9nb3V0KCkgKVxuXG5Qcm9taXNlLmFsbCggWyBVc2VyLmdldCgpLCBvbkxvYWQgXSApXG4udGhlbiggKCkgPT4gcm91dGVyLmluaXRpYWxpemUoKSApXG4uY2F0Y2goIGUgPT4gY29uc29sZS5sb2coIGBFcnJvciBpbml0aWFsaXppbmcgY2xpZW50IC0+ICR7ZS5zdGFjayB8fCBlfWAgKSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgLi4ucmVxdWlyZSgnLi9fX3Byb3RvX18uanMnKSxcbiAgICBkYXRhOiBbXG4gICAgXHR7bmFtZTogJ2Fib3V0LXVzJywgbGFiZWw6ICdBYm91dCBVcyd9LFxuICAgIFx0e25hbWU6ICd3aGVyZS10by1maW5kLXVzJywgbGFiZWw6ICdXaGVyZSBUbyBGaW5kIFVzJ30sXG4gICAgXHR7bmFtZTogJ2Z1dHVyZS1kYXlzLWZhcm0nLCBsYWJlbDogJ0Z1dHVyZSBEYXlzIEZhcm0nfSxcbiAgICBcdHtuYW1lOiAndGhlLWJsb2cnLCBsYWJlbDogJ1RoZSBCbG9nJ30sXG4gICAgXHR7bmFtZTogJ291ci1vZmZlcmluZ3MnLCBsYWJlbDogJ091ciBPZmZlcmluZ3MnfVxuICAgIF1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0geyAuLi5yZXF1aXJlKCcuL19fcHJvdG9fXy5qcycpLFxuXHRkYXRhOiBbXG5cdFx0e2ZpbGVuYW1lOiAnSmFtLmpwZycsIGFsdDogJ0phbScsIGRhdGU6ICdOb3YuIDEyJywgY2FwdGlvbjogJ1dpbGQgQmVycnkgSmFtJ30sXG5cdFx0e2ZpbGVuYW1lOiAnQmVldHMuanBnJywgYWx0OiAnQmVldHMnLCBkYXRlOiAnT2N0LiA0JywgY2FwdGlvbjogJ1dlIEdvdCBUaGUgQmVldHMnfSxcblx0XHR7ZmlsZW5hbWU6ICdTcXVhc2guanBnJywgYWx0OiAnU3F1YXNoJywgZGF0ZTogJ09jdC4gMTMnLCBjYXB0aW9uOiBcIkl0J3MgVGltZSBGb3IgU3F1YXNoXCJ9LFxuXHRcdHtmaWxlbmFtZTogJ1ZpbmUuanBnJywgYWx0OiAnVmluZXMnLCBkYXRlOiAnQXVndXN0LiAxOScsIGNhcHRpb246ICdDaGlja2VuIEluIFRoZSBWaW5lJ30sXG5cdFx0e2ZpbGVuYW1lOiAnQ2Fycm90cy5wbmcnLCBhbHQ6ICdDYXJyb3RzJywgZGF0ZTogJ0p1bHkuIDknLCBjYXB0aW9uOiAnQ3V0ZSBNaXNmaXQgQ2Fycm90cyd9LFxuXHRcdHtmaWxlbmFtZTogJ0thbGUuanBnJywgYWx0OiAnS2FsZScsIGRhdGU6ICdKdW5lLiA3JywgY2FwdGlvbjogJ0ZpcnN0IEthbGUgT2YgMjAxNyd9XG5cdF1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0geyAuLi5yZXF1aXJlKCcuL19fcHJvdG9fXy5qcycpLFxuXHRkYXRhOiBbXG5cdFx0e2ZpbGVuYW1lOiAnSmFtLmpwZycsIGFsdDogJ0phbScsIGRhdGU6ICdOb3YuIDEyJywgY2FwdGlvbjogJ1dpbGQgQmVycnkgSmFtJ30sXG5cdFx0e2ZpbGVuYW1lOiAnQmVldHMuanBnJywgYWx0OiAnQmVldHMnLCBkYXRlOiAnT2N0LiA0JywgY2FwdGlvbjogJ1dlIEdvdCBUaGUgQmVldHMnfSxcblx0XHR7ZmlsZW5hbWU6ICdTcXVhc2guanBnJywgYWx0OiAnU3F1YXNoJywgZGF0ZTogJ09jdC4gMTMnLCBjYXB0aW9uOiBcIkl0J3MgVGltZSBGb3IgU3F1YXNoXCJ9LFxuXHRcdHtmaWxlbmFtZTogJ1ZpbmUuanBnJywgYWx0OiAnVmluZXMnLCBkYXRlOiAnQXVndXN0LiAxOScsIGNhcHRpb246ICdDaGlja2VuIEluIFRoZSBWaW5lJ30sXG5cdFx0e2ZpbGVuYW1lOiAnQ2Fycm90cy5wbmcnLCBhbHQ6ICdDYXJyb3RzJywgZGF0ZTogJ0p1bHkuIDknLCBjYXB0aW9uOiAnQ3V0ZSBNaXNmaXQgQ2Fycm90cyd9LFxuXHRcdHtmaWxlbmFtZTogJ0thbGUuanBnJywgYWx0OiAnS2FsZScsIGRhdGU6ICdKdW5lLiA3JywgY2FwdGlvbjogJ0ZpcnN0IEthbGUgT2YgMjAxNyd9LFxuXHRcdHtmaWxlbmFtZTogJ0phbS5qcGcnLCBhbHQ6ICdKYW0nLCBkYXRlOiAnTm92LiAxMicsIGNhcHRpb246ICdXaWxkIEJlcnJ5IEphbSd9LFxuXHRcdHtmaWxlbmFtZTogJ0JlZXRzLmpwZycsIGFsdDogJ0JlZXRzJywgZGF0ZTogJ09jdC4gNCcsIGNhcHRpb246ICdXZSBHb3QgVGhlIEJlZXRzJ30sXG5cdFx0e2ZpbGVuYW1lOiAnU3F1YXNoLmpwZycsIGFsdDogJ1NxdWFzaCcsIGRhdGU6ICdPY3QuIDEzJywgY2FwdGlvbjogXCJJdCdzIFRpbWUgRm9yIFNxdWFzaFwifVxuXHRdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXy5qcycpLCB7XG5cbiAgICBpc0xvZ2dlZEluKCkge1xuICAgICAgICAgICByZXR1cm4gQm9vbGVhbiggdGhpcy5kYXRhICYmIHRoaXMuZGF0YS5pZCApICBcbiAgICB9LFxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgaHp5PTsgZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVDtgXG5cbiAgICAgICAgdGhpcy5kYXRhID0geyB9XG4gICAgICAgIHRoaXMuZW1pdCgnbG9nb3V0JylcbiAgICB9LFxuXG59ICksIHsgcmVzb3VyY2U6IHsgdmFsdWU6ICdtZScgfSB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiggeyB9LCByZXF1aXJlKCcuLi8uLi8uLi9saWIvTW9kZWwnKSwgcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuXG4gICAgWGhyOiByZXF1aXJlKCcuLi9YaHInKSxcblxuICAgIGFkZCggZGF0dW0gKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKCBkYXR1bSApXG5cbiAgICAgICAgaWYoIHRoaXMuc3RvcmVCeSApIHRoaXMuX3N0b3JlT25lKCBkYXR1bSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IHRoaXMuZGF0YVsgdGhpcy5tZXRhLmtleSBdXG4gICAgICAgIHJldHVybiB0aGlzLlhociggeyBtZXRob2Q6ICdERUxFVEUnLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaWQ6IGtleVZhbHVlIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5tZXRhLmtleVxuXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0dW0gPSB0aGlzLmRhdGEuZmluZCggZGF0dW0gPT4gZGF0dW1bIGtleSBdID09IGtleVZhbHVlIClcblxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0b3JlICkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyggdGhpcy5zdG9yZSApLmZvckVhY2goIGF0dHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0gPSB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXS5maWx0ZXIoIGRhdHVtID0+IGRhdHVtWyBrZXkgXSAhPSBrZXlWYWx1ZSApXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0ubGVuZ3RoID09PSAwICkgeyB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXSA9IHVuZGVmaW5lZCB9XG4gICAgICAgICAgICAgICAgICAgIH0gKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIGRhdHVtID0+IGRhdHVtWyBrZXkgXSAhPSBrZXlWYWx1ZSApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRoaXMuZGF0YSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBnaXQoIGF0dHIgKSB7IHJldHVybiB0aGlzLmRhdGFbIGF0dHIgXSB9LFxuXG4gICAgZ2V0KCBvcHRzPXsgcXVlcnk6e30gfSApIHtcbiAgICAgICAgaWYoIG9wdHMucXVlcnkgfHwgdGhpcy5wYWdpbmF0aW9uICkgT2JqZWN0LmFzc2lnbiggb3B0cy5xdWVyeSwgdGhpcy5wYWdpbmF0aW9uIClcblxuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiBvcHRzLm1ldGhvZCB8fCAnZ2V0JywgcmVzb3VyY2U6IHRoaXMucmVzb3VyY2UsIGhlYWRlcnM6IHRoaXMuaGVhZGVycyB8fCB7fSwgcXM6IG9wdHMucXVlcnkgPyBKU09OLnN0cmluZ2lmeSggb3B0cy5xdWVyeSApIDogdW5kZWZpbmVkIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuXG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheSggdGhpcy5kYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdCggb3B0cy5wYXJzZSA/IG9wdHMucGFyc2UoIHJlc3BvbnNlLCBvcHRzLnN0b3JlQnkgKSA6IHJlc3BvbnNlIClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoIG9wdHMuc3RvcmVCeSApIHRoaXMuX3Jlc2V0U3RvcmUoIG9wdHMuc3RvcmVCeSApXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5wYXJzZSA/IHRoaXMucGFyc2UoIHJlc3BvbnNlLCBvcHRzLnN0b3JlQnkgKSA6IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgaWYoIG9wdHMuc3RvcmVCeSApIHRoaXMuX3N0b3JlKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdnb3QnKVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXNwb25zZSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICBnZXRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ2dldCcsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIHFzOiBKU09OLnN0cmluZ2lmeSggeyBjb3VudE9ubHk6IHRydWUgfSApIH0gKVxuICAgICAgICAudGhlbiggKCB7IHJlc3VsdCB9ICkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZXRhLmNvdW50ID0gcmVzdWx0XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXN1bHQgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgZ2l0KCBhdHRyICkgeyByZXR1cm4gdGhpcy5kYXRhWyBhdHRyIF0gfSxcblxuICAgIHBhdGNoKCBpZCwgZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ3BhdGNoJywgaWQsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIGRhdGE6IEpTT04uc3RyaW5naWZ5KCBkYXRhIHx8IHRoaXMuZGF0YSApIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHsgXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhID8gdGhpcy5kYXRhLmNvbmNhdCggcmVzcG9uc2UgKSA6IFsgcmVzcG9uc2UgXVxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0b3JlICkgT2JqZWN0LmtleXMoIHRoaXMuc3RvcmUgKS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlKCByZXNwb25zZSwgYXR0ciApIClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzcG9uc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzcG9uc2UgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgX3B1dCgga2V5VmFsdWUsIGRhdGEgKSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5kYXRhLmZpbmQoIGRhdHVtID0+IGRhdHVtWyB0aGlzLm1ldGEua2V5IF0gPT0ga2V5VmFsdWUgKTtcbiAgICAgICAgaWYoIGl0ZW0gKSBpdGVtID0gZGF0YTtcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgcHV0KCBpZCwgZGF0YSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuWGhyKCB7IG1ldGhvZDogJ3B1dCcsIGlkLCByZXNvdXJjZTogdGhpcy5yZXNvdXJjZSwgaGVhZGVyczogdGhpcy5oZWFkZXJzIHx8IHt9LCBkYXRhOiBKU09OLnN0cmluZ2lmeSggZGF0YSApIH0gKVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KCB0aGlzLmRhdGEgKSApIHsgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3BvbnNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3BvbnNlIClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIHBvc3QoIG1vZGVsICkge1xuICAgICAgICByZXR1cm4gdGhpcy5YaHIoIHsgbWV0aG9kOiAncG9zdCcsIHJlc291cmNlOiB0aGlzLnJlc291cmNlLCBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfHwge30sIGRhdGE6IEpTT04uc3RyaW5naWZ5KCBtb2RlbCB8fCB0aGlzLmRhdGEgKSB9IClcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZGF0YSApICkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgPyB0aGlzLmRhdGEuY29uY2F0KCByZXNwb25zZSApIDogWyByZXNwb25zZSBdXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RvcmUgKSBPYmplY3Qua2V5cyggdGhpcy5zdG9yZSApLmZvckVhY2goIGF0dHIgPT4gdGhpcy5fc3RvcmUoIHJlc3BvbnNlLCBhdHRyICkgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXNwb25zZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCByZXNwb25zZSApXG4gICAgICAgIH0gKVxuICAgIH0sXG5cbiAgICByZW1vdmUoIGl0ZW0gKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhLmZpbmRJbmRleCggZGF0dW0gPT4gSlNPTi5zdHJpbmdpZnkoIGRhdHVtICkgPT09IEpTT04uc3RyaW5naWZ5KCBpdGVtICkgKVxuXG4gICAgICAgIGlmKCBpbmRleCA9PT0gLTEgKSByZXR1cm5cblxuICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKCBpbmRleCwgMSApXG4gICAgfSxcblxuICAgIHNldCggYXR0ciwgdmFsdWUgKSB7XG4gICAgICAgIHRoaXMuZGF0YVsgYXR0ciBdID0gdmFsdWVcbiAgICAgICAgdGhpcy5lbWl0KCBgJHthdHRyfUNoYW5nZWRgIClcbiAgICB9LFxuXG4gICAgdmFsaWRhdGUoIGRhdGEgKSB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWVcbiAgICAgICBcbiAgICAgICAgT2JqZWN0LmtleXMoIGRhdGEgKS5mb3JFYWNoKCBuYW1lID0+IHsgXG4gICAgICAgICAgICBjb25zdCB2YWwgPSBkYXRhWyBuYW1lIF0sXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlID0gdGhpcy5hdHRyaWJ1dGVzLmZpbmQoIGF0dHIgPT4gYXR0ci5uYW1lID09PSBuYW1lICkgICBcbiAgICBcbiAgICAgICAgICAgIGlmKCBhdHRyaWJ1dGUgPT09IHVuZGVmaW5lZCB8fCAhYXR0cmlidXRlLnZhbGlkYXRlICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVsgbmFtZSBdID0gdmFsXG4gICAgICAgICAgICAgICAgICAgID8gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgICAgICA/IHZhbC50cmltKCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiB2YWxcbiAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiggdmFsaWQgJiYgIXRoaXMudmFsaWRhdGVEYXR1bSggYXR0cmlidXRlLCB2YWwgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoICd2YWxpZGF0aW9uRXJyb3InLCBhdHRyaWJ1dGUgKVxuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiggdGhpcy52YWxpZGF0ZURhdHVtKCBhdHRyaWJ1dGUsIHZhbCApICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVsgbmFtZSBdID0gdmFsLnRyaW0oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IClcblxuICAgICAgICByZXR1cm4gdmFsaWRcbiAgICB9LFxuXG4gICAgdmFsaWRhdGVEYXR1bSggYXR0ciwgdmFsICkge1xuICAgICAgICByZXR1cm4gYXR0ci52YWxpZGF0ZS5jYWxsKCB0aGlzLCB2YWwudHJpbSgpIClcbiAgICB9XG5cbn0gKVxuIiwiaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCwgdmFyQXJncykgeyAvLyAubGVuZ3RoIG9mIGZ1bmN0aW9uIGlzIDJcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7IC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICBpZiAobmV4dFNvdXJjZSAhPSBudWxsKSB7IC8vIFNraXAgb3ZlciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0bztcbiAgfTtcbn1cblxuLy9odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0XG5pZiAod2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gXG4gICAgZnVuY3Rpb24ocykge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBlbCA9IHRoaXM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsKSB7fTtcbiAgICAgICAgfSB3aGlsZSAoKGkgPCAwKSAmJiAoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSk7IFxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcbn1cblxuLy9odHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxuY29uc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lUG9seWZpbGwgPSAoKCkgPT4ge1xuICAgIGxldCBjbG9jayA9IERhdGUubm93KCk7XG5cbiAgICByZXR1cm4gKGNhbGxiYWNrKSA9PiB7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmIChjdXJyZW50VGltZSAtIGNsb2NrID4gMTYpIHtcbiAgICAgICAgICAgIGNsb2NrID0gY3VycmVudFRpbWU7XG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwb2x5ZmlsbChjYWxsYmFjayk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lUG9seWZpbGxcblxucmVxdWlyZSgnc21vb3Roc2Nyb2xsLXBvbHlmaWxsJykucG9seWZpbGwoKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB0cnVlXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuLi8uLi9saWIvTXlPYmplY3QnKSwge1xuICAgIFxuICAgIFZpZXdGYWN0b3J5OiByZXF1aXJlKCcuL2ZhY3RvcnkvVmlldycpLFxuICAgIFxuICAgIFZpZXdzOiByZXF1aXJlKCcuLy5WaWV3TWFwJyksXG5cbiAgICBTaW5nbGV0b25zOiBbICdIZWFkZXInIF0sXG5cbiAgICBpbml0aWFsaXplKCkge1xuXG4gICAgICAgIHRoaXMuY29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JylcblxuICAgICAgICB0aGlzLlZpZXdGYWN0b3J5LmNvbnN0cnVjdG9yKCk7XG5cbiAgICAgICAgdGhpcy5TaW5nbGV0b25zLmZvckVhY2goIG5hbWUgPT4gdGhpcy5WaWV3c1tuYW1lXS5jb25zdHJ1Y3RvciggeyBmYWN0b3J5OiB0aGlzLlZpZXdGYWN0b3J5IH0gKSApXG5cbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSB0aGlzLmhhbmRsZS5iaW5kKHRoaXMpXG5cbiAgICAgICAgdGhpcy5WaWV3cy5IZWFkZXIub24oICduYXZpZ2F0ZScsIHJvdXRlID0+IHRoaXMubmF2aWdhdGUoIHJvdXRlICkgKVxuXG4gICAgICAgIHRoaXMuZm9vdGVyID0gdGhpcy5WaWV3RmFjdG9yeS5jcmVhdGUoICdmb290ZXInLCB7IGluc2VydGlvbjogeyBlbDogZG9jdW1lbnQuYm9keSB9IH0gKVxuXG4gICAgICAgIHRoaXMuaGFuZGxlKClcbiAgICB9LFxuXG4gICAgaGFuZGxlKCkge1xuICAgICAgICB0aGlzLmhhbmRsZXIoIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnNsaWNlKDEpIClcbiAgICB9LFxuXG4gICAgaGFuZGxlciggcGF0aCApIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGF0aFRvVmlldyggcGF0aFswXSApLFxuICAgICAgICAgICAgdmlldyA9IHRoaXMuVmlld3NbIG5hbWUgXSA/IG5hbWUgOiAnaG9tZSdcblxuICAgICAgICBpZiggdmlldyA9PT0gdGhpcy5jdXJyZW50VmlldyApIHJldHVybiB0aGlzLnZpZXdzWyB2aWV3IF0ub25OYXZpZ2F0aW9uKCBwYXRoLnNsaWNlKDEpIClcblxuICAgICAgICB0aGlzLnNjcm9sbFRvVG9wKClcblxuICAgICAgICBQcm9taXNlLmFsbCggT2JqZWN0LmtleXMoIHRoaXMudmlld3MgKS5tYXAoIHZpZXcgPT4gdGhpcy52aWV3c1sgdmlldyBdLmhpZGUoKSApIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHZpZXdcblxuICAgICAgICAgICAgaWYoIHRoaXMudmlld3NbIHZpZXcgXSApIHJldHVybiB0aGlzLnZpZXdzWyB2aWV3IF0ub25OYXZpZ2F0aW9uKCBwYXRoIClcblxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdzWyB2aWV3IF0gPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLlZpZXdGYWN0b3J5LmNyZWF0ZSggdmlldywgeyBpbnNlcnRpb246IHsgZWw6IHRoaXMuY29udGVudENvbnRhaW5lciB9LCBwYXRoIH0gKVxuICAgICAgICAgICAgICAgICAgICAub24oICduYXZpZ2F0ZScsICggcm91dGUsIG9wdGlvbnMgKSA9PiB0aGlzLm5hdmlnYXRlKCByb3V0ZSwgb3B0aW9ucyApIClcbiAgICAgICAgICAgICAgICAgICAgLm9uKCAnZGVsZXRlZCcsICgpID0+IGRlbGV0ZSB0aGlzLnZpZXdzWyB2aWV3IF0gKVxuICAgICAgICAgICAgKVxuICAgICAgICB9IClcbiAgICAgICAgLmNhdGNoKCB0aGlzLkVycm9yIClcbiAgICAgICBcbiAgICAgICAgdGhpcy5mb290ZXIuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCAnaGlkZGVuJywgdmlldyA9PT0gJ0FkbWluJyApXG4gICAgfSxcblxuICAgIG5hdmlnYXRlKCBsb2NhdGlvbiwgb3B0aW9ucz17fSApIHtcbiAgICAgICAgaWYoIG9wdGlvbnMucmVwbGFjZSB8fCBvcHRpb25zLnVwICkge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9YC5zcGxpdCgnLycpXG4gICAgICAgICAgICBwYXRoLnBvcCgpXG4gICAgICAgICAgICBpZiggb3B0aW9ucy5yZXBsYWNlICkgcGF0aC5wdXNoKCBsb2NhdGlvbiApXG4gICAgICAgICAgICBsb2NhdGlvbiA9IHBhdGguam9pbignLycpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiggb3B0aW9ucy5hcHBlbmQgKSB7IGxvY2F0aW9uID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfS8ke2xvY2F0aW9ufWAgfVxuXG4gICAgICAgIGlmKCBsb2NhdGlvbiAhPT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICkgaGlzdG9yeS5wdXNoU3RhdGUoIHt9LCAnJywgbG9jYXRpb24gKVxuICAgICAgICBpZiggIW9wdGlvbnMuc2lsZW50ICkgdGhpcy5oYW5kbGUoKVxuICAgIH0sXG5cbiAgICBvbkxvZ291dCgpIHtcbiAgICAgICAgUHJvbWlzZS5hbGwoIE9iamVjdC5rZXlzKCB0aGlzLnZpZXdzICkubWFwKCB2aWV3ID0+IHRoaXMudmlld3NbIHZpZXcgXS5kZWxldGUoKSApIClcbiAgICAgICAgLnRoZW4oICgpID0+IHsgdGhpcy5jdXJyZW50VmlldyA9IHVuZGVmaW5lZDsgcmV0dXJuIHRoaXMuaGFuZGxlKCkgfSApXG4gICAgICAgIC5jYXRjaCggdGhpcy5FcnJvciApXG4gICAgfSxcblxuICAgIHBhdGhUb1ZpZXcoIHBhdGggKSB7XG4gICAgICAgIGNvbnN0IGh5cGhlblNwbGl0ID0gcGF0aC5zcGxpdCgnLScpXG4gICAgICAgIHJldHVybiBoeXBoZW5TcGxpdC5tYXAoIGl0ZW0gPT4gdGhpcy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoIGl0ZW0gKSApLmpvaW4oJycpXG4gICAgfSxcblxuICAgIHNjcm9sbFRvVG9wKCkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsKCB7IHRvcDogMCwgbGVmdDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0gKVxuICAgIH1cblxufSApLCB7IGN1cnJlbnRWaWV3OiB7IHZhbHVlOiAnJywgd3JpdGFibGU6IHRydWUgfSwgdmlld3M6IHsgdmFsdWU6IHsgfSB9IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXycpLCB7fSlcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHtcblxuICAgIHBvc3RSZW5kZXIoKSB7IHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvRm9vdGVyJylcblxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIE9iamVjdC5hc3NpZ24oIHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXycpLCB7XG5cbiAgICBVc2VyOiByZXF1aXJlKCcuLi9tb2RlbHMvVXNlcicpLFxuXG4gICAgZXZlbnRzOiB7XG4gICAgICAgIG5hdkxpc3Q6ICdjbGljaydcbiAgICB9LFxuXG4gICAgaW5zZXJ0aW9uKCkgeyByZXR1cm4geyBlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKSwgbWV0aG9kOiAnaW5zZXJ0QmVmb3JlJyB9IH0sXG5cbiAgICBtb2RlbDogcmVxdWlyZSgnLi4vbW9kZWxzL0hlYWRlcicpLFxuXG4gICAgbmFtZTogJ0hlYWRlcicsXG4gICAgb25OYXZMaXN0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lbWl0KCduYXZpZ2F0ZScsIGAvJHsgZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJykgfWApO1xuICAgICAgICBbLi4uZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5dLmZvckVhY2goaGVhZGVyID0+IGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKVxuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIH0sXG5cbiAgICBvbkxvZ291dENsaWNrKCkge1xuICAgICAgICB0aGlzLlVzZXIubG9nb3V0KClcbiAgICB9LFxuXG4gICAgb25Vc2VyTG9naW4oKSB7XG4gICAgICAgIHRoaXMuZWxzLnByb2ZpbGVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykgICAgICAgIFxuICAgICAgICB0aGlzLmVscy5uYW1lLnRleHRDb250ZW50ID0gdGhpcy5Vc2VyLmRhdGEubmFtZSB8fCB0aGlzLlVzZXIuZGF0YS5lbWFpbFxuICAgIH0sXG5cbiAgICBvblVzZXJMb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuZWxzLnByb2ZpbGVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykgICAgICAgIFxuICAgICAgICB0aGlzLmVscy5uYW1lLnRleHRDb250ZW50ID0gJydcbiAgICB9LFxuXG4gICAgcG9zdFJlbmRlcigpIHtcblxuICAgICAgICBpZiggdGhpcy5Vc2VyLmlzTG9nZ2VkSW4oKSApIHRoaXMub25Vc2VyTG9naW4oKVxuXG4gICAgICAgIHRoaXMuVXNlci5vbiggJ2dvdCcsICgpID0+IHsgaWYoIHRoaXMuVXNlci5pc0xvZ2dlZEluKCkgKSB0aGlzLm9uVXNlckxvZ2luKCkgfSApXG4gICAgICAgIHRoaXMuVXNlci5vbiggJ2xvZ291dCcsICgpID0+IHRoaXMub25Vc2VyTG9nb3V0KCkgKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvSGVhZGVyJylcblxufSApLCB7IH0gKVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKCB7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18nKSwgeyB9KVxuIiwibW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCByZXF1aXJlKCcuL19fcHJvdG9fXycpLCB7fSlcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSwgcmVxdWlyZSgnLi9fX3Byb3RvX18nKSwge30pXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sIHJlcXVpcmUoJy4vX19wcm90b19fJyksIHt9KSIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiggeyB9LCByZXF1aXJlKCcuLi8uLi8uLi9saWIvTXlPYmplY3QnKSwgcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwge1xuXG4gICAgJCggZWwsIHNlbGVjdG9yICkgeyByZXR1cm4gQXJyYXkuZnJvbSggZWwucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKSApIH0sXG5cbiAgICBUZW1wbGF0ZUNvbnRleHQ6IHJlcXVpcmUoJy4uL1RlbXBsYXRlQ29udGV4dCcpLFxuXG4gICAgTW9kZWw6IHJlcXVpcmUoJy4uL21vZGVscy9fX3Byb3RvX18nKSxcblxuICAgIE9wdGltaXplZFJlc2l6ZTogcmVxdWlyZSgnLi9saWIvT3B0aW1pemVkUmVzaXplJyksXG4gICAgXG4gICAgWGhyOiByZXF1aXJlKCcuLi9YaHInKSxcblxuICAgIGJpbmRFdmVudCgga2V5LCBldmVudCwgZWwgKSB7XG4gICAgICAgIGNvbnN0IGVscyA9IGVsID8gWyBlbCBdIDogQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdICkgPyB0aGlzLmVsc1sga2V5IF0gOiBbIHRoaXMuZWxzWyBrZXkgXSBdLFxuICAgICAgICAgICBuYW1lID0gdGhpcy5nZXRFdmVudE1ldGhvZE5hbWUoIGtleSwgZXZlbnQgKVxuXG4gICAgICAgIGlmKCAhdGhpc1sgYF8ke25hbWV9YCBdICkgdGhpc1sgYF8ke25hbWV9YCBdID0gZSA9PiB0aGlzWyBuYW1lIF0oZSlcblxuICAgICAgICBlbHMuZm9yRWFjaCggZWwgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lciggZXZlbnQgfHwgJ2NsaWNrJywgdGhpc1sgYF8ke25hbWV9YCBdICkgKVxuICAgIH0sXG5cbiAgICBjb25zdHJ1Y3Rvciggb3B0cz17fSApIHtcblxuICAgICAgICBpZiggb3B0cy5ldmVudHMgKSB7IE9iamVjdC5hc3NpZ24oIHRoaXMuZXZlbnRzLCBvcHRzLmV2ZW50cyApOyBkZWxldGUgb3B0cy5ldmVudHM7IH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbiggdGhpcywgb3B0cyApXG5cbiAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMgPSBbIF1cblxuICAgICAgICBpZiggdGhpcy5yZXF1aXJlc0xvZ2luICYmICggIXRoaXMudXNlci5pc0xvZ2dlZEluKCkgKSApIHJldHVybiB0aGlzLmhhbmRsZUxvZ2luKClcbiAgICAgICAgaWYoIHRoaXMudXNlciAmJiAhdGhpcy5pc0FsbG93ZWQoIHRoaXMudXNlciApICkgcmV0dXJuIHRoaXMuc2Nvb3RBd2F5KClcblxuICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplKCkucmVuZGVyKClcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVFdmVudHMoIGtleSwgZWwgKSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHRoaXMuZXZlbnRzW2tleV1cblxuICAgICAgICBpZiggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHsgdGhpcy5iaW5kRXZlbnQoIGtleSwgdGhpcy5ldmVudHNba2V5XSwgZWwgKSB9XG4gICAgICAgIGVsc2UgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMuZXZlbnRzW2tleV0gKSApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzWyBrZXkgXS5mb3JFYWNoKCBldmVudE9iaiA9PiB0aGlzLmJpbmRFdmVudCgga2V5LCBldmVudE9iaiApIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50KCBrZXksIHRoaXMuZXZlbnRzW2tleV0uZXZlbnQgKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRlbGV0ZSggeyBzaWxlbnQgfSA9IHsgc2lsZW50OiBmYWxzZSB9ICkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlKClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxzLmNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBjb250YWluZXIucGFyZW50Tm9kZVxuICAgICAgICAgICAgaWYoIGNvbnRhaW5lciAmJiBwYXJlbnQgKSBwYXJlbnQucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApXG4gICAgICAgICAgICBpZiggIXNpbGVudCApIHRoaXMuZW1pdCgnZGVsZXRlZCcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGV2ZW50czoge30sXG5cbiAgICBmYWRlSW5JbWFnZSggZWwgKSB7XG4gICAgICAgIGVsLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCggJ2ltZ0xvYWRlZCcsIGVsIClcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCAnc3JjJywgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpIClcbiAgICB9LFxuXG4gICAgZ2V0RXZlbnRNZXRob2ROYW1lKCBrZXksIGV2ZW50ICkgeyByZXR1cm4gYG9uJHt0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihrZXkpfSR7dGhpcy5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoZXZlbnQpfWAgfSxcblxuICAgIGdldENvbnRhaW5lcigpIHsgcmV0dXJuIHRoaXMuZWxzLmNvbnRhaW5lciB9LFxuXG4gICAgZ2V0VGVtcGxhdGVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCBydiA9IE9iamVjdC5hc3NpZ24oIHRoaXMudXNlciA/IHsgdXNlcjogdGhpcy51c2VyLmRhdGEgfSA6IHt9IClcblxuICAgICAgICBpZiggdGhpcy5tb2RlbCApIHtcbiAgICAgICAgICAgIHJ2Lm1vZGVsID0gdGhpcy5tb2RlbC5kYXRhXG5cbiAgICAgICAgICAgIGlmKCB0aGlzLm1vZGVsLm1ldGEgKSBydi5tZXRhID0gdGhpcy5tb2RlbC5tZXRhXG4gICAgICAgICAgICBpZiggdGhpcy5tb2RlbC5hdHRyaWJ1dGVzICkgcnYuYXR0cmlidXRlcyA9IHRoaXMubW9kZWwuYXR0cmlidXRlc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHRoaXMudGVtcGxhdGVPcHRpb25zICkgcnYub3B0cyA9IHR5cGVvZiB0aGlzLnRlbXBsYXRlT3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMudGVtcGxhdGVPcHRpb25zKCkgOiB0aGlzLnRlbXBsYXRlT3B0aW9ucyB8fCB7fVxuXG4gICAgICAgIHJldHVybiBydlxuICAgIH0sXG5cbiAgICBoYW5kbGVMb2dpbigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3J5LmNyZWF0ZSggJ2xvZ2luJywgeyBpbnNlcnRpb246IHsgZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JykgfSB9IClcbiAgICAgICAgLm9uKCBcImxvZ2dlZEluXCIsICgpID0+IHRoaXMub25Mb2dpbigpIClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBoaWRlKCBpc1Nsb3cgKSB7XG4gICAgICAgIC8vdmlld3Mgbm90IGhpZGluZyBjb25zaXN0ZW50bHkgd2l0aCB0aGlzXG4gICAgICAgIC8vaWYoICF0aGlzLmVscyB8fCB0aGlzLmlzSGlkaW5nICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cbiAgICAgICAgdGhpcy5pc0hpZGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGVFbCggdGhpcy5lbHMuY29udGFpbmVyLCBpc1Nsb3cgKVxuICAgICAgICAudGhlbiggKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLmhpZGluZyA9IGZhbHNlICkgKVxuICAgIH0sXG4gICAgXG4gICAgaGlkZVN5bmMoKSB7IHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgcmV0dXJuIHRoaXMgfSxcblxuICAgIF9oaWRlRWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBhbmltYXRlLW91dCR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICBkZWxldGUgdGhpc1toYXNoXVxuICAgICAgICB0aGlzLmlzSGlkaW5nID0gZmFsc2VcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgfSxcblxuICAgIGhpZGVFbCggZWwsIGlzU2xvdyApIHtcbiAgICAgICAgaWYoIHRoaXMuaXNIaWRkZW4oIGVsICkgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblxuICAgICAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBoYXNoID0gYCR7dGltZX1IaWRlYFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXNbIGhhc2ggXSA9IGUgPT4gdGhpcy5faGlkZUVsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93IClcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChgYW5pbWF0ZS1vdXQkeyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgfSApXG4gICAgfSxcblxuICAgIGh0bWxUb0ZyYWdtZW50KCBzdHIgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY3RvcnkucmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KCBzdHIgKVxuICAgIH0sXG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiggdGhpcywgeyBlbHM6IHsgfSwgc2x1cnA6IHsgYXR0cjogJ2RhdGEtanMnLCB2aWV3OiAnZGF0YS12aWV3JywgbmFtZTogJ2RhdGEtbmFtZScsIGltZzogJ2RhdGEtc3JjJyB9LCB2aWV3czogeyB9IH0gKVxuICAgIH0sXG5cbiAgICBpbnNlcnRUb0RvbSggZnJhZ21lbnQsIG9wdGlvbnMgKSB7XG4gICAgICAgIGNvbnN0IGluc2VydGlvbiA9IHR5cGVvZiBvcHRpb25zLmluc2VydGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuaW5zZXJ0aW9uKCkgOiBvcHRpb25zLmluc2VydGlvbjtcblxuICAgICAgICBpbnNlcnRpb24ubWV0aG9kID09PSAnaW5zZXJ0QmVmb3JlJ1xuICAgICAgICAgICAgPyBpbnNlcnRpb24uZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGZyYWdtZW50LCBpbnNlcnRpb24uZWwgKVxuICAgICAgICAgICAgOiBpbnNlcnRpb24uZWxbIGluc2VydGlvbi5tZXRob2QgfHwgJ2FwcGVuZENoaWxkJyBdKCBmcmFnbWVudCApXG4gICAgfSxcblxuICAgIGlzQWxsb3dlZCggdXNlciApIHtcbiAgICAgICAgaWYoICF0aGlzLnJlcXVpcmVzUm9sZSApIHJldHVybiB0cnVlXG4gICAgICAgICAgICBcbiAgICAgICAgY29uc3QgdXNlclJvbGVzID0gbmV3IFNldCggdXNlci5kYXRhLnJvbGVzIClcblxuICAgICAgICBpZiggdHlwZW9mIHRoaXMucmVxdWlyZXNSb2xlID09PSAnc3RyaW5nJyApIHJldHVybiB1c2VyUm9sZXMuaGFzKCB0aGlzLnJlcXVpcmVzUm9sZSApXG5cbiAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIHRoaXMucmVxdWlyZXNSb2xlICkgKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnJlcXVpcmVzUm9sZS5maW5kKCByb2xlID0+IHVzZXJSb2xlcy5oYXMoIHJvbGUgKSApXG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBcbiAgICBpc0hpZGRlbiggZWwgKSB7IHJldHVybiBlbCA/IGVsLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykgOiB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSB9LFxuXG4gICAgb25Mb2dpbigpIHtcblxuICAgICAgICBpZiggIXRoaXMuaXNBbGxvd2VkKCB0aGlzLnVzZXIgKSApIHJldHVybiB0aGlzLnNjb290QXdheSgpXG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCkucmVuZGVyKClcbiAgICB9LFxuXG4gICAgb25OYXZpZ2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93KClcbiAgICB9LFxuXG4gICAgc2hvd05vQWNjZXNzKCkge1xuICAgICAgICBhbGVydChcIk5vIHByaXZpbGVnZXMsIHNvblwiKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBwb3N0UmVuZGVyKCkgeyByZXR1cm4gdGhpcyB9LFxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiggdGhpcy5kYXRhICkgdGhpcy5tb2RlbCA9IE9iamVjdC5jcmVhdGUoIHRoaXMuTW9kZWwsIHsgfSApLmNvbnN0cnVjdG9yKCB0aGlzLmRhdGEgKVxuXG4gICAgICAgIHRoaXMuc2x1cnBUZW1wbGF0ZSgge1xuICAgICAgICAgICAgaW5zZXJ0aW9uOiB0aGlzLmluc2VydGlvbiB8fCB7IGVsOiBkb2N1bWVudC5ib2R5IH0sXG4gICAgICAgICAgICBpc1ZpZXc6IHRydWUsXG4gICAgICAgICAgICBzdG9yZUZyYWdtZW50OiB0aGlzLnN0b3JlRnJhZ21lbnQsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogUmVmbGVjdC5hcHBseSggdGhpcy50ZW1wbGF0ZSwgdGhpcy5UZW1wbGF0ZUNvbnRleHQsIFsgdGhpcy5nZXRUZW1wbGF0ZU9wdGlvbnMoKSBdIClcbiAgICAgICAgfSApXG5cbiAgICAgICAgdGhpcy5yZW5kZXJTdWJ2aWV3cygpXG5cbiAgICAgICAgaWYoIHRoaXMuc2l6ZSApIHsgdGhpcy5zaXplKCk7IHRoaXMuT3B0aW1pemVkUmVzaXplLmFkZCggdGhpcy5zaXplLmJpbmQodGhpcykgKSB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdFJlbmRlcigpXG4gICAgfSxcblxuICAgIHJlbW92ZUNoaWxkcmVuKCBlbCApIHtcbiAgICAgICAgd2hpbGUoIGVsLmZpcnN0Q2hpbGQgKSBlbC5yZW1vdmVDaGlsZCggZWwuZmlyc3RDaGlsZCApXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIHJlbmRlclN1YnZpZXdzKCkge1xuICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cy5mb3JFYWNoKCBvYmogPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IG9iai5uYW1lIHx8IG9iai52aWV3XG5cbiAgICAgICAgICAgIGxldCBvcHRzID0geyB9XG5cbiAgICAgICAgICAgIGlmKCB0aGlzLlZpZXdzICYmIHRoaXMuVmlld3NbIG9iai52aWV3IF0gKSBvcHRzID0gdHlwZW9mIHRoaXMuVmlld3NbIG9iai52aWV3IF0gPT09IFwib2JqZWN0XCIgPyB0aGlzLlZpZXdzWyBvYmoudmlldyBdIDogUmVmbGVjdC5hcHBseSggdGhpcy5WaWV3c1sgb2JqLnZpZXcgXSwgdGhpcywgWyBdIClcbiAgICAgICAgICAgIGlmKCB0aGlzLlZpZXdzICYmIHRoaXMuVmlld3NbIG5hbWUgXSApIG9wdHMgPSB0eXBlb2YgdGhpcy5WaWV3c1sgbmFtZSBdID09PSBcIm9iamVjdFwiID8gdGhpcy5WaWV3c1sgbmFtZSBdIDogUmVmbGVjdC5hcHBseSggdGhpcy5WaWV3c1sgbmFtZSBdLCB0aGlzLCBbIF0gKVxuXG4gICAgICAgICAgICB0aGlzLnZpZXdzWyBuYW1lIF0gPSB0aGlzLmZhY3RvcnkuY3JlYXRlKCBvYmoudmlldywgT2JqZWN0LmFzc2lnbiggeyBpbnNlcnRpb246IHsgZWw6IG9iai5lbCwgbWV0aG9kOiAnaW5zZXJ0QmVmb3JlJyB9IH0sIG9wdHMgKSApXG5cbiAgICAgICAgICAgIGlmKCB0aGlzLmV2ZW50cy52aWV3cyApIHtcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5ldmVudHMudmlld3NbIG5hbWUgXSApIHRoaXMuZXZlbnRzLnZpZXdzWyBuYW1lIF0uZm9yRWFjaCggYXJyID0+IHRoaXMudmlld3NbIG5hbWUgXS5vbiggYXJyWzBdLCBldmVudERhdGEgPT4gUmVmbGVjdC5hcHBseSggYXJyWzFdLCB0aGlzLCBbIGV2ZW50RGF0YSBdICkgKSApXG4gICAgICAgICAgICAgICAgZWxzZSBpZiggdGhpcy5ldmVudHMudmlld3NbIG9iai52aWV3IF0gKSB0aGlzLmV2ZW50cy52aWV3c1sgb2JqLnZpZXcgXS5mb3JFYWNoKCBhcnIgPT4gdGhpcy52aWV3c1sgbmFtZSBdLm9uKCBhcnJbMF0sIGV2ZW50RGF0YSA9PiBSZWZsZWN0LmFwcGx5KCBhcnJbMV0sIHRoaXMsIFsgZXZlbnREYXRhIF0gKSApIClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIG9iai5lbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpICkgdGhpcy52aWV3c1tuYW1lXS5oaWRlU3luYygpXG4gICAgICAgICAgICBvYmouZWwucmVtb3ZlKClcbiAgICAgICAgfSApXG5cbiAgICAgICAgdGhpcy5zdWJ2aWV3RWxlbWVudHMgPSBbIF1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBzY29vdEF3YXkoKSB7XG4gICAgICAgIHRoaXMuVG9hc3Quc2hvd01lc3NhZ2UoICdlcnJvcicsICdZb3UgYXJlIG5vdCBhbGxvd2VkIGhlcmUuJylcbiAgICAgICAgLmNhdGNoKCBlID0+IHsgdGhpcy5FcnJvciggZSApOyB0aGlzLmVtaXQoICduYXZpZ2F0ZScsIGAvYCApIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4gdGhpcy5lbWl0KCAnbmF2aWdhdGUnLCBgL2AgKSApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgc2hvdyggaXNTbG93ICkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93RWwoIHRoaXMuZWxzLmNvbnRhaW5lciwgaXNTbG93IClcbiAgICB9LFxuXG4gICAgc2hvd1N5bmMoKSB7IHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsgcmV0dXJuIHRoaXMgfSxcblxuICAgIF9zaG93RWwoIGVsLCByZXNvbHZlLCBoYXNoLCBpc1Nsb3cgKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzW2hhc2hdIClcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgYW5pbWF0ZS1pbiR7IGlzU2xvdyA/ICctc2xvdycgOiAnJ31gKVxuICAgICAgICBkZWxldGUgdGhpc1sgaGFzaCBdXG4gICAgICAgIHJlc29sdmUoKVxuICAgIH0sXG5cbiAgICBzaG93RWwoIGVsLCBpc1Nsb3cgKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIGhhc2ggPSBgJHt0aW1lfVNob3dgXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXNbIGhhc2ggXSA9IGUgPT4gdGhpcy5fc2hvd0VsKCBlbCwgcmVzb2x2ZSwgaGFzaCwgaXNTbG93IClcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoICdhbmltYXRpb25lbmQnLCB0aGlzWyBoYXNoIF0gKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYGFuaW1hdGUtaW4keyBpc1Nsb3cgPyAnLXNsb3cnIDogJyd9YClcbiAgICAgICAgfSApICAgICAgICBcbiAgICB9LFxuXG4gICAgc2x1cnBFbCggZWwgKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGVsLmdldEF0dHJpYnV0ZSggdGhpcy5zbHVycC5hdHRyICkgfHwgJ2NvbnRhaW5lcidcblxuICAgICAgICBpZigga2V5ID09PSAnY29udGFpbmVyJyApIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoIHRoaXMubmFtZSApXG4gICAgICAgICAgICBpZiggdGhpcy5rbGFzcyApIGVsLmNsYXNzTGlzdC5hZGQoIHRoaXMua2xhc3MgKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbHNbIGtleSBdID0gQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdIClcbiAgICAgICAgICAgID8gdGhpcy5lbHNbIGtleSBdLmNvbmNhdCggZWwgKVxuICAgICAgICAgICAgOiAoIHRoaXMuZWxzWyBrZXkgXSAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgICAgICA/IFsgdGhpcy5lbHNbIGtleSBdLCBlbCBdXG4gICAgICAgICAgICAgICAgOiBlbFxuXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnNsdXJwLmF0dHIpXG5cbiAgICAgICAgaWYoIHRoaXMuZXZlbnRzWyBrZXkgXSApIHRoaXMuZGVsZWdhdGVFdmVudHMoIGtleSwgZWwgKVxuICAgIH0sXG5cbiAgICBzbHVycFRlbXBsYXRlKCBvcHRpb25zICkge1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSB0aGlzLmh0bWxUb0ZyYWdtZW50KCBvcHRpb25zLnRlbXBsYXRlICksXG4gICAgICAgICAgICBzZWxlY3RvciA9IGBbJHt0aGlzLnNsdXJwLmF0dHJ9XWAsXG4gICAgICAgICAgICB2aWV3U2VsZWN0b3IgPSBgWyR7dGhpcy5zbHVycC52aWV3fV1gLFxuICAgICAgICAgICAgaW1nU2VsZWN0b3IgPSBgWyR7dGhpcy5zbHVycC5pbWd9XWAsXG4gICAgICAgICAgICBmaXJzdEVsID0gZnJhZ21lbnQucXVlcnlTZWxlY3RvcignKicpXG5cbiAgICAgICAgaWYoIG9wdGlvbnMuaXNWaWV3IHx8IGZpcnN0RWwuZ2V0QXR0cmlidXRlKCB0aGlzLnNsdXJwLmF0dHIgKSApIHRoaXMuc2x1cnBFbCggZmlyc3RFbCApXG4gICAgICAgIEFycmF5LmZyb20oIGZyYWdtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGAke3NlbGVjdG9yfSwgJHt2aWV3U2VsZWN0b3J9LCAke2ltZ1NlbGVjdG9yfWAgKSApLmZvckVhY2goIGVsID0+IHtcbiAgICAgICAgICAgIGlmKCBlbC5oYXNBdHRyaWJ1dGUoIHRoaXMuc2x1cnAuYXR0ciApICkgeyB0aGlzLnNsdXJwRWwoIGVsICkgfVxuICAgICAgICAgICAgZWxzZSBpZiggZWwuaGFzQXR0cmlidXRlKCB0aGlzLnNsdXJwLmltZyApICkgdGhpcy5mYWRlSW5JbWFnZSggZWwgKVxuICAgICAgICAgICAgZWxzZSBpZiggZWwuaGFzQXR0cmlidXRlKCB0aGlzLnNsdXJwLnZpZXcgKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnZpZXdFbGVtZW50cy5wdXNoKCB7IGVsLCB2aWV3OiBlbC5nZXRBdHRyaWJ1dGUodGhpcy5zbHVycC52aWV3KSwgbmFtZTogZWwuZ2V0QXR0cmlidXRlKHRoaXMuc2x1cnAubmFtZSkgfSApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gKVxuICAgXG4gICAgICAgIGlmKCBvcHRpb25zLnN0b3JlRnJhZ21lbnQgKSByZXR1cm4gT2JqZWN0LmFzc2lnbiggdGhpcywgeyBmcmFnbWVudCB9IClcblxuICAgICAgICB0aGlzLmluc2VydFRvRG9tKCBmcmFnbWVudCwgb3B0aW9ucyApXG5cbiAgICAgICAgaWYoIG9wdGlvbnMucmVuZGVyU3Vidmlld3MgKSB0aGlzLnJlbmRlclN1YnZpZXdzKClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICB1bmJpbmRFdmVudCgga2V5LCBldmVudCwgZWwgKSB7XG4gICAgICAgIGNvbnN0IGVscyA9IGVsID8gWyBlbCBdIDogQXJyYXkuaXNBcnJheSggdGhpcy5lbHNbIGtleSBdICkgPyB0aGlzLmVsc1sga2V5IF0gOiBbIHRoaXMuZWxzWyBrZXkgXSBdLFxuICAgICAgICAgICBuYW1lID0gdGhpcy5nZXRFdmVudE1ldGhvZE5hbWUoIGtleSwgZXZlbnQgKVxuXG4gICAgICAgIGVscy5mb3JFYWNoKCBlbCA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCBldmVudCB8fCAnY2xpY2snLCB0aGlzWyBgXyR7bmFtZX1gIF0gKSApXG4gICAgfVxufSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUoIHtcblxuICAgIGFkZChjYWxsYmFjaykge1xuICAgICAgICBpZiggIXRoaXMuY2FsbGJhY2tzLmxlbmd0aCApIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykgKVxuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuICAgIH0sXG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICBpZiggdGhpcy5ydW5uaW5nICkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxuICAgICAgICBcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICAgICAgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLnJ1bkNhbGxiYWNrcy5iaW5kKHRoaXMpIClcbiAgICAgICAgICAgIDogc2V0VGltZW91dCggdGhpcy5ydW5DYWxsYmFja3MsIDY2IClcbiAgICB9LFxuXG4gICAgcnVuQ2FsbGJhY2tzKCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzLmZpbHRlciggY2FsbGJhY2sgPT4gY2FsbGJhY2soKSApXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlIFxuICAgIH1cblxufSwgeyBjYWxsYmFja3M6IHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiBbXSB9LCBydW5uaW5nOiB7IHdyaXRhYmxlOiB0cnVlLCB2YWx1ZTogZmFsc2UgfSB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oIHsgbW9kZWwgfSApIHtcbiAgICByZXR1cm4gYDxkaXY+YWJvdXQgdXM8L2Rpdj5gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyBcbiAgICByZXR1cm4gYDxmb290ZXI+XG4gICAgPGRpdj5mdXR1cmUgZGF5cyBmYXJtPC9kaXY+XG4gICAgPGRpdj4gXG4gICAgICAgIDIxMjMgVGlueSBSb2FkPGJyLz5Ub3duIE5hbWUsIE1pY2hpZ2FuIDMzMzQ0PGJyLz48YnIvPlxuICAgICAgICA8YSBocmVmPVwibWFpbHRvOkluZm9ARnV0dXJlRGF5c0Zhcm0uY29tXCI+SW5mb0BGdXR1cmVEYXlzRmFybS5jb208L2E+PGJyLz5cbiAgICAgICAgKDMzMykgMzIzLTg4OTlcbiAgICA8L2Rpdj48YnIvPlxuICAgIDxkaXY+Q29weXJpZ2h0ICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBGdXR1cmVEYXlzIFNvZnR3YXJlPC9kaXY+XG4gICAgPC9mb290ZXI+YFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggeyBtb2RlbCB9ICkge1xuICAgIGNvbnN0IG5hdk9wdGlvbnMgPSBtb2RlbC5tYXAoZGF0dW0gPT4gYDxsaSBkYXRhLWpzPSduYXZMaXN0JyBkYXRhLW5hbWU9JyR7IGRhdHVtLm5hbWUgfSc+JHsgZGF0dW0ubGFiZWwgfTwvbGk+YCkuam9pbignJylcbiAgICByZXR1cm4gYDxuYXY+JHsgbmF2T3B0aW9ucyB9PC9uYXY+YFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiggeyBtb2RlbCB9ICkge1xuXHRjb25zdCBpbWFnZXMgPSBtb2RlbC5yZWR1Y2UoKG1lbW8sIGltYWdlKSA9PiB7XG5cdCAgXHRjb25zdCBtYXJrdXAgPSBgPGRpdj5cblx0ICAgIFx0PGltZyBkYXRhLXNyYz0nJHsgdGhpcy5JbWFnZVNyYyhpbWFnZS5maWxlbmFtZSkgfScgYWx0PSckeyBpbWFnZS5hbHQgfScvPiBcblx0ICAgIFx0PGRpdj4keyBpbWFnZS5kYXRlIH08YnIvPiR7IGltYWdlLmNhcHRpb24gfTwvZGl2PlxuXHQgIFx0PC9kaXY+YFxuXHQgIFx0cmV0dXJuIG1lbW8gKyBtYXJrdXBcblx0fSwgJycpXG5cdHJldHVybiBgPGRpdj5cblx0PGltZyBkYXRhLXNyYz0nJHsgdGhpcy5JbWFnZVNyYygnRnV0dXJlRGF5c0Zhcm1Mb2dvLnN2ZycpIH0nIGFsdD0nTG9nbycvPiBcblx0PGRpdj5XZWxjb21lIEhlYWRsaW5lPC9kaXY+XG5cdDxkaXY+YWxsZWdhbiBjb3VudHksIG1pY2hpZ2FuPC9kaXY+XG5cdDxkaXY+UHJhZXNlbnQgbGFvcmVldCBvcm5hcmUgbGlndWxhLCBhYyBhY2N1bXNhbiB0dXJwaXMgc2FnaXR0aXMgYXQuICBJbnRlZ2VyIGF1Y3RvciBlZ2VzdGFzIGVsZWlmZW5kLiBFdGlhbSBsdWN0dXMgXG5cdFx0bWF0dGlzIGp1c3RvLCB2aXRhZSBmZXJtZW50dW0gbGliZXJvIGV1aXNtb2QgbGFjaW5pYS4gUHJvaW4gYXQgY29uc2VxdWF0IHJpc3VzLiAgUHJhZXNlbnQgc29sbGljaXR1ZGluIFxuXHRcdHZlc3RpYnVsdW0gZmVsaXMsIHV0IHNvZGFsZXMgZW5pbS48L2Rpdj5cblx0PGRpdiBjbGFzcz0nY2FsZW5kYXItaW1hZ2VzJz4keyBpbWFnZXMgfTwvZGl2PlxuXHQ8L2Rpdj5gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCB7IG1vZGVsIH0gKSB7XG4gICAgcmV0dXJuIGA8ZGl2Pm91ciBvZmZlcmluZ3M8L2Rpdj5gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCB7IG1vZGVsIH0gKSB7XG5cdGNvbnN0IGltYWdlcyA9IG1vZGVsLnJlZHVjZSgobWVtbywgaW1hZ2UpID0+IHtcblx0ICBcdGNvbnN0IG1hcmt1cCA9IGA8ZGl2PlxuXHQgICAgXHQ8aW1nIGRhdGEtc3JjPSckeyB0aGlzLkltYWdlU3JjKGltYWdlLmZpbGVuYW1lKSB9JyBhbHQ9JyR7IGltYWdlLmFsdCB9Jy8+IFxuXHQgICAgXHQ8ZGl2PiR7IGltYWdlLmRhdGUgfTxici8+JHsgaW1hZ2UuY2FwdGlvbiB9PC9kaXY+XG5cdCAgXHQ8L2Rpdj5gXG5cdCAgXHRyZXR1cm4gbWVtbyArIG1hcmt1cFxuXHR9LCAnJylcbiAgICByZXR1cm4gYDxkaXY+XG4gICAgPGgxPlJlY2lwZXMgYW5kIE5ld3MgZnJvbSB0aGUgRmFybTwvaDE+XG4gICAgPHA+UHJhZXNlbnQgbGFvcmVldCBvcm5hcmUgbGlndWxhLCBhYyBhY2N1bXNhbiB0dXJwaXMgc2FnaXR0aXMgYXQuIEludGVnZXIgYXVjdG9yIGVnZXN0YXMgZWxlaWZlbmQuIEV0aWFtIGx1Y3R1cyBtYXR0aXMganVzdG8sIHZpdGFlIGZlcm1lbnR1bSBsaWJlcm8gZXVpc21vZCBsYWNpbmlhLiBQcm9pbiBhdCBjb25zZXF1YXQgcmlzdXMuIFByYWVzZW50IHNvbGxpY2l0dWRpbiB2ZXN0aWJ1bHVtIGZlbGlzLCB1dCBzb2RhbGVzIGVuaW0uPC9wPlxuICAgIDxkaXYgY2xhc3M9J2NhbGVuZGFyLWltYWdlcyc+JHsgaW1hZ2VzIH08L2Rpdj5cbiAgICA8L2Rpdj5gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCB7IG1vZGVsIH0gKSB7XG4gICAgcmV0dXJuIGA8ZGl2PndoZXJlIHRvIGZpbmQgdXM8L2Rpdj5gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oIHsgfSwgcmVxdWlyZSgnLi9NeU9iamVjdCcpLCB7XG5cbiAgICBDcmVhdGVEZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VyKCB0aGlzLmF0dHJpYnV0ZXMsIGF0dHIgPT4gKCB7IFthdHRyLm5hbWVdOiB0eXBlb2YgYXR0ci5kZWZhdWx0ID09PSAnZnVuY3Rpb24nID8gYXR0ci5kZWZhdWx0KCkgOiBhdHRyLmRlZmF1bHQgfSApIClcbiAgICB9LFxuXG4gICAgYXR0cmlidXRlczogWyBdLFxuXG4gICAgZGF0YTogeyB9LFxuXG4gICAgY29uc3RydWN0b3IoIGRhdGE9e30sIG9wdHM9e30gKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oIHRoaXMsIHsgc3RvcmU6IHsgfSwgZGF0YSB9LCBvcHRzIClcblxuICAgICAgICBpZiggdGhpcy5zdG9yZUJ5ICkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZUJ5LmZvckVhY2goIGtleSA9PiB0aGlzLnN0b3JlWyBrZXkgXSA9IHsgfSApXG4gICAgICAgICAgICB0aGlzLl9zdG9yZSgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICBtZXRhOiB7IH0sXG5cbiAgICBzb3J0KCBvcHRzICkge1xuICAgICAgICBjb25zdCBhdHRyID0gT2JqZWN0LmtleXMoIG9wdHMgKVswXSxcbiAgICAgICAgICAgIHZhbHVlID0gb3B0c1thdHRyXTtcblxuICAgICAgICB0aGlzLmRhdGEuc29ydCggKCBhLCBiICkgPT5cbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgPyBhW2F0dHJdIDwgYlthdHRyXSA/IC0xIDogMVxuICAgICAgICAgICAgICAgIDogYlthdHRyXSA8IGFbYXR0cl0gPyAtMSA6IDFcbiAgICAgICAgKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIF9yZXNldFN0b3JlKCBzdG9yZUJ5ICkge1xuICAgICAgICB0aGlzLnN0b3JlID0geyB9XG4gICAgICAgIHN0b3JlQnkuZm9yRWFjaCggYXR0ciA9PiB0aGlzLnN0b3JlWyBhdHRyIF0gPSB7IH0gKVxuICAgICAgICB0aGlzLnN0b3JlQnkgPSBzdG9yZUJ5XG4gICAgfSxcblxuICAgIF9zdG9yZSggZGF0YSApIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwgdGhpcy5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCggZGF0dW0gPT4gdGhpcy5zdG9yZUJ5LmZvckVhY2goIGF0dHIgPT4gdGhpcy5fc3RvcmVBdHRyKCBkYXR1bSwgYXR0ciApICkgKVxuICAgIH0sXG5cbiAgICBfc3RvcmVBdHRyKCBkYXR1bSwgYXR0ciApIHtcbiAgICAgICAgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0gPVxuICAgICAgICAgICAgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF1cbiAgICAgICAgICAgICAgICA/IEFycmF5LmlzQXJyYXkoIHRoaXMuc3RvcmVbIGF0dHIgXVsgZGF0dW1bIGF0dHIgXSBdIClcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0b3JlWyBhdHRyIF1bIGRhdHVtWyBhdHRyIF0gXS5jb25jYXQoIGRhdHVtIClcbiAgICAgICAgICAgICAgICAgICAgOlsgdGhpcy5zdG9yZVsgYXR0ciBdWyBkYXR1bVsgYXR0ciBdIF0sIGRhdHVtIF1cbiAgICAgICAgICAgICAgICA6IGRhdHVtXG4gICAgfSxcblxuICAgIF9zdG9yZU9uZSggZGF0dW0gKSB7XG4gICAgICAgIHRoaXMuc3RvcmVCeS5mb3JFYWNoKCBhdHRyID0+IHRoaXMuX3N0b3JlQXR0ciggZGF0dW0sIGF0dHIgKSApXG4gICAgfVxuXG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gZXJyID0+IHsgY29uc29sZS5sb2coIGVyci5zdGFjayB8fCBlcnIgKSB9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGNhcGl0YWxpemVGaXJzdExldHRlcjogc3RyaW5nID0+IHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKSxcblxuICAgIGdldEludFJhbmdlKCBpbnQgKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKCBBcnJheSggaW50ICkua2V5cygpIClcbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tSW5jbHVzaXZlSW50ZWdlciggbWluLCBtYXggKSB7XG4gICAgICAgIG1pbiA9IE1hdGguY2VpbChtaW4pXG4gICAgICAgIG1heCA9IE1hdGguZmxvb3IobWF4KVxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pblxuICAgIH0sXG5cbiAgICBvbWl0KCBvYmosIGtleXMgKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyggb2JqICkuZmlsdGVyKCBrZXkgPT4gIWtleXMuaW5jbHVkZXMoIGtleSApICkucmVkdWNlKCAoIG1lbW8sIGtleSApID0+IE9iamVjdC5hc3NpZ24oIG1lbW8sIHsgW2tleV06IG9ialtrZXldIH0gKSwgeyB9IClcbiAgICB9LFxuXG4gICAgcGljayggb2JqLCBrZXlzICkge1xuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoICggbWVtbywga2V5ICkgPT4gT2JqZWN0LmFzc2lnbiggbWVtbywgeyBba2V5XTogb2JqW2tleV0gfSApLCB7IH0gKVxuICAgIH0sXG5cbiAgICByZWR1Y2VyKCBhcnIsIGZuICkgeyByZXR1cm4gYXJyLnJlZHVjZSggKCBtZW1vLCBpdGVtLCBpICkgPT4gT2JqZWN0LmFzc2lnbiggbWVtbywgZm4oIGl0ZW0sIGkgKSApLCB7IH0gKSB9LFxuXG4gICAgc2h1ZmZsZUFycmF5KCBhcnIgKSB7XG4gICAgICAgIGNvbnN0IHJ2ID0gQXJyYXkuZnJvbSggYXJyIClcbiAgICAgICBcbiAgICAgICAgcnYuZm9yRWFjaCggKCBpdGVtLCBpICkgPT4ge1xuICAgICAgICAgICAgaWYoIGkgPT09IHJ2Lmxlbmd0aCAtIDEgKSByZXR1cm4gXG4gICAgICAgICAgICBjb25zdCBpbnQgPSB0aGlzLmdldFJhbmRvbUluY2x1c2l2ZUludGVnZXIoIGksIHJ2Lmxlbmd0aCAtIDEgKSxcbiAgICAgICAgICAgICAgICBob2xkZXIgPSBydlsgaSBdXG5cbiAgICAgICAgICAgIHJ2W2ldID0gcnZbaW50XVxuICAgICAgICAgICAgcnZbaW50XSA9IGhvbGRlclxuICAgICAgICB9IClcblxuICAgICAgICByZXR1cm4gcnZcbiAgICB9LFxuXG4gICAgRXJyb3I6IHJlcXVpcmUoJy4vTXlFcnJvcicpLFxuXG4gICAgUDogKCBmdW4sIGFyZ3M9WyBdLCB0aGlzQXJnICkgPT5cbiAgICAgICAgbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4gUmVmbGVjdC5hcHBseSggZnVuLCB0aGlzQXJnIHx8IHRoaXMsIGFyZ3MuY29uY2F0KCAoIGUsIC4uLmNhbGxiYWNrICkgPT4gZSA/IHJlamVjdChlKSA6IHJlc29sdmUoY2FsbGJhY2spICkgKSApLFxuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkgeyByZXR1cm4gdGhpcyB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3JlZmxlY3QvYXBwbHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc2V0XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJyk7XG52YXIgJEpTT04gPSBjb3JlLkpTT04gfHwgKGNvcmUuSlNPTiA9IHsgc3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeSB9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuICRKU09OLnN0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJndW1lbnRzKTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHknKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UudHJ5Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYucmVmbGVjdC5hcHBseScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuUmVmbGVjdC5hcHBseTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zZXQnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnNldC50by1qc29uJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5zZXQub2YnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnNldC5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5TZXQ7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyLCBJVEVSQVRPUikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvck9mKGl0ZXIsIGZhbHNlLCByZXN1bHQucHVzaCwgcmVzdWx0LCBJVEVSQVRPUik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyAwIC0+IEFycmF5I2ZvckVhY2hcbi8vIDEgLT4gQXJyYXkjbWFwXG4vLyAyIC0+IEFycmF5I2ZpbHRlclxuLy8gMyAtPiBBcnJheSNzb21lXG4vLyA0IC0+IEFycmF5I2V2ZXJ5XG4vLyA1IC0+IEFycmF5I2ZpbmRcbi8vIDYgLT4gQXJyYXkjZmluZEluZGV4XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgYXNjID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRZUEUsICRjcmVhdGUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICB2YXIgY3JlYXRlID0gJGNyZWF0ZSB8fCBhc2M7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgc2VsZiA9IElPYmplY3QoTyk7XG4gICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciByZXN1bHQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWwsIHJlcztcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHJlc3VsdFtpbmRleF0gPSByZXM7ICAgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlcykgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbDsgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmIChJU19FVkVSWSkgcmV0dXJuIGZhbHNlOyAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWwpKSB7XG4gICAgQyA9IG9yaWdpbmFsLmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEM7XG59O1xuIiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciAkaXRlckRlZmluZSA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBmYXN0S2V5ID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgU0laRSA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24gKHRoYXQsIGtleSkge1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpO1xuICB2YXIgZW50cnk7XG4gIGlmIChpbmRleCAhPT0gJ0YnKSByZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IgKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubikge1xuICAgIGlmIChlbnRyeS5rID09IGtleSkgcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uICh3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKSB7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBpdGVyYWJsZSkge1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX3QgPSBOQU1FOyAgICAgICAgIC8vIGNvbGxlY3Rpb24gdHlwZVxuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgIGZvciAodmFyIHRoYXQgPSB2YWxpZGF0ZSh0aGlzLCBOQU1FKSwgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubikge1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmIChlbnRyeS5wKSBlbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB0aGF0ID0gdmFsaWRhdGUodGhpcywgTkFNRSk7XG4gICAgICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkubjtcbiAgICAgICAgICB2YXIgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYgKHByZXYpIHByZXYubiA9IG5leHQ7XG4gICAgICAgICAgaWYgKG5leHQpIG5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYgKHRoYXQuX2YgPT0gZW50cnkpIHRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmICh0aGF0Ll9sID09IGVudHJ5KSB0aGF0Ll9sID0gcHJldjtcbiAgICAgICAgICB0aGF0W1NJWkVdLS07XG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMi4zLjYgU2V0LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICAvLyAyMy4xLjMuNSBNYXAucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoYXQgPSB1bmRlZmluZWQgKi8pIHtcbiAgICAgICAgdmFsaWRhdGUodGhpcywgTkFNRSk7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCAzKTtcbiAgICAgICAgdmFyIGVudHJ5O1xuICAgICAgICB3aGlsZSAoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKSB7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZSAoZW50cnkgJiYgZW50cnkucikgZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodmFsaWRhdGUodGhpcywgTkFNRSksIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKERFU0NSSVBUT1JTKSBkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHRoaXMsIE5BTUUpW1NJWkVdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uICh0aGF0LCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICB2YXIgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICBlbnRyeS52ID0gdmFsdWU7XG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0Ll9sID0gZW50cnkgPSB7XG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxuICAgICAgICBrOiBrZXksICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0ga2V5XG4gICAgICAgIHY6IHZhbHVlLCAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgICBwOiBwcmV2ID0gdGhhdC5fbCwgICAgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcbiAgICAgICAgbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgIC8vIDwtIG5leHQgZW50cnlcbiAgICAgICAgcjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHJlbW92ZWRcbiAgICAgIH07XG4gICAgICBpZiAoIXRoYXQuX2YpIHRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmIChwcmV2KSBwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYgKGluZGV4ICE9PSAnRicpIHRoYXQuX2lbaW5kZXhdID0gZW50cnk7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uIChDLCBOQU1FLCBJU19NQVApIHtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gICAgICB0aGlzLl90ID0gdmFsaWRhdGUoaXRlcmF0ZWQsIE5BTUUpOyAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7ICAgICAgICAgICAgICAgIC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGtpbmQgPSB0aGF0Ll9rO1xuICAgICAgdmFyIGVudHJ5ID0gdGhhdC5fbDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUgKGVudHJ5ICYmIGVudHJ5LnIpIGVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZiAoIXRoYXQuX3QgfHwgISh0aGF0Ll9sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGF0Ll90Ll9mKSkge1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIGZyb20gPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FKSB7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgaWYgKGNsYXNzb2YodGhpcykgIT0gTkFNRSkgdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG1ldGEgPSByZXF1aXJlKCcuL19tZXRhJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBlYWNoID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDApO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspIHtcbiAgdmFyIEJhc2UgPSBnbG9iYWxbTkFNRV07XG4gIHZhciBDID0gQmFzZTtcbiAgdmFyIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJztcbiAgdmFyIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZTtcbiAgdmFyIE8gPSB7fTtcbiAgaWYgKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpIHtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24gKHRhcmdldCwgaXRlcmFibGUpIHtcbiAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FLCAnX2MnKTtcbiAgICAgIHRhcmdldC5fYyA9IG5ldyBCYXNlKCk7XG4gICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgIGVhY2goJ2FkZCxjbGVhcixkZWxldGUsZm9yRWFjaCxnZXQsaGFzLHNldCxrZXlzLHZhbHVlcyxlbnRyaWVzLHRvSlNPTicuc3BsaXQoJywnKSwgZnVuY3Rpb24gKEtFWSkge1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmIChLRVkgaW4gcHJvdG8gJiYgIShJU19XRUFLICYmIEtFWSA9PSAnY2xlYXInKSkgaGlkZShDLnByb3RvdHlwZSwgS0VZLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBhbkluc3RhbmNlKHRoaXMsIEMsIEtFWSk7XG4gICAgICAgIGlmICghSVNfQURERVIgJiYgSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkpIHJldHVybiBLRVkgPT0gJ2dldCcgPyB1bmRlZmluZWQgOiBmYWxzZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NbS0VZXShhID09PSAwID8gMCA6IGEsIGIpO1xuICAgICAgICByZXR1cm4gSVNfQURERVIgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgSVNfV0VBSyB8fCBkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Muc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiwgTyk7XG5cbiAgaWYgKCFJU19XRUFLKSBjb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59O1xuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4zJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGluZGV4LCB2YWx1ZSkge1xuICBpZiAoaW5kZXggaW4gb2JqZWN0KSAkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTtcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciByZXN1bHQgPSBnZXRLZXlzKGl0KTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmIChnZXRTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KTtcbiAgICB2YXIgaXNFbnVtID0gcElFLmY7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKHN5bWJvbHMubGVuZ3RoID4gaSkgaWYgKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICghQlVHR1kgJiYgJG5hdGl2ZSkgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBnT1BOID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mO1xudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlOiBmYWxzZSwgdjogZXhlYygpIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyBlOiB0cnVlLCB2OiBlIH07XG4gIH1cbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT0xMRUNUSU9OKSB7XG4gICRleHBvcnQoJGV4cG9ydC5TLCBDT0xMRUNUSU9OLCB7IGZyb206IGZ1bmN0aW9uIGZyb20oc291cmNlIC8qICwgbWFwRm4sIHRoaXNBcmcgKi8pIHtcbiAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIG1hcHBpbmcsIEEsIG4sIGNiO1xuICAgIGFGdW5jdGlvbih0aGlzKTtcbiAgICBtYXBwaW5nID0gbWFwRm4gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAobWFwcGluZykgYUZ1bmN0aW9uKG1hcEZuKTtcbiAgICBpZiAoc291cmNlID09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyB0aGlzKCk7XG4gICAgQSA9IFtdO1xuICAgIGlmIChtYXBwaW5nKSB7XG4gICAgICBuID0gMDtcbiAgICAgIGNiID0gY3R4KG1hcEZuLCBhcmd1bWVudHNbMl0sIDIpO1xuICAgICAgZm9yT2Yoc291cmNlLCBmYWxzZSwgZnVuY3Rpb24gKG5leHRJdGVtKSB7XG4gICAgICAgIEEucHVzaChjYihuZXh0SXRlbSwgbisrKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yT2Yoc291cmNlLCBmYWxzZSwgQS5wdXNoLCBBKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyB0aGlzKEEpO1xuICB9IH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS9cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTExFQ1RJT04pIHtcbiAgJGV4cG9ydCgkZXhwb3J0LlMsIENPTExFQ1RJT04sIHsgb2Y6IGZ1bmN0aW9uIG9mKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBBID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSBBW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICByZXR1cm4gbmV3IHRoaXMoQSk7XG4gIH0gfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSkge1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZiAoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkgZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG4iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcbiIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgRCkge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjZWwgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcbiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRZUEUpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgfHwgaXQuX3QgIT09IFRZUEUpIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG4iLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcbiIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsIiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIFBST01JU0UgPSAnUHJvbWlzZSc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKSAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9oID09IDIpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLl9oICE9PSAxICYmIChwcm9taXNlLl9hIHx8IHByb21pc2UuX2MpLmxlbmd0aCA9PT0gMDtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpO1xuICAgIHZhciAkJHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShMSUJSQVJZICYmIHRoaXMgPT09IFdyYXBwZXIgPyAkUHJvbWlzZSA6IHRoaXMsIHgpO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgJGluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgdmFyIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiLy8gMjYuMS4xIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHJBcHBseSA9IChyZXF1aXJlKCcuL19nbG9iYWwnKS5SZWZsZWN0IHx8IHt9KS5hcHBseTtcbnZhciBmQXBwbHkgPSBGdW5jdGlvbi5hcHBseTtcbi8vIE1TIEVkZ2UgYXJndW1lbnRzTGlzdCBhcmd1bWVudCBpcyBvcHRpb25hbFxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJBcHBseShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSksICdSZWZsZWN0Jywge1xuICBhcHBseTogZnVuY3Rpb24gYXBwbHkodGFyZ2V0LCB0aGlzQXJndW1lbnQsIGFyZ3VtZW50c0xpc3QpIHtcbiAgICB2YXIgVCA9IGFGdW5jdGlvbih0YXJnZXQpO1xuICAgIHZhciBMID0gYW5PYmplY3QoYXJndW1lbnRzTGlzdCk7XG4gICAgcmV0dXJuIHJBcHBseSA/IHJBcHBseShULCB0aGlzQXJndW1lbnQsIEwpIDogZkFwcGx5LmNhbGwoVCwgdGhpc0FyZ3VtZW50LCBMKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBTRVQgPSAnU2V0JztcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoU0VULCBmdW5jdGlvbiAoZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKSB7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4yLjMuMSBTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih2YWxpZGF0ZSh0aGlzLCBTRVQpLCB2YWx1ZSA9IHZhbHVlID09PSAwID8gMCA6IHZhbHVlLCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBNRVRBID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWTtcbnZhciAkZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgd2tzRGVmaW5lID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpO1xudmFyIGVudW1LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbic7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgJHJlcGxhY2VyID0gcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG4iLCIvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vI3NlYy1zZXQuZnJvbVxucmVxdWlyZSgnLi9fc2V0LWNvbGxlY3Rpb24tZnJvbScpKCdTZXQnKTtcbiIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLXNldC5vZlxucmVxdWlyZSgnLi9fc2V0LWNvbGxlY3Rpb24tb2YnKSgnU2V0Jyk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1NldCcsIHsgdG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnU2V0JykgfSk7XG4iLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxudmFyIERPTUl0ZXJhYmxlcyA9ICgnQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCwnICtcbiAgJ0RPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsJyArXG4gICdNZWRpYUxpc3QsTWltZVR5cGVBcnJheSxOYW1lZE5vZGVNYXAsTm9kZUxpc3QsUGFpbnRSZXF1ZXN0TGlzdCxQbHVnaW4sUGx1Z2luQXJyYXksU1ZHTGVuZ3RoTGlzdCxTVkdOdW1iZXJMaXN0LCcgK1xuICAnU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsJyArXG4gICdUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdCcpLnNwbGl0KCcsJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgRE9NSXRlcmFibGVzLmxlbmd0aDsgaSsrKSB7XG4gIHZhciBOQU1FID0gRE9NSXRlcmFibGVzW2ldO1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXTtcbiAgdmFyIHByb3RvID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSkgaGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIi8qIHNtb290aHNjcm9sbCB2MC40LjAgLSAyMDE3IC0gRHVzdGFuIEthc3RlbiwgSmVyZW1pYXMgTWVuaWNoZWxsaSAtIE1JVCBMaWNlbnNlICovXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLypcbiAgICogYWxpYXNlc1xuICAgKiB3OiB3aW5kb3cgZ2xvYmFsIG9iamVjdFxuICAgKiBkOiBkb2N1bWVudFxuICAgKi9cbiAgdmFyIHcgPSB3aW5kb3c7XG4gIHZhciBkID0gZG9jdW1lbnQ7XG5cbiAgLyoqXG4gICAqIGluZGljYXRlcyBpZiBhIHRoZSBjdXJyZW50IGJyb3dzZXIgaXMgbWFkZSBieSBNaWNyb3NvZnRcbiAgICogQG1ldGhvZCBpc01pY3Jvc29mdEJyb3dzZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJBZ2VudFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGlzTWljcm9zb2Z0QnJvd3Nlcih1c2VyQWdlbnQpIHtcbiAgICB2YXIgdXNlckFnZW50UGF0dGVybnMgPSBbJ01TSUUgJywgJ1RyaWRlbnQvJywgJ0VkZ2UvJ107XG5cbiAgICByZXR1cm4gbmV3IFJlZ0V4cCh1c2VyQWdlbnRQYXR0ZXJucy5qb2luKCd8JykpLnRlc3QodXNlckFnZW50KTtcbiAgfVxuXG4gICAvLyBwb2x5ZmlsbFxuICBmdW5jdGlvbiBwb2x5ZmlsbCgpIHtcbiAgICAvLyByZXR1cm4gaWYgc2Nyb2xsIGJlaGF2aW9yIGlzIHN1cHBvcnRlZCBhbmQgcG9seWZpbGwgaXMgbm90IGZvcmNlZFxuICAgIGlmICgnc2Nyb2xsQmVoYXZpb3InIGluIGQuZG9jdW1lbnRFbGVtZW50LnN0eWxlXG4gICAgICAmJiB3Ll9fZm9yY2VTbW9vdGhTY3JvbGxQb2x5ZmlsbF9fICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2xvYmFsc1xuICAgIHZhciBFbGVtZW50ID0gdy5IVE1MRWxlbWVudCB8fCB3LkVsZW1lbnQ7XG4gICAgdmFyIFNDUk9MTF9USU1FID0gNDY4O1xuXG4gICAgLypcbiAgICAgKiBJRSBoYXMgcm91bmRpbmcgYnVnIHJvdW5kaW5nIGRvd24gY2xpZW50SGVpZ2h0IGFuZCBjbGllbnRXaWR0aCBhbmRcbiAgICAgKiByb3VuZGluZyB1cCBzY3JvbGxIZWlnaHQgYW5kIHNjcm9sbFdpZHRoIGNhdXNpbmcgZmFsc2UgcG9zaXRpdmVzXG4gICAgICogb24gaGFzU2Nyb2xsYWJsZVNwYWNlXG4gICAgICovXG4gICAgdmFyIFJPVU5ESU5HX1RPTEVSQU5DRSA9IGlzTWljcm9zb2Z0QnJvd3Nlcih3Lm5hdmlnYXRvci51c2VyQWdlbnQpID8gMSA6IDA7XG5cbiAgICAvLyBvYmplY3QgZ2F0aGVyaW5nIG9yaWdpbmFsIHNjcm9sbCBtZXRob2RzXG4gICAgdmFyIG9yaWdpbmFsID0ge1xuICAgICAgc2Nyb2xsOiB3LnNjcm9sbCB8fCB3LnNjcm9sbFRvLFxuICAgICAgc2Nyb2xsQnk6IHcuc2Nyb2xsQnksXG4gICAgICBlbGVtZW50U2Nyb2xsOiBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGwgfHwgc2Nyb2xsRWxlbWVudCxcbiAgICAgIHNjcm9sbEludG9WaWV3OiBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxJbnRvVmlld1xuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgdGltaW5nIG1ldGhvZFxuICAgIHZhciBub3cgPSB3LnBlcmZvcm1hbmNlICYmIHcucGVyZm9ybWFuY2Uubm93XG4gICAgICA/IHcucGVyZm9ybWFuY2Uubm93LmJpbmQody5wZXJmb3JtYW5jZSlcbiAgICAgIDogRGF0ZS5ub3c7XG5cbiAgICAvKipcbiAgICAgKiBjaGFuZ2VzIHNjcm9sbCBwb3NpdGlvbiBpbnNpZGUgYW4gZWxlbWVudFxuICAgICAqIEBtZXRob2Qgc2Nyb2xsRWxlbWVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNjcm9sbEVsZW1lbnQoeCwgeSkge1xuICAgICAgdGhpcy5zY3JvbGxMZWZ0ID0geDtcbiAgICAgIHRoaXMuc2Nyb2xsVG9wID0geTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIHJlc3VsdCBvZiBhcHBseWluZyBlYXNlIG1hdGggZnVuY3Rpb24gdG8gYSBudW1iZXJcbiAgICAgKiBAbWV0aG9kIGVhc2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga1xuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZnVuY3Rpb24gZWFzZShrKSB7XG4gICAgICByZXR1cm4gMC41ICogKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhIHNtb290aCBiZWhhdmlvciBzaG91bGQgYmUgYXBwbGllZFxuICAgICAqIEBtZXRob2Qgc2hvdWxkQmFpbE91dFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gZmlyc3RBcmdcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzaG91bGRCYWlsT3V0KGZpcnN0QXJnKSB7XG4gICAgICBpZiAoZmlyc3RBcmcgPT09IG51bGxcbiAgICAgICAgfHwgdHlwZW9mIGZpcnN0QXJnICE9PSAnb2JqZWN0J1xuICAgICAgICB8fCBmaXJzdEFyZy5iZWhhdmlvciA9PT0gdW5kZWZpbmVkXG4gICAgICAgIHx8IGZpcnN0QXJnLmJlaGF2aW9yID09PSAnYXV0bydcbiAgICAgICAgfHwgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdpbnN0YW50Jykge1xuICAgICAgICAvLyBmaXJzdCBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0L251bGxcbiAgICAgICAgLy8gb3IgYmVoYXZpb3IgaXMgYXV0bywgaW5zdGFudCBvciB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZmlyc3RBcmcgPT09ICdvYmplY3QnICYmIGZpcnN0QXJnLmJlaGF2aW9yID09PSAnc21vb3RoJykge1xuICAgICAgICAvLyBmaXJzdCBhcmd1bWVudCBpcyBhbiBvYmplY3QgYW5kIGJlaGF2aW9yIGlzIHNtb290aFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gYmVoYXZpb3IgaXMgbm90IHN1cHBvcnRlZFxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ2JlaGF2aW9yIG1lbWJlciBvZiBTY3JvbGxPcHRpb25zICdcbiAgICAgICAgKyBmaXJzdEFyZy5iZWhhdmlvclxuICAgICAgICArICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIGVudW1lcmF0aW9uIFNjcm9sbEJlaGF2aW9yLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW5kaWNhdGVzIGlmIGFuIGVsZW1lbnQgaGFzIHNjcm9sbGFibGUgc3BhY2UgaW4gdGhlIHByb3ZpZGVkIGF4aXNcbiAgICAgKiBAbWV0aG9kIGhhc1Njcm9sbGFibGVTcGFjZVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXhpc1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhc1Njcm9sbGFibGVTcGFjZShlbCwgYXhpcykge1xuICAgICAgaWYgKGF4aXMgPT09ICdZJykge1xuICAgICAgICByZXR1cm4gKGVsLmNsaWVudEhlaWdodCArIFJPVU5ESU5HX1RPTEVSQU5DRSkgPCBlbC5zY3JvbGxIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChheGlzID09PSAnWCcpIHtcbiAgICAgICAgcmV0dXJuIChlbC5jbGllbnRXaWR0aCArIFJPVU5ESU5HX1RPTEVSQU5DRSkgPCBlbC5zY3JvbGxXaWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYW4gZWxlbWVudCBoYXMgYSBzY3JvbGxhYmxlIG92ZXJmbG93IHByb3BlcnR5IGluIHRoZSBheGlzXG4gICAgICogQG1ldGhvZCBjYW5PdmVyZmxvd1xuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXhpc1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNhbk92ZXJmbG93KGVsLCBheGlzKSB7XG4gICAgICB2YXIgb3ZlcmZsb3dWYWx1ZSA9IHcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbClbJ292ZXJmbG93JyArIGF4aXNdO1xuXG4gICAgICByZXR1cm4gb3ZlcmZsb3dWYWx1ZSA9PT0gJ2F1dG8nIHx8IG92ZXJmbG93VmFsdWUgPT09ICdzY3JvbGwnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGNhbiBiZSBzY3JvbGxlZCBpbiBlaXRoZXIgYXhpc1xuICAgICAqIEBtZXRob2QgaXNTY3JvbGxhYmxlXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNTY3JvbGxhYmxlKGVsKSB7XG4gICAgICB2YXIgaXNTY3JvbGxhYmxlWSA9IGhhc1Njcm9sbGFibGVTcGFjZShlbCwgJ1knKSAmJiBjYW5PdmVyZmxvdyhlbCwgJ1knKTtcbiAgICAgIHZhciBpc1Njcm9sbGFibGVYID0gaGFzU2Nyb2xsYWJsZVNwYWNlKGVsLCAnWCcpICYmIGNhbk92ZXJmbG93KGVsLCAnWCcpO1xuXG4gICAgICByZXR1cm4gaXNTY3JvbGxhYmxlWSB8fCBpc1Njcm9sbGFibGVYO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZpbmRzIHNjcm9sbGFibGUgcGFyZW50IG9mIGFuIGVsZW1lbnRcbiAgICAgKiBAbWV0aG9kIGZpbmRTY3JvbGxhYmxlUGFyZW50XG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBlbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRTY3JvbGxhYmxlUGFyZW50KGVsKSB7XG4gICAgICB2YXIgaXNCb2R5O1xuXG4gICAgICBkbyB7XG4gICAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcblxuICAgICAgICBpc0JvZHkgPSBlbCA9PT0gZC5ib2R5O1xuICAgICAgfSB3aGlsZSAoaXNCb2R5ID09PSBmYWxzZSAmJiBpc1Njcm9sbGFibGUoZWwpID09PSBmYWxzZSk7XG5cbiAgICAgIGlzQm9keSA9IG51bGw7XG5cbiAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxmIGludm9rZWQgZnVuY3Rpb24gdGhhdCwgZ2l2ZW4gYSBjb250ZXh0LCBzdGVwcyB0aHJvdWdoIHNjcm9sbGluZ1xuICAgICAqIEBtZXRob2Qgc3RlcFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGVwKGNvbnRleHQpIHtcbiAgICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YXIgY3VycmVudFg7XG4gICAgICB2YXIgY3VycmVudFk7XG4gICAgICB2YXIgZWxhcHNlZCA9ICh0aW1lIC0gY29udGV4dC5zdGFydFRpbWUpIC8gU0NST0xMX1RJTUU7XG5cbiAgICAgIC8vIGF2b2lkIGVsYXBzZWQgdGltZXMgaGlnaGVyIHRoYW4gb25lXG4gICAgICBlbGFwc2VkID0gZWxhcHNlZCA+IDEgPyAxIDogZWxhcHNlZDtcblxuICAgICAgLy8gYXBwbHkgZWFzaW5nIHRvIGVsYXBzZWQgdGltZVxuICAgICAgdmFsdWUgPSBlYXNlKGVsYXBzZWQpO1xuXG4gICAgICBjdXJyZW50WCA9IGNvbnRleHQuc3RhcnRYICsgKGNvbnRleHQueCAtIGNvbnRleHQuc3RhcnRYKSAqIHZhbHVlO1xuICAgICAgY3VycmVudFkgPSBjb250ZXh0LnN0YXJ0WSArIChjb250ZXh0LnkgLSBjb250ZXh0LnN0YXJ0WSkgKiB2YWx1ZTtcblxuICAgICAgY29udGV4dC5tZXRob2QuY2FsbChjb250ZXh0LnNjcm9sbGFibGUsIGN1cnJlbnRYLCBjdXJyZW50WSk7XG5cbiAgICAgIC8vIHNjcm9sbCBtb3JlIGlmIHdlIGhhdmUgbm90IHJlYWNoZWQgb3VyIGRlc3RpbmF0aW9uXG4gICAgICBpZiAoY3VycmVudFggIT09IGNvbnRleHQueCB8fCBjdXJyZW50WSAhPT0gY29udGV4dC55KSB7XG4gICAgICAgIHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXAuYmluZCh3LCBjb250ZXh0KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2Nyb2xscyB3aW5kb3cgb3IgZWxlbWVudCB3aXRoIGEgc21vb3RoIGJlaGF2aW9yXG4gICAgICogQG1ldGhvZCBzbW9vdGhTY3JvbGxcbiAgICAgKiBAcGFyYW0ge09iamVjdHxOb2RlfSBlbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChlbCwgeCwgeSkge1xuICAgICAgdmFyIHNjcm9sbGFibGU7XG4gICAgICB2YXIgc3RhcnRYO1xuICAgICAgdmFyIHN0YXJ0WTtcbiAgICAgIHZhciBtZXRob2Q7XG4gICAgICB2YXIgc3RhcnRUaW1lID0gbm93KCk7XG5cbiAgICAgIC8vIGRlZmluZSBzY3JvbGwgY29udGV4dFxuICAgICAgaWYgKGVsID09PSBkLmJvZHkpIHtcbiAgICAgICAgc2Nyb2xsYWJsZSA9IHc7XG4gICAgICAgIHN0YXJ0WCA9IHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0O1xuICAgICAgICBzdGFydFkgPSB3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldDtcbiAgICAgICAgbWV0aG9kID0gb3JpZ2luYWwuc2Nyb2xsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsYWJsZSA9IGVsO1xuICAgICAgICBzdGFydFggPSBlbC5zY3JvbGxMZWZ0O1xuICAgICAgICBzdGFydFkgPSBlbC5zY3JvbGxUb3A7XG4gICAgICAgIG1ldGhvZCA9IHNjcm9sbEVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIHNjcm9sbCBsb29waW5nIG92ZXIgYSBmcmFtZVxuICAgICAgc3RlcCh7XG4gICAgICAgIHNjcm9sbGFibGU6IHNjcm9sbGFibGUsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgc3RhcnRYOiBzdGFydFgsXG4gICAgICAgIHN0YXJ0WTogc3RhcnRZLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPUklHSU5BTCBNRVRIT0RTIE9WRVJSSURFU1xuICAgIC8vIHcuc2Nyb2xsIGFuZCB3LnNjcm9sbFRvXG4gICAgdy5zY3JvbGwgPSB3LnNjcm9sbFRvID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICBvcmlnaW5hbC5zY3JvbGwuY2FsbChcbiAgICAgICAgICB3LFxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLmxlZnRcbiAgICAgICAgICAgIDogdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgPyBhcmd1bWVudHNbMF1cbiAgICAgICAgICAgICAgOiAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxuICAgICAgICAgIC8vIHVzZSB0b3AgcHJvcCwgc2Vjb25kIGFyZ3VtZW50IGlmIHByZXNlbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsWVxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0udG9wXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAgIDogKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgIHcsXG4gICAgICAgIGQuYm9keSxcbiAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgIDogKHcuc2Nyb2xsWCB8fCB3LnBhZ2VYT2Zmc2V0KSxcbiAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICA6ICh3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIHcuc2Nyb2xsQnlcbiAgICB3LnNjcm9sbEJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICBvcmlnaW5hbC5zY3JvbGxCeS5jYWxsKFxuICAgICAgICAgIHcsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLmxlZnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0ubGVmdFxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgICA6IDAsXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS50b3BcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICA/IGFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgIDogMFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTEVUIFRIRSBTTU9PVEhORVNTIEJFR0lOIVxuICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXG4gICAgICAgIHcsXG4gICAgICAgIGQuYm9keSxcbiAgICAgICAgfn5hcmd1bWVudHNbMF0ubGVmdCArICh3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldCksXG4gICAgICAgIH5+YXJndW1lbnRzWzBdLnRvcCArICh3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbCBhbmQgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsVG9cbiAgICBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGwgPSBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gaWYgb25lIG51bWJlciBpcyBwYXNzZWQsIHRocm93IGVycm9yIHRvIG1hdGNoIEZpcmVmb3ggaW1wbGVtZW50YXRpb25cbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInICYmIGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdWYWx1ZSBjb3VsZG5cXCd0IGJlIGNvbnZlcnRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3JpZ2luYWwuZWxlbWVudFNjcm9sbC5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgLy8gdXNlIGxlZnQgcHJvcCwgZmlyc3QgbnVtYmVyIGFyZ3VtZW50IG9yIGZhbGxiYWNrIHRvIHNjcm9sbExlZnRcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IH5+YXJndW1lbnRzWzBdLmxlZnRcbiAgICAgICAgICAgIDogdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ29iamVjdCdcbiAgICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXVxuICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAvLyB1c2UgdG9wIHByb3AsIHNlY29uZCBhcmd1bWVudCBvciBmYWxsYmFjayB0byBzY3JvbGxUb3BcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0udG9wXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgOiB0aGlzLnNjcm9sbFRvcFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlZnQgPSBhcmd1bWVudHNbMF0ubGVmdDtcbiAgICAgIHZhciB0b3AgPSBhcmd1bWVudHNbMF0udG9wO1xuXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXG4gICAgICBzbW9vdGhTY3JvbGwuY2FsbChcbiAgICAgICAgdGhpcyxcbiAgICAgICAgdGhpcyxcbiAgICAgICAgdHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnID8gdGhpcy5zY3JvbGxMZWZ0IDogfn5sZWZ0LFxuICAgICAgICB0eXBlb2YgdG9wID09PSAndW5kZWZpbmVkJyA/IHRoaXMuc2Nyb2xsVG9wIDogfn50b3BcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEJ5XG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsQnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XG4gICAgICAgIG9yaWdpbmFsLmVsZW1lbnRTY3JvbGwuY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdCArIHRoaXMuc2Nyb2xsTGVmdFxuICAgICAgICAgICAgOiB+fmFyZ3VtZW50c1swXSArIHRoaXMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0udG9wICsgdGhpcy5zY3JvbGxUb3BcbiAgICAgICAgICAgIDogfn5hcmd1bWVudHNbMV0gKyB0aGlzLnNjcm9sbFRvcFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zY3JvbGwoe1xuICAgICAgICBsZWZ0OiB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgdGhpcy5zY3JvbGxMZWZ0LFxuICAgICAgICB0b3A6IH5+YXJndW1lbnRzWzBdLnRvcCArIHRoaXMuc2Nyb2xsVG9wLFxuICAgICAgICBiZWhhdmlvcjogYXJndW1lbnRzWzBdLmJlaGF2aW9yXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXdcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxJbnRvVmlldyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xuICAgICAgICBvcmlnaW5hbC5zY3JvbGxJbnRvVmlldy5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMF1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcbiAgICAgIHZhciBzY3JvbGxhYmxlUGFyZW50ID0gZmluZFNjcm9sbGFibGVQYXJlbnQodGhpcyk7XG4gICAgICB2YXIgcGFyZW50UmVjdHMgPSBzY3JvbGxhYmxlUGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIGNsaWVudFJlY3RzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgaWYgKHNjcm9sbGFibGVQYXJlbnQgIT09IGQuYm9keSkge1xuICAgICAgICAvLyByZXZlYWwgZWxlbWVudCBpbnNpZGUgcGFyZW50XG4gICAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgc2Nyb2xsYWJsZVBhcmVudCxcbiAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50LnNjcm9sbExlZnQgKyBjbGllbnRSZWN0cy5sZWZ0IC0gcGFyZW50UmVjdHMubGVmdCxcbiAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50LnNjcm9sbFRvcCArIGNsaWVudFJlY3RzLnRvcCAtIHBhcmVudFJlY3RzLnRvcFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHJldmVhbCBwYXJlbnQgaW4gdmlld3BvcnQgdW5sZXNzIGlzIGZpeGVkXG4gICAgICAgIGlmICh3LmdldENvbXB1dGVkU3R5bGUoc2Nyb2xsYWJsZVBhcmVudCkucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgICAgICB3LnNjcm9sbEJ5KHtcbiAgICAgICAgICAgIGxlZnQ6IHBhcmVudFJlY3RzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHBhcmVudFJlY3RzLnRvcCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZXZlYWwgZWxlbWVudCBpbiB2aWV3cG9ydFxuICAgICAgICB3LnNjcm9sbEJ5KHtcbiAgICAgICAgICBsZWZ0OiBjbGllbnRSZWN0cy5sZWZ0LFxuICAgICAgICAgIHRvcDogY2xpZW50UmVjdHMudG9wLFxuICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIGNvbW1vbmpzXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7IHBvbHlmaWxsOiBwb2x5ZmlsbCB9O1xuICB9IGVsc2Uge1xuICAgIC8vIGdsb2JhbFxuICAgIHBvbHlmaWxsKCk7XG4gIH1cblxufSgpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSggT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4uLy4uLy4uL2NsaWVudC9qcy92aWV3cy9fX3Byb3RvX18nKSwge1xuXG4gICAgVG9hc3RNZXNzYWdlOiByZXF1aXJlKCcuL1RvYXN0TWVzc2FnZScpLFxuXG4gICAgbmFtZTogJ1RvYXN0JyxcblxuICAgIHBvc3RSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSB7IH1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICByZXF1aXJlc0xvZ2luOiBmYWxzZSxcblxuICAgIGNyZWF0ZU1lc3NhZ2UoIHR5cGUsIG1lc3NhZ2UgKSB7XG4gICAgICAgIGlmKCAhdGhpcy5tZXNzYWdlc1sgbWVzc2FnZSBdICkgdGhpcy5tZXNzYWdlc1sgbWVzc2FnZSBdID0gT2JqZWN0LmNyZWF0ZSggdGhpcy5Ub2FzdE1lc3NhZ2UsIHtcbiAgICAgICAgICAgIGluc2VydGlvbjogeyB2YWx1ZTogeyBlbDogdGhpcy5lbHMuY29udGFpbmVyIH0gfVxuICAgICAgICB9ICkuY29uc3RydWN0b3IoKVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzWyBtZXNzYWdlIF0uc2hvd01lc3NhZ2UoIHR5cGUsIG1lc3NhZ2UgKVxuXG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9Ub2FzdCcpXG5cbn0gKSwgeyB9IClcbiIsIm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbigge30sIHJlcXVpcmUoJy4uLy4uLy4uL2NsaWVudC9qcy92aWV3cy9fX3Byb3RvX18nKSwge1xuXG4gICAgbmFtZTogJ1RvYXN0TWVzc2FnZScsXG5cbiAgICBJY29uczoge1xuICAgICAgICBlcnJvcjogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbGliL2Vycm9yJykoKSxcbiAgICAgICAgc3VjY2VzczogcmVxdWlyZSgnLi90ZW1wbGF0ZXMvbGliL2NoZWNrbWFyaycpKClcbiAgICB9LFxuXG4gICAgcG9zdFJlbmRlcigpIHtcblxuICAgICAgICB0aGlzLm9uKCAnc2hvd24nLCAoKSA9PiB0aGlzLnN0YXR1cyA9ICdzaG93bicgKVxuICAgICAgICB0aGlzLm9uKCAnaGlkZGVuJywgKCkgPT4gdGhpcy5zdGF0dXMgPSAnaGlkZGVuJyApXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgcmVxdWlyZXNMb2dpbjogZmFsc2UsXG5cbiAgICBzaG93TWVzc2FnZSggdHlwZSwgbWVzc2FnZSApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApICA9PiB7XG4gICAgICAgICAgICBpZiggL3Nob3cvLnRlc3QoIHRoaXMuc3RhdHVzICkgKSB0aGlzLnRlYXJkb3duKClcblxuICAgICAgICAgICAgdGhpcy5yZXNvbHV0aW9uID0gcmVzb2x2ZVxuXG4gICAgICAgICAgICBpZiggdHlwZSAhPT0gJ2Vycm9yJyApIHRoaXMuZWxzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdWNjZXNzJylcblxuICAgICAgICAgICAgdGhpcy5lbHMubWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMuZWxzLnRpdGxlLnRleHRDb250ZW50ID0gdHlwZSA9PT0gJ2Vycm9yJyA/ICdFcnJvcicgOiAnU3VjY2VzcydcbiAgICAgICAgICAgIHRoaXMuc2x1cnBUZW1wbGF0ZSggeyBpbnNlcnRpb246IHsgZWw6IHRoaXMuZWxzLmljb24gfSwgdGVtcGxhdGU6IHR5cGUgPT09ICdlcnJvcicgPyB0aGlzLkljb25zLmVycm9yIDogdGhpcy5JY29ucy5zdWNjZXNzIH0gKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdzaG93aW5nJ1xuXG4gICAgICAgICAgICB0aGlzLnNob3coIHRydWUgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHRoaXMuaGlkZSggdHJ1ZSApIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB0aGlzLnRlYXJkb3duKCkgKVxuICAgICAgICAgICAgLmNhdGNoKCByZWplY3QgKVxuICAgICAgICB9IClcbiAgICB9LFxuXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICAgIGlmKCB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWNjZXNzJykgKSB0aGlzLmVscy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3VjY2VzcycpXG4gICAgICAgIHRoaXMuZWxzLm1lc3NhZ2UudGV4dENvbnRlbnQgPSAnJ1xuICAgICAgICB0aGlzLmVscy5tZXNzYWdlLnRpdGxlID0gJydcbiAgICAgICAgaWYoIHRoaXMuZWxzLmljb24uZmlyc3RDaGlsZCApIHRoaXMuZWxzLmljb24ucmVtb3ZlQ2hpbGQoIHRoaXMuZWxzLmljb24uZmlyc3RDaGlsZCApXG4gICAgICAgIHRoaXMucmVzb2x1dGlvbigpXG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9Ub2FzdE1lc3NhZ2UnKVxuXG59IClcbiIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4gYDxkaXY+PC9kaXY+YFxuIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiBcbmA8ZGl2IGNsYXNzPVwiaGlkZGVuXCI+XG4gICAgPGRpdiBkYXRhLWpzPVwiaWNvblwiPjwvZGl2PlxuICAgIDxkaXY+XG4gICAgICAgIDxkaXYgZGF0YS1qcz1cInRpdGxlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgZGF0YS1qcz1cIm1lc3NhZ2VcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAiLCJtb2R1bGUuZXhwb3J0cyA9IChwPXt9KSA9PiBgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgZGF0YS1qcz1cIiR7cC5uYW1lIHx8ICdjaGVja21hcmsnfVwiIGNsYXNzPVwiY2hlY2ttYXJrXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcblx0IHdpZHRoPVwiOTcuNjE5cHhcIiBoZWlnaHQ9XCI5Ny42MThweFwiIHZpZXdCb3g9XCIwIDAgOTcuNjE5IDk3LjYxOFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5Ny42MTkgOTcuNjE4O1wiXG5cdCB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuPGc+XG5cdDxwYXRoIGQ9XCJNOTYuOTM5LDE3LjM1OEw4My45NjgsNS45NTljLTAuMzk4LTAuMzUyLTAuOTI3LTAuNTMxLTEuNDQ5LTAuNDk0QzgxLjk5LDUuNSw4MS40OTYsNS43NDMsODEuMTQ2LDYuMTQyTDM0LjEsNTkuNjg4XG5cdFx0TDE3LjM3MiwzNy41NDdjLTAuMzE5LTAuNDIyLTAuNzk0LTAuNzAxLTEuMzE5LTAuNzczYy0wLjUyNC0wLjA3OC0xLjA1OSwwLjA2NC0xLjQ4MSwwLjM4NUwwLjc5NCw0Ny41Njdcblx0XHRjLTAuODgxLDAuNjY2LTEuMDU2LDEuOTItMC4zOSwyLjgwMWwzMC45NzQsNDAuOTk2YzAuMzYyLDAuNDc5LDAuOTIyLDAuNzcxLDEuNTIyLDAuNzkzYzAuMDI0LDAsMC4wNDksMCwwLjA3MywwXG5cdFx0YzAuNTc0LDAsMS4xMjItMC4yNDYsMS41MDMtMC42OGw2Mi42NDQtNzEuMjk3Qzk3Ljg1LDE5LjM1MSw5Ny43NjksMTguMDg2LDk2LjkzOSwxNy4zNTh6XCIvPlxuPC9nPjwvc3ZnPmBcbiIsIm1vZHVsZS5leHBvcnRzID0gKHA9e30pID0+IGA8c3ZnIHZlcnNpb249XCIxLjFcIiBkYXRhLWpzPVwiJHtwLm5hbWUgfHwgJ2Vycm9yJ31cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDE4Ljk3OCAxOC45NzhcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTguOTc4IDE4Ljk3ODtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxyXG48Zz5cclxuICAgIDxwYXRoIGQ9XCJNMTYuMDg4LDEuNjc1Yy0wLjEzMy0wLjEwNC0wLjMwNi0wLjE0NC0wLjQ3LTAuMTA1Yy0wLjAxMywwLjAwMi0xLjI2MSwwLjI5LTIuNTk0LDAuMjlcclxuICAgICAgICBjLTEuNzg4LDAtMi43ODktMC40NzYtMi45NzUtMS40MTVDOS45OTksMC4xOTEsOS43NzksMC4wMDcsOS41MjEsMGMtMC4yNTctMC4wMDctMC40ODcsMC4xNjctMC41NSwwLjQxOFxyXG4gICAgICAgIEM4LjcyNywxLjM4Niw3LjcxLDEuODc3LDUuOTUsMS44NzdjLTEuMzMyLDAtMi41NzEtMC4zMDItMi41ODMtMC4zMDVjLTAuMTY2LTAuMDQtMC4zNC0wLjAwNC0wLjQ3NCwwLjEwMlxyXG4gICAgICAgIEMyLjc2LDEuNzc3LDIuNjgxLDEuOTM4LDIuNjgxLDIuMTA4djQuODY5YzAsMC4wNCwwLjAwNCwwLjA3OCwwLjAxMywwLjExNWMwLjA1NywxLjY0NywwLjY1LDguNzE0LDYuNTI4LDExLjgyMlxyXG4gICAgICAgIGMwLjA4LDAuMDQzLDAuMTY5LDAuMDY0LDAuMjU4LDAuMDY0YzAuMDkyLDAsMC4xODMtMC4wMjEsMC4yNjYtMC4wNjZjNS43NC0zLjEzNyw2LjQ0NS0xMC4xMTUsNi41MzItMTEuNzkxXHJcbiAgICAgICAgYzAuMDEyLTAuMDQ2LDAuMDE5LTAuMDk0LDAuMDE5LTAuMTQ0VjIuMTA4QzE2LjI5NywxLjkzOSwxNi4yMTksMS43OCwxNi4wODgsMS42NzV6IE0xNS4xOSw2Ljg1N1xyXG4gICAgICAgIGMtMC4wMDcsMC4wMzEtMC4wMTIsMC4wNjQtMC4wMTMsMC4wOTdjLTAuMDUzLDEuMjk4LTAuNTc0LDcuODMyLTUuNzAxLDEwLjgzOGMtNS4yMTUtMi45NjUtNS42NDYtOS41MjYtNS42OC0xMC44M1xyXG4gICAgICAgIGMwLTAuMDI5LTAuMDA0LTAuMDU4LTAuMDA5LTAuMDg1VjIuNzg0QzQuMzIyLDIuODc3LDUuMTEyLDIuOTgyLDUuOTUsMi45ODJjMS45MTEsMCwyLjk2NS0wLjU0LDMuNTM3LTEuMjA4XHJcbiAgICAgICAgYzAuNTUzLDAuNjYxLDEuNTk5LDEuMTkxLDMuNTM2LDEuMTkxYzAuODM5LDAsMS42MzEtMC4xMDEsMi4xNjYtMC4xODhMMTUuMTksNi44NTdMMTUuMTksNi44NTd6XCIvPlxyXG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMTAuMjQxLDExLjIzNyAxMC41MjksNS4zMTEgOC40NDksNS4zMTEgOC43NSwxMS4yMzcgXHRcdFwiLz5cclxuICAgIDxwYXRoIGQ9XCJNOS40OTYsMTEuODkxYy0wLjY5NCwwLTEuMTc4LDAuNDk4LTEuMTc4LDEuMTg5YzAsMC42ODIsMC40NzEsMS4xOTEsMS4xNzgsMS4xOTFcclxuICAgICAgICBjMC43MDYsMCwxLjE2NC0wLjUxLDEuMTY0LTEuMTkxQzEwLjY0NywxMi4zODksMTAuMTg5LDExLjg5MSw5LjQ5NiwxMS44OTF6XCIvPlxyXG48L2c+PC9zdmc+YFxyXG4iXX0=
