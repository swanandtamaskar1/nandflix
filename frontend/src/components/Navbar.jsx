function Navbar() {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="fixed top-0 w-full flex justify-between items-center px-10 py-4 bg-black z-50">

            <h1 className="text-[#E50914] text-4xl tracking-widest font-bold">
                NANDFLIX
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>
    );
}

export default Navbar;
