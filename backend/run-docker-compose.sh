#!/bin/bash

if [ "${BASH_SOURCE[0]}" = "$0" ]; then
  echo "You should source this script, not execute it!" 
  echo "  > usage: source run-docker-compose.sh" 1>&2
  exit 1
fi

if [ $# -eq 0 -o $# -eq 1 ]; then
  envpath=.env #buscar desde ruta actual la del script y el .env

  if [ -f $envpath ]; then
    export $(cat $envpath | grep -v '#' | xargs -d '\n')
    
    docker build -t web-backend . #change path to backend Dockerfile 
    docker build -f Dockerfile-mongo -t web-mongo .  #change path to mongodb Dockerfile 
    docker-compose up &
  else
    echo "Failed to create docker container, no .env file found" 1>&2
    return 1
  fi
else
  echo "You must introduce one name to database directory or none." 1>&2
  return 1
fi