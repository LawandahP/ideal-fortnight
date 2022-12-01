import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';



import { FcFile, FcHome, FcMoneyTransfer, FcOvertime } from 'react-icons/fc'
import { FiFolder } from 'react-icons/fi'
import { NgPageContainer } from '../../components/display/elements'
import { InlineWrapper, TLeaseCard, TLeaseContainer, TLeaseFlex } from '../lease/elements'
import { NgDivider } from '../maintenance/elements'
import { Button, FlexWrapper, Icon, IconText } from '../user.elements'
import { readTenantInvoicesAction } from '../invoice/actions';
import { commafy, currentMonth, currentYear } from '../../utils/globalFunc';
import moment from 'moment';
import { Table, Td, Th } from '../invoice/elements';
import { DCardContainer, DCardFlex } from './dashboardElements';
import TenantInvoices from '../invoice/tenants/tenant_invoices';

const TenantDashboard = () => {
    const dispatch = useDispatch()
    const readInvoice = useSelector((state) => state.readInvoice);
    const { loading, error, invoices, count } = readInvoice;

    useEffect(() => {
        dispatch(readTenantInvoicesAction("", currentMonth, currentYear))
    },[])

    return (
        <NgPageContainer>
            <TLeaseContainer>
                <InlineWrapper>
                    {/* <TLeaseCard>
                            <TLeaseFlex>
                                <FlexWrapper>
                                    <Icon>
                                        <FiFolder />
                                    </Icon>
                                    <IconText header>LEASES</IconText>
                                </FlexWrapper>

                                <Button warning>View All</Button>
                            </TLeaseFlex>
                        </TLeaseCard> */}

                    <TLeaseCard>
                        <TLeaseFlex>
                            <FlexWrapper>
                                <Icon>
                                    <FcFile />
                                </Icon>
                                <IconText header>Payable Now</IconText>
                            </FlexWrapper>
                        </TLeaseFlex>
                        
                        <NgDivider />

                        <DCardContainer>
                            <DCardFlex>
                                <InlineWrapper>
                                    <FlexWrapper>
                                        <IconText>Suggested Payment</IconText>
                                    </FlexWrapper>
                                    {invoices?.map((invoice) => (
                                        <>
                                            <IconText amount>Ksh.{commafy(Number(invoice?.total_amount))}</IconText>
                                            <IconText>Due {moment(invoice?.due_on).format("LL")}</IconText>
                                        </>
                                    ))} 
                                </InlineWrapper>

                                <InlineWrapper>
                                    <FlexWrapper>
                                        <Table>
                                            <tr>
                                                <Th>Your Breakdown</Th>
                                                <Th>Amount</Th>
                                                <Th>Due Date</Th>
                                                <Th>Status</Th>
                                            </tr>
                                            <tbody>
                                                {invoices?.map((invoice) => (
                                                    invoice?.bills.map((bill) => (
                                                        <tr id={bill?.id}>
                                                            <Td>{bill?.item}</Td>
                                                            <Td>{commafy(Number(bill?.amount))}</Td>
                                                            <Td>{moment(invoice?.due_on).format("LL")}</Td>
                                                            <Td>{invoice?.status}</Td>
                                                        </tr>
                                                    ))
                                                ))} 
                                            </tbody>
                                        </Table>
                                    </FlexWrapper>
                                    <NgDivider />

                                    <Button primary>
                                        Make a Payment
                                    </Button>
                                </InlineWrapper>
                            
                            </DCardFlex>
                        </DCardContainer>
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
                                    Open Maintenance Issues
                                </IconText>
                            </FlexWrapper>
                        </TLeaseFlex>
                        <NgDivider />
                    </TLeaseCard>

                    <TLeaseCard>
                        <TLeaseFlex>
                            <FlexWrapper>
                                <Icon>
                                    <FcHome />
                                </Icon>
                                <IconText header>
                                    Latest Payments
                                </IconText>
                            </FlexWrapper>
                        </TLeaseFlex>
                        <NgDivider />
                    </TLeaseCard>
        
                </InlineWrapper>
            </TLeaseContainer>
        </NgPageContainer>
    )
}

export default TenantDashboard