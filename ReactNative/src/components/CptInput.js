import { View, Text, StyleSheet, TextInput } from "react-native";

export const CptInput = ({ label, placeholder, onChangeText, value, secureTextEntry = false, keyboardType = 'default', editable = true, opacity = 1, maxLength }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.txtLabel}>
                {label}
            </Text>

                <TextInput
                    style={[styles.input, { opacity }]}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    editable={editable}
                    maxLength={maxLength}
                />
        </View>
    )
}

// Css mẫu, Css lại nhaF
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    txtLabel: {
        fontSize: 18
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        fontSize:18,
        color: 'black'
    }
});