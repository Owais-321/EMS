import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { db } from '../../Configs/FirebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState('');
    const [user, setUser] = useState(null);
    
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const onSubmit = async () => {
        if (!user) {
            ToastAndroid.show("You must be logged in to submit a review", ToastAndroid.BOTTOM);
            return;
        }

        const docRef = doc(db, "BusinessList", business?.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.displayName || "Anonymous",
                userImage: user?.photoURL || '',
                userEmail: user?.email
            })
        });

        ToastAndroid.show("Comment added Successfully", ToastAndroid.BOTTOM);
        setUserInput(""); // Clear input after submission
    };

    return (
        <View style={{ padding: 20, backgroundColor: "#fff" }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>

            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder="Write your comment"
                    numberOfLines={4}
                    value={userInput}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: "top"
                    }}
                />

                <TouchableOpacity
                    disabled={!userInput}
                    onPress={onSubmit}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6,
                        marginTop: 10
                    }}>
                    <Text style={{
                        fontFamily: "outfit",
                        color: "#fff",
                        textAlign: "center"
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Display previous Reviews */}
            <View>
                {business?.reviews?.map((item, index) => (
                    <View key={index} style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        padding: 10,
                        borderWidth: 1,
                        borderColor: Colors.GRAY,
                        borderRadius: 15,
                        marginTop: 10
                    }}>
                        <Image source={{ uri: item.userImage }}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 99
                            }} />
                        <View style={{ display: "flex", gap: 3 }}>
                            <Text style={{ fontFamily: "outfit-medium" }}>{item.userName}</Text>
                            <Rating
                                imageSize={20}
                                ratingCount={item.rating}
                                style={{ alignItems: "flex-start" }}
                            />
                            <Text>{item.comment}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}