import React from "react";
import ApiData from "./MockData.json";// used when api and endpoints were not ready
import VideoCard from "./VideoCard";
import {Grid, TextField, Box} from "@mui/material";
import {useState, useEffect} from "react";
import axios from "axios";
import SearchBox from "./SearchBox";


function VideoSearcher(props)
{   
    
    // as our api endpoint is ready, so we have the data object in log, data = {videos: [{},{},{}.....]}. So we let our variable name of array as videosArrive.
   const [videosArrive, setVideos] = useState([]); // no videos at the begining so we keep the videos as empty array
 
   
   
   // for capturing the value inside the search bar. Keeping the initial search term as empty string
   const [searchTerm, setSearchTerm] = useState("");
      
// Topic 9.1
// (9.1)Step1: Add a stateVariable to keep track of TimerId
const[debounceTimerId, setDebounceTimerId] = useState(0);


const captureSearchText = (e)=>{
    setSearchTerm(e.target.value);    
   }
   


useEffect(()=>{
  
    // (9.1)Step-2: Add logic so that old timer is cleared. And new timer executes fetchVideos after time gap.     
     if(debounceTimerId !== 0 )
     {
        clearTimeout(debounceTimerId); // specifying id of the timer is important thats why we passed debounceTimerId inside clearTimeout() as clearTimeout(debounceTimerId).   Let say if there are two timers running, and we want to clear only a particular timer then specifying the id or passing the timer name is important in clearTimeout(timerName). That id we are saving as a debounceTimer
     }
    
     const newTimerId = setTimeout(()=>{
        fetchVideos(searchTerm);
     }, 800); 
     
setDebounceTimerId(newTimerId); //function that manage state, so now the state is newTimerId
    
    //    fetchVideos(searchTerm); // passing serchTerm state as argument to the fetchVideos function
    
       }, [searchTerm]
       // useEffect will be dependent on searchTerm state to get executed. if this state of searchTerm changes, the useEffect function will execute again.
       ); 



   
   
// As we need to update fetchVideos, so that it can act based on the search value passed. So, inside fetchVideos function we will be passing searchText parameter. 
   const fetchVideos = async(searchText)=> {
       
      let url = "https://content-xflix-backend.azurewebsites.net/v1/videos";


// so based on the searchText, url is changing everytime. So we will take action on url.
   if(searchText !== "")
   {
      url = `${url}?title=${searchText}`;
   }    
 
      const resp = await axios.get(url);
       
      console.log(resp);  
      const listOfVideos = resp.data.videos; 

      setVideos(listOfVideos); // handler function of setState
      
   }

   
   
   
   
   //if we pass empty dependency array in useEffect() then the code will get executed only on initial/first render of component
   
 // if we just do fetchVideos() and not use useEffect(), so everytime the function VideoSearcher get re render the fetchVideos() function call will happen again and again.
 // So the fetchVideos() function call alone can cause a lot of network calls and re renders happening unnecessarily. It will work but we have to save our network bandwidth. So, always use useEffect for countering this calls which are not required after initial or first render.    
     
 
// fetchVideos(); // just checking the JSON structure by calling the function for checking log files 

    // define the video list here
//    const videosArrive = ApiData.videos;
   
//    console.log(videosArrive);
    return(
        <div>
 <SearchBox searchTerm = {searchTerm} captureText={captureSearchText} />
{/* // whenever the text is typed inside the search bar, it should capture the text or value and update the videos or a new list of videos is fetched. 
So firstly work on capturing the value. So we will use useState above             */}
        {/* <Box mb={4}>
            <TextField
                        size="medium"
                        type="text"
                        name="search-box"
                        placeholder="Search for Video Titles" */}
{/* // whenevr we capture a serch Term, we need to fetch new videos. So we will be using dependency array of  useEffect above for fetching videos. As in dependency array, Values on whose change, useEffect() should get executed. So, state variable will be used as searchTerm in dependency array of useEffect().Values can be state variables or props variables */}
                        {/* // value={searchTerm} */}


{/* // After typing for the search term inside the search bar, we need to capture that value to fetch the videos further, let say we define a method captureSearchText which will manage the state of searchTerm using the setSearchTerm state manager function                        */}
                        {/* // onChange={captureSearchText}
        //         />
        // </Box> */}
   <Grid container spacing={2}>       
        {videosArrive.map((video)=>{
            const {id,previewImage, genre, title, releaseDate} = video; //object destructuring
                
                return (
// key should be present for each grid thats why we put key in grid tag                   
        <Grid item key={id} xs={12} sm={6} md={4} lg={3}>   
                <VideoCard 
                key={id}    
                imgLink={previewImage}  
                genre={genre} 
                title={title} 
                releaseDate={releaseDate} 
                /> 
        </Grid>
                );
           
             })}
             
{/* if we use MockData.json then use this:but now our  API is ready            */}
          {/* <VideoCard 
            imgLink={videos[0].previewImage} 
            genre={videos[0].genre} 
            title={videos[0].title}
            releaseDate={videos[0].releaseDate}
            /> */}

   {/* instead of doing this we will be mapping a list of videos to an object of Videocards as done above using map with videosNew array */}

           </Grid>
        </div>
    );
}

export default VideoSearcher;
