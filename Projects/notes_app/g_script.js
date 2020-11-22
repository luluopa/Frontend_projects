const notas = document.querySelector('.Notas');

function Event_save(note){
    return function(){
        var texto = note.getElementsByClassName('words')[0].getElementsByClassName('get')[0];
        var text_inside = texto.value;

        note.getElementsByClassName('words')[0].removeChild(texto);
        note.getElementsByClassName('words')[0].textContent = text_inside;

        var har = note.getElementsByClassName('header')[0]
        har.innerHTML = `<button class="botao-icon" id="excluir"><img src="https://image.flaticon.com/icons/png/512/61/61848.png" alt=""></button>
        <button class="botao-icon" id="editar"><img src="https://img.icons8.com/cotton/2x/edit.png" alt=""></button>`;

        for(var i=0;i<har.getElementsByClassName('botao-icon').length;i++){
            if(har.getElementsByClassName('botao-icon')[i].id == 'excluir'){
                har.getElementsByClassName('botao-icon')[i].addEventListener('click', Event_delete(note));
            }
            else{
                har.getElementsByClassName('botao-icon')[i].addEventListener('click', Event_change(note));
            }
        }
    }
}

function Event_delete(note){
    return function(){
        var all = document.querySelector('.Notas');
        all.removeChild(note);
    }
}

function Event_change(note){
    return function(){
        var har = note.getElementsByClassName('header')[0];
        har.innerHTML = `<button class="botao-icon" id="salvar"><img src="https://image.flaticon.com/icons/png/512/84/84297.png" alt=""></button>
        <button class="botao-icon" id="excluir"><img src="https://image.flaticon.com/icons/png/512/61/61848.png" alt=""></button>`;

        var text = note.getElementsByClassName('words')[0];
        var texto = text.textContent;
        text.innerHTML = '';
        var new_textarea = document.createElement('textarea');
        new_textarea.value = texto;
        new_textarea.className = 'get';
        new_textarea.id = 'modify';
        text.appendChild(new_textarea);

        for(var i=0;i<har.getElementsByClassName('botao-icon').length;i++){
            if(har.getElementsByClassName('botao-icon')[i].id == 'salvar'){
                har.getElementsByClassName('botao-icon')[i].addEventListener('click', Event_save(note));
            }
            else{
                har.getElementsByClassName('botao-icon')[i].addEventListener('click', Event_delete(note));
            }
        }
    }
}

function Event_clear(){
    return function(){
        document.getElementsByClassName('Notas')[0].innerHTML = '';
    }
}

function Event_add(){
    return function(){
        var all = document.querySelector('.Notas');
        var new_note = document.createElement('div');
        new_note.className = 'note';
        var har = document.createElement('div');
        har.className = 'header';

        har.innerHTML = `<button class="botao-icon" id="salvar"><img src="https://image.flaticon.com/icons/png/512/84/84297.png" alt=""></button>
        <button class="botao-icon" id="excluir"><img src="https://image.flaticon.com/icons/png/512/61/61848.png" alt=""></button>`;
        var text = document.createElement('div');
        text.className = 'words'
        var new_textarea = document.createElement('textarea');
        new_textarea.className = 'get';
        new_textarea.id = 'modify';
        text.appendChild(new_textarea);

        for(var i=0;i<har.getElementsByClassName('botao-icon').length;i++){
            if(har.getElementsByClassName('botao-icon')[i].id == 'salvar'){
                har.getElementsByClassName('botao-icon')[i].addEventListener('click', Event_save(new_note));
            }
            else{
                har.getElementsByClassName('botao-icon')[i].addEventListener('click', Event_delete(new_note));
            }
        }

        new_note.appendChild(har);
        new_note.appendChild(text);
        all.appendChild(new_note);
    }
}

function Add_events(){
    var botao_clear = document.querySelector('#clear');
    var botao_add = document.querySelector('#plus-one');

    botao_add.addEventListener('click', Event_add());
    botao_clear.addEventListener('click', Event_clear());
}

Add_events();