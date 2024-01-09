// using context
import { createContext, useEffect, useState } from 'react'

// call store context
const AppContext = createContext()

// func Provider
const AppProvider = ({ children }) => {
  let [user, setUser] = useState([])

  // useEffect(() => {
  //   setUser({
  //     "patientId": 1,
  //     "firstName": "Người dùng",
  //     "lastName": "",
  //     "image": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FReactNative-5f377262-6aa2-4a84-8370-807d68f6caee/ImagePicker/9eb0b0e2-2699-465f-9c7a-b09ac10ff6dc.jpeg",
  //     "address": "",
  //     "birthday": "1990-01-01",
  //     "gender": "Khác",
  //     "phone": "",
  //     "email": "kieudanh.app@gmail.com",
  //     "userId": 2,
  //     "role": "patient"
  //   })
  // }, [])

  // lưu state, function,.. vào đây
  const rootStore = {
    user, setUser,
  }

  return (
    <AppContext.Provider value={rootStore}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }