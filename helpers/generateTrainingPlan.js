import * as PURPOSE from '../constants/purpose';

const generateTrainingPlan = ({ purpose }) => {
  let trainings = [];

  switch(purpose) {
    case PURPOSE.INCREASE_MUSCLE_MASS: {
      trainings = [];
      break;
    }
    case PURPOSE.INCREASE_MUSCLE_STRENGTH: {
      trainings = [];
      break;
    }
    case PURPOSE.WEIGHT_LOSS: {
      trainings = [];
      break;
    }
    case PURPOSE.CREATING_A_BODY_RELIEF: {
      trainings = [];
      break;
    }
    case PURPOSE.MAINTAINING_THE_FORM_ALREADY_ACHIEVED: {
      trainings = [];
      break;
    }
  }

  return {
    trainings,
  }
};

export default generateTrainingPlan;