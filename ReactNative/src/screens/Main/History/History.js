import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { useEffect, useState, useContext } from 'react';

import { CptCard } from '../../../components';
import { getCalendarHistory } from '../../../apiServices';
import { AppContext } from '../../../store/AppContext';

export default function History({ navigation }) {

  let { user } = useContext(AppContext)

  let [calendars, setCalendars] = useState([])

  const getApi = async () => {
    let res = await getCalendarHistory({ limit: 10})
    setCalendars(res.data)
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getApi()
    });
  }, [])

  const renderItemCalendar = ({ item }) => {
    return (
      <CptCard
        calendar={item}
        history={true}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'white', padding: 10, alignItems: 'center', width: '100%' }}>
        <Text style={{ fontSize: 20 }}>
          Xin chào, {user.lastName + ' ' + user.firstName}
        </Text>
      </View>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.formBody}>
          <Text style={styles.txtTitle}>LỊCH SỬ KHÁM BỆNH</Text>

          <FlatList
            data={calendars}
            keyExtractor={(item) => item.calendarId}
            renderItem={renderItemCalendar}
            style={{ width: '100%' }}
          />
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#add8e6',
  },
  formBody: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  txtTitle: {
    fontSize: 35
  }
});