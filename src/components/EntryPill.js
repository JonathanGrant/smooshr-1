import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EntryPill({ entry, onRemove }) {
    return (
        <span className='entry-pill'>
            {entry}
            <FontAwesomeIcon icon={faTimes} onClick={() => onRemove(entry)} />
        </span>
    )
}