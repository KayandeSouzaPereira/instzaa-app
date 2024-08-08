import { api, apiCEP } from "./Util";

 


  function getEndereco(cep) {
    return apiCEP.get(cep + "/json/")
  }

  async function getToken()  {
    const config = {
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      }
    };
    const body = {
        "email": "instzaa@app.com",
        "password": "Instzaa@834"
      }
    return api.post('/auth/login',body, config).then(res => {return res.data.token})
    }  


  async function getCardapio()  {
    let tk = await getToken();
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


export { getCardapio,getItemCardapio,deleteItemCardapio, setItemCardapio, getPedidos, getPedidoId, deletePedido, savePedido, getEndereco}