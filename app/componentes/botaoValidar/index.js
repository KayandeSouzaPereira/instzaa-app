import { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles'
import { MaterialIcons } from '@expo/vector-icons';

export function BotaoValidar({callback, valid}){


    return(
        <View>
        { valid ?
            <TouchableOpacity onPress={() => callback()} style={styles.container}>
           <View style={styles.containerText}>
           <MaterialIcons style={{top:0}} name="check" size={35} color="white" />
            <Text style={styles.text}>Verificar cartão</Text>
            </View> 
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => Alert.alert("Aviso !", "Complete o campo de informações do cartão antes de validar as informações")} style={styles.containerOff}>
           <View style={styles.containerText}>
           <MaterialIcons style={{top:3}} name="clear" size={35} color="white" />
            <Text style={styles.text}>Complete o cartão</Text>
            </View> 
        </TouchableOpacity>
        }
        </View>
    )

}