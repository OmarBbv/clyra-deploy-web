import { ArrowUp, House } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchPopup from '../components/SearchPopup'

const HelperTool = () => {
    const [showTool, setShowTool] = useState(false)

    function handleUpPage() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            setShowTool(window.scrollY > 200)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="flex justify-center pointer-events-none w-full bg-red-500">
            <div className={` fixed bottom-4 z-50  border-gray-700 bg-[#1A1A1A] text-white  rounded-lg
                    shadow-lg
                    transition-all
                    duration-300
                    pointer-events-auto
                    p-2
                    ${showTool ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `} >
                <ul className="flex sm:hidden items-center justify-between w-full h-auto text-sm gap-3">
                    <li className="hover:text-gray-300 cursor-pointer transition duration-200">
                        <Link to="/">
                            <House />
                        </Link>
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer transition duration-200">
                        <SearchPopup />
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer transition duration-200">
                        <ArrowUp onClick={handleUpPage} />
                    </li>
                </ul>

                <ul className="hidden sm:flex items-center justify-between w-full h-auto text-sm gap-3">
                    <li className="hover:text-gray-300 cursor-pointer transition duration-200">
                        <Link className="flex items-center gap-2" to="/">
                            <House className="w-5" />
                            <span>Ana Sayfa</span>
                        </Link>
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer transition duration-200">
                        <SearchPopup />
                    </li>
                    <li className="hover:text-gray-300 cursor-pointer transition duration-200">
                        <button
                            onClick={handleUpPage}
                            className="flex items-center gap-2"
                        >
                            <ArrowUp className="w-5" />
                            <span>Üst Sayfaya Dön</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HelperTool