

export function useECSManager() {
    function hasComponent(entity, name) {
      return entity.component[name] != undefined;
    }   

    return [hasComponent]
}