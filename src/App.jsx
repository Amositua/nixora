// import { useState, useEffect } from 'react';
// import { supabase } from './lib/supabase';
// import Layout from './components/Layout';
// import Dashboard from './screens/Dashboard';
// import Upload from './screens/Upload';
// import LoanReview from './screens/LoanReview';
// import Portfolio from './screens/Portfolio';
// import QueryBuilder from './screens/QueryBuilder';
// import Reports from './screens/Reports';
// import Timeline from './screens/Timeline';
// import Notifications from './screens/Notifications';
// import Settings from './screens/Settings';
// import Landing from './screens/Landing';
// import SignIn from './screens/SignIn';
// import SignUp from './screens/SignUp';

// function App() {
//   const [currentScreen, setCurrentScreen] = useState('landing');
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   console.log('Current Screen:', currentScreen);
//   useEffect(() => {
//     (async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setSession(session);
//       setLoading(false);
//     })();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       if (session) {
//         setCurrentScreen('dashboard');
//       } else {
//         setCurrentScreen('landing');
//       }
//     });

//     return () => subscription?.unsubscribe();
//   }, []);

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     setCurrentScreen('landing');
//   };

//   if (loading) {
//     return (
//       <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
//         <div className="text-center">
//           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
//             <div className="w-6 h-6 bg-white rounded"></div>
//           </div>
//           <p className="text-gray-600 font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!session) {
//     return (
//       <>
//         {currentScreen === 'landing' && <Landing setCurrentScreen={setCurrentScreen} />}
//         {currentScreen === 'signin' && <SignIn setCurrentScreen={setCurrentScreen} />}
//         {currentScreen === 'signup' && <SignUp setCurrentScreen={setCurrentScreen} />}
//       </>
//     );
//   }

//   console.log('currentScreen inside session:', currentScreen);
//   const renderScreen = () => {
//     switch (currentScreen) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'upload':
//         return <Upload />;
//       case 'review':
//         return <LoanReview />;
//       case 'portfolio':
//         return <Portfolio />;
//       case 'query':
//         return <QueryBuilder />;
//       case 'reports':
//         return <Reports />;
//       case 'timeline':
//         return <Timeline />;
//       case 'notifications':
//         return <Notifications />;
//       case 'settings':
//         return <Settings />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <Layout
//       currentScreen={currentScreen}
//       setCurrentScreen={setCurrentScreen}
//       onSignOut={handleSignOut}
//     >
//       {renderScreen()}
//     </Layout>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import Upload from './screens/Upload';
import LoanReview from './screens/LoanReview';
import Portfolio from './screens/Portfolio';
import QueryBuilder from './screens/QueryBuilder';
import Reports from './screens/Reports';
import Timeline from './screens/Timeline';
import Notifications from './screens/Notifications';
import Settings from './screens/Settings';
import Landing from './screens/Landing';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { authService } from './services/authServices';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = authService.getSession();

    if (session) {
      setSession(session);
      setCurrentScreen('dashboard');
    }

    console.log('Auth session checked:', session);
    console.log('Current Screen on load:', currentScreen);
    
    setLoading(false);
  }, []);

  const handleSignOut = () => {
    authService.logout();
    setSession(null);
    setCurrentScreen('landing');
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        {currentScreen === 'landing' && (
          <Landing setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === 'signin' && (
          <SignIn
            setCurrentScreen={setCurrentScreen}
            onAuthSuccess={(session) => {
              setSession(session);
              setCurrentScreen('dashboard');
            }}
          />
        )}
        {currentScreen === 'signup' && (
          <SignUp setCurrentScreen={setCurrentScreen} />
        )}
      </>
    );
  }

  console.log('currentScreen inside session:', currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <Upload />;
      case 'review':
        return <LoanReview />;
      case 'portfolio':
        return <Portfolio />;
      case 'query':
        return <QueryBuilder />;
      case 'reports':
        return <Reports />;
      case 'timeline':
        return <Timeline />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      currentScreen={currentScreen}
      setCurrentScreen={setCurrentScreen}
      onSignOut={handleSignOut}
    >
      {renderScreen()}
    </Layout>
  );
}

export default App;
