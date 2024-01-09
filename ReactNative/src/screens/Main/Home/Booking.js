import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';

import { CptButton } from '../../../components';
import { getDoctor } from '../../../apiServices';
import { getCalendar, createCalendar, updateCalendar } from '../../../apiServices';
import { ENDPOINT } from '../../../utils/config';

function getNext7Days() {
    const today = moment().add(1, 'days');
    const days = [];

    for (let i = 0; i < 7; i++) {
        const nextDay = today.clone().add(i, 'days');
        days.push({
            id: i.toString(),
            date: nextDay.format('YYYY-MM-DD'),
        });
    }

    return days;
}

let dataTime = [
    { id: 1, time: '09:00' },
    { id: 2, time: '10:00' },
    { id: 3, time: '11:00' },
    { id: 4, time: '12:00' },
    { id: 5, time: '13:00' },
    { id: 6, time: '14:00' },
    { id: 7, time: '15:00' },
    { id: 8, time: '16:00' },
    { id: 9, time: '17:00' },
    { id: 10, time: '18:00' },
    { id: 11, time: '19:00' },
    { id: 12, time: '20:00' },
]

let dataDate = getNext7Days()

export default function Booking({ navigation, route }) {
    let { doctorId, calendarId } = route.params

    let [doctor, setDoctor] = useState([])
    let [calendar, setCalendar] = useState([])
    let [selectTime, setSelectTime] = useState({})
    let [selectDate, setSelectDate] = useState({});
    const [isFlatListVisible, setFlatListVisible] = useState(false);

    const getDataApi = async (id) => {
        let resDoctor = await getDoctor({ doctorId: id })
        setDoctor(resDoctor.data[0])

        let resCalendar = await getCalendar({ doctorId: id })
        setCalendar(resCalendar.data)
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getDataApi(doctorId)
        });
    }, [])

    const renderItemDate = ({ item }) => {
        let res = calendar.filter((data) => {
            if (data.date == item.date) {
                return data
            }
        })
        let number = 12 - res.length

        let disabled = false
        let css
        if (number == 0) {
            css = { ...{ opacity: 0.3 } }
            disabled = true
        }
        if (selectDate == item) {
            css = { backgroundColor: 'white', borderColor: '#e9967a', borderWidth: 1 }
        }
        return (
            <TouchableOpacity
                disabled={disabled}
                style={[styles.date, css]}
                onPress={() => { setSelectDate(item), setFlatListVisible(true) }}
            >
                <Text style={{ fontSize: 15 }}>{item.date}</Text>
                <Text style={{ color: 'red' }}>Còn {number} vé</Text>
            </TouchableOpacity>
        );
    }

    const renderItemTime = ({ item }) => {
        let disabled = false
        let css

        let res = calendar.some((data) => {
            if (data.time == item.time && data.date == selectDate.date) {
                return data
            }
        })

        if (res) {
            disabled = true
            css = { ...{ opacity: 0.3 } }
        }

        if (selectTime == item) {
            css = { backgroundColor: 'white', borderColor: '#e9967a', borderWidth: 1 }
        }

        return (
            <TouchableOpacity
                disabled={disabled}
                style={[styles.time, css]}
                onPress={() => setSelectTime(item)}
            >
                <Text>{item.time}</Text>
            </TouchableOpacity>
        );
    }

    const handleBooking = async () => {
        let temp = true
        if (!selectTime.time) {
            alert('Chọn giờ khám')
            temp = false
        }
        if (!selectDate.date) {
            alert('Chọn ngày khám')
            temp = false
        }
        if (temp) {
            if (calendarId) {
                let res = await updateCalendar({ date: selectDate.date, time: selectTime.time, calendarId: calendarId })
                switch (res.status) {
                    case 200:
                    case 201:
                        alert("Cập nhật thành công")

                        navigation.navigate('DrawerScreen', {})
                        break
                    case 400:
                    case 403:
                    case 404:
                        alert(res.data)
                        break
                }
            } else {
                let res = await createCalendar({ date: selectDate.date, time: selectTime.time, doctorId })
                switch (res.status) {
                    case 200:
                    case 201:
                        alert("Đăng ký thành công")

                        navigation.navigate('DrawerScreen', {})
                        break
                    case 400:
                    case 403:
                    case 404:
                        alert(res.data)
                        break
                }
            }

        }

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: '100%' }}>
                <View style={styles.viewProfile} >
                    <Image
                        style={{ width: '100%',flex:1, backgroundColor:'white', resizeMode:'center'}}
                        source={{ uri: `${ENDPOINT}/images/${doctor.image}` }}
                    />
                    <View style={{ flex: 3 }}>
                        <Text style={{ fontSize: 30 }}>{doctor.lastName + ' ' + doctor.firstName}</Text>
                        <Text style={{ fontSize: 18 }}>{doctor.email}</Text>
                        <Text style={{ fontSize: 18 }}>{doctor.address}</Text>
                    </View>
                </View>

                {/* giới thiệu */}
                <View style={styles.formBody}>
                    <Text style={{ fontSize: 22, fontWeight: '500', marginTop: 10 }}>Giới Thiệu</Text>
                    <ScrollView style={{ maxHeight: 100 }}>
                        <Text style={{ fontSize: 18 }}>{doctor.about}</Text>
                    </ScrollView>

                    <Text style={{ fontSize: 22, fontWeight: '500', marginTop: 20 }}>Chọn Ngày</Text>
                    <FlatList
                        data={dataDate}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItemDate}
                        horizontal={true}
                        style={{ width: '100%' }}
                    />

                    <Text style={{ fontSize: 22, fontWeight: '500', marginTop: 20 }}>Chọn Thời Gian</Text>
                    {isFlatListVisible && (
                        <FlatList
                            data={dataTime}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItemTime}
                            numColumns={4}
                            style={{ width: '100%' }}
                        />
                    )}
                </View>
            </View>

            <CptButton
                children={'LIÊN HỆ'}
                cssBorder={1}

            />
            <CptButton
                children={'ĐẶT LỊCH'}
                cssBgColor={'#e9967a'}
                cssColor={'white'}
                onPress={handleBooking}
            />
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
        backgroundColor: '#add8e6',
    },

    // profile
    viewProfile: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginHorizontal: 50,
        marginVertical: 10,
    },

    // body
    formBody: {
        width: '100%',
        alignSelf: 'flex-start',
        padding: 10,
    },
    date: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 8,
        backgroundColor: '#e0e0e0',
    },
    time: {
        width: '20%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 8,
        backgroundColor: '#e0e0e0',

    },
});