import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../Configs/FirebaseConfig';

export default function UserIntro() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        fullName: currentUser.displayName || "User",
        imageUrl: currentUser.photoURL || "https://via.placeholder.com/100", // Fallback image
        email: currentUser.email || "No email available",
      });
    }
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 99,
        }}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        {user?.fullName}
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
        {user?.email}
      </Text>
    </View>
  );
}