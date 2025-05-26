import { createContext, useContext } from 'react';
import { auth, db } from './config';

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const value = {
    auth,
    db
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export default FirebaseContext;
