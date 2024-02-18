import {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const [data,setData]=useState({});
  const [town, setTown] = useState('');

  const key = '1a69de08d92e58b5fe64fc49049b4411';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`

  const searchWeather=(event)=>{
    if(event.key ==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
      })
      setTown('');
    }
  }
  useEffect(()=>{
    const sity = "katowice"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${sity}&units=metric&appid=${key}`
    fetch(url)
      .then((response)=>response.json())
      .then((response)=>{
        setData(response)
      })

  },[])


  return (
    <div className="app">
      <div className='inp-field'>
        <input type='text'
        value={town}
        onChange={(event)=>setTown(event.target.value)}
        placeholder='Ender location'
        onKeyDown={searchWeather}
      />
      </div>
      <div className='container'>
        <div className='header'>
          <div className='city'>
            <p>{data.name}</p>
          </div>
        </div>
        <div className='temp'>
          {data.main ? (
            <h1>{data.main.temp.toFixed(0)}°C</h1>
          ): null}
        </div>
        <div className='desc'>
            {data.weather ? <p>{data.weather[0].main}</p>:null}
        </div>
      </div>
      {data.name !== undefined
      &&(
        <div className='footer'>
          <div className='feels'>
            <p>Відчувається як:</p>
            {data.main ?<p className='bold'>
              {data.main.feels_like.toFixed(0)}
              °C
              </p>:null} 
          </div>
          <div className='humidity'>
            <p>Вологість:</p>
            {data.main ?<p className='bold'>
              {data.main.humidity}
              %
              </p>:null} 
          </div>
          <div className='wind'>
            <p>Швидкість вітру:</p>
            {data.wind ?<p className='bold'>
              {data.wind.speed.toFixed(1)}
              м/с
              </p>:null} 
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
