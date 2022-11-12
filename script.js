const music=document.getElementById("audiocontainer");
 let img=document.getElementsByClassName("img");
const play=document.getElementById("play");
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const prev=document.getElementById("prev");
const next=document.getElementById("next");
const simg = document.getElementById("simg");
let gif=document.getElementById("gif");
let vol_display=document.getElementById("vol_display");
const progress_div=document.getElementById("progress_div");
const volume_div=document.getElementById("volume_div");
let progress=document.getElementById("progress");
let v_progress=document.getElementById("v_progress");

let total_duration=document.getElementById("duration");
let pcurrentTime=document.getElementById("current_time");

let isPlaying=false;
//for play function
const playmusic=()=> {
isPlaying=true;
music.play();
play.classList.replace("fa-play-circle","fa-pause-circle");
simg.classList.add("anime");
};

//for pause function
const pausemusic = ()=> {
isPlaying = false;
music.pause();
play.classList.replace("fa-pause-circle","fa-play-circle");
simg.classList.remove("anime");
};

let src1="stop.jpg";
let src2 ="playing.gif";
function changeimage(){
    if(isPlaying)
    {
        gif.setAttribute("src",src1);
    }
    else
    {
        gif.setAttribute("src",src2);
    }
    
}

function pplay(){
    gif.setAttribute("src",src2);
}

play.addEventListener('click',()=>{
    if(isPlaying){
        pausemusic();
    }
    else{
        playmusic();
    }
});
const songs=[{
    name:"Attention",
    title:"Attention",
    artist:"Charlie puth",
},
{
    name:"The Nights",
    title:"The Nights",
    artist:"Avicci",
},
{
    name:"We don't talk anymore",
    title:"We Don't Talk Anymore",
    artist:"Charlie puth",
}]
//changing the music data
        const loadSong=(songs, songIndex)=>{
          title.textContent=songs.title;
          artist.textContent=songs.artist;
          music.src="music/"+songs.name+".mp3";
           img.src="covers/"+songs.name+"jpg";
        };

      
        
        // loadSong(songs[1]);
        songIndex=0;

        const nextsong= ()=>{
            songIndex=(songIndex+1)% songs.length;
            loadSong(songs[songIndex],songIndex );
            playmusic();
        };

        const prevsong= ()=>{
            songIndex=(songIndex-1+songs.length)%songs.length;
            loadSong(songs[songIndex], songIndex);
            playmusic();
        };

        next.addEventListener("click",nextsong);
        prev.addEventListener("click",prevsong);



        //progress js work
        music.addEventListener("timeupdate",(event)=>{
            const {currentTime,duration,volume} = event.srcElement;
            let progress_time=(currentTime/duration)*100;
            // console.log(volume);
            progress.style.width=`${progress_time}%`;
            // let vol = volume*100;
            // v_progress.style.width=`${vol}%`;
            
        //music duration update
         let min_duration=Math.floor(duration/60);
         let sec_duration=Math.floor(duration % 60);

         let min_pduration=Math.floor(currentTime/60);
         let sec_pduration=Math.floor(currentTime % 60);
         let tot_pduration=`${min_pduration}:${sec_pduration}`;
         
        let tot_duration=`${min_duration}:${sec_duration}`;
        
        
        if(duration){
               total_duration.textContent=tot_duration;
               pcurrentTime.textContent=tot_pduration;
            }
           
        });
        //if music ends call next song function
        music.addEventListener("ended",nextsong);

        //progress on functionality

        progress_div.addEventListener("click",(event)=> {
          console.log(event);
            const {duration}=music;
           let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
          music.currentTime=move_progress;
         });
         //volume on functionality

         volume_div.addEventListener("click",(event)=>{  
            const {volume}=music;
            let current_volume=(event.offsetX/event.srcElement.clientWidth)*1;
           music.volume=current_volume;
        //    console.log("current vol");
        //    console.log(current_volume);
            v_progress.style.width=`${current_volume}%`;           
            v_progress.style.width=`${volume*100}%`;           
            
         })

         volume_div.addEventListener("click",(event)=>{  
            const {volume}=music;
           
            v_progress.style.width=`${volume*100}%`;           
            
         })

        
            
    