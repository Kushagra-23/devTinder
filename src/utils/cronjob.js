const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendMail = require("./sendEmail");

// This job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => {
  // Send emails to all people who got requests the previous day

  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequest = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequest.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      // Send Emails
      try {
        const res = await sendMail.run(
          "New Friend Requests pending for " + email,
          "Ther eare so many frined reuests pending, please login to DevTinder.in and accept or reject the requests."
        );
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }

  console.log("Hello World", new Date());
});
