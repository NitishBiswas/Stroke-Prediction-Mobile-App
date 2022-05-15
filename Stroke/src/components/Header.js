import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import FontAewsome5 from 'react-native-vector-icons/FontAwesome5';

const Header = (props) => {
    return (
        <View style={styles.headerView}>
            <FontAewsome5 name={'bars'} size={28} color={'white'} style={styles.headerIcon} />
            <Text style={styles.headerText}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: '#070724',
        height: 40,
        width: '100%',
        borderBottomWidth: 0.8,
        borderBottomColor: 'white',
        flexDirection: 'row',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerIcon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
})

export default Header;
