import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Configs/FirebaseConfig"; // Ensure correct Firebase config path

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useFonts({
    "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf")
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        router.replace("/login"); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
    </Stack>
  );
}