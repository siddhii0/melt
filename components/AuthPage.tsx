import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: (username: string, password: string) => boolean;
  onSignup: (username: string, password: string) => boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
        setError('Username and password cannot be empty.');
        return;
    }
    
    let success = false;
    if (isLoginView) {
      success = onLogin(username, password);
      if (!success) {
        setError('Invalid username or password.');
      }
    } else {
      success = onSignup(username, password);
       if (!success) {
        setError('Username already exists. Please choose another one.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col justify-center items-center p-4">
       <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-5xl font-bold font-serif tracking-tight bg-gradient-to-r from-sunset to-raspberry text-transparent bg-clip-text">
                MELT.
            </h1>
            <p className="text-gray-500 mt-2 font-semibold">Where moods meet meals.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold font-serif text-center mb-2">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLoginView ? 'Log in to continue your culinary journey.' : 'Sign up to get started.'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              aria-label="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              aria-label="Password"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              {isLoginView ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            {isLoginView ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => {
                  setIsLoginView(!isLoginView);
                  setError(null);
              }}
              className="font-semibold text-indigo-600 hover:underline ml-1"
            >
              {isLoginView ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
       </div>
    </div>
  );
};

export default AuthPage;