idGenerator = () => {
    id = 0
    generator = () => {
        id+=1;
        return id
    }
    return generator
}

get_next = idGenerator();
ingredients = []

removeListItem = (ingredient_id) => {
    var elem = document.getElementById(`li_${ingredient_id}`);
    elem && elem.parentNode.removeChild(elem);
}

addIngredient = (name) => {
    ingredient_id = get_next();
    ingredients.push({
        ingredient_id,
        name
    })
    document.getElementById('itemgroup').innerHTML += `<li id="li_${ingredient_id}" class="list-group-item d-flex justify-content-between align-items-center">${name}<button id="ingredient_${ingredient_id}" class="ingredient_delete btn btn-danger"><span id="ingredientspan_${ingredient_id}" class="fa fa-trash"></span></button></li>`
    
    for (let i of document.querySelectorAll(`.ingredient_delete`)){
        i.addEventListener('click', (event) => {
            ingredient_id = +event.target.id.split('_')[1]
            removeListItem(ingredient_id);
            ingredients = ingredients.filter(e => e.ingredient_id != ingredient_id);
        })
    }
}

document.getElementById('addbtn').addEventListener('click', (event) => {
    value = document.getElementById('ingredient').value;
    if (value)
    {
        addIngredient(value);
        document.getElementById('ingredient').value = '';
    } 
})

var x_interval = null;
document.getElementById('generatebtn').addEventListener('click', (event) => {
    console.log(ingredients.map(e => e.name))

    document.getElementById('searchTab').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('searchTab').style.display = 'none';
        document.getElementById('waitTab').style.display = 'block';
        setTimeout(() => {
            document.getElementById('waitTab').style.opacity = 1;
            setTimeout(() => {
                x_interval = setInterval(changeLobster, 500)
            }, 500)
        }, 10)
    }, 500)

    setTimeout(async () => {
        instructions = (await axios.get('http://my-json-server.typicode.com/nenad-misic/fake_siap_api/instructions')).data;
        random_instruction = instructions[Math.floor(Math.random() * instructions.length)];
        console.log(random_instruction)

        clearInterval(x_interval)
        document.getElementById('waitTab').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('searchTab').style.display = 'block';
            document.getElementById('waitTab').style.display = 'none';
            setTimeout(() => {
                document.getElementById('searchTab').style.opacity = 1;
            }, 10);
        }, 500);
    }, 2000);
    

})

var current_next = 3;
function changeLobster() {
    if (current_next == 3){
        document.getElementById('lobster').setAttribute('src', '3.png')
        current_next = 2;
    }else{
        document.getElementById('lobster').setAttribute('src', '2.png')
        current_next = 3;
    }
}