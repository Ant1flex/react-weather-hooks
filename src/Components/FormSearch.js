import React, {useState, useEffect} from 'react'
import FavoriteCity from './FavoriteCity'
import './styles.css'

const API_KEY_GEOCODING = 'i0YfV2CTpMoHWk4LBpmiONCEy5Pi3Jp5';

export default function FormSearch({getWeatherByCityName, inputCityName}){

    const [state, setState] = useState({
        favourites: [],
    })

    useEffect(()=>{
        const raw = localStorage.getItem('state.favourites') || []
        setState({favourites: JSON.parse(raw)})
    }, [])

    useEffect(()=>{
        localStorage.setItem('state.favourites', JSON.stringify(state.favourites))
    }, [state.favourites])

    const removeFavoriteCity = (i) => {
        console.log('Deleting favorite city('+state.favourites[i]+')...')
        var arr = state.favourites;
        arr.splice(i, 1);
        setState({ favourites: arr });
        // --------------------------------------------------------------------------------------
        localStorage.removeItem('state.favourites')
        localStorage.setItem('state.favourites', JSON.stringify(state.favourites))
        // --------------------------------------------------------------------------------------
    }
    
    const searchByFavoriteCity = (i) => {
        console.log('Using favourite city('+state.favourites[i]+') to cheking weather...')
        var arr = state.favourites;
        inputCityName.current.value = arr[i];
    }

    const addFavoriteCity = () => {
        console.log('Adding '+inputCityName.current.value+' to favourites...')
        if (inputCityName.current.value) {
            var arr = state.favourites;
            var uniqueArr = [];
            arr.unshift(inputCityName.current.value);
            for (var str of arr) {
                if (!uniqueArr.includes(str)) {
                    uniqueArr.push(str)
                }
            }
            if (state.favourites.length !== 4) {
                setState({ favourites: uniqueArr });
                //console.log(uniqueArr);
            } else {
                uniqueArr.pop();
                setState({ favourites: uniqueArr });
                //console.log(uniqueArr);
            }
        }
    }

    const eachFavorite = (item, i) => {
        return (
            <FavoriteCity key={i} index={i} deleteElement={removeFavoriteCity} searchByFavorite={searchByFavoriteCity}>
                {item}
            </FavoriteCity>
        );
    }

    const checkGeolocation = (event) => {
        console.log('Geolocation...')
        var input = inputCityName.current;
        var geolocatedCity = '';
        navigator.geolocation.getCurrentPosition(async function (position) {
            //console.log(position)
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            const dataFromApi = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=${API_KEY_GEOCODING}&language=en-US`).then(['addresses'][0].address.localName.json());
            const dataToJson = await dataFromApi.json();
            //console.log(dataToJson);
            //geolocatedCity = dataFromApi.['addresses'][0].address.localName;
            //geolocatedCity = dataToJson.arr['addresses'][0].address.countrySubdivision.slice(0, dataToJson.arr['addresses'][0].address.countrySubdivision.indexOf(' '));
            input.value = geolocatedCity;
            //console.log(geolocatedCity);
            getWeatherByCityName(event)
        });
    }

        return (
            <form  onSubmit={getWeatherByCityName} className='formSearch'>
                <input className='textbox' ref={inputCityName} type='text'  name='cityName' placeholder='Search for city...' autoComplete='off'></input>
                <button type='button' className='actionBTN' onClick={getWeatherByCityName} title='Check weather'><i className='i-font i-search'></i></button>
                <button type='button' className='actionBTN' onClick={addFavoriteCity.bind(this)} title='Add to favourites'><i className='i-font i-favourites'></i></button>
                <button type='button' className='actionBTN' onClick={checkGeolocation} title='Geolocation'><i className='i-font i-geolocation'></i></button>
                { state.favourites[0] &&
                    <div className='favList'> Favourites:
                {
                    state.favourites.map(eachFavorite)
                }
                </div>
                }
                
            </form>
        );
}
