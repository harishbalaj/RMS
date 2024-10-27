import React from 'react'
import { RiDashboardLine } from "react-icons/ri";
import { FaPlusCircle, FaWindowClose, FaFileExport, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineGridView } from "react-icons/md";
import userimg from '../assets/Images/adicon.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import './userdash.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios'
import Port from '../../Config'
const UserDashboard = () => {
    const userData = useSelector((state) => state.user)
    console.log(userData)
    const [tabName, setTabName] = useState('viewMarks')
    const [open, setOpen] = useState('false')
    const [project, setProject] = useState('false')
    const [isUserOpen, setIsUserOpen] = useState(false);

    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        toast.success('Logging out!!')
    }
    const handleExport = () => {
        const doc = new jsPDF();

        // Optional: Add some text to the PDF
        doc.text(`This is ${userData.result.semester}`, 10, 10);

        // Define the table data
        // Table.fromData(doc, [
        //     ["Student Name", "Student Id"],
        //     [`${userData.result.studentName}`, `${userData.result.studentId}`],
        // ])

        const columns = ["S.no", "Task", "Marks", "Semester Grade"];
        const rows = [
            [1, "Attendence", `${userData.result.attendence}`],
            [2, "Project Review", `${userData.result.projectReview}`],
            [3, "Assessment", `${userData.result.assessment}`, `${userData.result.projectMarks}`],
            [4, "Project Submission", `${userData.result.projectReview}`],
            [5, "LinkedIn post", `${userData.result.linkedInPost}`]
        ];

        // Generate the table using jsPDF-AutoTable
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 20, // Move table down to avoid overlapping the text
        });

        // Save the PDF
        doc.save("SemesterReport.pdf");
    };

    const projectFormik = useFormik({
        initialValues: {
            uname: '',
            projectLink: '',
            ustd: '',
            ucourse: ''
        },
        onSubmit: async (values) => {
            const data = {
                uname: values.uname,
                projectLink: values.projectLink,
                ustd: values.ustd,
                ucourse: values.ucourse
            }
            console.log(data);
            // Posting the data to the backend
            const res = await axios.post(`http://localhost:${Port}/userProject/${userData._id}`, {data})
            console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        }
    })
    return (
        <div className="">
            <header className='bg-gray-500 p-1'>
                <h1 className='flex flex-row items-center text-white'><RiDashboardLine className='text-3xl text-black flex flex-row items-center' />Dash <span className='text-red-500'>board</span></h1>
                {/* <img src={userimg} className='w-[50px] text-3xl flex float-right mt-[-53px] items-center rounded-full' alt="user" /> */}

                <button id="dropdownUserAvatarButton" onClick={() => setOpen(!open)} data-dropdown-toggle="dropdownAvatar" class="text-sm relative float-right mt-[-43px] me-5 justify-center items-center bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                    <span class="sr-only">Open user menu</span>
                    <img class=" w-8 h-8 rounded-full" src={userimg} alt="user" />
                </button>


                <div id="dropdownAvatar" class={`z-10  ${open ? 'hidden' : 'absolute'} absolute top-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{userData.name}</div>
                        <div class="font-medium truncate">{userData.studentId}</div>
                    </div>

                    <button class="py-2">
                        <p onClick={() => logout()} className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 cursor-pointer  dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
                    </button>
                </div>



            </header>
            <div className="w-[100%] rounded-b-2xl">
                 

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
  <div className='md:hidden'> <h1 className='flex flex-row items-center text-black'>Result <span className='text-red-500'>Scorrer</span></h1></div>
    <button data-collapse-toggle="navbar-default" onClick={() => setIsUserOpen(!isUserOpen)} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class={`${isUserOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
    <div className="mb-4 border-b w-[100%] flex items-center justify-center border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${tabName === 'viewMarks' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}
                            flex flex-row items-center border-b-2 rounded-t-lg`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" onClick={() => {setTabName('viewMarks'); setIsUserOpen(false)}} aria-selected="false"><MdOutlineGridView /> View Marks</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${tabName === 'projectSubmission' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} 
                            flex flex-row items-center border-b-2 rounded-t-lg `} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard"
                                onClick={() => {setTabName('projectSubmission'); setIsUserOpen(false)}} aria-selected="false"><FaProjectDiagram /> Project Submission</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${tabName === 'exportMarks' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} 
                           flex flex-row items-center rounded-t-lg`} id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings"
                                onClick={() => {setTabName('exportMarks'); setIsUserOpen(false)}} aria-selected="false"><FaFileExport />Export Marks</button>
                        </li>
                    </ul>
                </div>
    </div>
  </div>
</nav>



                
              
                <div className="w-[100%] flex items-center justify-center ">
                    {tabName === 'viewMarks' ? <div>
                        <ul>

                            <div class="relative overflow-x-auto w-[100%] shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className='bg-green-300'>
                                            <th scope="col" class="px-6 py-3 fs-5">Student Name</th>
                                            <th scope="col" class="px-6 py-3 fs-5">Student Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <img class=" w-10 h-10 rounded-full" src={userimg} alt="user" />
                                                <div class="ps-3">
                                                    <div class="text-base font-semibold">{userData.name}</div>
                                                </div>
                                            </th>


                                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {userData.studentId}
                                            </th>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <h3 className='pt-3 px-6 py-3 fs-2 fw-bold'>{userData.result.semester}</h3>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-green-300 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                S.No
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Task
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Marks
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Sem Grade
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 w-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                1
                                            </th>
                                            <th class="px-6 py-4">
                                                Attendence
                                            </th>
                                            <td class="px-6 py-4 fs-5 fw-2">
                                                {userData.result.attendence}
                                            </td>
                                            <td class="px-6 py-4 row-span-5">

                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                2
                                            </th>
                                            <th class="px-6 py-4">
                                                Assesment
                                            </th>
                                            <td class="px-6 py-4 fs-5 fw-2">
                                                {userData.result.assessment}
                                            </td>
                                            <td class="px-6 py-4 row-span-5">

                                            </td>
                                        </tr>
                                        <tr class="bg-gray-200 border-b dark:bg-gray-800">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                3
                                            </th>
                                            <th class="px-6 py-4">
                                                Project Review
                                            </th>
                                            <td class="px-6 py-4 fs-5 fw-2">
                                                {userData.result.projectReview}
                                            </td>
                                            <td class="px-6 py-4 row-span-5 fs-5 fw-2">
                                                {userData.result.projectMarks}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                4
                                            </th>
                                            <th class="px-6 py-4">
                                                Project submission
                                            </th>
                                            <td class="px-6 py-4 fs-5 fw-2">
                                                {userData.result.projectReview}
                                            </td>
                                            <td class="px-6 py-4 row-span-5">

                                            </td>
                                        </tr>
                                        <tr class="bg-gray-200 border-b dark:bg-gray-800">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                5
                                            </th>
                                            <th class="px-6 py-4">
                                                LinkedIn Post
                                            </th>
                                            <td class="px-6 py-4 fs-5 fw-2">
                                                {userData.result.linkedInPost}
                                            </td>
                                            <td class="px-6 py-4 row-span-5">

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>



                        </ul>
                    </div> : tabName === 'projectSubmission' ? <div>
                        {/* <button className='bg-blue-500 text-white p-2 hover:bg-orange-500 rounded-[15px]'>Export Assessment</button> */}
                        {/* <!-- Modal toggle --> */}
                        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="flex flex-row items-center justify-center  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setProject(!project)} type="button">
                            Add Project <FaPlusCircle className='text-2xl text-green-600 border b-3 hover:bg-green-100' />
                        </button>

                        {/* <!-- Main modal --> */}
                        <div id="crud-modal" tabindex="-1" aria-hidden="true" class={` ${project ? 'absolute' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                {/* <!-- Modal content --> */}
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    {/* <!-- Modal header --> */}
                                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                            Project
                                        </h3>
                                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setProject(!open)} data-modal-toggle="crud-modal">
                                            <FaWindowClose className='text-2xl' />
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* <!-- Modal body --> */}
                                    <form onSubmit={projectFormik.handleSubmit} class="p-4 md:p-5 bg-white">
                                        <div class="grid gap-4 mb-4 grid-cols-2">
                                       
                                            <div class="col-span-2">
                                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project link</label>
                                                <input type="url" onChange={projectFormik.handleChange} value={projectFormik.values.projectLink} id="projectLink" name='projectLink' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a url" required="" />
                                            </div>
                                        </div>
                                        <button type='submit' class="text-white w-40 flex flex-row items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <FaPlusCircle className='text-2xl text-white' />
                                            Add Project
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> : tabName === 'exportMarks' ? <div>
                        <button onClick={() => handleExport()} className='bg-blue-500 text-white p-2 hover:bg-orange-500 rounded-[15px]'>Export Marks</button>
                    </div> : null}
                </div>

            </div>
        </div>
    )
}

export default UserDashboard