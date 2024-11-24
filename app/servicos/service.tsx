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
  
    async function setPagamentoPix(pagamento)  {
      let tk = await getToken();
      let data = {
        cpf: pagamento.Cpf,
        nome: pagamento.Nome,
        valor: pagamento.Valor
      }
      const body = JSON.stringify(data)
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tk}`,
        }
      };
      return api.post('pagamento/criarPagamento', body, config);
    }  

    async function setPagamentoCartao(pagamento)  {
      let tk = await getToken();
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tk}`,
        }
      };
      return api.post('pagamento/criarPagamentoCartao', pagamento, config);
    }  

    async function setPedidoEnvio(pedido)  {
      let tk = await getToken();
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tk}`,
        }
      };
      return api.post('pedido', pedido, config);
    }  

    async function setUpdatePedidoEnvio(pedido, id)  {
      let tk = await getToken();
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tk}`,
        }
      };
      return api.put(`pedido/${id}`, pedido, config);
    } 

    async function getPedido(id)  {
      let tk = await getToken();
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tk}`,
        }
      };
      return api.get(`pedido/${id}`, config)
      } 

    async function validPix(id)  {
      let tk = await getToken();
      const config = {
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tk}`,
        }
      };
      return api.get(`pagamento/checkPix/${id}`, config)
      } 

      async function getEmpresa()  {
        let tk = await getToken();
        const config = {
          headers: {
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tk}`,
          }
        };
        return api.get(`/empresa/`, config)
        } 

        async function setAvalicaoPedido(avaliacao)  {
          let tk = await getToken();
          const config = {
            headers: {
              "Cache-Control": "no-cache",
              "Access-Control-Allow-Origin": "*",
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tk}`,
            }
          };
          return api.post('avaliacao', avaliacao, config);
        }  



export { getCardapio,setPagamentoPix, setPagamentoCartao, 
  getEndereco, setPedidoEnvio, setUpdatePedidoEnvio,
  validPix, getEmpresa, getPedido,setAvalicaoPedido}