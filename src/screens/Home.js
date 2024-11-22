// src/screens/Home.js
import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { FIREBASE_AUTH } from '../services/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            navigation.replace('Login'); // Redirige al usuario a la pantalla de inicio de sesión
        } catch (error) {
            console.log('Error al cerrar sesión:', error);
            alert('No se pudo cerrar sesión. Inténtalo de nuevo.');
        }
    };

    const handleGoToActividades = () => {
        navigation.navigate('Actividades');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la pantalla de inicio</Text>
            <Pressable style={styles.button} onPress={handleGoToActividades}>
                <Text style={styles.text}>Ir a Actividades</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.text}>Cerrar sesión</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        backgroundColor: "#323446",
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#F0D262",
        marginTop: 10
    },
    text: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default Home;