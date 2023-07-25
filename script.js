const randomDogButton = document.querySelector('.random-dog');

const randomDogPictureContainer = document.createElement('div');
randomDogPictureContainer.classList.add('picture-container');
const randomDogPicture = document.createElement('img');

randomDogButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(image => {
        randomDogPicture.setAttribute('src', `${image.message}`);
        randomDogPicture.classList.add('dog-pic');
        randomDogButton.before(randomDogPictureContainer);
        randomDogPictureContainer.append(randomDogPicture);
    })

})

const puppyForm = document.querySelector('#puppy-form');
const selectPuppy = document.querySelector('#dog');

const pictureContainer = document.createElement('div');
pictureContainer.classList.add('picture-container');
const dogsPicture = document.createElement('img');

puppyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const dogsBreed = event.target.dog.value;
    getDogPicture(dogsBreed);
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

getDogsBreed();

function getDogPicture(dogsBreed) {
    fetch(`https://dog.ceo/api/breed/${dogsBreed}/images/random`)
    .then(response => response.json())
    .then(image => {
        dogsPicture.setAttribute('src', `${image.message}`);
        dogsPicture.classList.add('dog-pic');
        puppyForm.before(pictureContainer);
        pictureContainer.append(dogsPicture);
    })
}