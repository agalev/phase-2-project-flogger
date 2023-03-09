'use client'
import { createContext, useReducer } from 'react'

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'LOGIN':
				return {
					...state,
					isLoggedIn: true,
					user: action.payload.user,
					name: action.payload.name,
					medium_username: action.payload.medium_username
				}
			case 'LOGOUT':
				return {
					isLoggedIn: false,
					user: null,
					name: null,
					medium_username: null
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		isLoggedIn: false,
		user: null,
		name: null,
		medium_username: null
	})

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
