import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header name="Home" />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.bodyTitle}>What is Stroke ?</Text>
                <Text style={styles.bodyText}>A stroke is a serious life-threatening medical condition that happens when the blood supply to part of the brain is cut off. Strokes are a medical emergency and urgent treatment is essential. The sooner a person receives treatment for a stroke, the less damage is likely to happen.</Text>

                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.btnText}>Predict</Text>
                </TouchableOpacity>

                <Image resizeMode='contain' source={require('../images/banner.png')} style={styles.bannerImage} />

                <View style={styles.cardView}>
                    <Image resizeMode='contain' source={require('../images/predict.png')} style={styles.cardImage} />
                    <Text style={styles.bodyTitle}>What is prediction and how is it achieved?</Text>
                    <Text style={styles.bodyText}>“Prediction” refers to the output of an algorithm after it has been trained on a historical dataset and applied to new data when forecasting the likelihood of a particular outcome.</Text>
                </View>
                <View style={styles.cardView}>
                    <Image resizeMode='contain' source={require('../images/group.png')} style={styles.cardImage} />
                    <Text style={styles.bodyTitle}>Who is Predict for?</Text>
                    <Text style={styles.bodyText}>Predict is for clinicians, patients and their families. Patients should use it in consultation with a medical professional.</Text>
                </View>
                <View style={styles.cardView}>
                    <Image resizeMode='contain' source={require('../images/stroke.png')} style={styles.cardImage} />
                    <Text style={styles.bodyTitle}>Can a person have a stroke and not know it?</Text>
                    <Text style={styles.bodyText}>Some people have strokes without realizing it. They're called silent strokes, and they either have no easy-to-recognize symptoms, or you don't remember them. But they can predict stroke from this machine.</Text>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#070724',
        paddingHorizontal: 10,
        flex: 1
    },
    bodyTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    bodyText: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'justify',
    },
    btnView: {
        backgroundColor: '#070724',
        height: 40,
        width: '100%',
        borderRadius: 5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    bannerImage: {
        width: '100%',
        height: 250,
        marginTop: 10,
    },
    cardView: {
        backgroundColor: '#070724',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        // marginBottom: 100,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    scrollView: {
        flex: 1,
    }
})

export default HomeScreen;
