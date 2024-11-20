'use client'

import React, {useState, useEffect} from 'react'

const Calendar: React.FC<CalendarProps> = ({callback}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    if (selectedDate) {
      callback(selectedDate)
    }
  }, [selectedDate])

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )

  const daysInMonth = endOfMonth.getDate()
  const startDay = startOfMonth.getDay()

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
    setSelectedDate(date)
  }
  const days = Array.from({length: daysInMonth}, (_, i) => i + 1)
  const emptyDays = Array.from({length: startDay}, () => null)

  return (
    <div className="p-4 border border-[#b9f] rounded-lg m-2 select-none">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-[#b9f] text-black rounded"
        >
          &#8592; Предыдущий
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleDateString('ru-RU', {
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-[#b9f] text-black rounded"
        >
          Следующий &#8594;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`p-2 border rounded cursor-pointer ${
              selectedDate?.getDate() === day &&
              selectedDate?.getMonth() === currentDate.getMonth()
                ? 'bg-[#b9f] text-black border-[#b9f]'
                : 'hover:bg-gray-700'
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar

interface CalendarProps {
  callback: (date: Date) => void
}
