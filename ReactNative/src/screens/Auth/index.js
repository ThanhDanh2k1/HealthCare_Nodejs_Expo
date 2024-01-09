// 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

// screens
import Login from './Login'
import MainAuth from './MainAuth'
import Register from './Register'
import Otp from './Otp'
import ConfirmRegister from './ConfirmRegister'
import ForgetPass from './ForgetPass'

export default function Auth() {
    return (
        <Stack.Navigator
            initialRouteName='MainAuth'
        >
            <Stack.Screen
                name='MainAuth'
                component={MainAuth}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    title: 'Đăng nhập'
                }}
            />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    title: 'Đăng ký'
                }}
            />
            <Stack.Screen
                name='Forget'
                component={ForgetPass}
                options={{
                    title: 'Quên mật khẩu'
                }}
            />
            <Stack.Screen
                name='Otp'
                component={Otp}
                options={{
                    title: 'Đăng ký'
                }}
            />
            <Stack.Screen
                name='Confirm'
                component={ConfirmRegister}
                options={{
                    title: 'Đăng ký'
                }}
            />
        </Stack.Navigator>
    )
}