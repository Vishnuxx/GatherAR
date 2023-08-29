
# GatherAR

An AR app which lets people to gather, tinker and collaborate in an augmented reality environment.

**GatherAR** is an app that allows users to connect with one another in an augmented reality environment and collaborate in real-time
![gatherar](https://github.com/Vishnuxx/GatherAR/assets/74808440/327889df-64e6-4170-a1b0-5784d2e0e597)

Imagine being able to connect with artists and designers from around the world to brainstorm and work on projects together in real time. Or, envision being able to attend virtual classes and collaborate with classmates on assignments, no matter where you are located. GatherAR also opens up exciting possibilities for shopping, allowing users to explore and discuss new products with others in immersive rooms.

# Installation

      git clone https://github.com/Vishnuxx/GatherAR
      cd gatherar

      npm i

create `.env` file in your project root directory and add the following code.


     #firebase configs

     REACT_APP_FIREBASE_API_KEY=<YOUR FIREBASE API KEY>
     REACT_APP_FIREBASE_AUTH_DOMAIN=<FIREBASE AUTH DOMAIN>
     REACT_APP_FIREBASE_DATABASE_URL=<DATABASE URL>
     REACT_APP_FIREBASE_PROJECT_ID=<PROJECT ID>
     REACT_APP_FIREBASE_STORAGE_BUCKET=<STORAGE BUCKET>
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<SENDER ID>
     REACT_APP_FIREBASE_APP_ID=<APP ID>
     REACT_APP_FIREBASE_MEASUREMENT_ID=<MEASUREMENT ID>

     #GatherAR server endpoint

     REACT_APP_SERVER_URL =<SERVER URL>

     #firebase realtime db path for accessing user from user-profiles

     REACT_APP_USER_PROFILES_PATH=<eg. /userProfiles/>


To run the project 

     npm start




You can clone the server repo from https://github.com/Vishnuxx/GatherAR-Server
