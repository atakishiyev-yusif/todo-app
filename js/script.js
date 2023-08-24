const todos  = document.querySelector('.todos');
const todoInput = document.querySelector('#todoInput');
const addButton = document.querySelector('#addButton');
const completedList = document.querySelector('#completedList');
const incompleteList = document.querySelector('#incompleteList');
const itemsLength = document.querySelector('.items-length')
const clearAll = document.querySelector('#clearAll')
const moonIcon = document.querySelector('#moonIcon');
const sunIcon = document.querySelector('#sunIcon')
const clearCompleted = document.querySelector('#clearCompleted');

const filterAll = document.querySelector('#filterAll');
const filterActive = document.querySelector('#filterActive');
const filterCompleted = document.querySelector('#filterCompleted');

todos.classList.add('opacity-none');


// open modal by id
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('modal-open');
}

// close currently open modal
function closeModal() {
    document.querySelector('.modal.open').classList.remove('open');
    document.body.classList.remove('modal-open');
}

window.addEventListener('load', function() {
    // close modals on background click
    document.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });
});


/* Change Dark/Light theme */
const changeTheme = () => {
    moonIcon.classList.add('dp-none');

    moonIcon.addEventListener('click', () => {
        moonIcon.classList.add('dp-none');
        sunIcon.classList.remove('dp-none')
        document.body.classList.remove('dark');
    })

    sunIcon.addEventListener('click',  () => {
        moonIcon.classList.remove('dp-none');
        sunIcon.classList.add('dp-none')
        document.body.classList.add('dark');
    })
}
changeTheme()

/* Todos Filter. (Active, Completed) */
const filter = () =>{
    filterAll.addEventListener('click', ()=>{
        filterAll.classList.add('active');
        filterActive.classList.remove('active');
        filterCompleted.classList.remove('active');

        completedList.classList.remove('dp-none');
        incompleteList.classList.remove('dp-none');
    })

    filterActive.addEventListener('click', () => {
        filterActive.classList.add('active');
        filterAll.classList.remove('active');
        filterCompleted.classList.remove('active');

        incompleteList.classList.remove('dp-none');
        completedList.classList.add('dp-none');
    })

    filterCompleted.addEventListener('click', ()=>{
        filterCompleted.classList.add('active');
        filterActive.classList.remove('active');
        filterAll.classList.remove('active')

        incompleteList.classList.add('dp-none');
        completedList.classList.remove('dp-none')
    })
}

const moveItemToCompletedArea = (todoItem) => {
    todoItem.classList.add('completed');
    setTimeout(() => {
        completedList.appendChild(todoItem);
    }, 500);
}

const completedItem = (checkIconElement, todoNameElement, todoItemElement, checkImgElement) => {
    checkIconElement.addEventListener('click', () => {
    checkIconElement.classList.toggle('active');
    todoNameElement.classList.toggle('complete');
    checkImgElement.classList.remove('opacity-none');
    moveItemToCompletedArea(todoItemElement);
    itemsLength.innerText = incompleteList.children.length-1;

    })
}

const deleteItem = (delElement) => {
    delElement.addEventListener('click', (e) =>{
        e.currentTarget.parentElement.remove();
        itemsLength.innerText = incompleteList.children.length;
    })
}

/* Render Todo */
const renderTodoItem = (todoText) => {

    todos.classList.remove('opacity-none')

    const todoItemElement = document.createElement('li');
    todoItemElement.classList.add('todo-item', 'dp-flex', 'align-center', 'gap-24', 'justify-between');

    const todoLeftElement = document.createElement('div');
    todoLeftElement.classList.add('dp-flex', 'align-center', 'gap-24');
    todoItemElement.append(todoLeftElement);

    const checkIconElement = document.createElement('div');
    checkIconElement.classList.add('icon-check', 'dp-flex', 'align-center', 'justify-center');
    todoLeftElement.append(checkIconElement);
    checkIconElement.addEventListener('click',completedItem);

    const checkImgElement = document.createElement('img');
    checkImgElement.src = './images/icon-check.svg';
    checkImgElement.classList.add('opacity-none');
    checkIconElement.append(checkImgElement);

    const todoNameElement = document.createElement('p');
    todoNameElement.innerText = todoText;
    todoLeftElement.append(todoNameElement);

    const delElement = document.createElement('a');
    delElement.innerHTML = `
        <img class="icon-cross" src="images/icon-cross.svg" alt="icon-cross"/>
    `
    delElement.classList.add('delTodo')
    todoItemElement.append(delElement)

    clearAll.addEventListener('click', () => {
        incompleteList.innerHTML = '';
        completedList.innerHTML = '';
        itemsLength.innerText = '0';
    })

    clearCompleted.addEventListener('click', () => {
        completedList.innerHTML = '';
    })

    completedItem(checkIconElement, todoNameElement, todoItemElement, checkImgElement);
    deleteItem(delElement)
    filter()

    itemsLength.innerText = incompleteList.children.length+1;
    incompleteList.append(todoItemElement)

    todoInput.value = '';
    todoInput.focus();
}

/* Add Todo */
const addTodo = () => {
    if (todoInput.value === '') {
        console.log('Boş giriş.');
    } else {
        renderTodoItem(todoInput.value);
    }
};

/* Add todo with ENTER key */
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});



addButton.addEventListener('click', addTodo);
