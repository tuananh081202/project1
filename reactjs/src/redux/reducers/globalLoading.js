const initialStore={
    status: false
} 

const globalLoading = (state =initialStore, action) => {
    switch(action.type){
        case 'CONTROL_LOADING':
            state = {
                status: action.status
            }
            return state;
        default:
            return state;

    }
}
export default globalLoading;