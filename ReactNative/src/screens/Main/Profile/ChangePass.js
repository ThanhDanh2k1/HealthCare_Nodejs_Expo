import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react';

import { CptInput, CptButton } from '../../../components';
import { changePass } from '../../../apiServices';

export default function ChangePass({ navigation, route }) {

    let { email } = route.params

    let [passwordOld, setPasswordOld] = useState('')
    let [password, setPassword] = useState('')
    let [confirmpassword, setConfirmPassword] = useState('')
    let [error, setError] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            setPasswordOld('')
            setPassword('')
            setConfirmPassword('')
        });
    }, [])

    const handle = async () => {
        let temp = true

        if (passwordOld.trim() == '' ||
            password.trim() == '' ||
            confirmpassword.trim() == ''
        ) {
            setError('Các trường không được để trống!')
            temp = false
        }

        if (password != confirmpassword) {
            setError('Mật khẩu không khớp!')
            temp = false
        }


        if (temp) {
            const res = await changePass({ email, password, passwordOld })
            switch (res.status) {
                case 200:
                case 201:
                    alert('Đổi mật khẩu thành công')
                    navigation.navigate('Profile')
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
            <Text style={{ fontSize: 35,fontWeight:'600', paddingHorizontal: 20, alignSelf: 'center', marginVertical: 20 }}>ĐỔI MẬT KHẨU</Text>

            <CptInput
                label={'Mật khẩu hiện tại'}
                placeholder={'Nhập mật khẩu hiện tại'}
                value={passwordOld}
                onChangeText={(text) => setPasswordOld(text)}
                secureTextEntry={true}
            />
            <CptInput
                label={'Mật khẩu mới'}
                placeholder={'Mật khẩu mới'}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <CptInput
                label={'Nhập lại mật khẩu mới'}
                placeholder={'Nhập lại mật khẩu mới'}
                value={confirmpassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
            />
            {error ? <Text style={{ color: 'red', margin: 20 }}>{error}</Text> : null}
            <CptButton
                children={'Đổi mật khẩu'}
                cssMarginTop={20}
                cssBgColor={'#e9967a'}
                cssColor={'white'}
                onPress={handle}
            />

        </View >
    )
}


const styles = StyleSheet.create({
    // container
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#add8e6',
    },
});