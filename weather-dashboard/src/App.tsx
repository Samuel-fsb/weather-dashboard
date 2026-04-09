import { useState, useEffect } from 'react'
import './App.css'


interface DadosLocalizacao{
  cidade: string;
  estado: string;
  pais: string;
};

function App() {
  //Craindo as variáveis com estado.
  const [Temperatura, SetTemperatura] = useState<number | null>(null);
  const [Localizacao, SetLocalizacao] = useState<DadosLocalizacao>({cidade: '', estado: '', pais: ''});
  const [lon, SetLongitude] = useState<number | null>(null);
  const [lat, SetLatitude] = useState<number | null >(null);
  const [StatusClima, SetStatusClima] = useState("Carregando Status do Clima...");
  const [HorarioDia, SetHorarioDia] = useState<string | null>(null);
  const [Menu, SetMenu] = useState (false);

  
  //Função para alerta de clima.
  const AlertaClima = (StatusClima: number) => {
  if(StatusClima === 0 ) return "Céu Limpo ☀️. O dia está perfeito para fazer atividades ao ar livre! 👟";
  if(StatusClima >= 1 && StatusClima <= 3) return "Nublado ⛅. Um clima ameno, ideal para focar nos estudos ou trabalho. 📚";
  if(StatusClima >= 45 && StatusClima <= 48) return "Nevoeiro 🌫️. Cuidado na estrada, a visibilidade está baixa! 🚗.";
  if(StatusClima >= 51 && StatusClima <= 55) return "Garoa 🌦️. Uma garoa fina lá fora. Um leve casaco basta! 🧥";
  if(StatusClima >= 61 && StatusClima <= 65) return "Chuva 🌧️. Melhor levar um guarda-chuva e preparar um café quente! ☕";
  if(StatusClima >= 71 && StatusClima <= 77) return "Neve ❄️. Agasalhe-se bem, o frio está intenso! 🧣";
  if(StatusClima >= 95 && StatusClima <= 99) return "Tempestade ⛈️. Fique em um local seguro e evite sair. 🏠";
  return "Clima Desconhecido";
  }

  //Tela de carregamento.
  const [Carregamento, SetCarregamento] = useState(false);
  const [BuscarCidade, SetBuscarCidade] = useState(true);
  
  //Função para mudar as classes do CSS dinamicamente.
  const Periodo = (HorarioTexto: string ,HorarioDia: number) => {
      const HoraAtual = new Date(HorarioTexto).getHours();

      if(HorarioDia === 0 && HorarioDia ) return "noite";
      if(HoraAtual >= 12 && HoraAtual < 18) return "tarde";
      return "dia";
  };

  useEffect(() => {

  //função função assíncrona para buscar os dados de clima.
    const BuscarClima = async (latitude:number, longitude:number) => {
      try {
        const Dados = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const DadosFormatados = await Dados.json();
        SetTemperatura(DadosFormatados.current_weather?.temperature);
        SetStatusClima(AlertaClima(DadosFormatados.current_weather?.weathercode ?? 0));
        SetHorarioDia(Periodo(DadosFormatados.current_weather.time ?? "",
                              DadosFormatados.current_weather?.is_day ?? 0));
      } catch (error) {
        console.log("Houve um erro ao buscar os dados " + error);
      } finally{
        SetCarregamento(false);
      };
      
    };
      SetCarregamento(true);

    //Função para buscar a latitude e logitute.
    if(lat === null && lon === null){
      navigator.geolocation.getCurrentPosition(
        (position) => { SetLatitude(position.coords.latitude);
                        SetLongitude(position.coords.longitude);

                        console.log("Localização capturada com sucesso!");
        
        }, (erro) => { console.log("Houve um erro ao buscar a localização " + erro.message) 
           SetCarregamento(false);
        }
      );
    } else{
        if(lat !== null && lon !== null)
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
                          cidade: LocalidadeAtual.locality ?? '',
                          estado: LocalidadeAtual.principalSubdivision ?? '',
                          pais: LocalidadeAtual.countryName ?? '',
                        }
            
      )} catch (error) {
        console.log("Houve um erro ao buscar o nome da sua cidade " + error);
      } finally{
        SetBuscarCidade(false);
      }
    };
    
    if(lat !== null && lon !== null){
      CidadeAtual();
    }
    
  }, [lat, lon]);


  //Função para abrir e fechar o menu
  const MudarMenu = () => {
      SetMenu(!Menu);
  };




  return (
        <div className={`AppClima ${HorarioDia}`}>
          <header className='Menu'>
            <div className='Logo'>
              <img src="" alt="" />
            </div>

            <div className='Menu' onClick={MudarMenu}>
              
              { Menu /* Colocar o ícone de barras na parte de cima */}
            </div>
          </header>

          <section className='Informacoes'>
            {(Carregamento || BuscarCidade) ? (<h1>Carregando...</h1>) :
            (<><h1 className='temperatura_destaque'>{Temperatura} °C</h1>
            <h1 className='localizacao'>{Localizacao.cidade} - {Localizacao.estado}, {Localizacao.pais}</h1>
            </>)}
          </section>

          <section className='Conselho'>
              <h2>{StatusClima}</h2>
          </section>

          <footer>
          { /* Nome Do Desenvolverdor e GitHub */ }

          </footer>
        </div>
  )
}

export default App;
