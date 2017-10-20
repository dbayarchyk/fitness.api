import moment from 'moment';
import * as GROUP from './muscleGroups';

export default {
  2: [ 
    moment().isoWeekday(2),
    moment().isoWeekday(4)
  ],
  3: [
    moment().isoWeekday(1),
    moment().isoWeekday(3),
    moment().isoWeekday(5)
  ],
  4: [
    moment().isoWeekday(1),
    moment().isoWeekday(3),
    moment().isoWeekday(5),
    moment().isoWeekday(7)
  ],
  5: [
    moment().isoWeekday(1),
    moment().isoWeekday(3),
    moment().isoWeekday(4),
    moment().isoWeekday(5),
    moment().isoWeekday(7)
  ]
}