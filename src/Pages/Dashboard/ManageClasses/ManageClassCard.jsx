import Swal from 'sweetalert2';
import UseSecureAxios from '../../../Hooks/UseSecureAxios';

const ManageClassCard = ({ item, classRefetch }) => {

    const { _id, name, status, instructor, instructorEmail, image } = item
    const [secureAxios] = UseSecureAxios()

    const showModal = (id) => {
        const modal = document.getElementById(`my_modal_${id}`);
        modal.showModal();
    }

    const hidModal = (id) => {
        const modal = document.getElementById(`my_modal_${id}`)
        modal.close()
    }

    const handleStatusChange = (id, status) => {
        secureAxios.patch('/instructor-class/status/admin', { id, status })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    classRefetch()
                    const message = status === 'approved' ? 'class approved' : 'class denied'
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleSendFeedback = (e, id) => {
        e.preventDefault()
        const feedback = e.target.feedback.value;
        secureAxios.patch('/instructor-class/feedback', { feedback, id })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'feedback sent to instructor',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => console.log(err))
        hidModal(id)
    }


    return (
        <div key={_id} className="flex flex-col md:flex-row lg:flex-row justify-between bg-white rounded-md shadow-lg p-3 gap-3 lg:-center -start">
            <img className="lg:h-32 rounded-lg" src={image} alt="" />
            <div>
                <h1>Name: {name}</h1>
                <p>Instructor: {instructor}</p>
                <p>Email: {instructorEmail}</p>
                <p>{_id}</p>
            </div>
            <div className='flex items-center'>
                {
                    status === 'pending' && <p className="text-yellow-600 bg-[#000] rounded-md px-2 py-1">{status}</p>
                }
                {
                    status === 'approved' && <p className="text-green-600 bg-[#000] rounded-md px-2 py-1">{status}</p>
                }
                {
                    status === 'denied' && <p className="text-red-600 bg-[#000] rounded-md px-2 py-1">{status}</p>
                }
            </div>
            <div className="flex flex-col justify-center lg:pe-10 gap-2">
                <button disabled={status === 'approved' || status === 'denied'} onClick={() => handleStatusChange(_id, 'approved')} className="py-1 px-4 shadow-md disabled-button bg-gray-200">
                    Approve
                </button>
                <button disabled={status === 'approved' || status === 'denied'} onClick={() => handleStatusChange(_id, 'denied')} className="py-1 px-4 shadow-md border disabled-button bg-gray-200">
                    Deny
                </button>
                <button onClick={() => showModal(_id)} disabled={status === 'approved' || status !== 'denied'} className="py-1 px-4 shadow-md border disabled-button bg-gray-200">
                    Feedback
                </button>
                <dialog id={`my_modal_${_id}`} className="modal">
                    <div className='lg:w-6/12 w-11/12 relative'>
                        <button onClick={() => { hidModal(_id) }} className="z-20 p-2 text-xl absolute right-2 top-2">
                            ✕
                        </button>
                        <form onSubmit={(e) => (handleSendFeedback(e, _id))} method="dialog" className="modal-box w-full max-w-5xl bg-gray-200">
                            <h3 className="font-bold text-lg text-center">Feedback for : <span className='text-[#06d497]'>
                                {name}</span></h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">Feedback</span>
                                </label>
                                <textarea required name='feedback' type="text" placeholder="Write your feedback" className="py-4 resize-none h-48 input input-bordered" />
                            </div>
                            <div className='grid justify-center pt-4'>
                                <input type='submit' className='my-button' value='Send'></input>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageClassCard;