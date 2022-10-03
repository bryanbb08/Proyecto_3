import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import Locationinfo from './components/LocationInfo'
import getRandomNuber from './utils/getRandomNumber'

function App() {

  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)


  useEffect (() => {
    let id = getRandomNuber() 
      if (searchInput) {
        id= searchInput
    }

    const URL =`https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
        .then(res => {
          setHasError(false)
          setLocation(res.data)
        })
        .catch(err => setHasError(true))
      }, [searchInput])

    const handleSumit = e => {
      e.preventDefault()
      setSearchInput(e.target.idLocation.value)
    }

    const handLeChange = e => {

      if (e.target.value === '') {
        return setSuggestedList()
      }

      const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`
      
      axios.get(URL)
      .then(res => setSuggestedList(res.data.results))
      .catch(err => console.log(err))
    }

  return (
    <div className="App">
      <div className='App__pp'>
              <h1>Rick And Morty</h1>
              <div className='App__form'>
                <form onSubmit={handleSumit}>
                  <input 
                  id='idLocation'
                  placeholder='Enter another number from 1 to 126'
                  type="text" 
                  onChange={handLeChange}
                  />
                  <button>Search</button>
                  <FilterList 
                    suggestedList={suggestedList}
                    setSearchInput={setSearchInput}
                  />
                </form>
              </div>
      
      </div>

      {
        hasError ?
          <ErrorScreen /> 
            :
              <>
                <Locationinfo location={location} />
                  <div className='card-container'>
                    {
                    location?.residents.map(url => (
                      <CardResident
                        key={url}
                        url={url}
                      />
                    ))
                    }
                  </div>
              </>
      }
    </div>
  )
}

export default App

