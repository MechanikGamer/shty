import dynamoose from 'dynamoose';

const ReusableCodeSchema = new dynamoose.Schema({
  shortCode: {
    type: String,
    hashKey: true,
  },
});

export const ReusableCodeModel = dynamoose.model('shtyMe_ReusableCodes', ReusableCodeSchema);
