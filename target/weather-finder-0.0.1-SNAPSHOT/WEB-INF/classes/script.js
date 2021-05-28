function geofindme()
{
  var url;
  const status=document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';
  
 var req,data;
  
  function success(position)
  {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude}  °Longitude: ${longitude} °`;
    
  url=`https://weather-proxy.freecodecamp.rocks/api/current?lon=${longitude}&lat=${latitude}`;  
  reciever(url);
  }
  
  function reciever(url)
  {
  req=new XMLHttpRequest();
  req.open('GET', url);
    req.onload = handleReq;
  req.send();
 }
  
  function handleReq()
  {
    if (req.readyState === 4 && req.status === 200 ) 
    {
      data=req.responseText;
     process(data);
    }
   }
  
  function process(data)
  {
    var recieved=data;
    var final=JSON.parse(recieved);
    
    let nnew=(final["weather"]);
    var icon=nnew[0].icon;
   
    document.getElementById("img_home").src = icon + `?t=${new Date().getTime()}`;
  
    let temp=final["main"]["temp"];
    //alert(recieved);
    
    var feels_like=final["main"]["feels_like"];
    var temp_min=final["main"]["temp_min"];
    var temp_max=final["main"]["temp_max"];
    var visibility=(final["visibility"]/1000)+ " K.M";
    var description=nnew[0].description;
    var humidity = final["main"]["humidity"];
    var sunrise = final["sys"]["sunrise"];
    var sunset = final["sys"]["sunset"];
    //alert(humidity+" "+sunrise+" "+sunset);
    
    let sunrise_final=time_format(sunrise);
    let sunset_final=time_format(sunset);
    //alert(sunrise_final+ "   "+sunset_final);
   
    document.getElementById("sunrise").innerHTML="Sunrise : " + sunrise_final;

     document.getElementById("sunset").innerHTML="Sunset : " + sunset_final;

    
    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Celsius' : 'Fahrenheit' ;
    var loc = final["name"];
    display(loc,"location");
    //var isChecked=document.querySelector(".switch-input").checked;
    let flag=0;
    if(result=="Celsius")
      {
        display(temp+"° C","display_info");  
      }
    else
      {
        display(convertToF(temp)+"° F","display_info");  
        flag=1;
      }
    //display(temp_min,"display_info");
    if(flag==1)
    {
    display(("Min : "+convertToF(temp_min)+"° F" 
            + "\nMax : "+convertToF(temp_max)+"° F"),"new_dl");
    }
    else
      {
        display(("Min : "+temp_min+"° C" 
            + "\nMax : "+temp_max+"° C"),"new_dl");
      }
    display(("Visibility : "+ visibility + "\t"+description),"new_dl1");
    //document.getElementById("new_dl").innerHTML=temp_min;
  }
  function convertToF(celsius)
  {
    let Fahr = (celsius*(9/5)+32).toFixed(2);
    return Fahr;
  }
  
  function time_format(timestamp)
  {
    let unix_timestamp = timestamp;
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

 return formattedTime;
  }
  
  function display(param_0,id_0)
  {
    
    let myid=document.getElementById(id_0);
    myid.innerHTML=param_0;
  }
   
  document.querySelector(".switch-input").addEventListener("click", function() {
    setTimeout(reload_me(),100)
  }, false);

  function reload_me()
  {
    //var isChecked=document.getElementById("switchValue").checked;
        document.getElementById('find-me').click();
  //document.getElementById('find-me').click();
  }
  
  function error() {
    status.textContent = 'Unable to retrieve your location' ;
  }
  if(!navigator.geolocation)
    {
      status.textContent='Geolocation is not supported by your browser';
    }
  else
    {
      status.textContent='Locating..';
      navigator.geolocation.getCurrentPosition(success,error);
    }
}

window.onload = function() {
  geofindme();
};

document.querySelector('#find-me').addEventListener('click',geofindme);


