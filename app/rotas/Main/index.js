import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';


import { theme } from '../../configs';
import Cardapio from '../../paginas/Cardapio';
import Pedido from '../../paginas/Pedido';
import Contato from '../../paginas/Contato';


const Tab = createBottomTabNavigator();


export default function StackMainNavigation(props){
   

    

    return(
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveBackgroundColor: theme.colorsPrimary.highlight,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          backgroundColor: theme.colorsPrimary.highlight,
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
      backgroundColor: theme.colorsPrimary.highlight,
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
