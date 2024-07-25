import AddItem from '../components/AddItem';
import Auth from '../components/Auth';
import Navbar from '../components/Navbar';

const HomePage = () => {
    let isAuthenticated = localStorage.getItem('authenticated')
    return <>
            <Navbar />
            {isAuthenticated ? <AddItem /> : <Auth /> }
            </>
}

export default HomePage;