import React, { FC } from "react";

interface ResultPageProps {
  result: number
}

const ResultPage: FC<ResultPageProps> = ({result}) => {
  return <div>
    <p>Result: {result}</p>
  </div>
}

export default ResultPage

