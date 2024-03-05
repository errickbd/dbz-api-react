import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [fighter, setFighter] = useState([])


    const getFighter = async(event) => {
      event.preventDefault()
      let form = new FormData(event.target)
      let formData = Object.fromEntries(form)
      try{
        const response = await axios.get(`https://dragonball-api.com/api/characters?page=1&limit=58`)
        console.log(response.data.items)
        const data = response.data.items

        const responseBg = await axios.get(`https://dragonball-api.com/api/planets?page=1&limit=20`)
        console.log(responseBg.data.items)
        const dataBg = responseBg.data.items

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

  return (
    <>
      <h1>DBZ API Fighters</h1>
      <form onSubmit={getFighter}>
        <input name='fighterName' placeholder='Enter Z Fighter Name..'></input>
        <button type='submit'>Search</button>
      </form>
      <h2>Character Details:</h2>
      <p>
        Name: {fighter.name} <br />
        Race: {fighter.race} <br />
        Ki: {fighter.ki} <br />
      </p>
      
      <img src={fighter.image}></img>
      
    </>
  )
}

export default App
