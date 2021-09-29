import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { UserDetailScreen } from './screens/user/UserDetailScreen';
import { UserListScreen } from './screens/user/UserListScreen';

const AppNavigator = createStackNavigator({
    UserList: {
        screen: UserListScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Lista de usuários`,
            headerRight: () => (
                <TouchableOpacity style={{ marginVertical: 10, marginHorizontal: 10, }}
                    onPress={() => navigation.navigate('UserDetail')}>
                    <Text>
                        <Icon name="plus" size={30} color='#03A9F4' />
                    </Text>
                </TouchableOpacity>
            ),
        }),
    },
    UserDetail: {
        screen: UserDetailScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Detalhe do usuário`
        }),
    }
},
    {
        initialRouteName: 'UserList'
    });

export default createAppContainer(AppNavigator);