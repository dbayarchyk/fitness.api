import mongoose from 'mongoose';

import roundDecimal from '../helpers/roundDecimal';

const TrainingPlanSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  avatarUrl:       { type: String },
  gender:          { type: String },
  complexity:      { type: Number, set: v => roundDecimal(v), get: v => roundDecimal(v) },
  trainings:       [ { 
    date: { type: Date },
    exerciseAproaches: [ { 
      exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
      count: { type: Number }
    } ]
  } ]
}, { collection: 'trainingPlans', timestamps: true });

TrainingPlanSchema.pre('save', function (next) {
  let trainingPlan = this;

  if (trainingPlan.isModified('trainings')) {
    trainingPlan.populate('trainings.exerciseAproaches.exercise').execPopulate()
      .then(populatedTrainingPlan => {
        populatedTrainingPlan.complexity = 0;
        
        populatedTrainingPlan.trainings.forEach(training =>
          training.exerciseAproaches.forEach(exerciseAproache =>
            populatedTrainingPlan.complexity += exerciseAproache.exercise.complexity * exerciseAproache.count / 10
          )
        );

        populatedTrainingPlan.complexity /= populatedTrainingPlan.trainings.length;
      })
      .catch(err => new Error('Could not find this exercise, err'));
  }
});

export default mongoose.model('TrainingPlan', TrainingPlanSchema);