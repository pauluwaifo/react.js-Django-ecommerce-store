import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';



function TopBar({setRecommendedLink, recommendedLink}) {

    const locate = useLocation()
    const [location, setLocation] = useState(null);
    const API_KEY = '7411cdb15abb76039dc0cbe6ee427696'
    const [weather, setWeather] = useState([''])
    const [tempWeather, setTempWeather] = useState([''])
    const nav = useNavigate()
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            console.log(latitude)
            console.log(longitude)
            {
             const url = `https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=${API_KEY}&units=imperial`
              fetch(url)
              .then(response => response.json())
              .then (data => {
                setWeather(data.weather)
                setTempWeather(data.main)
                console.log(data.main)
              })
            }
          },
          error => {
            console.error('Error getting location:', error);
          }
          );
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
    }, []);
    function Temp(){
        tempWeather.map((temperature) => {
            return (
                <li>{(temperature.temp)}</li>
            )
        })
        
    }

    const [ weatherRecommend, setWeatherRecommend ]= useState()
    const customId = "custom-id-yes";

    
    if(locate.pathname === '/') {
        var notify = () => {
          toast.success( weatherRecommend, {
            toastId: customId,
            position: "bottom-right",
            theme: "light",
            autoClose: 5000,
            hideProgressBar: true,
            transition: Flip,
            onClick(){nav(`/${recommendedLink}/weather_recommended-products`)}
          }); 
        }
      }
      
    useEffect(() => { 
      weather.map((weather, i) => {
        if(weather.main && weather.description.includes("cloud")) {
          setWeatherRecommend('recommended products for a cloudy day')
          setRecommendedLink('cloud')
        } else if(weather.main && weather.description.includes("rain")){
          setWeatherRecommend('recommended products for a rainy day')
          setRecommendedLink('rain')
        } else if(weather.main && weather.description.includes("sun")){
          setWeatherRecommend('recommended products for a sunny day')
          setRecommendedLink('sun')
        } else if(weather.main && weather.description.includes("clear")){
          setWeatherRecommend('recommended products for a clear sky')
          setRecommendedLink('sun')
        } 
      }, [weather.main])
      
      function empty() {
        console.log()
      }
      var i = 5000;
      function intervalFunction() {
        {locate.pathname === "/" ? 
          notify() : empty()
        }
        console.log(i);
        i += 5000;

          // Clear the previous interval and set a new one with the updated interval time
          clearInterval(intervalId);
          intervalId = setInterval(intervalFunction, i);
      }
        
      var intervalId = setInterval(intervalFunction, i);
      }, weather.main)
      return (
        <>
            {location ? (
              <>
                {weather.map((weather, index)=> {
                  const icon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
                  return (
                    <div className="top-bar bg-lightgrey" key={index}>
                        <ul key={index}>
                            <li><h6>{weather.main}</h6></li>
                            <li><img src={icon} /></li>
                            <li style={{float: "right"}}><h6>{weather.description}</h6></li>
                            <li style={{float: "right"}}><h6>Lat: {(location.latitude).toFixed(2)}</h6> </li>
                            <li style={{float: "right"}}><h6>Long: {(location.longitude).toFixed(2)}</h6></li>
                        </ul>
                        {/* <Temp /> */}
                    </div>
                )
                })}
            </>
                ) : (
                <div className="bg-lightgrey text-center p-2">
                  <h6 className='m-auto'>Loading Weather...</h6>
                </div>
            )}
        </>
    );
} 

export default TopBar;