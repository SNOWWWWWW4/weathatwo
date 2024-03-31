export const saveToLocalStorage = (city: string) => {
    let favorites = getLocalStorage();

    if (!favorites.includes(city)) {
        favorites.push(city);
    }

    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

export const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");

    if (localStorageData === null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

export const removeFromLocalStorage = (city: string) => {
    let favorites = getLocalStorage();
    let index = favorites.indexOf(city);

    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }
}