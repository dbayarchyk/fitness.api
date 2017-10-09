import * as PURPOSE from '../constants/purpose';
import TRAINING_PLAN_CONFIG from '../constants/trainingPlanConfig';
import MUSCLES_GROUPS from '../constants/muscleGroups';
import * as TRAINING_METHOD from '../constants/trainingMethod';

import ExerciseModel from '../models/exercise';

const generateTrainingPlan = ({ purpose }) => {
  let trainings = [];
  const trainingPlanConfig = TRAINING_PLAN_CONFIG[purpose];

  return new Promise((resolve, reject) => {
    ExerciseModel.find().populate('muscules').exec()
      .then(exercises => {
        // TODO: add logic for max and min training count.
        const trainingsCount = trainingPlanConfig.trainingsCount[0];

        let trainingPlan = {
          trainings: []
        };

        let prevIndex = 0;
        for (let trainingIndex = 0; trainingIndex < trainingsCount; trainingIndex++) {
          // TODO: add logic for changing training method based on user trainings history.
          const musclesGroupsCount = parseInt(MUSCLES_GROUPS.length / trainingsCount);

          // Spitting muscles groups by training.
          const musclesGroups = MUSCLES_GROUPS.slice(prevIndex, prevIndex + musclesGroupsCount);

          trainingPlan.trainings.push({
            exerciseAproaches: getExerciseAproaches(exercises, musclesGroups, trainingPlanConfig)
          });

          prevIndex += musclesGroupsCount;
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
  
  const exerciseCount = parseInt(20 / trainingsCount); // 20 - count of exercise in week.

  const exercisesByMusclesGroups = [];

  musclesGroups.forEach((musclesGroup, musclesGroupIndex) => {
    exercisesByMusclesGroups[musclesGroupIndex] = exercises.filter(
      exercise => exercise.muscules.find(muscule => muscule.group === musclesGroup)
    )
  });

  switch(method) {
    case TRAINING_METHOD.CIRCULAR: {
      const exericises = [];
      
      for (let i = 0; i < exercisesByMusclesGroups.length; i++) {
        for (let j = 0; j < exercisesByMusclesGroups[i].length; j++) {
          exercises.push(exercisesByMusclesGroups[i][j]);          
        }
      }

      const exerciseAproaches = exercises.map(exercise => ({
        exercise: exercise._id,
        count: repeatCount
      }));

      let result = [];

      for (let i = 0; i < approachCount; i++) {
        result = result.concat(exerciseAproaches);        
      }

      return result;
    }
    case TRAINING_METHOD.СOMBINED: {
      
    }
    case TRAINING_METHOD.SPLITTED: {

    }
    case TRAINING_METHOD.ONE_APPROACH: {

    }
  }

  return [];
};

export default generateTrainingPlan;