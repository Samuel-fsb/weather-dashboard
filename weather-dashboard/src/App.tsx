import { useState, useEffect } from 'react'
import './App.css'

function App() {
  //Craindo as variáveis com estado.
  const [Temperatura, SetTemperatura] = useState();
  const [Localizacao, SetLocalizacao] = useState({cidade: '', estado: '', pais: ''});
  const [lon, SetLongitude] = useState(null);
  const [lat, SetLatitude] = useState(null);
  const [StatusClima, SetStatusClima] = useState('');

  //Tela de carregamento.
  const [Carregamento, SetCarregamento] = useState(false);
  const [BuscarCidade, SetBuscarCidade] = useState(true);

  useEffect(() => {

  //função função assíncrona para buscar os dados de clima.
    const BuscarClima = async (latitude, longitude) => {
      try {
        const Dados = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const DadosFormatados = await Dados.json();
        SetTemperatura(DadosFormatados.current_weather.temperature);
        SetStatusClima(DadosFormatados.current_weather.weathercode);

        if(StatusClima = 0 ){

        }else if(){

        } else {

        };



      } catch (error) {
        console.log("Houve um erro ao buscar os dados " + error);
      } finally{
        SetCarregamento(false);
      };
      
    };
      SetCarregamento(true);

    //Função para buscar a latitude e logitute.
    if(lat === null){
      navigator.geolocation.getCurrentPosition(
        (position) => { SetLatitude(position.coords.latitude);
                        SetLongitude(position.coords.longitude);

                        console.log("Localização capturada com sucesso!");
        
        }, (erro) => { console.log("Houve um erro ao buscar a localização " + erro.message) 
           SetCarregamento(false);
        }
      );
    } else{
      BuscarClima(lat, lon);
    };
    
    SetBuscarCidade(true);

    //Função assíncrona para buscar a localização do usuário.
    const CidadeAtual = async () => {
      try {
        const Localidade = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`)
        const LocalidadeAtual = await Localidade.json();

        //Buscando os dados retornados do objeto e atualizando o estado da variável.
        SetLocalizacao( {
                          cidade: LocalidadeAtual.locality,
                          estado: LocalidadeAtual.principalSubdivision,
                          pais: LocalidadeAtual.countryName,
                        }
            
      )} catch (error) {
        console.log("Houve um erro ao buscar o nome da sua cidade " + error);
      } finally{
        SetBuscarCidade(false);
      }
    };
    
    if(lat !== null){
      CidadeAtual();
    }
    
  }, [lat, lon]);


  return (
    <>
        <div className='AppClima'>
          {Carregamento === true ? <h1>Carregando...</h1> : <h1 className='temperatura-destaque'>{Temperatura}°</h1> }
          {StatusClima}
          {BuscarCidade === true ? <h1>Carregando...</h1> : <h1 className='localizacao'>{Localizacao.cidade} - {Localizacao.estado}, {Localizacao.pais}</h1> }
        </div>
    </>
  )
}

export default App;
