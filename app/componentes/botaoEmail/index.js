import {Text, View, TouchableOpacity, Linking} from 'react-native';
import {styles} from './styles'
import { Entypo } from '@expo/vector-icons';

export function BotaoEmail({email, titulo}){

    return(
        <TouchableOpacity onPress={() => Linking.openURL("mailto:" + email + " ?subject=Estou entrando em Contato pelo app&body=Olá estou entrando em contato pelo App e preciso de ajuda... &")} style={styles.container}>
           <View style={styles.containerText}>
           <Entypo style={{top:5}} name="mail" size={45} color="white" />
            <Text style={styles.text}>{titulo}</Text>
            </View> 
        </TouchableOpacity>
    )

}