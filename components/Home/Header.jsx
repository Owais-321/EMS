import { View, Text, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../Configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          fullName: currentUser.displayName || "User",
          imageUrl: currentUser.photoURL || "https://via.placeholder.com/100", // Default image
        });
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 60,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />

        <View>
          <Text style={{ color: "#fff" }}>Welcome</Text>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 19,
              color: "#fff",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* Search Bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder="Search" />
      </View>
    </View>
  );
}