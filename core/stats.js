import { getUserStats } from './state.js';

// Update statistics display
export function updateStats() {
  const userStats = getUserStats();
  document.getElementById('success-rate').textContent = `${userStats.successRate}%`;
}