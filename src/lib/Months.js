export const annualMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul','ago','set','oct','nov','dec'];

export const CurrentMonthIntervalDays = ()=>{
            const days =[]
            const currentDate = new Date();
            const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            while (startDate <= endDate) {
                days.push(`${startDate.getDate()}`.padStart(2, '0'));
                startDate.setDate(startDate.getDate() + 1);
            }
              return days
        }

export const DayInterval = (dateRange)=>{
    if(!dateRange?.from || !dateRange?.to) return []

    let passingDays=[]

    const start = new Date(dateRange.from)
    const end = new Date(dateRange.to)
    const current = new Date(start)

    while (current <= end) {
        passingDays.push(`${current.getDate()}`.padStart(2, '0'));
        current.setDate(current.getDate() + 1);
    }
    return passingDays
}