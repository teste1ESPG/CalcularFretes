import { useState } from "react"

const Frete = () => {

    //Hooks-useState-Manipula o estado da variavel
    const [distancia,setDistancia]=useState('');
    const [tipoTransporte, setTipoTransporte] = useState('bicicleta');
    const [valorFrete,setValorFrete] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const handleFrete =async(e)=>{
        //previne que o formulario não faça reload
        e.preventDefault();
        setLoading(true);
        setValorFrete(null);
        setError(null);
        //TRATAMENTO DE ERROS COM TRY,CATCH, FINALLY
         try {
            const resp =await fetch("http://localhost:3001/calcularfrete",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({distancia:parseFloat(distancia), tipoTransporte}),
            });
            //validação
            if(!resp.ok){
                const erroDados = await resp.json();
                //Tratamento de erros na aplicação
                throw new Error(erroDados.error || 'Erro ao calcular o frete');
            }
            const data = await resp.json();
            setValorFrete(data.valorTotal);

         }
         catch(erro){
            setError(erro)    
         }
         finally{
            setLoading(false)
         }


    }


  return (
    <div>
        <div>
            <h1>Calculadora de Frete</h1>
            <form onSubmit={handleFrete}>
                <div>
                    <label>Distância(km)</label>
                    <input
                        type="number"
                        id="distancia"
                        value={distancia}
                        min="0"
                        step="0.01"
                        required
                        onChange={(e)=>setDistancia(e.target.value)}
                    />
                </div>
                  <div>
                      <label>Transporte</label>
                      <select
                          id="transport"
                          value={tipoTransporte}
                          onChange={(e) => setTipoTransporte(e.target.value)}
                          >
                        <option value="bicicleta">Bicicleta</option>
                        <option value="carro">Carro</option> 
                        <option value="drone">Drone</option>                     </select>
                  </div>

                  <button type="submit" disabled={loading}>
                    {loading ? "Calculando" : "Calcular"}
                  </button>
            </form>

            {error && <p>{error}</p>}

            {valorFrete !== null && (
                <div>
                    <h2>valor do Frete: R$ {valorFrete}</h2>
                </div>
            )}
        </div>
    </div>
  )
}

export default Frete
