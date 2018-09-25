import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,withRouter} from 'react-router-dom';
import Welcome from './component/Welcome';
import registerServiceWorker from './registerServiceWorker';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import CreateArticle from './component/CreateArticle';
import Login from './component/Login';
import SingleArticle from './component/SingleArticle';
import Signup from './component/Signup';

class App extends React.Component{

    constructor(){
        super();
        this.state={
            authUser: null
        }
    }
    componentDidMount(){
        const user=localStorage.getItem('user');
        if(user){
            this.setState({
                authUser: JSON.parse(user)
            })
        }
    }
    setAuthUser=(authUser)=>{
        this.setState({
            authUser
        });
    };
    render(){

        const {location}=this.props;

        return (<div>
            {
                location.pathname !== '/login' && location.pathname !== '/signup' &&
                <Navbar authUser={this.state.authUser}></Navbar>
    
            }
            
            <Route exact path="/" component={Welcome}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/articles/create" component={CreateArticle}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/article/:slug" component={SingleArticle}></Route>
            <Route path="/signup" render={(props)=> <Signup {...props}setAuthUser={this.setAuthUser}></Signup>}></Route>
            
    
            {
                location.pathname !== '/login' && location.pathname !== '/signup' &&
                <Footer></Footer>
     
            }
        </div>);
    }
}


const Main = withRouter((props)=>{
    return (
        <App {...props}/>
    );
});

const Home = () => {
    return <h1>This is home page</h1>
}

const About = () => {
    return <h1>This is About page</h1>
}

ReactDOM.render(<BrowserRouter>
    <Main />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
