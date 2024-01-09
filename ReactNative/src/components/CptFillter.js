import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { ENDPOINT } from '../utils/config';

export const CptFillter = ({ doctor, handle }) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 3, backgroundColor: '#87cefa', width: '100%', borderRadius: 10, margin: 10, padding: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius:50 }}
                        source={{ uri: `${ENDPOINT}/images/${doctor.image}` }}
                    />

                    <View style={{ flexDirection: 'column', margin: 15 }}>
                        <Text style={{fontSize:25}}>{doctor.lastName + ' ' + doctor.firstName}</Text>
                        <Text style={{fontSize:20}}>{doctor.address}</Text>
                        <Text style={{fontSize:15}}>{doctor.email}</Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={handle}
                    style={{ alignItems: 'center', width: '40%', margin: 10, backgroundColor: '#e9967a', padding: 10, borderRadius: 10, borderColor: '#e9967a', borderWidth: 1 }}
                >
                    <Text style={{fontSize: 18, fontWeight:'400'}}>ĐẶT LỊCH</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}


// Css mẫu, Css lại nha
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10
    }
});