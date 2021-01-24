// Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.addEventListener("DOMContentLoaded", function () {

    initTodos();

});

let api_url = "https://ejb4u226j9.execute-api.us-east-1.amazonaws.com/dev/todos/"


// Event Handlers
function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '')
        addTodo(input.value, "Test");
    input.value = '';
}

function initTodos() {

    var requestOptions = {
        method: 'GET'
    };



    fetch(api_url, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            data = json;
            for (var i = 0; i < data.length; i++) {
                let ul = document.querySelector('ul');
                let li = document.createElement('li');
                li.innerHTML = `
                    <span class="todo-item">${data[i]['text']}</span>
                    <button name="checkButton"><i class="fas fa-check-square"></i></button>
                    <button name="deleteButton" ><i class="fas fa-trash"></i></button>
                `;
                li.classList.add('todo-list-item');
                ul.appendChild(li);
            }
        });
}

function rest_add_todo(todo, description) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\"text\": \"" + todo + "\"}";

    console.log(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(api_url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function addTodo(todo, description) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="checkButton"><i class="fas fa-check-square"></i></button>
        <button name="deleteButton" ><i class="fas fa-trash"></i></button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);

    rest_add_todo(todo, description);
}

function handleClickDeleteOrCheck(e) {
    if (e.target.name == 'checkButton')
        checkTodo(e);

    if (e.target.name == 'deleteButton')
        deleteTodo(e);
}

function checkTodo(e) {
    let item = e.target.parentNode;
    if (item.style.textDecoration == 'line-through')
        item.style.textDecoration = 'none';
    else
        item.style.textDecoration = 'line-through';
}

function rest_delete_todo(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(api_url + id, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

async function get_id_for_name(todo) {
    var requestOptions = {
        method: 'GET'
    };

    var obj;
    const response = await fetch(api_url, requestOptions)
        .then(res => res.json())
        .then(data => obj = data)
        
    return obj
}

function deleteTodo(e) {
    let item = e.target.parentNode;

    item.addEventListener('transitionend', function () {
        item.remove();
    });

    item.classList.add('todo-list-item-fall');

    let TodoName = item.innerText.split('\n')[0];

    console.log(TodoName);

    let Id = get_id_for_name(TodoName).then(function(result) {
        data = result;
        for (var i = 0; i < data.length; i++){
            if (data[i]['text'] == TodoName) {
                rest_delete_todo(data[i]['id']);
            }
        }
    });

}

document.getElementById('clearAll').addEventListener('click', handleClearAll);

function handleClearAll(e) {
    document.querySelector('ul').innerHTML = '';
}