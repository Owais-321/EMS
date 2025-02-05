import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function loginScreen() {

    const router = useRouter();

    return (
        <View>
            <View style={{
                display: "flex",
                alignItems: "center",
                position: "absolute"
            }}>
                <Image source={require("../../assets/images/login.png")}
                    style={{
                        width: 430,
                        height: 900,
                        borderRadius: 5
                    }}
                />
            </View>

            <View style={{ padding: 15, marginTop: 460 }}>
                <Text style={{
                    fontSize: 40,
                    color: "#ffffff",
                    fontFamily: "outfit-bold",
                    textAlign: "center"
                }}>360° Event Management System Application
                </Text>
                <Text style={{ fontSize: 18, fontFamily: "outfit", textAlign: "center", marginVertical: 15, color: "#ffffff" }}>Find your favorite business near your and post your own business to your community</Text>

                <TouchableOpacity style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 15,
                    borderRadius: 99,
                    marginTop: 50
                }} onPress={() => router.push('login/signIn')}>
                    <Text style={{ color: "#fff", textAlign: "center", fontFamily: "outfit", fontSize: 17, fontWeight: "bold" }} >Let's Get Started</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}