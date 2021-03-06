"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const eslint_utils_1 = require("eslint-utils");
const util = __importStar(require("../util"));
exports.default = util.createRule({
    name: 'space-before-function-paren',
    meta: {
        type: 'layout',
        docs: {
            description: 'Enforces consistent spacing before function parenthesis',
            category: 'Stylistic Issues',
            recommended: false,
        },
        fixable: 'whitespace',
        schema: [
            {
                oneOf: [
                    {
                        enum: ['always', 'never'],
                    },
                    {
                        type: 'object',
                        properties: {
                            anonymous: {
                                enum: ['always', 'never', 'ignore'],
                            },
                            named: {
                                enum: ['always', 'never', 'ignore'],
                            },
                            asyncArrow: {
                                enum: ['always', 'never', 'ignore'],
                            },
                        },
                        additionalProperties: false,
                    },
                ],
            },
        ],
        messages: {
            unexpected: 'Unexpected space before function parentheses.',
            missing: 'Missing space before function parentheses.',
        },
    },
    defaultOptions: ['always'],
    create(context) {
        const sourceCode = context.getSourceCode();
        const baseConfig = typeof context.options[0] === 'string' ? context.options[0] : 'always';
        const overrideConfig = typeof context.options[0] === 'object' ? context.options[0] : {};
        /**
         * Determines whether a function has a name.
         * @param {ASTNode} node The function node.
         * @returns {boolean} Whether the function has a name.
         */
        function isNamedFunction(node) {
            if (node.id) {
                return true;
            }
            const parent = node.parent;
            return (parent.type === experimental_utils_1.AST_NODE_TYPES.MethodDefinition ||
                (parent.type === experimental_utils_1.AST_NODE_TYPES.Property &&
                    (parent.kind === 'get' || parent.kind === 'set' || parent.method)));
        }
        /**
         * Gets the config for a given function
         * @param {ASTNode} node The function node
         * @returns {string} "always", "never", or "ignore"
         */
        function getConfigForFunction(node) {
            var _a, _b, _c;
            if (node.type === experimental_utils_1.AST_NODE_TYPES.ArrowFunctionExpression) {
                // Always ignore non-async functions and arrow functions without parens, e.g. async foo => bar
                if (node.async &&
                    eslint_utils_1.isOpeningParenToken(sourceCode.getFirstToken(node, { skip: 1 }))) {
                    return _a = overrideConfig.asyncArrow, (_a !== null && _a !== void 0 ? _a : baseConfig);
                }
            }
            else if (isNamedFunction(node)) {
                return _b = overrideConfig.named, (_b !== null && _b !== void 0 ? _b : baseConfig);
                // `generator-star-spacing` should warn anonymous generators. E.g. `function* () {}`
            }
            else if (!node.generator) {
                return _c = overrideConfig.anonymous, (_c !== null && _c !== void 0 ? _c : baseConfig);
            }
            return 'ignore';
        }
        /**
         * Checks the parens of a function node
         * @param {ASTNode} node A function node
         * @returns {void}
         */
        function checkFunction(node) {
            const functionConfig = getConfigForFunction(node);
            if (functionConfig === 'ignore') {
                return;
            }
            let leftToken, rightToken;
            if (node.typeParameters) {
                leftToken = sourceCode.getLastToken(node.typeParameters);
                rightToken = sourceCode.getTokenAfter(leftToken);
            }
            else {
                rightToken = sourceCode.getFirstToken(node, eslint_utils_1.isOpeningParenToken);
                leftToken = sourceCode.getTokenBefore(rightToken);
            }
            const hasSpacing = sourceCode.isSpaceBetweenTokens(leftToken, rightToken);
            if (hasSpacing && functionConfig === 'never') {
                context.report({
                    node,
                    loc: leftToken.loc.end,
                    messageId: 'unexpected',
                    fix: fixer => fixer.removeRange([leftToken.range[1], rightToken.range[0]]),
                });
            }
            else if (!hasSpacing &&
                functionConfig === 'always' &&
                (!node.typeParameters || node.id)) {
                context.report({
                    node,
                    loc: leftToken.loc.end,
                    messageId: 'missing',
                    fix: fixer => fixer.insertTextAfter(leftToken, ' '),
                });
            }
        }
        return {
            ArrowFunctionExpression: checkFunction,
            FunctionDeclaration: checkFunction,
            FunctionExpression: checkFunction,
        };
    },
});
//# sourceMappingURL=space-before-function-paren.js.map