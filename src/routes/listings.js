const { Router } = require("express");

// Controllers
const {
  getListing,
  getListings,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listing.controller");

const router = Router();

// Get and create listing
router.route("/").get(getListings).post(createListing);

// Get One Listing
router.route("/:id").get(getListing).put(updateListing).delete(deleteListing);

module.exports = router;
