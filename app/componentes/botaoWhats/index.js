import {Text, View, TouchableOpacity, Image, Linking} from 'react-native';
import {styles} from './styles'
import { FontAwesome } from '@expo/vector-icons';

export function BotaoWhats({numero, titulo}){

    return(
        <TouchableOpacity onPress={() => Linking.openURL('whatsapp://send?text=Olá estou de contatando ...&phone=+55'+ numero)} style={styles.container}>
           <View style={styles.containerText}>
           <FontAwesome style={{top:5}} name="whatsapp" size={45} color="white" />
            <Text style={styles.text}>{titulo}</Text>
            </View> 
        </TouchableOpacity>
    )

}