// IMPORTAR O MODULO EXPRESS
const express = require('express');
// MODULO QUE PERMITE QUE O SERVIDOR ACEITE REQUISIÇÕES DIFERENTES (DOMINIOS) 
const cors= require('cors');

// Instanciando express para app
const app = express(); 

//DEFININDO A PORTA QUE O SERVIDOR VAI EXECUTar
const port= 3001;

//Configura o express para analisar as requisiçôes com o corpo no formato json, 
// isso é necessario para ler os dados enviados  no corpo da requisição POST
app.use(express.json());

//habilita o CORS para  todas as rotas da aplicação, perm
app.use(cors());

//objeto(tabela com os preços)
const precos={
    bicicleta:0.75, // preço por km para bicicleta
    carro:0.25, // preço por km para carro
    drone: 1.20, // preço por km para drone

}

// Definindo uma rota de API tipo POST
// funçao de callback lida com requisição

app.post('/calcularfrete',(req,res)=>{
    //destruct para o corpo da requisição e extrair distancia e tipoTransporte
    const{distancia,tipoTransporte}=req.body;

    // verifica se a distancia ou tipoTransporte não foram fornecidos
    if(distancia === undefined || tipoTransporte === undefined){
        return res.status(400).sjom({error: 'Distancia e tipo de transporte são obrigatorios'})
    }

    // busca preco por km no objeto convertendo o tipo de transporte para minusculo
    const precoPorKm = precos[tipoTransporte.toLowerCase()];

    //verifica se o tipotransporte fonecido existe na tabela de preços
    if(precoPorKm === undefined){
        return res.status(400).json({error: "tipo de transporte invalido"})
    }

//calcula o valor total do frete multiplicando a distancia pelo preço por km
    const valorTotal= distancia * precoPorKm
    // ENVIA a resposta com o objeto JSON
    // toFixed - formata o valor total para ter exatamente duas casas decimais
    res.json({valorTotal: valorTotal.toFixed(2)});
})

// INICIA O SERVIDOR PARA QUE ELE COMECE A ESCUTAR AS REQUISICOES
app.listen(port,()=>{
    console.log(`Servidor Rodando na porta http://localhost:${port}`);

})