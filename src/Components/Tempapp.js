import React, { useEffect, useState } from "react";
import "./style.css";

const Tempapp = () => {
    const [country,setcountry]=useState("Country");
    const [desc,setdesc]=useState("Description");
    const APIkey = "ea00f6e680300682ef3d0fe8ae24e474";
    const [city, setcity] = useState(null);
    const [search, setsearch] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${APIkey}`;
            const reply = await fetch(url);
            const jsonreply = await reply.json();
            setcity(jsonreply.main);
            // console.log(jsonreply);
            setcountry(jsonreply.sys);
            setdesc(jsonreply.weather);
        };
        fetchAPI()
    }, [search])

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type="search"
                        placeholder="🔍"
                        className="inputField"
                        onChange={(event) => {
                            setsearch(event.target.value);
                        }}
                    />
                </div>
                {!city ? (<p className="errorMsg">No city found</p>) :
                    (
                        <div>
                            <div className="info">
                                <h2 className="location">
                                    <i className="fa-solid fa-tree-city"></i> {search}
                                </h2>
                                <h1 className="temp">
                                    {city.temp} °Cel
                                </h1>
                                <h3 className="tempmin_max">
                                    Min:{city.temp_min} °Cel |Max: {city.temp_max} °Cel
                                </h3>
                                <h4 className="country">
                                    Country: <span>{country.country}</span> | Description: <span>{desc[0].description}</span>
                                </h4>
                                
                            </div>

                            <div className="wave -one"></div>
                            <div className="wave -two"></div>
                            <div className="wave -three"></div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Tempapp;