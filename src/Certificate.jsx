import { useEffect, useRef } from 'react'
import { endpoints } from './apiendpoint'
import {useParams } from 'react-router-dom'
import React from "react"
import {
  useLocation
} from "react-router-dom";
import axios from 'axios'
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Certificate() {
const ref=useRef() //Hook that returns a ref to a HTML obj/dom element 
const { id } = useParams(); //Hook to get the ID valu/param. ID should be the 
const query= useQuery()
  useEffect(()=> { //Hook used to run a func. This runs at the start of the page & if any dependency var vals change
    axios.get(`${endpoints.verifyCertificate[query.get("entity")]}${id}` , { //Fetches the same API as last time
        headers : {
          Accept : "text/html"
        }
      }).then((res)=> { //Passes the API result to res var
        if(res.status==200){ //If sucess, sets inner HTML to returned HTML code
            ref.current.innerHTML = res.data
        }else { //Throws a error message if invalid
            ref.current.innerHTML = "Invalid Certificate"
        }
      })
      /*axios.get(`${endpoints.verifyCertificate[query.get("entity")]}${id}` ,
        {
            responseType: 'arraybuffer',
            headers: {
                Accept: 'application/pdf'
            }
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${query.get("entity")}.pdf`); 
            document.body.appendChild(link);
            link.click();
        })
        */
        .catch((error) => console.log(error));
  })

  return (
  //Container for the HTML certificate returned by the API  
  <div ref={ref} className="container2"> 
  </div>
  )
      
}

export default Certificate
