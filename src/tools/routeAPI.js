let routeAPI;
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "prod"){
    routeAPI = "https://api.pyxy.space/";
}else{
    routeAPI = "https://us-central1-pyxy-f84e8.cloudfunctions.net/api//";
}
export default routeAPI