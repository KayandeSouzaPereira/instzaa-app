import { useState, useEffect } from "react"
import  {Text, View, StatusBar} from "react-native"
import { Cabecario } from "../../componentes/cabecario"
import { theme } from "../../configs"

export default function Contato({navigation}){


    return(
        <View>
            <Cabecario/>
            <Text>CONTATO</Text>
        </View>
    )
    
}