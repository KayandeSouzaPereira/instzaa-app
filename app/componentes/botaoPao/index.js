import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert, ScrollView, FlatList } from "react-native";
import { theme } from "../../configs";

export default function BotaoPao({callback}){

    const [selecionado, setSelecionado] = useState(false);

    return(
        <View>
        {
            selecionado?
            <TouchableOpacity onPress={() => {Alert.alert("Atenção", "Loren Ipsulum")}} style={{borderRadius: 8,marginVertical: 10,width:150, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.primary80}}>
                <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>Selecionado</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => {setSelecionado(true); callback()}} style={{borderRadius: 8,marginVertical: 10,width:150, height: 34, alignContent: "center", justifyContent: "center", alignItems: "center", backgroundColor: theme.colorsPrimary.primary80}}>
                <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 20, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>Adicionar</Text>
            </TouchableOpacity>
        }
        </View>
    )
}