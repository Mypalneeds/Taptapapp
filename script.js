document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('counter');
    const tapButton = document.getElementById('tapButton');
    const highScoreElement = document.getElementById('highScore');
    const challengeStatus = document.getElementById('challengeStatus');
    const timerElement = document.getElementById('timer');

    let count = 0;
    let highScore = parseInt(localStorage.getItem('highScore')) || 0;
    let challengeStartTime;
    let challengeInterval;
    const colors = ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'];
    const messages = [
        "Great job! Keep tapping!",
        "Awesome! You're on a roll!",
        "Fantastic! You're unstoppable!",
        "You're doing amazing! Keep it up!",
        "Incredible! You're a tapping master!",
        "Way to go! You're a tap champion!",
        "Remarkable! You're almost there!",
        "Keep going! You're doing fantastic!",
        "Superb! You're a tapping legend!",
        "Outstanding! You're a tapping pro!"
    ];

    highScoreElement.textContent = highScore;

    tapButton.addEventListener('click', () => {
        count++;
        counter.textContent = count;

        let currentColor = tapButton.style.backgroundColor;
        let newColor;

        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (newColor === currentColor);

        tapButton.style.backgroundColor = newColor;
        tapButton.classList.add('pulsate');
        setTimeout(() => {
            tapButton.classList.remove('pulsate');
        }, 1000);

        if (count % 10 === 0) {
            const messageIndex = Math.floor(Math.random() * messages.length);
            alert(messages[messageIndex]);
            // Confetti effect
            confetti();
        }

        if (count > highScore) {
            highScore = count;
            localStorage.setItem('highScore', highScore);
            highScoreElement.textContent = highScore;
        }
    });

    // Challenge functionality
    document.getElementById('startChallenge').addEventListener('click', () => {
        count = 0; // Reset count for challenge
        counter.textContent = count;
        challengeStartTime = Date.now();
        challengeStatus.textContent = 'Challenge started! Tap as fast as you can!';
        timerElement.textContent = '30'; // Reset timer display
        clearInterval(challengeInterval); // Clear any existing interval

        challengeInterval = setInterval(() => {
            const timeElapsed = (Date.now() - challengeStartTime) / 1000;
            const timeLeft = Math.max(30 - Math.floor(timeElapsed), 0);
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(challengeInterval);
                if (count >= 100) {
                    challengeStatus.textContent = `Challenge complete! You tapped ${count} times!`;
                } else {
                    challengeStatus.textContent = `Time's up! You tapped ${count} times.`;
                }
            }
        }, 1000); // Update every second
    });
});
