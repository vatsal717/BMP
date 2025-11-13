const { Applicant } = require("../models");

const handelemail = async (req, res) => {
  const email = req.params.email.toLowerCase();

  console.log(email);

  try {
    const applicant = await Applicant.findOne({ email });

    if (applicant) {
      console.log("send found");
      res.status(200).send("Email found");
    } else {
      console.log("send not found");
      res.status(404).send("Email not found");
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).send("Server error");
  }
};

module.exports = { handelemail };
