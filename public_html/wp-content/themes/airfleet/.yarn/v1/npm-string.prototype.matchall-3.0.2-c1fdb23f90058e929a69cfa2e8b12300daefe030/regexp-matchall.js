'use strict';

var ES = require('es-abstract/es2019');
var flagsGetter = require('regexp.prototype.flags');

var RegExpStringIterator = require('./helpers/RegExpStringIterator');
var OrigRegExp = RegExp;

var CreateRegExpStringIterator = function CreateRegExpStringIterator(R, S, global, fullUnicode) {
	if (ES.Type(S) !== 'String') {
		throw new TypeError('"S" value must be a String');
	}
	if (ES.Type(global) !== 'Boolean') {
		throw new TypeError('"global" value must be a Boolean');
	}
	if (ES.Type(fullUnicode) !== 'Boolean') {
		throw new TypeError('"fullUnicode" value must be a Boolean');
	}

	var iterator = new RegExpStringIterator(R, S, global, fullUnicode);
	return iterator;
};

var supportsConstructingWithFlags = 'flags' in RegExp.prototype;

var constructRegexWithFlags = function constructRegex(C, R) {
	var matcher;
	// workaround for older engines that lack RegExp.prototype.flags
	var flags = 'flags' in R ? ES.Get(R, 'flags') : ES.ToString(flagsGetter(R));
	if (supportsConstructingWithFlags && typeof flags === 'string') {
		matcher = new C(R, flags);
	} else if (C === OrigRegExp) {
		// workaround for older engines that can not construct a RegExp with flags
		matcher = new C(R.source, flags);
	} else {
		matcher = new C(R, flags);
	}
	return { flags: flags, matcher: matcher };
};

var regexMatchAll = function SymbolMatchAll(string) {
	var R = this;
	if (ES.Type(R) !== 'Object') {
		throw new TypeError('"this" value must be an Object');
	}
	var S = ES.ToString(string);
	var C = ES.SpeciesConstructor(R, OrigRegExp);

	var tmp = constructRegexWithFlags(C, R);
	// var flags = ES.ToString(ES.Get(R, 'flags'));
	var flags = tmp.flags;
	// var matcher = ES.Construct(C, [R, flags]);
	var matcher = tmp.matcher;

	var lastIndex = ES.ToLength(ES.Get(R, 'lastIndex'));
	ES.Set(matcher, 'lastIndex', lastIndex, true);
	var global = flags.indexOf('g') > -1;
	var fullUnicode = flags.indexOf('u') > -1;
	return CreateRegExpStringIterator(matcher, S, global, fullUnicode);
};

var defineP = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

if (defineP && gOPD) {
	var desc = gOPD(regexMatchAll, 'name');
	if (desc && desc.configurable) {
		defineP(regexMatchAll, 'name', { value: '[Symbol.matchAll]' });
	}
}

module.exports = regexMatchAll;
