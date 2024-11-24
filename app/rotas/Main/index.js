import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { theme } from '../../configs';
import Cardapio from '../../paginas/Cardapio';
import Pedido from '../../paginas/Pedido';
import Contato from '../../paginas/Contato';


const Tab = createBottomTabNavigator();


export default function StackMainNavigation(props){
  
  const [contagem, setContagem] = useState(0);

  const sync = async() => {
    const _pedidoRealizado = await AsyncStorage.getItem("pedidoRealizado");
    if (_pedidoRealizado == null || _pedidoRealizado == {}){
        const _pedido = await AsyncStorage.getItem("Pedido");
        if (_pedido != null && _pedido != undefined){
            calculaPedido(JSON.parse(_pedido));
        }
       
      }
  }


  const calculaPedido = (_pedido) => {
      let valor = 0 
      let cont = 0
      if (_pedido.length > 0){
          for (let i = 0; i < _pedido.length; i++) {
              if (_pedido[i].contagem){
                  valor = _pedido[i].preco * _pedido[i].contagem + valor
                  cont = cont + _pedido[i].contagem
              }else{
                  valor = _pedido[i].preco + valor
                  cont ++
              }
              
          } 
      }
      setContagem(cont)
  }
    
  sync();

    return(
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveBackgroundColor: theme.colorsPrimary.primary80,
        tabBarActiveTintColor: theme.colorsPrimary.heading,
        tabBarInactiveTintColor: theme.colorsPrimary.heading,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          backgroundColor: theme.colorsPrimary.primary90,
          position: 'absolute',
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 10,
          fontFamily: theme.fonts.text2
        },
      })}>
            <Tab.Screen
             name="Cardapio" component={Cardapio} options={{
              headerShown: false,
              tabBarIcon: ({focused, size, color}) => {
                return <MaterialIcons style={styles.Icones} name="restaurant-menu" size={40} color={"white"}  />
              }
            }}

             
             />
            <Tab.Screen name="Pedido" component={Pedido} options={{
              headerShown: false,
              tabBarBadge: contagem,
              tabBarIcon: ({focused, size, color}) => {
                return <AntDesign style={styles.Icones} name="shoppingcart" size={40} color={"white"} />
              }
              }}/>
            <Tab.Screen name="Contato" component={Contato} options={{
              headerShown: false,
              tabBarIcon: ({focused, size, color}) => {
                return <AntDesign  style={styles.Icones} name="customerservice" size={40} color={"white"} />
              }
              }}/>
        </Tab.Navigator>
          
    )
}

const styles = StyleSheet.create({
  container:{
      width: 600,
      height: 100,
      right: 10,
      alignContent: 'flex-start',
  },
  containerIcones:{
      left:35, 
      top: 10, 
      display: 'flex', 
      flexDirection: "row"
  },
  Icones:{
      marginHorizontal: 40
  }
})
