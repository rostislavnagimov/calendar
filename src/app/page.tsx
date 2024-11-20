'use client'
import {useState, useEffect} from 'react'
import Calendar from '@/components/Calendar'
import AddTaskForm from '@/components/AddTaskFrom'
import axios from 'axios'

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formVisible, setFormVisible] = useState(false)
  const [currentDateTasks, setCurrentDayTasks] = useState<CurrentTasks[]>([])
  const [tasks, setTasks] = useState<{[key: string]: number}>({})

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/calendar')
      setTasks(response.data)
    } catch (error) {
      alert('Ошибка загрузки')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async ({title, date}: {title: string; date: string}) => {
    const taskData = {
      title,
      date
    }

    try {
      const response = await axios.post('http://localhost:4000/tasks', taskData)
      console.log('Task created successfully:', response.data)
      fetchTasks()
    } catch (error) {
      alert('Ошибка при создании задания')
    }
  }

  const showTasks = async (date: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/tasks?date=${date}`
      )
      setCurrentDayTasks(response.data)
    } catch (error) {
      alert('Ошибка соединения')
    }
  }

  useEffect(() => {
    if (selectedDate?.toISOString().split('T')[0]) {
      showTasks(selectedDate?.toISOString().split('T')[0])
    }
  }, [selectedDate])
  return (
    <div className="container mx-auto p-4">
      {formVisible && (
        <AddTaskForm
          onAddTask={(task) => {
            addTask(task)
          }}
          visibilityCallback={() => setFormVisible(false)}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">ToDo Calendar</h1>
      <Calendar callback={(date) => setSelectedDate(date)} tasks={tasks} />
        <button
          className="bg-[#b9f] hover:bg-[#aa84f5] rounded-lg p-2 text-black ml-2"
          onClick={() => setFormVisible(true)}
        >
          Добавить задание
        </button>
      {currentDateTasks.length > 0 && (
        <div className="mt-2 p-4 border border-white rounded-lg">
          <span>Задачи на {selectedDate?.toISOString().split('T')[0]}</span>
          {currentDateTasks.map((task) => (
            <div key={task.id}>{task.title && task.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

interface CurrentTasks {
  id: number
  title: string
  date: string
  completed: false
}
