import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { theme } from "../../configs";
import ModalLanches from "../ModalLanches";
import CaixaComentario from "../caixaComentario";

export function CaixaDestaque({ data, callback, isLanche, callbackLanche }) {
  const [modal, setModal] = useState(false);
  const [modalLanche, setModalLanche] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (isLanche) {
            setModalLanche(true);
          } else {
            setModal(true);
          }
        }}>
        <Modal
          visible={modal}
          transparent={true}
          onRequestClose={() => {
            setModal(false);
          }}>
          <View
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.7)",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TouchableOpacity
              onPress={() => {
                setModal(false);
              }}
              style={{ flex: 1, width: 30, height: 30 }}>
              <Entypo
                style={{ flex: 1, top: 30 }}
                name="cross"
                size={30}
                color={theme.colorsPrimary.cardColor}
              />
            </TouchableOpacity>
            <View style={styles.containerModal}>
              {data.imagem ? (
                <Image
                  style={{
                    width: 380,
                    height: 250,
                    borderRadius: 15,
                    marginHorizontal: 5,
                    resizeMode: "cover",
                    marginTop: 15,
                  }}
                  source={{ uri: data.imagem }}
                />
              ) : (
                <></>
              )}
              <Text style={styles.tituloModal}>{data.nome}</Text>
              {
                data.preco?
              <Text style={styles.valorModal}>
                Valor :{" "}
                {data.preco.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              : <></>
              }
              <Text style={styles.descricaoModal}>
                Descrição : {data.descricao}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  callback();
                  setModal(false);
                }}
                style={styles.containerButton}>
                <View style={styles.containerTextButton}>
                  <MaterialIcons
                    style={{ marginHorizontal: 20 }}
                    name="delivery-dining"
                    size={45}
                    color="white"
                  />
                  <Text style={styles.buttonModal}>Adicionar</Text>
                </View>
              </TouchableOpacity>
              <CaixaComentario id={data.id} />
            </View>
          </View>
        </Modal>
        <Modal
          visible={modalLanche}
          transparent={true}
          onRequestClose={() => {
            setModalLanche(false);
          }}>
          <TouchableOpacity
            onPress={() => setModalLanche(false)}
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor: "rgba(52, 52, 52, 0.7)",
            }}>
            <Entypo
              style={{ flex: 1, top: 5 }}
              name="cross"
              size={30}
              color={theme.colorsPrimary.cardColor}
            />
          </TouchableOpacity>
          <ModalLanches callback={callbackLanche}/>
        </Modal>
        {data.imagem ? (
          <Image
            style={{
              width: 380,
              height: 230,
              borderRadius: 15,
              marginHorizontal: 10,
              resizeMode: "cover",
            }}
            source={{ uri: data.imagem }}
          />
        ) : (
          <></>
        )}

        {data.imagem ? (
          <View style={styles.containerTextIMG}>
            <Text style={styles.titulo}>{data.nome}</Text>
            <Text style={styles.descricao}>{data.descricao}</Text>
          </View>
        ) : (
          <View style={styles.containerText}>
            <Text style={styles.titulo}>{data.nome}</Text>
            <Text style={styles.descricao}>{data.descricao}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
