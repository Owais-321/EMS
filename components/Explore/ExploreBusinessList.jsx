import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BusinessListItem from './BusinessListItem'

export default function ExploreBusinessList({businesslist}) {
  return (
    <ScrollView>
   <FlatList
      data={businesslist}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>(
            <BusinessListItem
            key={index}
            business={item}
            /> 
      )}
      />
      <View style={{
        height:100
      }}> 

      </View>
    </ScrollView>
  )
}