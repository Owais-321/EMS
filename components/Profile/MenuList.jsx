import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from "./../../constants/Colors"
import { useRouter } from 'expo-router'
import { auth } from '../../Configs/FirebaseConfig';
import { signOut } from 'firebase/auth';
 
export default function MenuList() {
    const router=useRouter();

    const onMenuClick=(item)=>{
      router.push(item.path)
    }

    const MenuList =[
        {
            id:1,
            name:"Add Business",
            icon:require("../../assets/images/add.png"),
            path:"/business/add-business"
        },
        {
            id:2,
            name:"My Business",
            icon:require("../../assets/images/business-and-trade.png"),
            path:"/business/my-business"
        }
    ]

  return (
    <View style={{marginTop:50}}>
      <FlatList 
      data={MenuList}
      numColumns={2}
      renderItem={({item,index})=>(
        <TouchableOpacity
        onPress = {() => onMenuClick(item)} 
        style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            gap:10,
            flex:1,
            padding:10,
            borderRadius:15,
            borderWidth:1,
            margin:10,
            borderColor:Colors.PRIMARY
        }}>
            <Image source={item.icon}
            style={{
                width:50,
                height:50
            }} />
            <Text style={{fontFamily:"outfit-medium",fontSize:17,flex:1}}>{item.name}</Text>
            
        </TouchableOpacity>
      )}
      />

      <Text style={{
        fontFamily:"outfit",
        textAlign:"center",
        marginTop:50,
        color:Colors.GRAY
      }}>Developed By 360 EMS @2025</Text>

      <TouchableOpacity style={{
                          backgroundColor: Colors.PRIMARY,
                          padding: 18,
                          borderRadius: 10,
                          width: 250,
                          marginLeft: 65,
                          marginTop: 100,
                      }} onPress = {() => signOut(auth)}>
                          <Text style={{ color: "#fff", icon:require("./../../assets/images/logout.png"), textAlign: "center", fontFamily: "outfit", fontSize: 17, fontWeight: "bold" }} >Logout</Text>
      </TouchableOpacity>

    </View>

    
  )
}