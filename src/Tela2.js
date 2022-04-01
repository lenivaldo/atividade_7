import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, FlatList } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import { TextInputMask } from 'react-native-masked-text';

import axios from 'axios';

const Tela2 = () => {

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {

        const user = route.params.user;

        setNome(user.nome);
        setEndereco(user.endereco);
        setCep(user.cep);
        setNascimento(user.nascimento);
        setTelefone(user.telefone);
        setEmail(user.email);
        setId(user.id);


    }, [])

    const editarCliente = () => {
        axios.patch('http://localhost:3000/cliente' + id, {
            nome,
            endereco,
            cep,
            nascimento,
            telefone,
            email,
            id
        })
            .then((res) => {
                alert("Cliente editado com sucesso");
                navigation.navigate("Tela1", {res});
            })
            .catch((erro) => alert('erro'))
    }

    return (
        <View>
            <Text style={styles.subtitulo}>Cadastro de clientes</Text>


            <Text style={styles.texto}>Nome:</Text>
            <TextInput onChangeText={() => setNome(txt)} style={styles.entradaTexto} placeholder='Nome completo' />

            <Text style={styles.texto}>Endereço:</Text>
            <TextInput onChangeText={() => setEndereco(txt)} style={styles.entradaTexto} placeholder='Digite seu endereço' />

            <Text style={styles.texto}>CEP:</Text>
            <TextInputMask
                style={styles.entradaTexto} placeholder='CEP'
                type={'zip-code'}
                value={cep}
                onChangeText={(txt) => setCep(txt)}
            />

            <Text style={styles.texto}>Data de nascimento:</Text>
            <TextInputMask style={styles.entradaTexto}
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={nascimento}
                onChangeText={(txt) => setNascimento(txt)
                }
                placeholder='DD/MM/YYYY' />

            <Text style={styles.texto}>Telefone:</Text>
            <TextInputMask style={styles.entradaTexto}

                placeholder='(XX) XXXXX-XXXX'

                type={'cel-phone'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99)'
                }}

                value={telefone}
                onChangeText={(txt) => setTelefone(txt)}
            />

            <Text style={styles.texto}>E-mail:</Text>
            <TextInput onChangeText={() => setEmail(txt)} style={styles.entradaTexto} placeholder='seuemail@provedor.com.br' />

            <TouchableOpacity onPress={salvar}>
                <Text style={styles.texto}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={editarCliente}>
                <Text style={styles.texto}>Editar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Tela2;

const styles = StyleSheet.create({
    subtitulo: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12
    },
    texto: {
        color: "#000000",
        fontSize: 12,
        fontWeight: "bold"
    },
    entradaTexto: {
        backgroundColor: '#C0E6F0',
        width: '90%',
        marginVertical: 10
    }
});