function Login() {
    return (
        <div className="h-screen w-full bg-black flex items-center justify-center">
            <h1 className="absolute top-6 left-10
               text-[#E50914]
               text-6xl
               tracking-widest
               drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
    style={{ fontFamily: "Bebas Neue, sans-serif" }}>
  NANDFLIX
</h1>

            {/* Background image */}

            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>

            {/* Login Card */}
            <div className="relative bg-black/80 p-10 rounded-lg w-[380px]">
                <h2 className="text-2xl text-[#E50914] font-bold mb-6">Sign In</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 
             bg-gray-800/70 
             text-white 
             placeholder-gray-400
             rounded 
             outline-none 
             focus:ring-2 
             focus:ring-red-600"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 
             bg-gray-800/70 
             text-white 
             placeholder-gray-400
             rounded 
             outline-none 
             focus:ring-2 
             focus:ring-red-600"
                />


                <button className="w-full bg-red-700 hover:bg-red-600
                   p-3 rounded font-semibold 
                   transition duration-200">
                    Sign In
                </button>

            </div>

        </div>
    )
}

export default Login
