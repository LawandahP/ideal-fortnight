// useEffect(() => {
    // function dateDiff(startingDate, endingDate) {
    //     if (startingDate > endingDate) {
    //       const swap = startingDate;
    //       startingDate = endingDate;
    //       endingDate = swap;
    //     }
    //     const startYear = startingDate.getFullYear();
    //     const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    //     const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
    //     let yearDiff = endingDate.getFullYear() - startYear;
    //     let monthDiff = endingDate.getMonth() - startingDate.getMonth();
    //     if (monthDiff < 0) {
    //       yearDiff--;
    //       monthDiff += 12;
    //     }
    //     let dayDiff = endingDate.getDate() - startingDate.getDate();
    //     if (dayDiff < 0) {
    //       if (monthDiff > 0) {
    //         monthDiff--;
    //       } else {
    //         yearDiff--;
    //         monthDiff = 11;
    //       }
    //       dayDiff += daysInMonth[startingDate.getMonth()];
    //     }
    //     setMonths(monthDiff)
    //     setDays(dayDiff)
    //     setYears(yearDiff)
      
    //     // console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D');
    // }
//     dateDiff(end, start)
// }, [values.lease_end, values.lease_start])

// <p>Total rent from lease for {years > 0 && `${years} year(s),`} {months > 0 && `${months} month(s)`}  and {days > 0 && `${days} day(s)`} </p>
                            
                            // const [ months, setMonths ] = useState()
                            // const [ days, setDays ] = useState()
                            // const [ years, setYears ] = useState()