import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

export const CptModal = ({ visible, onClose, label }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.txt}>{label}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.txt}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    form: {
        backgroundColor: 'white',
        margin: 30,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    txt: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    }
});