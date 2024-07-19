
import { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {styles} from './styles'

export function PedidoResumo({pedidoList, callback}){

    const [listPedido, setListPedido] = useState(pedidoList[0]);

    const pedidos = Object.keys(listPedido.resumoPedido).map(key =>
        <View style={styles.containerItem}>
            <Image style={{width: 120, height: 120,borderRadius: 15, marginHorizontal: 5,resizeMode: 'cover'}} source={{uri: listPedido.resumoPedido[key].imagem}}></Image>
            <View><Text style={styles.text}>{listPedido.resumoPedido[key].nome}</Text>
            <Text style={styles.text}>R$: {listPedido.resumoPedido[key].preco}</Text>
            </View>
        </View>
    )

    return(
        <ScrollView nestedScrollEnabled = {true} style={styles.container}>
            {pedidos}
        </ScrollView>
    )
}