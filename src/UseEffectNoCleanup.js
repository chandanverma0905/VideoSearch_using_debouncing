import axios from "axios";
import React, {useEffect, useState} from "react";

function UseEffectNoCleanup(props)
{

//   const [email, setEmail] = useState("");

   const updateEmail = async()=>{
    //  const axios = require("axios");
    try{
    let res = await axios.get(`https://reqres.in/api/users/${props.userId}`);
    //   console.log("Jack", res);
     let email = res.data.data.email;
     console.log(email);
    }

    catch(error){
       console.log("Error fetching user data:", error);
     }
     
   }
// Syntax 2
// useEffect(()=>{Business Logic}, [Dependency Array]);
// Dependency Array - Values on whose change, useEffect() should get executed   
// Values can be state variables or props variables
//    useEffect(()=>{
//     updateEmail();
//    }, [props.userId]);


// Syntax 3 | useEffect(()=>{Business Logic}, [])
// if we pass empty dependency array in useEffect() then the code will get executed only on initial/first render of component

// Syntax 4 | useEffect(()=>{Business Logic; 
//   return part will get executed before component instance is removed    
//  return()=>{
    // Cleanup Activities
    // } } )
 // the inner function with return is reffered as cleanup function
 //It's used to perform cleanup tasks when the component is unmounted or when some of its dependencies change.
 //In our code, it logs "cleanup Activities" to the console. This cleanup function will be called when the component is about to be unmounted or when the dependencies specified in the dependency array change.
//Here's a summary of what's happening:

// When your component initially renders, it logs "Business Logic" and the current value of props.userId to the console.

// If the component is unmounted or if props.userId changes in a way that triggers a re-render, the cleanup function is called, and it logs "cleanup Activities" to the console.

    useEffect(()=>{
        console.log("Business Logic", props.userId);

        return()=>{
            console.log('cleanup Activities');
        }
    });


    return(
      <div>
         <h2>{props.message}</h2>
      </div>
    );
}

export default UseEffectNoCleanup;