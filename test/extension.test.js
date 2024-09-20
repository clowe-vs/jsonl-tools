const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const jsonlExpander = require('../extension');


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const collapsed = `{"a":1}\n{"b":2}`;
	const expanded = `[\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]`;

	test('Expand test', () => {
		assert.strictEqual(jsonlExpander.expandJson(collapsed), expanded);
	});

	test('Collapse test', () => {
		const content = `{"a": 1}\n{"b": 2}`;
		const expected = `[\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]`;
		assert.strictEqual(jsonlExpander.collapseJson(expanded), collapsed);
	});


	const collapsed_newline = `{"a":1}\n{"b":2}\n`;
	const expanded_newline = `[\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]\n`;

	test('Expand test newline', () => {
		assert.strictEqual(jsonlExpander.expandJson(collapsed_newline), expanded_newline);
	});

	test('Collapse test newline', () => {
		const content = `{"a": 1}\n{"b": 2}`;
		const expected = `[\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]`;
		assert.strictEqual(jsonlExpander.collapseJson(expanded_newline), collapsed_newline);
	});


	const collapsed_url = `{"name":"test","url":"http://example.com","diplayTitle":"test 1"}`;
	const expanded_url = `[\n  {\n    "name": "test",\n    "url": "http://example.com",\n    "diplayTitle": "test 1"\n  }\n]`;

	test('Expand test url', () => {
		assert.strictEqual(jsonlExpander.expandJson(collapsed_url), expanded_url);
	});

	test('Collapse test url', () => {
		const content = `{"a": 1}\n{"b": 2}`;
		const expected = `[\n  {\n    "a": 1\n  },\n  {\n    "b": 2\n  }\n]`;
		assert.strictEqual(jsonlExpander.collapseJson(expanded_url), collapsed_url);
	});
});