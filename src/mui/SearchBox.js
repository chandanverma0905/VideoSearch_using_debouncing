//moved the responsibilities of the search . Search box responsibilities are text and update the search term.

import {Grid, Box, TextField} from "@mui/material";

import { useEffect, useState } from "react";

function SearchBox(props)
{
     
// moving the common variable to parent as both parent which is VideoSearcher and child that is SearchBox, they both need access to searchTerm state variable. So, move this to parent VideoSearcher. This is called lifting state up from child to parent and also the handler from their state from child to parent. 
    // const [searchTerm, setSearchTerm] = useState("");


// Also move this handler function for state to the parent VideoSearcher.    
// const captureSearchText = (e)=>{
//     setSearchTerm(e.target.value);    
//    }
   
   return(
    <div>
    <Box mb={4}>
       
       <TextField
          size="medium"
          type="text"
          name="search-box"
          placeholder="Search for Video Titles"
          value={props.searchTerm}
          onChange={props.captureText}
       />
    </Box>
    </div>
   )

}

export default SearchBox;