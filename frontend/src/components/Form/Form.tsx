import React, { useState } from "react";
import Button from "../Buttons/Button";

interface FormData {
  patientAge: number,
  correctDiagnosis: boolean,
  cameraModel: string
}

const Form = () => {
  const [data, setData] = useState<FormData>()

  const handleOnSubmit = (e: any) => {
    console.log(data)
  }

  const handleChange = (e: any) => {
    e.preventDefault()
    setData({
      ...(data),
      [e.target.name]: e.target.value
    } as FormData)
  }

  return <div>
    <form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
      <div>
        <input name='patientAge' type='text' placeholder='Age of the patient' onChange={handleChange} />
        {/*<input name='correctDiagnosis' type='text' placeholder='Is correct the diagnosis' onChange={handleChange}/>*/}
        <label>
          Was the diagnosis correct?
        </label>
        <input type="radio" name='correctDiagnosis' onChange={handleChange} value='true'/> yes
        <input type="radio" name='correctDiagnosis' onChange={handleChange} value='false'/> no
        <input name='cameraModel' type='text' placeholder='Camera model' onChange={handleChange}/>
      </div>
      <Button onClick={handleOnSubmit} type="square" value={'Submit'}/>
    </form>
  </div>
}

export default Form
