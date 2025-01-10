import { Page } from "../icons/Page";
import { ShareIcon } from "../icons/ShareIcon";

interface Cardprops {
    title:string,
    link:string,
    type:"youtube" | "twitter"
}


export function Card( {title,link,type}:Cardprops){
    return <div>
        <div className="bg-white rounded-md shadow-md p-4 border-gray-200  max-w-72 border min-h-48">
            {/* Top section */}
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <Page />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                         <ShareIcon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon />
                    </div>
                </div>
            </div>

            {/* frames */}
            <div className="pt-4">

                {type === 'youtube' && <iframe className="w-full" src={link.replace('watch' ,'embed').replace('?v=','/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {/* tweet */}
                {type === 'twitter' &&  <blockquote className="twitter-tweet">
                    <a href={link.replace('x.com' , 'twitter.com')}></a> 
                </blockquote>}
               
            </div>

        </div>
    </div>
} 