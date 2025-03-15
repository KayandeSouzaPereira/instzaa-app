import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { theme } from "../../configs";
import { getComentarios, setComentario } from "../../servicos/service";
import { style } from "./styles";
import AvaliacaoEstrelas from "../AvaliacaoEstrelas";
import AvaliacaoForm from "../AvaliacaoForm";

export default function CaixaComentario({ id, comentario }) {
  const [listaComentarios, setListaComentarios] = useState({});
  const [comentarioEditado, setComentarioEditado] = useState();
  const [comentarioTexto, setComentarioTexto] = useState();

  useEffect(() => {
    async function data() {
      let _listaComentarios = await getComentarios(id);
      setListaComentarios(_listaComentarios.data);
    }
    if (comentario) {
      setComentarioEditado(comentario);
      setComentarioTexto(comentario.comentario);
    } else {
      data();
    }
  }, []);

  function ElementoComentario(_comentario) {
    let data = new Date(_comentario.dataComentario).toLocaleDateString("pt-br");
    return (
      <View
        style={{
          marginVertical: 10,
          height: 150,
          backgroundColor: theme.colorsPrimary.primary90,
          borderRadius: 5,
          padding: 8,
        }}>
        <AvaliacaoEstrelas nota={_comentario.nota} />
        <View style={{ height: 70 }}>
          <Text style={{ fontSize: 16, color: "#ffffff", marginHorizontal: 5 }}>
            {_comentario.comentario}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 5,
          }}>
          <Text style={{ fontSize: 16, color: theme.colorsPrimary.forthary }}>
            {_comentario.nomeComentario}
          </Text>

          <Text style={{ fontSize: 16, color: theme.colorsPrimary.forthary }}>
            {data}
          </Text>
        </View>
      </View>
    );
  }

  async function sendComentario(avaliacao) {
    _comentario = comentarioEditado;
    _comentario.nota = avaliacao;
    _comentario.comentario = comentarioTexto;

    const response = await setComentario(_comentario);
    if (response) {
      Alert.alert("Atenção!", "Comentário enviado com sucesso");
    }
  }

  return (
    <>
      {comentario ? (
        <View>
          <View style={style.listaComentarios}>
            <Text style={{ color: "#ffffff" }}>
              {comentario.nomeComentario}
            </Text>
            <TextInput
              onChangeText={(e) => {
                setComentarioTexto(e);
              }}
              value={comentarioTexto}
              color="#ffffff"
              placeholder="Comentário"
              placeholderTextColor="#ffffff"
              multiline
              maxLength={250}
              style={{ width: 300 }}
            />
            <AvaliacaoForm callback={sendComentario} />
          </View>
        </View>
      ) : (
        <>
          <Text style={{ color: "#ffffff", height: 50, fontSize: 18 }}>
            Comentários
          </Text>
          <FlatList
            style={style.listaComentarios}
            data={listaComentarios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => ElementoComentario(item)}
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </>
  );
}
