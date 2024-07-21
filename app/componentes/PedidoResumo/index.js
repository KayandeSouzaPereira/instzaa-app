
import { useState } from 'react';
import {ScrollView} from 'react-native'
import { PedidoResumoItem } from '../PedidoResumoItem';
import {styles} from './styles'

export function PedidoResumo({pedidoList}){
    
    const [listPedido, setListPedido] = useState(pedidoList[0].resumoPedido);

    const updateList = (id) => {
        let pedido = listPedido.filter((item) => item.id != id);
        setListPedido(pedido);
    }


    return(
        <ScrollView nestedScrollEnabled = {true} style={styles.container}>
           {listPedido.map((item) => (
                <PedidoResumoItem pedidoItem={item} callback={() => updateList(item.id)} />
            ))}
        </ScrollView>
    )
}