import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';

const Predict = ({ navigation }) => {
    //loading state
    const [loading, setLoading] = useState(false);
    //modal state
    const [modalVisible, setModalVisible] = useState(false);

    const [age, setAge] = useState('');
    const [glucose, setGlucose] = useState('');
    const [bmi, setBMI] = useState('');
    const [name, setName] = useState('');

    // gender state
    const [genderOpen, setGenderOpen] = useState(false);
    const [genderValue, setGenderValue] = useState(null);
    const [genderItems, setGenderItems] = useState([
        { label: 'Male', value: '1' },
        { label: 'Female', value: '0' },
        { label: 'Other', value: '2' }
    ]);
    // hypertension state
    const [hypertensionOpen, setHypertensionOpen] = useState(false);
    const [hypertensionValue, setHypertensionValue] = useState(null);
    const [hypertensionItems, setHypertensionItems] = useState([
        { label: 'Yes', value: '1' },
        { label: 'No', value: '0' },
    ]);
    // heart disease state
    const [heartDiseaseOpen, setHeartDiseaseOpen] = useState(false);
    const [heartDiseaseValue, setHeartDiseaseValue] = useState(null);
    const [heartDiseaseItems, setHeartDiseaseItems] = useState([
        { label: 'Yes', value: '1' },
        { label: 'No', value: '0' },
    ]);
    // marital status state
    const [maritalStatusOpen, setMaritalStatusOpen] = useState(false);
    const [maritalStatusValue, setMaritalStatusValue] = useState(null);
    const [maritalStatusItems, setMaritalStatusItems] = useState([
        { label: 'Yes', value: '1' },
        { label: 'No', value: '0' },
    ]);
    //work type state
    const [workTypeOpen, setWorkTypeOpen] = useState(false);
    const [workTypeValue, setWorkTypeValue] = useState(null);
    const [workTypeItems, setWorkTypeItems] = useState([
        { label: 'Self Employed', value: '3' },
        { label: 'Private Job', value: '2' },
        { label: 'Children', value: '4' },
        { label: 'Government Job', value: '0' },
        { label: 'Never Worked', value: '1' },
    ]);
    //residence type state
    const [residenceTypeOpen, setResidenceTypeOpen] = useState(false);
    const [residenceTypeValue, setResidenceTypeValue] = useState(null);
    const [residenceTypeItems, setResidenceTypeItems] = useState([
        { label: 'Rural', value: '0' },
        { label: 'Urban', value: '1' },
    ]);
    //smoking state
    const [smokingOpen, setSmokingOpen] = useState(false);
    const [smokingValue, setSmokingValue] = useState(null);
    const [smokingItems, setSmokingItems] = useState([
        { label: 'Never Smoked', value: '1' },
        { label: 'Formerly Smoked', value: '0' },
        { label: 'Smokes', value: '2' },
        { label: 'Unknown', value: '3' },
    ]);

    //store data in local storage
    const storeData = async (data) => {
        try {
            //marge data with current data
            const currentData = await AsyncStorage.getItem('PredictedResults');
            const newData = currentData ? JSON.parse(currentData) : [];
            newData.push(data);
            await AsyncStorage.setItem('PredictedResults', JSON.stringify(newData));
        } catch (error) {
            console.log(error);
        }
    }

    const predictResult = () => {
        setLoading(true);
        if (age === '' || glucose === '' || bmi === '' || genderValue === null || hypertensionValue === null || heartDiseaseValue === null || maritalStatusValue === null || workTypeValue === null || residenceTypeValue === null || smokingValue === null) {
            setLoading(false);
            Alert.alert(
                "Warning",
                "Please fill all the fields!",
                [
                    {
                        text: "Ok",
                        style: "default",
                    },
                ],
                {
                    cancelable: true,
                }
            );
        } else {
            let formData = new FormData();
            formData.append('gender', genderValue);
            formData.append('age', age);
            formData.append('hypertension', hypertensionValue);
            formData.append('heart_disease', heartDiseaseValue);
            formData.append('married', maritalStatusValue);
            formData.append('work', workTypeValue);
            formData.append('residence', residenceTypeValue);
            formData.append('glucose', glucose);
            formData.append('bmi', bmi);
            formData.append('smoking', smokingValue);
            fetch('https://stroke-prediction-app-api.herokuapp.com/result', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    //current date and time
                    let date = new Date().toLocaleString();

                    // send data to local storage

                    const data = {
                        age: age,
                        glucose: glucose,
                        bmi: bmi,
                        name: name,
                        gender: genderValue,
                        hypertension: hypertensionValue,
                        heartDisease: heartDiseaseValue,
                        maritalStatus: maritalStatusValue,
                        workType: workTypeValue,
                        residenceType: residenceTypeValue,
                        smoking: smokingValue,
                        result: res.prediction,
                        date: date
                    }

                    storeData(data);

                    setAge("");
                    setGlucose("");
                    setBMI("");
                    setGenderValue(null);
                    setHypertensionValue(null);
                    setHeartDiseaseValue(null);
                    setMaritalStatusValue(null);
                    setWorkTypeValue(null);
                    setResidenceTypeValue(null);
                    setSmokingValue(null);
                    setLoading(false);
                    if (res.prediction === '1') {
                        Alert.alert(
                            name,
                            "Please consult a doctor immediately!\nYou have stroke!",
                            [
                                {
                                    text: "Ok",
                                    style: "default",
                                },
                            ],
                            {
                                cancelable: true,
                            }
                        );
                    } else {
                        Alert.alert(
                            name,
                            "Don't worry,\nYou don't have any stroke!",
                            [
                                {
                                    text: "Ok",
                                    style: "default",
                                },
                            ],
                            {
                                cancelable: true,
                            }
                        );
                    }
                    setName('');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    return (
        <View style={styles.container}>
            <Header name="Predict Tool" onPress={() => navigation.openDrawer()} />
            {/* <Text style={styles.bodyTitle}>Fill This Form to Predict Stroke</Text> */}

            <ScrollView style={styles.formView}>
                {/* Name Input Start */}
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput style={styles.inputView} value={name} placeholder="Enter Your Name" onChangeText={(text) => setName(text)} placeholderTextColor="gray" />
                {/* Name Input End */}

                {/* Age Input Start */}
                <Text style={styles.inputTitle}>Age</Text>
                <TextInput style={styles.inputView} value={age} placeholder="Enter age" onChangeText={(text) => setAge(text)} placeholderTextColor="gray" keyboardType='number-pad' />
                {/* Age Input End */}

                {/* Glucose Input Start */}
                <Text style={styles.inputTitle}>Average Glucose Level</Text>
                <TextInput style={styles.inputView} value={glucose} placeholder="Enter average glucose level" onChangeText={(text) => setGlucose(text)} placeholderTextColor="gray" keyboardType='number-pad' />
                {/* Glucose Input End */}

                {/* BMI Input Start */}
                <Text style={styles.inputTitle}>Body Mass Index (BMI)</Text>
                <TextInput style={styles.inputView} value={bmi} placeholder="Enter body mass index (BMI)" onChangeText={(text) => setBMI(text)} placeholderTextColor="gray" keyboardType='number-pad' />
                {/* BMI Input End */}

                {/* Gender Input Start */}
                <Text style={styles.inputTitle}>Gender</Text>
                <DropDownPicker
                    open={genderOpen}
                    value={genderValue}
                    items={genderItems}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    setItems={setGenderItems}
                    style={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                    textStyle={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    labelStyle={{
                        backgroundColor: "#070724",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                    }}
                    arrowIconStyle={{
                        tintColor: 'white',
                    }}
                    tickIconStyle={{
                        tintColor: 'white',
                    }}
                    placeholder="Select Gender"
                    listMode="SCROLLVIEW"
                    itemSeparator={true}
                    itemSeparatorStyle={{
                        backgroundColor: '#233',
                        marginHorizontal: 10,
                    }}
                    placeholderStyle={{
                        color: 'gray',
                    }}
                    zIndex={10}
                />
                {/* Gender Input End */}

                {/* Hypertension Input Start */}
                <Text style={styles.inputTitle}>Hypertension</Text>
                <DropDownPicker
                    open={hypertensionOpen}
                    value={hypertensionValue}
                    items={hypertensionItems}
                    setOpen={setHypertensionOpen}
                    setValue={setHypertensionValue}
                    setItems={setHypertensionItems}
                    style={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                    textStyle={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    labelStyle={{
                        backgroundColor: "#070724",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                    }}
                    arrowIconStyle={{
                        tintColor: 'white',
                    }}
                    tickIconStyle={{
                        tintColor: 'white',
                    }}
                    placeholder="Select Hypertension"
                    listMode="SCROLLVIEW"
                    itemSeparator={true}
                    itemSeparatorStyle={{
                        backgroundColor: '#233',
                        marginHorizontal: 10,
                    }}
                    placeholderStyle={{
                        color: 'gray',
                    }}
                    zIndex={9}
                />
                {/* Hypertension Input End */}

                {/* Heart Disease Input Start */}
                <Text style={styles.inputTitle}>Heart Disease</Text>
                <DropDownPicker
                    open={heartDiseaseOpen}
                    value={heartDiseaseValue}
                    items={heartDiseaseItems}
                    setOpen={setHeartDiseaseOpen}
                    setValue={setHeartDiseaseValue}
                    setItems={setHeartDiseaseItems}
                    style={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                    textStyle={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    labelStyle={{
                        backgroundColor: "#070724",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                    }}
                    arrowIconStyle={{
                        tintColor: 'white',
                    }}
                    tickIconStyle={{
                        tintColor: 'white',
                    }}
                    placeholder="Select Heart Disease"
                    listMode="SCROLLVIEW"
                    itemSeparator={true}
                    itemSeparatorStyle={{
                        backgroundColor: '#233',
                        marginHorizontal: 10,
                    }}
                    placeholderStyle={{
                        color: 'gray',
                    }}
                    zIndex={8}
                />
                {/* Heart Disease Input End */}

                {/* Marital Status Input Start */}
                <Text style={styles.inputTitle}>Marital Status</Text>
                <DropDownPicker
                    open={maritalStatusOpen}
                    value={maritalStatusValue}
                    items={maritalStatusItems}
                    setOpen={setMaritalStatusOpen}
                    setValue={setMaritalStatusValue}
                    setItems={setMaritalStatusItems}
                    style={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                    textStyle={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    labelStyle={{
                        backgroundColor: "#070724",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                    }}
                    arrowIconStyle={{
                        tintColor: 'white',
                    }}
                    tickIconStyle={{
                        tintColor: 'white',
                    }}
                    placeholder="Select Marital Status"
                    listMode="SCROLLVIEW"
                    itemSeparator={true}
                    itemSeparatorStyle={{
                        backgroundColor: '#233',
                        marginHorizontal: 10,
                    }}
                    placeholderStyle={{
                        color: 'gray',
                    }}
                    zIndex={7}
                />
                {/* Marital Status Input End */}

                {/* Work Type Input Start */}
                <Text style={styles.inputTitle}>Work Type</Text>
                <DropDownPicker
                    open={workTypeOpen}
                    value={workTypeValue}
                    items={workTypeItems}
                    setOpen={setWorkTypeOpen}
                    setValue={setWorkTypeValue}
                    setItems={setWorkTypeItems}
                    style={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                    textStyle={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    labelStyle={{
                        backgroundColor: "#070724",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                    }}
                    arrowIconStyle={{
                        tintColor: 'white',
                    }}
                    tickIconStyle={{
                        tintColor: 'white',
                    }}
                    placeholder="Select Work Type"
                    listMode="SCROLLVIEW"
                    itemSeparator={true}
                    itemSeparatorStyle={{
                        backgroundColor: '#233',
                        marginHorizontal: 10,
                    }}
                    placeholderStyle={{
                        color: 'gray',
                    }}
                    zIndex={6}
                />
                {/* Work Type Input End */}

                {/* Residence Type Input Start */}
                <Text style={styles.inputTitle}>Residence Type</Text>
                <DropDownPicker
                    open={residenceTypeOpen}
                    value={residenceTypeValue}
                    items={residenceTypeItems}
                    setOpen={setResidenceTypeOpen}
                    setValue={setResidenceTypeValue}
                    setItems={setResidenceTypeItems}
                    style={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                    textStyle={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    labelStyle={{
                        backgroundColor: "#070724",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                    }}
                    arrowIconStyle={{
                        tintColor: 'white',
                    }}
                    tickIconStyle={{
                        tintColor: 'white',
                    }}
                    placeholder="Select Residence Type"
                    listMode="SCROLLVIEW"
                    itemSeparator={true}
                    itemSeparatorStyle={{
                        backgroundColor: '#233',
                        marginHorizontal: 10,
                    }}
                    placeholderStyle={{
                        color: 'gray',
                    }}
                    zIndex={5}
                />
                {/* Residence Type Input End */}

                {/* Smoking Input Start */}
                <Text style={styles.inputTitle}>Smoking Status</Text>
                <DropDownPicker
                    open={smokingOpen}
                    value={smokingValue}
                    items={smokingItems}
                    setOpen={setSmokingOpen}
                    setValue={setSmokingValue}
                    setItems={setSmokingItems}
                    style={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                        marginBottom: 10,
                    }}
                    textStyle={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    labelStyle={{
                        backgroundColor: "#070724",
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#070724",
                        borderWidth: 1,
                        borderColor: 'white',
                        marginTop: 15,
                    }}
                    arrowIconStyle={{
                        tintColor: 'white',
                    }}
                    tickIconStyle={{
                        tintColor: 'white',
                    }}
                    placeholder="Select Smoking Status"
                    listMode="SCROLLVIEW"
                    itemSeparator={true}
                    itemSeparatorStyle={{
                        backgroundColor: '#233',
                        marginHorizontal: 10,
                    }}
                    placeholderStyle={{
                        color: 'gray',
                    }}
                    zIndex={4}
                />
                {/* Smoking Input End */}


                {loading ? (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={loading}
                    >
                        <ActivityIndicator size="large" color="tomato" />
                    </Modal>
                ) : (
                    <TouchableOpacity style={styles.btnView} onPress={() => predictResult()}>
                        <Text style={styles.btnText}>Predict</Text>
                    </TouchableOpacity>)}

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#070724',
        paddingHorizontal: 20,
        flex: 1
    },
    bodyTitle: {
        color: '#fff',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
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
        marginHorizontal: 10,
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

export default Predict;