import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { User } from '../../models/user/user';
import { userService } from '../../services/user-service';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import * as ImagePicker from "react-native-image-picker";
import Icon from 'react-native-vector-icons/FontAwesome';

const optionsImage: ImagePicker.CameraOptions = {
    maxHeight: 200,
    maxWidth: 200,
    mediaType: 'photo',
    includeBase64: true,
};

const optionsGalery: ImagePicker.CameraOptions = {
    maxHeight: 200,
    maxWidth: 200,
    mediaType: 'photo',
    includeBase64: true,
};

export const UserDetailScreen = (props: any) => {
    const { navigate } = useNavigation();
    const [image, setImage] = useState<any>(null);

    const [user, setUser] = useState<User>({
        id: undefined,
        name: '',
        birthDate: new Date(),
        file: ''
    });

    useEffect(() => {
        if (props.navigation.state.params?.userId != null)
            getUserById(props.navigation.state.params.userId);
    }, []);

    const getUserById = async (userId:number) => {
        try {
            const initialUser = await userService().getById(userId);
            initialUser.data.birthDate = new Date(initialUser.data.birthDate);
            setUser(initialUser.data);
        } catch (e) {
        }
    }

    const createUser = async (user: User) => {
        try {
            await userService().save(user);
            navigate("UserList");
            Alert.alert('Success', 'Usuário criado com sucesso.');
        } catch (e) {
            Alert.alert('Error', 'Erro ao criar usuário');
        }
    };

    const updateUser = async (user: User) => {
        try {
            await userService().update(user);
            navigate("UserList");
            Alert.alert('Success', 'Usuário atualizado com sucesso.');
        } catch (e) {
            Alert.alert('Error', 'Erro ao atualizar usuário.');
        }
    };

    const handleSaveUser = () => {
        if (user.id != null) {
            return updateUser(user);
        }
        createUser(user);
    };

    const requestCameraPermission = async (option: string) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                switch (option) {
                    case 'launchCamera':
                        launchCamera();
                        break;
                    case 'launchImageLibrary': launchImageLibrary();
                        break;
                    default:
                        break;
                }
            }
        } catch (err) {
        }
    };
    const launchCamera = () => ImagePicker.launchCamera(optionsImage, setImage);

    const launchImageLibrary = () => ImagePicker.launchImageLibrary(optionsGalery, setImage);

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    defaultValue={user.name}
                    onChangeText={(name) => setUser((oldUser) => ({ ...oldUser, name: name }))}
                    returnKeyType="next"
                    maxLength={255}
                    blurOnSubmit={false}
                />
            </View>
            <View>
                <Text style={styles.label}>Data de aniversário</Text>
                <DatePicker
                    style={{ width: '100%' }}
                    date={user.birthDate}
                    mode="date"
                    format="DD/MM/YYYY"
                    maxDate={new Date()}
                    confirmBtnText="Confirma"
                    cancelBtnText="Cancelar"
                    customStyles={{
                        dateIcon: {
                            display: 'none'
                        },
                        dateInput: {
                            ...styles.input,
                            borderColor: 'black',
                            alignItems: "flex-start"
                        },
                        dateText: {
                            fontSize: 20,
                        }
                    }}
                    onDateChange={(date) => {
                        setUser({ ...user, birthDate: moment(date, 'DD/MM/YYYY').toDate() });
                    }}
                />
            </View>
            {image?.assets &&
                image?.assets.map(({ uri }) => (
                    <View key={uri} style={styles.image}>
                        <Image
                            resizeMode="cover"
                            resizeMethod="scale"
                            style={{ width: 200, height: 200 }}
                            source={{ uri: uri }}
                        />
                    </View>
                ))}

            <View style={styles.btnParentSection}>
                <TouchableOpacity onPress={() => requestCameraPermission('launchCamera')} 
                    style={styles.btnSection}  >
                    <Icon name="camera" size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => requestCameraPermission('launchImageLibrary')} 
                    style={styles.btnSection}  >
                    <Icon name="image" size={30}/>
                </TouchableOpacity>
            </View>

            <Button title="Salvar" onPress={handleSaveUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnParentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    formContainer: {
        marginTop: 5,
    },
    titleButton: {
        fontSize: 16,
        color:'white', //"#025DC1",
        fontWeight: 'bold'
    },
    marginBottomInput: {
        marginBottom: 8
    },
    label: {
        fontSize: 22,
        color: 'black',
        fontWeight: "bold",
        marginBottom: 8,
        marginLeft: 10
    },
    button: {
        marginTop: 30,
        width: '80%',
        alignSelf: 'center'
    },
    input: {
        fontSize: 20,
        height: 40,
        marginHorizontal: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 5,
    },
    btnSection: {
        width: '45%',
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10,
        marginLeft: 15,
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    },
    image: {
        marginVertical: 24,
        alignItems: 'center',
    },
});