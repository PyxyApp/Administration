let routeAPI;
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "prod"){
    routeAPI = "https://api.pyxy.space/";
}else{
    routeAPI = "http://localhost:5000/pyxy-f84e8/us-central1/api/";
}
export default routeAPI