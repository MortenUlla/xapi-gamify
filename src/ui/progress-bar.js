import { getTotalXP } from '../gamification/xp.js';

export default function initProgressBar(element) {
  function render() {
    const xp = getTotalXP();
    const level = Math.floor(xp / 100);
    const nextLevel = (level + 1) * 100;
    element.textContent = `XP: ${xp} / ${nextLevel} (Level ${level})`;
  }

  render();
  window.addEventListener('xp:changed', render);
}
