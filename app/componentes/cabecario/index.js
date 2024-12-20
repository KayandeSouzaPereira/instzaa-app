import {Text, View, StatusBar, Image} from 'react-native';
import {styles} from './styles'
import { theme } from '../../configs';

export function Cabecario({}){


    return(
      <View styles={styles.container}>
        <StatusBar backgroundColor={theme.colorsPrimary.secondary100} barStyle="light-content" translucent={true}/>
            <View
                style={{
                    width: '100%',
                    height: 75,
                    padding: 10,
                    backgroundColor: theme.colorsPrimary.secondary100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{fontFamily: theme.fonts.title2, fontSize: 15, color: 'white', top:10}}>Instzaa</Text>
            </View>
      </View>
    )
}