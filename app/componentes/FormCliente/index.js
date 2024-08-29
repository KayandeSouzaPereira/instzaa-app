

import { useEffect, useState } from 'react';
import {ScrollView, View,TextInput,Text,SafeAreaView} from 'react-native'
import { useForm, Controller, setValue } from "react-hook-form"
import {styles} from './styles'

import { getEndereco } from '../../servicos/service';

export function FormClient({callback, cliente_, endereco_}){


    const {
        control,handleSubmit,setValue,formState: { errors },
    } = useForm({
        defaultValues: {
          nome: "",
          cpf: "",
          numeroContato: "",
          cep: "",
          rua:"",
          numero: "",
          complemento: "",
          bairro: "",
          uf: "",
          cidade: ""
        },
      })

    const onSubmit = (data) => console.log(data)


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
                    required: true,
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
                    name="nomeCliente"
                />
                {errors.nomeCliente && <Text>Esse campo e necessário.</Text>}
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
                {errors.numeroContato && <Text>Esse campo e necessário.</Text>}
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
                    {errors.cpf && <Text>Esse campo e necessário.</Text>}
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
                    {errors.cep && <Text>Esse campo e necessário.</Text>}
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
                        {errors.rua && <Text>Esse campo e necessário.</Text>}
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
                        {errors.numero && <Text>Esse campo e necessário.</Text>}
                        
                    </View>
                </View>
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
                    {errors.bairro && <Text>Esse campo e necessário.</Text>}
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
                    {errors.uf && <Text>Esse campo e necessário.</Text>}
                    
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
                    {errors.cidade && <Text>Esse campo e necessário.</Text>}
                </View>
            </View>
            <View style={{height:150}}/>
        </ScrollView>
        </SafeAreaView>
    )
}