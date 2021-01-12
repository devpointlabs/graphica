
import React, { useState } from 'react';

const useRenderColumns = (input = []) => {
  const [ columnArrays, setColumnArrays ] = useState([[], [], []]);
 
  const renderColumns = (input, columnCount) => {
    let column_height = new Array(columnCount).fill(0);
    let column_arrays = new Array(columnCount).fill().map(() => []);
    const offset = (columnCount == 3) ? 0.15 : 0.1

    const assignColumns = (listItem) => {
      const shortColumnIndex = column_height.indexOf(Math.min(...column_height));
      shortColumnIndex > -1 && column_arrays[shortColumnIndex].push(listItem)
      column_height[shortColumnIndex] += 1/listItem.ratio + offset
      setColumnArrays(column_arrays)
    }

    const sortMany = (input, n) => {
      let last = [];
      let i = 0;
      
      input.forEach((listItem) => {
        if (i + n  < input.length) {
          assignColumns(listItem)
        } else if (i + n === input.length) {
          last.push(listItem)
        } else if (n > 2 && i + n - 1 === input.length) {
          last.push(listItem)
        } else {
          last.push(listItem)
          last.sort((a,b) => a.ratio - b.ratio )
          last.forEach((listItem) => {
            assignColumns(listItem)
          })
        }
        i ++ 
      })
    }
    
    if (columnCount == 1) {
      input.forEach(listItem => column_arrays[0].push(listItem))
    } else if (input.length > 2){
      sortMany(input, columnCount)
    } else if (input.length === 2) {
      if (input[0].ratio < input[1].ratio) {
        column_arrays[0].push(input[0])
        column_arrays[1].push(input[1])
      } else {
        column_arrays[0].push(input[1])
        column_arrays[1].push(input[0])
      }
    } else {
      input.forEach(listItem => column_arrays[0].push(listItem))
    }
    setColumnArrays(column_arrays)
  }

  return { columnArrays, renderColumns }
}

export default useRenderColumns