function logAnswered(success) {
  const statement = {
    verb: 'answered',
    result: { success }
  };
  console.log('xAPI statement', JSON.stringify(statement));
}

module.exports = { logAnswered };
