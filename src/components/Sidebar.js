import { useState, useEffect } from "react";
import { fetchOdds } from "../services/BetsAPI";

const Sidebar = () => {
    
    // hook for odds from API
    const [odds, setOdds] = useState([]);
    // get odds via API
    useEffect(async () => {
        const data = await fetchOdds();
        if (data) setOdds(data);
      }, []);
          
    // hook for unique list of sport titles
    const [uniqueLeagues, getUniqueLeagues] = useState([]);
    // get unique list of sports titles
    useEffect(async () => {
        var lookup = {};
        var items = odds;
        var result = [{league : "All"}];

        for (var item, i = 0; item = items[i++];) {
            var sport_title = item.sport_title;

            if (!(sport_title in lookup)) {
                lookup[sport_title] = 1;
                result.push({league : sport_title});
            }
        }

        getUniqueLeagues(result);
    })


    // hook for filtered display
    const [filteredOdds, setFilteredOdds] = useState(odds);
    // filter the "odds" data to only have the relevant sport
    useEffect(() => {
        const data = odds.filter(function(item){
            var click = handleClick();
            if (click == "All") {
                return item;
            }
            return item.sport_title == click;
        });

    setFilteredOdds(data)
    })

    // this function handles clicks
    function handleClick() {
    
        return(event.target.id)
    }
    
    console.log(filteredOdds)

    // return sidebar element 
    return(
        <div title="sidebar">
            <div>
                {uniqueLeagues.map(u => (
                    <button id={u.league} onClick={handleClick}>{u.league}</button>
                ))} 
            </div>
        </div>
    );

};

export { Sidebar };