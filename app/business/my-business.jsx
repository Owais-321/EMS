import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/clerk-expo"
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Configs/FirebaseConfig';
import BusinessListItem from "../../components/Explore/BusinessListItem"
import { useNavigation } from 'expo-router';
export default function MyBusiness() {
    const {user}=useUser();
    const [businessList, setbusinessList] = useState([])
    const [loading, setloading] = useState(false)
    const navigation=useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerShown:true,
            headerTitle:"My Business"
        })
    user&&getUserBusiness()
    }, [user])
    
    const getUserBusiness=async()=>{
        setloading(true)
        setbusinessList([])
        const q=query(collection(db,"BusinessList"),where("userEmail","==",user?.primaryEmailAddress?.emailAddress));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setbusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
        setloading(false)
    }
  return (
    <View style={{padding:20}}>
      <FlatList 
      data={businessList}
      onRefresh={getUserBusiness}
      refreshing={loading}
      renderItem={({item,index})=>(
        <View>
            <BusinessListItem business={item} key={index} />
        </View>
      )}
      />
    </View>
  )
}