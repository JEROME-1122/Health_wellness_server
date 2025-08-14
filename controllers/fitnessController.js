import Fitness from "../models/Fitness.js";

// Helper function to calculate calories burned
const calculateCalories = (workoutType, duration) => {
  const caloriesPerMinute = {
    running: 10,
    cycling: 8,
    strength: 6,
  };
  return (caloriesPerMinute[workoutType] || 5) * duration;
};

// Add new workout
export const addWorkout = async (req, res) => {
  try {
    const { workoutType, duration } = req.body;

    const caloriesBurned = calculateCalories(workoutType, duration);

    const workout = new Fitness({
      user: req.user.id,
      workoutType,
      duration,
      caloriesBurned,
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all workouts for logged-in user
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Fitness.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a workout
export const updateWorkout = async (req, res) => {
  try {
    const { workoutType, duration } = req.body;

    const workout = await Fitness.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    // Only allow owner to update
    if (workout.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    workout.workoutType = workoutType || workout.workoutType;
    workout.duration = duration || workout.duration;
    workout.caloriesBurned = calculateCalories(
      workout.workoutType,
      workout.duration
    );

    await workout.save();
    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Fitness.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    // Only allow owner to delete
    if (workout.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await workout.deleteOne();;
    res.json({ message: "Workout deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
