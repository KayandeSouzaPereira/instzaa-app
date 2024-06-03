import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles'
import { FontAwesome } from '@expo/vector-icons';

export function Botao({funcao, titulo}){

    return(
        <TouchableOpacity style={styles.container}>
           <View style={styles.containerText}>
           <FontAwesome style={{top:5}} name="whatsapp" size={45} color="white" />
            <Text style={styles.text}>{titulo}</Text>
            </View> 
        </TouchableOpacity>
    )

}