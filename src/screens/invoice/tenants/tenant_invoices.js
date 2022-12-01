import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { FcHome } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { NgPageContainer } from '../../../components/display/elements'
import { commafy, currentMonth, currentYear } from '../../../utils/globalFunc'
import { TLeaseCard, TLeaseFlex } from '../../lease/elements'
import { FlexWrapper, Icon, IconText } from '../../user.elements'
import { readTenantInvoicesAction } from '../actions'
import { NgDivider, Table, Td, Th } from '../elements'
import InvoiceTable from '../invoice_table'

const TenantInvoicesScreen = () => {
  const dispatch = useDispatch()
  const readInvoice = useSelector((state) => state.readInvoice);
  const { loading, error, invoices, count } = readInvoice;

  useEffect(() => {
    dispatch(readTenantInvoicesAction())
  },[])

    return (
      <NgPageContainer>
          <InvoiceTable
              invoices={invoices}
              count={count}
              error={error}
              loading={loading}
          />
      </NgPageContainer>
  )
}

export default TenantInvoicesScreen