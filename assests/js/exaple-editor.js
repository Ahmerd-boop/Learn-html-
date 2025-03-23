function runCode(button) { const container = button.closest(".example-editor");
const code = container.querySelector(".codeEditor").value;    
const outputFrame = container.querySelector(".output");
outputFrame.srcdoc = code; }  function autoRunCode(textarea) {     
const container = textarea.closest(".example-editor");
clearTimeout(container.autoRunTimer);
container.autoRunTimer = setTimeout(() => runCode(container.querySelector("button")), 500);}  
function downloadCode(button) {     const container = button.closest(".example-editor");     
const code = container.querySelector(".codeEditor").value;     
const blob = new Blob([code], { type: "text/html" });     
const link = document.createElement("a");     
link.href = URL.createObjectURL(blob);     
link.download = "CodeNova.html";     link.click(); }  window.onload = () => {     
document.querySelectorAll(".example-editor").forEach(editor => {         
runCode(editor.querySelector("button"));     }); };           

