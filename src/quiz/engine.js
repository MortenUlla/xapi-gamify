const EventEmitter = require('events');

class QuizEngine extends EventEmitter {
  submitAnswer(question, isCorrect) {
    this.emit('answer', question, isCorrect);
  }

  onAnswer(handler) {
    this.on('answer', handler);
  }
}

module.exports = new QuizEngine();
