import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Messenger from "./components/Messenger";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/chat' element={<Messenger/>}/>
            </Routes>
        </div>
    );
}

export default App;
