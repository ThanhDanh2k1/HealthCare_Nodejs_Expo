// 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

import { FontAwesome5 } from '@expo/vector-icons';
// Screens
import { Home } from './Home';
import { Appointment } from './Appointment';
import { History } from './History';
import { Profile } from './Profile'
export default function TabScreen() {


    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                headerShown: false,
                tabBarStyle:{backgroundColor:"#add8e6"}
            }}
            initialRouteName='Home'
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="home" size={30} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Appointment'
                component={Appointment}
                options={{
                    title: 'Lịch hẹn',
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="calendar-plus" size={30} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='History'
                component={History}
                options={{
                    title: 'Lịch sử',
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="history" size={30} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    title: 'Thông tin',
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="user-circle" size={30} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}