import {
  collection,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import uuid from "uuid";

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

const updateUserBalanceOnPlaceBet = async (db, userId, value) => {
  const userDoc = doc(db, "users", userId);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    const oldBalance = docSnap.data().balance;
    await updateDoc(userDoc, { balance: oldBalance - value });
  }
};

const updateUserBalance = async (db, userId, newValue) => {
  const userDoc = doc(db, "users", userId);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    await updateDoc(userDoc, { balance: newValue });
  }
};

const createUserData = async (db, userId) => {
  const usersRef = collection(db, "users");
  await setDoc(doc(usersRef, userId), { balance: DEFAULT_BALANCE });
};

const setGame = async (db, gameId, game) => {
  // Save game details
  const gamesRef = collection(db, "games");
  await setDoc(doc(gamesRef, gameId), game);
};

const updateGame = async (db, gameId, game) => {
  const gamesRef = collection(db, "games");
  await updateDoc(doc(gamesRef, gameId), game);
};

const fetchGame = async (db, gameId) => {
  const gameDoc = doc(db, "games", gameId);

  const docSnap = await getDoc(gameDoc);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

const createUserBet = async (db, userId, gameId, odds, value, choice) => {
  // Add bet to user
  const betsRef = collection(db, "users", userId, "bets");
  const betId = uuid.v4();
  await setDoc(doc(betsRef, betId), {
    odds: odds,
    value: value,
    gameId: gameId,
    choice: choice,
    active: true,
    result: null,
    date: Timestamp.fromDate(new Date()),
  });
};

const settleUserBet = async (db, userId, betId, result) => {
  const betDoc = doc(db, "users", userId, "bets", betId);
  const docSnap = await getDoc(betDoc);

  if (docSnap.exists()) {
    await updateDoc(betDoc, { active: false, result: result });
  }
};

export {
  fetchUserBets,
  fetchUserData,
  fetchGame,
  setGame,
  updateGame,
  createUserData,
  createUserBet,
  settleUserBet,
  updateUserBalance,
  updateUserBalanceOnPlaceBet,
};
