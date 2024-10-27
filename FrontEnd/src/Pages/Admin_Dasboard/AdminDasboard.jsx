import React from 'react'
import { FaPlusCircle, FaWindowClose,FaGraduationCap,FaProjectDiagram,FaLinkedin } from 'react-icons/fa'
import { RiLoginCircleFill, RiUserAddFill,RiStickyNoteAddLine,RiDashboardLine } from "react-icons/ri";
import userimg from '../assets/Images/adicon.jpg'
import { useState, useEffect } from 'react'
import Port from '../../Config'
import axios from 'axios'
import { useFormik } from 'formik';
import StudentsList from '../StudentsList';
import { useNavigate } from 'react-router-dom'
import Attendencetable from '../../Components/Attendencetable';
import PieChart from '../../Components/Piechart'
import AdminTable from './AdminTable';
import AssessmentTable from '../TableDashboard/AssessmentTable';
import AttendenceTable from '../TableDashboard/AttendStudents';
import OverallPiechart from '../../Components/OverallPiechart'
import AttendStudents from '../TableDashboard/AttendStudents';
import Navbar from '../Admin_Dasboard/Navbar';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
const AdminDasboard = () => {
    const userData = useSelector((state) => state.user)
    console.log(userData)
    const [admintabname, setadmintabname] = useState('viewMarks')
    const [profile, setProfile] = useState('false')
    const [toggle, setToggle] = useState('false')
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [studentMarks, setStudentMarks] = useState([])
    const [studentId, setStudentId]= useState('')
    const [attendence, setAttendence] = useState('')
    const [projectReview, setProjectReview]= useState('')
    const [assessment, setAssessment]= useState('')
    const [linkedinPost,setLinkedinPost]= useState('')
    const [projectSubmission,setProjectSubmission]=useState('false')
    const [AttendenceData, setAttendenceData]=useState([])
    const [studentName,setStudentName]=useState('')
    const [studentDate, setStudentDate]=useState('')
    const [studentAttendenceId, setStudentAttendenceId]=useState('')
    const [studentClass, setStudentClass]=useState('')
    const [users, setUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [popupFor, setPopupFor] = useState('');
    const [editId, setEditId] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    
    // const [data, setData] = useState([]);
    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        toast.success('Logging out!!')
    }
    
    const formik = useFormik({
        initialValues: {
            sname: '',
            sID: '',
            class: '' 
        },
        onSubmit: async values => {
            try {
                const data = {
                    name: values.sname,
                    studentId: values.sID,
                    section: values.class
                };
                // Posting the data to the backend
                const response = await axios.post(`http://localhost:${Port}/addStudents`, data);
        
                // Log the response to see its structure
               
                if (response.data.success) {
                    toast.success(response.data.message);
                    setToggle(true);
                    setSubmitted(!submitted);
                    setTimeout(() => {
                        navigate('/admindashboard')
                     }, 3000);
                }
                else{
                    toast.error(response.data.message);
                }

        
                // Use the correct response structure, assuming it's directly in `data.message`
               
              } catch (error) {
                console.error('Error posting data:', error);
        
                // You can display a more user-friendly error message here
                toast.error('Failed to submit data. Please try again.');
              }
        },
    })
   
    useEffect(() => {
        axios.get(`http://localhost:${Port}/getAllUsers`)
            .then((response) => {
            // Log the complete response
                const filteredUsers = response.data.users.filter((user) => user.name !== 'Admin');
                 // Log after filtering
                setUsers(filteredUsers);
                const resultUsers = response.data.users.filter((user) => user.result);
                setFilteredUsers(resultUsers)
                // setadmintabname('addStudent');
            })
            .catch((error) => {
                console.error('Error fetching users:', error); // Handle any error
            });
    }, [submitted]); // Check if `submitted` is the right dependency
    
   
    const attendenceFormik = useFormik({
        initialValues: {
            attendencename: '',
            date: '',
            sId: '',
            class1: '' 
        },
        onSubmit: async values => {
            try {
                const data = {
                    name: values.attendencename,
                    date: values.date,
                    studentId: values.sId,
                    section: values.class1
                };
                // Posting the data to the backend
                const response = await axios.post(`http://localhost:${Port}/addAttendence`, data);
        
                // Log the response to see its structure
                
                
                if (response.data.success) {
                    toast.success(response.data.message);
                    attendenceFormik.resetForm();
                    setToggle(true);
                }
                else{
                    toast.error(response.data.message);
                }

            } catch (error) {
                console.error('Error posting data:', error);
        
                // You can display a more user-friendly error message here
                toast.error('Failed to submit data. Please try again.');
            }
        },
    })
    const assessmentFilterUser = users.filter(user => user.assessment);
    const assessmentFormik=useFormik({
        initialValues: {
            studentId: popupFor === 'Edit Assessment' ? assessmentFilterUser[editId]?.studentId: '',
            percentage:popupFor === 'Edit Assessment' ? assessmentFilterUser[editId]?.percentage: '',
            yearSem: popupFor === 'Edit Assessment' ? assessmentFilterUser[editId]?.yearSem: '',
            course: popupFor === 'Edit Assessment' ? assessmentFilterUser[editId]?.course: '',
            semStatus: popupFor === 'Edit Assessment' ? assessmentFilterUser[editId]?.semStatus: '',

        },
        enableReinitialize: true,
        onSubmit: async values => {
            try {
                const data = {
                    studentId: values.studentId,
                    percentage: values.percentage,
                    yearSem: values.yearSem,
                    course: values.course,
                    semStatus: values.semStatus
                };
                // Posting the data to the backend
                if (popupFor === 'Edit Assessment') {
                    const userId= assessmentFilterUser[editId]?._id
                    const response = await axios.put(`http://localhost:${Port}/updateAssessment/${userId}`, data);                  
                    if (response.data.success) {
                        toast.success(response.data.message);
                        assessmentFormik.resetForm();
                        setToggle(true);
                        setSubmitted(!submitted);
                    }
                    else{
                        toast.error(response.data.message);
                    }   
                }
                else if (popupFor === 'Add Assessment') {
                    const response = await axios.post(`http://localhost:${Port}/addAssessment`, data);
                    console.log(response.data);
                    
                    if (response.data.success) {
                        toast.success(response.data.message);
                        assessmentFormik.resetForm();
                        setToggle(true);
                        setPopupFor(null);
                        setSubmitted(!submitted);
                    }
                    else{
                        toast.error(response.data.message);
                    }   
                }

            } catch (error) {   
                console.error('Error posting data:', error);
        
                // You can display a more user-friendly error message here
                toast.error('Failed to submit data. Please try again.');
            }
        },
    })

    const resultFormik=useFormik({
        initialValues: {
            studentId: popupFor === 'Edit Result' ? filteredUsers[editId]?.studentId : '',
            attendence: popupFor === 'Edit Result' ? filteredUsers[editId]?.result.attendence : '',
            projectReview: popupFor === 'Edit Result' ? filteredUsers[editId]?.result.projectReview : '',
            assessment: popupFor === 'Edit Result' ? filteredUsers[editId]?.result.assessment : '',
            linkedInPost: popupFor === 'Edit Result' ? filteredUsers[editId]?.result.linkedInPost : '',
            semester: popupFor === 'Edit Result' ? filteredUsers[editId]?.result.semester : '',
            projectMarks: popupFor === 'Edit Result' ? filteredUsers[editId]?.result.projectMarks : ''
        },
        enableReinitialize: true,
        onSubmit: async values => {
            try {
                const data = {
                    studentId: values.studentId,
                    attendence: values.attendence,
                    projectReview: values.projectReview,
                    assessment: values.assessment,
                    linkedInPost: values.linkedInPost,
                    semester: values.semester,
                    projectMarks: values.projectMarks
                };
                console.log(data)
                // Posting the data to the backend
                if (popupFor === 'Edit Result') {
                    const userId= filteredUsers[editId]?._id
                    const response = await axios.put(`http://localhost:${Port}/updateResult/${userId}`, data);
                    
                    if (response.data.success) {
                        toast.success(response.data.message);
                        resultFormik.resetForm();
                        setToggle(false);
                        setSubmitted(!submitted);
                    }
                    else{
                        toast.error(response.data.message);
                    }   
                }
                else if (popupFor === 'Add Result') {
                    const response = await axios.post(`http://localhost:${Port}/addResult`, data);
                    if (response.data.success) {
                        toast.success(response.data.message);
                        resultFormik.resetForm();
                        setToggle(false);
                        setSubmitted(!submitted);
                    }
                    else{
                        toast.error(response.data.message);
                    }   
                }
                              

            } catch (error) {   
        
                // You can display a more user-friendly error message here
                toast.error('Failed to submit data. Please try again.');
            }
        },
    })

               


    const handleAddResult = () => {
        setPopupFor('Add Result')
        setToggle(!toggle)
    }
    
    return (

        <div className="">
            
            <header className='bg-gray-600 p-1'>
                <h1 className='flex flex-row items-center text-white'><RiDashboardLine className='text-3xl text-black flex flex-row items-center' />Dash <span className='text-red-500'>board</span></h1>
                {/* <img src={userimg} className='w-[50px] text-3xl flex float-right mt-[-53px] items-center rounded-full' alt="user" /> */}

                <button id="dropdownUserAvatarButton" onClick={() => setProfile(!profile)} data-dropdown-toggle="dropdownAvatar" class="flex text-sm float-right mt-[-43px] xs:mt-[-43px] lg:mt-[-53px] me-5 justify-center items-center bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                    <span class="sr-only">Open user menu</span>
                    <img class=" w-8  h-8 lg:w-10 lg:h-10 rounded-full" src={userimg} alt="user" />
                </button>



                <div id="dropdownAvatar" class={`z-10 ${profile ? 'hidden' : 'absolute'}  top-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>Admin</div>
                         <div class="font-medium truncate">admin@gmail.com</div>
                    </div>
                   
                    <div class="py-2">
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => logout()}>Sign out</p>
                    </div>
                </div>

               

            </header>
            
            <div className="w-[100%] bg-green-300  rounded-b-2xl">
              
               

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
     <div className='md:hidden'> <h1 className='flex flex-row items-center text-black'>Result <span className='text-red-500'>Manager</span></h1></div>
    <button data-collapse-toggle="navbar-default" onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class={`w-full md:w-auto ${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
    <div className="mb-4 border-b w-[100%] flex items-center justify-center border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${admintabname === 'addResult' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} flex flex-row items-center justify-evenly border-b-2 rounded-t-lg`} id="profile-tab" type="button" role="tab" onClick={() => {setadmintabname('addResult');setIsMenuOpen(false)}} > <FaGraduationCap /> Add Results  </button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${admintabname === 'addAttendence' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} flex flex-row items-center justify-evenly border-b-2 rounded-t-lg `}  id="dashboard-tab" type="button" role="tab" 
                                onClick={() => {setadmintabname('addAttendence');setIsMenuOpen(false)}}> <RiLoginCircleFill /> Add Attendence</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${admintabname === 'addStudent' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} flex flex-row items-center justify-evenly border-b-2 rounded-t-lg`} id="settings-tab"  type="button" role="tab" 
                                onClick={() => {setadmintabname('addStudent');setIsMenuOpen(false)}} class="flex flex-row items-center justify-evenly pt-6" ><RiUserAddFill /> Add Students</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${admintabname === 'addAssessment' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} flex flex-row items-center justify-evenly border-b-2 rounded-t-lg`} id="settings-tab"  type="button" role="tab"
                                onClick={() => {setadmintabname('addAssessment');setIsMenuOpen(false)}} > <RiStickyNoteAddLine />Add Assesment Scorrer</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${admintabname === 'addProjectSubmission' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} flex flex-row items-center justify-evenly border-b-2 rounded-t-lg`} id="settings-tab"  type="button" role="tab" 
                                onClick={() => {setadmintabname('addProjectSubmission');setIsMenuOpen(false)}} > <FaProjectDiagram />View Project Submission</button>
                        </li>
                        <li className="me-2" role="presentation">
                            <button className={`inline-block p-4 ${admintabname === 'addLinkedIn' ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} flex flex-row items-center justify-evenly border-b-2 rounded-t-lg`} id="settings-tab"  type="button" role="tab" 
                                onClick={() => {setadmintabname('addLinkedIn');setIsMenuOpen(false)}} > <FaLinkedin />LinkedIn Post Analytics</button>
                        </li>
                    </ul>
                </div>
    </div>
  </div>
</nav>

               

                <div className="w-[100%] bg-blue-950 rounded-3xl flex items-center justify-center">
                    {admintabname === 'addResult' ? <div>
                        {/* <!-- Modal toggle --> */}
                        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="flex flex-row items-center justify-center  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleAddResult()} type="button">
                                Add Result <FaPlusCircle className='text-2xl text-green-600 border b-3 hover:bg-green-100' />
                            </button>


                            {/* <!-- Main modal --> */}
                    
                           <div id="crud-modal" tabindex="-1" aria-hidden="true" class={` ${toggle ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                                <div class="relative p-4 w-full max-w-md max-h-full">
                                    {/* <!-- Modal content --> */}
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        {/* <!-- Modal header --> */}
                                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                                {popupFor}
                                            </h3>
                                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setToggle(false)} data-modal-toggle="crud-modal">
                                                <FaWindowClose className='text-2xl' />
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        {/* <!-- Modal body --> */}
                                        <form onSubmit={resultFormik.handleSubmit} class="p-4 md:p-5 bg-white">
                                            <div class="grid gap-4 mb-4 grid-cols-2">
                                            <div class="">
                                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Id</label>
                                                    <input type="text" name="studentId" value={resultFormik.values.studentId} onChange={resultFormik.handleChange}   id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a student Id" autoComplete='off' required="" />
                                                </div>
                                            <div class="">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attendence</label>
                                                    <input type="text" name='attendence' value={resultFormik.values.attendence} onChange={resultFormik.handleChange}  id="attende" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a percentage" required=""/>
                                                </div>
                                                
                                                <div class="">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ProjectReview</label>
                                                    <input type="text" name='projectReview' value={resultFormik.values.projectReview} onChange={resultFormik.handleChange}  id="prjectReview" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a percentage" required="" />
                                                </div>
                                             

                                                <div class="">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assessment</label>
                                                    <input type="text" name='assessment' value={resultFormik.values.assessment} onChange={resultFormik.handleChange}  id="asssess" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a percentage" required="" />
                                                </div>
                                                
                                                <div class="col-span-2 sm:col-span-1">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LinkedIn Post</label>
                                                    <input type="text" name='linkedInPost' value={resultFormik.values.linkedInPost} onChange={resultFormik.handleChange}  id="linkIn" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a percentage" required="" />
                                                </div>
                                                <div class="col-span-2 sm:col-span-1">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
                                                    <select id="category" name='semester'onChange={resultFormik.handleChange} value={resultFormik.values.semester} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                        <option selected="">Select category</option>
                                                        <option value="1 Sem">Sem 1</option>
                                                        <option value="2 Sem">Sem 2</option>
                                                        <option value="3 Sem">Sem 3</option>
                                                        <option value="4 Sem">Sem 4</option>
                                                        <option value="5 Sem">Sem 5</option>
                                                        <option value="6 Sem">Sem 6</option>
                                                        <option value="7 Sem">Sem 7</option>
                                                        <option value="8 Sem">Sem 8</option>
                                                    </select>
                                                </div>
                                                
                                                <div class="col-span-2 ">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Score</label>
                                                    <select id="category" name='projectMarks' value={resultFormik.values.projectMarks} onChange={resultFormik.handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option selected="" radioGroup='category'>Select category</option>
                                                        <option value='A Grade'>A Grade(Excellent)</option>
                                                        <option value='B Grade'>B Grade(Good)</option>
                                                        <option value='O Grade'>O Grade(Average)</option>
                                                        <option value='D Grade'>D Grade(Poor)</option>
                                                    </select>
                                                </div>
                                                
                                               
                                            </div>
                                            <button type="submit" class="text-white w-full flex flex-row justify-center align-items-center place-items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <FaPlusCircle className='text-2xl text-white' />
                                                Add Result
                                            </button>
                                        </form>
                                       

                                    </div>
                                </div>
                            </div>
                           


                        
                            
                                    
                           
                                

                                
                            
                            


                           

                    </div> : admintabname === 'addAttendence' ? <div>
                         {/* <!-- Modal toggle --> */}
                         <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="flex flex-row items-center justify-center  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setToggle(!toggle)} type="button">
                                Add Attendence <FaPlusCircle className='text-2xl text-green-600 border b-3 hover:bg-green-100' />
                            </button>

                            {/* <!-- Main modal --> */}
                            <div id="crud-modal" tabindex="-1" aria-hidden="true" class={` ${toggle ? 'hidden' : 'block'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                                <div class="relative p-4 w-full max-w-md max-h-full">
                                    {/* <!-- Modal content --> */}
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        {/* <!-- Modal header --> */}
                                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                                Create Attendence
                                            </h3>
                                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setToggle(true)} data-modal-toggle="crud-modal">
                                                <FaWindowClose className='text-2xl' />
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        {/* <!-- Modal body --> */}
                                        <form onSubmit={attendenceFormik.handleSubmit} class="p-4 md:p-5 bg-white">
                                            <div class="grid gap-4 mb-4 grid-cols-2">
                                                <div class="col-span-2">
                                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                    <input type="text" name="attendencename" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type student name" onChange={attendenceFormik.handleChange} value={attendenceFormik.values.attendencename} required="" />
                                                </div>
                                                <div class="col-span-2">
                                                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                                    <input type="date" name="date" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type student name"onChange={attendenceFormik.handleChange} value={attendenceFormik.values.date} required="" min={ new Date().toISOString().split('T')[0]}/>
                                                </div>
                                                <div class="col-span-2 sm:col-span-1">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">StudentId</label>
                                                    <input type="text" name="sId" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a studentId"  onChange={attendenceFormik.handleChange} value={attendenceFormik.values.sId} required="" />
                                                </div>
                                                <div class="col-span-2 sm:col-span-1">
                                                    <label for="category" class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Class</label>
                                                    <select  onChange={attendenceFormik.handleChange}name='class1' value={attendenceFormik.values.class1} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                                                        <option selected="">Select category</option>
                                                        <option value="Bsc Computer Science">Bsc Computer Science</option>
                                                        <option value="Msc Computer Science">Msc Computer Science</option>
                                                        <option value="BE Computer Science">BE Computer Science</option>
                                                        <option value="MBA">MBA</option>
                                                    </select>
                                                </div>
                                               
                                            </div>
                                            <button type="submit" class="text-white w-40 flex flex-row  items-center bg-blue-700 cursor:pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <FaPlusCircle className='text-2xl text-white' />
                                                Add Attendence
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                    </div> : admintabname === 'addStudent' ? <div>
                        {/* <button className='bg-blue-500 text-white p-2 hover:bg-orange-500 rounded-[15px]'>Export Add Students</button> */}
                         {/* <!-- Modal toggle --> */}
                         <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="flex flex-row items-center justify-center  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setToggle(!toggle)} type="button">
                                Add Student <FaPlusCircle className='text-2xl text-green-600 border b-3 hover:bg-green-100' />
                            </button>
                       

                            {/* <!-- Main modal --> */}
                            <div id="crud-modal" tabindex="-1" aria-hidden="true" class={` ${toggle ? 'hidden' : 'block'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                                <div class="relative p-4 w-full max-w-md max-h-full">
                                    {/* <!-- Modal content --> */}
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        {/* <!-- Modal header --> */}
                                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                                Create Student
                                            </h3>
                                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setToggle(true)} data-modal-toggle="crud-modal">
                                                <FaWindowClose className='text-2xl' />
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        {/* <!-- Modal body --> */}
                                        <form onSubmit={formik.handleSubmit} class="p-4 md:p-5 bg-white">
                                            <div class="grid gap-4 mb-4 grid-cols-2">
                                                <div class="col-span-2">
                                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                    <input type="text" name="sname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type student name" onChange={formik.handleChange} value={formik.values.sname} required="" />
                                                </div>
                                                <div class="col-span-2 sm:col-span-1">
                                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">StudentId</label>
                                                    <input type="text" name="sID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a studentId" onChange={formik.handleChange} value={formik.values.sID} required="" />
                                                </div>
                                                <div class="col-span-2 sm:col-span-1">
                                                    <label for="category" class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Class</label>
                                                    <select id="category" name="class" onChange={formik.handleChange} value={formik.values.class} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                        <option selected="">Select category</option>
                                                        <option value="BSC Computer Science">Bsc Computer Science</option>
                                                        <option value="MSC Computer Science">Msc Computer Science</option>
                                                        <option value="BE Computer Science">BE Computer Science</option>
                                                        <option value="MBA">MBA</option>
                                                    </select>
                                                </div>
                                               
                                            </div>
                                            <button type="submit" class="text-white w-40 flex flex-row items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <FaPlusCircle className='text-2xl text-white' />
                                                Add Student
                                            </button>
                                        </form>
                                    </div>
                                </div>
            
                            </div>
                           
                            

                    </div> : admintabname === 'addAssessment' ? 
                    <div>
                    {/* <button className='bg-blue-500 text-white p-2 hover:bg-orange-500 rounded-[15px]'>Export Assessment</button> */}
                     {/* <!-- Modal toggle --> */}
                     <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="flex flex-row items-center justify-center  text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {setToggle(!toggle); setPopupFor('Add Assessment')}} type="button">
                            Add Assessment Result <FaPlusCircle className='text-2xl text-green-600 border b-3 hover:bg-green-100' />
                        </button>

                        {/* <!-- Main modal --> */}
                        <div id="crud-modal" tabindex="-1" aria-hidden="true" class={` ${toggle ? 'hidden' : 'block'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                {/* <!-- Modal content --> */}
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    {/* <!-- Modal header --> */}
                                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                           {popupFor==='Add Assessment' ? 'Add Assessment Result' : 'Edit Assessment Result'}
                                        </h3>
                                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setToggle(true)} data-modal-toggle="crud-modal">
                                            <FaWindowClose className='text-2xl' />
                                            <span class="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* <!-- Modal body --> */}
                                    <form onSubmit={assessmentFormik.handleSubmit} class="p-4 md:p-5 bg-white">
                                        <div class="grid gap-4 mb-4 grid-cols-2">
                                            <div class="col-span-2">
                                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Id</label>
                                                <input type="text" name="studentId"onChange={assessmentFormik.handleChange} value={assessmentFormik.values.studentId} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a Student Id" required="" />
                                            </div>
                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CGPTA</label>
                                                <input type="text" name="percentage" onChange={assessmentFormik.handleChange} value={assessmentFormik.values.percentage} id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter a %" required="" />
                                            </div>
                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="category" class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Sem</label>
                                                <select id="category" name='yearSem'onChange={assessmentFormik.handleChange} value={assessmentFormik.values.yearSem} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option selected="">Select category</option>
                                                    <option value="1 Sem">Sem 1</option>
                                                    <option value="2 Sem">Sem 2</option>
                                                    <option value="3 Sem">Sem 3</option>
                                                    <option value="4 Sem">Sem 4</option>
                                                    <option value="5 Sem">Sem 5</option>
                                                    <option value="6 Sem">Sem 6</option>
                                                    <option value="7 Sem">Sem 7</option>
                                                    <option value="8 Sem">Sem 8</option>
                                                </select>
                                            </div>
                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="category" class="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Course</label>
                                                <select id="category" name='course' onChange={assessmentFormik.handleChange} value={assessmentFormik.values.course} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option selected="">Select category</option>
                                                    <option value="Bsc Computer Science">Bsc Computer Science</option>
                                                    <option value="BCA">BCA</option>
                                                    <option value="MCA">MCA</option>
                                                    <option value="Msc Computer Science">Msc Computer Science</option>
                                                    <option value="MBA">MBA</option>
                                                    <option value="Msc IT">Msc IT</option>
                                                    <option value="BE EEE">BE EEE</option>
                                                    <option value="BE ECE">BE ECE</option>
                                                </select>
                                            </div>
                                            <div class="col-span-2 sm:col-span-1">
                                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sem Status</label>
                                                <select id="category" name='semStatus' onChange={assessmentFormik.handleChange}value={assessmentFormik.values.semStatus}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option selected="" radioGroup='category'>Select category</option>
                                                    <option value='Pass'>Pass</option>
                                                    <option value='Arrear'>Arrear</option>
                                                </select>
                                            </div>
                                           
                                        </div>
                                        <button type="submit" class="text-white w-100 flex flex-row justify-center align-items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                                            <FaPlusCircle className='text-2xl text-white' />
                                            Add Assessment Marks
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>
               
                     : admintabname === 'addProjectSubmission' ? <div>
                        <button className='bg-blue-500 text-white p-2 hover:bg-orange-500 rounded-[15px]'>Export Project Submission</button>
                       

                        </div> : admintabname === 'addLinkedIn' ? <div>
                            <button className='bg-blue-500 text-white p-2 hover:bg-orange-500 rounded-[15px]'>Export LinkedIn Post</button>
                           
                        </div> : null
                    }
                </div>
                {admintabname === 'addProjectSubmission' && <PieChart targetPercentage={100} title={'Project Submission Analytics'}/>}
                { admintabname === 'addLinkedIn' &&  <PieChart targetPercentage={50} title={'LinkedIn Post Analytics'}/> }
                
                                {/* {admintabname === 'addAttendence' && <Attendencetable AttendenceData={AttendenceData}/>}  */}

            </div>
            { admintabname === 'addStudent' && 
               <div className='w-[100%] flex flex-wrap p-4 gap-5'> 
                            {users && users?.map((data, index) => (
                                <StudentsList key={index} name={data.name} studentId={data.studentId} section={data.section} />
                            ))}
                           
            </div>}
            <div className="">{ 
            admintabname === 'addResult' &&  <AdminTable users={users} toggle={toggle} setToggle={setToggle} popupFor={popupFor} setPopupFor={setPopupFor} editId={editId} setEditId={setEditId} filteredUsers={filteredUsers} submitted={submitted} setSubmitted={setSubmitted} />
            }
            </div>
            <div className="">
                {admintabname === 'addAssessment' && <AssessmentTable users={users}  toggle={toggle} setToggle={setToggle} popupFor={popupFor} setPopupFor={setPopupFor} editId={editId} setEditId={setEditId}  submitted={submitted} setSubmitted={setSubmitted}  />}
            </div>
            <div className="">
                {admintabname === 'addAttendence'&& <AttendStudents users={users} />}

            </div>
        </div>
    )
}

export default AdminDasboard