const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const auth = require("../middlewares/authenticate");

router.use(auth);
router.post("/api/stripe", async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "Charged this sob 5$",
    source: req.body.id
  });

  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});
module.exports = router;
