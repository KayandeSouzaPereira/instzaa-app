

import { useEffect, useState } from 'react';
import {View,TextInput,Text,SafeAreaView, ScrollView} from 'react-native'
import Cartao from '../cartao';
import { RadioButton } from 'react-native-paper';
import {styles} from './styles'


export function FormPag({pedidoList}){
    const [pix, setPix] = useState(false);
    const [selectedValue, setSelectedValue] = useState('pix');
   

    return(
    <SafeAreaView>
       
            <ScrollView nestedScrollEnabled = {true} style={styles.container}>
                <View style={styles.viewCamp}>
                    <Text style={styles.textCamp}>Methodo de Pagamento</Text>
                </View>
                <View style={styles.viewCampOPT}>
                <RadioButton.Group
                    onValueChange={(value) => setSelectedValue(value)}
                    value={selectedValue}
                    size={24}
                    thickness={2} 
                    style={{flexDirection: 'row'}}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="pix" color="blue" />
                    <Text style={styles.textCamp}>PIX</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="debito" color="blue" />
                    <Text style={styles.textCamp}>Debito</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="credito" color="blue" />
                    <Text style={styles.textCamp}>Credito</Text>
                    </View>
                </RadioButton.Group>
                </View>
                {selectedValue!="pix"?
                            <Cartao />
                        :<></>
                }
                
           </ScrollView>    
        </SafeAreaView>
    )
}