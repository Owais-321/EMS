import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { db } from '../../Configs/FirebaseConfig';
import { doc, getDoc, query } from 'firebase/firestore';
import { Colors } from "../../constants/Colors";
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetails() {
  const {businessid}=useLocalSearchParams();
  const [business, setbusiness] = useState()
  const [loading, setloading] = useState(false)
  useEffect(() => {
   getBusinessDetailsById()
  }, [])
  
  const getBusinessDetailsById=async()=>{
    setloading(true)
    const docRef=doc(db,"BusinessList",businessid);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document Data : ",docSnap.data());
      setbusiness({id:docSnap.id,...docSnap.data()});
      setloading(false)
    }
    else{
      console.log("No such Document ");
      setloading(false)

    }
  }

  return (
    <ScrollView>
      {
        loading?
        <ActivityIndicator 
        style={{
          marginTop:"100%"
        }}
        size={"large"}
        color={Colors.PRIMARY}
        /> : 
        <View>
          {/* Intro  */}
        <Intro business={business} />
          {/* Action Buttons  */}
        <ActionButton business={business} />
          {/* About Section  */}
        <About business={business}  />

        {/* Reviews  */}
        <Reviews business={business} />
        </View>
      }
    </ScrollView>
  )
}