const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Uncaught Exceptions
process.on('uncaughtException', (err) => {
  // console.log('ERROR: ', err.name, err.message);
  console.log('ERROR: ', err);
  console.log('UNCAUGHT EXEPTION: 🔥 Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });
// .catch((err) => console.error('ERROR'));

// Testind model Tour
// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR : ', err);
//   });

// Express env variable
// console.log(app.get('env'));

// Node js enviorment variables
// console.log(process.env);

const port = process.env.PORT;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
  console.log('Enviorment :', process.env.NODE_ENV);
});

// Resolve Unhandler promise rejection
process.on('unhandledRejection', (err) => {
  console.log('ERROR: ', err);
  // console.log(err.message);

  console.log('UNHANDLER REJECTION: 🔥 Shutting down...');
  // 0 -> success ,1 -> uncaught exception
  server.close(() => {
    process.exit(1);
  });
});
