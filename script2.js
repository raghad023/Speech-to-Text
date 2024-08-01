function startRecording() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    document.getElementById("status").innerText = "Listening...";

    recognition.start();

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        document.getElementById("result").innerText = speechResult;
        document.getElementById("status").innerText = "Recording stopped.";

        // Send the speech result to the server to save in the database
        saveText(speechResult);
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onerror = function(event) {
        document.getElementById("status").innerText = "Error occurred in recognition: " + event.error;
    };
}

function saveText(text) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_text.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send("text=" + encodeURIComponent(text));
}
