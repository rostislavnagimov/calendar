'use client'
import {useState, useEffect} from 'react'
import Calendar from '@/components/Calendar'
import AddTaskForm from '@/components/AddTaskFrom'

const Home = () => {
  const [events, setEvents] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formVisible, setFormVisible] = useState(false)

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
    fetch(
      `http://localhost:4000/tasks?date=${date.toISOString().split('T')[0]}`
    )
      .then((response) => response.json())
      .then((tasks) => {
        console.log(tasks)
      })
  }

  return (
    <div className="container mx-auto p-4">
      {formVisible && <AddTaskForm onAddTask={(task) => {}} />}
      <h1 className="text-2xl font-bold mb-4">ToDo Calendar</h1>
      <Calendar callback={(date) => setSelectedDate(date)} />
      {selectedDate && (
        <button
          className="bg-[#b9f] hover:bg-[#aa84f5] rounded-lg p-2 text-black ml-2"
          onClick={() => setFormVisible(true)}
        >
          Добавить задание на {selectedDate.toLocaleDateString()}
        </button>
      )}
    </div>
  )
}

export default Home
