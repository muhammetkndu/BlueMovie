import { useState } from "react"

export default function(){

    const [isSwapped, setIsSwapped] = useState(false);

    const toggle = () => setIsSwapped(!isSwapped);


    return(
        <nav className="absolute top-0 left-0 w-full z-10 p-2 ">
            <div className="flex justify-between items-center p-2 text-white text-bold ">
                <h1 className="font-bold text-lg cursor-pointer hover:text-red-500 ">MamiHub</h1>
                <div className="relative">
                    <input
                    className="p-2 rounded-2xl border w-80 t-0 focus:outline-none "
                    placeholder="Film, Dizi Arayın"
                    type="text" />
                    <button>
                        <i className="bi bi-search absolute right-3 bottom-2 "></i>
                    </button>
                </div>

                <div
                className="flex gap-2 text-lg p-1 cursor-pointer select-none"
                onClick={toggle}
                    >
                    {isSwapped ? (
                   
                        <i className="bi bi-moon text-2xl"></i>
                
                 ) : (
                        <i className="bi bi-sun text-2xl"></i>
                    
                    )}
                </div>
                
                    <ul className="flex gap-6 font-bold p-1">
                        <li className="py-1 border-b border-transparent hover:border-white rounded ">Anasayfa</li>
                        <li className="py-1 border-b border-transparent hover:border-white rounded">Filmler</li>
                        <li className="py-1 border-b border-transparent hover:border-white rounded">Diziler</li>
                        <li className="py-1 border-b border-transparent hover:border-white rounded">Favoriler</li>
                    </ul>
            </div>
        </nav>
    )
}