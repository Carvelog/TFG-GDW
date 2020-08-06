import React, { FC } from "react";

interface ResultPageProps {
  result: number
}

const ResultPage: FC<ResultPageProps> = ({result}) => {
  return <p>Result: {result}</p>
}

export default ResultPage

