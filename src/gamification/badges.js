/**
 * Badge registry and evaluation helpers.
 */

export const badgeRegistry = [
  {
    id: 'first-completion',
    name: 'First Completion',
    description: 'Awarded for completing the first activity',
    criteria: statement =>
      statement?.verb?.id === 'http://adlnet.gov/expapi/verbs/completed',
  },
];

export const awardedBadges = new Set();

export function awardBadge(badgeId) {
  if (awardedBadges.has(badgeId)) return;
  awardedBadges.add(badgeId);
  console.log(`Badge awarded: ${badgeId}`);
}

function sendAchievedStatement(badgeId) {
  const statement = {
    verb: {
      id: 'http://adlnet.gov/expapi/verbs/achieved',
      display: { 'en-US': 'achieved' },
    },
    object: { id: `badge:${badgeId}` },
  };

  // Replace with real xAPI dispatch in production
  console.log('xAPI statement sent', statement);
}

export function checkBadgeCriteria(event) {
  const statement = event?.detail?.statement || event;
  if (!statement) return;

  badgeRegistry.forEach(badge => {
    if (!awardedBadges.has(badge.id) && badge.criteria(statement)) {
      awardBadge(badge.id);
      sendAchievedStatement(badge.id);
    }
  });
}

