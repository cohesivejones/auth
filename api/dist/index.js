"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes_1 = __importDefault(require("./routes"));
const config = __importStar(require("./config"));
const APP_PORT = 4000;
const APP_NAME = "AUTH";
const app = express_1.default();
const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Auth token invalid' });
            }
            else {
                next();
            }
        });
    }
    else {
        return res.status(401).json({ message: 'Auth token not supplied' });
    }
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/auth', routes_1.default());
app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
//# sourceMappingURL=index.js.map