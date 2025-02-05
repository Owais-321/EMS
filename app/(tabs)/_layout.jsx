import React, { useEffect, useState } from 'react'
import {Tabs, useRouter} from "expo-router"
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./../../Configs/FirebaseConfig"

export default function TabLayout() {

  const router = useRouter();
  const [authenticated, SetAuthenticated] = useState(null);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        console.log(uid);
        SetAuthenticated(true);
        // ...
      } else {
        SetAuthenticated(false);
        // User is signed out
        // ...
      }
    });

    useEffect(() => {
      if(authenticated == false)
      {
        router.push('/login')
      }
    }, [authenticated])

  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
    }}>
    <Tabs.Screen name="home"
      options={{
        tabBarLabel:"Home",
        tabBarIcon:({color})=><Ionicons name="home" size={24} color={color}/>
      }}
    />
    <Tabs.Screen name="explore"
     options={{
      tabBarLabel:"Explore",
      tabBarIcon:({color})=><Ionicons name="search" size={24} color={color}/>
    }}
    />
    <Tabs.Screen name="profile"
     options={{
      tabBarLabel:"Profile",
      tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color}/>
    }}/>

   </Tabs>
  )
}