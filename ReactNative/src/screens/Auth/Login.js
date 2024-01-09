import { View, Text, StyleSheet } from 'react-native'
import { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cpt
import { CptButton, CptInput, CptLogo } from '../../components';
import { isValidEmail } from '../../utils';
import { login } from '../../apiServices';
import { AppContext } from '../../store/AppContext';

export default function Login({ navigation }) {

    let { setUser } = useContext(AppContext)

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const handle = async () => {
        let temp = true

        if (email.trim() == '' || password.trim() == '') {
            setError('Email / Password không được để trống!')
            temp = false
        }

        if (!isValidEmail(email)) {
            setError('Email không đúng định dạng!')
            temp = false
        }

        if (temp) {
            const res = await login({ email, password })
            switch (res.status) {
                case 200:
                case 201:
                    await AsyncStorage.setItem('token', res.data.token)
                    await setUser(res.data.user)

                    navigation.navigate('Main')
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

            <Text style={styles.txtTitle}>ĐĂNG NHẬP</Text>

            {/*  */}
            <CptInput
                label={'Email:'}
                placeholder={'Nhập email'}
                onChangeText={(text) => { setEmail(text), setError() }}
                value={email}
            />

            <CptInput
                label={'Mật khẩu:'}
                placeholder={'Nhập mật khẩu'}
                onChangeText={(text) => { setPassword(text), setError() }}
                value={password}
                secureTextEntry
            />

            <Text
                onPress={() => navigation.navigate('Forget')}
                style={{ textAlign: 'right', width: '100%', paddingRight: 20, color: '#3498db', textDecorationLine: 'underline' }}
            >Quên mật khẩu?
            </Text>
                        {error ? <Text style={{ color: 'red', margin: 5 }}>{error}</Text> : null}
            <CptButton
                onPress={() => handle()}
                children={'ĐĂNG NHẬP'}
                cssBgColor={'#e9967a'}
                cssColor={'black'}
                cssMarginTop={8}

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
    },
    txtTitle: {
        marginTop: 20,
        fontSize: 40,
        fontWeight:'bold',
        marginBottom:5
    },
    txtContent: {
        color: 'black',
        fontSize: 18,
        marginVertical:5
    }
});