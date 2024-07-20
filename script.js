document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById("textInput");
    const languageSelect = document.getElementById("languageSelect");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const outputDiv = document.getElementById("output");

    let sentences = [];
    let currentIndex = 0;
    let isPlaying = false;

    function translateText(text, targetLang) {
        // Create an iframe to use Google Translate
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `https://translate.google.com/?sl=de&tl=${targetLang}&text=${encodeURIComponent(text)}`;
        document.body.appendChild(iframe);

        // Wait for iframe to load and get the translated text
        iframe.onload = function () {
            setTimeout(() => {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const translationElement = iframeDoc.querySelector(".tlid-translation.translation"); // This is where the translation text is located
                if (translationElement) {
                    const translatedText = translationElement.textContent;
                    outputDiv.innerHTML = `<p><strong>Übersetzung:</strong> ${translatedText}</p>`;
                } else {
                    outputDiv.innerHTML = `<p><strong>Übersetzung:</strong> Keine Übersetzung verfügbar</p>`;
                }
                document.body.removeChild(iframe);
            }, 2000); // Wait for the iframe to load content
        };
    }

    function updateOutput() {
        if (sentences.length > 0) {
            const sentence = sentences[currentIndex];
            outputDiv.innerHTML = `<p><strong>Deutsch:</strong> ${sentence}</p>`;
            const lang = languageSelect.value;
            translateText(sentence, lang);
        }
    }

    startButton.addEventListener("click", function () {
        sentences = textInput.value.split(".").map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
        currentIndex = 0;
        isPlaying = true;
        updateOutput();
    });

    stopButton.addEventListener("click", function () {
        isPlaying = false;
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateOutput();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < sentences.length - 1) {
            currentIndex++;
            updateOutput();
        }
    });
});
