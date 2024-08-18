const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const jsonlExpander = require('../extension');


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const collapsed = `{"a":1}\n{"b":2}`;
	const expanded = `[// lines autoexpanded as a list\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]`;

	test('Expand test', () => {
		assert.strictEqual(jsonlExpander.expandJson(collapsed), expanded);
	});

	test('Collapse test', () => {
		const content = `{"a": 1}\n{"b": 2}`;
		const expected = `[// lines autoexpanded as a list\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]`;
		assert.strictEqual(jsonlExpander.collapseJson(expanded), collapsed);
	});
});