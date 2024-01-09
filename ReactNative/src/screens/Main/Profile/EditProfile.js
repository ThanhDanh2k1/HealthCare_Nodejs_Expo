import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { CptInput } from '../../../components'
import { AppContext } from '../../../store/AppContext'
import { updateUser } from '../../../apiServices';

export default function EditProfile({ navigation }) {

    let { user, setUser } = useContext(AppContext)

    // css
    let [editable, setEditable] = useState(false)
    let [disabled, setDisabled] = useState(true)
    let [opacity, setOpacity] = useState(0.5)

    let [lastName, setLastName] = useState(user.lastName);
    let [firstName, setFirstName] = useState(user.firstName);
    let [phone, setPhone] = useState(user.phone);
    let [address, setAddress] = useState(user.address);
    let [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    let [gender, setGender] = useState(user.gender);
    let [birthday, setBirthday] = useState(user.birthday);
    let [image, setImage] = useState(user.image);

    useEffect(() => {
        setLastName(user.lastName)
        setFirstName(user.firstName)
        setPhone(user.phone)
        setAddress(user.address)
        setBirthday(user.birthday)
        setGender(user.gender)
        setImage(user.image)
    }, [user])

    // gender
    const handleGender = (option) => {
        setGender(option);
    };

    const handleEdit = () => {
        setEditable(true)
        setDisabled(false)
        setOpacity(1)
    }

    // date
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD')
        setBirthday(formattedDate)
        hideDatePicker();
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handle = async () => {
        setEditable(false)
        setDisabled(true)
        setOpacity(0.5)
        let res = await updateUser({ image, firstName, lastName, address, birthday, gender, phone })
        await AsyncStorage.setItem('token', res.data.token)
        setUser(res.data.user)
        alert('Cập nhật thông tin thành công')
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <Text style={{ fontSize: 40, paddingHorizontal: 20, alignSelf: 'center', marginVertical: 20, fontWeight:'bold' }}>THÔNG TIN</Text>
                <TouchableOpacity
                    onPress={pickImage}
                    disabled={disabled}
                >
                    <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 160, flex: 1, alignSelf: 'center', margin: 10 }}
                    />
                </TouchableOpacity>

                <Text style={styles.viewDate}>{user.email}</Text>

                <CptInput
                    label={'Họ:'}
                    placeholder={'Nhập họ'}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    editable={editable}
                    opacity={opacity}
                />
                <CptInput
                    label={'Tên:'}
                    placeholder={'Nhập tên'}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    editable={editable}
                    opacity={opacity}
                />

                <Text style={{ fontSize: 18, paddingHorizontal: 20 }}>Ngày sinh:</Text>
                <TouchableOpacity
                    style={[styles.viewDate, { opacity }]}
                    disabled={disabled}
                    onPress={showDatePicker}
                >
                    <Text>{birthday}</Text>
                    {/* <Text>{'birthday'}</Text> */}
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />


                <Text style={{ fontSize: 18, paddingHorizontal: 20 }}>Giới tính: </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity
                        style={[gender == 'Nam' ? styles.selectedText : styles.unselectedText, { opacity }]}
                        disabled={disabled}
                        onPress={() => handleGender('Nam')}
                    >
                        <Text>Nam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[gender == 'Nữ' ? styles.selectedText : styles.unselectedText, { opacity }]}
                        disabled={disabled}
                        onPress={() => handleGender('Nữ')
                        }>
                        <Text>Nữ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[gender == 'Khác' ? styles.selectedText : styles.unselectedText, { opacity }]}
                        disabled={disabled}
                        onPress={() => handleGender('Khác')
                        }>
                        <Text>Khác</Text>
                    </TouchableOpacity>
                </View>

                <CptInput
                    label={'Số diện thoại:'}
                    placeholder={'Nhập số điện thoại'}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType='numeric'
                    editable={editable}
                    opacity={opacity}
                    maxLength={10}
                />

                <CptInput
                    label={'Địa chỉ:'}
                    placeholder={'Nhập địa chỉ'}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    editable={editable}
                    opacity={opacity}
                />
            </ScrollView>

            <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.viewBack}
                    onPress={() => { navigation.goBack() }}
                >
                    <Text>QUAY LẠI</Text>
                </TouchableOpacity>
                {editable ?
                    <TouchableOpacity style={styles.viewEdit}
                        onPress={handle}
                    >
                        <Text style={{ color: 'white' }}>CẬP NHẬT</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.viewEdit}
                        onPress={handleEdit}
                    >
                        <Text style={{ color: 'white' }}>CHỈNH SỬA</Text>
                    </TouchableOpacity>}
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    // container
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#add8e6',
    },
    viewDate: {
        backgroundColor: '#add8e6',
        borderColor: 'black',
        borderWidth: 1,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10
    },
    viewBtn: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
    },
    viewBack: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    viewEdit: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e9967a'
    },
    selectedText: {
        borderWidth: 1,
        borderRadius: 12,
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        marginHorizontal: 10
    }
    ,
    unselectedText: {
        borderWidth: 1,
        borderRadius: 12,
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10

    }
});