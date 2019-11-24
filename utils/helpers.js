import { AsyncStorage } from "react-native"

//This is an helper method for creating keys and generating uniqu id

export const MOBILEFLASHCARD_STORAGE_KEY = "Udacity:MobileFlashCards"
export const NOTIFICATION_KEY = "MobileFlashCards:Notifications";

// Create a Unique id for each deck
export const generateUniId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}



