"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const swaggerMiddleware = () => {
  const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Admin Panel API Specs'
  };

  const swaggerDocument = _yamljs.default.load('./src/config/swagger.yaml');

  return _swaggerUiExpress.default.setup(swaggerDocument, options);
};

var _default = swaggerMiddleware;
exports.default = _default;