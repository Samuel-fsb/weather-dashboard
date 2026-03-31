import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [Temperatura, SetTemperatura, Cidade, Localização] = useState(25)

  useEffect(() => {
    const DadosAPI = async () => {

      try {
        const Dados = (await fetch(' /* Exemplo de API */ '));
        const Dadosformatados = await Dados.json();
        SetTemperatura(DadosFomatados);
      } catch (error) {
        console.log("Houve um erro ao buscar as informações " + error)
      }

    };

    DadosAPI();

  }, [Cidade]);

  return (
    <>
      
    </>
  )
}

export default App
