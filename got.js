

// let char = fetch("https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50")
// char.then((results) =>{
//     return results.json();
// })
// .then((data)=>{
//     console.log(data);
// })

// let house = fetch("https://www.anapioficeandfire.com/api/houses?page=2&pageSize=50")
// house.then((results) =>{
//     return results.json();
// })
// .then((data) =>{
//     console.log(data);
// })

// for(let x = 0; x < 5000; x++){
//     let y = 1 + x;
// }

// console.log('finished loop');


// $(() =>{
//     let char = fetch("https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50")

//     let house = fetch("https://www.anapioficeandfire.com/api/houses?page=2&pageSize=50")

//     let promise = Promise.all([char,house])

//     promise.then((resultsArr)=>{
//         let results = []
//         results[0] = resultsArr[0].json();
//         results[1] = resultsArr[1].json();
//         return Promise.all(results)
//     })
//     .then((dataArr) =>{
//         console.log(dataArr);
//         let charArray = []
//         dataArr.forEach((char) =>{
//             charArray = [...charArray,...char]
            
//         })
//         console.log(charArray);
//     })

//     console.log("outside of promise");
// })

$(() => {
    let fetchArr = []
    let url = "";

    for(let x = 0; x < 45; x ++){
        url = fetch("https://www.anapioficeandfire.com/api/characters?page=" + x + "&pageSize=50")
        fetchArr.push(url);
        
    }
    let promise = Promise.all(fetchArr);
    promise.then((resultsArr)=>{
        return Promise.all(resultsArr.map(char =>{
            return char.json()
        }))
    })
    .then((dataArr) =>{
        console.log(dataArr);
        let charList = [];
        dataArr.forEach((char)=>{
            charList = [...charList, ...char]
        })
        console.log(charList);
        
        let $listGroup = $('.list-group');
        let liTags = charList.map((char) =>{
            return `<a href="${char.url}" class="list-group-item list-group-item-action">${char.name}:  <b>houses</b> ${char.allegiances.length}</a>`
        
        })
        $listGroup.html(liTags.join(''))
        
    })
    let $div = $(".list-group");
    $div.click((e)=>{
        e.preventDefault();
        console.log(e.target.href);
        $.get(e.target.href)
        .done((charObject)=>{
            let $modalBody = $('.modal-body')
            let $modalTitle = $('.modal-title')
            $modalBody.html('')
            $modalTitle.html(charObject.name)
            if(charObject.allegiances.length > 0){
                charObject.allegiances.forEach((houseUrl)=>{
                    $.get(houseUrl)
                    .done((houseObj)=>{
                        $modalBody.html(`<br>${$modalBody.html()}</br>${houseObj.name}`)
                    })
                })
            }
            $('#exampleModalCenter').modal('show');

        })
    })
});



