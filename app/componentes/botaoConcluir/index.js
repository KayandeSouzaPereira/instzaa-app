import {Text, View, TouchableOpacity, Image, Linking} from 'react-native';
import {styles} from './styles'
import { MaterialIcons } from '@expo/vector-icons';

export function BotaoConcluir({callback}){

    return(
        <TouchableOpacity onPress={() => console.log("OK")} style={styles.container}>
           <View style={styles.containerText}>
           <MaterialIcons style={{top:5}} name="delivery-dining" size={45} color="white" />
            <Text style={styles.text}>Pagamento</Text>
            </View> 
        </TouchableOpacity>
    )

}