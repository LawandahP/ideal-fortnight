import { Avatar } from '@mui/material'
import React from 'react'
import { FaPhone } from 'react-icons/fa'
import { Name, ProfileUserCard, PhoneNumber } from '../screens/user.elements'
import CustomAvatar from './display/CustomAvatar'

const ProfileCard = ({image, name, phone_number, role, affiliation}) => {
  return (
    <ProfileUserCard>
      <div style={{
            textAlign: "center",
            justifyContent: "center", 
            display: "flex", 
            alignItems: "center", 
            flexDirection: "column"
        }}>
          {  
              image 
              ? <Avatar src={image} sx={{width: "150px", height: "150px"}} />
              : <Avatar src={image} sx={{width: "150px", height: "150px"}} {...CustomAvatar(name)} />
          }
        {/* <Avatar src={image} sx={{width: "150px", height: "150px", alignSelf: "center"}} /> */}
      </div>

      <div>
        <Name>{name}</Name>
          <p>{affiliation}</p>
        <PhoneNumber>
          <>{phone_number}</>
          <FaPhone />
        </PhoneNumber>
      </div>
        
    </ProfileUserCard>
  )
}

export default ProfileCard