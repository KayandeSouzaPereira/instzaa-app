import { useState, useEffect } from "react"
import  {Text, View, StatusBar} from "react-native"
import { Cabecario } from "../../componentes/cabecario"
import { Box } from "../../componentes/box"
import { styles } from "./styles"
import { theme } from "../../configs"

export default function Contato({navigation}){


    return(
        <View style={styles.container}>
            <Cabecario/>
            <View style={styles.containerText}><Text style={styles.text}>Pedido</Text></View>
            <View style={styles.containerBox}><Box/></View>
            
        </View>
    )
    
}