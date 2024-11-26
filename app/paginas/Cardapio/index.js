import React from "react"
import { useState, useEffect, useCallback } from "react"
import { View, FlatList, Text, ScrollView} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from "@react-navigation/native";

import { theme } from "../../configs";

import { Cabecario } from "../../componentes/cabecario"
import { CaixaDestaque } from "../../componentes/caixadestaque"
import { CaixaComum } from "../../componentes/caixaitemComum";

import { getCardapio } from '../../servicos/service'

import { styles } from "./styles";

export default function Cardapio({navigation}){

    const [items, setItem] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [promocoes, setPromocoes] = useState([]);
    const [itemsNormais, setItemsNormais] = useState([]);
    const [pedido, setPedido] = useState([]);


    useFocusEffect(
        useCallback(() => {
            sync();
          return () => {};
        }, [])
    );

    const sync = async () => {
        let _pedido = await AsyncStorage.getItem("Pedido");
        if (JSON.parse(_pedido) != null){
            setPedido(JSON.parse(_pedido))
        }else {
            setPedido([])
        }
    }

    function getDados(){
         getCardapio().then(result => {setItem(result.data); get = true}).catch()
    }

    function separaItem(items) {
        setDestaques([])
        setPromocoes([])
        setItemsNormais([])

        items.forEach((i) => {
             if(i.destaque === true){
                let _destaques = []
                _destaques = destaques
                _destaques.push(i)
                setDestaques(_destaques)
                return 
            }
             if(i.promocao === true){
                let _promocoes = []
                _promocoes = promocoes
                _promocoes.push(i)
                setPromocoes(_promocoes)
                return
            }
            else if(i.promocao != true && i.destaque != true){
                
                let _normais = []
                let _normaisItem = {}
                _normais = itemsNormais
                _normaisItem.i = i.id + 156
                _normaisItem.res = i
                _normais.push(_normaisItem)
                setItemsNormais(_normais)
                return
            }  
        })
    }

    async function updateList(pedidoObj){
        let pedidoLs = [];
        pedidoLs = pedido;
        pedidoLs.push(pedidoObj);
        setPedido(pedidoLs);
        await AsyncStorage.setItem('Pedido', JSON.stringify(pedidoLs));
        navigation.navigate("Pedido");
    }

    useEffect(() => {
        getDados();
    }, []);

    useEffect(() => {
        separaItem(items)
    }, [items]);



    return(
        <View style={styles.container}>
            <LinearGradient
            colors={[theme.colorsPrimary.primary,theme.colorsPrimary.primary90, theme.colorsPrimary.primary80,theme.colorsPrimary.primary90,theme.colorsPrimary.primary]}
            style={styles.container}>
            <ScrollView nestedScrollEnabled = {true}>
                        <Cabecario/>
                        <View style={styles.containerDestaque}>
                        <Text style={styles.textCategoria}>DESTAQUES</Text>
                            { <FlatList
                                horizontal={true}
                                data={destaques}
                                keyExtractor={item => item.idCardapio}
                                renderItem={({item}) => (
                                        <CaixaDestaque 
                                        data={item}
                                        callback={() => {updateList(item)}}
                                        />
                                    ) 
                                }
                                        contentContainerStyle={{ paddingRight: 180, paddingLeft: 0}}
                                        showsHorizontalScrollIndicator={false}
                            /> }
                            
                        </View>
                        <View style={styles.containerDestaque}>
                        <Text style={styles.textCategoria}>PROMOCOES</Text>
                                { <FlatList
                                    horizontal={true}
                                    data={promocoes}
                                    keyExtractor={item => item.idCardapio}
                                    renderItem={({item}) => (
                                        <CaixaDestaque 
                                        data={item}
                                        callback={() => {updateList(item)}}
                                        />
                                        ) 
                                    }
                                        contentContainerStyle={{ paddingRight: 200, paddingLeft: 0}}
                                        showsHorizontalScrollIndicator={false}
                            /> }
                               
                         </View>
                         
                            <View style={[styles.containerItensComum, {alignContent: 'center', alignItems: 'center', marginTop: 40}]}>
                            <Text style={[styles.textCategoriaComun, {textAlign:'left', width: '100%', marginLeft: 300}]}>Nossos Produtos</Text>
                                <ScrollView style={{width: 500, height: 400}} nestedScrollEnabled = {true}>
                                    {
                                     itemsNormais.map((item) =>(
                                        <View>
                                        <CaixaComum 
                                            data={item.res}
                                            callback={() => {updateList(item.res)}}
                                            />
                                        <View style={{height:10}}/>
                                        </View>
                                     ))   
                                    }
                                    
                                </ScrollView>
                            </View>
                            <View style={{height:50}}/>
            </ScrollView>
            </LinearGradient>
        </View >
    )
    
}