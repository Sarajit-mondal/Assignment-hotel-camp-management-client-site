import React, { useState } from 'react';
import PaymentModel from '../../model/PaymentModel';
import useAuth from '../../../hooks/useAuth';
import Pagination from '../../Pagination/Pagination';

const CampParticipantsTable = ({ participants, onFeedback, onCancel,refetch,totalData,showPerPage,setShowPerPage,currentPage,setCurrentPage }) => {
  const [isOpen,setIsOpen] = useState(false)
  const [isloading,setIsLoading]=useState(false)
  const [camp,setCamp] = useState([])
  const {user} = useAuth()

  const onSubmit = () =>{
    //("paymnet doing")
  }
  //close model
  const closeModal = () =>{
    refetch()
    setIsOpen(false)
   
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y text-center divide-gray-200">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              Camp Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              Camp Fees
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              Participant Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              Payment Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              Payment Confirmation Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              Cancel Button
            </th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
              FeedBack Button
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* table row */}
          {
            participants && participants.map(participant => <tr key={participant._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {participant.CampName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              $ {participant.CampFees}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {participant.ParticipantName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {
                  participant?.PaymentStatus === "Unpaid" ? <button onClick={()=> {setIsOpen(true)
                    setCamp(participant)
                  }} className='btn active:scale-95 ease-in-out duration-200'>Pay</button> : "Paid"
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {participant.ConfirmationStatus}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold">
                {
                 participant.ConfirmationStatus === "Confirmed" ?
                 <button
                  onClick={() => onFeedback(participant._id)}
                  className="text-blue-600 hover:text-blue-900 mr-4 active:scale-95 ease-in-out duration-200"
                >
                  Feedback
                </button> : <p>N/A</p>
                }
               
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-600">
              <button disabled={participant.PaymentStatus === "Paid"}
                  onClick={() => onCancel(participant._id)}
                className={`font-bold ${participant.PaymentStatus === "Unpaid" && "text-red-600 hover:text-red-900 active:scale-95 ease-in-out duration-200"}`}>
                  Cancel
                </button>
              </td>
            </tr>)
          }
        </tbody>
           {/* tablefooter */}
           <tfoot>
                <tr >
                  <td className="w-full p-2" colSpan="7">
                      {/* pagination */}
                <Pagination totalData={totalData}showPerPage={showPerPage}setShowPerPage={setShowPerPage}setCurrentPage={setCurrentPage} currentPage={currentPage}></Pagination>
                  </td>
                </tr>
              </tfoot>
      </table>

      <PaymentModel isOpen={isOpen} closeModal={closeModal}
       paymentCamp ={camp} refetch={refetch}></PaymentModel>
    </div>
  );
};

export default CampParticipantsTable;
