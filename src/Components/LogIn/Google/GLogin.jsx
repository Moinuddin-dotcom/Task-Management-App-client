import toast from "react-hot-toast"
import useAuth from "../../Hooks/useAuth"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { useNavigate } from "react-router-dom"


const GLogin = () => {
    const { googleLogin } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const handleGoogle = async () => {
        try {
            const res = await googleLogin()
            console.log("Google data=>", res.user)

            const userInfo = {
                email: res.user.email,
                name: res.user.displayName,
                photo: res.user.photoURL,
            }
            const { data } = await axiosPublic.post('/users', userInfo)
            console.log(data)
            if (data.insertedId) {
                toast.success("User log in successfully")
            }
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <button
                onClick={handleGoogle}
                className="flex-1 bg-gray-800 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                {/* <img src={googleLogo} alt="google icon" className='h-8' /> */}
                <span>Google</span>
            </button>
        </div>
    )
}

export default GLogin
