const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

var change_main = document.querySelector(".All");

async function Find_movies(url){
    var array_m = await fetch(url);

    var movie_object = await array_m.json();

    console.log(movie_object);
    Add_movies(movie_object)
}

function Add_movies(movie_obj){
    for(var i=0;i<movie_obj.results.length;i++){
        var new_div = document.createElement("div");
        new_div.className = "Amostra";
        new_div.innerHTML = `<img src="${IMGPATH + movie_obj.results[i].poster_path}">
        <div class="header">${movie_obj.results[i].title}<span id="note" class="nd">${movie_obj.results[i].vote_average}</span></div>`;

        put_value(new_div);
        var effect = document.createElement("div");
        effect.className = "overview";

        effect.innerHTML = `<h3>Synopsis</h3>${movie_obj.results[i].overview}`;
        effect.style.display = 'none';
        new_div.appendChild(effect);

        Add_events(new_div);

        change_main.appendChild(new_div);
        console.log(movie_obj.results.length);
    }
}

function put_value(div_n){
    var number = parseFloat(div_n.getElementsByClassName('nd')[0].textContent);
    if(number <= 5){
        div_n.getElementsByClassName('nd')[0].style.color = 'red';
    }
    else if(number <= 8){
        div_n.getElementsByClassName('nd')[0].style.color = 'yellow';
    }
    else{
        div_n.getElementsByClassName('nd')[0].style.color = 'blue';
    }
}

function over_m(new_div){
    return function(){
        new_div.getElementsByClassName('overview')[0].style.display = 'inline';
    }
}

function out_m(new_div){
    return function(){
        new_div.getElementsByClassName('overview')[0].style.display = 'none';
    }
}

function Add_events(new_div){
    new_div.addEventListener("mouseover", over_m(new_div));
    new_div.addEventListener("mouseout", out_m(new_div));
}

Find_movies(APIURL);