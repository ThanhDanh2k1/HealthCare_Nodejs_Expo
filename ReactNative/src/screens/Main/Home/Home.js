import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { useEffect, useState, useContext } from 'react'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { getSpecialists, getListDoctors, getCalendarByPatient, cancelCalendar } from '../../../apiServices';
import { AppContext } from '../../../store/AppContext';
import { CptCard } from '../../../components';
import { ENDPOINT } from '../../../utils/config';

export default function Home({ navigation }) {

    let { user } = useContext(AppContext)

    const [specialists, setSpecialists] = useState([])
    const [doctors, setDoctors] = useState([])
    const [calendars, setCalendars] = useState([])
    let [name, setName] = useState('')

    const getApi = async () => {
        let resKhoa = await getSpecialists({ limit: 6 })
        setSpecialists(resKhoa.data)

        let resDoctors = await getListDoctors({ limit: 6 })
        setDoctors(resDoctors.data)

        let resCalendar = await getCalendarByPatient({ limit: 5 })
        setCalendars(resCalendar.data)
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getApi()
        });
    }, [])

    const handleCancel = async (data) => {
        await cancelCalendar({ calendarId: data.calendarId })
        alert('Huỷ lịch thành công')

        getApi()
    }

    const handleEdit = async (data) => {
        navigation.navigate('Booking', { doctorId: data.doctorId, calendarId: data.calendarId })
    }

    const renderItemCalendar = ({ item }) => {
        return (
            <CptCard
                calendar={item}
                handleCancel={() => handleCancel(item)}
                handleEdit={() => handleEdit(item)}
            />
        );

    }

    const renderItemKhoa = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => handleKhoa(item)}
                style={styles.item}
            >
                <Image
                    style={{ width: '100%', flex: 1, backgroundColor: 'white' }}
                    source={{ uri: `${ENDPOINT}/images/${item.image}` }}
                />
                <Text style={{ backgroundColor: 'white' }}>{item.name}</Text>
            </TouchableOpacity >
        )

    }

    const renderItemDoctor = ({ item }) => (
        < TouchableOpacity
            onPress={() => navigation.navigate('Booking', { doctorId: item.doctorId })}
            style={styles.item}
        >
            <Image
                style={{ width: '100%', flex: 1, backgroundColor: 'white', resizeMode: 'center' }}
                source={{ uri: `${ENDPOINT}/images/${item.image}` }}
            />
            <Text style={{ backgroundColor: 'white' }}>{item.lastName + ' ' + item.firstName}</Text>
        </TouchableOpacity >
    );

    const handleKhoa = (item) => {
        handleFillter({ specialistId: item.specialistId })
    }

    const handleFillter = ({ name = '', specialistId = '' }) => {
        navigation.navigate('Fillter', { name, specialistId })
    }


    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#add8e6', padding: 15, alignItems: 'center', width: '100%' }}>
                <Text style={{ fontSize: 20 }}>
                    <AntDesign name="user" size={20} style={{ margin: 0, padding: 0 }} color="black" /> Xin chào, {user.lastName + ' ' + user.firstName}
                </Text>
                <Text></Text>
                <View style={styles.viewSearch}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Tìm kiếm ...'}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TouchableOpacity onPress={() => handleFillter({ name })}>
                        <AntDesign name="search1" style={{ margin: -48, padding: 26, fontSize: 29 }} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.formBody}>

                    <FlatList
                        style={styles.formht}
                        data={calendars}
                        keyExtractor={(item) => item.calendarId}
                        renderItem={renderItemCalendar}
                        horizontal={true}
                    />

                    <View style={styles.view}>
                        <Text style={styles.txtTitle}>KHOA</Text>
                        <Text
                            onPress={() => handleFillter({})}
                            style={styles.txtView}
                        >Xem tất cả <FontAwesome5 name="list-ul" style={{ fontSize: 15 }} color="black" /></Text>
                    </View>

                    <FlatList
                        data={specialists}
                        keyExtractor={(item) => item.specialistId}
                        renderItem={renderItemKhoa}
                        numColumns={3}
                        style={styles.flatListContainer}
                    />

                    <View style={styles.view}>
                        <Text style={styles.txtTitle}>BÁC SĨ</Text>
                        <Text
                            onPress={() => handleFillter({})}
                            style={styles.txtView}
                        >Xem tất cả <FontAwesome5 name="list-ul" style={{ fontSize: 15 }} color="black" /></Text>
                    </View>

                    <FlatList
                        data={doctors}
                        keyExtractor={(item) => item.doctorId}
                        renderItem={renderItemDoctor}
                        numColumns={3}
                        style={styles.flatListContainer}
                    />

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    // container
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },

    // body
    formBody: {
        alignSelf: 'flex-start',
        padding: 10,
        // width: '100%'
    },

    // title
    txtTitle: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },

    // input-text
    viewSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderRadius: 10
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        borderRadius: 10,
        alignItems: 'center',
        fontSize: 15,
        color: 'black'
    },

    // label
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtView: {
        color: 'black',
        fontSize: 15,
        marginVertical: 5
    },

    // list
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    calendar: {
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        backgroundColor: '#e0e0e0',
    },
    item: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        backgroundColor: 'white',
    },
    // 
    flatListContainer: {
        paddingHorizontal: 10,
        paddingTop: 5,
    },
});