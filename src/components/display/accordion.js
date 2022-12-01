import React, { useState } from 'react';
import { Accordion, AccordionTitle, AccordionContent, AccordionItem, AccordionIcon, AccordionHeader, NgLink} from './elements'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import PaperHeader from './paperHeader';



export default function ControlledAccordion({i, heading, link, children, icon}) {
    const [expanded, setExpanded] = useState(false);
  
    const toggleAccordion = (i) => {
        if (expanded == i) {
            return setExpanded(!expanded)
        }
        setExpanded(i);
    };
  
    return (
    
        <Accordion>
            <AccordionItem>
                <AccordionTitle onClick={() => toggleAccordion(i)}>
                    <PaperHeader noDivider heading={link ? <NgLink to={link}>{heading}</NgLink> : heading}>
                        {icon}
                    </PaperHeader>
                    <AccordionIcon>{expanded ? <FiChevronUp /> : <FiChevronDown />}</AccordionIcon>
                </AccordionTitle>
                
                <AccordionContent expanded={expanded}>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>   
        
    );
  }

  
  
  
  
  
  
  
  