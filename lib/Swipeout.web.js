'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcHammerjs = require('rc-hammerjs');

var _rcHammerjs2 = _interopRequireDefault(_rcHammerjs);

var _object = require('object.omit');

var _object2 = _interopRequireDefault(_object);

var _splitObject3 = require('./util/splitObject');

var _splitObject4 = _interopRequireDefault(_splitObject3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swipeout = (_temp = _class = function (_React$Component) {
  _inherits(Swipeout, _React$Component);

  function Swipeout(props) {
    _classCallCheck(this, Swipeout);

    var _this = _possibleConstructorReturn(this, (Swipeout.__proto__ || Object.getPrototypeOf(Swipeout)).call(this, props));

    _this.state = {
      direction: 'DIRECTION_HORIZONTAL'
    };


    _this.onPanStart = _this.onPanStart.bind(_this);
    _this.onPan = _this.onPan.bind(_this);
    _this.onPanEnd = _this.onPanEnd.bind(_this);
    _this.onTap = _this.onTap.bind(_this);

    _this.openedLeft = false;
    _this.openedRight = false;
    return _this;
  }

  _createClass(Swipeout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          left = _props.left,
          right = _props.right;

      var width = this.refs.content.offsetWidth;

      if (left.length && right.length === 0) {
        this.setState({
          direction: 'DIRECTION_RIGHT'
        });
      }

      if (right.length && left.length === 0) {
        this.setState({
          direction: 'DIRECTION_LEFT'
        });
      }

      this.contentWidth = width;
      this.btnsLeftWidth = left ? width / 5 * left.length : 0;
      this.btnsRightWidth = right ? width / 5 * right.length : 0;
    }
  }, {
    key: 'onPanStart',
    value: function onPanStart(e) {
      if (this.props.disabled) {
        return;
      }
      this.panStartX = e.deltaX;
    }
  }, {
    key: 'onPan',
    value: function onPan(e) {
      if (this.props.disabled) {
        return;
      }

      // get pan distance
      var posX = e.deltaX - this.panStartX;
      if (this.openedRight) {
        posX = posX - this.btnsRightWidth;
      } else if (this.openedLeft) {
        posX = posX + this.btnsLeftWidth;
      }

      if (posX < 0 && this.props.right) {
        this._setStyle(Math.min(posX, 0));
      } else if (posX > 0 && this.props.left) {
        this._setStyle(Math.max(posX, 0));
      }
    }
  }, {
    key: 'onPanEnd',
    value: function onPanEnd(e) {
      if (this.props.disabled) {
        return;
      }

      var posX = e.deltaX - this.panStartX;
      var contentWidth = this.contentWidth;
      var btnsLeftWidth = this.btnsLeftWidth;
      var btnsRightWidth = this.btnsRightWidth;
      var openX = contentWidth * 0.33;
      var openLeft = posX > openX || posX > btnsLeftWidth / 2;
      var openRight = posX < -openX || posX < -btnsRightWidth / 2;

      if (this.openedRight) {
        openRight = posX - openX < -openX;
      }
      if (this.openedLeft) {
        openLeft = posX + openX > openX;
      }

      if (this.openedRight && openLeft && posX > 0) {
        this.close();
      } else if (this.openedLeft && openRight && posX < 0) {
        this.close();
      } else if (openRight && posX < 0) {
        this.open(-btnsRightWidth, false, true);
      } else if (openLeft && posX > 0) {
        this.open(btnsLeftWidth, true, false);
      } else {
        this.close();
      }
    }
  }, {
    key: 'onTap',
    value: function onTap(e) {
      if (this.openedLeft || this.openedRight) {
        e.preventDefault();
        this.close();
      }
    }

    // left & right button click

  }, {
    key: 'onBtnClick',
    value: function onBtnClick(btn) {
      var onPress = btn.onPress;
      if (onPress) {
        onPress();
      }
      if (this.props.autoClose) {
        this.close();
      }
    }
  }, {
    key: '_getContentEasing',
    value: function _getContentEasing(value, limit) {
      // limit content style left when value > actions width
      if (value < 0 && value < limit) {
        return limit - Math.pow(limit - value, 0.85);
      } else if (value > 0 && value > limit) {
        return limit + Math.pow(value - limit, 0.85);
      }
      return value;
    }

    // set content & actions style

  }, {
    key: '_setStyle',
    value: function _setStyle(value) {
      var _props2 = this.props,
          left = _props2.left,
          right = _props2.right;

      var limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth;
      var contentLeft = this._getContentEasing(value, limit);
      this.refs.content.style.left = contentLeft + 'px';
      if (left.length) {
        var leftWidth = Math.max(Math.min(value, Math.abs(limit)), 0);
        this.refs.left.style.width = leftWidth + 'px';
      }
      if (right.length) {
        var rightWidth = Math.max(Math.min(-value, Math.abs(limit)), 0);
        this.refs.right.style.width = rightWidth + 'px';
      }
    }
  }, {
    key: 'open',
    value: function open(value, openedLeft, openedRight) {
      if (!this.openedLeft && !this.openedRight) {
        this.props.onOpen();
      }

      this.openedLeft = openedLeft;
      this.openedRight = openedRight;

      this.setState({
        direction: 'DIRECTION_HORIZONTAL'
      });

      this._setStyle(value);
    }
  }, {
    key: 'close',
    value: function close() {
      var _props3 = this.props,
          left = _props3.left,
          right = _props3.right;


      if (this.openedLeft || this.openedRight) {
        this.props.onClose();
      }

      if (left.length && right.length) {
        this.setState({
          direction: 'DIRECTION_HORIZONTAL'
        });
      } else if (left.length && right.length === 0) {
        this.setState({
          direction: 'DIRECTION_RIGHT'
        });
      } else if (right.length && left.length === 0) {
        this.setState({
          direction: 'DIRECTION_LEFT'
        });
      }

      this.openedLeft = false;
      this.openedRight = false;
      this._setStyle(0);
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons(buttons, ref) {
      var _this2 = this;

      var prefixCls = this.props.prefixCls;

      return buttons && buttons.length ? _react2.default.createElement(
        'div',
        { className: prefixCls + '-actions ' + prefixCls + '-actions-' + ref, ref: ref },
        buttons.map(function (btn, i) {
          return _react2.default.createElement(
            'div',
            { key: i,
              className: prefixCls + '-btn',
              style: btn.style,
              onClick: function onClick() {
                return _this2.onBtnClick(btn);
              }
            },
            _react2.default.createElement(
              'div',
              { className: prefixCls + '-text' },
              btn.text || 'Click'
            )
          );
        })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _splitObject = (0, _splitObject4.default)(this.props, ['prefixCls', 'left', 'right', 'children']),
          _splitObject2 = _slicedToArray(_splitObject, 2),
          _splitObject2$ = _splitObject2[0],
          prefixCls = _splitObject2$.prefixCls,
          left = _splitObject2$.left,
          right = _splitObject2$.right,
          children = _splitObject2$.children,
          restProps = _splitObject2[1];

      var divProps = (0, _object2.default)(restProps, ['disabled', 'autoClose', 'onOpen', 'onClose']);

      return left.length || right.length ? _react2.default.createElement(
        'div',
        _extends({ className: '' + prefixCls }, divProps),
        _react2.default.createElement(
          _rcHammerjs2.default,
          {
            direction: this.state.direction,
            onPanStart: this.onPanStart,
            onPan: this.onPan,
            onPanEnd: this.onPanEnd,
            onTap: this.onTap
          },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-content', ref: 'content' },
            children
          )
        ),
        this.renderButtons(left, 'left'),
        this.renderButtons(right, 'right')
      ) : _react2.default.createElement(
        'div',
        _extends({ ref: 'content' }, divProps),
        children
      );
    }
  }]);

  return Swipeout;
}(_react2.default.Component), _class.propTypes = {
  prefixCls: _react.PropTypes.string,
  autoClose: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  left: _react.PropTypes.arrayOf(_react.PropTypes.object),
  right: _react.PropTypes.arrayOf(_react.PropTypes.object),
  onOpen: _react.PropTypes.func,
  onClose: _react.PropTypes.func,
  children: _react.PropTypes.any
}, _class.defaultProps = {
  prefixCls: 'rc-swipeout',
  autoClose: false,
  disabled: false,
  left: [],
  right: [],
  onOpen: function onOpen() {},
  onClose: function onClose() {}
}, _temp);
exports.default = Swipeout;