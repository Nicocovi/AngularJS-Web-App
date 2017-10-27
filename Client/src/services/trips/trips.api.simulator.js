
//https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

let trips = [
    {
        "_id": "5932cff4f9146622837250bb",
        "name": "Short city trip to Munich",
        "destination": "Munich",
        "__v": 0,
        "users": [
          "593168ebf84f7e168700d88f",
          "59316d8fb8362c16ee0b2034",
          "59316dd4b8362c16ee0b2035",
          "59317400f0b6fe176f4cd25f"
        ]
      },
      {
        "_id": "5932d1cffacb8922ae3c89c8",
        "name": "Hausparty bei Nico :P",
        "destination": "Munich",
        "__v": 0,
        "users": [
          "593168ebf84f7e168700d88f",
          "59316d8fb8362c16ee0b2034",
          "59316dd4b8362c16ee0b2035",
          "59317400f0b6fe176f4cd25f"
        ]
      },
      {
        "_id": "5932d20ffacb8922ae3c89c9",
        "name": "Weekend in New York",
        "destination": "New York",
        "__v": 0,
        "users": [
          "593168ebf84f7e168700d88f",
          "59316d8fb8362c16ee0b2034",
          "59316dd4b8362c16ee0b2035",
          "59317400f0b6fe176f4cd25f"
        ]
      },
      {
        "_id": "593bf1de2009430c1801e804",
        "name": "Trip for 2",
        "destination": "Bangkok",
        "__v": 0,
        "users": [
          "593168ebf84f7e168700d88f",
          "59316d8fb8362c16ee0b2034"
        ]
      },
      {
          "_id": "593bf1de2009430c1801e804",
          "name": "Trip for other 2",
          "destination": "Narnia",
          "__v": 0,
          "users": [
            "59316dd4b8362c16ee0b2035",
            "59317400f0b6fe176f4cd25f"
          ]
        }
];

export default class TripsAPISimulator {
    constructor(){}

    static getTripsAsync () {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){
                let response = { data: [...trips] };
                resolve(response); // Yay! Everything went well!
            }, 250);
        });

    };


    static getTripByIdAsync (id) {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){

                let trip = {};
                let tripIndex = trips.map(trip => trip['_id']).indexOf(id);
                if (tripIndex > -1) trip = trips[tripIndex];

                let response = { data: Object.assign({},trip)};
                resolve(response); // Yay! Everything went well!
            }, 250);
        });

    };

    static createTrip (trip) {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){

                let _trip  = Object.assign({},trip, {'_id': ObjectId()});
                trips.push(_trip);

                let response = { data: _trip };
                resolve(response); // Yay! Everything went well!
            }, 250);
        });


    };

    static deleteTrip (id) {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){

                let tripIndex = trips.map(trip => trip['_id']).indexOf(id);
                trips.splice(tripIndex,1); //Mutation


                let response = { status: 200 };
                resolve(response); // Yay! Everything went well!
            }, 250);
        });

    };

    static updateTrip (trip) {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){

                let tripIndex = trips.map(_trip => _trip['_id']).indexOf(trip['_id']);
                trips[tripIndex] =  Object.assign({},trips[tripIndex], trip);

                let response = { data: trips[tripIndex] };
                resolve(response); // Yay! Everything went well!
            }, 250);
        });

    };


}



