import { useState } from 'react'
import { endpoints } from './apiendpoint'
import { useNavigate } from 'react-router-dom' 
import axios from 'axios'
function Home() {
  //Stores the user input in var val    
  const [certificateID , setCertificateID] = useState() //useState is a hook
  const [certificateEndpoint , setCertificateEndpoint] = useState(endpoints.verifyCertificate.ExpeditionCompletionCertificate)
  const navigate = useNavigate() //Gives func to navigate
  async function formhandler(event)
  {
    event.preventDefault(); //Prevents default page refresh when we click submit
    try {
      //Axios is an API used for fetching/handling API requests
      const res = await axios.get(`${certificateEndpoint}${certificateID}` , { //Calls the verify cert API endpoint
        headers : {
          Accept : "text/html" //Header to set what kind of return obj (PDF or HTML etc)
        }
      })
      if(res.status === 200){ //200 means sucessful
        let entity = certificateEndpoint.split("/")
        entity = entity[entity.length-2]
        navigate(`/certs/${certificateID}?entity=${entity}` )
      }
    } catch {       //Incase errror is thrown from server
      window.alert("Invalid Id")
    }
    
  }

  return (
   <div className="container">
    <h1>AGNIRVA BADGE VERIFICATION</h1>
    <form id="verificationForm" onSubmit={formhandler}>
        {/* This is because for every single keystroke, value var should update */}
      <div>
        <input onChange={(e)=>{setCertificateID(e.target.value)}} type="text" id="certificateId" placeholder="Enter Certificate ID" required/>
        <select value={certificateEndpoint} required placeholder="Select Certificate type" onChange={(e)=>setCertificateEndpoint(e.target.value)}>
        <option value={endpoints.verifyCertificate.ExpeditionCompletionCertificate}>
        Expedition Completion
        </option>
        <option value={endpoints.verifyCertificate.ExpeditionParticipationCertificate}>
        Expedition Participation
        </option>
        <option value={endpoints.verifyCertificate.ExplorerCertificate}>
        Explorer
        </option>
        <option value={endpoints.verifyCertificate.FellowshipCommenceCertificate}>
        Fellowship Commence
        </option>
        <option value={endpoints.verifyCertificate.FellowshipCompletionCertificate}>
        Fellowship Completion
        </option>
      </select>
        </div>
      <button type="submit">Verify</button>
    </form>
  </div>
  )
      
}

export default Home
