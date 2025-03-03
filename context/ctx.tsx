import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { router, useRouter } from 'expo-router';

const AuthContext = createContext<{
  signIn: (user: object) => void;
  signOut: () => void;
  register: (user: object) => void;
  update: (user: object) => void;
  session?: object | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  register: () => null,
  update: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const router = useRouter();

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: object) => {
            fetch("https://devjourney.elioooooo.fr/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(res => res.json())
            .then(
                (res) => {
                    setSession(res);
                    router.replace('/(app)');
                },
                (error) => {
                    console.error("Error in login:", error);
                }
            );
        },
        register: (user: object) => {
            fetch("https://devjourney.elioooooo.fr/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(res => res.json())
            .then(
                (res) => {
                    setSession(res);
                    router.replace('/(app)');
                },
                (error) => {
                    console.error("Error in register:", error);
                }
            );
        },
        signOut: () => {
            setSession(null);
        },
        update: (user: object) => {
            fetch(`https://devjourney.elioooooo.fr/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(res => res.json())
            .then(
                (res) => {
                    setSession(res);
                },
                (error) => {
                    console.error("Error in update:", error);
                }
            );
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}