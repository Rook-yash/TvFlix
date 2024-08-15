document.querySelector('.navi1')
.addEventListener('click' , () => {
    document.querySelector('.box-left')
    .classList.add('visi');
    document.querySelector('.navi1')
    .style.display = 'none'
    document.querySelector('.navi2')
    .style.display = 'block'
})
document.querySelector('.navi2')
.addEventListener('click' , () => {
    document.querySelector('.box-left')
    .classList.remove('visi');
    document.querySelector('.navi1')
    .style.display = 'block'
    document.querySelector('.navi2')
    .style.display = 'none'
})
document.querySelector('.search-logo')
.addEventListener('click' , () => {
    document.querySelector('.search-logo')
    .classList.add('visilogo');
    document.querySelector('.search')
    .classList.add('visisearch');
    document.querySelector('.tvflix-img')
    .style.display = 'none';
    document.querySelector('.navbar')
    .classList.add('center');
})

document.querySelector('.search')
.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter'){
    document.querySelector('.search-logo')
    .classList.remove('visilogo');
    document.querySelector('.search')
    .classList.remove('visisearch');
    document.querySelector('.tvflix-img')
    .style.display = 'block';
    document.querySelector('.navbar')
    .classList.remove('center');
    }
})

const key = 'd39f6dc5e8a70590c6259156f9d0918d';
const secure_img = 'https://image.tmdb.org/t/p/';
const search_bar = `https://api.themoviedb.org/3/search/movie?query=`;
const genre = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
let search_value = localStorage.getItem('search-name');
console.log(search_value)

document.querySelector('.search')
.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter'){
        console.log(document.querySelector('.search').value)
        localStorage.setItem('search-name' , document.querySelector('.search').value);
        document.querySelector('.search-movies').innerHTML = ''
        search_value = localStorage.getItem('search-name');
        searchh();
    }
})

searchh();
async function searchh(){
    const search_info = await fetch(`${search_bar}${search_value}&api_key=${key}`);
    const search_data  =await search_info.json();
    console.log(search_data);

    const genre_info = await fetch(`${genre}&api_key=${key}`);
    genredata = await genre_info.json();
    console.log(genredata);

    add_search(search_data,genredata)
}

function add_search(search_data,genredata){
    const temp = document.querySelector('.temp-search');
    const search_clone = document.querySelector('.search-movies');
    
    search_data.results.forEach((item,index) => {
        let clone = temp.content.firstElementChild.cloneNode(true);
        clone.children[0].src = secure_img + 'original' + item.poster_path;
        clone.children[1].innerHTML = item.title;
        clone.children[2].children[1].innerHTML = item.release_date;
        clone.children[2].children[0].children[1].innerHTML = 
        Math.round((item.vote_average)*10)/10; 
        
        clone.addEventListener('click' , ()=> {
            localStorage.setItem('id' , item.id)
            localStorage.setItem('type' , 'like')
            
        })

        if(item.backdrop_path !== null){
            search_clone.appendChild(clone);
        }
        
    });

    const what_genre = document.querySelectorAll('.genre-type');
    what_genre.forEach((item,index) => {
        item.addEventListener('click' , () => {
            genredata.genres.forEach((item1,index)=>{
                if(item.innerHTML === item1.name){
                    localStorage.setItem('genre_id_type' , item1.id);
                    localStorage.setItem('genre_name_type' , item1.name);
                }
            })
        })
    })
    
}

