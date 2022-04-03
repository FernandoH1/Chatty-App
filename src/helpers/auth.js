import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { auth } from "../services/firebase";

export function signin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider);
}

export function signInWithGitHub() {
  const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
}