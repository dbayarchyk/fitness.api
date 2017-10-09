import * as PURPOSE from './purpose';
import * as TRAINING_METHOD from './trainingMethod';

export default {
  [PURPOSE.WEIGHT_LOSS]: {
    trainingsCount: [ 4, 5 ],
    method: [ TRAINING_METHOD.CIRCULAR, TRAINING_METHOD.СOMBINED ],
    repeatCount: [ 20 ],
    approachCount: [ 3, 4 ],
  },
  [PURPOSE.INCREASE_MUSCLE_MASS]: {
    trainingsCount: [ 3, 4 ],
    method: [ TRAINING_METHOD.SPLITTED, TRAINING_METHOD.ONE_APPROACH ],
    repeatCount: [ 8, 15 ],
    approachCount: [ 3, 4 ],
  },
  [PURPOSE.INCREASE_MUSCLE_STRENGTH]: {
    trainingsCount: [ 3, 4 ],
    method: [ TRAINING_METHOD.SPLITTED, TRAINING_METHOD.ONE_APPROACH ],
    repeatCount: [ 6, 10 ],
    approachCount: [ 3, 4 ],
  },
  [PURPOSE.MAINTAINING_THE_FORM_ALREADY_ACHIEVED]: {
    trainingsCount: [ 2, 3 ],
    method: [ TRAINING_METHOD.SPLITTED, TRAINING_METHOD.ONE_APPROACH ],
    repeatCount: [ 10, 15 ],
    approachCount: [ 2, 3 ],
  }
}