import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, View, SafeAreaView, ScrollView, StyleSheet, Text, AsyncStorage, Image } from 'react-native';

import SpotList from '../components/SpotList';

// ScrollView vai permitir fazer scroll na página caso haja o bug de não rolar a página naturalmente.
// SafeAreaView delimita uma área segunra na tela do celular para colocar conteúdo.
// AsyncStorage banco de dados do aplicativo.

import logo from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://be150636.ngrok.io', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva foi em ${booking.spot.company} em ${booking.date} foi ${booking.approved} ? 'Aprovada' : 'Rejeitada'`);
            });
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storaged => {
            const techsArray = storaged.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 40
    }
});
