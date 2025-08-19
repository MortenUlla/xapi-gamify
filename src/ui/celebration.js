import confetti from 'canvas-confetti';
import { settings } from '../settings.js';

let confettiInstance;

function getConfetti() {
  if (!confettiInstance) {
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    Object.assign(canvas.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
    });
    document.body.appendChild(canvas);
    confettiInstance = confetti.create(canvas, { resize: true, useWorker: true });
  }
  return confettiInstance;
}

export function triggerCelebration(type) {
  if (settings.soundEnabled) {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch(() => {});
  }

  const shoot = getConfetti();
  shoot({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
  });
}
