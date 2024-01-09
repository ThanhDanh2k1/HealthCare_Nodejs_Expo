// 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

// Screens
import IntroPage from './screens/IntroScreen'
import Auth from './screens/Auth'
import Main from './screens/Main'

export default function Index() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='IntroPage'
    >
      <Stack.Screen name='IntroPage' component={IntroPage} />
      <Stack.Screen name='Auth' component={Auth} />
      <Stack.Screen name='Main' component={Main} />
    </Stack.Navigator>
  )
}