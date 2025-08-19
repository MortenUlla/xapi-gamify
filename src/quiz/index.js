const engine = require('./engine');
const { showAnswerFeedback, setCurrentQuestion } = require('./feedback');

engine.onAnswer((question, isCorrect) => {
  setCurrentQuestion(question);
  showAnswerFeedback(isCorrect);
});

module.exports = engine;
