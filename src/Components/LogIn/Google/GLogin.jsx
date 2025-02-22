import toast from "react-hot-toast"
import useAuth from "../../Hooks/useAuth"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { useNavigate } from "react-router-dom"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { Button } from "@headlessui/react"


const GLogin = () => {
    const { googleLogin } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const handleGoogle = async () => {
        try {
            const res = await googleLogin()
            console.log("Google data=>", res.user)

            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName,
                photo: res.user?.photoURL,
            }
            const { data } = await axiosPublic.post('/users', userInfo)
            console.log(data)
            const tokenRes = await axiosSecure.post('/jwt', { email: res.user.email });
            console.log("Token Response =>", tokenRes.data)

            if (data.insertedId || tokenRes.data.success) {
                toast.success("User logged in successfully")
            }
            navigate('/')
            // if (data.insertedId || data.insertedId === null) {

            // } else {
            //     toast.error("Failed to log in");
            // }

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <Button
                onClick={handleGoogle}
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                <span>Google</span>
            </Button>
        </div>
    )
}

export default GLogin
