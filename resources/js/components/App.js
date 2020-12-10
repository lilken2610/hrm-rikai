import React from 'react';
import ReactDOM from 'react-dom';
import Header from './pages/Navigation/NavTop';
import Menu from './pages/Menu/MenuMain';
import { HashRouter} from 'react-router-dom';
import RoutePath from '../components/Main/common/RouterPath';
import RouterPath from '../components/pages/Main/Common/RoutePath';
import Footer from '../components/pages/Footer/FooterPage';
import '../components/CSS/Main.css';
import '../components/CSS/ValidateServerStyle.css';
function App() {
    return (
        <HashRouter   >
        <div className="main_container">
           <Menu />
           <Header />
           <RoutePath/>
           <Footer />
        </div>
       
        </HashRouter >
  
        

    );
}

export default App;
if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
