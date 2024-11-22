// src/screens/Register.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../services/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Importa el hook

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation(); // Inicializa el hook

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            // Registrar al usuario con Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

            // Guardar información adicional del usuario en Firestore
            const user = userCredential.user;
            const usersCollection = collection(FIRESTORE_DB, 'users'); // Referencia a la colección
            await addDoc(usersCollection, {
                uid: user.uid, // UID único del usuario
                email: user.email,
                name: name,
            });

            alert('Usuario registrado correctamente');
            navigation.navigate('Login'); // Navega a la pantalla de Login
        } catch (error) {
            console.log('Error en el registro:', error);
            alert('Error al registrar usuario: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.text}>Registrar</Text>
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
    input: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    button: {
        padding: 10,
        backgroundColor: "#323446",
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#F0D262",
    },
    text: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default Register;
