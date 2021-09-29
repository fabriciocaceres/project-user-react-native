import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../../../models/user/user';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
    user: User
    onRemove: (value: any) => any
    onEdit: (value: any) => boolean
}

export const UserListItem = (props: Props) => {
    return (
        <TouchableOpacity  style={styles.container} onPress={() => props.onEdit(props.user.id)}>
            <Text
                style={styles.text}>
                {props.user.name}
            </Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => props.onRemove(props.user.id)}>
                    <Text>
                        <Icon name="trash" size={30} color="#e33057" />
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:20
    },
    text: {
        flex: 5,
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 20,
        width: 100,
    },
    completeCircle: {
        marginRight: 20,
        marginLeft: 20,
    },
    buttons: {
        flexDirection: 'row',
    },
    buttonContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
});