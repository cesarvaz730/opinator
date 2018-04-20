#!/bin/bash
  
echo "Running 'npm install'..."
npm install
  
if [ "$?" -eq 0 ];
then   
    echo "'npm install' successfull."
fi
  
echo "Executing 'ng build --prod'"
ng build --prod --aot
if [ "$?" -eq 0 ];
then   
    echo "'build for prod finished' successfull."
fi