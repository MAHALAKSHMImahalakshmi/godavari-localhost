# Godavari Pushkaralu Travel Planner

A React app to help pilgrims plan their trip to Godavari Pushkaralu, including itinerary, budget, crowd tips, and more.

---

## Features

- Login and Signup authentication
- Multi-language support (English, Hindi, Telugu)
- Day-wise itinerary and trip roadmap
- Budget summary and travel tips
- Crowd management tips and info modals

---

## Getting Started

Follow these steps to run the project on your local computer.

### 1. **Clone the Repository**

```sh
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

---

### 2. **Install Dependencies**

#### **Frontend (React Client)**

```sh
cd client
npm install
```

#### **Backend (Server/Express or Firebase Functions)**

Open a new terminal, then:

```sh
cd server   # or the backend folder name
npm install
```

---

### 3. **Set Up Environment Variables**

#### **Frontend (.env in `client` folder):**

If your project uses Firebase or other APIs, create a `.env` file in the `client` folder and add your config:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
# ...other Firebase config as needed
```

#### **Backend (.env in `server` folder):**

If your backend uses environment variables (for example, database credentials, API keys), create a `.env` file in the `server` folder:

```
PORT=5000
DB_HOST=localhost
DB_USER= user
DB_PASSWORD=****
DB_NAME=db
```
### how to create db in mysql go it ites terminal then give this command 
```
CREATE DATABASE mydb;
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;
```

---

### 4. **Run the App**

#### **Start the Backend Server**

In the `server` folder:

```sh
npm start
```

This will start your backend API (commonly at [http://localhost:5000](http://localhost:5000)).

#### **Start the Frontend React App**

In a new terminal, go to the `client` folder:

```sh
npm start
```

This will open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 5. **Login or Sign Up**

- On the homepage, sign up for a new account or log in with your credentials.
- After login, you’ll see the full Godavari Pushkaralu planner.

---

## Folder Structure

```
client/         # React frontend
  src/
    App.js
    create.js
    LoginForm.js
    SignUpForm.js
    firebase.js
  public/
server/         # Backend code (Express/Firebase functions/etc.)
  index.js
  .env
  package.json
```

---

## Troubleshooting

- If you see errors about missing dependencies, run `npm install` again in the correct folder.
- Make sure your Firebase or API keys are correct in both `.env` files.
- If the app doesn’t open, check the terminal for errors and ensure you’re in the correct folder.
- Ensure both backend and frontend servers are running.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


## Credits

- Built with [React](https://reactjs.org/)
- UI icons from [Lucide](https://lucide.dev/)
- Backend powered by [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) (or Firebase Functions)

# Resources Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
