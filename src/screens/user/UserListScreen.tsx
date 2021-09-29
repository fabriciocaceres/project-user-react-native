import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from "react-native-splash-screen";
import { useIsFocused, useNavigation } from 'react-navigation-hooks';
import { Header } from 'react-navigation-stack';
import { User } from '../../models/user/user';
import { userService } from '../../services/user-service';
import { UserListItem } from './components/UserListItem';

export const UserListScreen = () => {
    const [users, setUsers] = useState<User[]>([]);
    const isFocused = useIsFocused();

    const { navigate } = useNavigation();

    useEffect(() => {
        SplashScreen.hide();
        listUsers();
    }, [isFocused]);

    const listUsers = async () => {
        try {
            var response = await userService().list();
            setUsers(response.data);
        } catch (error) {
            Alert.alert('Error', 'Erro ao listar usuários');
        }
    }

    const renderItem = (item: any) => UserListItem({
        user: item.item,
        onRemove: showConfirmDialog,
        onEdit: goToCreateUser,
    });

    const showConfirmDialog = (id:number) => {
        return Alert.alert(
            "Deletar usuário",
            "Você tem certeza que deseja deletar o usuário?",
            [
                {
                    text: "Sim",
                    onPress: () => {
                        onRemove(id);
                    },
                },
                {
                    text: "Não",
                },
            ]
        );
    };

    const onRemove = async (id: number) => {
        try {
            await userService().deleteUser(id);
            Alert.alert('Successo', 'Usuário deletado com sucesso.');
            await listUsers();
        } catch (error) {
            Alert.alert('Erro', 'Usuário deletado com sucesso.');
        }
    }

    const goToCreateUser = (id: any) => navigate('UserDetail', {userId: id});

    return (
        <SafeAreaView>
            <FlatList
                style={{marginBottom: 20}}
                data={users}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};