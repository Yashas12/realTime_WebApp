const key = '{api-key}';

/*To generate an API key, go to Openweatherapi.org and create an account.
After creating an account, you will be asked to verify your email(that you have used to create the account).
After verifying, you'll recieve an email containing your API key. Replace {api-key} in line 1 with your API key and your weather 
applicaton is ready to go.
    */

/*const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=Lagos&appid={api-key}'

//http://api.openweathermap.org/data/2.5/weather?q=Lagos&appid={api-key}}

fetch(baseURL)
    .then((data)=>{console.log('response',data.json())})
    .catch((error)=>{
        console.log(error);
    })*/

    const requestCity = async (city)=>{
        const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
        const query = '?q='+city+'&appid='+key;

        //const query = '?q=${city}&appid=${key}';

        //make fetch call (promise call)
        const response = await fetch(baseURL + query);

        //promise data
        const data = await response.json();
        return data;
    }
    //requestCity('Abuja');
