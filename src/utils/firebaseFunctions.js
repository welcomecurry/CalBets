import { collection, setDoc, doc, getDoc, getDocs} from "firebase/firestore";

const DEFAULT_BALANCE = 500;

const fetchUserBets = async (db, userId) => {
  const betsRef = collection(db, "users", userId, "bets");
  const querySnapshot = await getDocs(betsRef);
  var userBets = {};
  querySnapshot.forEach((doc) => {
    userBets[doc.id] = doc.data();
  });

  return userBets;
};

const fetchUserData = async (db, userId) => {
  const userDoc = doc(db, "users", userId);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};

const updateUserBalance = async (db, userId, value) => {
  const userDoc = doc(db, "users", userId);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    const oldBalance = docSnap.data().balance;
    await setDoc(userDoc, { balance: oldBalance - value });
  }

};

const createUserData = async (db, userId) => {
  const usersRef = collection(db, "users");
  await setDoc(doc(usersRef, userId), { balance: DEFAULT_BALANCE });
};

const setGame = async (db, game) => {
  // Save game details
  const gamesRef = collection(db, "games");
  await setDoc(doc(gamesRef, game.id), game);
};

const fetchGame = async (db, gameId) => {
  const gameDoc = doc(db, "games", gameId);

  const docSnap = await getDoc(gameDoc);
  if (docSnap.exists()) {
    return docSnap.data();
  };
};

const setUserBet = async (db, userId, gameId, odds, value) => {
  // Add bet to user
  const betsRef = collection(db, "users", userId, "bets");
  await setDoc(doc(betsRef, gameId), {
    odds: odds,
    value: value,
  });
};

export {
  fetchUserBets,
  fetchUserData,
  fetchGame,
  setGame,
  createUserData,
  setUserBet,
  updateUserBalance,
};
