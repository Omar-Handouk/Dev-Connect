'use strict';

const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    company: String,
    website: String,
    location: String,
    title: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: String,
    githubUsername: String,
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: String,
            from: {
                type: Date,
                required: true
            },
            to: Date,
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],
    education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: Date,
          current: {
            type: Boolean,
            default: false
          },
          description: String
        }
      ],
      social: {
        youtube: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        instagram: String
      },
      date: {
        type: Date,
        default: Date.now
      }
});

module.exports = model('Profile', profileSchema);