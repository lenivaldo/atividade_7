import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, FlatList } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';

import { useRoute, useNavigation } from '@react-navigation/native';

import axios from 'axios';

//Ver o 'id' presente em
//< Text onPress={() => deleteCliente(item.id)} style={{color:'red', marginLeft:'10'}}> Apagar cliente</Text>


const Tela1 = () => {

    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const [cliente, setCliente] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/cliente')
            .then((req) => setCliente(req.data))
            .catch((erro) => console.log(erro));
    }, [route.params?.cliente])



    const salvar = () => {
        axios.post('http://localhost:3000/cliente', {
            nome: nome,
            endereco: endereco,
            cep: cep,
            nascimento: nascimento,
            telefone: telefone,
            email: email,
            id: id
        }).then((data) => {

            const temp = [cliente, data.data];
            setCliente(temp);
            alert("Dados do cliente salvos com sucesso!");
        }).catch((erro) => alert("Não foi possível salvar os dados!"))
    }

    const deleteCliente = () => {
        axios.delete('http://localhost:3000/cliente' + id)
            .then(() => {

                const temp = cliente.filter((item) => {
                    return item.id !== id;
                });

                setCliente(temp);

                alert("Cliente apagado com sucesso!");
            })
            .catch((erro) => alert("Erro ao deletar cliente!"))
    }

    const navigation = useNavigation();
    const route = useRoute();

    const navegar = () => {
        navigation.navigate('Tela2');

    }


    return (
        <ImageBackground style={{
            width: "100%",
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center'
        }}
            source={{ uri: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?cs=srgb&dl=pexels-pixabay-40568.jpg&fm=jpg' }}>
            <Text style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 12
            }}>Clínica Viver Bem</Text>

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

            <TouchableOpacity onPress={navegar}>
                <Text style={styles.texto}>Editar</Text>
            </TouchableOpacity>

            <FlatList keyExtractor={(item, index) => item.id.toString()} data={cliente} renderItem={({ item }) => (
                <View>
                    <View style={{ flexDirection: 'column' }}>
                        < Text > {item.nome}</Text>
                        < Text > {item.endereco}</Text>
                        < Text > {item.cep}</Text>
                        < Text > {item.nascimento}</Text>
                        < Text > {item.telefone}</Text>
                        < Text > {item.email}</Text>
                    </View>
                    <View>
                        < Text onPress={() => deleteCliente(item.id)} style={{ color: 'red', marginLeft: '10' }}> Apagar cliente</Text>
                    </View>
                </View>
            )} />




        </ImageBackground >
    );
};




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


export default Tela1;