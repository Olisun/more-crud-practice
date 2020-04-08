require('mongoose-type-email');
// contacts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'contacts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: {
      first: {
        type: String,
        required: [true, 'First Name is required']
      },
      last: {
        type: String,
        required: [true, 'Last Name is required']
      }
    },
    email: {
      type: mongooseClient.SchemaTypes.Email,
      required: [true, 'Email is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone s required'],
      validate: {
        validator: function (v) {
          return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v);
        },
        message: '{VALUE} is not an international phone number!'
      }
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street is required']
      },
      city: {
        type: String,
        required: [true, 'City is required']
      },
      state: {
        type: String,
        required: [true, 'City is required']
      },
      zip: {
        type: String,
        required: [true, 'zip is required']
      }
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
