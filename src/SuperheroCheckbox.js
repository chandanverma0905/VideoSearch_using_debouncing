import React, {useState} from "react";

function SuperheroCheckbox(props)
{     
    const [checked , setChecked] = useState(false);
    
    const captureCheck = (e) =>{
        setChecked(e.target.checked);
    }; 
    
     
return(
    <div>
        {props.name}
        <input type="checkbox" onChange={captureCheck}/>
    </div>
);

}

export default SuperheroCheckbox;