// Contact us screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';

import Header from '../components/Header';

const Contact = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');

    // Send mail
    const sendMail = () => {
        if (name === '' || email === '' || message === '' || phone === '') {
            Alert.alert('Error', 'Please fill all the fields');
        } else {
            Linking.openURL(`mailto:strokepredictionmachine@gmail.com?subject=${'Feedback from ' + name}&body=${message + '\n\n\n\n' + name + '\n\n' + email + '\n' + phone}`)
                .then(() => {
                    Alert.alert('Success', 'Your message has been sent');
                    setName('');
                    setEmail('');
                    setMessage('');
                    setPhone('');
                })
                .catch(() => {
                    Alert.alert('Error', 'Something went wrong');
                });
        }
    }

    return (
        <View style={styles.container}>
            <Header name="Contact Us" onPress={() => navigation.openDrawer()} />
            <View style={styles.content}>
                <Text style={styles.title}>Let's Get in Touch</Text>
                <View style={{ marginHorizontal: 50 }}>
                    <View style={styles.br} />
                </View>
                <Text style={styles.text}>
                    If you have any questions or concerns, please feel free to contact us.
                </Text>
                <ScrollView style={styles.formView}>
                    {/* Name Input Start */}
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput style={styles.inputView} value={name} placeholder="Enter Your Name" onChangeText={(text) => setName(text)} placeholderTextColor="gray" />
                    {/* Name Input End */}

                    {/* Email Input Start */}
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput style={styles.inputView} value={email} placeholder="Enter Your Email" onChangeText={(text) => setEmail(text)} placeholderTextColor="gray" keyboardType='email-address' />
                    {/* Email Input End */}

                    {/* Phone Input Start */}
                    <Text style={styles.inputTitle}>Phone</Text>
                    <TextInput style={styles.inputView} value={phone} placeholder="Enter Your Phone Number" onChangeText={(text) => setPhone(text)} placeholderTextColor="gray" keyboardType='number-pad' />
                    {/* Phone Input End */}

                    {/* Message Input Start */}
                    <Text style={styles.inputTitle}>Message</Text>
                    <TextInput style={styles.inputView} value={message} placeholder="Enter Your Message" onChangeText={(text) => setMessage(text)} placeholderTextColor="gray" textAlignVertical='top' multiline={true}
                        numberOfLines={3} />
                    {/* Message Input End */}

                    {/* Submit Button Start */}
                    <TouchableOpacity style={styles.btnView} onPress={() => sendMail()}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070724',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        // paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    br: {
        borderBottomWidth: 0.2,
        borderBottomColor: 'white',
        width: '100%',
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
        alignSelf: 'center',
        textAlign: 'center',
    },
    inputTitle: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
    },
    inputView: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        color: '#fff',
        fontSize: 20,
    },
    formView: {
        marginTop: 10,
    },
    btnView: {
        height: 40,
        width: '100%',
        borderRadius: 15,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#33FF26',
        marginBottom: 20,
    },
    btnText: {
        color: '#33FF26',
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default Contact;