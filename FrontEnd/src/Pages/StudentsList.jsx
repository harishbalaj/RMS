import React from 'react'

const StudentsList = (props) => {
    const { name, studentId, section} = props
    return (
        <div className='flex flex-col items-center gap-5 border-2 p-4 shadow-2xl rounded-2xl w-[200px]'>

            <div class="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg class="absolute w-19 h-18 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>

            <div className="">
                <p>{name}</p>
                <p>{studentId}</p>
                <p>{section}</p>
            </div>
        </div>
    )
}

export default StudentsList
