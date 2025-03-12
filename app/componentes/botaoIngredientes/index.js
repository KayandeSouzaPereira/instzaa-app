import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../configs";

export default function BotaoIngredientes({callback, updateComponentes, idItem}){
    const [contagem, setContagem] = useState(0);


    function add() {
        _contagem = contagem + 1;
        setContagem(_contagem);
        updateComponentes(idItem,_contagem)
    }

    function minus() {
        _contagem = contagem - 1;
        setContagem(_contagem);
        updateComponentes(idItem,_contagem)
    }


    return(
        <View>
        {
            contagem >= 1?
            <View style={{flexDirection: "row", width: 150,alignContent: "center", justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity onPress={() => {minus()}} style={{borderRadius: 5,marginVertical: 10,width:30, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.cardColor}}>
                <Ionicons name="remove-outline" />
            </TouchableOpacity>
            <View style={{width: 30, height: 30, backgroundColor: theme.colorsPrimary.cardColor, paddingTop: 5, marginHorizontal: 5}}><Text style={{textAlign:"center"}}>X {contagem}</Text></View>
            <TouchableOpacity onPress={() => {add()}} style={{borderRadius: 5,marginVertical: 10,width:30, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.cardColor}}>
                <Ionicons name="add" />
            </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => {setContagem(1); callback()}} style={{borderRadius: 8,marginVertical: 10,width:150, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.primary80}}>
                <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>Adicionar</Text>
            </TouchableOpacity>
        }
        </View>
    )
}