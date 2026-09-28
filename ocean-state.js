export const motionAllowed = (reduced, paused, hidden) => !reduced && !paused && !hidden;
export const particleCount = width => width < 760 ? 10 : 24;
