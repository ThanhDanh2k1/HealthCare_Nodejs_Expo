import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ENDPOINT } from '../utils/config';

export const CptCard = ({ calendar, history, handleCancel, handleEdit }) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 3, backgroundColor: '#87cefa', width: '100%', borderRadius: 10, margin: 10, padding: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 75 }}
                        source={{ uri: `${ENDPOINT}/images/${calendar.image}` }}
                    />

                    <View style={{ flexDirection: 'column', margin: 10 }}>
                        <Text style={{fontSize:20}}>{calendar.lastName + ' ' + calendar.firstName}</Text>
                        <Text style={{fontSize:17,  fontWeight:'400'}}>Địa chỉ: {calendar.address}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
                    <Text style={{fontSize:15, alignSelf:'center'}}><AntDesign name="calendar" size={25} color="black" /> {calendar.date}</Text>
                    <Text><AntDesign name="clockcircleo" size={25} color="black" /> {calendar.time}</Text>
                </View>

            </View>
            {!history &&
                <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={handleCancel}
                        style={{ alignItems: 'center', width: '40%', margin: 10, backgroundColor: '#ffb6c1', padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'black', fontSize:15, fontWeight:'bold' }}>HỦY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleEdit}
                        style={{ alignItems: 'center', width: '50%', margin: 10, backgroundColor: 'white', padding: 10, borderRadius: 10, borderColor: '#b0c4de', borderWidth: 1 }}>
                        <Text style={{ color: 'black', fontSize:15, fontWeight:'bold' }}>THAY ĐỔI</Text>
                    </TouchableOpacity>
                </View>}
        </View>
    )
}


// Css mẫu, Css lại nha
const styles = StyleSheet.create({
    container: {
        width: '90%',
        flex: 1,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10
    }
});