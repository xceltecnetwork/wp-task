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
const ts = __importStar(require("typescript"));
const tsutils_1 = require("tsutils");
const util_1 = require("../util");
// Truthiness utilities
// #region
const isTruthyLiteral = (type) => tsutils_1.isBooleanLiteralType(type, true) || (tsutils_1.isLiteralType(type) && !!type.value);
const isPossiblyFalsy = (type) => tsutils_1.unionTypeParts(type)
    // PossiblyFalsy flag includes literal values, so exclude ones that
    // are definitely truthy
    .filter(t => !isTruthyLiteral(t))
    .some(type => tsutils_1.isTypeFlagSet(type, ts.TypeFlags.PossiblyFalsy));
const isPossiblyTruthy = (type) => tsutils_1.unionTypeParts(type).some(type => !tsutils_1.isFalsyType(type));
// Nullish utilities
const nullishFlag = ts.TypeFlags.Undefined | ts.TypeFlags.Null;
const isNullishType = (type) => tsutils_1.isTypeFlagSet(type, nullishFlag);
const isPossiblyNullish = (type) => tsutils_1.unionTypeParts(type).some(isNullishType);
const isAlwaysNullish = (type) => tsutils_1.unionTypeParts(type).every(isNullishType);
// isLiteralType only covers numbers and strings, this is a more exhaustive check.
const isLiteral = (type) => tsutils_1.isBooleanLiteralType(type, true) ||
    tsutils_1.isBooleanLiteralType(type, false) ||
    type.flags === ts.TypeFlags.Undefined ||
    type.flags === ts.TypeFlags.Null ||
    type.flags === ts.TypeFlags.Void ||
    tsutils_1.isLiteralType(type);
exports.default = util_1.createRule({
    name: 'no-unnecessary-condition',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prevents conditionals where the type is always truthy or always falsy',
            category: 'Best Practices',
            recommended: false,
            requiresTypeChecking: true,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    allowConstantLoopConditions: {
                        type: 'boolean',
                    },
                    ignoreRhs: {
                        type: 'boolean',
                    },
                },
                additionalProperties: false,
            },
        ],
        fixable: 'code',
        messages: {
            alwaysTruthy: 'Unnecessary conditional, value is always truthy.',
            alwaysFalsy: 'Unnecessary conditional, value is always falsy.',
            neverNullish: 'Unnecessary conditional, expected left-hand side of `??` operator to be possibly null or undefined.',
            alwaysNullish: 'Unnecessary conditional, left-hand side of `??` operator is always `null` or `undefined`',
            literalBooleanExpression: 'Unnecessary conditional, both sides of the expression are literal values',
            never: 'Unnecessary conditional, value is `never`',
            neverOptionalChain: 'Unnecessary optional chain on a non-nullish value',
        },
    },
    defaultOptions: [
        {
            allowConstantLoopConditions: false,
            ignoreRhs: false,
        },
    ],
    create(context, [{ allowConstantLoopConditions, ignoreRhs }]) {
        const service = util_1.getParserServices(context);
        const checker = service.program.getTypeChecker();
        const sourceCode = context.getSourceCode();
        function getNodeType(node) {
            const tsNode = service.esTreeNodeToTSNodeMap.get(node);
            return util_1.getConstrainedTypeAtLocation(checker, tsNode);
        }
        /**
         * Checks if a conditional node is necessary:
         * if the type of the node is always true or always false, it's not necessary.
         */
        function checkNode(node) {
            const type = getNodeType(node);
            // Conditional is always necessary if it involves:
            //    `any` or `unknown` or a naked type parameter
            if (tsutils_1.unionTypeParts(type).some(part => tsutils_1.isTypeFlagSet(part, ts.TypeFlags.Any |
                ts.TypeFlags.Unknown |
                ts.TypeFlags.TypeParameter))) {
                return;
            }
            const messageId = tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Never)
                ? 'never'
                : !isPossiblyTruthy(type)
                    ? 'alwaysFalsy'
                    : !isPossiblyFalsy(type)
                        ? 'alwaysTruthy'
                        : undefined;
            if (messageId) {
                context.report({ node, messageId });
            }
        }
        function checkNodeForNullish(node) {
            const type = getNodeType(node);
            // Conditional is always necessary if it involves `any` or `unknown`
            if (tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
                return;
            }
            const messageId = tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Never)
                ? 'never'
                : !isPossiblyNullish(type)
                    ? 'neverNullish'
                    : isAlwaysNullish(type)
                        ? 'alwaysNullish'
                        : undefined;
            if (messageId) {
                context.report({ node, messageId });
            }
        }
        /**
         * Checks that a binary expression is necessarily conditional, reports otherwise.
         * If both sides of the binary expression are literal values, it's not a necessary condition.
         *
         * NOTE: It's also unnecessary if the types that don't overlap at all
         *    but that case is handled by the Typescript compiler itself.
         */
        const BOOL_OPERATORS = new Set([
            '<',
            '>',
            '<=',
            '>=',
            '==',
            '===',
            '!=',
            '!==',
        ]);
        function checkIfBinaryExpressionIsNecessaryConditional(node) {
            if (BOOL_OPERATORS.has(node.operator) &&
                isLiteral(getNodeType(node.left)) &&
                isLiteral(getNodeType(node.right))) {
                context.report({ node, messageId: 'literalBooleanExpression' });
            }
        }
        /**
         * Checks that a testable expression is necessarily conditional, reports otherwise.
         * Filters all LogicalExpressions to prevent some duplicate reports.
         */
        function checkIfTestExpressionIsNecessaryConditional(node) {
            if (node.test.type === experimental_utils_1.AST_NODE_TYPES.LogicalExpression) {
                return;
            }
            checkNode(node.test);
        }
        /**
         * Checks that a logical expression contains a boolean, reports otherwise.
         */
        function checkLogicalExpressionForUnnecessaryConditionals(node) {
            if (node.operator === '??') {
                checkNodeForNullish(node.left);
                return;
            }
            checkNode(node.left);
            if (!ignoreRhs) {
                checkNode(node.right);
            }
        }
        /**
         * Checks that a testable expression of a loop is necessarily conditional, reports otherwise.
         */
        function checkIfLoopIsNecessaryConditional(node) {
            if (node.test === null ||
                node.test.type === experimental_utils_1.AST_NODE_TYPES.LogicalExpression) {
                return;
            }
            /**
             * Allow:
             *   while (true) {}
             *   for (;true;) {}
             *   do {} while (true)
             */
            if (allowConstantLoopConditions &&
                tsutils_1.isBooleanLiteralType(getNodeType(node.test), true)) {
                return;
            }
            checkNode(node.test);
        }
        function checkOptionalChain(node, beforeOperator, fix) {
            // We only care if this step in the chain is optional. If just descend
            // from an optional chain, then that's fine.
            if (!node.optional) {
                return;
            }
            const type = getNodeType(node);
            if (tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Any) ||
                tsutils_1.isTypeFlagSet(type, ts.TypeFlags.Unknown) ||
                util_1.isNullableType(type, { allowUndefined: true })) {
                return;
            }
            const questionDotOperator = util_1.nullThrows(sourceCode.getTokenAfter(beforeOperator, token => token.type === experimental_utils_1.AST_TOKEN_TYPES.Punctuator && token.value === '?.'), util_1.NullThrowsReasons.MissingToken('operator', node.type));
            context.report({
                node,
                loc: questionDotOperator.loc,
                messageId: 'neverOptionalChain',
                fix(fixer) {
                    return fixer.replaceText(questionDotOperator, fix);
                },
            });
        }
        function checkOptionalMemberExpression(node) {
            checkOptionalChain(node, node.object, '.');
        }
        function checkOptionalCallExpression(node) {
            checkOptionalChain(node, node.callee, '');
        }
        return {
            BinaryExpression: checkIfBinaryExpressionIsNecessaryConditional,
            ConditionalExpression: checkIfTestExpressionIsNecessaryConditional,
            DoWhileStatement: checkIfLoopIsNecessaryConditional,
            ForStatement: checkIfLoopIsNecessaryConditional,
            IfStatement: checkIfTestExpressionIsNecessaryConditional,
            LogicalExpression: checkLogicalExpressionForUnnecessaryConditionals,
            WhileStatement: checkIfLoopIsNecessaryConditional,
            OptionalMemberExpression: checkOptionalMemberExpression,
            OptionalCallExpression: checkOptionalCallExpression,
        };
    },
});
//# sourceMappingURL=no-unnecessary-condition.js.map