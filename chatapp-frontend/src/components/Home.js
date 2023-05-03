import Users from "./Users";
import Login from "./Login";

function Home() {
    let token = JSON.parse(localStorage.getItem('token'));


    return (
        <div >
            {
                token ?
                    <>
                        <Users />
                    </>
                    :
                    <>
                        <Login />
                    </>
            }
        </div>
    );
}

export default Home;