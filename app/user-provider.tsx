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
					medium_username: action.payload.medium_username
				}
			case 'LOGOUT':
				return {
					isLoggedIn: false,
					user: null,
					medium_username: null,
					favorites: []
				}
			case 'ADD_FAVORITE':
				return {
					...state,
					favorites: [...state.favorites, action.payload.favorite]
				}
			case 'REMOVE_FAVORITE':
				return {
					...state,
					favorites: state.favorites.filter(
						(favorite) => favorite.id !== action.payload.favorite.id
					)
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		isLoggedIn: false,
		user: null,
		medium_username: null,
		favorites: []
	})
	console.log(state)
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
