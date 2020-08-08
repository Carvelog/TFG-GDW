import React, { FC } from "react";

interface ResultPageProps {
  result: number
  image: string
}

const ResultPage: FC<ResultPageProps> = ({result, image}) => {
  return <div>
    <p>Result: {result}</p>
    <img src={`data:image/jpeg;base64,${image}`} alt="" width="200" height="200"/>
  </div>
}

export default ResultPage

