import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";


const ApplyForm = () => {

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  // console.log(errors);
  const onSubmit = data => {
    console.log(data)
 if(data){
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Data submitted successfully',
        showConfirmButton: false,
        timer: 1500
      })
      reset();
    }
  };
  const [inputName, setInputName] = useState('name');

  // console.log(watch("example"));

  const [formText, setFormText]=useState([]);
  useEffect(()=>{
    fetch('form.json')
    .then(res=>res.json())
    .then(data=>setFormText(data))
  },[])
console.log(formText)

const [gender, setGender]=useState("gender");
const [hobbies, setHobbies]=useState(["hobbies"]);

// handleHobbies functions
const handleHobbies=(event)=>{
  const {value, checked} = event.target;
  if(checked){
    setHobbies(pre=>[...pre, value])
  }
}
// console.log(hobbies)
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
    </div>
    <div className="card w-[400px] shadow-2xl bg-base-100">
      <div className="card-body">
       <form onSubmit={handleSubmit(onSubmit)}>
       {
          formText.map((data, i)=>
        <div className="form-control" key={i}>
          <label className="label" htmlFor={data?.id}>
            <span className="label-text font-semibold font-serif text-gray-900">{data?.label}<span className='text-red-600'>*</span></span>
          </label>
          {
            data?.type === 'select' 
            ?
            <select {...register(`${data?.id}`, {required: true})} className="select select-bordered w-full max-w-xs">
{
  data?.options.map(selectOptions=>
    <option>{selectOptions}</option>
  )
}
</select>
:
<>
{
  data?.type ==="textarea" 
  ? 
  <textarea {...register(`${data?.id}`,{required: true})} className="textarea textarea-[#ddd] border-[1px] border-[#ddd]" placeholder={data?.placeholder} ></textarea>
  :
  <>
  {
    data?.id ==="gender" ? 
    <div className='flex gap-3 items-center'>
    {
      data?.options.map((genderName, i)=> 
        <>
          <label className="cursor-pointer flex flex-row gap-2">
          <input  onChange={(e)=>setGender(e.target.value)} type="radio" name="radio-10" value={genderName} className="radio checked:bg-red-500" {...register(`${gender}`,{required: true})} />
    <span className="label-text">{genderName}</span> 
  </label>
        </>
        )
    }
    </div>
    :
    <>
    {
      data?.id ==="hobbies" 
      ?
      <>
      <div className="form-control flex">
        {
          data?.options.map(hobbiesName=>
            <label className="label cursor-pointer">
            <span className="label-text">{hobbiesName}</span> 
            <input onChange={handleHobbies} {...register(`${hobbies}`,{required: true})} value={hobbiesName} type="checkbox" className="checkbox checkbox-primary" />
          </label>
            )
        }
 
</div></>
      :
      <>
      {
        console.log(data?.validations[1]?.params[0])
      }{
        console.log(data?.validations[1]?.params[1].length)

      }
      <input {...register(`${data?.id}`, {required: `${data?.validations[1]?.params[0] <  data?.validations[1]?.params[1].length && data?.validations[1]?.params[1]}`, min: data?.validations[1]?.params[0], max: 10 })} id={data?.id} type={data?.type} placeholder={data?.placeholder} className='input input-bordered' />
      {
        <>
        {
          ()=>setInputName(data?.id)
        }
        <span className='error-message text-red-500'>{errors.name?.message}</span>
        
        </>
      } 
      </>
    }
    
    </>
    
  }

  </>

}

</>

          }
         
        </div>
        )
        }
        <div className="form-control mt-6">
          <button className="btn btn-primary" type='submit'>Submit</button>
        </div>
       </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default ApplyForm;