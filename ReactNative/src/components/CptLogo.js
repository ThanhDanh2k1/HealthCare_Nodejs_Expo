import { Image } from 'react-native'
import { StyleSheet } from 'react-native'

export const CptLogo = () => {
    return (
        <Image
            style={styles.logo}
            source={{ uri: 'https://media.istockphoto.com/id/1403170602/video/one-line-drawing-solid-line-medicine-one-line-drawing-animation-of-hospital-building-and.jpg?s=640x640&k=20&c=VkYjAVjSQynhY-679o-nwLZxzcHNPmdEbcyC-05YDKE=' }}
        />
    )
}

const styles = StyleSheet.create({
    logo:{
        width: 160, 
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 20,
        objectFit: 'cover',
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#00ced1',
    }
})