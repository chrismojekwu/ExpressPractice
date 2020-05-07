const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get("/", (req,res) => {
   res.send('on a diff level diff magnitude and that thing got longitude n lattitude');
});

app.listen(8000, () => {
   console.log('Express server is listening on port 8000');
});

app.get('/burgers', (req,res) => {
    res.send("i got these cheeseburgers mannn")
});

app.get('/pizza/pepperoni', (req,res) => {
    res.send("i wany my babyback babyback babyback")
});

app.get('/pizza/pineapple', (req,res) => {
    res.send("chillisssssssss baby back ribs :)")
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      Ip: ${req.ip}

    `;
    res.send(responseText);
  });

app.get('/queryViewer', (req,res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our company heres 150 racks`;
  
    //6. send the response 
    res.send(greeting);
  });

app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    
    if(!a){
        return res.status(400).send('Please provide a value for a')
    }
    if(!b){
        return res.status(400).send('Please provide a value for b')
    }

    const sum = `The sum of ${a} and ${b} is ${parseFloat(a) + parseFloat(b)} `
    
    res.send(sum)
})

app.get('/cipher', (req, res) => {
    
    const text = req.query.text;
    const shift = req.query.shift;

    if(!text){
        return res.status(400).send('please provide text')
    }

    if(!shift){
        return res.status(400).send('please provide a shift number')
    }

    const encryption = text.split("").map(letter => parseFloat(letter.charCodeAt(0)) + parseFloat(shift))
    .map(code => {
        return String.fromCharCode(code)
    }).join("") 

    res.send(encryption)
})

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers;

    if(!numbers){
        res.status(400).send('Please enter 6 number values')    
    }
    if(numbers.length < 6){
        res.status(400).send('Please enter 6 number values')
    }

    const lottoArr = [Math.floor((Math.random() * 20) + 1),Math.floor((Math.random() * 20) + 1),Math.floor((Math.random() * 20) + 1),
        Math.floor((Math.random() * 20) + 1),Math.floor((Math.random() * 20) + 1),Math.floor((Math.random() * 20) + 1)]
    
    const nums = numbers.map(num => parseFloat(num))    
    
    let statement = "";
    const results = nums.filter((nums) => {
       return lottoArr.indexOf(nums) >= 0
    })

    if(results.length < 4){
        statement = "Sorry, you lose"
    }
    if(results.length === 5 ){
        statement = "Congratulations! You win $100!"
    }
    if(results.length === 6 ){
        statement = "Wow! Unbelievable! You could have won the mega millions!"
    }

    res.send(statement)
});