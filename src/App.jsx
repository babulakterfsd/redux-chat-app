import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './components/AllRoutes';
import store from './rtk/store/store';
import './styles/App.css';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AllRoutes />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
