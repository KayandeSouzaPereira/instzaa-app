import { StyleSheet } from "react-native";
import { theme } from "../../configs";

export const style = StyleSheet.create({
  listaComentarios: {
    width: 350,
    backgroundColor: theme.colorsPrimary.secondary120,
    bottom: 10,
    height: 220,
    borderRadius: 10,
  },
  bodyCadastroComentario: {
    width: 350,
    backgroundColor: theme.colorsPrimary.secondary120,
    top: 30,
    height: 280,
    borderRadius: 10,
  },
});
