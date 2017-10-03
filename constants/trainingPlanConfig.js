import * as PURPOSE from './purpose';
import * as TRAINING_METHOD from './trainingMethod';

export default {
  [PURPOSE.INCREASE_MUSCLE_MASS]: {
    trainingsCount: [ 4, 5 ],
    method: [ TRAINING_METHOD.CIRCULAR, TRAINING_METHOD.СOMBINED ],
    repeatCount: [ 20 ],
    approachCount: [ 3 ],
  },
  [PURPOSE.INCREASE_MUSCLE_STRENGTH]: {
    trainingsCount: [ 3, 4 ],
    method: [ TRAINING_METHOD.CIRCULAR, TRAINING_METHOD.СOMBINED ],
    repeatCount: [ 8, 15 ],
    approachCount: [ 3, 4 ],
  },
  [PURPOSE.WEIGHT_LOSS]: {
    trainingsCount: [ 3, 4 ],
    method: [ TRAINING_METHOD.CIRCULAR, TRAINING_METHOD.СOMBINED ],
    repeatCount: [ 6, 10 ],
    approachCount: [ 3, 4 ],
  },
  // [PURPOSE.CREATING_A_BODY_RELIEF]: {
  //   trainingsCount: [3, 4]
  // },
  [PURPOSE.MAINTAINING_THE_FORM_ALREADY_ACHIEVED]: {
    trainingsCount: [ 2, 3 ],
    method: [ TRAINING_METHOD.CIRCULAR, TRAINING_METHOD.СOMBINED ],
    repeatCount: [ 10, 15 ],
    approachCount: [ 2, 3 ],
  }
}