import React, {ReactNode} from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
interface CustomModalProps {
    handleModalOpen: (value: boolean) => void;
    open: boolean;
    title: string;
    description: string;
    actions: ReactNode[];
}
const CustomModal: React.FC<CustomModalProps> = ({ handleModalOpen, open, title, description, actions }) => {
    return (
        <Modal
            style={styles.modalContainer}
            transparent={true}
            visible={open}
            onRequestClose={() => handleModalOpen(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.actions}>
                        {actions}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#f0f0f5",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        elevation: 5, // Add elevation for shadow effect
        shadowColor: "#000", // Shadow color
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        marginTop: 5,
        fontWeight: "normal",
        marginBottom: 10,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default CustomModal;
