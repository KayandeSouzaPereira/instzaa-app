import { useState, useEffect } from "react"
import {Text,View} from "react-native"
import { Cabecario } from "../../componentes/cabecario"

export default function Pedido({navigation}){


    return(
        <View>
             <Cabecario/>
            <Text>PEDIDOS</Text>
        </View>
    )
    
}