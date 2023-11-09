"use client"
import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import ExerciseComponent from './ExerciseComponent'



const SearchComponent = (props) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const { index: indexData, exercises, options } = props
    const [fuse, setFuse] = useState(null)

    useEffect(() => {
        setFuse(new Fuse(exercises, options))
    }, [indexData])

    const handleInputChange = event => {
        event.preventDefault();
        setSearchTerm(event.target.value);

        if (searchTerm.length < 3) {
            setSearchResults([]);
        } else {
            const results = fuse.search(searchTerm);
            setSearchResults(results);
        }
        console.log(searchResults)
    }


    return (
        <div>
            <input
                type="text"
                placeholder="Type here"
                value={searchTerm}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs" />

            <ul>
                {searchResults.map((doc, index) => (
                    doc.score < 0.4 && <ExerciseComponent key={index} exercise={doc.item} />
                ))}
            </ul>

        </div>
    );
}

export default SearchComponent