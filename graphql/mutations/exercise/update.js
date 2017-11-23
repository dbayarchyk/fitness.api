import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

// import { exerciseType, exerciseInputType } from '../../types/exercise';
// import ExerciseModel from '../../../models/exercise';
// import { Promise } from 'mongoose';

// export default {
//   type: exerciseType,
//   args: {
//     _id: {
//       name: '_id',
//       type: new GraphQLNonNull(GraphQLID)
//     },
//     data: {
//       name: 'data',
//       type: new GraphQLNonNull(exerciseInputType)
//     }
//   },
//   resolve(root, params, context) {
//     return new Promise((resolve, reject) => {
//       ExerciseModel.findById(params._id).exec()
//         .then((exercise) => {
//           Object.assign(exercise, { ...params.data });

//           exercise.save()
//             .then((updatedExercise) => {
//               ExerciseModel.populate(updatedExercise, { path: 'muscules' })
//                 .then(populatedExercise => resolve(populatedExercise))
//                 .catch(err => reject(new Error('Could not populate exercise data ', err)));
//             })
//             .catch(err => reject(new Error('Could not update exercise data ', err)));
//         })
//         .catch(err => reject(new Error('Exercise with this _id is not found ', err)));
//     });
//   }
// }

// import {
//   GraphQLNonNull
// } from 'graphql';

import { exerciseType, exerciseInputType } from '../../types/exercise';
import ExerciseModel from '../../../models/exercise';

export default {
  type: exerciseType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(exerciseInputType)
    }
  },
  resolve(root, params, context) {
    return new Promise((resolve, reject) => {
      ExerciseModel.findById(params._id).exec()
        .then((exercise) => {
          Object.assign(exercise, { ...params.data });

          exercise.save()
            .then((updatedExercise) => {
              ExerciseModel.populate(updatedExercise, { path: 'muscules' })
                .then(populatedExercise => resolve(populatedExercise))
                .catch(err => reject(new Error('Could not populate exercise data ', err)));
            })
            .catch(err => reject(new Error('Could not update exercise data ', err)));
        })
        .catch(err => reject(new Error('Exercise with this _id is not found ', err)));
    });
  }
}

