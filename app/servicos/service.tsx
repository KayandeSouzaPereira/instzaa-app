import { api } from "./Util";

  const tk = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXlhbkB0ZXN0LmNvbSIsImlhdCI6MTcyMTQwODQzMywiZXhwIjoxNzIxNjY3NjMzfQ.GF5elSbMuH3VpOOj4J51vTQv4OYHJ97shFy-t2UHhuQ";

  function getCardapio()  {
    const config = {
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tk}`,
      }
    };
    return api.get('cardapio/', config)
    }  
    
    function getItemCardapio(id:number) {
    
        const bodyParameters = {
            id
        };
        return api.post('cardapio/cardapio/', bodyParameters)
    }

    function deleteItemCardapio(id:number) {
    
        const bodyParameters = {
            id
        };
        return api.post('cardapio/deleteCardapioItem', bodyParameters)
    }

    function setItemCardapio(body:any) {
      
      const config = {
        headers: {"Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",}
    };
      
      return api.post('cardapio/saveCardapioItem', body, config)
    }
  

  
 
  
  function getPedidos() {
    return api.get('pedido/listPedido')
    }  

  function getPedidoId(id:number) {
    
      const bodyParameters = {
          id
      };
      return api.post('pedido/findByIDPedido', bodyParameters)
  }

  function deletePedido(id:number) {
  
      const bodyParameters = {
          id
      };
      return api.post('pedido/deletePedido', bodyParameters)
  }

  function savePedido(body:any) {
    
    return api.post('pedido/savePedido', body)
  }


export { getCardapio,getItemCardapio,deleteItemCardapio, setItemCardapio, getPedidos, getPedidoId, deletePedido, savePedido}