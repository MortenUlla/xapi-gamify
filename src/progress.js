import { triggerCelebration } from './ui/celebration.js';

export function moduleCompleted() {
  triggerCelebration('module');
}

export function testPassed() {
  triggerCelebration('test');
}

export function courseFinished() {
  triggerCelebration('course');
}
