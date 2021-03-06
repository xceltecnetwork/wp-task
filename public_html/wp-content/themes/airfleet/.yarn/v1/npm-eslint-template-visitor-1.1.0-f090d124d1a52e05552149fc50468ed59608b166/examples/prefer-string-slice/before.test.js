
import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';

import run from './_common';
import rule from './before';

const ruleTester = avaRuleTester(test, {
	env: {
		es6: true,
	},
});

run(ruleTester, rule);
