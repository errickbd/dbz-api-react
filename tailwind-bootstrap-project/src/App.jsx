import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [fighter, setFighter] = useState([])
  const [planets, setPlanets] = useState([])
  const [planetImg, setPlanetImg] = useState('')


    useEffect(() => {
      const fetchPlanets = async () => {
        try{
          const responseBg = await axios.get(`https://dragonball-api.com/api/planets?page=1&limit=20`)
          setPlanets(responseBg.data.items)
          let data = responseBg.data.items
          console.log(responseBg)


          if (data.length > 0){
            setPlanetImg(data[0].image)
          }
          
        }
        catch (error){
          console.error('Error fetching planets:', error)
        }
      }
      fetchPlanets();
    }, [])

    
    const getFighter = async(event) => {
      event.preventDefault()
      let form = new FormData(event.target)
      let formData = Object.fromEntries(form)
      try{
        const response = await axios.get(`https://dragonball-api.com/api/characters?page=1&limit=58`)
        console.log(response.data.items)
        const data = response.data.items

        
        

        for (let fighterData of data){
          if (fighterData.name === formData.fighterName){
            console.log(fighterData)
            setFighter(fighterData)
          }
        }
      }
      catch(error){
        console.error("Error getting Z fighter:", error)
      }
    }

    const handlePlanetChange = (event) => {
      const selectedPlanetName = event.target.value;
      const selectedPlanet = planets.find(planet => planet.name === selectedPlanetName);
      setPlanetImg(selectedPlanet.image)
    }

  return (
    <>
      <body className='planet-image' style={{ backgroundImage: `url(${planetImg})`, backgroundSize: `cover`, margin:'0', padding:`0`}}>
        <div>
          <h1>DBZ API Fighters</h1>
          <form onSubmit={getFighter}>
            <input name='fighterName' placeholder='Enter Z Fighter Name..'></input>
            <button type='submit'>Search</button> <br />
            <label htmlFor='planets'>Choose a planet:</label>
            <select name='planets' id='planets' onChange={handlePlanetChange}>
              {planets.map(planet => (
                <option key={planet.id} value={planet.name}>{planet.name}</option>
              ))}
            </select>
          </form>
          <h2>Character Details:</h2>
          <p>
            Name: {fighter.name} <br />
            Race: {fighter.race} <br />
            Ki: {fighter.ki} <br />
          </p>
          <img src={fighter.image}></img>
        </div>
      </body>
    </>
  )
}

export default App
