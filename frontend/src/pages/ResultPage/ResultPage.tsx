import React, { FC } from "react";

interface ResultPageProps {
  id: string
}

const ResultPage: FC<ResultPageProps> = ({id}) => {
  return <p>ID: {id}</p>
}

export default ResultPage

