import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalleActividad = ({ route }) => {
    const actividad = route.params.actividad;

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{actividad.titulo}</Text>
            <Text style={styles.descripcion}>{actividad.descripcion}</Text>
            <Text style={styles.fecha}>{actividad.fecha}</Text>
            <Text style={styles.imagen}>{actividad.imagenes}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderWidth: 5,
        borderColor: '#F0D262',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    descripcion: {
        fontSize: 18,
        marginBottom: 10,
    },
    fecha: {
        fontSize: 18,
        color: '#666',
    },
});

export default DetalleActividad;