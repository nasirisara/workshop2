
import { Route, Routes, Link } from "react-router-dom";
import CrudDemo from './CrudDemo';
import PersonDetails from './PersonDetails';
import UpdatePerson from './UpdatePerson';

const DemoRouter = () => {

    return (
        <>
        <Header/>
        <Routes>
        <Route exact path="/" element={<Welcome/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/person" element={<Person/>} />
            <Route from="/contact" to=""/>
            <Route path="/about" element={<About/>} />
            <Route path="/crud" element={<CrudDemo/>} />
            <Route path="/details/:id" element={<PersonDetails/>} />
            <Route path="/updates/:id" element={<UpdatePerson/>} />
            <Route path="/NotFound" element={<NotFound/>} />
        </Routes>
        </>
    );

};



const Header = () => {
return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="navbar-brand" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/">Welcome</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/person">Person</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link className="navbar-brand" to="/crud">CRUD</Link>
                </li>
            </ul>
            <form>
                <Link className="btn btn-dark" to="/person">Sign Up</Link>
            </form>
        </div>

    </nav>
    )
};

const Welcome = () => <b><h3>Welcome Page</h3></b>
const Home = () => <b><h3>Home Page</h3></b>;
const About = () => <b><h3>About Us Page</h3></b>;
const Person = () => <b><h3>Person Page</h3></b>;
const NotFound = () =><b><h3>Page Not Found</h3></b>;
export default DemoRouter;