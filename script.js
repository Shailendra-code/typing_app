document.addEventListener("DOMContentLoaded", () => {
    // console.log("file loaded");

    const textToTypeElement = document.getElementById("text_type");
    const typingInputElement = document.getElementById("typing_input");
    const speedElement = document.getElementById("speed");
    const accuracyElement = document.getElementById("accuracy");

    //text to display
    const sampleText = [
        "I found a love, for me Darling, just dive right in and follow my lead",
        "First things first I'ma say all the words inside my head I'm fired up and tired",
        "We keep this love in a photograph We made these memories for ourselves",
        "Well, you only need the light when it's burning low Only miss the sun when it starts to snow",
        "Yellow diamonds in the light Now we're standing side by side As your shadow crosses mine What it takes to come alive",
        "Past lives couldn't ever hold me down Lost love is sweeter when it's finally found",
    ];

    //initial values
    let currentIndex = 0;
    let startTime = new Date();
    let error = 0;

    //Function to initialize or restart the game
    function initializeGame() {
        const text = sampleText[Math.floor(Math.random() * sampleText.length)];
        console.log(text);

        textToTypeElement.textContent = text;
        typingInputElement.value = "";
        currentIndex = 0;
        startTime = new Date();
        error = 0;

        //update function
        updateFeedback();
    }

    // Function to update the speed and the accuracy feedback
    function updateFeedback() {
        const currentTime = new Date();
        const elapsedTime = (currentTime - startTime) / 60000;
        if (elapsedTime <= 0) {
            speedElement.textContent = 0;
        } else {
            const wordsTyped = typingInputElement.value
                .trim()
                .split(/\s+/).length; //regular expression remove the strange char from word
            const speed = Math.round(wordsTyped / elapsedTime);
            speedElement.textContent = speed;
        }

        const typedText = typingInputElement.value;
        const targetText = textToTypeElement.textContent;
        let displayText = "";

        for (let i = 0; i < targetText.length; i++) {
            if (typedText[i] === undefined) {
                displayText += `<span>${targetText[i]}</span>`;
            } else {
                const isCorrect = typedText[i] === targetText[i];
                const spanClass = isCorrect ? "correct" : "inCorrect";
                displayText += `<span class='${spanClass}'>${targetText[i]}</span>`;
            }
        }

        textToTypeElement.innerHTML = displayText;

        // Calculate accuracy
        const accuracy =
            currentIndex > 0
                ? Math.round(((currentIndex - error) / currentIndex) * 100)
                : 100;
        accuracyElement.textContent = accuracy;
    }

    //Function checkCharacter
    function checkCharacter(inputChar, targetChar) {
        if (inputChar !== targetChar) {
            error++;
            return false;
        } else {
            return true;
        }
    }

    //function to display message to the user
    function displayMessage(message) {
        const messageArea = document.getElementById("message_area");
        messageArea.textContent = message;

        //clear the message
        setTimeout(() => {
            messageArea.textContent = "";
        }, 3000);
    }

    //Event listener for typing input
    typingInputElement.addEventListener("input", (e) => {
        const typeText = typingInputElement.value;
        console.log(typeText);

        const targetText = textToTypeElement.textContent;
        if (currentIndex < targetText.length) {
            const isCorrect = checkCharacter(
                typeText[currentIndex],
                targetText[currentIndex]
            );

            textToTypeElement.innerHTML =
                targetText.substring(0, currentIndex) +
                `<span class='${isCorrect ? "correct" : "inCorrect"}'>${
                    targetText[currentIndex]
                }</span>` +
                targetText.substring(currentIndex + 1);
            currentIndex++;
            if (currentIndex === targetText.length) {
                displayMessage("Text completed starting a new one.");
                initializeGame();
            }
        }

        //update feedback
        updateFeedback();
    });

    //start the game
    initializeGame();
});
