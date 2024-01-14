# Stack-Connect

Stack-Connect is a dynamic job-seeking platform designed to streamline the employment process.
Utilizing the MERN stack ideology, the application integrates MongoDB, Express.js, React and Node.js.

### Main features are: 
  - Creation of a job
  - Search functionality of a specific job
  - Apply functionality for a job (Still under work)
  - Creation of a user with credentials
  - Log in functionality
  - Correct JWT handling

### Required Prerequisites

In order to run this project, make sure you have the following prerequisites:
  - Program to unpack a .zip file e.g. [7-Zip](https://www.7-zip.org/)
  - Program to open and run the project e.g. [VSCode](https://code.visualstudio.com/)
  - Creation of a MongoDB account.

### Setting Up MongoDB

1. **Create a MongoDB Account:**
   - Go to [MongoDB website](https://www.mongodb.com/) and sign up for a free account.

2. **Set Up a Database:**
   - Once you have a MongoDB account, create a new cluster to set up your database.

3. **Connect to MongoDB:**
   - Obtain the connection details (connection string) for your MongoDB cluster.

### How to run

Here is the complete guide how to setup and run the project (On Windows10 / 11):
  1. Download the project as a ZIP
  2. Extract the project in to a directory
  3. Navigate to the directory that you extracted the project
  4. Right click the directory, and select "Open with Code"
  5. Open a terminal
  6. Navigate in to the Backend directory
  7. Once in Backend directory, type in terminal: `npm install`
  8. After complete, navigate to Frontend directory and type in to the terminal: `npm install`
  9. After all of the required depencies are installed, create a .env file into the Backend directory
  11. In the .env file, put the following information:
```
MONGO_URI=mongodb+srv://[USERNAME HERE]:[PASSWORD HERE][CONNECTION STRING HERE, STARTING WITH @]
PORT=5000
JWT_SECRET=secret
```
  13. After all of the steps has been done, navigate to the Backend directory in terminal and run command: `npm start`. You should get a message in the console:
```
Server started on port 5000
Connected to database
```
  15. Open up a second terminal, navigate to the Frontend directory and type: "npm start". You should get a message in the console:
```
Compiled successfully!
You can now view stack-connect in the browser.
  Local:            http://localhost:3000
  On Your Network:  [Local IP HERE]:3000

Note that the development build is not optimized.

To create a production build, use npm run build.

webpack compiled successfully
```
14. Enjoy!
  
