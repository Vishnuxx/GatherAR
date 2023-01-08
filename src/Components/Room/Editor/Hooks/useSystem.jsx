import { useState } from "react";


export function useSystems() {
    const [systems, setSystem] = useState({});

    function registerSystem({id , callback=(ecs , scene , entities , delta)=>{}}) {
        setSystem({
            ...systems,
            [id] : callback
        })
    }

    function unregisterSystem(id) {
        setSystem((prevstate)=> prevstate.filter((system)=>system.id !== id))
    }

    function updateSystems(ecs , scene , entities , delta) {
        Object.values(systems).map(system => {
            system(ecs , scene , entities , delta)
        })
    }

    return [registerSystem , unregisterSystem , updateSystems]
}