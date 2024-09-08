import { useState, useEffect } from "react";
import {View, TouchableOpacity, Text, Alert} from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { setAvalicaoPedido } from "../../servicos/service";
import { style } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AvaliacaoForm({idPedido}) {

    const [avaliacao, setAvaliacao] = useState(0);


    const sendAva = async () => {
        const avaliacaoobj = {};
        avaliacaoobj.idPedido = idPedido;
        avaliacaoobj.avaliacao = avaliacao
        const avalia = await setAvalicaoPedido(avaliacaoobj);
        if (avalia.status == 200){
            Alert.alert("Sucesso.", "Somos gratos pela sua avaliação !")
            AsyncStorage.clear();
        }

    };

    return (
        <View style={style.containerAvaliacaoGroup}>
            <View style={style.containerAvaliacao}>
                <TouchableOpacity onPress={() => setAvaliacao(1)}>
                    <AntDesign name="star" size={50} color={avaliacao > 0? "yellow" : "black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAvaliacao(2)}>
                    <AntDesign name="star" size={50} color={avaliacao > 1? "yellow" : "black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAvaliacao(3)}>
                    <AntDesign name="star" size={50} color={avaliacao > 2? "yellow" : "black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAvaliacao(4)}>
                    <AntDesign name="star" size={50} color={avaliacao > 3? "yellow" : "black"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAvaliacao(5)}>
                    <AntDesign name="star" size={50} color={avaliacao > 4? "yellow" : "black"} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => sendAva()} style={style.buttonAvalicao}>
                <Text style={style.textAvalicao}>Enviar avaliação do pedido.</Text>
            </TouchableOpacity>
        </View>
    )
}