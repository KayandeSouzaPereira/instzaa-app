import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { theme } from "../../configs";
import { styles } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from "@expo/vector-icons";
import { getCardapioLanches } from "../../servicos/service";
import { PedidoResumo } from "../PedidoResumo";

export default function ModalLanches(){
    const [lanche, setLanche] = useState([]);
    const [itens, setItens] = useState({});
    const [index, setIndex] = useState(0);
    const [component, setComponent] = useState("")
    
    useEffect( () => {
        async function data() {
            _itens = await getCardapioLanches();
            setItens(_itens.data);
        }
        data();
    },[])

    useEffect(() => {
        if(itens.length > 0 ){
            setComponent(getItemLanche());
        }
    }, [itens])

    useEffect(() => {
        if(itens.length > 0 ){
            setComponent(getItemLanche());
        }
    },[index])

    function minus(idx) {
        if(idx > 0) {setIndex(idx-1)}
    }
    function plus(idx){if(idx+1 < itens.length) setIndex(idx+1)}

    function addComponenteLanche(item){
        const _itens = lanche;
        _itens.push(item);
        setLanche(_itens);
    }

    function getItemLanche(){ 
        const item = itens[index];
        return (
            <View style={{flexDirection:"row"}}>

               <TouchableOpacity onPress={() => minus(index)} style={{borderRadius: 8,marginHorizontal: 30,width:34, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.cardColor}}>
                <Entypo  name="chevron-left" size={24}/>
                </TouchableOpacity>

                <View style={{flexDirection: "Column", width: 200, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                    <Image style={{width: 150, height: 150,borderRadius: 15, marginHorizontal: 5,resizeMode: 'cover'}} source={{uri: item.imagem}}/>
                    <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 12, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{item.descricao}</Text>
                    <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                    <TouchableOpacity onPress={() => addComponenteLanche(item)} style={{borderRadius: 8,marginVertical: 10,width:150, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.primary80}}>
                        <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>Adicionar complemento</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => plus(index)} style={{borderRadius: 8,marginHorizontal: 30,width:34, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.cardColor}}>
                    <Entypo name="chevron-right" size={24}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{backgroundColor:'rgba(52, 52, 52, 0.7)', flex: 1, justifyContent:'center', alignItems:'center', bottom: 0, height: 2000}}>
            <View style={{width: 400, height: 800, alignContent: "center", justifyContent: "center", alignItems: "center", bottom: 150, backgroundColor: theme.colorsPrimary.formBackGround}}>
                <ScrollView nestedScrollEnabled={true} style={{width: 380, alignContent: "center"}}>
                <View style={{marginVertical: 10}}><Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign: "center"}}>Monte seu lanche</Text></View>
                <View style={{marginVertical: 10}}>
                    {component}
                </View>
                <View style={{marginVertical: 10}}><Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign: "center"}}>Acompanhamentos</Text></View>
                { lanche.length > 0?
                    <View style={{backgroundColor: theme.colorsPrimary.primary, paddingVertical: 20}}>
                        <PedidoResumo pedidoList={lanche}/>
                    </View>
                    :
                    <></>
                }
                <View></View>
                </ScrollView>
            </View>
        </View>
    )


}