import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Configs/FirebaseConfig';
import BusinessListItem from '../../components/BusinessList/BusinessListItem';
import { Colors } from '../../constants/Colors'

export default function BusinessListByCategory() {

    const navigation=useNavigation();
    const {category}=useLocalSearchParams();
    const [businessList, setbusinessList] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
      navigation.setOptions({
        headerShown:true,
        headerTitle:category
      });
      getBusinessList()
    }, [])
    
    // used to get business List by category 
    const getBusinessList=async()=>{
        setloading(true)
        setbusinessList([])
        const q=query(collection(db,"BusinessList"),where("category","==",category))
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setbusinessList(prev=>[...prev,{id:doc?.id, ... doc.data()}])
        })
        setloading(false)
    }
  return (
    <View>
      {businessList?.length>0&&loading==false?  <FlatList 
        data={businessList}
        onRefresh={getBusinessList}
        refreshing={loading}
        renderItem={({item,index})=>(
            <BusinessListItem 
            business={item}
            key={index}
            />
        )}
        />: 
        loading?<ActivityIndicator 
        style={{
            marginTop:"90%"
        }}
           size={"large"}
           color={Colors.PRIMARY}
        />:
        <Text style={{
            fontSize:20,
            fontFamily:"outfit-bold",
            color:Colors.GRAY,
            textAlign:"center",
            marginTop:"50%"
        }}>No Business found</Text>
    }
    </View>
  )
}