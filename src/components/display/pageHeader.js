import React from 'react'
import { PageHeading } from '../../screens/properties/elements'
import { NgPaper } from './elements'

import CustomAvatar from "../display/CustomAvatar";

import { Avatar } from "@mui/material";
import { textTitleCase, toTitleCase } from "../../utils/globalFunc";
import { ProfileContainer, ProfileInfoWrapper, UserName, UserRole } from '../navbar/navbarElements';



const PageHeader = ({heading, name, text, children}) => {
  return (
    <NgPaper padded header>
        <PageHeading>
            <h2>{heading}</h2>
            <>{name} . {text}</>
        </PageHeading>

        {children}

    </NgPaper>
  )
}

export default PageHeader