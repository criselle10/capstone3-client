import React from 'react';

const UserContext = React.createContext()

/*
    Provider

    Every context object comes with a Provider React component.
    This allows components to subscribe to changes made to the context.

    UserProvider component is for only UserContext.
*/

export const UserProvider = UserContext.Provider

export default UserContext