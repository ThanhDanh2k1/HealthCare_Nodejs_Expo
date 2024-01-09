import { View, Text, StyleSheet} from 'react-native'

import { CptButton, CptLogo } from '../../components'
import { FontAwesome5 } from '@expo/vector-icons';
export default function MainAuth({ navigation }) {
    return (
        <View style={styles.container}>

            {/* logo */}
            <CptLogo />

            {/* title */}
            <Text style={styles.txtTitle}>WELCOME BACK</Text>

            {/*  */}
            <CptButton
                onPress={() => navigation.navigate('Login')}
                children={'  ĐĂNG NHẬP VỚI EMAIL     '}
                icon={<FontAwesome5 name="envelope" size={28} color={'#add8e6'} /> }
                icon1={<FontAwesome5 name="play" size={20} color={'#add8e6'} /> }
            />

            <CptButton
                onPress={() => navigation.navigate('Login')}
                children={'  ĐĂNG NHẬP VỚI GOOGLE  '}
                icon={<FontAwesome5 name="google" size={28} color={'#add8e6'} /> }
                icon1={<FontAwesome5 name="play" size={20} color={'#add8e6'} /> }
            />

            {/*  */}
            <Text style={styles.txtContent}>
                Chưa có tài khoản?
            </Text>
            <Text
                style={[styles.txtContent, { color: '#3498db', textDecorationLine: 'underline' }]}
                onPress={() => navigation.navigate('Register')}
            >
                ĐĂNG KÝ
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#add8e6',
        padding:20
    },
    txtTitle: {
        marginTop: 50,
        fontSize: 32,
        fontWeight:'bold',
        marginVertical:20
    },
    txtContent: {
        color: '#555',
        fontSize: 18,
        marginVertical:5
    },
    img:{
        width: 160, 
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 20,
        objectFit: 'cover',
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#00ced1',
    }
})
