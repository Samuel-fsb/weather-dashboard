import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [Temperatura, SetTemperatura] = useState(25);
  const [Cidade] = useState();
  const [lon, SetLongitude] = useState(null);
  const [lat, Setlatidude] = useState(null);

  useEffect(() => {
    const DadosAPI = async () => {

    navigator.geolocation.getCurrentPosition = (posicao) => {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;

        SetLongitude(lon);
        Setlatidude(lat);

        console.log(`latitude: ${lat}, Longitude: ${lon}`)
    }, (error) => {
        console.log("Houve um erro ao buscar as suas coordenadas " + error.message)
    };


      try {
        const Dados = (await fetch( `https://api.open-meteo.com/v1/forecast? ${lon}, ${lat}` ));
        const Dadosformatados = await Dados.json();
        SetTemperatura(DadosFomatados);
      } catch (error) {
        console.log("Houve um erro ao buscar as informações " + error)
      }

    };

    DadosAPI();

  }, [Cidade, lat, lon]);

  return (
    <>
      
    </>
  )
}

export default App
