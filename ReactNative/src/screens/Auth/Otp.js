import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react';

// Cpt
import { CptButton, CptInput, CptLogo } from '../../components';
import { verifyOtp } from '../../apiServices';

export default function Otp({ navigation, route }) {
    let [email, setEmail] = useState(route.params.email)
    let [link, setLink] = useState(route.params.link)

    let [otp, setOtp] = useState('')
    let [error, setError] = useState('');

    const handle = async () => {
        let temp = true

        if (otp.trim() == '') {
            setError('Otp không được để trống!')
            temp = false
        }

        if (temp) {
            const res = await verifyOtp({ email, otp })
            switch (res.status) {
                case 200:
                case 201:
                    navigation.navigate('Confirm', { email, link })
                    break

                case 400:
                case 403:
                case 404:
                    setError(res.data)
                    break
            }
        }
    }
    return (
        <View style={styles.container}>

            {/* logo */}
            <CptLogo />

            {error ? <Text style={{ color: 'red', margin: 20 }}>{error}</Text> : null}

            {/*  */}
            <Text style={styles.txtTitle}>
                XÁC THỰC OTP
            </Text>

            <CptInput
                placeholder={'Nhập mã otp'}
                onChangeText={(text) => { setOtp(text), setError() }}
                value={otp}
                keyboardType='numeric'
            />

            <CptButton
                onPress={() => handle()}
                children={'XÁC THỰC'}
                cssBgColor={'#e9967a'}
                cssColor={'white'}
                cssMarginTop={20}
            />
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
    },
    txtTitle: {
        marginTop: 20,
        fontSize: 40,
        fontWeight:'bold',
        marginBottom:5
    }
});