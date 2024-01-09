import { View, StyleSheet, Text } from 'react-native'
import { useState } from 'react';

// Cpt
import { CptButton, CptInput, CptLogo } from '../../components';
import { isValidEmail } from '../../utils';
import { sendOtp, findEmail } from '../../apiServices';

export default function ForgetPass({ navigation }) {

    let [email, setEmail] = useState('')
    const [error, setError] = useState('');

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

        if (find.status == 200) {
            setError(find.data)
            temp = false
        }

        if (temp) {
            const res = await sendOtp({ email })
            switch (res.status) {
                case 200:
                case 201:
                    navigation.navigate('Otp', { email, link: 'forget' })
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
            <Text style={styles.txtTitle}>QUÊN MẬT KHẨU</Text>
            {/*  */}
            <CptInput
                label={'Email'}
                placeholder={'Nhập email'}
                onChangeText={(text) => { setEmail(text), setError() }}
                value={email}
            />

            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

            <CptButton
                onPress={() => handle()}
                children={'TIẾP TỤC'}
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