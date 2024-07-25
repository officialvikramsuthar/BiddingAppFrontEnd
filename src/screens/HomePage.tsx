import ItemList from '../components/ItemList';
import Navbar from '../components/Navbar';

const HomePage = () => {
    let isAuthenticated = localStorage.getItem('authenticated')
    return <>
            <Navbar />
            {isAuthenticated?<ItemList />:<h1>Login To Continue</h1>}
            </>
}

export default HomePage;