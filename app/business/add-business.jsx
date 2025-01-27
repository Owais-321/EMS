import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from "../../Configs/FirebaseConfig"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from "@clerk/clerk-expo"

export default function AddBusiness() {
    const { user } = useUser()
    const navigation = useNavigation();
    const [image, setImage] = useState(null)
    const [categoryList, setcategoryList] = useState([])
    const [name, setname] = useState('')
    const [contact, setcontact] = useState('')
    const [address, setaddress] = useState('')
    const [website, setwebsite] = useState('')
    const [about, setabout] = useState('')
    const [category, setcategory] = useState('')
    const [loading, setloading] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add New Business",
            headerShown: true
        })
        GetCategoryList()
    }, [])

    useEffect(() => {
        checkIfAllFieldsAreFilled()
    }, [name, contact, address, website, about, category, image])

    const checkIfAllFieldsAreFilled = () => {
        if (name && contact && address && website && about && category && image) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        setImage(result?.assets[0].uri)
        console.log(result);
    }

    const GetCategoryList = async () => {
        setcategoryList([])
        const q = query(collection(db, "Category"))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setcategoryList(prev => [...prev, {
                label: (doc.data()).name,
                value: (doc.data()).name
            }])
        })
    }

    const onAddNewBusiness = async () => {
        setloading(true)
        const fileName = Date.now().toString() + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();

        const imageRef = ref(storage, "business-app/" + fileName)

        uploadBytes(imageRef, blob).then((snapshot) => {
            console.log("file uploaded....");
        }).then(resp => {
            getDownloadURL(imageRef).then(async (downloadUrl) => {
                console.log(downloadUrl);
                saveBusinessDetail(downloadUrl)
            })
        })
    }

    const saveBusinessDetail = async (imageUrl) => {
        await setDoc(doc(db, "BusinessList", Date.now().toString()), {
            name: name,
            address: address,
            contact: contact,
            about: about,
            website: website,
            category: category,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrl: imageUrl
        })
        setloading(false)
        ToastAndroid.show("New business added", ToastAndroid.LONG)
        resetFields()
    }

    const resetFields = () => {
        setname('')
        setcontact('')
        setaddress('')
        setwebsite('')
        setabout('')
        setcategory('')
        setImage(null)
        setIsButtonDisabled(true)
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{
                fontFamily: "outfit-bold",
                fontSize: 25
            }}>Add New Business</Text>
            <Text style={{ fontFamily: "outfit", color: Colors.GRAY
            }}>Fill all details in order to add new business</Text>

            <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => onImagePick()}
            >
                {!image ? <Image source={require("../../assets/images/placeholder.png")}
                    style={{
                        width: 100,
                        height: 100
                    }} /> :
                    <Image source={{ uri: image }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 15
                        }} />
                }
            </TouchableOpacity>

            <View >
                <TextInput
                    value={name}
                    onChangeText={(v) => setname(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: "#fff",
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: "outfit"
                    }}
                    placeholder='Name'
                />

                <TextInput
                    value={address}
                    onChangeText={(v) => setaddress(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: "#fff",
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: "outfit"
                    }}
                    placeholder='Address'
                />

                <TextInput
                    value={contact}
                    onChangeText={(v) => setcontact(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: "#fff",
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: "outfit"
                    }}
                    placeholder='Contact'
                />

                <TextInput
                    value={website}
                    onChangeText={(v) => setwebsite(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: "#fff",
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: "outfit"
                    }}
                    placeholder='Website'
                />

                <TextInput
                    value={about}
                    onChangeText={(v) => setabout(v)}
                    multiline
                    numberOfLines={5}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: "#fff",
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: "outfit",
                        height: 100
                    }}
                    placeholder='About'
                />
            </View>

            <View style={{
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginTop: 10,
                borderColor: Colors.PRIMARY,
                fontFamily: "outfit",
            }}>
                <RNPickerSelect
                    value={category}
                    onValueChange={(value) => setcategory(value)}
                    items={categoryList}
                />
            </View>

            <TouchableOpacity
                disabled={isButtonDisabled}
                onPress={() => onAddNewBusiness()}
                style={{
                    padding: 15,
                    backgroundColor: isButtonDisabled ? Colors.GRAY : Colors.PRIMARY,
                    borderRadius: 5,
                    marginTop: 20,
                    height: 50, // Fixed height
                    justifyContent: 'center' // Center the content
                }}>
                {loading ?
                    <ActivityIndicator
                        size={'large'}
                        color={"#fff"}
                    /> :
                    <Text style={{
                        textAlign: "center",
                        fontFamily: "outfit-medium",
                        color: "#fff"
                    }}>Add New Business</Text>}
            </TouchableOpacity>
        </ScrollView>
    )
}
