// Modules
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Reading data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route Functions
const getAllTours = (req, res) => {
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
// Startup server
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
