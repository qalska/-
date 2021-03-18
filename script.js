// Функция решения квадратного уравнения возвращает объект с двумя корнями
const solveQuadratic = (a, b, c) => {
    let x1 = null;
    let x2 = null;

    const D = (b**2) - (4 * a * c);

    if (D === 0) x1 = ((-b) / 2*a);

    if (D > 0){
        x1 = (((-b) + Math.sqrt(D)) / (2 * a))
        x2 = (((-b) - Math.sqrt(D)) / (2 * a))
    }

    return { x1: x1, x2: x2, D }
}
const onSolveQuadratic = () => {
    const a = document.querySelector('#a-id').value;
    const b = document.querySelector('#b-id').value;
    const c = document.querySelector('#c-id').value;

    // Деструктуризация
    const {x1 , x2, D} = solveQuadratic(a, b, c);

    if (D < 0) {
        toggleErrors('D < 0!', true, '');
        return false;
    }

    if (x1 !== null && x2 !== null) {
        toggleErrors('', false);
    }

    if (x1 === null && x2 === null) {
        toggleErrors('Нет корней!', true, '');
    }

    if ((x1 === null && x2 !== null) || (x1 !== null && x2 === null)) {
        toggleErrors('Только один корень:');
    }

    document.querySelector('#x1-id').value = x1;
    document.querySelector('#x2-id').value = x2;
}

// Работа с Local Storage

// Сохраняли данные a, b, c в разные поля Local Storage
// const form = document.querySelector('#form');
// const elements = form.elements;

// const changeForm = (element) => {
//     let name = element.getAttribute('id');
//     let value = element.value;
//     localStorage.setItem(name, value);
// }

// const onDataStorage = () => {
//     for (i=0; i < elements.length; i++) {
//         changeForm(elements[i])
//     }
// }

// const checkStorage = () => {
//     for (i=0; i < elements.length; i++) {
//         elements[i].value = localStorage.getItem(elements[i].getAttribute('id'))
//     }
// }

const onSaveInStorage = () => {
    const data = {
        'a': document.querySelector('#a-id').value,
        'b': document.querySelector('#b-id').value,
        'c': document.querySelector('#c-id').value
    }
    localStorage.setItem('data', JSON.stringify(data));
}

const enterDataIntoInput = () => {
    const form = document.querySelector('#form');
    const elements = form.elements;
    const savedData = localStorage.getItem('data');
    const savedRoots = JSON.parse(savedData);

    let rootKeys = Object.keys(savedRoots);
    for (i=0; i < rootKeys.length; i++) {
        document.querySelector(`#${rootKeys[i]}-id`).value = savedRoots[rootKeys[i]]
    }
}

const onStorageClear = () => {
    localStorage.clear();
}

const onClearForm = () => {
    const inputs = document.querySelector('#form');
    const elements = form.elements;

    for (i = 0;  i < inputs.length; i++) {
        inputs[i].value = '';
    }
}
const onClearBtn = () => {
    onStorageClear();
    onClearForm();
}

// Функция инициализации событий
const initEvents = () => {
    document.querySelector('#btn-ready').onclick = onSolveQuadratic;
    document.querySelector('#btn-save').onclick = onSaveInStorage;
    document.querySelector('#btn-clear').onclick = onClearBtn;

}

const toggleErrors = (errorText, show = true, rootInputText) => {
    let errorBlock = document.querySelector('#errors');
    errorBlock.innerHTML = errorText;
    errorBlock.style.display = show ? 'block' : 'none';
    let x1Input = document.querySelector('#x1-id');
    let x2Input = document.querySelector('#x2-id');
    x1Input.value = rootInputText;
    x2Input.value = rootInputText;
}

// Основная функция инициализации всего
const init = () => {
    enterDataIntoInput();
    toggleErrors('', false, '');
    initEvents();
}
init()