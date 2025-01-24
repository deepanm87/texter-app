import {v4 as uuidv4 } from "https://jspm.dev/uuid"

let textData = []

document.addEventListener('click', function(e) {
    if(e.target.id === 'text-btn') {
        handleTextBtnClick()
    }
    else if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.delete) {
        handleDeleteClick(e.target.dataset.delete)
    }
})

function handleLikeClick(textId) {
    const targetTextObj = textData.filter(function(text) {
        return text.uuid === textId
    })[0]

    if(targetTextObj.isLiked) {
        targetTextObj.likes--
    }
    else {
        targetTextObj.likes++
    }
    targetTextObj.isLiked = !targetTextObj.isLiked
    render()
}

function handleDeleteClick(textId) {
    const targetTextObj = textData.filter(function(text) {
        return text.uuid === textId
    })[0]
    targetTextObj.isDeleted = true
    if(targetTextObj.isDeleted) {
        textData.shift()
        render()
    }
}

function handleTextBtnClick() {
    const textInput = document.getElementById('text-input')
    if(textInput.value) {
        textData.unshift({
            handle: `@username`,
            likes: 0,
            textContent: textInput.value,
            isLiked: false,
            isDeleted: false,
            uuid: uuidv4()
        })
    render()
    console.log(textData)
    textInput.value = ''
    }
}

function getFeedHtml() {
    let feedHtml = ''
    textData.forEach(function(text) {
        let likeIconClass = ''
        if(text.isLiked){
            likeIconClass = 'liked'
        }
    feedHtml += `
        <div class="text">
            <div class="text-inner">
                <img src="./user-solid.svg" class="profile-pic">
                <div>
                    <p class="handle">${text.handle}</p>
                    <p class="text-content">${text.textContent}</p>
                    <span class="text-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${text.uuid}"></i>
                        ${text.likes}
                    </span>
                    <span class="text-detail">
                        <i class="fa-solid fa-trash data-delete="${text.uuid}"></i>
                    </span>
                </div>
            </div>
        </div>
    `
    })
    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()