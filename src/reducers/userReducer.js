//Reducer for character information Initialize State
const initState = {}

//Define Actions
const userReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case 'SET_USERDATA':
            return action.payload

        case 'CHANGE_OCCUPATION':
            return {
                ...state,
                occupation: action.payload
            }
        case 'CHANGE_AGE':
            return {
                ...state,
                age: action.payload
            }
        default:
            return state
    }
}

export default userReducer;