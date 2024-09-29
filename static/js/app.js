const micButton = document.getElementById('micButton');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateButton = document.getElementById('translateButton');

// Fonction pour la reconnaissance vocale
micButton.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'th-TH'; // Utiliser la langue thaïlandaise
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputText.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Erreur de reconnaissance vocale:', event.error);
    };
});

// Fonction pour la traduction
translateButton.addEventListener('click', () => {
    const textToTranslate = inputText.value;
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToTranslate }),
    })
    .then(response => response.json())
    .then(data => {
        outputText.value = data.translation;
    })
    .catch(error => {
        console.error('Erreur de traduction:', error);
    });
});
