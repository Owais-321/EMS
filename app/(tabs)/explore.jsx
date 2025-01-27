import { View, Text,TextInput,Image } from 'react-native'
import React, { useState } from 'react'
import {Colors} from "./../../constants/Colors"
import { Ionicons } from '@expo/vector-icons';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';


export default function explore() {
  
  const [businesslist, setbusinesslist] = useState([])
  const GetBusinessByCategory=async(category)=>{
    setbusinesslist([])
    const q=query(collection(db,"BusinessList"),where("category","==",category))
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      setbusinesslist(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
  }

  return (
    <View style={{
      padding:20,
      marginTop:20
      
      }}>
      <Text style={{
        fontFamily:"outfit-bold",
        fontSize:30
      }}>Explore More</Text>
      {/* SearchBar  */}
      <View style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            gap:10,
            backgroundColor:"#fff",
            padding:10,
            marginVertical:10,
            marginTop:15,
            marginBottom:20,
            borderRadius:8,
            borderWidth:1,
            borderColor:Colors.PRIMARY
           }}>
           <Ionicons name="search" size={24} color={Colors.PRIMARY} />
           <TextInput placeholder='Search'/>
           </View>
      {/* Category  */}
      <Category explore={true} onCategorySelect={(category)=>GetBusinessByCategory(category)} />
      {/* Business List  */}
      <ExploreBusinessList businesslist={businesslist} />
    </View>
  )
}