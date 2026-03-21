const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // make this file

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "notes", // folder in Cloudinary
    resource_type: "auto", // supports pdf, image, etc.
    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname;
    },
  },
});

const upload = multer({ storage });

module.exports = upload;