import React from "react"
import { useState, useEffect } from "react"
import { View, FlatList, Text, SafeAreaView, ScrollView} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from "../../configs";

import { Cabecario } from "../../componentes/cabecario"
import { CaixaDestaque } from "../../componentes/caixadestaque"
import { CaixaComum } from "../../componentes/caixaitemComum";

import { getCardapio } from '../../servicos/service'

import { styles } from "./styles"

export default function Cardapio({navigation}){

    const [items, setItem] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [promocoes, setPromocoes] = useState([]);
    const [itemsNormais, setItemsNormais] = useState([]);
    const [pedido, setPedido] = useState([]);

    function getDados(){
        let get = false;
        if (get === false){
            getCardapio().then(result => {setItem(result.data); get = true}).catch()
        }
        
    }

    function separaItem(items) {
        destaques.pop();
        promocoes.pop();
        itemsNormais.pop();
        items.forEach((i) => {
             if(i.destaque === true){
                destaques.push(i)
            }
             if(i.promocao === true){
                promocoes.push(i)
            }
            if(i.promocao === false && i.destaque === false){itemsNormais.push(i)}  
        })
    }

    async function updateList(pedidoObj){
       
        let pedidoLs = [];
        pedidoLs = pedido;
        pedidoLs.push(pedidoObj);
        setPedido(pedidoLs);
        await AsyncStorage.setItem('Pedido', JSON.stringify(pedidoLs));
        let pedidoObjTest = await AsyncStorage.getItem("Pedido");
        console.log("PEDIDOS : " + JSON.stringify(pedidoObj))
    }

    useEffect(() => {
        getDados()
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
                            <Text style={styles.textCategoria}>DESTAQUES</Text>
                        </View>
                        <View style={styles.containerDestaque}>
                       
                                { <FlatList
                                    horizontal={true}
                                    data={promocoes}
                                    keyExtractor={item => item.idCardapio}
                                    renderItem={({item}) => (
                                        <CaixaDestaque 
                                        data={item}
                                        />
                                        ) 
                                    }
                                        contentContainerStyle={{ paddingRight: 200, paddingLeft: 0}}
                                        showsHorizontalScrollIndicator={false}
                            /> }
                                <Text style={styles.textCategoria}>PROMOCOES</Text>
                         </View>
                         
                            <View style={[styles.containerItens, {alignContent: 'center', alignItems: 'center'}]}>
                            <Text style={[styles.textCategoriaComun, {textAlign:'left', width: '100%', marginLeft: 200}]}>Nossos Produtos</Text>
                                <ScrollView style={{width: 400, height: 400}} nestedScrollEnabled = {true}>
                                    {
                                     itemsNormais.map((item,key) =>(
                                        <View>
                                        <CaixaComum 
                                            data={item}
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