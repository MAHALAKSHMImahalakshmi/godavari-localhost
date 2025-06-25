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

### 2. **Install Dependencies**

Navigate to the client folder and install dependencies:

```sh
cd client
npm install
```

If you have a backend (like Express or Firebase functions), also install dependencies there:

```sh
cd ../server   # or the backend folder name
npm install
```

### 3. **Set Up Environment Variables**

If your project uses Firebase or other APIs, create a `.env` file in the `client` folder and add your config:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
# ...other Firebase config as needed
```

### 4. **Run the App**

From the `client` folder, start the React app:

```sh
npm start
```

This will open [http://localhost:3000](http://localhost:3000) in your browser.

If you have a backend, open a new terminal, go to the backend folder, and run:

```sh
npm start
```

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
server/         # (optional) Backend code
```

---

## Troubleshooting

- If you see errors about missing dependencies, run `npm install` again.
- Make sure your Firebase or API keys are correct in `.env`.
- If the app doesn’t open, check the terminal for errors and ensure you’re in the correct folder.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Credits

- Built with [React](https://reactjs.org/)
- UI icons from [Lucide](https://lucide.dev/)

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
