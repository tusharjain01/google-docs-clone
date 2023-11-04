import React, { createContext, useContext, useEffect, useState } from "react";
import CreateNewDoc from "./CreateNewDoc";
import ListDoc from "./ListDoc";
import { collection, getDocs,orderBy, query} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
// import Editor from "../Editor";

function Dashboard() {
  const [userDocs, setUserDocs] = useState();
  const { currentUser } = useAuth();
  const docCollectionRef = query(collection(db,"users",currentUser.uid,'docs'),orderBy('createdOn','desc'))
  const getUserDocs = async () => {
    const querySnapShot = await getDocs(
      docCollectionRef
    );
    const udocs = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log(udocs);
    setUserDocs(udocs);
  };

  useEffect(() => {
    getUserDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CreateNewDoc />
      <ListDoc docs={userDocs} />
    </>
  );
}

export default Dashboard;
