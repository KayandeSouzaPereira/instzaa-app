
import { useState } from 'react';
import {ScrollView,View} from 'react-native'
import { PedidoResumoItem } from '../PedidoResumoItem';
import {styles} from './styles'

export function PedidoResumo({pedidoList, callback}){
    const [listPedido, setListPedido] = useState(pedidoList);

    const updateList = async (id) => {
        let pedido = listPedido.filter((item) => item.id != id);
        await setListPedido({});
        await setListPedido(pedido)
        callback(pedido)
    }

    const updateValue = (id, cont) => {
        let _listPedido = listPedido
        for (let i = 0; i < _listPedido.length; i++) {
            if (_listPedido[i].id === id){
                _listPedido[i].contagem = cont;
            }
        }
        setListPedido(_listPedido);
        callback(_listPedido)
    }


    return(
        <View>
            {
            listPedido.length > 0?
            <ScrollView nestedScrollEnabled = {true} style={styles.container}>
                {listPedido.map((item, key) => (
                    <PedidoResumoItem pedidoItem={item} callback={() => updateList(item.id)} valueCall={updateValue} />
                ))} 
            </ScrollView>
            : <></>
        }
        </View>
    )
}