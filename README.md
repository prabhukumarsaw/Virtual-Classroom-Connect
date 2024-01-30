
# AUNTHICATION SYSTEM

## SERVER SETUP
    - npm init
    - setup server syntax 
    - connect mongodb

## setup folder structure
    [create model, router, controller]

    - auth model Schema [username, email, password]
    -setup as middleware in server.js [app.use('/api/auth', router)] ::import router defines route of signup & login
    -in auth-router: import auth-controller and [router.route('/register').post(authController.register)]
    - authController import[user-model]

    ------register-----

    const register = async (req, res) => {
        try{

            1. get all data from req.body
            2. validate data
            3. cheack user already exist or not based on -email
            4. hash password X do in model schema
            5. save user data in db
            6.send data and token



        } catch(error) {
            console.log(error);
        }
    }


    ------login-----

    const login = async (req, res) => {
        try{

            1. get all data from req.body
            2. validate data
            3. find user already exist or not based on -email
            4. hash password X do in model schema
            5. save user data in db
            6.send data and token



        } catch(error) {
            console.log(error);
        }
    }

AIzaSyA1-3516ZvB44BaJgHBk8gyOMgTJUEMTNk
Replace with your YouTube API key= AIzaSyC4p0VSyGIrFXAybEzh5jJbXGHCrSMo0js

AIzaSyDLdJewZrbuhtfd9YGhCX1uQhchH2w2Tdc






my-mediasoup-app/
|-- client/
|   |-- public/
|   |-- src/
|       |-- components/
|           |-- CreateRoomForm.js
|           |-- Room.js
|           |-- RoomList.js
|           |-- VideoControls.js
|           |-- WebSocketConnection.js
|       |-- App.js
|       |-- index.js
|       |-- styles.css
|-- server/
|   |-- controllers/
|       |-- createRoomController.js
|       |-- joinRoomController.js
|       |-- mediasoupController.js
|   |-- models/
|       |-- Room.js
|   |-- routes/
|       |-- index.js
|   |-- server.js
|-- package.json
|-- .env
