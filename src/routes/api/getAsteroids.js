import dotenv from 'dotenv';
dotenv.config();

const NASA_API_KEY = process.env['NASA_API_KEY'];

export async function post(req) {

    console.log('ok')
    console.log(req.body)

    const {startDate} = req.body;
    if (!startDate) return;    

    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=${NASA_API_KEY}`, {
        method: 'GET',
        headers: {"Content-type": "application/json;charset=UTF-8"}
    });

    const data = await res.json();
    console.log(data);
    return {body: data};
};