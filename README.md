# A frontend developed for a school project
![Icon](https://cdn.discordapp.com/attachments/852872786334187521/1269819128554848348/App_Icon.png?ex=66b172b8&is=66b02138&hm=36f44cfd5345605a67630aac0cfe0448dd44a40c83f95f30513728cd16eec710&)
DCPE/FT/2A/01
DevOps AY24/25

## Purpose
This frontend allows the reservation of books, cancelling of reservation, and viewing of books in the database.
The frontend also includes an authentication page that allows you to login or signup and create an account.

## Additional information
This is one of my first react-native projects, developed from scratch alone. This project which was initially meant to be deployed on multiple
platforms, ended up being only developed for mobile application (due to CORS, and not properly handling
authentication and requests to MongoDB). This project is tested with Expo Go on the iOS.

This is an [Expo](https://expo.dev) project that uses the react-native framework.
It is **CRUCIAL** to note that the frontend developed here is **NOT** production ready.
I understand and am aware of the security flaws the project presents:
1. The env API key when placed into the file directory can be exposed easily
2. The encryption method used to store password and username is PUBLICALLY shown in the react project.
3. There is no backend in the project to handle username and password properly. MongoDB is used to store the data

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
