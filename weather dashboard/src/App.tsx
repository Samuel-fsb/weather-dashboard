import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [Temperatura, SetTemperatura] = useState(25)
  const [Cidade, Localização] = useState()

  useEffect(() => {

    const Permissao = () => {
      const Dados = navigation.geolocation.getCurrentPosition.window.prompt("É necessário que você conceda a permissão para usarmos a sua localização atual")
    };

    Permissao();

    const DadosAPI = async () => {
      try {
        const Dados = (await fetch('https://weather.com/weather/today/l/5aea1d50a6d6b9e99cf89ba79f463d67dcf21ea5061990aae1ffc1c7fa8911a9'));
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
