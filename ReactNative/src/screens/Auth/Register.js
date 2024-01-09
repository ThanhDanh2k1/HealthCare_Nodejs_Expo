import { View, Text, StyleSheet } from 'react-native'

// Cpt
import { CptButton, CptInput, CptLogo } from '../../components';
import { isValidEmail } from '../../utils';
import { useState } from 'react';
import { sendOtp, findEmail } from '../../apiServices';

export default function Register({ navigation }) {

    let [email, setEmail] = useState('')
    let [error, setError] = useState('');

    const handle = async () => {
        let temp = true

        if (email.trim() == '') {
            setError('Email không được để trống!')
            temp = false
        }

        if (!isValidEmail(email)) {
            setError('Email không đúng định dạng!')
            temp = false
        }

        let find = await findEmail({ email })

        if (find.status == 404) {
            setError(find.data)
            temp = false
        }

        if (temp) {
            const res = await sendOtp({ email })
            switch (res.status) {
                case 200:
                case 201:
                    navigation.navigate('Otp', { email, link: 'register' })
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

            <Text style={styles.txtTitle}>ĐĂNG KÝ</Text>


            {/*  */}
            <CptInput
                label={'Email'}
                placeholder={'Nhập email'}
                onChangeText={(text) => { setEmail(text), setError() }}
                value={email}
                keyboardType={'email-address'}
            />

            {error ? <Text style={{ color: 'red', margin: 20 }}>{error}</Text> : null}

            <CptButton
                onPress={() => handle()}
                children={'TIẾP TỤC'}
                cssBgColor={'#e9967a'}
                cssColor={'white'}
                cssMarginTop={20}
            />

            {/*  */}
            <Text style={styles.txtContent}>
                Đã có tài khoản?
            </Text>
            <Text
                style={[styles.txtContent, { color: '#3498db', textDecorationLine: 'underline' }]}
                onPress={() => navigation.navigate('Login')}
            >
                ĐĂNG NHẬP
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
    },
    txtContent: {
        color: 'black',
        fontSize: 18,
        marginVertical:5
    },
    txtTitle: {
        marginTop: 20,
        fontSize: 40,
        fontWeight:'bold',
        marginBottom:5
    }
});