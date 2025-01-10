

import { Button } from "../components/Button"
import { Plusicon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import {Card} from '../components/Card'
import { CreateContentModel } from "../components/CreateContentModel"
import { useEffect, useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"

export function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  
  useEffect(()=>{
    refresh();
  },[modalOpen])

  return <div>
    <Sidebar />
    <div className="p-4 ml-72 min-h-screen bg-gray-100">
      <CreateContentModel open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} />
      <div className="flex justify-end gap-2">
        <Button onClick={() => {
          setModalOpen(true);
        }} variant="primary" text="Add Content" startIcon={<Plusicon />}/>
        <Button onClick={async() => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share:true
            },{
              headers:{
                'Authorization':localStorage.getItem('token')
              }
            });
            const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`;
            alert(shareUrl)
        }}  variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
      </div>

      <div className="flex gap-4 flex-wrap">
        {contents.map(({title,link,type}) => 
          <Card 
            title={title} 
            link={link} 
            type={type} 
          />
        )}
      </div>
    </div>
  </div>  
}
