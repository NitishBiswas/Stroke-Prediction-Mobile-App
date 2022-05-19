import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';


import Header from '../components/Header';

const Result = props => {
    const { item, key, predictedResults } = props.route.params;
    //remove item from local storage
    const deleteItem = async () => {
        //confirm delete
        Alert.alert(
            'Delete',
            'Do you want to delete this result?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        //filter data
                        const newData = predictedResults.filter((item) => predictedResults.indexOf(item) !== key);
                        try {
                            AsyncStorage.removeItem('PredictedResults');
                            if (newData.length > 0) {
                                AsyncStorage.setItem('PredictedResults', JSON.stringify(newData));
                            }
                            props.navigation.navigate('PredictedResults');
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    }

    const html = `
    <html lang="en">
        <body>
            <!-- Create a table -->
            <center>
                <div style="width: 50%; border: 1px solid black; padding: 20px;">
                <h2 style="color: #00138e;">Prediction Result of Stroke</h2>
                <h4 style="color: gray; line-height: 0cm;">Date</h4>
                <hr style="margin-bottom: 15px;"/>
            <table cellspacing="0" border="1" style="border-color: #00138e; width: 100%; ">
                <tbody>
                    <tr>
                        <td style="color: black; padding: 5px;">Name</td>
                        <td style="color: black; padding: 5px;">Otto</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Age</td>
                        <td style="color: black; padding: 5px;">Thornton</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Gender</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Married</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Work Type</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                    <td style="color: black; padding: 5px;">Smoking</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Residence Type</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Heart Disease</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Glucose Level</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">BMI</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                    <tr>
                        <td style="color: black; padding: 5px;">Hypertension</td>
                        <td style="color: black; padding: 5px;">the Bird</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <hr style="margin-bottom: 15px;">
            <h4 style="color: gray; line-height: 0cm;">Prediction Result</h4>
            <hr style="margin-bottom: 15px;">
            <h2 style="color: #00138e ;">don't worry,<br>You don't have any stroke!</h2>
            <hr style="margin-top: 15px;">
            </div>
            </center>
        </body>
    </html>
    `;

    const downloadPDF = () => {
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Pdf creator needs External Storage Write Permission',
                        message:
                            'Pdf creator needs access to Storage data in your SD Card',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    createPDF();
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            createPDF();
        }
    }
    const createPDF = async () => {
        let options = {
            //Content to print
            html: html,
            //File Name
            fileName: item.name + '_' + item.age,
            //File directory
            directory: 'Download',

            base64: true
        };

        let file = await RNHTMLtoPDF.convert(options)
        console.log(file.filePath);
        Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open', onPress: () => openFile(file.filePath) }
        ], { cancelable: true });

    }

    const openFile = (filepath) => {
        const path = filepath;// absolute-path-to-my-local-file.
        console.log("Hello", filepath);
        FileViewer.open(path)
            .then(() => {
                console.log('FileViewer opened')
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Header icon="angle-left" name="Result" onPress={() => props.navigation.goBack()} />
            <ScrollView style={styles.resultView}>
                <Text style={styles.patientName}>Predicted Result of Stroke</Text>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.br} />

                {/* Crerate table */}
                <View style={styles.table}>
                    <View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Name</Text>
                            <Text style={styles.tableRowValue}>{item.name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Age</Text>
                            <Text style={styles.tableRowValue}>{item.age}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Gender</Text>
                            <Text style={styles.tableRowValue}>{item.gender == 1 ? "Male" : item.gender == 0 ? "Female" : "Other"}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Married</Text>
                            <Text style={styles.tableRowValue}>{item.maritalStatus == 1 ? "Yes" : "No"}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Work Type</Text>
                            <Text style={styles.tableRowValue}>{item.workType == 0 ? "Government Job" : item.workType == 1 ? "Unemployed" : item.workType == 2 ? "Private Job" : item.workType == 3 ? "Self Employed" : "Children"}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Smoking</Text>
                            <Text style={styles.tableRowValue}>{item.smoking == 0 ? "Formerly Smoked" : item.smoking == 1 ? "Never Smoked" : item.smoking == 2 ? "Smokes" : "Unknown"}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Residence Type</Text>
                            <Text style={styles.tableRowValue}>{item.residenceType == 0 ? "Rural" : "Urban"}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Heart Disease</Text>
                            <Text style={styles.tableRowValue}>{item.heartDisease == 0 ? "No" : "Yes"}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Glucose Level</Text>
                            <Text style={styles.tableRowValue}>{item.glucose}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>BMI</Text>
                            <Text style={styles.tableRowValue}>{item.bmi}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>Hypertension</Text>
                            <Text style={styles.tableRowValue}>{item.hypertension == 0 ? "No" : "Yes"}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.result}>{item.result == 0 ? `${item.name} don't worry,\nYou don't have any stroke!` : `${item.name} please consult a doctor immediately!\nYou have stroke!`}</Text>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem()}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.printButton} onPress={() => downloadPDF()}>
                        <Text style={styles.printText}>Download</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070724',
        paddingHorizontal: 20,
    },
    resultView: {
        marginTop: 15,
        marginHorizontal: 10,
    },
    patientName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#c8e1ff',
        textAlign: 'center',
    },
    date: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    br: {
        borderBottomWidth: 0.8,
        borderBottomColor: 'gray',
        marginTop: 7,
        marginBottom: 20,
    },
    bodyText: {
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
    },
    tableText: {
        fontSize: 18,
        color: '#fff',
        padding: 8,
    },
    result: {
        fontSize: 20,
        color: '#c8e1ff',
        marginTop: 10,
        textAlign: 'center',
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: 'tomato',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '40%',
    },
    deleteText: {
        fontSize: 18,
        color: '#070724',
        textAlign: 'center',
        color: 'tomato',
    },
    printButton: {
        borderWidth: 1,
        borderColor: '#33FF26',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '40%',
    },
    printText: {
        fontSize: 18,
        color: '#070724',
        textAlign: 'center',
        color: '#33FF26',
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    table: {
        flexDirection: 'row',
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#c8e1ff',
    },
    tableRowTitle: {
        fontSize: 18,
        color: '#fff',
        padding: 8,
        width: '50%',
        paddingLeft: 10,
    },
    tableRowValue: {
        fontSize: 18,
        color: '#fff',
        padding: 8,
        width: '50%',
        borderLeftWidth: 1,
        borderLeftColor: '#c8e1ff',
        paddingLeft: 10,
    },


});

export default Result;