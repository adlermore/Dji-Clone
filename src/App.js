import React, { useEffect, useState , useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "b2682e870fe5bb03a319af93166e46eb";

function App() {
  const [offset, setOffset] = useState(0);
  const [whaterApi , setWhaterApi] = useState({
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined  
  })

  const getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    console.log('city',  city ,'country' , country);
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    

    if(city && country) {
      console.log(data);
      setWhaterApi({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }else {
      setWhaterApi({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the city value"
      });
    }
  }

  const videoWrapper = useRef(null);
  const video = useRef(null);
  const videoCount = useRef(null);

  const videFix=()=>{
    if(offset >= 275 &&  offset < 700) {
      videoWrapper.current.classList.add('fixed')
      videoCount.current.classList.add('show');
      videoWrapper.current.style.top = '38px';
      videSizeChange();
    } else if(offset >= 700){
      videoWrapper.current.classList.remove('fixed');
      videoCount.current.classList.remove('show');
      videoWrapper.current.style.top = '420px';
    }

    else if(document.getElementsByClassName('fixed').length > 0){
      videoWrapper.current.classList.remove('fixed');
      videoCount.current.classList.remove('show');
      videoWrapper.current.style.top = '38px';
    }
  }

 

  let videSizeChange =()=>{
    if(window.innerWidth - 200 > video.current.style.width.replace(/[^0-9]/g, '' ) &&  offset < 700 ){
      video.current.style.width = 632 + offset-274 +'px';
      videoCount.current.innerText= 83 + Math.round(offset/10) - 25 + '°';
      console.log(offset);
    }
  }


  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  videFix();

  return (
    <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="info-block">
        <h4 className="style__headline___1p-SV">155° Super-Wide FOV</h4>
        <p className="style__description" >Most camera drones offer, at best, an 84° FOV. DJI Avata kicks things up a gear with its super-wide 155° FOV. <sup>[7]</sup> This expanded FOV is closer to that of what we see with our own eyes, creating impactful, hyper-immersive visuals.</p></div>
        <div className="video-count" ref={videoCount} >83°</div>
      <div className="video_wrapper" id="video_wrapper" ref={videoWrapper}>
        <div className="video-player-box">
          <video controls autoPlay={true} loop muted playsInline  ref={video}>
            <source type="video/webm" data-layzr-src="" src="" />
            <source type="video/mp4; codecs=&quot;avc1.4D401E, mp4a.40.2&quot;"
              data-layzr-src="https://dji-official-fe.djicdn.com/reactor/assets/_next/static/videos/5b7ada02-52e3-4141-9286-6ba40e521fd6.mp4"
              src="https://dji-official-fe.djicdn.com/reactor/assets/_next/static/videos/5b7ada02-52e3-4141-9286-6ba40e521fd6.mp4" />
          </video>
        </div>
      </div>
    </div>
    <div className='example_weather'>
      <Form getWeather={getWeather} />
      <Weather
        temperature={whaterApi.temperature}
        city={whaterApi.city}
        country={whaterApi.country}
        humidity={whaterApi.humidity}
        description={whaterApi.description}
        error={whaterApi.error}
      />
    </div>
    
    </>
  );
}

export default App;
