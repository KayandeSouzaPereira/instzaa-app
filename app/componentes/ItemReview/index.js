import { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { theme } from "../../configs";


export default function ItemReview({item, callback}){
    const [selected, setSelected] = useState(false);

    function sync(){
        setSelected(!selected)
        
    }
    
              return (
                  <TouchableOpacity onPress={() => sync()} style={selected ? {flexDirection:"row", marginVertical: 10, backgroundColor: theme.colorsPrimary.primary} : {flexDirection:"row", marginVertical: 10}}>
                      <View style={{flexDirection: "row", width: 180, marginHorizontal: 20, alignItems: "center"}}>
                          <Image style={{width: 150, height: 150,borderRadius: 15, marginHorizontal: 10,resizeMode: 'cover'}} source={{uri: item.imagem}}/>
                          <View style={{flexDirection:"column", marginHorizontal: 20}}>
                              <Text style={{color:theme.colorsPrimary.cardColor, fontSize: 12, fontFamily: theme.fonts.subtitle, textAlign:"center"}}>{item.nome}</Text>
                          </View>
                      </View>
                  </TouchableOpacity>
              )
}