const redux = require('redux');

const initialState = { // объект, описывающий все приложение
    counter: 0
};

// Reducer
const reducer = (state = initialState, action) => {
    // где state - тот объект, который описывает состояние всего приложения
    // state = initialStat - по-умолчанию state является началному состоянию (так указывают, если он еще не определен).
    // action - следует всего 1 правилу, у него ест 1 обязателное поле, которое называет type

    if (action.type === 'ADD') {
        return {
            counter: state.counter +1
        }
    }
    if (action.type === 'SUB') {
        return {
            counter: state.counter -1
        }
    }
    if (action.type === 'ADD_NUBER') {
        return {
            counter: state.counter + action.value
        }
    }

    return state // По правилу reducer'a мы должны всегда возвращат новый state из данной функции
};

// Store // место, где хранятся все данные.
const store = redux.createStore(reducer);
// console.log('1', store.getState());

store.subscribe(() => { // .subscribe метод, с помощю которого мы подписываемся на измение событий (аналаго вызова console.log на каждое событие в изменение state)
    console.log('Subscribe', store.getState());
});

// Action
const addCounter = {
    type: 'ADD' // как было написанно ранее, у action должно быт 1 обяхателное поле - type
};

store.dispatch(addCounter);
// console.log('2', store.getState());

store.dispatch({type: 'SUB'});
// console.log('3', store.getState());

store.dispatch({type: 'ADD_NUBER', value: 10 });
// console.log('4', store.getState());

