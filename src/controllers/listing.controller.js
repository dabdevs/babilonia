const Listing = require("../models/Listing");
const { exists } = require("../utils/validators");

let controller = {};

controller.createListing = async (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({message: "Missing parameters"})

  // Extracting the values from request
  const { title, description, superficy, price, city, address, buildDate } = req.body;

  try {
    // Validate if Listing exists
    const listingExists = await exists('Listing', title);

    if (listingExists) return res.send({ message: "Listing already exists." });

    // Create new Listing Object
    let listing = Listing(req.body);

    // Save the Listing in the database
    listing.save(function (err) {
        // If there is an error
        if (err) {
            console.log(err);
            return res
            .status(500)
            .json({ message: "There was an error creating the Listing." });
        }
    });

    // Return response
    return res.status(201).json({
      message: "Listing created successfully.",
      status: "OK",
      listing: listing,
    });
  } catch (err) {
    console.log(err);
  }
};

controller.getListings = async (req, res) => {
  try {
    // Get all Listings from DB
    const listings = await Listing.find({});

    // Returning the Listings
    return res.json({ status: "OK", listings: listings });
  } catch (err) {
    console.log(err);
  }
};

controller.getListing = async (req, res) => {
  try {
    // Get Listing from DB
    const listing = await Listing.findById(req.params.id);

    // Returning the listing
    return res.json({ status: "OK", listing: listing });
  } catch (err) {
    console.log(err);
  }
};

controller.updateListing = async (req, res) => {
  try {
    // Update Listing    
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json({ status: "OK", listing: listing });
  } catch (err) {
    console.log(err);
  }
};

controller.deleteListing = async (req, res) => {
  try {
    // Delete Listing from DB
    await Listing.findByIdAndDelete(req.params.id);

    return res.json({ status: "OK", message: "Listing deleted successfully." });
  } catch (err) {
    console.log(err);
  }
};

module.exports = controller;
