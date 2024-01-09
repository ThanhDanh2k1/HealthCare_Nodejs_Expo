// 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

// screens
import DrawerScreen from './DrawerScreen'
import { Booking, Home, Fillter } from './Home'
import { Appointment } from './Appointment'
import { History } from './History'
import { Profile, EditProfile, ChangePass } from './Profile'


export default function Main() {
    return (
        <Stack.Navigator
            initialRouteName='DrawerScreen'
        >
            <Stack.Screen
                name='DrawerScreen'
                component={DrawerScreen}
                options={{
                    headerShown: false
                }}
            />

            {/* Home */}
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Booking'
                component={Booking}
                options={{
                    title: ''
                }}
            />
            <Stack.Screen
                name='Fillter'
                component={Fillter}
                options={{
                    title: 'Tìm kiếm'
                }}
            />

            {/* Appointment */}
            <Stack.Screen
                name='Appointment'
                component={Appointment}
                options={{
                    headerShown: false
                }}
            />

            {/* History */}
            <Stack.Screen
                name='History'
                component={History}
                options={{
                    headerShown: false
                }}
            />

            {/* profile */}
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='EditProfile'
                component={EditProfile}
                options={{
                    title: ''
                }}
            />
            <Stack.Screen
                name='ChangePass'
                component={ChangePass}
                options={{
                    title: ''
                }}
            />
        </Stack.Navigator>
    )
}