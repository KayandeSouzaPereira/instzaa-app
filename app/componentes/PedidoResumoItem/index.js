import { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import {styles} from './styles'


export function PedidoResumoItem({pedidoItem, callback}){
    const [item, setItem] = useState({});
    const [contItens, setContItens] = useState(1);
    const [value, setValue] = useState(0);
    const [defvalue, setDefValue] = useState(0);
   
    const Minus = () => {
        if (contItens > 0){
            let cont = contItens;
            setContItens(cont - 1);
        }
    }
    const Plus = () => {
        let cont = contItens;
        setContItens(cont + 1);
    }

    useEffect(() => {
        setItem(pedidoItem);
        setValue(pedidoItem.preco);
        setDefValue(pedidoItem.preco);
    },[])

    useEffect(() => {
        if(contItens>0 && defvalue>0){
            setValue(defvalue*contItens)
        }
    },[contItens])

    return (
        <View style={styles.containerItem}>
            <Image style={{width: 120, height: 120,borderRadius: 15, marginHorizontal: 5,resizeMode: 'cover'}} source={{uri: item.imagem}}></Image>
            <View style={{flexDirection: 'column', width: 200}}>
                <Text style={styles.text}>{item.nome}</Text>
                <Text style={styles.text}>R$: {value}</Text>
                <View style={styles.controleItemPedido}>
                    <TouchableOpacity onPress={Plus} style={styles.trash}>
                    <Ionicons style={styles.trash} name="add" size={24}/>
                    </TouchableOpacity>
                    <View style={styles.cont}>
                        <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>{contItens}</Text>
                    </View>

                    
                    {
                    contItens>1?
                    <TouchableOpacity onPress={Minus} style={styles.trash}>
                    <Ionicons style={styles.trash} name="remove-outline" size={24}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={callback} style={styles.trash}>
                    <Entypo style={styles.trash} name="trash" size={20} />
                    </TouchableOpacity>
                    } 
                </View>
            </View>
        </View>
    )
}