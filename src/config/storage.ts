import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const destinationPath = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  destDir: destinationPath,
  uploadsDir: uploadsPath,
  storage: multer.diskStorage({
    destination: destinationPath,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
