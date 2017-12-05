import * as PURPOSE from '../constants/purpose';
import TRAINING_PLAN_CONFIG from '../constants/trainingPlanConfig';
import MUSCLES_GROUPS from '../constants/muscleGroups';
import * as TRAINING_METHOD from '../constants/trainingMethod';
import TRAININGS_MUSCLE_GROUPS from '../constants/trainingsMuscleGroups';
import TRAININGS_DAYS from '../constants/trainingsDays';

import ExerciseModel from '../models/exercise';

const generateTrainingPlan = ({ purpose }) => {
  let trainings = [];
  const trainingPlanConfig = TRAINING_PLAN_CONFIG[purpose];

  return new Promise((resolve, reject) => {
    // TODO: filter out exercise from last training plan.
    ExerciseModel.find().populate('muscules').exec()
      .then(exercises => {
        // TODO: add logic for max and min training count.
        const trainingsCount = trainingPlanConfig.trainingsCount[0];
        const musclesGroups = TRAININGS_MUSCLE_GROUPS[trainingsCount];
        const trainingsDays = TRAININGS_DAYS[trainingsCount];

        let trainingPlan = {
          trainings: [],
          isPrivate: true
        };

        for (let trainingIndex = 0; trainingIndex < trainingsCount; trainingIndex++) {
          trainingPlan.trainings.push({
            date: trainingsDays[trainingIndex],
            exerciseAproaches: getExerciseAproaches(exercises, musclesGroups[trainingIndex], trainingPlanConfig)
          });
        }

        resolve(trainingPlan);
      })
      .catch(err => reject(err))
  });
};

const getExerciseAproaches = (exercises, musclesGroups, trainingPlanConfig) => {
  // TODO: change this params regarding training history.
  const trainingsCount = trainingPlanConfig.trainingsCount[0];
  const method = trainingPlanConfig.method[0];
  const repeatCount = trainingPlanConfig.repeatCount[0];
  const approachCount = trainingPlanConfig.approachCount[0];
  
  const exerciseCount = parseInt(20 / trainingsCount); // 20 - count of exercise per training.
  const exerciseCountPerGroup = parseInt(exerciseCount / musclesGroups.length);

  const exercisesByMusclesGroups = [];
  musclesGroups.forEach((musclesGroup, musclesGroupIndex) => {   
    exercisesByMusclesGroups[musclesGroupIndex] = exercisesByMusclesGroups[musclesGroupIndex] || [];

    exercises.forEach((exercise) => {
      if (exercisesByMusclesGroups[musclesGroupIndex].length <= exerciseCountPerGroup) {
        const isCorrectMuscleGroup = !!exercise.muscules.find(muscule => muscule.group === musclesGroup)
        if (isCorrectMuscleGroup) {
          exercisesByMusclesGroups[musclesGroupIndex].push(exercise);
        }
      }
    });
  });

  switch(method) {
    case TRAINING_METHOD.CIRCULAR: {
      const exercises = [];

      let maxCountItemsLength = exercisesByMusclesGroups[0].length;
      for (let i = 0; i < exercisesByMusclesGroups.length - 1; i++) {
        if (maxCountItemsLength < exercisesByMusclesGroups[i + 1].length) {
          maxCountItemsLength = exercisesByMusclesGroups[i + 1].length;
        }
      }

      for (let i = 0; i < maxCountItemsLength; i++) {
        for (let j = 0; j < exercisesByMusclesGroups.length; j++) {
          if (exercisesByMusclesGroups[j][i]) {
            exercises.push(exercisesByMusclesGroups[j][i]);
          }
        }
      }

      const exerciseAproaches = exercises.map(exercise => ({
        exercise: exercise._id,
        count: repeatCount
      }));

      let result = [];

      for (let i = 0; i < approachCount; i++) {
        // TODO: add having a rest after each circle.
        result = result.concat(exerciseAproaches);        
      }

      return result;
    }
    case TRAINING_METHOD.СOMBINED: {
      // TODO: implement after adding variations of config data based on user training history.
    }
    case TRAINING_METHOD.SPLITTED: {
      let exercises = [];

      for (let i = 0; i < exercisesByMusclesGroups.length; i++) {
        exercises = exercises.concat(exercisesByMusclesGroups[i]);
      }

      const exerciseAproaches = exercises.map(exercise => ({
        exercise: exercise._id,
        count: repeatCount
      }));

      let result = [];

      exerciseAproaches.forEach(exerciseAproache => {
        // TODO: add having a rest after each approach.
        const aproaches = new Array(approachCount).fill(exerciseAproache);

        result = result.concat(aproaches);
      });

      return result;
    }
    case TRAINING_METHOD.ONE_APPROACH: {
      // TODO: implement after adding variations of config data based on user training history.
    }
  }

  return [];
};

export default generateTrainingPlan;