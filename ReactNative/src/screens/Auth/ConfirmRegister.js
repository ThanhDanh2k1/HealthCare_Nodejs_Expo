import { View, StyleSheet, Text } from 'react-native'
import { useState } from 'react';

// Cpt
import { CptButton, CptInput, CptLogo } from '../../components';
import { register, forgetUser } from '../../apiServices';

export default function ConfirmRegister({ navigation, route }) {
    let [email, setEmail] = useState(route.params.email)
    let [link, setLink] = useState(route.params.link)

    let [password, setPassword] = useState('')
    let [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');

    const handle = async () => {
        let temp = true

        if (password.trim() == '' || confirmpassword.trim() == '') {
            setError('Không được để trống!')
            temp = false
        }

        if (password !== confirmpassword) {
            setError('Mật khẩu không trùng khớp!')
            temp = false
        }

        if (temp) {
            switch (link) {
                case 'register':
                    const resRegister = await register({ email, password })
                    switch (resRegister.status) {
                        case 200:
                        case 201:
                            alert('Đăng ký thành công')
                            navigation.navigate('MainAuth')
                        case 400:
                        case 403:
                        case 404:
                            setError(resRegister.data)
                    }
                    break
                case 'forget':
                    const resForget = await forgetUser({ email, password })
                    switch (resForget.status) {
                        case 200:
                        case 201:
                            alert('Thành công')
                            navigation.navigate('MainAuth')
                        case 400:
                        case 403:
                        case 404:
                            setError(resForget.data)
                    }
                    break
            }
        }

    }
    return (
        <View style={styles.container}>

            {/* logo */}
            <CptLogo />

            <CptInput
                label={'Mật khẩu'}
                placeholder={'Nhập mật khẩu'}
                onChangeText={(text) => { setPassword(text), setError() }}
                value={password}
                secureTextEntry
            />

            <CptInput
                label={'Nhập lại mật khẩu'}
                placeholder={'Nhập lại mật khẩu'}
                onChangeText={(text) => { setConfirmPassword(text), setError() }}
                value={confirmpassword}
                secureTextEntry
            />
            {error ? <Text style={{ color: 'red', margin: 20 }}>{error}</Text> : null}

            <CptButton
                onPress={() => handle()}
                children={'ĐỔI MẬT KHẨU'}
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
    }
});