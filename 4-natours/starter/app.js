// Modules
const express = require('express');
const req = require('express/lib/request');
const { cookie } = require('express/lib/response');
const res = require('express/lib/response');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const port = 3000;

// ***HOW EXPRESS IS LAYED OUT***
// 1) Top layer is consisted of requiring our modules
// 2) Next is our middleware
// 3) The routes itself
// 4) Start the server

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware ✈');
  next();
});
// More middlware adding date to req
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log('Date added');
  next();
});

// Reading data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route Functions
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      staus: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tour,
    },
  });
};

const updateTour = () => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      staus: 'fail',
      message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: `<Updated tour here...>`,
    },
  });
};

// USER FUNCTIONS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// // Routes
// app.get('/api/v1/tours', getAllTours);
// // POST Request
// app.post('/api/v1/tours', createTour);
// // Route to accept one tour
// // ***WORKING WITH VARIABLES***
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
// Startup server
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
