import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { doc, onSnapshot } from "firebase/firestore";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;


  componentDidMount() {
    //console.log("aaaaaaaaaa ", user);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("bbbbbbbbbbb ", userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (user) => {
          console.log("Current data1: ", user);
          console.log("Current data2: ", user.data());
          this.setState({
            currentUser: {
              id: user.id,
              ...user.data()
            }
          },
            () => {
              console.log("xxxxxxxxxxx ", this.state);
            }
          )
        });


      }
      this.setState({ currentUser: userAuth });

    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/signin' element={<SignInAndSignUpPage />} />
        </Routes>
      </div >
    );
  }
}


export default App;
