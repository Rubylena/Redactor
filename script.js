function redactText(text, redactWords, replacementChar) {
  if (redactWords.length === 0) {
    return text;
  }
  const regex = new RegExp(`\\b(${redactWords.join("|")})\\b`, "g");
  return text.replace(regex, replacementChar);
}

document.getElementById("redactButton").addEventListener("click", function () {
  const startTime = new Date();
  const inputText = document.getElementById("inputText").value;
  const redactWordsInput = document.getElementById("redactWords").value;
  const redactWords =
    redactWordsInput.trim() === "" ? [] : redactWordsInput.split(" ");
  const replacementChar = document.getElementById("replacementChar").value;

  const redactedText = redactText(inputText, redactWords, replacementChar);
  const outputElement = document.getElementById("output");
  outputElement.style.display = "block";
  outputElement.classList.add("output");
  outputElement.innerHTML = `<p class='output-text'><b>OUTPUT:</b> ${redactedText.length > 0 ? redactedText : "<span style='color: red;' >No text added for redacting.</span>"}</p>`;

  // Display stats
  const wordsScanned =
    inputText.trim() === "" ? 0 : inputText.split(/\s+/).length;
  const wordsRedacted =
    redactWordsInput.trim() === ""
      ? 0
      : inputText.match(new RegExp(`\\b(${redactWords.join("|")})\\b`, "g"))
          .length;
  const charactersScrambled = redactedText.length;

  outputElement.innerHTML += `<b>STATS</b>`;
  outputElement.innerHTML += `<p>Words scanned: <span class="bold">${wordsScanned}</span></p>`;
  outputElement.innerHTML += `<p>Words redacted: <span class="bold">${wordsRedacted}</span></p>`;
  outputElement.innerHTML += `<p>Characters scrambled: <span class="bold">${charactersScrambled}</span></p>`;

  const endTime = new Date();
  const elapsedTime = (endTime - startTime) / 1000;
  outputElement.innerHTML += `<p>Elapsed time: <span class="bold">${elapsedTime} second(s)</span></p>`;
});

document.getElementById("reset").addEventListener("click", () => {
  const outputElement = document.getElementById("output");
  outputElement.style.display = "none";
});
