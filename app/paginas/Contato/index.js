import { useState, useEffect } from "react"
import  {Text, View, StatusBar} from "react-native"
import { Cabecario } from "../../componentes/cabecario"
import { styles } from "./styles"
import { Box } from "../../componentes/box"
import { getEmpresa } from "../../servicos/service"

export default function Contato({navigation}){
    
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [email, setEmail] = useState("")

    const data = async () => {
        const res = await getEmpresa();
        setEndereco(res.data.enderecoEstabelecimento);
        setNumero(res.data.numeroAtendimento);
        setEmail(res.data.email);
    }

    data();


    return(
        <View style={styles.container}>
            <Cabecario/>
            <View style={styles.containerText}><Text style={styles.text}>Fale conosco</Text></View>
            <View style={styles.containerBox}><Box endereco={endereco} numero={numero} email={email}/></View>
            
        </View>
    )
    
}