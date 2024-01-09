import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import React from 'react'

import AppIntroSlider from 'react-native-app-intro-slider';

export default function IntroPage({ navigation }) {

  const onDone = () => {
    navigation.navigate('Auth')
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={item.image} />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    (
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onDone}
      />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
    resizeMode:'contain'
  },
  introTextStyle: {
    marginBottom:0,
    marginVertical:20,
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Bạn không có thời gian??',
    title: 'ỨNG DỤNG "SỨC KHỎE TỪ XA"',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'BẠN NGẠI CHỖ ĐÔNG NGƯỜI??',
    text: 'Hạn chế nơi đông người',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's3',
    title: 'ỨNG DỤNG',
    text: 'Đặt lịch khám nhanh chóng',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's4',
    title: 'Tiện lợi',
    text: 'Dễ dàng sử dụng',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
  },
  
];