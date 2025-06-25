import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Create from './create'; // This is your main app UI

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Show login/signup until logged in
  if (!loggedIn) {
    return showSignUp ? (
      <SignUpForm
        onSignUp={() => setShowSignUp(false)}
        onSwitchToLogin={() => setShowSignUp(false)}
      />
    ) : (
      <LoginForm
        onLogin={() => setLoggedIn(true)}
        onSwitchToSignUp={() => setShowSignUp(true)}
      />
    );
  }

  // After login, show your full app (Create component)
  return <Create />;
}

export default App;    