import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [Temperatura, SetTemperatura] = useState(25);
  const [Cidade] = useState();
  const [lon, SetLongitude] = useState(null);
  const [lat, Setlatidude] = useState(null);

  useEffect(() => {
    if (lat !== null || lon !== null){
      navigator.geolocation.getCurrentPosition((posicao) => {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;
        
        SetLongitude(lon);
        Setlatidude(lat);

        console.log(`latitude: ${lat}, Longitude: ${lon}`)
      }, (error) => {
          console.log("Houve um erro ao buscar as suas coordenadas " + error.menssage);

      } else {
      const DadosAPI = async () => {
        try {
          const Dados = (await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`));
          const DadosFormatados = await Dados.json();
          SetTemperatura(DadosFormatados);
        } catch (error) {
          console.log("Houve um erro ao buscar as informações " + error)
        }
        DadosAPI();
      }
    }
  }, [Cidade, lat, lon]);

  return (
    <>
      
    </>
  )
}

export default App
