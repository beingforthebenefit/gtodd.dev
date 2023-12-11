function Header() {
    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2x1 font-bold text-gray-800 mr-4">
                        Gerald Todd
                    </h1>
                    <span className="text-base text-gray-500">
                        Developer, Mathematician, Musician, Educator
                    </span>
                </div>
                <ul className="flex space-x-4">
                    <li><a href="#about" className="text-gray-600 hover:text-gray-800">About</a></li>
                    <li><a href="#devprojects" className="text-gray-600 hover:text-gray-800">Dev Projects</a></li>
                    <li><a href="#mathportfolio" className="text-gray-600 hover:text-gray-800">Math Portfolio</a></li>
                    <li><a href="#music" className="text-gray-600 hover:text-gray-800">Music</a></li>
                    <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;