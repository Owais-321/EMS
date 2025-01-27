import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function CategoryItems({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{
            padding:15,
            backgroundColor:Colors.ICON_BG,
            borderRadius:99,
            marginRight:10,

        }}>
            <Image source={{uri:category.icon}}
            style={{
                width:40,
                height:40,
            }} />
        </View>
        <Text style={{
            fontFamily:"outfit-medium",
            fontSize:12,
            textAlign:"center",
            marginTop:5
        }}>{category.name}</Text>
    </TouchableOpacity>
  )
}