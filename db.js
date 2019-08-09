export const db = firebase
.initializeApp({ 
  databaseURL: "https://livetech-e1fdd.firebaseio.com",
  projectId: "livetech-e1fdd" })
  .firestore()
