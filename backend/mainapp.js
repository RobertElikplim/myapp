// import the require package express,mongoose,morgan
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require('cors');
require("dotenv").config();
var path = require('path');
// create mainapp using express
const mainapp = express();
mainapp.use(cors());

// Import the model schema created
let EventsModel = require('./models/event');
let IndividualsModel = require('./models/individual');
let QuerysModel = require('./models/query');
//let ZipsModel = require('./models/servicebyzip');
let BarChartModel = require('./models/barchart');
let BarChart1Model = require('./models/barchart1');


//Setting up mongoose connection to the database
mongoose
  .connect(process.env.MONGO_URL)  
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });
// Declare the PORT number
const PORT = process.env.PORT || 3000;
// Use express middle to accept incoming request as JSON object and enable incoming request logging in dev mode.
mainapp.use(express.json()); 
mainapp.use(morgan("dev")); 
// mainapp start the server and listen to ther server
mainapp.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
  });
// catch all the error handler
mainapp.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});


//Retrieve info route

//route for viewing records for the individuals table
mainapp.get('/individuals', (req, res, next) => {
  IndividualsModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

//route for viewing records for the events table
mainapp.get('/events', (req, res, next) => {
  EventsModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({_id: -1}).limit()
});

//route for last three added events
mainapp.get('/events3', (req, res, next) => {
  EventsModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    }).sort({_id: -1}).limit(3)
});

//Update info routes

//route for updating records in the events table
mainapp.get('/edit-event/:_id', (req, res) => {
  EventsModel.findById(req.params._id, (error, data) => {
      if (error) {//if cannot update this display the error or else update new date of the events by id.
        return next(error);
      } else {
        res.json(data)
      }
    })
});

mainapp.put('/update-event/:_id', (req, res, next) => {
  EventsModel.findByIdAndUpdate(req.params._id, {// find the event id  in the collection and update according to the user input
      $set: req.body
    }, (error, data) => {
      if (error) {//if cannot update this display the error or else update new date of the events by id.
        return next(error);
      } else {
        res.json(data)
        console.log('Event successfully updated!')
      }
    })
});

//route for updating records in the individual table
mainapp.put('/update-individual/:_id', (req, res, next) => {
  IndividualsModel.findByIdAndUpdate(req.params._id, {// find the event id  in the collection and update according to the user input
      $set: req.body
    }, (error, data) => {
      if (error) {//if cannot update this display the error or else update new date of the events by id.
        return next(error);
      } else {
        res.json(data)
        console.log('Individual successfully updated!')
      }
    })
});

mainapp.get('/edit-individual/:_id', (req, res) => {
  IndividualsModel.findById(req.params._id, (error, data) => {
      if (error) {//if cannot update this display the error or else update new date of the events by id.
        return next(error);
      } else {
        res.json(data)
      }
    })
});

//Delete info routes

//route for deleting records in the individuals table
mainapp.delete('/delete-individual/:_id', (req, res, next) => {
   IndividualsModel.findByIdAndRemove(req.params._id, (error, data) => {// find the ID of individual model and delete the match element
      if (error) {// if ID does not exist return an error or else  show confirmation message that it has delete off the database 
        return next(error);
      } else {
         res.status(200).json({
           msg: data
         });
      }
    });
});
//route for deleting records in the events table
mainapp.delete('/delete-event/:_id', (req, res, next) => {
  EventsModel.findByIdAndRemove(req.params._id, (error, data) => {// find the id of the event and remove the match element event
      if (error) {// if the event id does not exist return error or else  show the confirmation message that event has been delete of the database
        return next(error);
      } else {
         res.status(200).json({
           msg: data
         });
      }
    });
});

//Add info 
// Create a route that add the information to the database for the individual collection //
mainapp.post('/individual', (req, res, next) => {
  IndividualsModel.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.send('Person is added to the database');
      }
    })
});

// Create a route that add the information to the database for the events table //
mainapp.post('/event', (req, res, next) => {
  EventsModel.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.send('Event is added to the database');
      }
    })
});

                  //All aggregate fucntions

  //get individual reports and save to another collection with name query
  mainapp.get('/summary-by-event/', (req, res, next) => {
    IndividualsModel.aggregate([
        {$match : { eventType : {$exists: true}} },
        {$project : {_id: 1,firstName: 1, lastName: 1, phoneNumber: 1, city: 1, state: 1, zipCode: 1, eventType : 1, eventDate: 1, ethnicity: 1, } },
        {$lookup : {from : 'events',localField : 'eventType',foreignField : 'eventType', as : 'events'}},
        {$addFields: { COUNT : { $sum : {$size : "$events"}}}},
        {$out : "query"},
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
            res.json(data);
    }
        });
    });

    //make aggregate function in query collection accessible
  mainapp.get('/viewbyevent', (req, res, next) => {
    QuerysModel.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  });

  //print out aggregate in servicebyzip collection
  mainapp.get('/viewbyzip', (req, res, next) => {
    ZipsModel.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  });

  //route for making event type unique by binding the date of the event
  //this route also helps retrieve records of individuals who went to a particular event 
  mainapp.get('/summarybyevents/:eventType/:eventDate', (req, res, next) => {
    IndividualsModel.find({eventType: req.params.eventType, eventDate: req.params.eventDate}, (error, data) => {
        if (error) {
          return next(error)
        } else if (data === null) {
          res.status(404).send('Record not found');
        } else {
          res.json(data);
        }
    });
  }); 

  
  //rooute for printing records in the query collection based on the zipcode
  mainapp.get('/summarybyzip/:zipCode/', (req, res, next) => {
    QuerysModel.find({zipCode: req.params.zipCode}, (error, data) => {
        if (error) {
          return next(error)
        } else if (data === null) {
          res.status(404).send('Record not found');
        } else {
          res.json(data);
        }
    });
  }); 

    // endpoint that retrieve history of the individuals and how they access the service
mainapp.get('/history/', (req, res, next) => {
  IndividualsModel.aggregate([
    {
    $group: {
        _id: {
            firstName: '$firstName',
            lastName: '$lastName',
            city: '$city',
            state: '$state',
            zipCode: '$zipCode',
            phoneNumber: '$phoneNumber',
        },
        Count: {
            $sum: 1
        }
    }
}], (error, data) => {
      if (error) {
        return next(error)
      } else if (data === null) {
        res.status(404).send('Record not found');
      } else {
        res.json(data);
      }
  });
});

// endpoint that will retrieve Individual data by first Name
mainapp.get('/individualss/:firstName', (req, res, next) => {
  IndividualsModel.find({firstName: req.params.firstName}, (error, data) => {
      if (error) {
        return next(error)
      } else if (data === null) {
        res.status(404).send('Record not found');
      } else {
        res.json(data);
      }
  });
}); 

//this route provides data to the chart that shows the number of people per zipcodes recorded
mainapp.get('/chartzip', (req, res, next) => {
  BarChartModel.find({  }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});


//this route provides data to the chart that shows the number of people per all events recorded
mainapp.get('/chartevent', (req, res, next) => {
  BarChart1Model.find({}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
  });
});

//this route populates/pushes data  to the labels in the chart that displays totals by event type
mainapp.get('/popchart1', (req, res, next) => {
  QuerysModel.aggregate([
      {$match : { eventType : {$exists: true}} },
      {$project : {eventDate: 1, eventType:1} },
      {$group: { _id: '$eventType',  total: { $sum: 1 }} },
      {$out : "barchart1"},
  ], (error, data) => {
      if (error) {
        return next(error)
      } else {
          res.json(data);
  }
      });
  });

//this route populates/pushes data  to the labels in the chart that displays totals by zipcode
mainapp.get('/popchart', (req, res, next) => {
  QuerysModel.aggregate([
      {$match : { zipCode : {$exists: true}} },
      {$project : {zipCode: 1} },
      {$group: { _id: '$zipCode', total: { $sum: 1 } } },
      {$out : "barchart"},
  ], (error, data) => {
      if (error) {
        return next(error)
      } else {
          res.json(data);
  }
      });
  });

//the route prints the number of times a particular individual has been serviced
  mainapp.get('/individualhistory/:lastName/:firstName', (req, res, next) => {
    QuerysModel.aggregate([
        {$match : { lastName : req.params.lastName, firstName : req.params.firstName} },
        {$project : {firstName: 1, lastName: 1, phoneNumber: 1, zipCode: 1, eventType : 1} },
        //{$lookup : {from : 'events',localField : 'eventType',foreignField : 'eventType', as : 'events'}},
        {$group: {_id: {
          'lastName':'$lastName',
          'firstName':'$firstName',
          'phoneNumber':'$phoneNumber',
          'zipCode':'$zipCode',
          'eventType':'$eventType'},
          total: { $sum: 1 }}}
        //{$addFields: {total: { $sum: 1 }}},
        //{$out : "query"},
    ], (error, data) => {
        if (error) {
          return next(error)
        } else if (data === null) {
          res.status(404).send('Record not found');
        } else {
            res.json(data);
    }
        });
    });

    mainapp.get('/individualhistoryy', (req, res, next) => {
      QuerysModel.aggregate([
          {
            $group: {
              _id:{
                firstName: '$firstName',
                lastName: '$lastName',
                phone: '$phoneNumber',
                ethnicity: '$ethnicity',
                event: '$eventType',
              },
              Total : {
                $sum: 1
            }
            }
          }
      ], (error, data) => {
          if (error) {
            return next(error)
          } else {
              res.json(data);
      }
          });
      });



  mainapp.get('/individualhistor', (req, res, next) => {
    QuerysModel.aggregate([
        {
          $group: {
            _id:{
              firstName: '$firstName',
              lastName: '$lastName',
              phoneNumber: '$phoneNumber',
              ethnicity: '$ethnicity',
            },
            Total : {
              $sum: 1
          }
          }
        }
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
            res.json(data);
    }
        });
    });

  mainapp.get('/totindcount', (req, res, next) => {
    IndividualsModel.aggregate([
      {$count: "Total_Count"}
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
            res.json(data);
    }
        });
    });

  mainapp.get('/totevcount', (req, res, next) => {
    EventsModel.aggregate([
      {$count: "Total_Count"}
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
            res.json(data);
    }
        });
    });

// endpoint for retrieving event by date
mainapp.get('/ate/:eventDate/', (req, res, next) => {
  IndividualsModel.findOne( {eventDate: req.params.eventDate}, (error, data) => {
      if (error) {
          return next(error)
      } else if (data === null) {
        res.status(404).send('Record not found');
      }
      else {
        res.json(data)
      }
  });
});