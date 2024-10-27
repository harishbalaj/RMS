import React from 'react'

const AttendStudents = (props) => {
    const {users} = props
    const filteredUsers = users.filter(user => user.attendence)
    console.log(filteredUsers, "filteredUsers");
    console.log(users, "users");
    
  return (
    <div className="">

       

{filteredUsers.length > 0 && ( <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Student Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Student Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Attendence
                </th>
                <th scope="col" class="px-6 py-3">
                    Project Review
                </th>
                <th scope="col" class="px-6 py-3">
                    Assessment
                </th>
                <th scope="col" class="px-6 py-3">
                    LinkedIn Post
                </th>
                <th scope="col" class="px-6 py-3">
                    Project Score
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers.map((user, index) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {user.name}
                </th>
                <td class="px-6 py-4">
                    {user.studentId}
                </td>
                <td class="px-6 py-4">
                    {user.result.attendence || '-'}
                </td>
                <td class="px-6 py-4">
                    {user.result.projectReview || '-'}
                </td>
                <td class="px-6 py-4">
                    {user.result.assessment || '-'}
                </td>
                <td class="px-6 py-4">
                    {user.result.linkedInPost || '-'}
                </td>
                <td class="px-6 py-4">
                    {user.result.projectMarks || '-'}
                    
                </td>
                <td class="flex items-center px-6 py-4">
                    <p class="font-medium mb-0 text-blue-600 cursor-pointer dark:text-blue-500 hover:underline">Edit</p>
                    <p  class="font-medium mb-0 text-red-600 cursor-pointer dark:text-red-500 hover:underline ms-3">Remove</p>
                </td>
            </tr>
 
            ))}
            
        </tbody>
    </table> 
</div>

)
}
</div>


  )
}

export default AttendStudents
