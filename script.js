const puppyForm = document.querySelector('#puppy-form');
const selectPuppy = document.querySelector('#dog');
const dogsPicture = document.createElement('img');
puppyForm.before(dogsPicture);

puppyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const dogsBreed = event.target.dog.value;
    getDogPicture(dogsBreed)
})

function getDogsBreed() {
    fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(response => response.json())
    .then(breeds => {
        const breedsArr = Object.keys(breeds.message);
        const subBreedsArr = Object.values(breeds.message);
        breedsArr.map((breed, index) => {
            const breedOptions = document.createElement('option');
            breedOptions.textContent = breed;
            breedOptions.value = breed;
            selectPuppy.append(breedOptions);

            const subBreeds = subBreedsArr[index];
            subBreeds.map(subBreed => {
                const breedOptions = document.createElement('option');
                breedOptions.textContent = `${breed} (${subBreed})`;
                breedOptions.value = `${breed}/${subBreed}`;
                selectPuppy.append(breedOptions);
            })
        })
    })
}

getDogsBreed()

function getDogPicture(dogsBreed) {
    fetch(`https://dog.ceo/api/breed/${dogsBreed}/images/random`)
    .then(response => response.json())
    .then(image => {
        dogsPicture.setAttribute('src', `${image.message}`);
    })
}