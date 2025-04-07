import {Link} from 'react-router-dom';

export default function Header () {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/"/>Home</li>
                    <li><Link to="/about"/>About</li>
                    <li><Link to="/contact"/>Contact</li>
                </ul>
            </nav>
        </>
    )
}