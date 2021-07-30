"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToggleState = exports.renderToRoot = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const renderToRoot = (Element, { strictMode = true, selector = "#root" }) => {
    react_dom_1.default.render(strictMode ? react_1.default.createElement(react_1.default.StrictMode, null, Element) : Element, document.querySelector(selector));
};
exports.renderToRoot = renderToRoot;
const useToggleState = (
/**
 * @default false
 */
initialState = false) => {
    const [state, setState] = react_1.useState(initialState);
    return react_1.useMemo(() => {
        return {
            isOpen: state,
            on: () => setState(true),
            off: () => setState(false),
            toggle: () => setState(s => !s)
        };
    }, [state]);
};
exports.useToggleState = useToggleState;
