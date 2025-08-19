const quests = require('./quests.json');

const state = {
  modules: new Set(),
  points: 0,
  completedQuests: new Set()
};

function addProgress({ module, points = 0 }) {
  if (module) {
    state.modules.add(module);
  }
  state.points += points;
  checkQuests();
}

function checkQuests() {
  quests.forEach((quest) => {
    if (state.completedQuests.has(quest.id)) return;

    const modulesDone = quest.requiredModules.every((m) => state.modules.has(m));
    const enoughPoints = state.points >= quest.requiredPoints;

    if (modulesDone && enoughPoints) {
      state.completedQuests.add(quest.id);
      questCompleted(quest.id);
    }
  });
}

function questCompleted(questId) {
  const quest = quests.find((q) => q.id === questId);
  if (!quest) return;

  awardXP(quest.rewardXP);
  awardBadge(quest.rewardBadge);
  sendExperiencedStatement(questId);
}

function awardXP(amount) {
  if (amount > 0) {
    console.log(`Awarded ${amount} XP for quest.`);
  }
}

function awardBadge(badgeId) {
  if (badgeId) {
    console.log(`Awarded badge: ${badgeId}`);
  }
}

function sendExperiencedStatement(questId) {
  const statement = {
    verb: 'experienced',
    object: { id: questId }
  };
  console.log('xAPI statement:', JSON.stringify(statement));
}

module.exports = {
  addProgress,
  state,
  quests
};
