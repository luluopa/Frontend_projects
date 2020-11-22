const Up = 0;
const Down = 1;
const Left = 2;
const Right = 3;

const tam_b_X = 20;
const tam_b_Y = 20;

const canvas = document.getElementById('canvas');

var keep_playing = true;

var pont = [{name: "lucas", pont: 16},{name: "jeffersson", pont: 101}];

function Snake(){
    this.direct = Right;
    this.color = "#000000";
    this.corpo = [[tam_b_X,tam_b_Y],[tam_b_X,tam_b_Y + tam_b_Y],[tam_b_X,tam_b_Y + tam_b_Y * 2]];
}

function Apple(){
    this.pos = [0,0];
    this.color = "#000000";
}

function Init_canvas(){
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
    }
    return ctx;
}

function Render(snk, app){
    //renderizando a snake
    display.fillStyle = snk.color;
    for(var i=0;i<snk.corpo.length;i++){
        display.fillRect(snk.corpo[i][0],snk.corpo[i][1],tam_b_X, tam_b_Y);
    }

    //renderizando a maça
    display.fillStyle = app.color;
    display.fillRect(app.pos[0],app.pos[1],tam_b_X, tam_b_X);
}

function Update(){
    var get_canvas = document.getElementById('canvas');
    if(get_canvas.width % tam_b_X == 0 && get_canvas.height % tam_b_Y == 0){
        display.fillStyle = "#000000";
        for(var i=0;i<get_canvas.height/tam_b_Y;i++){
            for(var j=0;j<get_canvas.width/tam_b_X;j++){
                display.strokeRect(j * tam_b_X, i * tam_b_Y, tam_b_X, tam_b_Y);
            }
        }
    }
}

function Clear_screen(display){
    display.clearRect(0, 0, canvas.width, canvas.height);
}

function Update_pos(){
    for(var i=snk.corpo.length-1;i>0;i--){
        snk.corpo[i][0] = snk.corpo[i-1][0];
        snk.corpo[i][1] = snk.corpo[i-1][1];
    }
    if(snk.direct == Up){
        snk.corpo[0][1] -= tam_b_Y;
    }
    else if(snk.direct == Down){
        snk.corpo[0][1] += tam_b_Y;
    }
    else if(snk.direct == Left){
        snk.corpo[0][0] -= tam_b_X;
    }
    else{
        snk.corpo[0][0] += tam_b_X;
    }
}

function New_pos(tam_b, limit_i, limit_f){
    var result = Math.floor(Math.random() * (limit_f - limit_i) + limit_i);
    console.log()
    return parseInt(result/tam_b)*tam_b;
}

function Check_change(){
    if(snk.corpo[0][0] == app.pos[0] && snk.corpo[0][1] == app.pos[1]){
        snk.corpo.push([-10,-10]);
        app.pos = [New_pos(tam_b_X, 0, canvas.width), New_pos(tam_b_Y, 0, canvas.height)];
    }
}

function Get_char(){
    window.addEventListener('keydown', event => {
        var key_name = event.keyCode;
        switch(key_name){
            case 37:
                if(snk.direct != Right){
                    snk.direct = Left;
                }
                break;
            case 39:
                if(snk.direct != Left){
                    snk.direct = Right;
                }
                break;
            case 38:
                if(snk.direct != Down){
                    snk.direct = Up;
                }
                break;
            case 40:
                if(snk.direct != Up){
                    snk.direct = Down;
                }
                break;
        }
    })
}

function Check_touch_snake(){
    for(var i=snk.corpo.length-1;i>0;i--){
        if(snk.corpo[0][0] == snk.corpo[i][0] && snk.corpo[0][1] == snk.corpo[i][1]){
            return true;
        }
    }
    return false;
}

function Check_loss(){
    if(Check_touch_snake()){
        var change = document.querySelector('.Window');

        change.innerHTML = `<div class="perdeu">Deseja jogar novamente?
        <button class="btn botao-sim">Sim</button></div>`;
        clearInterval(stop);

        change.getElementsByClassName('botao-sim')[0].addEventListener('click', () => {
            location.reload();
        })
    }
}

function Check_out_screen(){
    if(snk.corpo[0][0] >= canvas.width){
        snk.corpo[0][0] -= canvas.width;
    }
    else if(snk.corpo[0][0] < 0){
        snk.corpo[0][0] += canvas.width;
    }
    else if(snk.corpo[0][1] < 0){
        snk.corpo[0][1] += canvas.height;
    }
    else if(snk.corpo[0][1] >= canvas.height){
        snk.corpo[0][1] -= canvas.height;
    }
}

Get_char();

display = Init_canvas();
snk = new Snake();
app = new Apple();

function Main(){
    Clear_screen(display);
    //plotar tudo
    Render(snk, app);
    Update_pos();

    //pegar a entrada via teclado
    Check_change();
    Check_loss();
    Check_out_screen();
    //atualizar tela
    Update(display);
}

var stop = setInterval(Main, 100);