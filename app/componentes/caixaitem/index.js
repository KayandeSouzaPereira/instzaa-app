import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles'

export function CaixaItem({data, callback}){

    return(
        <View style={styles.container}>
            <TouchableOpacity >
                {   data.image ?
                    <Image/>
                    : 
                    <></>
                }
                
                <View style={styles.containerText}>
                    <Text style={styles.titulo}>{data.nome}</Text>
                    <Text style={styles.descricao}>{data.descricao}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}