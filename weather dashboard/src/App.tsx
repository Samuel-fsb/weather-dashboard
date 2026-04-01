import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [Temperatura, SetTemperatura] = useState(25);
  const [Cidade] = useState();
  const [lon, SetLongitude] = useState(null);
  const [lat, Setlatidude] = useState(null);

  useEffect(() => {
    const DadosAPI = async () => {
    if (lat !== null){
    navigator.geolocation.getCurrentPosition = ((posicao) => {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;

        SetLongitude(lon);
        Setlatidude(lat);

        try {
          const Dados = (await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`));
          const DadosFormatados = await Dados.json();
          SetTemperatura(DadosFormatados);
        } catch (error) {
          console.log("Houve um erro ao buscar as informações " + error)
        }

        console.log(`latitude: ${lat}, Longitude: ${lon}`)
    }, (error) => {
        console.log("Houve um erro ao buscar as suas coordenadas " + error.menssage)
    });



    };

    DadosAPI();
}
  }, [Cidade, lat, lon]);

  return (
    <>
      
    </>
  )
}

export default App
