/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


import Header from '../components/Header';
import ListItem from '../components/ListItem';

const PredictedResults = props => {
    const [predictedResults, setPredictedResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const isFocused = useIsFocused();

    //remove item from local storage
    const deleteItem = async (key) => {
        //filter data
        const newData = predictedResults.filter((item) => predictedResults.indexOf(item) !== key);
        try {
            await AsyncStorage.removeItem('PredictedResults');
            if (newData.length > 0) {
                await AsyncStorage.setItem('PredictedResults', JSON.stringify(newData));
            }
            getData();
        } catch (error) {
            console.log(error);
        }
    }

    const deletAll = async () => {
        //confirm delete
        Alert.alert(
            'Delete All',
            'Do you want to delete all the data?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        setLoading(true);
                        AsyncStorage.removeItem('PredictedResults');
                        setLoading(false);
                        getData();
                    },
                },
            ],
            { cancelable: false },
        );
    }

    //get data from local storage
    const getData = async () => {
        setLoading(true);
        try {
            const data = await AsyncStorage.getItem('PredictedResults');
            if (data !== null) {
                setPredictedResults(JSON.parse(data));
                setLoading(false);
                setEmpty(false);
            } else {
                setLoading(false);
                setEmpty(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [isFocused]);

    const onPress = (item) => {
        props.navigation.navigate('Result', { item, key: predictedResults.indexOf(item), predictedResults });
    }

    return (
        <View style={styles.container}>
            <Header name="Predicted Results" onPress={() => props.navigation.openDrawer()} />
            {loading ? <ActivityIndicator style={styles.emptyTextView} size="large" color="tomato" /> : empty ? <View style={styles.emptyTextView}><Text style={styles.emptyText}>No Predicted Results</Text></View> :
                <View style={styles.list}>
                    <FlatList
                        data={predictedResults}
                        renderItem={({ item, index }) =>
                            <ListItem item={item} handledelete={() => deleteItem(index)} onPress={onPress} />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        marginTop={10}
                        style={styles.listView}
                    />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deletAll()}>
                        <Text style={styles.deleteText}>Delete All</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070724',
        paddingHorizontal: 20,
    },
    bodyTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#070724',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'justify',
    },
    emptyText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'justify',
    },
    emptyTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: 'tomato',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    deleteText: {
        fontSize: 18,
        color: '#070724',
        textAlign: 'center',
        color: 'tomato',
    },
    list: {
        flex: 1,
    },
    listView: {
        flex: 1,
        paddingBottom: 20,
    },
});

export default PredictedResults;
