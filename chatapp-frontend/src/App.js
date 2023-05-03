import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Messenger from "./components/Messenger";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignUpSuccessful from "./components/SignUpSuccessful";
import SignUpFail from "./components/signUpFail";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/signUp' element={<SignUp/>} />
                <Route path='/signUpSuccessful' element={<SignUpSuccessful/>} />
                <Route path='/signUpFail' element={<SignUpFail/>} />
                <Route path='/home' element={<Home/>}/>
                <Route path='/chat' element={<Messenger/>}/>
            </Routes>
        </div>
    );
}

export default App;
