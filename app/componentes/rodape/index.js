import {View, TouchableOpacity} from 'react-native';
import {styles} from './styles'
import { Entypo, MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { theme } from '../../configs';

export function Rodape({navigation}){


    return(
        <View style={styles.container}>
            <View style={styles.containerIcones}>
                <TouchableOpacity onPress={() => {navigation.navigate("Cardapio")}}>
                    <Entypo style={styles.Icones} name="menu" size={40} color={theme.colorsPrimary.forthary}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate("Pedido")}}>
                    <MaterialIcons style={styles.Icones} name="request-page" size={40} color={theme.colorsPrimary.forthary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate("Contato")}}>
                    <AntDesign  style={styles.Icones} name="customerservice" size={40} color={theme.colorsPrimary.forthary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}