var control;

const soma = 0;
const subt = 1;
const multi = 2;
const div = 3;

var number1, number2;

function Add_event(){
    var array_button = document.getElementsByTagName('td');
    for(var i=0;i<array_button.length;i++){
        array_button[i].addEventListener('click', Add_input(array_button[i]));
    }

    document.getElementById('soma').addEventListener('click', () => {
        number1 = parseInt(document.getElementById('input-user').value);
        document.getElementById('input-user').value = '';
        control = soma;
    })
    document.getElementById('subt').addEventListener('click', () => {
        number1 = parseInt(document.getElementById('input-user').value);
        document.getElementById('input-user').value = '';
        control = subt;
    })
    document.getElementById('div').addEventListener('click', () => {
        number1 = parseInt(document.getElementById('input-user').value);
        document.getElementById('input-user').value = '';
        control = div;
    })
    document.getElementById('multi').addEventListener('click', () => {
        number1 = parseInt(document.getElementById('input-user').value);
        document.getElementById('input-user').value = '';
        control = multi;
    })

    document.getElementById('result').addEventListener('click', () => {
        number2 = parseInt(document.getElementById('input-user').value);
        document.getElementById('input-user').value = '';
        switch (control){
            case soma:
                var result = sum(number1, number2);
                document.getElementById('input-user').value = result;
                break;
            case subt:
                var result = sub(number1, number2);
                document.getElementById('input-user').value = result;
                break;
            case div:
                var result = divi(number1, number2);
                document.getElementById('input-user').value = result;
                break;
            case multi:
                var result = mult(number1, number2);
                document.getElementById('input-user').value = result;
                break;

        }
    })

    document.getElementById('clear').addEventListener('click', () => {
        number1 = -1;
        number2 = -1;
        document.getElementById('input-user').value = '';
        control = -1;
    })
}

function Add_input(obj){
    return function(){
        var value_obj = obj.getElementsByTagName('button')[0];
        document.getElementById('input-user').value += value_obj.textContent;
    }
}

function sum(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

function divi(a,b){
    if(b != 0){
        return a/b;
    }
    return null;
}

function mult(a,b){
    return a*b;
}

Add_event();