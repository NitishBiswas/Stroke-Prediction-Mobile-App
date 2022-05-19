import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';

function ListItem({ item, handledelete, onPress }) {
    const [show, setShow] = useState(true);
    const swip = () => {
        return (
            <View style={styles.delete}>
                <TouchableOpacity onPress={handledelete}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[styles.container, show ? null : { borderColor: 'tomato' }]}>
            <Swipeable
                onSwipeableOpen={() => setShow(false)}
                onSwipeableClose={() => setShow(true)}
                renderRightActions={swip}>
                <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
                    <View>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemSubText}>{item.date}</Text>
                    </View>
                    {show ? <AntDesign name="right" size={20} color="white" /> : null}
                </TouchableOpacity>
            </Swipeable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#070724',
        justifyContent: 'center',
    },
    delete: {
        width: 90,
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: 'tomato',
    },
    deleteText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    itemText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'justify',
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    itemSubText: {
        color: 'gray',
        fontSize: 16,
        paddingLeft: 10,
        paddingBottom: 5,
    },
});

export default ListItem;