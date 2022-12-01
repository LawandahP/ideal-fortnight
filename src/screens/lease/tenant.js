import React from "react";
import { Button, FlexWrapper, Icon, IconText } from "../user.elements";

import { FcFile, FcHome, FcMoneyTransfer, FcOvertime } from "react-icons/fc";
import {
    TLeaseCard,
    TLeaseContainer,
    TLeaseFlex,
    InlineWrapper,
} from "./elements";
import { NgPageContainer } from "../../components/display/elements";
import { NgDivider } from "../maintenance/elements";
import { FiFolder } from "react-icons/fi";

const TenantLeaseScreen = () => {
    return (
        <NgPageContainer>
            <TLeaseContainer>
                <InlineWrapper>
                    <TLeaseCard>
                        <TLeaseFlex>
                            <FlexWrapper>
                                <Icon>
                                    <FiFolder />
                                </Icon>
                                <IconText header>LEASES</IconText>
                            </FlexWrapper>

                            <Button warning>View All</Button>
                        </TLeaseFlex>
                    </TLeaseCard>

                    <TLeaseCard>
                        <TLeaseFlex>
                            <FlexWrapper>
                                <Icon>
                                    <FcFile />
                                </Icon>
                                <IconText header>LEASE AGREEMENT</IconText>
                            </FlexWrapper>
                            <Button primary>
                                From Jun, 2020 - July, 2021{" "}
                            </Button>
                        </TLeaseFlex>
                        
                        <NgDivider />

                        <TLeaseFlex>
                            <InlineWrapper>
                                <FlexWrapper>
                                    <IconText header>Total rent</IconText>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Icon>
                                        <FcMoneyTransfer />
                                    </Icon>
                                    <IconText>20,000/month</IconText>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Icon>
                                        <FcOvertime />
                                    </Icon>
                                    <IconText>
                                        Due on the 1st of every month
                                    </IconText>
                                </FlexWrapper>
                            </InlineWrapper>

                            <InlineWrapper>
                                <FlexWrapper>
                                    <IconText header>Security Deposit</IconText>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Icon>
                                        <FcMoneyTransfer />
                                    </Icon>
                                    <IconText>20,000/month</IconText>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Icon>
                                        <FcOvertime />
                                    </Icon>
                                    <IconText>ONE TIME</IconText>
                                </FlexWrapper>
                            </InlineWrapper>
                            {/* <FlexWrapper>
                <Icon><FcFile /></Icon>
                <IconText>Total rent</IconText>
              </FlexWrapper> */}
                            {/* <Button primary>From Jun, 2020 - July, 2021 </Button> */}
                        </TLeaseFlex>
                    </TLeaseCard>
                </InlineWrapper>

                <InlineWrapper>
                    <TLeaseCard>
                        <TLeaseFlex>
                            <FlexWrapper>
                                <Icon>
                                    <FcHome />
                                </Icon>
                                <IconText header>
                                    YOUR PROPERTY DETAILS
                                </IconText>
                            </FlexWrapper>
                        </TLeaseFlex>
                        <NgDivider />
                    </TLeaseCard>
                </InlineWrapper>
            </TLeaseContainer>
        </NgPageContainer>
    );
};

export default TenantLeaseScreen;
