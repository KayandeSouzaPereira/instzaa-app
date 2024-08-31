

import { useEffect, useState } from 'react';
import {ScrollView, View,TextInput,Text,SafeAreaView, Button} from 'react-native'
import { useForm, Controller, setValue } from "react-hook-form"
import {styles} from './styles'
import { theme } from '../../configs';

import { getEndereco } from '../../servicos/service';

export function FormClient({callback, cliente_, endereco_}){


    const {
        control,handleSubmit,setValue,formState: { errors },
    } = useForm({
        defaultValues: {
          nome: cliente_.nome,
          cpf: cliente_.cpf,
          numeroContato: cliente_.numeroContato,
          cep: endereco_.cep,
          rua:endereco_.rua,
          numero: endereco_.numero,
          complemento: endereco_.complemento,
          bairro: endereco_.bairro,
          uf: endereco_.uf,
          cidade: endereco_.cidade
        },
      })

    const onSubmit = (data) => {
        let _endereco = {}
        let _cliente = {}

        _cliente.nome = data.nome
        _cliente.cpf = data.cpf
        _cliente.numeroContato = data.numeroContato
        
        _endereco.cep = data.cep;
        _endereco.rua = data.rua;
        _endereco.numero = data.numero;
        _endereco.bairro = data.bairro;
        _endereco.uf = data.uf;
        _endereco.cidade = data.cidade;
        _endereco.complemento = data.complemento;

        callback(_cliente, _endereco)

    }


    async function getEnderecodata(cep) {
        const reqCEP = await getEndereco(cep);
        const endereco = reqCEP.data;
        setValue("rua", endereco.logradouro)
        setValue("bairro", endereco.bairro)
        setValue("uf", endereco.uf)
        setValue("cidade", endereco.localidade)
        return endereco;
    }
    
    


    return(
    <SafeAreaView>
        <ScrollView nestedScrollEnabled = {true} style={styles.container}>
            <View>
                <View style={styles.viewCamp}>
                    <Text style={styles.textCamp}>Informações do Cliente</Text>
                </View>
                <View style={styles.viewCamp}>
                <Controller
                    control={control}
                    rules={{
                    required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formCamp}
                        placeholder="Nome"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    )}
                    name="nome"
                />
                {errors.nomeCliente && <Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                </View>
                <View style={styles.viewCamp}>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.formCamp}
                        placeholder="Número para contato"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType='phone-pad'
                    />
                    )}
                    name="numeroContato"
                />
                {errors.numeroContato &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                </View>
                <View style={styles.viewCamp}>
                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.formCamp}
                            placeholder="Número do CPF"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType='phone-pad'
                            returnKeyType="next"
                        />
                        )}
                        name="cpf"
                    />
                    {errors.cpf &&<Text style={styles.textCampHighlight}>Este campo e necessário para identificação.</Text>}
                </View>
                <View style={{height:30}}/>
                <View style={styles.viewCamp}>
                    <Text style={styles.textCamp}>Endereço de Entrega</Text>
                </View>
                <View style={styles.viewCamp}>
                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.formCamp}
                            placeholder="Número do CEP sem Traço"
                            onBlur={() => {
                                onBlur; 
                                let end = getEnderecodata(value);
                            }}
                            onChangeText={onChange}
                            value={value}
                            keyboardType='phone-pad'
                            returnKeyType="next"
                        />
                        )}
                        name="cep"
                    />
                    {errors.cep &&<Text style={styles.textCampHighlight}>Este campo e necessário para a entrega.</Text>}
                </View>
                <View style={styles.viewEndereco}>
                    <View style={styles.viewCampEnd}>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.formCampEnd}
                                placeholder="Endereço para o envio"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            )}
                            name="rua"
                        />
                        
                    </View>
                    <View style={styles.viewCampEndNum}>
                        <Controller
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.formCampEndNum}
                                    placeholder='Nº'
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType='phone-pad'
                                    returnKeyType="next"
                                />
                            )}
                            name="numero"
                        />
                        
                    </View>
                   
                </View>
                {errors.rua &&<Text style={styles.textCampHighlightE}>Campo de endereco e necessário para a entrega.</Text>}
                {errors.numero &&<Text style={styles.textCampHighlightE}>Campo de número e necessário para a entrega.</Text>}
                <View style={styles.viewCamp}>
                    <Controller
                            control={control}
                            rules={{
                            required: false,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.formCamp}
                                placeholder="Complemento"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            )}
                            name="complemento"
                    />
                </View>
                <View style={styles.viewCamp}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.formCamp}
                                placeholder="Bairro"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            )}
                            name="bairro"
                    />
                    {errors.bairro &&<Text style={styles.textCampHighlight}>Este campo e necessário.</Text>}
                </View>
                <View style={styles.viewCamp}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.formCamp}
                                placeholder="Estado"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            )}
                            name="uf"
                    />
                    {errors.uf &&<Text style={styles.textCampHighlight}>Este campo e necessário.</Text>}
                    
                </View>
                <View style={styles.viewCamp}>
                <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.formCamp}
                                placeholder="Cidade"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                            )}
                            name="cidade"
                    />
                    {errors.cidade &&<Text style={styles.textCampHighlight}>Este campo e necessário.</Text>}
                    {
                    
                    <View style={{width: 180 ,marginVertical: 30, marginHorizontal: 50, borderRadius: 10, alignContent: 'center', alignItems: 'center', paddingVertical: 10}} >
                    <Button 
                        title='Confirmar Dados'
                        color={theme.colorsPrimary.thirdary}
                        
                        onPress={handleSubmit(onSubmit)}>
                    </Button>
                    </View>
                    }
                </View>
                
            </View>
            <View style={{height:10}}/>
        </ScrollView>
        </SafeAreaView>
    )
}