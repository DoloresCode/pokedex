const express = require('express');
const app = express();
const port = 4000;
const pokemon = require('./models/pokemon.js')

//Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {pokemon: pokemon});
});

app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/pokemon/:id', (req, res) => {
    let id = req.params.id
    let defPokemon = pokemon[id]
    res.render('show.ejs', {pokemon: defPokemon});
});

app.post('/pokemon/:id', (req, res) => {
    let InputPokemon = req.body
    const newPokemon = {
        name: InputPokemon.name,
        img: InputPokemon.img,
        type: InputPokemon.type.split(',').map(t => t.trim()),
        stats: {
            hp: InputPokemon.hp,
            attack: InputPokemon.attack,
            defense: InputPokemon.defense,
            spattack: "",
            spdefense: "",
            speed: "",
    }
    }
    pokemon.splice(0, 0, newPokemon);
    res.redirect('/pokemon');
});







// app.post('/pokemon/:id', (req, res) => {
//     let newPokemon = {
//       name: req.body.name,
//       img: req.body.img,
//       type: 
//       req.body.type && req.body.type.split(',').map(t => t.trim()),
//       stats: {
//         hp: req.body.hp,
//         attack: req.body.attack,
//         defense: req.body.defense,
//         spattack: req.body.spattack,
//         spdefense: req.body.spdefense,
//         speed: req.body.speed,
//       }
//     };
//     pokemon.splice(0, 0, newPokemon);
//     res.redirect('/pokemon');
//   });


app.listen(port, () => console.log(`Listening for things requests on port ${port}`));