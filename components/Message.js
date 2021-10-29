import React from 'react'

export const Message = ({year, earnings, taxes, guadagnoPuro}) => {
    return (
        <li>{year} : {earnings} - {taxes} = {guadagnoPuro}</li>
    )
}
