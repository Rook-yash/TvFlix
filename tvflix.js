let id ;

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
    
const key = 'd39f6dc5e8a70590c6259156f9d0918d';
const getpopular = 'https://api.themoviedb.org/3/movie/popular?';
const secure_img = 'https://image.tmdb.org/t/p/';
const genre = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

popular_genresearch();

async function popular_genresearch(){
    const pop_info = await fetch(`${getpopular}&api_key=${key}`);
    const data = await pop_info.json();
    console.log(data);

    const genre_info = await fetch(`${genre}&api_key=${key}`);
    const genredata = await genre_info.json();
    console.log(genredata);

    initial(data , genredata);
    addpop(data , genredata);
}
function initial(data , genredata){
    document.querySelector('.back')
    .src = secure_img +'original'+ data.results[0].backdrop_path;
    document.getElementById('title')
    .innerHTML = data.results[0].title;
    document.getElementById('ab2')
    .innerHTML = data.results[0].overview;
    document.querySelector('.rattee')
    .innerHTML = Math.round((data.results[0].vote_average)*10)/10;
    document.querySelector('.date')
    .innerHTML = data.results[0].release_date;

    data.results[0].genre_ids.forEach((item1,index) => {
        genredata.genres.forEach(item2 => {
            if(item1 === item2.id){
                if(index === data.results[0].genre_ids.length - 1){
                    document.getElementById('ab1')
                    .innerHTML+= item2.name ;
                }
                else{
                    document.getElementById('ab1')
                    .innerHTML+= item2.name + ', ';
                }
            }
        })
    });
    id = data.results[0].id;
    localStorage.setItem('id' , id);

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
function addpop(data , genredata){
    const back = document.querySelector('.back-scroll');
    const temp = document.querySelector('.temp');
    id = data.results[0].id;
    console.log(id)
    data.results.forEach((item , index) => {
        let clone = temp.content.firstElementChild.cloneNode(true);
        clone.src = secure_img +'original'+ item.poster_path;
        back.appendChild(clone);

        clone.addEventListener('click' , () => {

            document.getElementById('ab1')
            .innerHTML = '';
            id = item.id;
            console.log(id);
            localStorage.setItem('id' , id);
            localStorage.setItem('type' , 'pop');
            document.querySelector('.back')
            .src = secure_img +'original'+ item.backdrop_path;
            document.getElementById('title')
            .innerHTML = item.title;
            document.getElementById('ab2')
            .innerHTML = item.overview;
            document.querySelector('.rattee')
            .innerHTML = Math.round((item.vote_average)*10)/10;
            document.querySelector('.date')
            .innerHTML = item.release_date;

            item.genre_ids.forEach((item1,index) => {
                genredata.genres.forEach(item2 => {
                    if(item1 === item2.id){
                        if(index === item.genre_ids.length - 1){
                            document.getElementById('ab1')
                            .innerHTML+= item2.name ;
                        }
                        else{
                            document.getElementById('ab1')
                            .innerHTML+= item2.name + ', ';
                        }
                    }
                })
            });   

        })


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

const trend = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';

trending();
async function trending(){
    const trend_info = await fetch(`${trend}${key}`);
    const data = await trend_info.json();
    console.log(data);
    addtrend(data);
}

function addtrend(data){
    const weektrend = document.querySelector('.trend-movies')
    const temp = document.querySelector('.temp2');
    data.results.forEach((item)=>{
        let clone = temp.content.firstElementChild.cloneNode(true);
        clone.children[0].src = secure_img + 'original' + item.poster_path;
        clone.children[1].innerHTML = item.title;
        clone.children[2].children[1].innerHTML = item.release_date;
        clone.children[2].children[0].children[1].innerHTML = 
        Math.round((item.vote_average)*10)/10;  

        clone.addEventListener('click' , ()=> {
            localStorage.setItem('id' , item.id)
            localStorage.setItem('type' , 'trend');
        })
        
        weektrend.appendChild(clone);
    })
    
}

const topp = 'https://api.themoviedb.org/3/movie/top_rated?&api_key=';
toprated();
async function toprated(){
    const toprated_info = await fetch(`${topp}${key}`);
    const data = await toprated_info.json();
    console.log(data);
    addtop(data);
}

function addtop(data){
    const toprated = document.getElementById('top-rated')
    const temp = document.querySelector('.temp3');
    data.results.forEach((item)=>{
        let clone = temp.content.firstElementChild.cloneNode(true);
        clone.children[0].src = secure_img + 'original' + item.poster_path;
        clone.children[1].innerHTML = item.title;
        clone.children[2].children[1].innerHTML = item.release_date;
        clone.children[2].children[0].children[1].innerHTML = 
        Math.round((item.vote_average)*10)/10;    

        clone.addEventListener('click' , ()=> {
            localStorage.setItem('id' , item.id)
            localStorage.setItem('type' , 'top');
        })

        toprated.appendChild(clone);
    })
}

const up = 'https://api.themoviedb.org/3/movie/upcoming?api_key=';
upcoming();
async function upcoming(){
    const upcoming_info = await fetch(`${up}${key}`);
    const data = await upcoming_info.json();
    console.log(data);
    addup(data);
}

function addup(data){
    const upcoming = document.getElementById('upcoming')
    const temp = document.querySelector('.temp4');
    data.results.forEach((item)=>{
        let clone = temp.content.firstElementChild.cloneNode(true);
        clone.children[0].src = secure_img + 'original' + item.poster_path;
        clone.children[1].innerHTML = item.title;
        clone.children[2].children[1].innerHTML = item.release_date;
        clone.children[2].children[0].children[1].innerHTML = 
        Math.round((item.vote_average)*10)/10;  
        
        clone.addEventListener('click' , ()=> {
            localStorage.setItem('id' , item.id)
            localStorage.setItem('type' , 'up');
        })

        upcoming.appendChild(clone);
    })
}

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



document.querySelector('.search')
.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter'){
        console.log(document.querySelector('.search').value)
        localStorage.setItem('search-name' , document.querySelector('.search').value);
        window.location.assign('tvflix4.html');
    }
})

