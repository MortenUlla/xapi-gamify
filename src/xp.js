let totalXP = 0;

function setXP(xp) {
  totalXP = xp;
}

function getTotalXP() {
  return totalXP;
}

module.exports = {
  setXP,
  getTotalXP
};
