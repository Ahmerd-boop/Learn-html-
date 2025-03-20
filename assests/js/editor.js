function insertTag(tag) {
    let editor = document.getElementById('code');
    let start = editor.selectionStart;
    let end = editor.selectionEnd;
    let text = editor.value;
    let before = text.substring(0, start);
    let after = text.substring(end, text.length);
    editor.value = before + tag + after;
    editor.focus();
    editor.setSelectionRange(start + tag.length, start + tag.length);
}

function runCode() {
    let code = document.getElementById('code').value;
    document.getElementById('output').innerHTML = code;
}

        document.getElementById('editor').addEventListener('click', function() {
        document.getElementById('editor-container').style.display = 'block';
    });
    function runCode() {
        let code = document.getElementById('code').value;
        let output = document.getElementById('output').contentWindow.document;
        output.open();
        output.write(code);
        output.close();
    }

    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode: "xml",
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true
    });
    