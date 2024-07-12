
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { Slot } from "expo-router";

import "../global.css";
import { MyLightTheme } from '../utilities/themeOptions';    
import { useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const { colorScheme, setColorScheme} = useColorScheme ();
  useEffect(() => {
    const loadTheme = async () => {
      // await AsyncStorage.removeItem('theme');
      const stored = (await AsyncStorage.getItem("theme")) as ThemeOptions;
      if (stored) {
        setColorScheme(stored);
      } else {
        // Default to light if nothing or unexpected value is stored
        setColorScheme("light");
      }
    };

    loadTheme();
  }, [colorScheme]);
  
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : MyLightTheme}>
    <Slot />
    </ThemeProvider>
  );
}
