import React, { FC, useState } from "react";
import Button from "../Buttons/Button";
import styled from "@emotion/styled";
import axios from "axios";
import { ImageData } from "../../pages/Home/Home";

interface FormData {
  patientAge: number,
  correctDiagnosis: boolean,
  cameraModel: string
}

const Div = styled.div`
 display: flex;
 justify-content: center;
`

const Container = styled(Div)`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 2px;
  height: 200px;
  justify-content: space-between;
`

const Form = styled.form`
  flex-direction: column;
  justify-content: center;
`

const Input = styled.input`
  padding: 10px;
  border: solid 1px #5C068C;
  border-radius: 6px;
  font-size: 20px;
  outline: none;

  &:focus {
    border: solid 2px #3B83BD;
  }
`

const Label = styled.label`
  font-size: 20px;
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: space-between;
`

interface FormDataProps {
  onMetadataUpload: (data: any | undefined) => void,
  onClickReset: () => void
}

const DataForm: FC<FormDataProps> = ({onMetadataUpload, onClickReset}) => {
  const [data, setData] = useState<FormData>()

  const handleOnSubmit = (e: any) => {
    onMetadataUpload(data)
    onClickReset()
  }

  const handleChange = (e: any) => {
    e.preventDefault()
    setData({
      ...(data),
      [e.target.name]: e.target.value
    } as FormData)
  }

  return <Div>
    <Form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
      <Container>
        <Input name='patientAge' type='text' placeholder='Age of the patient' onChange={handleChange} />
        <Input name='cameraModel' type='text' placeholder='Camera model' onChange={handleChange}/>
        <Label>
          Was the diagnosis correct?
          <div>
            <input type="radio" name='correctDiagnosis' onChange={handleChange} value='true'/> yes
            <input type="radio" name='correctDiagnosis' onChange={handleChange} value='false'/> no
          </div>
        </Label>
      </Container>
      <Div>
        <Button onClick={handleOnSubmit} type="square" value={'Submit'}/>
      </Div>
    </Form>
  </Div>
}

export default DataForm
