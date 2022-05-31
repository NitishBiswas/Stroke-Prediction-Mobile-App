import LottieView from 'lottie-react-native';
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.replace('HomeSplash')
    }, 2000);

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <LottieView source={require('../images/welcome2.json')} autoPlay loop />
            </View>

            <View style={styles.content}>
                <Image resizeMode='contain' source={require('../images/doctor2.png')} style={styles.logoImage} />
                <Text style={styles.title}>Stroke Prediction</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070724',
    },
    welcome: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    logoImage: {
        width: '100%',
        height: 200,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
})

export default SplashScreen
