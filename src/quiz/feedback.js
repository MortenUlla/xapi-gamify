const { logAnswered } = require('../xapi');

let currentQuestion = null;

function setCurrentQuestion(question) {
  currentQuestion = question;
}

function playSound(url) {
  if (typeof window !== 'undefined' && window.Audio) {
    const audio = new Audio(url);
    audio.play();
  } else {
    console.log(`play sound: ${url}`);
  }
}

function showAnswerFeedback(isCorrect) {
  const feedbackEl = typeof document !== 'undefined'
    ? document.getElementById('feedback')
    : null;

  if (feedbackEl) {
    feedbackEl.classList.remove('correct', 'incorrect');
    if (isCorrect) {
      feedbackEl.classList.add('correct');
    } else {
      feedbackEl.classList.add('incorrect');
      if (currentQuestion && currentQuestion.hint) {
        feedbackEl.textContent = currentQuestion.hint;
      }
    }
  } else if (!isCorrect && currentQuestion && currentQuestion.hint) {
    console.log(currentQuestion.hint);
  }

  playSound(isCorrect ? '/sounds/correct.mp3' : '/sounds/incorrect.mp3');
  logAnswered(isCorrect);
}

module.exports = { showAnswerFeedback, setCurrentQuestion };
