
import { useState } from 'react';
import {ScrollView} from 'react-native'
import { PedidoResumoItem } from '../PedidoResumoItem';
import {styles} from './styles'

export function PedidoResumo({pedidoList}){
    
    const [listPedido, setListPedido] = useState(pedidoList[0].resumoPedido);

    const updateList = async (id) => {
        let pedido = listPedido.filter((item) => item.id != id);
        await setListPedido([]);
        await setListPedido(pedido)
    }


    return(
        <ScrollView nestedScrollEnabled = {true} style={styles.container}>
           {listPedido.map((item, key) => (
                <PedidoResumoItem pedidoItem={item} callback={() => updateList(item.id)} />
            ))}
        </ScrollView>
    )
}