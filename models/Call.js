const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  callSid: { type: String },
  direction: { type: String }, // inbound/outbound
  status: { type: String }, // queued, ringing, in-progress, completed, no-answer, failed, busy
  startedAt: { type: Date },
  endedAt: { type: Date },
  duration: { type: Number }, // seconds
  metadata: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Call', CallSchema);
