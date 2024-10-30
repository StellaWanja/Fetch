# Fetch App
Fetch is a React based application that focuses on fetching and displaying users, the albums each user has, and the photos within an album, and allowing a user to edit photo titles. The data is fetched from https://jsonplaceholder.typicode.com/. The project cam be viewed at https://fetch-lilac-three.vercel.app.

<img src="https://github.com/StellaWanja/Fetch/blob/prod/src/assets/landing-page.png" />

**LIVE LINK**: https://fetch-lilac-three.vercel.app/

## Features of the web app
1. Fetches and lists users from the typicode API and enables viewing of each users details.
2. Shows the albums associated with the selected user.
3. Fetches and displays photos within a selected album.
4. Allows users to edit photo titles directly.
5. Integrates custom hooks and context to manage authentication, user profiles, and albums.
6. Allows for user sign in using Google
7. Automation for running lints, tests and deployment to Vercel.

## Tech Stack and Dependencies
1. React for UI development.
2. Tailwind CSS for styling.
3. Material UI to implement features such as interactive modals.
4. Firebase for authentication features.
5. Prop-types for typechecking React props.
6. React-Router-DOM for client-side routing, enabling seamless navigation.
7. React Icons for ready-to-use icons.
8. Vitest for testing.

## Build instructions
1. Clone the repository to your local machine using Git.
2. Run *npm install* to install all required dependencies.
3. Run *npm run dev* to run the project in your local machine.
4. Run *npm test* to run tests.
