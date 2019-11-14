import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
const fakeUserList = [{ username: "bb", password: "ksj", token: "klsjflkjdo" }];
export const loginService = {
  login,
  logout,
  signin,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  fakeUserList
};
function signin(username, password) {
  const userExist = fakeUserList.find(u => u.username == username);
  if (userExist) {
    console.log("signin er", fakeUserList);
    return false;
  } else {
    fakeUserList.push({ username: username, password: password });
    console.log("sinin su", fakeUserList);
    return true;
  }

  console.log("list", fakeUserList);
}
function login(username, password) {
  console.log("username", username, password);

  const user = fakeUserList.find(
    u => u.username == username && u.password == password
  );
  if (user) {
    user.token = "ChatAppToken" + Math.floor(Math.random() * 10000);
    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUserSubject.next(user);
  }

  return user;
  // real code
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch(`api.url.com/users/authenticate`, requestOptions)
    .then(res => res.json())
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);

  //should remove from list - not doing now for testing
}
