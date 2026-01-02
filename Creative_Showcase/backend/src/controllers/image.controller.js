import getCloudinary from "../config/cloudinary.js";
import Image from "../models/Image.model.js";
import User from "../models/User.model.js";

// UPLOAD IMAGE
export const uploadImage = async (req, res) => {
  try {
    const { image, title } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const cloudinary = getCloudinary();

    if (!cloudinary) {
      return res
        .status(500)
        .json({ success: false, message: "Cloudinary configuration error" });
    }

    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "creative_showcase",
      resource_type: "image",
    });

    const newImage = await Image.create({
      user: req.userId,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      title,
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

// GET MY IMAGES (PRIVATE)
export const getMyImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch images",
      error: error.message,
    });
  }
};

// GET PUBLIC USER IMAGES
export const getUserImages = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }

    const user = await User.findOne({ username }).select("_id");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const images = await Image.find({ user: user._id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile images",
      error: error.message,
    });
  }
};

// DELETE IMAGE
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    if (image.user.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const cloudinary = getCloudinary();

    if (!cloudinary) {
      return res
        .status(500)
        .json({ message: "Cloudinary configuration error" });
    }

    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await image.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Delete failed", error: error.message });
  }
};

// RANDOM IMAGES (LANDING)
export const getRandomImages = async (req, res) => {
  try {
    const images = await Image.aggregate([
      { $sample: { size: 20 } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          imageUrl: 1,
          title: 1,
          createdAt: 1,
          "user.username": 1,
        },
      },
    ]);

    res.json(images);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load images",
      error: error.message,
    });
  }
};
