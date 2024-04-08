const weatherUrl = 'http://localhost:3000/weather?address='

const form = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#message-1');
const p2 = document.querySelector('#message-2');

p1.textContent='';
p2.textContent='';



form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const value = search.value;
    console.log(value);
    p1.textContent='Loading...';
    p2.textContent='';
    if(value === '')
    {
        p1.textContent='';
        p2.textContent = 'Insert a valid Address'
    }
    else
    {
        fetch(weatherUrl+value).then((response) => {
            try
            {
                if(response.status != 200)
                {
                    console.log(response.error);
                }
                else
                {
                    response.json().then((data) => {
                    const {Forecast,location,Address} = data;
                    console.log(Forecast,location,Address);
                    p1.textContent='';
                    p2.textContent = Forecast + ', ' + Address        
                    
                    })
                }
                    
            }catch(error)
            {
                console.log(error);
            }
            })
    }
    })
