// src/screens/AddActividades.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../services/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AddActividades = () => {
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [userId, setUserId] = useState('');
    const navigation = useNavigation();

    const auth = FIREBASE_AUTH;

    useEffect(() => {
        setUserId(auth.currentUser.uid);
    }, [auth.currentUser.uid]);

    const handleAddActividad = async () => {
        try {
            const fechaActual = new Date().toISOString().split('T')[0];
            const actividadesCollection = collection(FIRESTORE_DB, 'actividades');
            await addDoc(actividadesCollection, {
                descripcion: descripcion || 'Sin descripción',
                fecha: fechaActual,
                imagenes: imagenes || [],
                titulo: titulo || 'Sin título',
                userId
            });

            alert('Actividad añadida correctamente');
            navigation.goBack();
        } catch (error) {
            console.log('Error al añadir la actividad:', error);
            alert('Error al añadir la actividad: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Añadir Actividad</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={titulo}
                onChangeText={(text) => setTitulo(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={(text) => setDescripcion(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Imágenes (separadas por comas)"
                value={imagenes.join(', ')}
                onChangeText={(text) => setImagenes(text.split(', '))}
            />
            <Pressable style={styles.button} onPress={handleAddActividad}>
                <Text style={styles.text}>Añadir</Text>
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

export default AddActividades;