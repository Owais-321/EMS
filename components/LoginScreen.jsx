import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../constants/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
WebBrowser.maybeCompleteAuthSession();



export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);



  return (
    <View>
      <View style={{
        display: "flex",
        alignItems:"center",
        position: "absolute"
      }}>
        <Image source={require("./../assets/images/login.png")}
          style={{
            width:430,
            height:900,
            borderRadius:5            
          }}
        />
      </View>

      <View style={{padding:15,marginTop: 460}}>
        <Text style={{
          fontSize:40,
          color: "#ffffff",
          fontFamily:"outfit-bold",
          textAlign:"center"
        }}>360° Event Management System Application
          </Text>
          <Text style={{fontSize:18,fontFamily:"outfit",textAlign:"center",marginVertical:15,color:"#ffffff"}}>Find your favorite business near your and post your own business to your community</Text>

          <TouchableOpacity style={{
            backgroundColor:Colors.PRIMARY,
            padding:15,
            borderRadius:99,
            marginTop:50
          }} onPress={onPress}>
            <Text style={{color:"#fff",textAlign:"center",fontFamily:"outfit",fontSize:17, fontWeight: "bold"}} >Let's Get Started</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  )
}