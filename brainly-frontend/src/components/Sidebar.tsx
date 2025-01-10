import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Sidebaritem } from "./Sidebaritem";
import {Logo} from  "../icons/Logo"


export function Sidebar(){
    return <div className="h-screen bg-white w-72 border-r fixed top-0 left-0 pl-6">
        <div className="flex text-2xl pt-8 items-center gap-2">
            <div className='pr-2 text-purple-600'>
             <Logo />
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <Sidebaritem text='Twitter' icon={<TwitterIcon />} />
            <Sidebaritem text='Youtube' icon={<YoutubeIcon />} />
        </div>
    </div>
}