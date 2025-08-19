function sendTerminatedStatement() {
  const statement = {
    verb: {
      id: 'http://adlnet.gov/expapi/verbs/terminated',
      display: { 'en-US': 'terminated' }
    },
    object: { id: 'http://example.com/activity/summary' }
  };

  // Placeholder for actual xAPI call
  console.log('xAPI statement sent', statement);
}

module.exports = {
  sendTerminatedStatement
};
