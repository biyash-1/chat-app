import axios from "axios";

import { create } from "zustand";


export const useChatStore = create((set) => ({
  messages: [],
  users :[],
  selecteduser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers :async () =>{
    set({ isUserLoading: true })
    try{
        const response = await axios.get('http://localhost:3001/api/message/getUsers')
        set({ users: response.data })
    }catch(error){
        console.log(error)
    }
    set({ isUserLoading: false })
  },
    
  getMessages :async(userId:string) =>{
    set({ isMessagesLoading: true })
    try{
        const response = await axios.get(`http://localhost:8000/messages/${userId}`)
        set({ messages: response.data })
    }catch(error){
        console.log(error)
    }
    set({ isMessagesLoading: false })
  },

 
  }
}))