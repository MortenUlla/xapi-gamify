export function updateCompletionStatus(activityId) {
  const statement = {
    verb: {
      id: 'http://adlnet.gov/expapi/verbs/completed',
      display: { 'en-US': 'completed' }
    },
    object: { id: activityId }
  };

  try {
    if (typeof window !== 'undefined' && window.XAPI && typeof window.XAPI.sendStatement === 'function') {
      window.XAPI.sendStatement(statement);
    } else if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/xapi/statements', JSON.stringify(statement));
    } else if (typeof fetch === 'function') {
      fetch('/xapi/statements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statement)
      });
    } else {
      console.log('xAPI statement', statement);
    }
  } catch (err) {
    console.error('Failed to send xAPI statement', err);
  }

  const el = document.querySelector(`[data-activity-id="${activityId}"]`);
  if (el) {
    showCheckmark(el);
  }

  const completed = JSON.parse(localStorage.getItem('completedActivities') || '{}');
  completed[activityId] = true;
  localStorage.setItem('completedActivities', JSON.stringify(completed));
}

function showCheckmark(el) {
  let mark = el.querySelector('.checkmark');
  if (!mark) {
    mark = document.createElement('span');
    mark.className = 'checkmark';
    mark.textContent = '\u2713';
    el.appendChild(mark);
  }
  mark.style.display = 'inline';
}

export function applyStoredCompletionStatus() {
  const completed = JSON.parse(localStorage.getItem('completedActivities') || '{}');
  Object.keys(completed).forEach(id => {
    const el = document.querySelector(`[data-activity-id="${id}"]`);
    if (el) {
      showCheckmark(el);
    }
  });
}
