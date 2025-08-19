let badgeCount = 0;
let completedModules = 0;
let totalModules = 0;

function setProgress({ badges = 0, completed = 0, total = 0 } = {}) {
  badgeCount = badges;
  completedModules = completed;
  totalModules = total;
}

function getBadgeCount() {
  return badgeCount;
}

function getCompletedModuleCount() {
  return completedModules;
}

function allRequirementsMet() {
  return totalModules > 0 && completedModules >= totalModules;
}

module.exports = {
  setProgress,
  getBadgeCount,
  getCompletedModuleCount,
  allRequirementsMet
};
