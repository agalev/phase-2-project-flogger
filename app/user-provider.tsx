'use client'
import { createContext, useReducer } from 'react'

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'LOGIN':
				return {
					...state,
					user: action.payload.user,
					medium_username: action.payload.user.medium_username
				}
			case 'LOGOUT':
				return {
					...state,
					user: null
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
		user: null,
		medium_username: null,
		favorites: []
	})

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
