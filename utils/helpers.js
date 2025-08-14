import exercises from "../data/exercises.json" assert { type: "json" };

export const calcCaloriesFromExercise = (type, duration) => {
  const key = type?.toLowerCase();
  const entry = exercises[key];
  const calPerMin = entry?.calPerMin || 5; // fallback
  return Math.round(calPerMin * (duration || 0));
};

export const normalizeDateKey = (date = new Date()) => {
  return new Date(date).setHours(0, 0, 0, 0);
};
