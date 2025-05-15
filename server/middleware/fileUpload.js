import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current file path and directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(dirname(dirname(__dirname)), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter only image files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Export multer middleware
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Function to convert file to base64
export const fileToBase64 = (filePath) => {
  try {
    const fileData = fs.readFileSync(filePath);
    const base64Data = fileData.toString('base64');
    const fileType = path.extname(filePath).substring(1);
    return `data:image/${fileType};base64,${base64Data}`;
  } catch (error) {
    console.error('Error converting file to base64:', error);
    return null;
  }
};

// Delete file after it's been converted and stored in DB
export const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}; 