"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./BlockAssetContainer.scss");

/* eslint react/no-did-mount-set-state : 0 */

/**
 * This module exports a wrapper for block assets.
 * It handles context-related interactions with upstream environment
 * and provides a simple prop-based api to the asset components passed
 * at editor's implementation
 * @module scholar-draft/BlockAssetContainer
 */
var BlockAssetContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockAssetContainer, _Component);

  function BlockAssetContainer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BlockAssetContainer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockAssetContainer).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "render", function () {
      var _this$state = _this.state,
          asset = _this$state.asset,
          renderingMode = _this$state.renderingMode,
          customContext = _this$state.customContext;

      if (!asset) {
        return null;
      }

      var _this$context = _this.context,
          onAssetMouseOver = _this$context.onAssetMouseOver,
          onAssetMouseOut = _this$context.onAssetMouseOut,
          onAssetChange = _this$context.onAssetChange,
          onAssetFocus = _this$context.onAssetFocus,
          onAssetBlur = _this$context.onAssetBlur,
          iconMap = _this$context.iconMap;
      var _this$props = _this.props,
          _this$props$blockProp = _this$props.blockProps,
          assetId = _this$props$blockProp.assetId,
          AssetComponent = _this$props$blockProp.AssetComponent,
          children = _this$props.children;

      var onMOver = function onMOver(event) {
        event.stopPropagation();

        if (typeof onMouseOver === 'function') {
          onAssetMouseOver(asset.id, asset, event);
        }
      };

      var onMOut = function onMOut(event) {
        event.stopPropagation();

        if (typeof onMouseOut === 'function') {
          onAssetMouseOut(asset.id, asset, event);
        }
      };

      var renderEmptyComponent = function renderEmptyComponent() {
        return _react.default.createElement("div", null);
      };

      var RealAssetComponent = typeof AssetComponent === 'function' ? AssetComponent : renderEmptyComponent;
      return _react.default.createElement("div", {
        className: 'scholar-draft-BlockAssetContainer',
        onMouseOver: onMOver,
        onFocus: onMOver,
        onMouseOut: onMOut,
        onBlur: onMOut
      }, _react.default.createElement(RealAssetComponent, {
        assetId: assetId,
        asset: asset,
        customContext: customContext,
        onAssetChange: onAssetChange,
        onAssetFocus: onAssetFocus,
        onAssetBlur: onAssetBlur,
        iconMap: iconMap,
        renderingMode: renderingMode
      }, children));
    });
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(BlockAssetContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        asset: this.context.assets[this.props.blockProps.assetId],
        renderingMode: this.props.blockProps.renderingMode
      });
      this.unsubscribe = this.context.emitter.subscribeToAssets(function (assets) {
        var asset = assets[_this2.props.blockProps.assetId]; // if (asset !== this.state.asset) {

        _this2.setState({
          asset: asset
        }); // }

      });
      this.unsubscribeToCustomContext = this.context.emitter.subscribeToCustomContext(function (customContext) {
        if (customContext !== _this2.state.customContext) {
          _this2.setState({
            customContext: customContext
          });
        }
      });
      this.unsubscribeToRenderingMode = this.context.emitter.subscribeToRenderingMode(function (renderingMode) {
        // if (this.state.renderingMode !== renderingMode) {
        _this2.setState({
          renderingMode: renderingMode
        }); // }

      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unsubscribe();
      this.unsubscribeToRenderingMode();
      this.unsubscribeToCustomContext();
    }
  }]);
  return BlockAssetContainer;
}(_react.Component);

(0, _defineProperty2.default)(BlockAssetContainer, "contextTypes", {
  emitter: _propTypes.default.object,
  assets: _propTypes.default.object,
  iconMap: _propTypes.default.object,
  renderingMode: _propTypes.default.string,
  onAssetMouseOver: _propTypes.default.func,
  onAssetMouseOut: _propTypes.default.func,
  onAssetChange: _propTypes.default.func,
  onAssetFocus: _propTypes.default.func,
  onAssetBlur: _propTypes.default.func
});
BlockAssetContainer.propTypes = {
  children: _propTypes.default.array,
  assetId: _propTypes.default.string,
  blockProps: _propTypes.default.shape({
    assetId: _propTypes.default.string,
    AssetComponent: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.element]),
    renderingMode: _propTypes.default.string
  })
};
var _default = BlockAssetContainer;
exports.default = _default;
module.exports = exports.default;