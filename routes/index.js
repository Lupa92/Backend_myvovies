var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

// const ApiKeyTMDB = "8bf85a359da576a832b3437a564dc80f";
const bearer = process.env.BEARER
router.get('/movies', (req, res)=>{
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',{
        method:'GET',
        headers:{
            accept: 'application/json',
            Authorization: bearer
            }
    })
    .then(response=>response.json())
    .then ((data)=>{
        const movies = data.results.map(elem=>({
            title : elem.title,
            poster_path: elem.poster_path,
            vote_average:elem.vote_average,
            vote_count: elem.vote_count,
            overview: elem.overview,
        }));
        res.json({movies})
    })
})


module.exports = router;
