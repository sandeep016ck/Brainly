
import { useRef } from 'react'
import {Button} from '../components/Button'
import { Input } from '../components/Input'
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password
        })  
        navigate('/signin')
    }

    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white border min-w-48 p-8 rounded-md">
            <Input reference={usernameRef} placeholder="username" />
            <Input reference={passwordRef} placeholder="password" />
            <div className='flex justify-center pt-4'>
                <Button text="Submit" variant='primary' fullWidth={true} loading={false} onClick={signup} />
            </div>
        </div>
    </div>
}