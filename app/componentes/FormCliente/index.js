

import { useEffect, useState } from 'react';
import {ScrollView, View,TextInput,Text,SafeAreaView} from 'react-native'
import {styles} from './styles'

import { getEndereco } from '../../servicos/service';

export function FormClient({callback, cliente_, endereco_}){
    const [cliente, setCliente] = useState({});
    const [endereco, setEndereco] = useState({});

    const [nome, setNomeCliente] = useState("");
    const [cpf, setCPF] = useState("");
    const [numeroContato, setNumeroContato] = useState("");

    const [cep, setCEP] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [UF, setUF] = useState("");
    const [cidade, setCidade] = useState("");


    async function getEnderecodata() {
        const reqCEP = await getEndereco(cep);
        const endereco = reqCEP.data;
        setBairro(endereco.bairro)
        setRua(endereco.logradouro)
        setUF(endereco.uf)
        setCidade(endereco.localidade)
    }

    useEffect(() => {
        
        if (cliente_.nome != undefined && endereco_.cep != undefined){
            setCliente(cliente_);
            setEndereco(endereco_);
            
            setNomeCliente(cliente_.nome);
            setCPF(cliente_.cpf);
            setNumeroContato(cliente_.numeroContato);

            setCEP(endereco_.cep);
            setRua(endereco_.rua);
            setNumero(endereco_.numero);
            setBairro(endereco_.bairro);
            setUF(endereco_.uf);
            setCidade(endereco_.cidade);
            setComplemento(endereco_.complemento);
        }
    }, [cliente_, endereco_])

    useEffect(() => {
      if(cep != "" && rua != "" && numero != "" && bairro != "" && UF != "" && cidade != ""){
        let _endereco = {}
        _endereco.cep = cep;
        _endereco.rua = rua;
        _endereco.numero = numero;
        _endereco.bairro = bairro;
        _endereco.uf = UF;
        _endereco.cidade = cidade;
        _endereco.complemento = complemento;
        setEndereco(_endereco);
      }
    },[cep,rua,numero,complemento,bairro,UF,cidade])

    useEffect(() => {
        if (nome != "" && cpf != "" && numeroContato != ""){
            let _cliente = {}
            _cliente.nome = nome;
            _cliente.cpf = cpf;
            _cliente.numeroContato = numeroContato;
            setCliente(_cliente);
        }
    },[nome, cpf, numeroContato])

    useEffect(() => {
        if(cliente.cpf != undefined && endereco.cidade != undefined){
            callback(cliente, endereco)
        }
    },[cliente, endereco])

    return(
    <SafeAreaView>
        <ScrollView nestedScrollEnabled = {true} style={styles.container}>
            <View>
                <View style={styles.viewCamp}>
                    <Text style={styles.textCamp}>Informações do Cliente</Text>
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={nome}
                        onChangeText={setNomeCliente}
                        placeholder='Seu Nome'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={numeroContato}
                        onChangeText={setNumeroContato}
                        keyboardType='phone-pad'
                        placeholder='Seu telefone para contato'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={cpf}
                        onChangeText={(e) => setCPF(e)}
                        keyboardType='phone-pad'
                        placeholder='Seu CPF'
                        returnKeyType="next"
                    />
                </View>
                <View style={{height:30}}/>
                <View style={styles.viewCamp}>
                    <Text style={styles.textCamp}>Endereço de Entrega</Text>
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={cep}
                        onChangeText={setCEP}
                        onBlur={() => getEnderecodata()}
                        keyboardType='phone-pad'
                        placeholder='Seu CEP sem Traço'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.viewEndereco}>
                    <View style={styles.viewCampEnd}>
                        <TextInput
                            style={styles.formCampEnd}
                            value={rua}
                            onChangeText={setRua}
                            placeholder='Endereço'
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.viewCampEndNum}>
                        <TextInput
                            style={styles.formCampEndNum}
                            value={numero}
                            onChangeText={setNumero}
                            placeholder='Nº'
                            returnKeyType="next"
                        />
                    </View>
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={complemento}
                        onChangeText={setComplemento}
                        placeholder='Complemento'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={bairro}
                        onChangeText={setBairro}
                        placeholder='Bairro'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={UF}
                        onChangeText={setUF}
                        placeholder='Estado'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.viewCamp}>
                    <TextInput
                        style={styles.formCamp}
                        value={cidade}
                        onChangeText={setCidade}
                        placeholder='Cidade'
                    />
                </View>
            </View>
            <View style={{height:150}}/>
        </ScrollView>
        </SafeAreaView>
    )
}