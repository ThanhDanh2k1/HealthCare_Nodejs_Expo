import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useContext, useEffect, useState } from 'react';

import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { CptButton, CptModal } from '../../../components'
import { AppContext } from '../../../store/AppContext';

export default function Profile({ navigation }) {

  let { user } = useContext(AppContext)

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // console.log('alo');
    });
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.txtTitle}>TÀI KHOẢN</Text>
      </View>

      <TouchableOpacity
        style={styles.viewProfile}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Image
          style={{ width: 60, height: 60, flex: 1 }}
          source={{ uri: user.image }}
        />
        <View style={{ flex: 3, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 25 }}>{user.lastName + ' ' + user.firstName}</Text>
          <Text style={{ fontSize: 18 }}>{user.email}</Text>
        </View>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.viewButton}>
        <TouchableOpacity onPress={() => setModalVisible1(true)}>
          <Text style={styles.text1}><FontAwesome5 name="pen-fancy" size={28} color={'black'}/> Đánh giá</Text>
        </TouchableOpacity>
        <CptModal
          visible={modalVisible1}
          label={'Cập nhập ở phiên bản tiếp theo'}
          onClose={() => setModalVisible1(false)}
        />
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity onPress={() => setModalVisible2(true)}>
          <Text style={styles.text1}><FontAwesome5 name="envelope-open" size={28} color={'black'}/> Về chúng tôi</Text>
        </TouchableOpacity>
        <CptModal
          visible={modalVisible2}
          label={'Cập nhập ở phiên bản tiếp theo'}
          onClose={() => setModalVisible2(false)}
        />
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity onPress={() => setModalVisible3(true)}>
          <Text style={styles.text1}><FontAwesome5 name="wallet" size={28} color={'black'} /> Thanh toán</Text>
        </TouchableOpacity>
        <CptModal
          visible={modalVisible3}
          label={'Cập nhập ở phiên bản tiếp theo'}
          onClose={() => setModalVisible3(false)}
        />
      </View>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('ChangePass', { email: user.email })}
      >
        <Text style={styles.text1}><FontAwesome5 name="feather" size={28} color={'black'} marginTop={40}/> Đổi mật khẩu</Text>
      </TouchableOpacity>

      <CptButton
        children={'ĐĂNG XUẤT'}
        icon={<FontAwesome5 name="sign-out-alt" size={30} color={'white'} /> }
        onPress={() => navigation.navigate('Auth')}
        cssMarginTop={1}
        cssBgColor={'#e9967a'}
        cssColor={'white'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#add8e6',
  },
  viewTitle: {
    alignSelf: 'center',
    margin: 30
  },
  txtTitle: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  viewProfile: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 20,
  },
  viewButton: {
    margin: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '90%'
  },
  text1:{
    fontSize:20,
    alignSelf:'center'
  }
});