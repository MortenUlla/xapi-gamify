import { updateCompletionStatus, applyStoredCompletionStatus } from './gamification/progress.js';

export function onActivityComplete(activityId) {
  updateCompletionStatus(activityId);
}

document.addEventListener('DOMContentLoaded', () => {
  applyStoredCompletionStatus();
});
