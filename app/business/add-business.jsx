import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, auth } from '../../Configs/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function AddBusiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setcategoryList] = useState([]);
    const [name, setname] = useState('');
    const [contact, setcontact] = useState('');
    const [address, setaddress] = useState('');
    const [website, setwebsite] = useState('');
    const [about, setabout] = useState('');
    const [category, setcategory] = useState('');
    const [photos, setphotos] = useState('');
    const [loading, setloading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Add New Business",
            headerShown: true,
        });
        GetCategoryList();

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        checkIfAllFieldsAreFilled();
    }, [name, contact, address, website, about, category, image, photos]); // Include pdfLink in dependency array

    const checkIfAllFieldsAreFilled = () => {
        if (name && contact && address && website && about && category && image && photos) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const GetCategoryList = async () => {
        setcategoryList([]);
        const q = query(collection(db, "Category"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setcategoryList((prev) => [
                ...prev,
                {
                    label: doc.data().name,
                    value: doc.data().name,
                },
            ]);
        });
    };

    const onAddNewBusiness = async () => {
        if (!user) {
            ToastAndroid.show("You must be logged in to add a business", ToastAndroid.LONG);
            return;
        }
    
        setloading(true);
        try {
            // Save business details including PDF link directly in Firestore without uploading to Firebase Storage
            await setDoc(doc(db, "BusinessList", Date.now().toString()), {
                name: name,
                address: address,
                contact: contact,
                about: about,
                website: website,
                category: category,
                username: user?.displayName || "Anonymous",
                userEmail: user?.email,
                userImage: user?.photoURL || '',
                imageUrl: image,  // Directly storing the selected image URL
                photos: photos, // Save PDF link to Firestore
            });
    
            ToastAndroid.show("New business added", ToastAndroid.LONG);
            resetFields();
        } catch (error) {
            console.error("Error adding business:", error);
            ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
        } finally {
            setloading(false);
        }
    };            

    const resetFields = () => {
        setname('');
        setcontact('');
        setaddress('');
        setwebsite('');
        setabout('');
        setcategory('');
        setImage(null);
        setphotos(''); // Reset the PDF link
        setIsButtonDisabled(true);
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>Add New Business</Text>
            <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>Fill all details in order to add new business</Text>

            <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
                {!image ? (
                    <Image source={require("../../assets/images/placeholder.png")} style={{ width: 100, height: 100 }} />
                ) : (
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                )}
            </TouchableOpacity>

            <View>
                {[{ value: name, setValue: setname, placeholder: "Name" },
                { value: address, setValue: setaddress, placeholder: "Address" },
                { value: contact, setValue: setcontact, placeholder: "Contact" },
                { value: website, setValue: setwebsite, placeholder: "Website" },
                { value: about, setValue: setabout, placeholder: "About", multiline: true, numberOfLines: 5 }].map((input, index) => (
                    <TextInput
                        key={index}
                        value={input.value}
                        onChangeText={input.setValue}
                        style={{ padding: 10, borderWidth: 1, borderRadius: 5, fontSize: 17, backgroundColor: "#fff", marginTop: 10, borderColor: Colors.PRIMARY, fontFamily: "outfit" }}
                        placeholder={input.placeholder}
                        multiline={input.multiline}
                        numberOfLines={input.numberOfLines}
                    />
                ))}
            </View>

            <View style={{ borderWidth: 1, borderRadius: 5, backgroundColor: "#fff", marginTop: 10, borderColor: Colors.PRIMARY }}>
                <RNPickerSelect value={category} onValueChange={setcategory} items={categoryList} />
            </View>

            <TextInput
                value={photos}
                onChangeText={setphotos}
                style={{ padding: 10, borderWidth: 1, borderRadius: 5, fontSize: 17, backgroundColor: "#fff", marginTop: 10, borderColor: Colors.PRIMARY, fontFamily: "outfit" }}
                placeholder="Upload PDF Link"
            />

            <TouchableOpacity disabled={isButtonDisabled} onPress={onAddNewBusiness} style={{ padding: 15, backgroundColor: isButtonDisabled ? Colors.GRAY : Colors.PRIMARY, borderRadius: 5, marginTop: 20, height: 50, justifyContent: 'center' }}>
                {loading ? <ActivityIndicator size={'large'} color={'#fff'} /> : <Text style={{ textAlign: "center", fontFamily: "outfit-medium", color: "#fff" }}>Add New Business</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
}
