import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import SignIn from '../sign-in';
export default function Layout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  // Handler user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;


  return (
  
    <GestureHandlerRootView className = "flex-1">
     {user ? <Drawer>
      <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: '',
          }}
        />
        <Drawer.Screen
          name="shop" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Shop',
            title: 'Shop',
          }}
        />
        <Drawer.Screen
          name="settings" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
          }}
        />
      </Drawer> : (<SignIn />
      )}
    </GestureHandlerRootView>
  );
}

