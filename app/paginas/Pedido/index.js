import { useState, useEffect,useCallback } from "react"
import  {Text, View, ScrollView} from "react-native"
import { WebView } from 'react-native-webview';
import { Cabecario } from "../../componentes/cabecario"
import { PedidoResumo } from "../../componentes/PedidoResumo"
import { FormClient } from "../../componentes/FormCliente"
import { FormPag } from "../../componentes/FormPag"
import { BotaoConcluir } from "../../componentes/botaoConcluir"
import { styles } from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";


export default function Pedido({navigation}){
    const [pedido, setPedido] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [cliente, setCliente] = useState({});
    const [endereco, setEndereco] = useState({}) 
    

    useFocusEffect(
        useCallback(() => {
          setPedido("")
          setValorTotal(0)
          sync()
          return () => {};
        }, [])
    );

    const sync = async() => {
        const _pedido = await AsyncStorage.getItem("Pedido");
        if (_pedido != null && _pedido != undefined){
            setPedido(JSON.parse(_pedido));
            calculaPedido(JSON.parse(_pedido));
        }
    }

    const generatePaymentToken = () => {
        setTokenCard(false);
        setTokenCard(true);
    }

    
    const calculaPedido = (_pedido) => {
        let valor = 0 
        if (_pedido.length > 0){
            for (let i = 0; i < _pedido.length; i++) {
                if (_pedido[i].contagem){
                    valor = _pedido[i].preco * _pedido[i].contagem + valor
                }else{
                    valor = _pedido[i].preco + valor
                }
                
            } 
        }
        setValorTotal(valor)
    }

   
    const updateList = (list) => {
        AsyncStorage.setItem("Pedido", JSON.stringify(list));
        setPedido(list);
        calculaPedido(list);
    }

    const updateCliente = (cliente, endereco) => {
        setCliente(cliente);
        setEndereco(endereco);
    }
   

    return(
        <View style={styles.container}>
            <Cabecario/>
            <View style={styles.containerText}><Text style={styles.text}>Pedido</Text></View>
            <View>
            { valorTotal != 0? <Text style={styles.textTotal}>Total: {valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>: <Text style={styles.textTotal}>Total R$: XXX,XX</Text>}
            <ScrollView nestedScrollEnabled = {true} style={styles.containerBox}>
                {pedido.length>0?
                <View>
                <Text style={styles.textSub}>Pedido:</Text>
                <PedidoResumo pedidoList={pedido} callback={updateList}/>
                <View style={{height:30}}/>
                <Text style={styles.textSub}>Entrega :</Text>
                <View>
                    <FormClient callback={updateCliente}/>
                </View>
                <Text style={styles.textSub}>Pagamento :</Text>
                <View>
                    <FormPag endereco={endereco} cliente={cliente}/>
                </View>
               
                <View style={{marginHorizontal: 50, marginVertical: 30}}>
                <BotaoConcluir callback={generatePaymentToken}/>
                </View>
                </View>
                : 
                <View style={styles.containerTextAviso}><Text style={styles.text}>Ops...{"\n"}Parece que você ainda {"\n"}não fez um pedido.</Text></View>
                } 
            </ScrollView>
            </View>
            
        </View>
    )
    
}