import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {IconFilterReducer, SearchReducer, UserReducer, CartReducer} from './adminReducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import { cartitems } from './adminAction';


const reducer = combineReducers({
    user: UserReducer,
    search: SearchReducer,
    iconfilter: IconFilterReducer,
    cart: CartReducer,
    userItems: cartitems,
})

async function savetoLocalStorage(state) {
    try{
        const serialsedState = JSON.stringify(state);
        localStorage.setItem('goh',serialsedState)
    }catch(e){
       return false
    }
}

function loasdFromLocalStorage(){
    try{
        const serialsedState = localStorage.getItem('goh');
        if(serialsedState === null) return undefined;
        return JSON.parse(serialsedState)
    }catch(e){
        return undefined;
    }
}

const middleware = [thunk];

const store = createStore(
    reducer,  
    loasdFromLocalStorage(),
    composeWithDevTools(applyMiddleware( ...middleware)),
)

store.subscribe(() => savetoLocalStorage(store.getState()))

export default store;