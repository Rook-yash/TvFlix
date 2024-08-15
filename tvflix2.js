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
    
const idd = Number(localStorage.getItem('id'));
const typee = localStorage.getItem('type');
console.log(typee)
console.log(idd)
let storegenre = [];

const key = 'd39f6dc5e8a70590c6259156f9d0918d';
const getpopular = 'https://api.themoviedb.org/3/movie/popular?';
const secure_img = 'https://image.tmdb.org/t/p/';
const genre = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const credit = `https://api.themoviedb.org/3/movie/`;
const runtime = 'https://api.themoviedb.org/3/movie/';
const vid = 'https://api.themoviedb.org/3/movie/';
const recom = 'https://api.themoviedb.org/3/movie/';
const trend = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';
const topp = 'https://api.themoviedb.org/3/movie/top_rated?&api_key=';
const up = 'https://api.themoviedb.org/3/movie/upcoming?api_key=';

detail_genresearch();

async function detail_genresearch(){
    const pop_info = await fetch(`${getpopular}&api_key=${key}`);
    const data = await pop_info.json();
    console.log(data);

    const genre_info = await fetch(`${genre}&api_key=${key}`);
    const genredata = await genre_info.json();
    console.log(genredata);

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

    const cred_info = await fetch(`${credit}${idd}/credits?api_key=${key}`);
    const cred_data = await cred_info.json();
    console.log(cred_data);

    const run_info = await fetch(`${runtime}${idd}?api_key=${key}`);
    const run_data = await run_info.json();
    console.log(run_data);

    const vid_info = await fetch(`${vid}${idd}/videos?api_key=${key}`);
    const vid_data = await vid_info.json();
    console.log(vid_data);

    const rec_info = await fetch(`${recom}${idd}/recommendations?api_key=${key}`);
    const rec_data = await rec_info.json();
    console.log(rec_data);

    const trend_info = await fetch(`${trend}${key}`);
    const trend_data = await trend_info.json();
    console.log(trend_data);

    const toprated_info = await fetch(`${topp}${key}`);
    const top_data = await toprated_info.json();
    console.log(top_data);

    const upcoming_info = await fetch(`${up}${key}`);
    const up_data = await upcoming_info.json();
    console.log(up_data);

    addlike(rec_data);
    console.log(typee);

    if(typee === 'trend'){
        addtrend2(trend_data,genredata,cred_data,run_data,vid_data);
    }
    else if(typee === 'top'){
        addtop2(top_data,genredata,cred_data,run_data,vid_data);
    }
    else if(typee === 'up'){
        addup2(up_data,genredata,cred_data,run_data,vid_data);
    }
    else if(typee === 'pop'){
        detail_Find(data , genredata,cred_data,run_data,vid_data);
    }
    else{
        console.log('bc like')
        addlike2(run_data , genredata,cred_data,run_data,vid_data)
    }

}

function detail_Find(data,genredata,cred_data,run_data,vid_data){
    console.log('bc' + '3')
    data.results.forEach((item,index) => {
        console.log('bc' + '4')
        console.log(idd)
        console.log(item.id)
        if(item.id === idd){
            console.log(idd)
            console.log('bc') + '2'
            document.querySelector('.d-genre')
            .innerHTML = '';
            document.querySelector('.names')
            .innerHTML = '';
            document.querySelector('.name')
            .innerHTML = '';
            document.querySelector('.detail1-head')
            .innerHTML = item.title;
            document.querySelector('.detail1-overview')
            .innerHTML = item.overview;
            console.log(item.overview + 'bc');
            document.querySelector('.detail1-back')
            .src = secure_img + 'original' + item.backdrop_path;
            document.querySelector('.detail1-left-img')
            .src = secure_img + 'original' + item.poster_path;
            document.querySelector('.rattee')
            .innerHTML = Math.round((item.vote_average)*10)/10;
            document.querySelector('.date')
            .innerHTML = item.release_date;

            item.genre_ids.forEach((item1,index) => {
                genredata.genres.forEach(item2 => {
                    if(item1 === item2.id){
                        storegenre.push(item2.id);
                        if(index === item.genre_ids.length - 1){
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name ;
                        }
                        else{
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name + ', ';
                        }
                    }
                })
            });  

            
            
        }
    });

    console.log(storegenre)

    cred_data.cast.forEach((item,index) => {
        if(index <=9){
            if(index === 9 || index === cred_data.cast.length ){
                document.querySelector('.names')
                .innerHTML += item.name +'.';
            }
            else{
                document.querySelector('.names')
                .innerHTML += item.name + ', ';
            }
        }
    })

    cred_data.crew.forEach((item,index) => {
        if(item.job === 'Director'){
            document.querySelector('.name')
            .innerHTML += item.name + ' ';
        }
    })

    document.querySelector('.time')
    .innerHTML = run_data.runtime + ' m'

    const tempvid = document.querySelector('.vid-temp');
    const vid_links = document.querySelector('.vid-links')

    vid_data.results.forEach((item,index) => {
        if(item.official === true){
            let clone = tempvid.content.firstElementChild.cloneNode(true);
            clone.src = 'https://www.youtube.com/embed/' + item.key + '?&theme=dark&color=white&rel=0';
            vid_links.append(clone);
        }
    })

}


function addlike(rec_data){
    const weektrend = document.querySelector('.detail2-movies')
    const temp = document.querySelector('.detail-movie');
    rec_data.results.forEach((item)=>{
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

        weektrend.appendChild(clone);
    })
    
}

function addtrend2(trend_data,genredata,cred_data,run_data,vid_data){
    trend_data.results.forEach((item,index) => {
        if(item.id === idd){
            document.querySelector('.d-genre')
            .innerHTML = '';
            document.querySelector('.names')
            .innerHTML = '';
            document.querySelector('.name')
            .innerHTML = '';
            document.querySelector('.detail1-head')
            .innerHTML = item.title;
            document.querySelector('.detail1-overview')
            .innerHTML = item.overview;
            document.querySelector('.detail1-back')
            .src = secure_img + 'original' + item.backdrop_path;
            document.querySelector('.detail1-left-img')
            .src = secure_img + 'original' + item.poster_path;
            document.querySelector('.rattee')
            .innerHTML = Math.round((item.vote_average)*10)/10;
            document.querySelector('.date')
            .innerHTML = item.release_date;

            item.genre_ids.forEach((item1,index) => {
                genredata.genres.forEach(item2 => {
                    if(item1 === item2.id){
                        storegenre.push(item2.id);
                        if(index === item.genre_ids.length - 1){
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name ;
                        }
                        else{
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name + ', ';
                        }
                    }
                })
            });  

            
            
        }
    });

    console.log(storegenre)

    cred_data.cast.forEach((item,index) => {
        if(index <=9){
            if(index === 9 || index === cred_data.cast.length ){
                document.querySelector('.names')
                .innerHTML += item.name +'.';
            }
            else{
                document.querySelector('.names')
                .innerHTML += item.name + ', ';
            }
        }
    })

    cred_data.crew.forEach((item,index) => {
        if(item.job === 'Director'){
            document.querySelector('.name')
            .innerHTML += item.name + ' ';
        }
    })

    document.querySelector('.time')
    .innerHTML = run_data.runtime + ' m'

    const tempvid = document.querySelector('.vid-temp');
    const vid_links = document.querySelector('.vid-links')

    vid_data.results.forEach((item,index) => {
        if(item.official === true){
            let clone = tempvid.content.firstElementChild.cloneNode(true);
            clone.src = 'https://www.youtube.com/embed/' + item.key + '?&theme=dark&color=white&rel=0';
            vid_links.append(clone);
        }
    })
}

function addtop2(top_data,genredata,cred_data,run_data,vid_data){
    top_data.results.forEach((item,index) => {
        if(item.id === idd){
            document.querySelector('.d-genre')
            .innerHTML = '';
            document.querySelector('.names')
            .innerHTML = '';
            document.querySelector('.name')
            .innerHTML = '';
            document.querySelector('.detail1-head')
            .innerHTML = item.title;
            document.querySelector('.detail1-overview')
            .innerHTML = item.overview;
            document.querySelector('.detail1-back')
            .src = secure_img + 'original' + item.backdrop_path;
            document.querySelector('.detail1-left-img')
            .src = secure_img + 'original' + item.poster_path;
            document.querySelector('.rattee')
            .innerHTML = Math.round((item.vote_average)*10)/10;
            document.querySelector('.date')
            .innerHTML = item.release_date;

            item.genre_ids.forEach((item1,index) => {
                genredata.genres.forEach(item2 => {
                    if(item1 === item2.id){
                        storegenre.push(item2.id);
                        if(index === item.genre_ids.length - 1){
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name ;
                        }
                        else{
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name + ', ';
                        }
                    }
                })
            });  

            
            
        }
    });

    console.log(storegenre)

    cred_data.cast.forEach((item,index) => {
        if(index <=9){
            if(index === 9 || index === cred_data.cast.length ){
                document.querySelector('.names')
                .innerHTML += item.name +'.';
            }
            else{
                document.querySelector('.names')
                .innerHTML += item.name + ', ';
            }
        }
    })

    cred_data.crew.forEach((item,index) => {
        if(item.job === 'Director'){
            document.querySelector('.name')
            .innerHTML += item.name + ' ';
        }
    })

    document.querySelector('.time')
    .innerHTML = run_data.runtime + ' m'

    const tempvid = document.querySelector('.vid-temp');
    const vid_links = document.querySelector('.vid-links')

    vid_data.results.forEach((item,index) => {
        if(item.official === true){
            let clone = tempvid.content.firstElementChild.cloneNode(true);
            clone.src = 'https://www.youtube.com/embed/' + item.key + '?&theme=dark&color=white&rel=0';
            vid_links.append(clone);
        }
    })
}

function addup2(up_data,genredata,cred_data,run_data,vid_data){
    up_data.results.forEach((item,index) => {
        if(item.id === idd){
            document.querySelector('.d-genre')
            .innerHTML = '';
            document.querySelector('.names')
            .innerHTML = '';
            document.querySelector('.name')
            .innerHTML = '';
            document.querySelector('.detail1-head')
            .innerHTML = item.title;
            document.querySelector('.detail1-overview')
            .innerHTML = item.overview;
            document.querySelector('.detail1-back')
            .src = secure_img + 'original' + item.backdrop_path;
            document.querySelector('.detail1-left-img')
            .src = secure_img + 'original' + item.poster_path;
            document.querySelector('.rattee')
            .innerHTML = Math.round((item.vote_average)*10)/10;
            document.querySelector('.date')
            .innerHTML = item.release_date;

            item.genre_ids.forEach((item1,index) => {
                genredata.genres.forEach(item2 => {
                    if(item1 === item2.id){
                        storegenre.push(item2.id);
                        if(index === item.genre_ids.length - 1){
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name ;
                        }
                        else{
                            document.querySelector('.d-genre')
                            .innerHTML+= item2.name + ', ';
                        }
                    }
                })
            });  

            
            
        }
    });

    console.log(storegenre)

    cred_data.cast.forEach((item,index) => {
        if(index <=9){
            if(index === 9 || index === cred_data.cast.length ){
                document.querySelector('.names')
                .innerHTML += item.name +'.';
            }
            else{
                document.querySelector('.names')
                .innerHTML += item.name + ', ';
            }
        }
    })

    cred_data.crew.forEach((item,index) => {
        if(item.job === 'Director'){
            document.querySelector('.name')
            .innerHTML += item.name + ' ';
        }
    })

    document.querySelector('.time')
    .innerHTML = run_data.runtime + ' m'

    const tempvid = document.querySelector('.vid-temp');
    const vid_links = document.querySelector('.vid-links')

    vid_data.results.forEach((item,index) => {
        if(item.official === true){
            let clone = tempvid.content.firstElementChild.cloneNode(true);
            clone.src = 'https://www.youtube.com/embed/' + item.key + '?&theme=dark&color=white&rel=0';
            vid_links.append(clone);
        }
    })
}

function addlike2(rec_data,genredata,cred_data,run_data,vid_data){
    
    document.querySelector('.d-genre')
            .innerHTML = '';
            document.querySelector('.names')
            .innerHTML = '';
            document.querySelector('.name')
            .innerHTML = '';
            document.querySelector('.detail1-head')
            .innerHTML = rec_data.title;
            document.querySelector('.detail1-overview')
            .innerHTML = rec_data.overview;
            document.querySelector('.detail1-back')
            .src = secure_img + 'original' + rec_data.backdrop_path;
            document.querySelector('.detail1-left-img')
            .src = secure_img + 'original' + rec_data.poster_path;
            document.querySelector('.rattee')
            .innerHTML = Math.round((rec_data.vote_average)*10)/10;
            document.querySelector('.date')
            .innerHTML = rec_data.release_date;

            rec_data.genres.forEach((item2,index) => {
                if(index === rec_data.genres.length - 1){
                    document.querySelector('.d-genre')
                    .innerHTML+= item2.name ;
                }
                else{
                    document.querySelector('.d-genre')
                    .innerHTML+= item2.name + ', ';
                }
            })

    console.log(storegenre)

    cred_data.cast.forEach((item,index) => {
        if(index <=9){
            if(index === 9 || index === cred_data.cast.length ){
                document.querySelector('.names')
                .innerHTML += item.name +'.';
            }
            else{
                document.querySelector('.names')
                .innerHTML += item.name + ', ';
            }
        }
    })

    cred_data.crew.forEach((item,index) => {
        if(item.job === 'Director'){
            document.querySelector('.name')
            .innerHTML += item.name + ' ';
        }
    })

    document.querySelector('.time')
    .innerHTML = run_data.runtime + ' m'

    const tempvid = document.querySelector('.vid-temp');
    const vid_links = document.querySelector('.vid-links')

    vid_data.results.forEach((item,index) => {
        if(item.official === true){
            let clone = tempvid.content.firstElementChild.cloneNode(true);
            clone.src = 'https://www.youtube.com/embed/' + item.key + '?&theme=dark&color=white&rel=0';
            vid_links.append(clone);
        }
    })
}

document.querySelector('.search')
.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter'){
        console.log(document.querySelector('.search').value)
        localStorage.setItem('search-name' , document.querySelector('.search').value);
        window.location.assign('tvflix4.html');
    }
})