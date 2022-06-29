"use strict";

var _index = require("./middlewares/index");

var _mongo = _interopRequireDefault(require("./config/mongo"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _member = _interopRequireDefault(require("./routes/member"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _link = _interopRequireDefault(require("./routes/link"));

var _band = _interopRequireDefault(require("./routes/band"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express.default)();

_dotenv.default.config();

(0, _mongo.default)();
server.use(_express.default.json());
server.use('/api-docs', _swaggerUiExpress.default.serve, (0, _index.swaggerMiddleware)());
server.use(_auth.default);
server.use((0, _cors.default)());
server.use(_express.default.static('public'));
server.use(_index.authMiddleware);
server.use(_member.default);
server.use(_link.default);
server.use(_band.default);
server.listen(process.env.SERVER_PORT, () => {
  console.log(`server listening on port http://localhost:${process.env.SERVER_PORT}`);
});