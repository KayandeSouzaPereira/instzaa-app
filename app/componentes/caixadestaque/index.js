import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles'

export function CaixaDestaque({data, callback}){
    return(
        <View style={styles.container}>
            <TouchableOpacity >
            {   data.imagem ?
                    <Image style={{width: 250, height: 120,borderRadius: 15, marginHorizontal: 5,resizeMode: 'cover'}}  source={{uri: data.imagem}}/>
                    : 
                    <></>
                }
                
                {   data.imagem ?
                   <View style={styles.containerTextIMG}>
                   <Text style={styles.titulo}>{data.nome}</Text>
                   <Text style={styles.descricao}>{data.descricao}
                   </Text>
               </View>
                    : 
                    <View style={styles.containerText}>
                    <Text style={styles.titulo}>{data.nome}</Text>
                    <Text style={styles.descricao}>{data.descricao}
                    </Text>
                </View>
                }
                
            </TouchableOpacity>
        </View>
    )

}