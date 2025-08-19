const XP_STORAGE_KEY = 'xapi-gamify:xp';
let totalXP = Number(localStorage.getItem(XP_STORAGE_KEY)) || 0;

function sendScoredStatement(points, activityId) {
  const statement = {
    verb: {
      id: 'http://adlnet.gov/expapi/verbs/scored',
      display: { 'en-US': 'scored' }
    },
    object: { id: activityId },
    result: { score: { raw: points } }
  };

  if (typeof navigator !== 'undefined' && navigator.sendBeacon && window.LRS_ENDPOINT) {
    navigator.sendBeacon(window.LRS_ENDPOINT, JSON.stringify(statement));
  } else {
    console.log('xAPI scored statement', statement);
  }
}

export function awardXP(points, activityId) {
  totalXP += points;
  localStorage.setItem(XP_STORAGE_KEY, totalXP);
  window.dispatchEvent(new CustomEvent('xp:changed', { detail: { xp: totalXP } }));
  sendScoredStatement(points, activityId);
}

export function getTotalXP() {
  return totalXP;
}

// Listen for the same completion events that drive checkmarks
// Expected event detail: { xp: <points>, activityId: <id> }
document.addEventListener('checkmark:completed', (e) => {
  const { xp = 0, activityId } = e.detail || {};
  awardXP(xp, activityId);
});
