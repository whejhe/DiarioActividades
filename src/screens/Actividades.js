// src/screens/Home.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../services/FirebaseConfig';

const Actividades = () => {

    const navigation = useNavigation();
    const [actividades, setActividades] = useState([]);

    const handleGoToAddActividades = () => {
        navigation.navigate('AddActividades');
    };

    const getActividades = async () => {
        console.log('getActividades se está llamando');
        try {
            const actividadesCollection = collection(FIRESTORE_DB, 'actividades');
            const querySnapshot = await getDocs(actividadesCollection);
            const actividadesData = querySnapshot.docs.map((doc) => doc.data());
            setActividades(actividadesData);
        } catch (error) {
            console.log('Error al obtener las actividades:', error);
        }
    };

    useEffect(() => {
        getActividades();
    }, []);

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={handleGoToAddActividades}>
                <Text style={styles.text}>Añadir Actividad</Text>
            </Pressable>
            <Text style={styles.title}>Lista de Actividades</Text>
            <FlatList
                data={actividades}
                renderItem={({ item }) => (
                    <Pressable style={styles.actividad}
                        onPress={() => navigation.navigate('DetalleActividades', { actividad: item })}
                    >
                        <Text style={styles.tituloActividad}>{item.titulo}</Text>
                    </Pressable>
                )}
                keyExtractor={(item) => item.titulo}            
            />
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
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    button: {
        marginTop: 30,
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
    tituloActividad: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        padding: 0
    },
    actividad: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
    }
});

export default Actividades;