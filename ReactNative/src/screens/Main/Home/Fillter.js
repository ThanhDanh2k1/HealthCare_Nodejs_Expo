import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

import { CptFillter } from '../../../components';
import { searchData, getSpecialists } from '../../../apiServices';

export default function Fillter({ navigation, route }) {

    let [name, setName] = useState(route.params.name)
    let [specialistId, setSpecialistId] = useState(route.params.specialistId)

    const [doctors, setDoctors] = useState([])
    const [specialists, setSpecialists] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const getApi = async () => {
        let resKhoa = await getSpecialists({})
        const newItem = { specialistId: '0', name: 'Tất cả', image: '' };
        setSpecialists([newItem, ...resKhoa.data])

        let res = await searchData({ specialistId, name })
        setDoctors(res.data)
    }

    const search = async ({ specialistId }) => {

        let res = await searchData({ specialistId, name })
        setDoctors(res.data)
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getApi()
        });
    }, [])

    const renderItemCalendar = ({ item }) => {
        return (
            <CptFillter
                handle={() => navigation.navigate('Booking', { doctorId: item.doctorId })}
                doctor={item}
            />
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { setSpecialistId(item.specialistId), closeModal(), search({ specialistId: item.specialistId }) }}>
            <View style={styles.item}>
                <RadioButton
                    value={item.specialistId}
                    status={specialistId === item.specialistId ? 'checked' : 'unchecked'}
                />
                <Text>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 30, paddingHorizontal: 20, textAlign: 'center', fontWeight:'bold'}}>KHOA BỆNH</Text>
                        <FlatList
                            data={specialists}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.specialistId}
                            horizontal={false}
                            numColumns={2}
                        />

                        <TouchableOpacity
                            style={{ borderWidth: 1, padding: 10, borderRadius: 10, backgroundColor:'#e9967a', borderColor: '#e9967a' }}
                            onPress={closeModal}
                        >
                            <Text style={{ textAlign: 'center', fontSize:20 }}>ĐÓNG</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.viewSearch}>
                <TouchableOpacity onPress={() => search({ specialistId })}>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                    style={{ flex: 1, marginHorizontal: 10 }}
                    placeholder={'Nhập tên bác sĩ'}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TouchableOpacity onPress={openModal}>
                    <AntDesign name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 25, paddingHorizontal: 18 }}>Kết quả tìm kiếm</Text>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item.doctorId}
                renderItem={renderItemCalendar}
                style={{ width: '100%' }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#add8e6',
    },
    viewSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        margin: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
});