// Streak tracking with milestone XP bonuses and xAPI reporting

const MILESTONE_BONUSES = {
  5: 50,
  10: 100,
  30: 300,
};

/**
 * Update user streak and XP based on today's visit.
 * @param {function} sendStatement - Function to send xAPI statements.
 * @returns {{streak: number, bonusXp: number}} Updated streak and awarded bonus XP.
 */
export function updateStreak(sendStatement = () => {}) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const lastDate = localStorage.getItem('lastActivityDate');
  let streak = parseInt(localStorage.getItem('streak'), 10) || 0;

  if (!lastDate) {
    // first visit
    streak = 1;
  } else if (lastDate === today) {
    // already logged today; no changes
  } else {
    const diffDays = Math.floor(
      (Date.parse(today) - Date.parse(lastDate)) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 1) {
      streak += 1;
    } else {
      streak = 1;
    }
  }

  localStorage.setItem('lastActivityDate', today);
  localStorage.setItem('streak', streak);

  // bonus XP for streak milestones
  const bonusXp = MILESTONE_BONUSES[streak] || 0;
  if (bonusXp) {
    const xp = parseInt(localStorage.getItem('xp'), 10) || 0;
    localStorage.setItem('xp', xp + bonusXp);
  }

  // report via xAPI "interacted"
  try {
    const statement = {
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/interacted',
        display: { 'en-US': 'interacted' },
      },
      object: { id: 'http://example.com/activity/streak' },
      result: {
        extensions: {
          'http://example.com/extensions/streak': streak,
          'http://example.com/extensions/bonusXp': bonusXp,
        },
      },
    };
    sendStatement(statement);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('xAPI reporting failed', err);
  }

  return { streak, bonusXp };
}

export default updateStreak;
