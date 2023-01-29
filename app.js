require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const fileRouter = require('./routes/file');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const mkdirp = require('mkdirp');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = 'uploads/';
    try {
      mkdirp.sync(path);
      cb(null, path);
    } catch (err) {
      console.log('An error occurred while creating the directory : ', err);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const connectDB = async () => {
  await mongoose
    .set('strictQuery', false)
    .connect(
      `mongodb+srv://kingchen711:${process.env.DB_PASSWORD}@cluster0.zp6lxcp.mongodb.net/memoriesDB`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('Mongoose connected successfully'))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};
connectDB();

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/file', fileRouter);
app.use('/api/comment', commentRouter);

app.get('/uploads/:filename/:size', async (req, res) => {
  // Find the file
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  // Resize the image
  const size = req.params.size;
  let resizedImage = await sharp(filePath)
    .resize({ width: parseInt(size) })

  //covert to webp
  const webp = req.headers.accept && req.headers.accept.includes('image/webp');
  if (webp) {
    resizedImage = resizedImage.webp();
  }

  // Send the resized image to the client
  res.contentType('image/jpeg');
  res.send(await resizedImage.toBuffer());
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
