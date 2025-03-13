import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { style } from "./styles";

export default function AvaliacaoEstrelas({ nota }) {
  const [avaliacao, setAvaliacao] = useState(nota);

  return (
    <View style={style.containerAvaliacaoGroup}>
      <View style={style.containerAvaliacao}>
        <TouchableOpacity>
          <AntDesign
            name="star"
            size={20}
            color={avaliacao > 0 ? "yellow" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="star"
            size={20}
            color={avaliacao > 1 ? "yellow" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="star"
            size={20}
            color={avaliacao > 2 ? "yellow" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="star"
            size={20}
            color={avaliacao > 3 ? "yellow" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="star"
            size={20}
            color={avaliacao > 4 ? "yellow" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
