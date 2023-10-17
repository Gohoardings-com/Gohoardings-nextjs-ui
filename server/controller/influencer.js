const { executeQuery } = require("../conn/conn");
const catchError = require("../middelware/catchError");

exports.influencerForm = catchError(async (req, res, next) => {
  const { name, email, phone, profile, niche, charges } = req.body;
  const sql = await executeQuery(
    "INSERT into influencer_enquiry (name,email,phone,profile,category,charges) VALUES ('" +
      name +
      "', '" +
      email +
      "','" +
      phone +
      "','" +
      profile +
      "','" +
      niche +
      "','" +
      charges +
      "')",
    "gohoardi_goh",
    next
  );
  if (sql) {
    return res
      .status(200)
      .json({ success: true, message: "Thanks, we will contact you soon!" });
  }
});
