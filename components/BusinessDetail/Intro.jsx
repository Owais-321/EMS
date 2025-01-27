import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
export default function Intro({business}) {
    const router=useRouter()
    const {user} = useUser()
    const onDelete=()=>{
      Alert.alert("Do You want to delete?","Do You really want to delete this business?",[
        
        {
          text:"Cancel",
          style:"cancel"
        },{
          text:"Delete",
          style:"destructive",
          onPress:()=>deleteBusiness()
        }

      ])
    }

    const deleteBusiness=async()=>{
      console.log("Delete Business");
      await deleteDoc(doc(db,"BusinessList",business?.id))
      router.back()
      ToastAndroid.show("Business Deleted!",ToastAndroid.LONG)
    }
  return (
    <View>
        <View style={{
            position:"absolute",
            zIndex:10,
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between", 
            width:"100%",
            padding:30
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Ionicons name="arrow-back-circle" size={35} color="white" />
            </TouchableOpacity>
        <Ionicons name="heart-outline" size={30} color="white" />
        </View>
      <Image source={{uri:business?.imageUrl}}
      style={{
        width:"100%",
        height:340
      }}
      />

      <View style={{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        padding:20,
          marginTop:-20,
          backgroundColor:"#fff",
          borderTopLeftRadius:25,
          borderTopRightRadius:25
      }}>
        <View style={{
          padding:20,
          marginTop:-20,
          backgroundColor:"#fff",
          borderTopLeftRadius:25,
          borderTopRightRadius:25
        }}>
        <Text style={{
              fontFamily:"outfit-bold",
              fontSize:24,
          }}>{business?.name}

          </Text>
      
          <Text style={{
            fontFamily:"outfit",
            fontSize:17,
            color:Colors.GRAY,
          }}>{business?.address}</Text>
        </View>

        {user?.primaryEmailAddress?.emailAddress==business?.userEmail&& <TouchableOpacity onPress={()=>onDelete()}>
        <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>}
      </View>
    </View>
  )
}