import Dinero from "dinero.js";

const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_CATALOG":
            return {
                ...state,
                catalog: action.payload,
            };
        case "ADD_TO_BAG":
            return {
                ...state,
                bag: {
                    items: state.bag.items.concat(action.payload),
                    total: (state.bag.total += action.payload[0].price),
                },
            };
        case "REMOVE_FROM_BAG":
            const bagItems = state.bag.items.filter(function (item) {
                return item.uuid !== action.payload.item.uuid;
            });
            return {
                ...state,
                bag: {
                    items: bagItems,
                    total: (state.bag.total -= action.payload.item.price),
                },
            };
        case "EMPTY_BAG":
            return {
                ...state,
                bag: {
                    items: [],
                    total: 0,
                },
            };
        case "IS_LOGGING_IN":
            return {
                ...state,
                isLoggingIn: action.payload,
            };
        default:
            return state;
    }
};

export default Reducer;
