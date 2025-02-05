import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../Configs/FirebaseConfig';
import BusinessListItem from '../../components/Explore/BusinessListItem';
import { useNavigation } from 'expo-router';

export default function MyBusiness() {
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business',
        });

        if (user) {
            getUserBusiness();
        }
    }, [user]);

    const getUserBusiness = async () => {
        if (!user) return; // Ensure user is logged in

        try {
            setLoading(true);
            setBusinessList([]);

            const q = query(collection(db, 'BusinessList'), where('userEmail', '==', user.email));
            const querySnapshot = await getDocs(q);

            let businesses = [];
            querySnapshot.forEach((doc) => {
                businesses.push({ id: doc.id, ...doc.data() });
            });

            setBusinessList(businesses);
        } catch (error) {
            console.error('Error fetching user businesses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
                data={businessList}
                onRefresh={getUserBusiness}
                refreshing={loading}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <BusinessListItem business={item} />
                    </View>
                )}
                ListEmptyComponent={
                    !loading && <Text style={{ textAlign: 'center', marginTop: 20 }}>No businesses found.</Text>
                }
            />
        </View>
    );
}