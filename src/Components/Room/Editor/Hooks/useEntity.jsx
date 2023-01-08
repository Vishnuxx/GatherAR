import { useState } from "react";


export function useEntiy() {
    const [entities, setEntities] = useState([]);

    function createEntity(uid , components) {
        setEntities((prevState)=>{
            return [...prevState , {
                uid: uid,
                component: {...components}
            }]
        })
    }

    function deleteEntity(uid) {
        setEntities((prevState) =>
          prevState.filter((entities) => entities.uid !== uid)
        );
    }

    function addComponent(uid , component) {
        const {name , value} = component
        setEntities((prevState)=>{
            return prevState.map((entity)=>{
                if(entity.uid === uid) {
                    entity.component[name] = value
                }
                return entity
            })
        })
    }

    

    function removeComponent(uid , name) {
         setEntities((prevState) => {
           return prevState.map((entity) => {
             if (entity.uid === uid) {
              delete entity.component[name]
             }
             return entity;
           });
         });
    }

    return [entities, createEntity, deleteEntity , addComponent , removeComponent];
}