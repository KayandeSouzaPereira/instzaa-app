import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { theme } from "../../configs";
import { getComentarios } from "../../servicos/service";
import { style } from "./styles";
import AvaliacaoEstrelas from "../AvaliacaoEstrelas";

export default function CaixaComentario({ id, comentario }) {
  const [listaComentarios, setListaComentarios] = useState({});
  const [comentarioEditado, setComentarioEditado] = useState({});
  const [nota, setNota] = useState(0);
  const [textoComentario, setTextoComentario] = useState("");

  useEffect(() => {
    async function data() {
      let _listaComentarios = await getComentarios(id);
      setListaComentarios(_listaComentarios.data);
    }
    data();
  }, []);

  function ElementoComentario(comentario) {
    let data = new Date(comentario.dataComentario).toLocaleDateString("pt-br");
    return (
      <View
        style={{
          marginVertical: 10,
          height: 150,
          backgroundColor: theme.colorsPrimary.primary90,
          borderRadius: 5,
          padding: 8,
        }}>
        <AvaliacaoEstrelas nota={comentario.nota} />
        <View style={{ height: 70 }}>
          <Text style={{ fontSize: 16, color: "#ffffff", marginHorizontal: 5 }}>
            {comentario.comentario}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 5,
          }}>
          <Text style={{ fontSize: 16, color: theme.colorsPrimary.forthary }}>
            {comentario.nomeComentario}
          </Text>

          <Text style={{ fontSize: 16, color: theme.colorsPrimary.forthary }}>
            {data}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <>
      {comentario ? (
        <View>
          <View style={style.listaComentarios}>
            <Text style={{ fontSize: 32 }}>Data: {}</Text>
            <Text style={{ fontSize: 32 }}>Nome: {}</Text>
            <Text style={{ fontSize: 32 }}>Comentário: {}</Text>
            <Text style={{ fontSize: 32 }}>Nota: {}</Text>
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
