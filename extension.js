const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('jsonl-tools.expand', function () {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			let text = editor.document.getText();
			overwriteDocument(editor, text, expandJson(text));

		})
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('jsonl-tools.collapse', function () {
			let editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			let text = editor.document.getText();
			overwriteDocument(editor, text, collapseJson(text));
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('jsonl-tools.collapse-and-save', function () {
			vscode.commands.executeCommand('jsonl-tools.collapse').then(() => {
				vscode.commands.executeCommand('workbench.action.files.save');
			});
		})
	);

	//on save, collapse the jsonl first
	vscode.workspace.onWillSaveTextDocument((e) => {
		if (e.document.languageId === 'jsonl') {
			vscode.commands.executeCommand('jsonl-tools.collapse');
		}
	});
}

function overwriteDocument(editor, content, newContent) {
	editor.edit(editBuilder => {
		const documentStart = editor.document.positionAt(0);
		const documentEnd = editor.document.positionAt(content.length);
		const range = new vscode.Range(documentStart, documentEnd);
		editBuilder.replace(range, newContent);
	});
}

function expandJson(content) {
	const n_spaces = 2;
	let finalNewline = false;
	let formattedContent;
	try {
		let lines = content.split('\n');

		// remove the final newline if it exists and set variable to add it back later
		if (lines[lines.length - 1] === '') {
			lines.pop();
			finalNewline = true;
		}
		let formattedLines = lines.map(line => {
			let stringified_line = JSON.stringify(JSON.parse(line), null, n_spaces);
			//indent each line in the stringified json by n_spaces
			let indented_lines = stringified_line.split('\n').map((l) => ' '.repeat(n_spaces) + l);
			return indented_lines.join('\n');

		});
		formattedContent = "[\n" + formattedLines.join(',\n') + "\n]";
		if (finalNewline) {
			formattedContent += '\n';
		}
	} catch (e) {
		return content;
	}
	return formattedContent
}

function collapseJson(content) {
	let formattedContent;
	let finalNewline = false;

	// remove the final newline if it exists and set variable to add it back later
	if (content[content.length - 1] === '\n') {
		content = content.slice(0, -1);
		finalNewline = true;
	}

	try {
		let lines = JSON.parse(content);
		let formattedLines = lines.map(line => JSON.stringify(line));

		formattedContent = formattedLines.join('\n');
		if (finalNewline) {
			formattedContent += '\n';
		}
	} catch (e) {
		return content;
	}
	return formattedContent;
}


function deactivate() { }

module.exports = {
	activate,
	deactivate,
	expandJson,
	collapseJson
}
