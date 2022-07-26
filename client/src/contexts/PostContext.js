import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import {
	ADD_POST,
	apiUrl,
	DELETE_POST,
	FIND_POST,
	POSTS_LOADED_FAIL,
	POSTS_LOADED_SUCCESS,
	UPDATE_POST
} from './constancs'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	//state
	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		postsLoading: true
	})

	const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	//Get all posts form DB
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({
					type: POSTS_LOADED_SUCCESS,
					payload: response.data.posts
				})
			}
		} catch (error) {
			dispatch({ type: POSTS_LOADED_FAIL })
		}
	}

	//Add post to DB
	const addPost = async newPost => {
		try {
			const response = await axios.post(`${apiUrl}/posts`, newPost)

			if (response.data.success) {
				dispatch({ type: ADD_POST, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	//delete post
	const deletePost = async postId => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`)
			if (response.data.success) {
				dispatch({ type: DELETE_POST, payload: postId })
			}
		} catch (error) {
			console.log(error)
		}
	}

	//find post when user is updating post
	const findPost = postId => {
		const post = postState.posts.find(post => post._id === postId)
		dispatch({ type: FIND_POST, payload: post })
	}
	//update post
	const updatePost = async updatedPost => {
		try {
			const response = await axios.put(
				`${apiUrl}/posts/${updatedPost._id}`,
				updatedPost
			)
			if (response.data.success) {
				dispatch({ type: UPDATE_POST, payload: response.data.post })
			}

			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	//get date time
	const getDatetime = () => {
		let now = new Date()

		const hours = now.getHours()
		const minute = now.getMinutes()
		const date = now.getDate()
		const month = now.getMonth()
		const year = now.getFullYear()

		const datetimeString = `${hours}:${minute} ~ ${month}/${date}/${year}`

		return datetimeString
	}

	//post context data
	const postContextData = {
		postState,
		getPosts,
		addPost,
		deletePost,
		findPost,
		updatePost,
		showAddPostModal,
		setShowAddPostModal,
		showUpdatePostModal,
		setShowUpdatePostModal,
		showToast,
		setShowToast,
		getDatetime
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
