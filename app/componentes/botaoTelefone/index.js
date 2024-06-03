import {Text, View, TouchableOpacity, Linking} from 'react-native';
import {styles} from './styles'
import { Feather } from '@expo/vector-icons';

export function BotaoTelefone({numero, titulo}){

    return(
        <TouchableOpacity onPress={() => Linking.openURL('tel:55'+ numero)} style={styles.container}>
           <View style={styles.containerText}>
           <Feather style={{top:10}} name="phone" size={40} color="white" />
            <Text style={styles.text}>{titulo}</Text>
            </View> 
        </TouchableOpacity>
    )

}