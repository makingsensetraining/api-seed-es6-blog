"use strict";

// LIBRARIES
import _ from 'lodash';
import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let Document = mongoose.Document;
let ObjectId = mongoose.Types.ObjectId;

let userSchema = new Schema({
  firstName: String,
  lastName : String,
  email    : String,
  phone    : String,
  status   : String,
  auth0Id  : String,
  _roleId  :{type: Schema.Types.ObjectId, ref: 'Role'}
});

userSchema.statics.getUserById = function(id, lean, cb){
  let query = this.model('User')
    .findOne()
    .where('_id').equals(id);

  if(lean){
    query.lean();
  }

  query.exec(cb);
};

userSchema.statics.getUserByAuth0Id = function(id, lean, cb){
  let query = this.model('User')
    .findOne()
    .where('auth0Id').equals(id);

  if(lean){
    query.lean();
  }

  query.exec(cb);
};

userSchema.statics.getUserByEmail = function(email, cb){
  this.model('User').findOne()
    .where('email').equals(email)
    .exec(cb);
};

userSchema.statics.getUsers = function(cb){
  this.model('User').find()
    .exec(cb);
};

userSchema.statics.countUsersByEmail = function (email, cb){
  this.model('User').count()
    .where('email').equals(email)
    .exec(cb);
};

userSchema.statics.checkEmailConsideringId = function(email, id, cb){
  this.model('User').count()
    .where('email').equals(email)
    .where('_id').not.equals(id)
    .exec(cb);
};

export default mongoose.model('User', userSchema);
