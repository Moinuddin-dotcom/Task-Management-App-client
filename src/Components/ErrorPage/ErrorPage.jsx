
import Lottie from "lottie-react";
import errorLotti from '../../../src/assets/ErrorPage/Animation-error_page.json'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='bg-white min-h-screen'>
            <div className='max-w-[50vw] mx-auto'>
                <Lottie animationData={errorLotti} ></Lottie>
                <div className="divider divider-error">
                    <button className="btn btn-warning ">
                        <Link to={'/'} >Return Home Page</Link>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ErrorPage
