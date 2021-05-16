import { createContext, useReducer } from "react";

export default (reducer, actions, initialState) => {
  const Context = createContext();
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const bindActionWithDispatch = {};
    for (let key in actions) {
      bindActionWithDispatch[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...bindActionWithDispatch }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
