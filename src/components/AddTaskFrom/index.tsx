'use client'

import {useState} from 'react'

const AddTaskForm = ({
  onAddTask,
  visibilityCallback
}: {
  onAddTask: (task: {title: string; date: string}) => void
  visibilityCallback: () => void
}) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !date) {
      alert('Пожалуйста, заполните все поля')
      return
    }

    onAddTask({title, date})
    visibilityCallback()
  }

  return (
    <div
      className="fixed inset-0 backdrop-blur-[2px] backdrop-saturate-0 flex justify-center items-center"
      onClick={() => visibilityCallback()}
    >
      <form
        className="bg-black border border-[#b9f] w-2/5 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Название задания
          </label>
          <input
            id="title"
            type="text"
            placeholder="Введите название"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="date"
          >
            Дата выполнения
          </label>
          <input
            id="date"
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#b9f] hover:bg-[#aa84f5] text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Добавить задание
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTaskForm
