import dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid'; 

dynamoose.Table.defaults.set({
  throughput: "ON_DEMAND",
});

const UserSchema = new dynamoose.Schema(
  {
    PK: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    SK: {
      type: String,
      rangeKey: true,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
    emailVerificationCode: {
      type: Number,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, 
  },
);

export const UserModel = dynamoose.model('shtyMe_Users', UserSchema,{create: false});