import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../Configs/FirebaseConfig'
import CategoryItems from './CategoryItems'
import {useRouter} from "expo-router"

export default function Category({explore=false,onCategorySelect}) {
    
    const [CategoryList, setCategoryList] = useState([]);
    const router = useRouter();
    useEffect(() => {
     GetCategoryList()
    }, [])
    
    const GetCategoryList=async()=>{
        setCategoryList([]);
        const q=query(collection(db,"Category"));
        const querySnapshot =await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()])
        })
    }

    const onCategoryPressHandler=(item)=>{
      if(!explore){
        router.push("/businesslist/"+item.name)
      }
      else{
        onCategorySelect(item.name)
      }
    }
  return (
    <View>
       {!explore&& <View style={{
            padding:20,
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:10
        }}>
            <Text style={{
                fontSize:20,
                fontFamily:"outfit-bold"
            }} >Category</Text>
            <Text style={{color:Colors.PRIMARY,fontFamily:"outfit-medium"}}>View all</Text>
        </View>}

        <FlatList 
          data={CategoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft:20}}
          renderItem={({item,index})=>(
            <CategoryItems 
            category={item} 
            key={index} 
            onCategoryPress={(category)=>onCategoryPressHandler(item)}
            /> 
          )}
        />
    </View>
  )
}