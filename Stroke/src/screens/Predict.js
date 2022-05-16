import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header';

const Predict = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header name="Predict" onPress={() => navigation.openDrawer()} />
            <Text>Predict</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#070724',
        paddingHorizontal: 10,
        flex: 1
    },
})

export default Predict;