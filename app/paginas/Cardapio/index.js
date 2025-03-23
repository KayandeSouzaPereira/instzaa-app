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

import { getCardapioNoLanches } from '../../servicos/service'

import { styles } from "./styles";
import mockSandwich from "./mock"

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
        getCardapioNoLanches().then(result => {setItem(result.data); get = true}).catch()
    }

    function separaItem(items) {
        setDestaques([])
        setPromocoes([])
        setItemsNormais([])

        let _destaques = []
        let _promocoes = []
        let _normais = []

        _destaques.push(mockSandwich);

        items.forEach((i) => {
             if(i.destaque === true){
                _destaques = destaques
                _destaques.push(i)
            }
             if(i.promocao === true){
                _promocoes = promocoes
                _promocoes.push(i)
                
            }
            else if(i.promocao != true && i.destaque != true){
                _normais = itemsNormais
                _normais.push(i)
            }  
        })

        setDestaques(_destaques)
        setPromocoes(_promocoes)
        setItemsNormais(_normais)
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

    useEffect(() => {console.log(itemsNormais.length)},[itemsNormais])


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
                                        isLanche={item.itemLanche}
                                        callbackLanche={updateList}
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
                         
                            <View style={[styles.containerItensComum, {alignContent: 'center', alignItems: 'center', justifyContent: "center", marginTop: 40}]}>
                            <Text style={[styles.textCategoriaComun, {textAlign:'center', width: '100%'}]}>Nossos Produtos</Text>
                            
                            { <FlatList
                                horizontal={false}
                                data={itemsNormais}
                                keyExtractor={item => item.idCardapio}
                                renderItem={({item}) => (
                                    <View style={{marginVertical: 5}}>
                                        <CaixaComum 
                                        data={item}
                                        callback={() => {updateList(item)}}
                                        callbackLanche={updateList}
                                        />
                                    </View>
                                    ) 
                                }
                                        contentContainerStyle={{paddingBottom: 20, right: 55}}
                                        showsHorizontalScrollIndicator={false}
                            /> }
                            </View>
                            <View style={{height:50}}/>
            </ScrollView>
            </LinearGradient>
        </View >
    )


    
    
}