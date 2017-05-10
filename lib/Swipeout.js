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

var _reactNative = require('react-native');

var _reactNativeSwipeOut = require('react-native-swipe-out');

var _reactNativeSwipeOut2 = _interopRequireDefault(_reactNativeSwipeOut);

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
      show: false,
      paddingTop: 0
    };
    return _this;
  }

  _createClass(Swipeout, [{
    key: 'renderCustomButton',
    value: function renderCustomButton(button) {
      var buttonStyle = button.style || {};
      var bgColor = buttonStyle.backgroundColor || 'transparent';
      var Component = _react2.default.createElement(
        _reactNative.View,
        {
          style: {
            flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor
          }
        },
        _react2.default.createElement(
          _reactNative.Text,
          { style: [button.style, { textAlign: 'center' }] },
          button.text
        )
      );
      return {
        text: button.text || 'Click',
        onPress: button.onPress,
        type: 'default',
        component: Component,
        backgroundColor: 'transparent',
        color: '#999',
        disabled: false
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _splitObject = (0, _splitObject4.default)(this.props, ['disabled', 'autoClose', 'style', 'left', 'right', 'onOpen', 'onClose', 'children']),
          _splitObject2 = _slicedToArray(_splitObject, 2),
          _splitObject2$ = _splitObject2[0],
          disabled = _splitObject2$.disabled,
          autoClose = _splitObject2$.autoClose,
          style = _splitObject2$.style,
          left = _splitObject2$.left,
          right = _splitObject2$.right,
          onOpen = _splitObject2$.onOpen,
          onClose = _splitObject2$.onClose,
          children = _splitObject2$.children,
          restProps = _splitObject2[1];

      var customLeft = left.map(function (btn) {
        return _this2.renderCustomButton(btn);
      });
      var customRight = right.map(function (btn) {
        return _this2.renderCustomButton(btn);
      });

      return (left.length || right.length) && !disabled ? _react2.default.createElement(
        _reactNativeSwipeOut2.default,
        {
          autoClose: autoClose,
          left: customLeft,
          right: customRight,
          style: style,
          onOpen: onOpen,
          onClose: onClose
        },
        children
      ) : _react2.default.createElement(
        _reactNative.View,
        _extends({ style: style }, restProps),
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
  autoClose: false,
  disabled: false,
  left: [],
  right: [],
  onOpen: function onOpen() {},
  onClose: function onClose() {}
}, _temp);
exports.default = Swipeout;