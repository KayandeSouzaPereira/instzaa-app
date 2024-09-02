import { useState, useEffect } from "react";
import {View, TouchableOpacity} from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AvaliacaoForm() {

    const {avaliacao, setAvalicao} = useState(0);


    const sendAva = () => {
        
    };

    return (
        <View>
            <TouchableOpacity>
                <AntDesign name="star" size={50} color={avaliacao > 0? "yellow" : "black"} />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="star" size={50} color={avaliacao > 1? "yellow" : "black"} />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="star" size={50} color={avaliacao > 2? "yellow" : "black"} />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="star" size={50} color={avaliacao > 3? "yellow" : "black"} />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="star" size={50} color={avaliacao > 4? "yellow" : "black"} />
            </TouchableOpacity>
        </View>
    )
}