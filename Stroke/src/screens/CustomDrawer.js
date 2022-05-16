/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const CustomDrawer = props => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.headerView}>
                    <Image style={styles.imageView} source={require('../images/doctor2.png')} />
                    <Text style={styles.headerText}>Stroke Prediction</Text>
                </View>
                <View style={styles.middleView}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <Text style={styles.footerView}>strokepredictionmachine@gmail.com</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070724',
    },
    headerView: {
        height: 260,
        marginBottom: 20,
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
    },
    imageView: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginBottom: 10,
    },
    footerView: {
        position: 'absolute',
        bottom: 15,
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        color: 'gray',
    },
    headerText: {
        fontSize: 28,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CustomDrawer;
