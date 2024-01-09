// 
import { createDrawerNavigator } from '@react-navigation/drawer'
const Drawer = createDrawerNavigator()

// Screens
import TabScreen from './TabScreen'

export default function DrawerScreen() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false

            }}
            initialRouteName='TabScreen'
        >
            <Drawer.Screen
                name='TabScreen'
                component={TabScreen}
                options={{
                    title: 'trang chủ'
                }}
            />
        </Drawer.Navigator>
    )
}