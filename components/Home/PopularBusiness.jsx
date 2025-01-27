import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../Configs/FirebaseConfig'
import PopularBusinessList from './PopularBusinessList'

export default function PopularBusiness() {

const [businessList, setBusinessList] = useState([])
useEffect(() => {
 GetBusinessList()
}, [])

const GetBusinessList=async()=>{
  setBusinessList([])
  const q=query(collection(db,"BusinessList"));
  const querySnapshot=await getDocs(q);

  querySnapshot.forEach((doc)=>{
    console.log(doc.data());
    setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
  })
}

  return (
    <View>
      <View style={{
            padding:20,
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:20
        }}>
            <Text style={{
                fontSize:20,
                fontFamily:"outfit-bold"
            }} >Popular Business</Text>
            <Text style={{color:Colors.PRIMARY,fontFamily:"outfit-medium"}}>View all</Text>
        </View>

        <FlatList 
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
          <PopularBusinessList 
          business={item}
          key={index}
          />
        )}
        />
    </View>
  )
}