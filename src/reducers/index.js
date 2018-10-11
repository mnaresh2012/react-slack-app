const appReducer = (currState, action) => {
  
  switch(action.type) {
    case 'GET_USERNAME':
      return Object.assign({}, {
        username: action.username,
        screen: 'EntryScreen'
      })

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'ChatScreen',
        username: action.username
      })
      
    case 'LOGOUT_USER':
      return Object.assign({}, {
        screen: '',
        username:''
      })
    default:
      return currState;
  }
};
module.exports = appReducer;
