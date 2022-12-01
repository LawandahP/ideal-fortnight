import React, {useState} from 'react'
import { Box, Button, Stack, Step, StepButton, Stepper } from '@mui/material'

import { NgPageContainer } from '../display/elements'


const MultiStepper = ({steps_list, children, activeStep, setActiveStep}) => {
    
    const [ steps, setSteps] = useState([steps_list]);

  
    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((activeStep) => activeStep + 1);
        } else {
            const stepIndex = findUnfinished();
            setActiveStep(stepIndex);
        }
    };
    const checkDisabled = () => {
        if (activeStep < steps.length - 1) return false;
        const index = findUnfinished();
        if (index !== -1) return false;
        return true;
    };
    const findUnfinished = () => {
        return steps.findIndex((step) => !step.completed);
    };

    return (
        <NgPageContainer>
            <Stepper
                alternativeLabel
                nonLinear
                activeStep={activeStep}
                sx={{mb:3}}>
                    { steps.map((step, index) => (
                        <Step key={step.label} completed={step.completed}>
                            <StepButton onClick={() => setActiveStep(index)}>{step.label}</StepButton>
                        </Step>
                    ))}
            </Stepper>
                    
            <Box>
                {children}
            </Box>


            <Stack
                direction='row'
                sx={{pt:2, pb:7, justifyContent:'space-around'}}>
                <Button 
                    disabled={!activeStep} 
                    onClick={() => setActiveStep(activeStep => activeStep - 1)}
                >
                    Back
                </Button>
                <Button 
                    disabled={checkDisabled()} 
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Stack>
        </NgPageContainer>
    )
}

export default MultiStepper