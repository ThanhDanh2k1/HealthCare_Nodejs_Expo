import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";

export const CptButton = ({ onPress, children, cssBgColor, cssBorder, cssColor, cssMarginTop, icon, icon1 }) => {

    let backgroundColor = cssBgColor || 'white'
    let borderWidth = cssBorder || 0
    let color = cssColor || 'black'
    let marginTop = cssMarginTop || 0

    return (
        <View style={[styles.container, { marginTop }]}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.backgroundBtn, { backgroundColor, borderWidth }]}
            >
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.txtBtn,{color}]}>
                    {icon}
                </Text>
                <Text style={[styles.txtBtn, { color }]}>
                    {children} 
                </Text>
                <Text style={[styles.txtBtn,{color}]}>
                    {icon1}
                </Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    backgroundBtn: {
        backgroundColor: 'white',
        width: '90%',
        margin: 10,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 0
    },
    txtBtn: {
        color: 'black',
        fontSize: 19,
        fontWeight: '400',
        alignSelf:'center',
        marginHorizontal:5
    }
});