import React from "react"
import { useState, useEffect } from "react"
import { View, FlatList, Text, SafeAreaView, ScrollView} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Cabecario } from "../../componentes/cabecario"
import { CaixaDestaque } from "../../componentes/caixadestaque"

import { getCardapio } from '../../servicos/service'

import { styles } from "./styles"

export default function Cardapio({navigation}){

    const [items, setItem] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [promocoes, setPromocoes] = useState([]);
    const [itemsNormais, setItemsNormais] = useState([]);

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

    useEffect(() => {
        getDados()
    }, []);

    useEffect(() => {
        separaItem(items)
    }, [items]);


    


    return(
        <View  style={styles.container}>
            <ScrollView>
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
                                        />
                                    ) 
                                }
                                        contentContainerStyle={{ paddingRight: 200, paddingLeft: 70}}
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
                                        />
                                        ) 
                                    }
                                        contentContainerStyle={{ paddingRight: 200, paddingLeft: 70}}
                                        showsHorizontalScrollIndicator={false}
                            /> }
                         </View>
                         
                            <View style={styles.containerDestaque}>
                            <Text style={styles.textCategoria}>Nossos Produtos</Text>
                                { <FlatList
                                    data={itemsNormais}
                                    horizontal={true}
                                    keyExtractor={item => item.idCardapio}
                                    renderItem={({item}) => (
                                            <CaixaDestaque 
                                            data={item}
                                            />
                                        ) 
                                    }
                                            contentContainerStyle={{ paddingRight: 200, paddingLeft: 70}}
                                            showsHorizontalScrollIndicator={false}
                                /> }
                            </View>
            </ScrollView>
        </View >
    )
    
}