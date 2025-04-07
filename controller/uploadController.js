// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinaryConfig");
// const sendEmail = require("../utils/sendEmail");

// // Allowed file formats
// const allowedFormats = ["pdf", "doc", "docx", "xls", "xlsx"];

// // Configure Multer with Cloudinary Storage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         const fileExt = file.mimetype.split("/")[1];
//         console.log(fileExt,'file');
        
//         // if (!allowedFormats.includes(fileExt)) {
//         //     throw new Error("Invalid file type. Only PDF, DOC, DOCX, XLS, and XLSX are allowed.");
//         // }

//         return {
//             folder: "career-resumes",
//             format: fileExt,
//             public_id: file.originalname.split(".")[0], // Use original filename
//         };
//     },
// });

// // File filter function
// const fileFilter = (req, file, cb) => {
//     const fileExt = file.mimetype.split("/")[1];
//     if (allowedFormats.includes(fileExt)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type. Only PDF, DOC, DOCX, XLS, and XLSX are allowed."), false);
//     }
// };

// // Apply Multer
// const upload = multer({ storage, fileFilter }).single("resume");

// // Upload Resume and Send Email
// const uploadResume = (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message || "File upload failed" });
//         }

//         const { name, email } = req.body;
//         console.log(req.body, "Request body"  );
        
//         const resumeUrl = req.file.path; // Cloudinary URL

//         try {
//             // Send Email
//             await sendEmail(name, email, resumeUrl);

//             res.json({ success: true, message: "Resume uploaded and email sent!",data: { resumeUrl } });
//         } catch (error) {
//             res.status(500).json({ success: false, message: "Error sending email", error });
//         }
//     });
// };

// module.exports = { uploadResume };


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const sendEmail = require("../utils/sendEmail");

// Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const fileExt = file.originalname.split(".").pop(); // Get file extension
        console.log(fileExt, "file extension");

        return {
            folder: "career-resumes",
            format: fileExt, // Keep original file format
            public_id: file.originalname.split(".")[0], // Use original filename
            resource_type: "auto", // Allow all file types (auto detects type)
        };
    },
});

// Remove file type restrictions (Allow all file types)
const upload = multer({ storage }).single("resume");

// Upload Resume and Send Email
const uploadResume = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message || "File upload failed" });
        }

        const { name, email ,phone,position,subject,message} = req.body;
        console.log(req.body, "Request body");

        const resumeUrl = req.file.path; // Cloudinary URL

        try {
            // Send Email
            await sendEmail(name, email,phone,position,message,subject, resumeUrl);

            res.status(201).json({ success: true, message: "Resume uploaded and email sent!", data: { resumeUrl } });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error sending email", error });
        }
    });
};

module.exports = { uploadResume };
