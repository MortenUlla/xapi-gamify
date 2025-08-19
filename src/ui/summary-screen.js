const { getTotalXP } = require('../xp.js');
const { getBadgeCount, getCompletedModuleCount, allRequirementsMet } = require('../progress.js');
const { sendTerminatedStatement } = require('../xapi.js');

function renderSummaryScreen(container) {
  const totalXP = getTotalXP();
  const badgeCount = getBadgeCount();
  const completedModules = getCompletedModuleCount();

  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) {
    return null;
  }

  root.innerHTML = '';

  const xpEl = document.createElement('p');
  xpEl.textContent = `Total XP: ${totalXP}`;
  root.appendChild(xpEl);

  const badgeEl = document.createElement('p');
  badgeEl.textContent = `Badges: ${badgeCount}`;
  root.appendChild(badgeEl);

  const moduleEl = document.createElement('p');
  moduleEl.textContent = `Completed modules: ${completedModules}`;
  root.appendChild(moduleEl);

  if (allRequirementsMet()) {
    const certLink = document.createElement('a');
    certLink.href = '#certificate';
    certLink.textContent = 'Download certificate';
    root.appendChild(certLink);
  }

  sendTerminatedStatement();

  return root;
}

module.exports = {
  renderSummaryScreen
};
