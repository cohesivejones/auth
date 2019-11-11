"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = __importStar(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const MOCKED_USERNAME = "MOCKED_USERNAME";
const MOCKED_PASSWORD = "MOCKED_PASSWORD";
const createToken = (username) => jsonwebtoken_1.default.sign({ username }, config.secret, { expiresIn: '24h' });
const validUser = (username, password) => (username === MOCKED_USERNAME &&
    password === MOCKED_PASSWORD);
function login(req, res, next) {
    const { username, password } = req.body;
    if (validUser(username, password)) {
        res.status(200).json({
            message: 'Authentication success',
            token: createToken(username)
        });
    }
    else {
        res.status(403).json({ message: 'Authentication failed' });
    }
}
exports.login = login;
;
//# sourceMappingURL=index.js.map