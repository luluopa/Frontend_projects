var obj_re = 0;

const show_selected = document.querySelector('.Show_selected');
const main = document.querySelector('.Main');

async function Get_allmeals(){
    var array_object = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");

    var result = await array_object.json();
    obj_re = result;

    for(var i=0;i<3;i++){
        Add_meal(obj_re.categories[i]);
    }

    document.querySelector('.botao').addEventListener('click', () => {
        if(document.querySelector('#input_t').value.length > 0){
            var array = Search(obj_re.categories, document.querySelector('#input_t').value);
    
            for(var i=0;i<array.length;i++){
                if(!Find_repeat(array[i])){
                    Add_meal(array[i]);
                }
            }
        }
    })
}

function Find_repeat(object){
    var list = document.querySelectorAll('li');

    for(var i=0;i<list.length;i++){
        var item = list[i].getElementsByTagName('span');
        if(object.strCategory == item[0].textContent){
            return true;
        }
    }
    return false;
}

function Add_meal(meal_object){
    var meal = document.createElement("li");

    meal.innerHTML = '<img src=' + meal_object.strCategoryThumb + '><span id="item">' + meal_object.strCategory + '</span>';
    meal.addEventListener('click', Change_amostra(meal_object));

    document.querySelector(".list").appendChild(meal);
}
//funcao que pega a maior sequencia substring de stringchild em stringmother
function sequencial_subtrs(stringmother, stringchild){
    var vetor_auxiliar = [0,0], vetor_result = [0,0];
    var aux_init = 0;
    var check = false, len = 0;
    for(var i=0;i<stringmother.length;i++){
        for(var j=0;j<stringchild.length;j++){
            if(stringmother[i + aux_init] == stringchild[j] && !check){
                vetor_auxiliar[0] = i
                check = true
                aux_init++;
            }
            else if(stringmother[i + aux_init] == stringchild[j]){
                aux_init++;
                if(j == stringchild.length - 1){
                    if(aux_init - vetor_auxiliar[0] > len){
                        vetor_result[0] = i;
                        vetor_result[1] = i + aux_init;
                        len = vetor_result[1] - vetor_result[0];
                    }
                    aux_init = 0;
                    check = false;
                }
            }
            else{
                if(aux_init - vetor_auxiliar[0] > len){
                    vetor_result[0] = i;
                    vetor_result[1] = i + aux_init;
                    len = vetor_result[1] - vetor_result[0];
                }
                aux_init = 0;
                check = false;
            }
        }
        aux_init = 0;
        check = false;
    }
    return len/stringmother.length;
}

function Search(array_meal_object, string){
    var similarity = 0.4;
    var array_object = [];
    for(var i=0;i<array_meal_object.length;i++){
        var check_similarity = sequencial_subtrs(array_meal_object[i].strCategory,string);
        if(check_similarity >= similarity){
            array_object.push(array_meal_object[i]);
        }
    }
    return array_object;
}

function Change_amostra(meal_object){
    return function(){
        var shadow = show_selected.getElementsByClassName('shadow')[0];

        shadow.innerHTML = `<img src="${meal_object.strCategoryThumb}" id="img" alt="">
        <div class="refer">
            <span id="name">${meal_object.strCategory}</span><button class="love"></button>
        </div>`;

        var love = document.querySelector('.love');
        love.innerHTML = `<img src="https://cdn1.iconfinder.com/data/icons/essential-21/128/Love-512.png">`
        love.addEventListener('click', () => {
            love.innerHTML = `<img src="https://e7.pngegg.com/pngimages/758/873/png-clipart-computer-icons-heart-scalable-graphics-shape-love-icon-heart-black.png">`
        })

        var description_div = document.getElementsByClassName('description')[0];
        description_div.innerHTML = `<div id="nav"><button id="close">Close</button></div>
        <div id="center"><img src="${meal_object.strCategoryThumb}">${meal_object.strCategoryDescription}</div>`
        var botao = document.getElementById('close');
        botao.addEventListener('click', () => {
            description_div.style.display = 'none';
        })
        var img = document.getElementById('img');
        img.addEventListener('click', () => {
            description_div.style.display = 'flex';
        })

    }
}

Get_allmeals();