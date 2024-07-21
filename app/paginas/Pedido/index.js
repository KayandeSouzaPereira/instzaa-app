import { useState, useEffect } from "react"
import  {Text, View, ScrollView} from "react-native"
import { Cabecario } from "../../componentes/cabecario"
import { PedidoResumo } from "../../componentes/PedidoResumo"
import { FormClient } from "../../componentes/FormCliente"
import { FormPag } from "../../componentes/FormPag"
import { BotaoConcluir } from "../../componentes/botaoConcluir"
import { styles } from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import  mockPedido  from '../../configs/const'
import mockPedidoNoImg from '../../configs/constDebug'
import { theme } from "../../configs"

export default function Pedido({navigation}){

    useEffect(()=> {
        AsyncStorage.setItem('Pedido', JSON.stringify(mockPedido));
    },[])

    return(
        <View style={styles.container}>
            <Cabecario/>
            <View style={styles.containerText}><Text style={styles.text}>Pedido</Text></View>
            <View>
            <Text style={styles.textTotal}>Total R$: XXX,XX</Text>
            <ScrollView nestedScrollEnabled = {true} style={styles.containerBox}>
                <Text style={styles.textSub}>Pedido:</Text>
                <PedidoResumo pedidoList={mockPedido}/>
                <View style={{height:30}}/>
                <Text style={styles.textSub}>Entrega :</Text>
                <View>
                    <FormClient/>
                </View>
                <Text style={styles.textSub}>Pagamento :</Text>
                <View>
                    <FormPag/>
                </View>
                <View style={{marginHorizontal: 50, marginVertical: 30}}>
                <BotaoConcluir/>
                </View>
            </ScrollView>
            </View>
            
        </View>
    )
    
}