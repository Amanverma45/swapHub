const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (requestAnimationFrame,file)=>({
        folder:"SwapHubProducts",
        resource_type:"image",
        public_id:file.originalname.spilit(".")[0] + "_" + Date.now(),
    })
})
const upload = multer({
    storage,
    // fileFilter:(req,file,cb)=>{
    //     const allowedTypes = [
    //         'Image/jpeg',
    //         'Image/jpg',
    //         'Image/png',
    //         'Image/webp',
    //     ];
    //     if(allowedTypes.includes(file.mimetype)){
    //         cb(null,true);
    //     }else{
    //         cb(new Error("only JPG, JPEG, PNG and WEBP images are allowed"),false);
    //     }
    // },
    fileFilter: (req, file, cb) => {
  console.log("Mimetype:", file.mimetype);

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Rejected:", file.mimetype);
    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"), false);
  }
},
    limits: {
        fileSize: 5* 1024 * 1024, //5MB
    }
})
module.exports = upload; 