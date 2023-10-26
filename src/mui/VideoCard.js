import {Card, CardMedia, CardContent, Typography} from "@mui/material";

function VideoCard(props)
{
  return(
    <div>
        <Card>
          <CardMedia
            component="img" 
            height="140"
            image= {props.imgLink}
            alt="videoThumbnail"
           />

          <CardContent>
              <Typography color="text.secondary" gutterBottom>
                  {props.genre}
              </Typography>
              
              <Typography variant="h5" gutterBottom>
                  {props.title}
              </Typography>
              
              <Typography color="text.secondary">
                  {props.releaseDate}
              </Typography>
               
          </CardContent>
             
         
        </Card>
    </div>
  );
}
export default VideoCard;
