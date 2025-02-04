
import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "../components/Button";
import { Input } from '../components/Input'
import { BACKEND_URL } from "../config";
import axios from "axios";

interface ContentProps {
    open:boolean,
    onClose:() => void
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModel({open,onClose}:ContentProps){
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type,setType] = useState(ContentType.Youtube)

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        console.log(title);
        console.log(link);
        
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
                title,
                link,
                type
        },{
            headers:{
                "Authorization" : localStorage.getItem("token")
            }
        })

        onClose();
    }



    return <div>
        {open && <div>
            <div className='w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center'>
                
            </div>
            <div className='w-screen h-screen fixed left-0 flex justify-center'>   
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center"> 
                        <span className="bg-white opacity-100 rounded-sm p-4"> 
                            <div className="flex justify-end">
                                <div onClick={onClose} className="cursor-pointer">
                                    <CrossIcon />
                                </div>
                            </div>
                            <div>
                                <Input reference={titleRef} placeholder={"Title"} />
                                <Input reference={linkRef} placeholder={"Link"} />
                            </div>
                            <div>
                                <h1>Type</h1>
                                <div className="flex gap-1 justify-center pb-2">
                                    <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={
                                        () => {
                                            setType(ContentType.Youtube)
                                        }
                                    }  />
                                    <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={
                                        () => {
                                            setType(ContentType.Twitter)
                                        }
                                    }  />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button variant="primary"  text='Submit' onClick={addContent} />
                            </div>
                        </span>

                    </div>
                </div>
            </div>
        </div>}
    </div>
}



