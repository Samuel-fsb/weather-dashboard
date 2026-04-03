import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [Temperatura, SetTemperatura] = useState(25);
  const [Cidade] = useState(null);
  const [lon, SetLongitude] = useState(null);
  const [lat, SetLatitude] = useState(null);
  const [Carregamento, SetCarregamento] = useState(false);

  useEffect(() => {

    const BuscarClima = async () => {
      try {
        const Dados = (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`));
        const DadosFormatados = await Dados.json();
        SetTemperatura(DadosFormatados.current_weather.temperature);
      } catch (error) {
      console.log("Houve um erro ao buscar os dados " + error);
      };

    if(lat === null){
      navigator.geolocation.getCurrentPosition(
        (position) => { SetLatitude(position.coords.latitude);
                        SetLongitude(position.coords.longitude);

                        console.log("Localização capturada com sucesso!");
        
        }, (erro) => { console.log("Houve um erro ao buscar a localização " + erro.message) }
      );
    };

    BuscarClima()
    

  }, [Cidade, lat, lon]);


  return (
    <>
      
    </>
  )
}

export default App
