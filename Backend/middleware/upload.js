const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (requestAnimationFrame,file)=>({
        folder:"SwapHubProducts",
        resource_type:"image",
        public_id: `${file.originalname.split(".")[0]}_${Date.now()}`,
    })
})
const upload = multer({
    storage,

    fileFilter: (req, file, cb) => {
  console.log("Mimetype:", file.mimetype);

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Rejected:", file.mimetype);
    cb(new Error("Only JPG, JPEG, PNG ,avif and WEBP images are allowed"), false);
  }
},
    limits: {
        fileSize: 5* 1024 * 1024, //5MB
    }
})
module.exports = upload; 