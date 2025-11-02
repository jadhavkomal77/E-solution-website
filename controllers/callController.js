const twilio = require('twilio');
const Call = require('../models/Call');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+7709071195';

async function handleCallEvent(req, res) {
  try {
    const {
      CallSid,
      From,
      Direction,
      CallStatus,
      StartTime,
      EndTime,
      Duration,
    } = req.body;

    // Save call log
    await Call.create({
      phoneNumber: From,
      callSid: CallSid,
      direction: Direction,
      status: CallStatus,
      startedAt: StartTime ? new Date(StartTime) : undefined,
      endedAt: EndTime ? new Date(EndTime) : undefined,
      duration: Duration ? Number(Duration) : undefined,
      metadata: req.body,
    });

    // Send WhatsApp thank-you message if call ended
    if (CallStatus === 'completed' || CallStatus === 'no-answer') {
      await client.messages.create({
        from: FROM,
        to: `whatsapp:${From}`,
        body: 'Thank you for contacting our company! We appreciate your call.',
      });
    }

    res.status(200).json({ success: true, message: 'Call event processed.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

module.exports = { handleCallEvent };
