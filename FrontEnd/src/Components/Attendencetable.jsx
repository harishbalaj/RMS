import React from 'react'

const Attendencetable = ({AttendenceData}) => {
  return (
    <div>
    
            
    <table className={`table table-auto border pt-2 border-dark-500 cursor-pointer border-dark-500`}>
                                        <thead>
                                            <tr>
                                                <th className='p-2'>Student Name</th>
                                                <th className='p-2'>Date</th>
                                                <th className='p-2'>Student Id</th>
                                                <th className='p-2'>Class</th>
                                            </tr>
                                        </thead> 
                                         <tbody>
                                       
                            { AttendenceData.map((data,index) => {
        return (
                                    <tr key={index}>
                                        <td className='p-2'>{data[0]}</td>
                                        <td className='p-2'>{data[1]}</td>
                                        <td className='p-2'>{data[2]}</td>
                                        <td className='p-2'>{data[3]}</td>
                                        <td className='p-2'>{data[4]}</td>
                                        <td className='p-2'>{data[5]}</td>
                                        </tr>
        )  
    })}
                                         </tbody>

                                    </table>
    
    </div>
  )
}

export default Attendencetable