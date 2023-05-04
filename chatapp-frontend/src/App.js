import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Messenger from "./components/Messenger";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignUpSuccessful from "./components/SignUpSuccessful";
import SignUpFail from "./components/signUpFail";
import NotFound from "./components/NotFound";
import UnAuthenticated from "./components/UnAuthenticated";

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
                <Route path='*' element={<NotFound/>}/>
                <Route path='/unauthorized' element={<UnAuthenticated/>}/>
            </Routes>
        </div>
    );
}

export default App;
