import { awardedBadges, badgeRegistry } from '../gamification/badges.js';

/**
 * Displays a modal listing all awarded badges.
 * @param {HTMLElement} [container=document.body] - Container to append the modal to.
 */
export function showAchievementModal(container = document.body) {
  const modal = document.createElement('div');
  modal.className = 'achievement-modal';

  const title = document.createElement('h2');
  title.textContent = 'Achievements';
  modal.appendChild(title);

  const list = document.createElement('ul');
  awardedBadges.forEach(id => {
    const badge = badgeRegistry.find(b => b.id === id);
    const item = document.createElement('li');
    item.textContent = badge ? badge.name : id;
    list.appendChild(item);
  });

  if (!list.childElementCount) {
    const empty = document.createElement('li');
    empty.textContent = 'No badges earned yet.';
    list.appendChild(empty);
  }

  modal.appendChild(list);
  container.appendChild(modal);
}

